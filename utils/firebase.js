// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCtoOq5mOGTanlsBA65WSE_0XeFUe6COkc',
  authDomain: 'kobeni-b23cb.firebaseapp.com',
  projectId: 'kobeni-b23cb',
  storageBucket: 'kobeni-b23cb.appspot.com',
  messagingSenderId: '180641714041',
  appId: '1:180641714041:web:e5de08d32f773681c429a8',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

export { firebaseApp }
