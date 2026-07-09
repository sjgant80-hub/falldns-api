// HTTP API wrapper for FallDNS SDK. Express, JSON in / JSON out.
import express from 'express';
import { FallDNS } from '@ai-native-solutions/falldns-sdk';
import { loadOrCreateIdentity, inProcessLink, fileStorage } from './identity.js';

export async function createApp() {
  const fid = await loadOrCreateIdentity();
  const flk = inProcessLink();
  const storage = fileStorage(process.env.FALLDNS_RECORDS_PATH || undefined);
  const dns = new FallDNS({ fallidInstance: fid, falllinkInstance: flk, storage });

  const app = express();
  app.use(express.json({ limit: '256kb' }));

  app.get('/health', (_req, res) => res.json({ ok: true, did: fid.did }));

  app.get('/identity', (_req, res) => res.json({ did: fid.did }));

  app.post('/claim', async (req, res) => {
    try {
      const rec = await dns.claim(req.body?.name);
      res.status(201).json(rec);
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  app.post('/release', async (req, res) => {
    try {
      const rec = await dns.releaseName(req.body?.name);
      res.status(200).json(rec);
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  app.get('/resolve/:name', async (req, res) => {
    try {
      const out = await dns.resolve(req.params.name);
      if (!out) return res.status(404).json({ error: 'no claim found', name: req.params.name });
      res.json(out);
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  app.get('/mine', async (_req, res) => {
    try { res.json(await dns.listMyClaims()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.get('/directory', async (_req, res) => {
    try { res.json(await dns.listAllKnown()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.get('/conflicts', async (_req, res) => {
    try { res.json(await dns.listConflicts()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.get('/records', (_req, res) => res.json(dns.exportRecords()));

  app.post('/ingest', async (req, res) => {
    try {
      const changed = await dns.importRecord(req.body);
      res.status(changed ? 201 : 200).json({ changed });
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  return app;
}
