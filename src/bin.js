#!/usr/bin/env node
import { createApp } from './index.js';

const port = Number(process.env.PORT || 3535);
const host = process.env.HOST || '0.0.0.0';

const app = await createApp();
app.listen(port, host, () => {
  console.log(`[falldns-api] listening on http://${host}:${port}`);
});
