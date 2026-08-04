import express from 'express';
import { PrismaClient } from './src/generated/client/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import { createPaypalRouter } from './src/api/paypal.js';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

import { config } from './src/config.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const pool = new Pool({ connectionString: config.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  const app = express();
  const PORT = config.PORT;

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

  app.use(cors());
  app.use(express.json());
  app.use(createPaypalRouter(prisma));

  // Strict Admin Key Check (Ensures ONLY you can upload)
  const verifyMasterAdmin = (req: any, res: any, next: any) => {
    const adminKey = req.headers['x-master-admin-key'];
    if (!adminKey || adminKey !== process.env.MASTER_ADMIN_KEY) {
      return res.status(403).json({ error: 'Access denied. Master admin key required.' });
    }
    next();
  };

  // Vault Storage Directory Setup
  const VAULT_DIR = path.join(__dirname, 'vault_storage');
  if (!fs.existsSync(VAULT_DIR)) {
    fs.mkdirSync(VAULT_DIR, { recursive: true });
  }

  // Master Upload Endpoint (Single-User Exclusive)
  app.post('/api/master/upload', verifyMasterAdmin, async (req, res) => {
    try {
      const {
        title,
        bpm,
        key,
        mp3Url,
        wavUrl,
        stemsUrl,
        coverArtUrl,
        priceMp3,
        priceWav,
        priceStems,
        priceExcl
      } = req.body;

      // Register track directly into your private database catalog
      const newBeat = await prisma.beat.create({
        data: {
          title,
          bpm: Number(bpm),
          key,
          genre: "Trap",
          mp3Url,
          wavUrl,
          stemsUrl,
          coverArtUrl,
          priceMp3: Number(priceMp3),
          priceWav: Number(priceWav),
          priceStems: Number(priceStems),
          priceExcl: Number(priceExcl)
        }
      });

      res.status(201).json({
        success: true,
        message: 'Trap beat successfully indexed into Krypside Vault storage.',
        beat: newBeat
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Subscribers Endpoint
  app.get('/api/subscribers', async (req, res) => {
    try {
      const subSnapshot = await getDocs(collection(db, 'subscribers'));
      const subscribers = subSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      res.json({ success: true, subscribers, notifications: [], pushSubscriptionsCount: 0 });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Licenses Endpoint
  app.get('/api/admin/licenses', async (req, res) => {
    try {
      const licenseSnapshot = await getDocs(collection(db, 'licenses'));
      const licenses = licenseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json({ success: true, licenses });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Public Catalog Stream Endpoint (For artists browsing your site)
  app.get('/api/beats', async (req, res) => {
    try {
      const beats = await prisma.beat.findMany({
        orderBy: { createdAt: 'desc' }
      });
      res.json(beats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/stream/:beatId', (req, res) => {
      // Path to your local or external audio file storage
      const audioPath = path.resolve(`./audio-vault/${req.params.beatId}.mp3`);
      
      if (!fs.existsSync(audioPath)) {
          return res.status(404).send('Beat not found');
      }

      const stat = fs.statSync(audioPath);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
          // Parse range header for chunked streaming
          const parts = range.replace(/bytes=/, "").split("-");
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
          const chunksize = (end - start) + 1;
          const file = fs.createReadStream(audioPath, { start, end });
          
          const head = {
              'Content-Range': `bytes ${start}-${end}/${fileSize}`,
              'Accept-Ranges': 'bytes',
              'Content-Length': chunksize,
              'Content-Type': 'audio/mpeg',
          };
          
          res.writeHead(206, head);
          file.pipe(res);
      } else {
          const head = {
              'Content-Length': fileSize,
              'Content-Type': 'audio/mpeg',
          };
          
          res.writeHead(200, head);
          fs.createReadStream(audioPath).pipe(res);
      }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Krypside Master Node running on port ${PORT}`);
  });
}

startServer();
