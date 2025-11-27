import apiClient from './client';
import { MatchResponse, JobFilters } from '@/types';

export async function uploadResumeAndMatch(
  file: File,
  filters?: JobFilters
): Promise<MatchResponse> {
  const formData = new FormData();
  formData.append('file', file);

  if (filters?.keywords) {
    formData.append('keywords', filters.keywords);
  }
  if (filters?.location) {
    formData.append('location', filters.location);
  }
  if (filters?.startDate) {
    formData.append('start_date', filters.startDate);
  }
  if (filters?.endDate) {
    formData.append('end_date', filters.endDate);
  }
  if (filters?.sortBy) {
    formData.append('sort_by', filters.sortBy);
  }

  const response = await apiClient.post<MatchResponse>(
    '/resume/match',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
}

export async function parseResume(file: File): Promise<{
  text: string;
  parsing_method: string;
  filename: string;
}> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/resume/parse', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

export async function getJobStats(): Promise<{
  total_jobs: number;
  companies_count: number;
  last_updated: string;
}> {
  const response = await apiClient.get('/jobs/stats');
  return response.data;
}
