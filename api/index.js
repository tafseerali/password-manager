const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')

const app = express()

// MongoDB connection
const url = process.env.MONGO_URI
const client = new MongoClient(url)
const db_Name = process.env.DB_NAME || 'passwordManager'

// Middleware
app.use(express.json())
app.use(cors())

// Database connection cache
let cachedDb = null

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }
  
  await client.connect()
  const db = client.db(db_Name)
  cachedDb = db
  return db
}

// Get all passwords
app.get('/api', async (req, res) => {
  try {
    const db = await connectToDatabase()
    const collection = db.collection('passwords')
    const passwords = await collection.find({}).toArray()
    res.json(passwords)
  } catch (err) {
    console.error('Get passwords error:', err)
    res.status(500).json({ error: 'Failed to fetch passwords', details: err.message })
  }
})

// Save password
app.post('/api', async (req, res) => {
  try {
    const password = req.body
    const db = await connectToDatabase()
    const collection = db.collection('passwords')
    const result = await collection.insertOne(password)
    res.json({ Saved: true, result })
  } catch (err) {
    console.error('Save password error:', err)
    res.status(500).json({ error: 'Failed to save password', details: err.message })
  }
})

// Delete password
app.delete('/api', async (req, res) => {
  try {
    const { id } = req.body
    const db = await connectToDatabase()
    const collection = db.collection('passwords')
    const result = await collection.deleteOne({ id })
    res.json({ Deleted: true, result })
  } catch (err) {
    console.error('Delete password error:', err)
    res.status(500).json({ error: 'Failed to delete password', details: err.message })
  }
})

module.exports = app