package scanner

import (
	"context"
	"encoding/hex"
	"fmt"
	"time"

	"github.com/go-ble/ble"
)

type BLEScanner struct{}

func NewBLEScanner() *BLEScanner {
	return &BLEScanner{}
}

func (s *BLEScanner) Scan(ctx context.Context, handler BeaconHandler) error {
	return ble.Scan(ctx, true, func(advertisement ble.Advertisement) {
		manufacturerData := advertisement.ManufacturerData()
		if !isIBeacon(manufacturerData) {
			return
		}

		major := uint16(manufacturerData[20])<<8 | uint16(manufacturerData[21])
		minor := uint16(manufacturerData[22])<<8 | uint16(manufacturerData[23])

		if major != 1811 && minor != 2000 {
			return
		}

		beaconID := formatUUID(manufacturerData[4:20])
		handler(beaconID, time.Now())
	}, nil)
}

func formatUUID(bytes []byte) string {
	s := hex.EncodeToString(bytes)
	return fmt.Sprintf("%s-%s-%s-%s-%s",
		s[0:8], s[8:12], s[12:16], s[16:20], s[20:32])
}

func isIBeacon(manufacturerData []byte) bool {
	return len(manufacturerData) >= 25 &&
		manufacturerData[0] == 0x4C && manufacturerData[1] == 0x00 &&
		manufacturerData[2] == 0x02 && manufacturerData[3] == 0x15
}

func SetDefaultDevice(device ble.Device) {
	ble.SetDefaultDevice(device)
}
