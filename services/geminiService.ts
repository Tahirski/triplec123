
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

// Note: In production, these calls should be proxied through the backend server.js
const getAI = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is not configured in the environment.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

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
            text: `Assess this produce for the Community Cold Chain project. 
                   Determine the type and freshness. Provide storage advice for rural farmers.
                   Labels: Fresh, Near-ripe, Spoiling. 
                   Mention that results are AI-generated estimates.`
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

    const parsed = JSON.parse(response.text || '{}');
    return {
      ...parsed,
      recommendation: parsed.recommendation || "Maintain current temperature. Monitor closely."
    };
  } catch (error) {
    console.error("Analysis failure:", error);
    return {
      fruitType: "Unknown",
      freshness: "Fresh",
      recommendation: "System offline or analysis failed. Perform manual check.",
      confidence: 0
    };
  }
};

export const getStorageRecommendations = async (currentTemp: number): Promise<any[]> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Temperature: ${currentTemp}°C. Suggest 5 rural agricultural or medical items suitable for storage. Return JSON array.`,
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
    return [];
  }
};

export const getChatResponse = async (userMessage: string, history: any[]) => {
  try {
    const ai = getAI();
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: 'You are an industrial IoT assistant for the Community Cold Chain. You help users manage solar refrigeration units. Keep answers technical yet accessible for rural deployments.',
      },
    });
    const response = await chat.sendMessage({ message: userMessage });
    return response.text;
  } catch (error) {
    return "The assistant is temporarily unavailable. Check local documentation.";
  }
};
