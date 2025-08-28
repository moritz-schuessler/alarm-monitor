# Alarm-Monitor (Bachelor-Thesis-Project)

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
- **MQTT_TOPIC** → Topic that is used by MQTT to send the current crew
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
To initialize and seed the database, run:

```bash
# Push schema to the database
pnpm db:push

# Seed the database with initial data
pnpm db:seed
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
