/**
 * Multi-region Manager
 */

export type RegionCode = 'US-EAST' | 'US-WEST' | 'EU-WEST' | 'EU-CENTRAL' | 'ASIA-PACIFIC' | 'ASIA-SOUTHEAST';
export type RegionStatus = 'active' | 'maintenance' | 'degraded' | 'offline';

export interface Region {
  code: RegionCode;
  name: string;
  status: RegionStatus;
  isPrimary: boolean;
  endpoints: {
    api: string;
    cdn: string[];
  };
  replication: {
    enabled: boolean;
    lag: number;
    syncStatus: 'healthy' | 'degraded' | 'failed';
  };
  loadBalancer: {
    algorithm: 'round-robin' | 'least-connections' | 'ip-hash';
    healthCheck: boolean;
  };
  compliance: string[];
}

export class MultiRegionManager {
  private regions: Map<RegionCode, Region> = new Map();
  
  constructor() {
    this.initializeRegions();
  }
  
  private initializeRegions() {
    const defaultRegions: Region[] = [
      {
        code: 'US-EAST',
        name: 'US East (N. Virginia)',
        status: 'active',
        isPrimary: true,
        endpoints: {
          api: 'https://api-us-east.example.com',
          cdn: ['https://cdn1-us-east.example.com']
        },
        replication: {
          enabled: true,
          lag: 45,
          syncStatus: 'healthy'
        },
        loadBalancer: {
          algorithm: 'round-robin',
          healthCheck: true
        },
        compliance: ['SOC2', 'HIPAA']
      },
      {
        code: 'EU-WEST',
        name: 'EU West (Ireland)',
        status: 'active',
        isPrimary: false,
        endpoints: {
          api: 'https://api-eu-west.example.com',
          cdn: ['https://cdn1-eu-west.example.com']
        },
        replication: {
          enabled: true,
          lag: 120,
          syncStatus: 'healthy'
        },
        loadBalancer: {
          algorithm: 'round-robin',
          healthCheck: true
        },
        compliance: ['GDPR', 'SOC2']
      }
    ];
    
    defaultRegions.forEach(region => {
      this.regions.set(region.code, region);
    });
  }
  
  getRegions(): Region[] {
    return Array.from(this.regions.values());
  }
  
  getRegion(code: RegionCode): Region | undefined {
    return this.regions.get(code);
  }
  
  updateRegion(code: RegionCode, updates: Partial<Region>): Region | undefined {
    const region = this.regions.get(code);
    if (!region) return undefined;
    
    const updated = { ...region, ...updates };
    this.regions.set(code, updated);
    return updated;
  }
  
  getHealthStatus() {
    const regions = this.getRegions();
    const total = regions.length;
    const healthy = regions.filter(r => r.status === 'active').length;
    
    return {
      total,
      healthy,
      degraded: regions.filter(r => r.status === 'degraded').length,
      offline: regions.filter(r => r.status === 'offline').length,
      healthPercentage: (healthy / total) * 100
    };
  }
}

export const multiRegionManager = new MultiRegionManager();
