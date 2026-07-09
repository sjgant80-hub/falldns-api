# @ai-native-solutions/falldns-api

HTTP API for **FallDNS** — sovereign human-readable name resolution. Thin Express wrapper around [`@ai-native-solutions/falldns-sdk`](https://github.com/sjgant80-hub/falldns-sdk).

## Run

```bash
npm install -g @ai-native-solutions/falldns-api
falldns-api                        # → http://0.0.0.0:3535
```

or Docker:

```bash
docker compose up -d
```

## Endpoints

| Method | Path | Body / params | Purpose |
|---|---|---|---|
| GET | `/health` | — | `{ ok, did }` |
| GET | `/identity` | — | this server's DID |
| POST | `/claim` | `{ "name": "alice.fall" }` | signed claim record |
| POST | `/release` | `{ "name": "alice.fall" }` | signed release record |
| GET | `/resolve/:name` | — | `{ name, did, timestamp, trustScore, conflicts, record }` or 404 |
| GET | `/mine` | — | active claims by this identity |
| GET | `/directory` | — | every known name with winning DID |
| GET | `/conflicts` | — | contested names |
| GET | `/records` | — | all locally-held signed records |
| POST | `/ingest` | signed record | verify + accept a foreign record |

## curl

```bash
curl -s http://localhost:3535/health
# {"ok":true,"did":"did:key:z6Mk..."}

curl -s -X POST http://localhost:3535/claim \
  -H 'content-type: application/json' \
  -d '{"name":"alice.fall"}'

curl -s http://localhost:3535/resolve/alice.fall

curl -s http://localhost:3535/directory
```

## Environment

- `PORT` — listen port (default `3535`)
- `HOST` — listen host (default `0.0.0.0`)
- `FALLDNS_KEY_PATH` — identity JWK file (default `~/.falldns/api-identity.json`)
- `FALLDNS_RECORDS_PATH` — records JSON (default `~/.falldns/api-records.json`)

## Signed record format

```json
{
  "name": "alice.fall",
  "did": "did:key:z6Mk...",
  "timestamp": "2026-07-06T10:00:00.000Z",
  "action": "claim",
  "signature": "..."
}
```

Signature is over `${action}|${name}|${did}|${timestamp}`.

## License

MIT · AI-Native Solutions
