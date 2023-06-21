import { type APIResponse } from '../Core';

// AI 뉴스 분석
export interface AINewsAnalysisParam {
  id: number;
}

export interface AINewsAnalysisPayload {
  impact: string;
  action: string;
  comment: string;
  modal: string;
}

export interface AINewsAnalysisResponse extends APIResponse<AINewsAnalysisPayload> {}
