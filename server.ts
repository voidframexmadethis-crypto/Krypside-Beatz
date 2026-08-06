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
import { getSecureTrackDownloadUrl, uploadAudioToMassStorage } from './src/lib/cloudStorage.js';

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

  // Ensure tables exist
  try {
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "MasterTrack" (
      "id" TEXT NOT NULL,
      "title" VARCHAR(255) NOT NULL,
      "slug" TEXT NOT NULL UNIQUE,
      "bpm" INTEGER NOT NULL,
      "musicalKey" VARCHAR(50) NOT NULL,
      "genre" TEXT NOT NULL DEFAULT 'Trap',
      "subGenre" TEXT,
      "moodTags" TEXT[],
      "taggedMp3Url" TEXT NOT NULL,
      "untaggedWavUrl" TEXT NOT NULL,
      "stemsZipUrl" TEXT NOT NULL,
      "coverArtUrl" TEXT NOT NULL,
      "priceMp3" DOUBLE PRECISION NOT NULL DEFAULT 29.99,
      "priceWav" DOUBLE PRECISION NOT NULL DEFAULT 49.99,
      "priceStems" DOUBLE PRECISION NOT NULL DEFAULT 99.99,
      "priceExclusive" DOUBLE PRECISION NOT NULL DEFAULT 999.99,
      "isExclusiveSold" BOOLEAN NOT NULL DEFAULT false,
      "isVaultLocked" BOOLEAN NOT NULL DEFAULT false,
      "playCount" INTEGER NOT NULL DEFAULT 0,
      "downloadCount" INTEGER NOT NULL DEFAULT 0,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "MasterTrack_pkey" PRIMARY KEY ("id")
    );`;

    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "Transaction" (
      "id" TEXT NOT NULL,
      "trackId" TEXT NOT NULL,
      "buyerEmail" TEXT NOT NULL,
      "licenseType" TEXT NOT NULL,
      "amountPaid" DOUBLE PRECISION NOT NULL,
      "paymentGateway" TEXT NOT NULL,
      "licensePdfUrl" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
    );`;
  } catch (err) {
    console.log("Database table auto-init notice:", err);
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

  // Local file upload endpoint with permanent absolute public URLs
  app.post('/api/upload-local', upload.single('file'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      const subDir = req.query.type === 'image' ? 'artwork' : 'audio';
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const fileUrl = `${baseUrl}/uploads/${subDir}/${req.file.filename}`;
      res.json({ success: true, url: fileUrl });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

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

  // 🛡️ SECURE S3 STORAGE ACCESS
  // Generates a temporary link for purchased items (e.g., zip stems)
  app.get('/api/secure/download', async (req, res) => {
    try {
      const { key } = req.query;
      if (!key || typeof key !== 'string') {
        return res.status(400).json({ error: 'Missing track key' });
      }

      // TODO: Validate user purchase/license here before generating URL
      
      const url = await getSecureTrackDownloadUrl(key);
      res.json({ success: true, url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Master S3 Cloud Upload (Bypasses local disk storage)
  app.post('/api/master/upload-s3', verifyMasterAdmin, upload.single('file'), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: 'No file provided' });
      
      const fileBuffer = fs.readFileSync(req.file.path);
      const response = await uploadAudioToMassStorage(fileBuffer, req.file.originalname, req.file.mimetype);
      
      // Cleanup local temp file
      fs.unlinkSync(req.file.path);

      res.json({ 
        success: true, 
        message: 'Asset uploaded to Krypside Mass Cloud Storage',
        s3Response: response 
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // File Upload Endpoint with permanent absolute public URLs
  app.post('/api/master/upload-files', verifyMasterAdmin, upload.fields([{ name: 'artwork', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (req, res) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const { title, bpm, key, priceMp3, priceWav, priceStems, priceExcl } = req.body;
      
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const artworkUrl = files.artwork && files.artwork[0] ? `${baseUrl}/uploads/artwork/${files.artwork[0].filename}` : '';
      const audioUrl = files.audio && files.audio[0] ? `${baseUrl}/uploads/audio/${files.audio[0].filename}` : '';

      const newBeat = await prisma.masterTrack.create({
        data: {
          title,
          slug: title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
          bpm: Number(bpm),
          musicalKey: key,
          genre: "Trap",
          taggedMp3Url: audioUrl,
          untaggedWavUrl: audioUrl,
          stemsZipUrl: audioUrl,
          coverArtUrl: artworkUrl,
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
      if (!process.env.DATABASE_URL || process.env.DATABASE_URL === 'postgresql://postgres:p') {
        throw new Error('Using fallback storage');
      }
      const beats = await prisma.masterTrack.findMany({
        orderBy: { createdAt: 'desc' }
      });
      console.log("Beats found:", beats.length);
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const formattedBeats = beats.map(beat => {
        const fixUrl = (url: string | null) => {
          if (!url) return null;
          if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:')) return url;
          return `${baseUrl}/uploads/${path.basename(url)}`;
        };
        return {
          ...beat,
          coverArtUrl: fixUrl(beat.coverArtUrl),
          taggedMp3Url: fixUrl(beat.taggedMp3Url),
          untaggedWavUrl: fixUrl(beat.untaggedWavUrl),
          stemsZipUrl: fixUrl(beat.stemsZipUrl),
        };
      });
      res.json({ beats: formattedBeats });
    } catch (error: any) {
      res.json({ beats: [] });
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

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
