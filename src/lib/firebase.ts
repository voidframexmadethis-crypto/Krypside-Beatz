import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, setLogLevel, doc, getDocFromServer } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Silence internal gRPC stream lifecycle notices (e.g. idle stream disconnects)
setLogLevel('silent');

export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
} as any, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);
export const storage = getStorage(app);

// Test connection silently on initialization
async function testConnection() {
  try {
    await getDocFromServer(doc(db, '_connection_test_', 'ping'));
  } catch (error) {
    // Suppress expected offline/permission errors for test document
  }
}
testConnection();

export default app;


