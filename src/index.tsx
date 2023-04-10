import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

import { store } from './store';
import App from './App';
import './index.css';

const firebaseConfig = {
    apiKey: "AIzaSyAPiRS-Vg9IHqYixbyZZnwCy7q3ghHlkGA",
    authDomain: "tea-cup-challenge.firebaseapp.com",
    databaseURL: "https://tea-cup-challenge-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tea-cup-challenge",
    storageBucket: "tea-cup-challenge.appspot.com",
    messagingSenderId: "473088736635",
    appId: "1:473088736635:web:b3f6201f13b5ed64ac11de",
    measurementId: "G-7SDDTLRFJ3"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);
const auth = getAuth(app);

const container = document.getElementById('root')!;
const root = createRoot(container);

const firebaseServices = {
    storage,
    auth,
    database,
}

export const FirebaseContext = createContext(firebaseServices);

root.render(
    <React.StrictMode>
        <FirebaseContext.Provider value={firebaseServices}>
            <Provider store={store}>
                <App />
            </Provider>
        </FirebaseContext.Provider>
    </React.StrictMode>
);
