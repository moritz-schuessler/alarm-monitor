package scanner

import (
	"context"
	"time"
)

type BeaconHandler func(beaconID string, firstSeen time.Time)

type Scanner interface {
	Scan(ctx context.Context, handler BeaconHandler) error
}
