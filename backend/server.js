
/**
 * COMMUNITY COLD CHAIN - BACKEND SERVER (Node.js + Express)
 * This file is intended for your production server deployment.
 */
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 5000;
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// 1. Mock Database / Telemetry Logic
const getMockMetrics = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    temperature: 4.2 + (Math.random() - 0.5) * 0.4,
    humidity: 82 + (Math.random() - 0.5) * 2,
    batteryLevel: 85 - i * 0.2,
    timestamp: new Date(Date.now() - (20 - i) * 60000).toLocaleTimeString()
  }));
};

// 2. API Endpoints
app.get('/api/status', (req, res) => {
  res.json({
    status: 'Optimal',
    activeAlerts: [],
    lastUpdate: new Date().toISOString()
  });
});

app.get('/api/metrics', (req, res) => {
  res.json(getMockMetrics());
});

app.post('/api/analyze-produce', async (req, res) => {
  const { image } = req.body;
  
  if (!image) return res.status(400).json({ error: 'No image provided' });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { inlineData: { mimeType: 'image/jpeg', data: image.split(',')[1] } },
        { text: 'Identify produce and estimate freshness (Fresh/Near-ripe/Spoiling). Return JSON.' }
      ],
      config: { responseMimeType: "application/json" }
    });
    
    res.json(JSON.parse(response.text));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI Analysis Failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Cold Chain Backend running on port ${PORT}`);
});
