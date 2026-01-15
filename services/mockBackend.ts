
import { SystemMetrics, SystemStatus } from '../types';

/**
 * MOCK BACKEND SERVICE
 * Mimics /api/status, /api/metrics, etc.
 */

let metricsHistory: SystemMetrics[] = [];

// Initialize history
for (let i = 0; i < 20; i++) {
  const time = new Date();
  time.setMinutes(time.getMinutes() - (19 - i) * 5);
  metricsHistory.push({
    temperature: 4.2 + (Math.random() - 0.5) * 0.4,
    humidity: 82 + (Math.random() - 0.5) * 2,
    batteryLevel: 85 - i * 0.2,
    timestamp: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
}

export const mockBackend = {
  getMetrics: async (): Promise<SystemMetrics[]> => {
    // Simulate latency
    await new Promise(r => setTimeout(r, 400));
    // Return a fresh copy to prevent React from freezing the internal state
    return [...metricsHistory];
  },

  getCurrentStatus: async (): Promise<{ status: SystemStatus; activeAlerts: string[] }> => {
    const last = metricsHistory[metricsHistory.length - 1];
    let status = SystemStatus.OPTIMAL;
    const alerts: string[] = [];

    if (last.temperature > 8) {
      status = SystemStatus.CRITICAL;
      alerts.push('Temperature excursion detected');
    } else if (last.temperature > 6) {
      status = SystemStatus.WARNING;
      alerts.push('High temperature threshold approached');
    }

    if (last.batteryLevel < 20) {
      status = SystemStatus.WARNING;
      alerts.push('Low battery level');
    }

    return { status, activeAlerts: alerts };
  },

  updateSensorData: () => {
    const last = metricsHistory[metricsHistory.length - 1];
    if (!last) return null;
    
    const newMetric: SystemMetrics = {
      temperature: Math.max(2, Math.min(10, last.temperature + (Math.random() - 0.5) * 0.2)),
      humidity: Math.max(70, Math.min(95, last.humidity + (Math.random() - 0.5))),
      batteryLevel: Math.max(5, last.batteryLevel - 0.05),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // Immutable update to prevent issues with non-extensible objects
    const updatedHistory = [...metricsHistory, newMetric];
    if (updatedHistory.length > 20) updatedHistory.shift();
    metricsHistory = updatedHistory;
    
    return newMetric;
  }
};
