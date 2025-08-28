package main

import (
	"alarm-monitor/crew-scanner/config"
	"alarm-monitor/crew-scanner/mqtt"
	"alarm-monitor/crew-scanner/scanner"
	"alarm-monitor/crew-scanner/state"

	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	cfg := config.Load()

	publisher := mqtt.NewPublisher(cfg.MQTTBroker, cfg.MQTTRadioID)
	defer publisher.Close()

	manager := state.NewStateManager(cfg.DebounceDur, cfg.LeaveTimeout, cfg.DistanceThreshold)

	ctx, cancel := context.WithCancel(context.Background())
	sigc := make(chan os.Signal, 1)
	signal.Notify(sigc, syscall.SIGINT, syscall.SIGTERM)
	go func() { <-sigc; cancel() }()

	// Scanner auswählen
	var s scanner.Scanner
	if os.Getenv("MOCK_SCANNER") == "true" {
		beacons := cfg.MockBeacons
		if len(beacons) == 0 {
			beacons = []string{
				"11111111-1111-1111-1111-111111111111",
				"22222222-2222-2222-2222-222222222222",
			}
		}
		s = scanner.NewMockScanner(beacons, 2*time.Second)
	} else {
		dev, err := scanner.NewDevice()
		if err != nil {
			panic(err)
		}
		scanner.SetDefaultDevice(dev)
		s = scanner.NewBLEScanner()
	}

	// Flush State
	go func() {
		ticker := time.NewTicker(cfg.FlushInterval)
		defer ticker.Stop()

		var lastCrew []string
		firstRun := true

		for {
			select {
			case <-ticker.C:
				crew := manager.CurrentCrew()
				if firstRun || !equalSets(crew, lastCrew) {
					publisher.PublishCrew(crew)
					lastCrew = crew
					firstRun = false
				}
			case <-ctx.Done():
				return
			}
		}
	}()

	fmt.Println("Scanning…")
	s.Scan(ctx, func(beaconID string, firstSeen time.Time, distance float64) {
		manager.UpdateCrew(beaconID, firstSeen, distance)
	})
}

// check if crew has changed
func equalSets(a, b []string) bool {
	if len(a) != len(b) {
		return false
	}
	m := make(map[string]struct{}, len(a))
	for _, v := range a {
		m[v] = struct{}{}
	}
	for _, v := range b {
		if _, ok := m[v]; !ok {
			return false
		}
	}
	return true
}
