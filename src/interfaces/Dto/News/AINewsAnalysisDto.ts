import { type APIResponse } from '../Core';

// AI 뉴스 분석
export interface AINewsAnalysisParam {
  id: number;
}

export interface AINewsAnalysisRequest {
  summary: string;
}

export interface AINewsAnalysisPayload {
  leftBenefitCount: number;
  impact: string;
  action: string;
  comment: string;
  model: string;
}

export interface AINewsAnalysisResponse extends APIResponse<AINewsAnalysisPayload> {}

export interface AINewsAnalysisDemoRequest {
  openai_api_key: string;
  id: number;
  article?: string;
  regenerate?: boolean;
}

export interface AINewsAnalysisDemoResponse extends Omit<AINewsAnalysisPayload, 'leftBenefitCount'> {}
