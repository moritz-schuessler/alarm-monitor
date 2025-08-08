//go:build linux

package scanner

import (
	"github.com/go-ble/ble"
	"github.com/go-ble/ble/linux"
)

func NewDevice() (ble.Device, error) {
	return linux.NewDevice()
}
