package scanner

import (
	"context"
	"time"
)

type BeaconHandler func(beaconID string, firstSeen time.Time, distance float64)

type Scanner interface {
	Scan(ctx context.Context, handler BeaconHandler) error
}
