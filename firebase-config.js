/**
 * Firebase Configuration for Rotulate Publicidad
 * Reemplaza los valores con los de tu consola de Firebase
 */

const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    projectId: "TU_PROYECTO_ID",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
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
