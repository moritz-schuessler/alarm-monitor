package config

import (
	"log"
	"os"
	"strings"
	"time"
)

type Config struct {
	MQTTBroker    string
	MQTTClientID  string
	MQTTTopic     string
	DebounceDur   time.Duration
	LeaveTimeout  time.Duration
	FlushInterval time.Duration
	MockBeacons   []string
}

func Load() Config {
	return Config{
		MQTTBroker:    getEnv("MQTT_BROKER", "tcp://localhost:1883"),
		MQTTClientID:  getEnv("MQTT_CLIENT_ID", "collector"),
		MQTTTopic:     getEnv("MQTT_TOPIC", "firetrucks/Mustergemeinde 1-44-1/crew"),
		DebounceDur:   getEnvDuration("DEBOUNCE_DURATION", 3*time.Second),
		LeaveTimeout:  getEnvDuration("LEAVE_TIMEOUT", 5*time.Second),
		FlushInterval: getEnvDuration("FLUSH_INTERVAL", 5*time.Second),
		MockBeacons:   splitAndTrim(getEnv("MOCK_BEACONS", "")),
	}
}

func getEnv(key, def string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return def
}

func getEnvDuration(key string, def time.Duration) time.Duration {
	if val := os.Getenv(key); val != "" {
		d, err := time.ParseDuration(val)
		if err != nil {
			log.Printf("Invalid duration for %s, using default %v", key, def)
			return def
		}
		return d
	}
	return def
}

func splitAndTrim(s string) []string {
	if s == "" {
		return nil
	}
	parts := strings.Split(s, ",")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		trimmed := strings.TrimSpace(p)
		if trimmed != "" {
			out = append(out, trimmed)
		}
	}
	return out
}
