/**
 * Task Scheduler
 */

export type TaskFrequency = 'hourly' | 'daily' | 'weekly' | 'monthly';
export type TaskStatus = 'active' | 'paused' | 'completed' | 'failed';

export interface ScheduledTask {
  id: string;
  name: string;
  description: string;
  frequency: TaskFrequency;
  lastRun?: Date;
  nextRun: Date;
  status: TaskStatus;
  enabled: boolean;
}

export class TaskScheduler {
  private tasks: Map<string, ScheduledTask> = new Map();
  
  constructor() {
    this.initializeDefaultTasks();
  }
  
  private initializeDefaultTasks() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const defaultTasks: ScheduledTask[] = [
      {
        id: 'backup-daily',
        name: 'Daily Backup',
        description: 'Automated database backup',
        frequency: 'daily',
        nextRun: tomorrow,
        status: 'active',
        enabled: true
      },
      {
        id: 'analytics-weekly',
        name: 'Weekly Analytics',
        description: 'Generate weekly analytics report',
        frequency: 'weekly',
        nextRun: tomorrow,
        status: 'active',
        enabled: true
      },
      {
        id: 'cleanup-daily',
        name: 'Daily Cleanup',
        description: 'Clean up old logs and temp files',
        frequency: 'daily',
        nextRun: tomorrow,
        status: 'active',
        enabled: true
      }
    ];
    
    defaultTasks.forEach(task => {
      this.tasks.set(task.id, task);
    });
  }
  
  getTasks(): ScheduledTask[] {
    return Array.from(this.tasks.values());
  }
  
  getTask(id: string): ScheduledTask | undefined {
    return this.tasks.get(id);
  }
  
  addTask(task: Omit<ScheduledTask, 'id'>): ScheduledTask {
    const id = `task-${Date.now()}`;
    const newTask = { ...task, id };
    this.tasks.set(id, newTask);
    return newTask;
  }
  
  updateTask(id: string, updates: Partial<ScheduledTask>): ScheduledTask | undefined {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    
    const updated = { ...task, ...updates };
    this.tasks.set(id, updated);
    return updated;
  }
  
  deleteTask(id: string): boolean {
    return this.tasks.delete(id);
  }
  
  getStats() {
    const tasks = this.getTasks();
    return {
      total: tasks.length,
      active: tasks.filter(t => t.status === 'active').length,
      paused: tasks.filter(t => t.status === 'paused').length,
      enabled: tasks.filter(t => t.enabled).length
    };
  }
}

export const taskScheduler = new TaskScheduler();
