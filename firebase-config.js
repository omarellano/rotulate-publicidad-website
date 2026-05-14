/**
 * Firebase Configuration for Rotulate Publicidad
 */

const firebaseConfig = {
  apiKey: "AIzaSyD_dgRYZMJEmFKp9RcIdRqPEJrb8dZnkE8",
  authDomain: "rotulate-publicidad.firebaseapp.com",
  projectId: "rotulate-publicidad",
  storageBucket: "rotulate-publicidad.firebasestorage.app",
  messagingSenderId: "700007448429",
  appId: "1:700007448429:web:be0e07ef403fedebb56464",
  measurementId: "G-7RD98QCP79"
};

// Inicializar Firebase (Placeholder, se usará en index.html)
// window.firebaseConfig = firebaseConfig;

/**
 * 🔒 REGLAS DE SEGURIDAD (Firestore)
 * Copia esto en la pestaña "Rules" de tu base de datos Firestore:
 * 
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /cotizaciones/{document=**} {
 *       allow create: if true; // Permite que clientes envíen cotizaciones
 *       allow read: if false;  // Evita que cualquiera lea tus leads
 *     }
 *   }
 * }
 * 
 * 🔒 REGLAS DE SEGURIDAD (Storage)
 * Copia esto en la pestaña "Rules" de tu Storage:
 * 
 * service firebase.storage {
 *   match /b/{bucket}/o {
 *     match /cotizaciones/{allPaths=**} {
 *       allow write: if request.resource.size < 20 * 1024 * 1024; // Límite 20MB
 *       allow read: if false;
 *     }
 *   }
 * }
 */
