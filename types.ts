export enum Screen {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  RESULTS = 'RESULTS',
}

export interface UrbanAnalysis {
  problems: string[];
  recommendations: string[];
  proposal: string;
}

export interface AnalysisState {
  image: File | null;
  imagePreview: string | null;
  contextDescription: string;
  result: UrbanAnalysis | null;
  isLoading: boolean;
  error: string | null;
}