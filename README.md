# Alarm-Monitor (Bachelor-Thesis-Project)

## (Mock) Leitstellen UI
Zum manuellen Anlegen und Verwalten von Einsätzen kann die folgende Seite verwendet werden:

[http://localhost:3000/mock](http://localhost:3000/mock)

Oder direkt im Browser aufrufen:

```
  /mock
```

## Environment Variables

This project requires several environment variables to be set.
You can find all required variables in the [`.env.example`](./.env.example) file.

To get started, copy the example file and adjust the values:

```bash
cp .env.example .env.local
```

### Variables

- **WEB_URL** → URL where the Next.js frontend is served
- **BACKEND_URL** → URL where the NestJS backend is served
- **AUTH_SECRET** → Secret key for authentication (JWT, sessions, etc.)
- **DATABASE_URL** → Connection string for SQLite/LibSQL
- **MQTT_BROKER** → Connection string for the MQTT broker
- **MQTT_BROKER_PORT** → Port for MQTT (default: 1883)
- **MQTT_RADIO_ID** → Funkrufname, wird als MQTT ClientID genutzt und ins Topic eingebaut
- **DISTANCE_THRESHOLD** → Threshold for required minimum distance of beacon

---

## Environment Variables (Mock)

There is the functionality to mock the detection of BLE-Beacons.

To use this functionality additional environment variables need to be set.
You can find all required variables in the [`.env.mock.example`](./.env.mock.example) file.

To get started, copy the example file and adjust the values:

```bash
cp .env.mock.example .env.mock
```

### Variables

- **MOCK_SCANNER** → Enable/disable BLE mock mode (`true`/`false`)
- **MOCK_BEACONS** → Comma-separated list of mock beacon UUIDs

---

## Commands
Install dependencies:
```bash
pnpm i
```

### Database
This project requires a database (SQLite/LibSQL).
To get a working databse either copy the example database or initialize a database:

```bash
# Copy example database
cp example.db apps/backend/local.db

# or: Initialize schema to the database
pnpm db:push
```

> #### Database Studio
> To explore and manage the database with Drizzle Studio:
>
> ```bash
> pnpm db:studio
> ```

### Web-App (MQTT-Broker + NestJS + Next.js)
To run the app, the MQTT-Broker, the Backend (NestJS) and the Web-App (Next.js) must be started.
You can start everything with:

```bash
pnpm dev
```

### Crew-Scanner (BLE-Scanner)
To start scanning for BLE-Beacons, run:

```bash
pnpm ble:scan
```

```bash
pnpm ble:mock
```

### Stop MQTT-Broker
```bash
pnpm mqtt:broker:stop
```
