import { kv } from '@vercel/kv';

// Default posts data
const DEFAULT_POSTS = [
    {
        id: 1,
        title: 'Introducing Fairblock: Pre-Execution Privacy',
        excerpt: 'Learn how Fairblock revolutionizes blockchain privacy with threshold encryption and conditional decryption mechanisms.',
        content: 'Fairblock is a decentralized cryptographic network designed to provide pre-execution privacy and confidential on-chain execution across ecosystems.',
        category: 'Announcement',
        author: 'admin',
        date: '2025-01-15',
        published: true
    },
    {
        id: 2,
        title: 'Understanding MEV and How Fairblock Solves It',
        excerpt: 'Maximal Extractable Value (MEV) costs DeFi users billions annually. Discover how Fairblock eliminates front-running.',
        content: 'Maximal Extractable Value represents the profit that can be extracted from blockchain users by manipulating transaction ordering.',
        category: 'Technical',
        author: 'admin',
        date: '2025-01-10',
        published: true
    },
    {
        id: 3,
        title: 'Fairblock Public Testnet is Live',
        excerpt: 'We are excited to announce that the FairyRing public testnet is now available for developers and users.',
        content: 'After months of development and testing, the Fairblock public testnet FairyRing is now live.',
        category: 'Update',
        author: 'admin',
        date: '2025-01-05',
        published: true
    }
];

// In-memory fallback if KV is not configured
let inMemoryPosts = [...DEFAULT_POSTS];

async function getPosts() {
    try {
        if (process.env.KV_REST_API_URL) {
            const posts = await kv.get('fairblock_posts');
            return posts || DEFAULT_POSTS;
        }
    } catch (e) {
        console.log('KV not available, using in-memory storage');
    }
    return inMemoryPosts;
}

async function savePosts(posts) {
    try {
        if (process.env.KV_REST_API_URL) {
            await kv.set('fairblock_posts', posts);
        }
    } catch (e) {
        console.log('KV not available, using in-memory storage');
    }
    inMemoryPosts = posts;
}

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const posts = await getPosts();

        // GET - Get all posts
        if (req.method === 'GET') {
            const publishedPosts = posts.filter(p => p.published !== false);
            return res.status(200).json(publishedPosts);
        }

        // POST - Create new post
        if (req.method === 'POST') {
            const { title, excerpt, content, category } = req.body;

            if (!title || !excerpt) {
                return res.status(400).json({ error: 'Title and excerpt required' });
            }

            const newPost = {
                id: Date.now(),
                title,
                excerpt,
                content: content || '',
                category: category || 'Announcement',
                author: 'admin',
                date: new Date().toISOString().split('T')[0],
                published: true
            };

            const updatedPosts = [newPost, ...posts];
            await savePosts(updatedPosts);

            return res.status(201).json(newPost);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Posts error:', error);
        res.status(500).json({ error: 'Server error' });
    }
}
