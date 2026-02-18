import { NextResponse } from 'next/server';
import { autoScaler } from '@/lib/automation/autoScaler';
import { contentModerator } from '@/lib/automation/moderator';
import { taskScheduler } from '@/lib/automation/scheduler';

export async function GET() {
  try {
    const autoScalingMetrics = autoScaler.getMetrics();
    const moderationStats = contentModerator.getStats();
    const schedulerStats = taskScheduler.getStats();
    
    return NextResponse.json({
      success: true,
      data: {
        autoScaling: {
          enabled: autoScaler.getConfig().enabled,
          currentInstances: autoScalingMetrics.currentInstances,
          cpuUsage: autoScalingMetrics.cpuUsage,
          memoryUsage: autoScalingMetrics.memoryUsage
        },
        contentModeration: {
          processed: moderationStats.totalProcessed,
          flagged: moderationStats.flagged,
          approved: moderationStats.approved
        },
        scheduledTasks: schedulerStats
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to get automation status'
    }, { status: 500 });
  }
}
