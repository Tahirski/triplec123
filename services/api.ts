
import { SystemMetrics, SystemStatus } from '../types';
import { mockBackend } from './mockBackend';

/**
 * Production-ready API Client
 * In a real deployment, replace mockBackend calls with fetch(`${process.env.API_URL}/api/...`)
 */
export const apiClient = {
  getStatus: async (): Promise<{ status: SystemStatus; activeAlerts: string[] }> => {
    return await mockBackend.getCurrentStatus();
  },

  getMetrics: async (): Promise<SystemMetrics[]> => {
    return await mockBackend.getMetrics();
  },

  // Interface for backend-side AI proxy
  analyzeProduce: async (base64Image: string) => {
    // This would typically be a POST to /api/analyze-produce
    // For this environment, we call the geminiService directly which mimics the backend behavior
    const { analyzeProduce } = await import('./geminiService');
    return await analyzeProduce(base64Image);
  }
};
