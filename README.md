# Alarm-Monitor (Bachelor-Thesis-Project)

## Commands
Install dependencies:
```bash
pnpm i
```

---

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

---

### Web-App (MQTT-Broker + NestJS + Next.js)
To run the app, the MQTT-Broker, the Backend (NestJS) and the Web-App (Next.js) must be started.
You can start everything with:

```bash
pnpm dev
```

---

### Crew-Scanner (BLE-Scanner)
To start scanning for BLE-Beacons, run:

```bash
pnpm ble:scan
```

To mock the detection of BLE-Beacons, run:

```bash
pnpm ble:mock
```

---

### Stop MQTT-Broker
```bash
pnpm mqtt:broker:stop
```
