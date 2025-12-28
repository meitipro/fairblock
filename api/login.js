const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fairblock-secret-key-2025';

// In-memory store (for demo - use a database in production)
const ADMIN_USER = {
    id: 1,
    username: 'admin',
    // Password: 'admin' - pre-hashed
    password: '$2a$10$8K1p/a0dL1LXMIgoEDFrwOgGvPZ1vLvPPPF1xnLlGJK7Q.A3kbW3C',
    role: 'admin'
};

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        // Check credentials
        if (username !== ADMIN_USER.username) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // For demo: accept 'admin' as password
        const validPassword = password === 'admin' || await bcrypt.compare(password, ADMIN_USER.password);
        
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: ADMIN_USER.id, username: ADMIN_USER.username, role: ADMIN_USER.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            user: {
                id: ADMIN_USER.id,
                username: ADMIN_USER.username,
                role: ADMIN_USER.role
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
}
