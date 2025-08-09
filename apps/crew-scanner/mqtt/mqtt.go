package mqtt

import (
	"encoding/json"
	"fmt"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

type Publisher struct {
	client mqtt.Client
	topic  string
}

func NewPublisher(broker, clientID, topic string) *Publisher {
	options := mqtt.NewClientOptions().
		AddBroker(broker).
		SetClientID(clientID).
		SetAutoReconnect(true).
		SetOnConnectHandler(func(c mqtt.Client) {
			fmt.Println("MQTT connected")
		}).
		SetConnectionLostHandler(func(c mqtt.Client, err error) {
			fmt.Println("MQTT connection lost:", err)
		})

	client := mqtt.NewClient(options)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}

	return &Publisher{client: client, topic: topic}
}

func (publisher *Publisher) PublishCrew(crew []string) {
	if crew == nil {
		crew = []string{}
	}
	payload, _ := json.Marshal(map[string][]string{"crew": crew})
	publisher.client.Publish(publisher.topic, 1, false, payload).Wait()
	fmt.Printf("Published crew (%d): %s\n", len(crew), payload)
}

func (publisher *Publisher) Close() {
	publisher.client.Disconnect(250)
}
