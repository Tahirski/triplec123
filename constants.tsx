
import React from 'react';
import { HardwareComponent } from './types';
import { Sun, Battery, Box, Cpu, Thermometer, BrainCircuit, WifiOff, MessageCircle } from 'lucide-react';

export const HARDWARE_COMPONENTS: HardwareComponent[] = [
  {
    id: 'solar',
    name: 'High-Yield PV Array',
    description: 'Bifacial monocrystalline solar panels designed for high-dust environments, providing 24/7 autonomous power via buffer batteries.',
    specs: ['400W Peak / 48V DC Bus', 'Teflon Anti-Soiling Coating', 'Galvanized Mounting Rails']
  },
  {
    id: 'battery',
    name: 'Energy Storage System',
    description: 'LiFePO4 battery bank with integrated BMS for 72-hour autonomy during zero-sunlight scenarios.',
    specs: ['5.2kWh Total Capacity', '10,000+ Cycle Lifespan', 'Thermal Runaway Protection']
  },
  {
    id: 'chamber',
    name: 'Climate Controlled Chamber',
    description: 'Modular insulated unit (mimicking white container design) with dual-redundant vapor compression cooling.',
    specs: ['2.5m³ Internal Volume', 'R-30 Thermal Rating', 'Food-grade Stainless Interior']
  },
  {
    id: 'control',
    name: 'Arduino Portenta Control Hub',
    description: 'The industrial "brain" of the unit. A dual-core Arduino Portenta H7 running real-time PID control for cooling and local data management.',
    specs: ['Dual Core M7/M4 Processor', 'Hardware Secure Element', 'Industrial I/O Shield Interface']
  },
  {
    id: 'offline-sync',
    name: 'Edge-Sync Hub',
    description: 'Custom hardware layer that enables 100% operation in zero-connectivity areas using local data buffering and LoRaWAN long-range pings.',
    specs: ['LoRaWAN Mesh Gateway', '128GB Local Edge Storage', 'Automatic Batch Synchronization']
  }
];

export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/overview', label: 'Overview' },
  { path: '/monitoring', label: 'Live Status' },
  { path: '/assistant', label: 'Farmer Assistant' },
  { path: '/offline', label: 'Offline' },
  { path: '/storage-ai', label: 'AI Scanner' }
];
