// falldns-api · Express HTTP wrapper around falldns-sdk · MIT · AI-Native Solutions
import express from 'express';

const app = express();
app.use(express.json({ limit: '10mb' }));

app.get('/health', (_req, res) => res.json({ ok: true, tool: 'falldns', version: '1.0.0' }));

app.post('/ensureFallID', async (req, res) => {
  try {
    const { ensureFallID } = await import('@ai-native-solutions/falldns-sdk');
    const out = typeof ensureFallID === 'function' ? await ensureFallID(req.body) : { error: 'ensureFallID not callable' };
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/ensureFallLink', async (req, res) => {
  try {
    const { ensureFallLink } = await import('@ai-native-solutions/falldns-sdk');
    const out = typeof ensureFallLink === 'function' ? await ensureFallLink(req.body) : { error: 'ensureFallLink not callable' };
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/statusMsg', async (req, res) => {
  try {
    const { statusMsg } = await import('@ai-native-solutions/falldns-sdk');
    const out = typeof statusMsg === 'function' ? await statusMsg(req.body) : { error: 'statusMsg not callable' };
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/renderMine', async (req, res) => {
  try {
    const { renderMine } = await import('@ai-native-solutions/falldns-sdk');
    const out = typeof renderMine === 'function' ? await renderMine(req.body) : { error: 'renderMine not callable' };
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/renderDir', async (req, res) => {
  try {
    const { renderDir } = await import('@ai-native-solutions/falldns-sdk');
    const out = typeof renderDir === 'function' ? await renderDir(req.body) : { error: 'renderDir not callable' };
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/renderConflicts', async (req, res) => {
  try {
    const { renderConflicts } = await import('@ai-native-solutions/falldns-sdk');
    const out = typeof renderConflicts === 'function' ? await renderConflicts(req.body) : { error: 'renderConflicts not callable' };
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('falldns-api listening on :' + PORT));
