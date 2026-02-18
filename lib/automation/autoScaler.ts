/**
 * Auto-scaling Engine
 */

export interface AutoScalingConfig {
  enabled: boolean;
  minInstances: number;
  maxInstances: number;
  targetCPU: number;
  targetMemory: number;
  scaleUpCooldown: number;
  scaleDownCooldown: number;
}

export interface ScalingMetrics {
  currentInstances: number;
  cpuUsage: number;
  memoryUsage: number;
  requestsPerSecond: number;
  lastScaleAction?: {
    action: 'scale-up' | 'scale-down';
    timestamp: Date;
    fromInstances: number;
    toInstances: number;
  };
}

export class AutoScaler {
  private config: AutoScalingConfig = {
    enabled: true,
    minInstances: 2,
    maxInstances: 10,
    targetCPU: 70,
    targetMemory: 80,
    scaleUpCooldown: 300,
    scaleDownCooldown: 600
  };
  
  private metrics: ScalingMetrics = {
    currentInstances: 2,
    cpuUsage: 45,
    memoryUsage: 60,
    requestsPerSecond: 150
  };
  
  getConfig(): AutoScalingConfig {
    return { ...this.config };
  }
  
  updateConfig(updates: Partial<AutoScalingConfig>): AutoScalingConfig {
    this.config = { ...this.config, ...updates };
    return this.getConfig();
  }
  
  getMetrics(): ScalingMetrics {
    return { ...this.metrics };
  }
  
  async evaluateScaling(): Promise<{needed: boolean; action?: 'scale-up' | 'scale-down'}> {
    if (!this.config.enabled) {
      return { needed: false };
    }
    
    if (this.metrics.cpuUsage > this.config.targetCPU && 
        this.metrics.currentInstances < this.config.maxInstances) {
      return { needed: true, action: 'scale-up' };
    }
    
    if (this.metrics.cpuUsage < (this.config.targetCPU * 0.5) && 
        this.metrics.currentInstances > this.config.minInstances) {
      return { needed: true, action: 'scale-down' };
    }
    
    return { needed: false };
  }
}

export const autoScaler = new AutoScaler();
