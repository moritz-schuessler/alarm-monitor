package scanner

import (
	"context"
	"fmt"
	"math/rand"
	"time"
)

type MockScanner struct {
	BeaconIDs []string
	Interval  time.Duration
	inRange   map[string]bool
}

func NewMockScanner(beaconIDs []string, interval time.Duration) *MockScanner {
	return &MockScanner{
		BeaconIDs: beaconIDs,
		Interval:  interval,
		inRange:   make(map[string]bool),
	}
}

func (m *MockScanner) Scan(ctx context.Context, handler BeaconHandler) error {
	ticker := time.NewTicker(m.Interval)
	defer ticker.Stop()

	fmt.Println("Mock scanning started...")
	for {
		select {
		case <-ticker.C:
			// Randomly decide to add or remove a beacon
			action := rand.Intn(3) // 0=add, 1=remove, 2=keep state

			if action == 0 && len(m.inRange) < len(m.BeaconIDs) {
				// Add a random beacon not already in range
				candidates := []string{}
				for _, id := range m.BeaconIDs {
					if !m.inRange[id] {
						candidates = append(candidates, id)
					}
				}
				if len(candidates) > 0 {
					newID := candidates[rand.Intn(len(candidates))]
					m.inRange[newID] = true
					fmt.Println("Mock beacon arrived:", newID)
				}
			} else if action == 1 && len(m.inRange) > 0 {
				// Remove a random beacon from inRange
				keys := []string{}
				for id := range m.inRange {
					keys = append(keys, id)
				}
				leavingID := keys[rand.Intn(len(keys))]
				delete(m.inRange, leavingID)
				fmt.Println("Mock beacon left:", leavingID)
			}

			for id := range m.inRange {
				handler(id, time.Now(), 3)
			}

		case <-ctx.Done():
			fmt.Println("Mock scanning stopped.")
			return nil
		}
	}
}
