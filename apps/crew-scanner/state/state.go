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
	mutex             sync.Mutex
	beacons           map[string]*BeaconState
	DebounceDuration  time.Duration
	LeaveTimeout      time.Duration
	DistanceThreshold float64
}

func NewStateManager(debounce, leave time.Duration, distanceThreshold float64) *StateManager {
	return &StateManager{
		beacons:           make(map[string]*BeaconState),
		DebounceDuration:  debounce,
		LeaveTimeout:      leave,
		DistanceThreshold: distanceThreshold,
	}
}

func (sm *StateManager) UpdateCrew(beaconID string, now time.Time, distance float64) {
	sm.mutex.Lock()
	defer sm.mutex.Unlock()

	state, exists := sm.beacons[beaconID]
	if !exists {
		state = &BeaconState{FirstSeen: now}
		sm.beacons[beaconID] = state
	}

	state.Count++

	if distance < sm.DistanceThreshold {
		state.LastSeen = now
	}

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
