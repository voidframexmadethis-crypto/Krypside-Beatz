import express from 'express';
import { PrismaClient } from './src/generated/client/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';
import multer from 'multer';
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

  const VAULT_DIR = path.join(__dirname, 'vault_storage');
  if (!fs.existsSync(VAULT_DIR)) {
    fs.mkdirSync(VAULT_DIR, { recursive: true });
  }

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

  app.use(cors());
  app.use(express.json());
  
  // Serve uploaded files
  app.use('/uploads', express.static(VAULT_DIR));

  app.use(createPaypalRouter(prisma));

  // Strict Admin Key Check (Ensures ONLY you can upload)
  const verifyMasterAdmin = (req: any, res: any, next: any) => {
    const adminKey = req.headers['x-master-admin-key'];
    if (!adminKey || adminKey !== process.env.MASTER_ADMIN_KEY) {
      return res.status(403).json({ error: 'Access denied. Master admin key required.' });
    }
    next();
  };


  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const subDir = file.fieldname === 'artwork' ? 'artwork' : 'audio';
      const dir = path.join(VAULT_DIR, subDir);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '_' + file.originalname);
    }
  });
  const upload = multer({ storage });

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
      const newBeat = await prisma.masterTrack.create({
        data: {
          title,
          slug: title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
          bpm: Number(bpm),
          musicalKey: key,
          genre: "Trap",
          taggedMp3Url: mp3Url,
          untaggedWavUrl: wavUrl,
          stemsZipUrl: stemsUrl,
          coverArtUrl,
          priceMp3: Number(priceMp3),
          priceWav: Number(priceWav),
          priceStems: Number(priceStems),
          priceExclusive: Number(priceExcl)
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

  // File Upload Endpoint
  app.post('/api/master/upload-files', verifyMasterAdmin, upload.fields([{ name: 'artwork', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (req, res) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const { title, bpm, key, priceMp3, priceWav, priceStems, priceExcl } = req.body;
      
      const artworkPath = files.artwork[0].path;
      const audioPath = files.audio[0].path;

      const newBeat = await prisma.masterTrack.create({
        data: {
          title,
          slug: title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
          bpm: Number(bpm),
          musicalKey: key,
          genre: "Trap",
          taggedMp3Url: audioPath,
          untaggedWavUrl: audioPath,
          stemsZipUrl: audioPath,
          coverArtUrl: artworkPath,
          priceMp3: Number(priceMp3),
          priceWav: Number(priceWav),
          priceStems: Number(priceStems),
          priceExclusive: Number(priceExcl)
        }
      });

      res.status(201).json({ success: true, beat: newBeat });
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
      const beats = await prisma.masterTrack.findMany({
        orderBy: { createdAt: 'desc' }
      });
      console.log("Beats found:", beats.length);
      const formattedBeats = beats.map(beat => ({
        ...beat,
        coverArtUrl: beat.coverArtUrl ? '/uploads/' + path.basename(beat.coverArtUrl) : null,
        taggedMp3Url: beat.taggedMp3Url ? '/uploads/' + path.basename(beat.taggedMp3Url) : null,
        untaggedWavUrl: beat.untaggedWavUrl ? '/uploads/' + path.basename(beat.untaggedWavUrl) : null,
        stemsZipUrl: beat.stemsZipUrl ? '/uploads/' + path.basename(beat.stemsZipUrl) : null,
      }));
      res.json({ beats: formattedBeats });
    } catch (error: any) {
      console.error("Error in /api/beats:", error);
      res.status(500).json({ error: error.message });
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
