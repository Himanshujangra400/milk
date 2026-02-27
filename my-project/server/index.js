import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
// JSONFile lives in the node-specific entrypoint
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, 'db.json');
const adapter = new JSONFile(dbFile);
// supply default data to avoid "missing default data" error
const db = new Low(adapter, { entries: [] });

// make sure the file exists and has a valid shape (read will merge defaults)
await db.read();
// if for some reason it's still undefined, set manually
db.data ||= { entries: [] };

const app = express();
app.use(cors());
app.use(express.json());

// helper to refresh the database from disk
async function reload() {
  await db.read();
  db.data ||= { entries: [] };
}

// get all entries (most recent first)
app.get('/api/entries', async (req, res) => {
  await reload();
  const entries = [...db.data.entries].sort((a, b) => b.id - a.id);
  res.json(entries);
});

// create a new entry
app.post('/api/entries', async (req, res) => {
  const { farmer, shift, type, litres, fat, total } = req.body;

  if (!farmer || litres == null) {
    return res.status(400).json({ error: 'farmer and litres are required' });
  }

  const entry = {
    id: Date.now(),
    farmer,
    shift,
    type,
    litres,
    fat,
    total,
    date: new Date().toISOString(),
  };

  db.data.entries.unshift(entry);
  await db.write();
  res.json(entry);
});

// update existing entry
app.put('/api/entries/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await reload();
  const idx = db.data.entries.findIndex((e) => e.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'entry not found' });
  }
  const updated = { ...db.data.entries[idx], ...req.body };
  db.data.entries[idx] = updated;
  await db.write();
  res.json(updated);
});

// delete an entry
app.delete('/api/entries/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await reload();
  db.data.entries = db.data.entries.filter((e) => e.id !== id);
  await db.write();
  res.json({ success: true });
});

// if we build the React app we can serve it from Express
if (process.env.NODE_ENV === 'production') {
  const clientPath = join(__dirname, '..', 'dist');
  app.use(express.static(clientPath));
  app.get('*', (req, res) => {
    res.sendFile(join(clientPath, 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`backend server listening on http://localhost:${port}`);
});
