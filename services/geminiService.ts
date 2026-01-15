
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

// Helper to get AI instance safely
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeProduce = async (base64Image: string): Promise<AnalysisResult> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image.split(',')[1] || base64Image
            }
          },
          {
            text: `Analyze this image of produce. Identify the fruit/vegetable and estimate its freshness state.
                   Return a JSON object with:
                   - fruitType: (string)
                   - freshness: ('Fresh', 'Near-ripe', or 'Spoiling')
                   - recommendation: (string, specific advice on storage duration or immediate use)
                   - confidence: (number, 0-1)
                   Be realistic and mention that these are estimates.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fruitType: { type: Type.STRING },
            freshness: { type: Type.STRING, enum: ['Fresh', 'Near-ripe', 'Spoiling'] },
            recommendation: { type: Type.STRING },
            confidence: { type: Type.NUMBER }
          },
          required: ["fruitType", "freshness", "recommendation", "confidence"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      fruitType: "Unknown",
      freshness: "Fresh",
      recommendation: "System unable to determine. Manual inspection required.",
      confidence: 0
    };
  }
};

export const getStorageRecommendations = async (currentTemp: number): Promise<any[]> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Given the current cold chain temperature of ${currentTemp}°C, provide 5 recommendations for items that can be stored. 
                 Return as a JSON array of objects with keys: name, days, tempRange, benefit.
                 Focus on rural agricultural produce and vaccines.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              days: { type: Type.STRING },
              tempRange: { type: Type.STRING },
              benefit: { type: Type.STRING }
            },
            required: ["name", "days", "tempRange", "benefit"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Rec Error:", error);
    return [];
  }
};

export const getChatResponse = async (userMessage: string, history: any[]) => {
  try {
    const ai = getAI();
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: 'You are a helpful, friendly expert for the Community Cold Chain project. You assist farmers in rural areas with advice on using solar-powered modular refrigeration units. You explain optimal temperatures, storage times for crops and vaccines, and how to maintain the hardware. Keep answers simple, encouraging, and practical. Always mention safety and hygiene.',
      },
    });

    const response = await chat.sendMessage({ message: userMessage });
    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw error;
  }
};
