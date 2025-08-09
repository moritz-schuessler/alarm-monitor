package state

import (
	"sync"
	"time"
)

type BeaconState struct {
	FirstSeen time.Time
	LastSeen  time.Time
	Count     int
	Active    bool
}

type StateManager struct {
	mutex            sync.Mutex
	beacons          map[string]*BeaconState
	DebounceDuration time.Duration
	LeaveTimeout     time.Duration
}

func NewStateManager(debounce, leave time.Duration) *StateManager {
	return &StateManager{
		beacons:          make(map[string]*BeaconState),
		DebounceDuration: debounce,
		LeaveTimeout:     leave,
	}
}

func (sm *StateManager) UpdateCrew(beaconID string, now time.Time) {
	sm.mutex.Lock()
	defer sm.mutex.Unlock()

	state, exists := sm.beacons[beaconID]
	if !exists {
		state = &BeaconState{FirstSeen: now}
		sm.beacons[beaconID] = state
	}
	state.LastSeen = now
	state.Count++
	if !state.Active && now.Sub(state.FirstSeen) >= sm.DebounceDuration {
		state.Active = true
	}
}

func (sm *StateManager) CurrentCrew() []string {
	sm.mutex.Lock()
	defer sm.mutex.Unlock()

	now := time.Now()
	crew := make([]string, 0)
	for beaconID, state := range sm.beacons {
		if now.Sub(state.LastSeen) >= sm.LeaveTimeout ||
			(!state.Active && now.Sub(state.FirstSeen) > sm.LeaveTimeout) {
			delete(sm.beacons, beaconID)
			continue
		}
		if state.Active {
			crew = append(crew, beaconID)
		}
	}
	return crew
}
