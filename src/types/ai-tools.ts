export interface AiToolsStatsData {
  totalUsers: number;
  activeUsers: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalWorkoutPlans: number;
  totalFoods: number;
  totalBlogs: number;
  totalComments: number;
  totalCoaches: number;
  totalOrders: number;
}

export interface AiToolsStatsResponse {
  success: boolean;
  data: AiToolsStatsData;
}

export interface AiToolsStatsErrorResponse {
  success: boolean;
  message: string;
}
