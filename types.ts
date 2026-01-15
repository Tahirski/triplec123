
export interface SystemMetrics {
  temperature: number;
  humidity: number;
  batteryLevel: number;
  timestamp: string;
}

export enum SystemStatus {
  OPTIMAL = 'Optimal',
  WARNING = 'Warning',
  CRITICAL = 'Critical'
}

export interface AnalysisResult {
  fruitType: string;
  freshness: 'Fresh' | 'Near-ripe' | 'Spoiling';
  recommendation: string;
  confidence: number;
}

export interface HardwareComponent {
  id: string;
  name: string;
  description: string;
  specs: string[];
}
