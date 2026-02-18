/**
 * Content Moderation Engine
 */

export interface ModerationResult {
  flagged: boolean;
  confidence: number;
  reasons: string[];
  category: 'safe' | 'warning' | 'unsafe';
  action: 'approve' | 'flag' | 'reject';
}

export interface ModerationStats {
  totalProcessed: number;
  flagged: number;
  approved: number;
  rejected: number;
  averageConfidence: number;
}

export class ContentModerator {
  private stats: ModerationStats = {
    totalProcessed: 0,
    flagged: 0,
    approved: 0,
    rejected: 0,
    averageConfidence: 0
  };
  
  async moderateText(text: string): Promise<ModerationResult> {
    this.stats.totalProcessed++;
    
    const profanityWords = ['spam', 'scam'];
    const hasProfanity = profanityWords.some(word => 
      text.toLowerCase().includes(word)
    );
    
    if (hasProfanity) {
      this.stats.flagged++;
      return {
        flagged: true,
        confidence: 0.95,
        reasons: ['Profanity detected'],
        category: 'unsafe',
        action: 'flag'
      };
    }
    
    this.stats.approved++;
    return {
      flagged: false,
      confidence: 0.99,
      reasons: [],
      category: 'safe',
      action: 'approve'
    };
  }
  
  async moderateImage(imageUrl: string): Promise<ModerationResult> {
    this.stats.totalProcessed++;
    this.stats.approved++;
    
    return {
      flagged: false,
      confidence: 0.98,
      reasons: [],
      category: 'safe',
      action: 'approve'
    };
  }
  
  getStats(): ModerationStats {
    return { ...this.stats };
  }
}

export const contentModerator = new ContentModerator();
