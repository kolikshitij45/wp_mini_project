const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const admin = require('firebase-admin');

const app = express();
const PORT = 3000;

// Initialize Firebase Admin SDK
const serviceAccount = require('./service_acc_key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://voltmart-fd0f4-default-rtdb.firebaseio.com"
});

const db = admin.database();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// Serve static frontend files
app.use(express.static(__dirname));

// Initialize basic structure if empty
async function setupDatabaseStructure() {
    const rootRef = db.ref('/');
    let snapshot = await rootRef.once('value');
    if (!snapshot.exists()) {
        await rootRef.set({
            users: [],
            listings: [],
            saved: {},
            messages: [],
            subscribers: []
        });
    } else {
        // Ensure keys exist
        const data = snapshot.val();
        if (!data.users) await db.ref('users').set([]);
        if (!data.listings) await db.ref('listings').set([]);
        if (!data.saved) await db.ref('saved').set({});
        if (!data.messages) await db.ref('messages').set([]);
        if (!data.subscribers) await db.ref('subscribers').set([]);
    }
}
setupDatabaseStructure();

// GET all data
app.get('/api/data', async (req, res) => {
    try {
        const snapshot = await db.ref('/').once('value');
        let data = snapshot.val();

        // Firebase arrays can be omitted or converted to objects if elements are deleted. 
        // Normalize the structure to ensure arrays.
        data.users = Array.isArray(data.users) ? data.users : (data.users ? Object.values(data.users) : []);
        data.listings = Array.isArray(data.listings) ? data.listings : (data.listings ? Object.values(data.listings) : []);
        data.saved = data.saved || {};
        data.messages = Array.isArray(data.messages) ? data.messages : (data.messages ? Object.values(data.messages) : []);
        data.subscribers = Array.isArray(data.subscribers) ? data.subscribers : (data.subscribers ? Object.values(data.subscribers) : []);

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to read data from Firebase' });
    }
});

// Handle specific actions for concurrency
app.post('/api/action', async (req, res) => {
    try {
        const { action, payload } = req.body;

        if (action === 'addUser') {
            const usersRef = db.ref('users');
            const snapshot = await usersRef.once('value');
            let users = snapshot.val() || [];
            users = Array.isArray(users) ? users : Object.values(users);
            users.push(payload);
            await usersRef.set(users);
        }
        else if (action === 'updateUser') {
            const usersRef = db.ref('users');
            const snapshot = await usersRef.once('value');
            let users = snapshot.val() || [];
            users = Array.isArray(users) ? users : Object.values(users);
            const idx = users.findIndex(u => u.email.toLowerCase() === payload.email.toLowerCase());
            if (idx !== -1) {
                users[idx] = { ...users[idx], ...payload.updates };
                await usersRef.set(users);
            }
        }
        else if (action === 'addListing') {
            const listingsRef = db.ref('listings');
            const snapshot = await listingsRef.once('value');
            let listings = snapshot.val() || [];
            listings = Array.isArray(listings) ? listings : Object.values(listings);
            listings.push(payload);
            await listingsRef.set(listings);
        }
        else if (action === 'removeListing') {
            const listingsRef = db.ref('listings');
            const snapshot = await listingsRef.once('value');
            let listings = snapshot.val() || [];
            listings = Array.isArray(listings) ? listings : Object.values(listings);
            listings = listings.filter(l => l.id !== payload);
            await listingsRef.set(listings);
        }
        else if (action === 'saveSaved') {
            await db.ref('saved').set(payload);
        }
        else if (action === 'addMessage') {
            const messagesRef = db.ref('messages');
            const snapshot = await messagesRef.once('value');
            let messages = snapshot.val() || [];
            messages = Array.isArray(messages) ? messages : Object.values(messages);
            messages.push(payload);
            await messagesRef.set(messages);
        }
        else if (action === 'markRead') {
            const messagesRef = db.ref('messages');
            const snapshot = await messagesRef.once('value');
            let messages = snapshot.val() || [];
            messages = Array.isArray(messages) ? messages : Object.values(messages);
            const m = messages.find(x => x.id === payload);
            if (m) {
                m.read = true;
                await messagesRef.set(messages);
            }
        }
        else if (action === 'subscribeEmail') {
            const subRef = db.ref('subscribers');
            const snapshot = await subRef.once('value');
            let subs = snapshot.val() || [];
            subs = Array.isArray(subs) ? subs : Object.values(subs);
            if (!subs.includes(payload)) {
                subs.push(payload);
                await subRef.set(subs);
            }
        }

        // We should trigger a fresh fetch logic but since the sync is simple we can just fetch all and res.json data
        const returnSnapshot = await db.ref('/').once('value');
        let finalData = returnSnapshot.val();
        finalData.users = Array.isArray(finalData.users) ? finalData.users : (finalData.users ? Object.values(finalData.users) : []);
        finalData.listings = Array.isArray(finalData.listings) ? finalData.listings : (finalData.listings ? Object.values(finalData.listings) : []);
        finalData.saved = finalData.saved || {};
        finalData.messages = Array.isArray(finalData.messages) ? finalData.messages : (finalData.messages ? Object.values(finalData.messages) : []);
        finalData.subscribers = Array.isArray(finalData.subscribers) ? finalData.subscribers : (finalData.subscribers ? Object.values(finalData.subscribers) : []);

        res.json({ success: true, data: finalData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to process action' });
    }
});

// POST to update entire data (simple synchronization)
app.post('/api/sync', async (req, res) => {
    try {
        await db.ref('/').set(req.body);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

app.listen(PORT, () => {
    console.log(`⚡ VoltMart server running at http://localhost:${PORT}`);
});
