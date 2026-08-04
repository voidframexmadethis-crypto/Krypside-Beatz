import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { PrismaClient } from '../src/generated/client/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { config } from '../src/config.js';

const app = new Hono();

// Middleware
app.use('/*', cors());

const pool = new Pool({ connectionString: config.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

// Routes
app.post('/api/master/upload', async (c) => {
  const adminKey = c.req.header('x-master-admin-key');
  if (!adminKey || adminKey !== process.env.MASTER_ADMIN_KEY) {
    return c.json({ error: 'Access denied. Master admin key required.' }, 403);
  }

  try {
    const body = await c.req.json();
    const {
      title, bpm, key, mp3Url, wavUrl, stemsUrl, coverArtUrl, priceMp3, priceWav, priceStems, priceExcl
    } = body;

    const newBeat = await prisma.masterTrack.create({
      data: {
        title,
        bpm: Number(bpm),
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        musicalKey: key,
        genre: "Trap",
        taggedMp3Url: mp3Url,
        untaggedWavUrl: wavUrl,
        stemsZipUrl: stemsUrl,
        coverArtUrl: coverArtUrl,
        priceMp3: Number(priceMp3),
        priceWav: Number(priceWav),
        priceStems: Number(priceStems),
        priceExclusive: Number(priceExcl)
      }
    });

    return c.json({
      success: true,
      message: 'Trap beat successfully indexed into Krypside Vault storage.',
      beat: newBeat
    }, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get('/api/subscribers', async (c) => {
  try {
    const subSnapshot = await getDocs(collection(db, 'subscribers'));
    const subscribers = subSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return c.json({ success: true, subscribers, notifications: [], pushSubscriptionsCount: 0 });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get('/api/admin/licenses', async (c) => {
  try {
    const licenseSnapshot = await getDocs(collection(db, 'licenses'));
    const licenses = licenseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return c.json({ success: true, licenses });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get('/api/beats', async (c) => {
  try {
    const beats = await prisma.masterTrack.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return c.json(beats);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

export default app;
