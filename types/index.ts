// Job Match Types (from backend)
export interface JobMatch {
  job_link: string;
  company_name: string;
  job_title: string;
  location: string;
  first_published: string;
  similarity_score: number;
  chunk_text: string;
  min_experience_years?: number;
  experience_details?: string;
}

export interface ResumeProcessingInfo {
  original_length: number;
  enhanced_length: number;
  enhancement_used: boolean;
  parsing_method: string;
  enhancement_method?: string;
  filename: string;
}

export interface ValidationInfo {
  models_used: string[];
  jobs_evaluated: number;
  false_positives_removed: number;
  schema_enforced: boolean;
}

export interface MatchResponse {
  matches: JobMatch[];
  total_matches: number;
  resume_processing: ResumeProcessingInfo;
  keywords?: string;
  user_experience?: number;
  extracted_skills?: string[];
  validation_info?: ValidationInfo;
}

// Frontend Types
export interface JobFilters {
  location?: string;
  keywords?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: 'similarity' | 'date';
  minSimilarity?: number;
}

export interface UploadedResume {
  file: File;
  preview: string;
  extractedText?: string;
}

export interface ApplicationHistory {
  id: string;
  jobLink: string;
  companyName: string;
  jobTitle: string;
  appliedAt: string;
  status: 'pending' | 'applied' | 'rejected' | 'interviewing';
  coverLetter?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  preferredLocations?: string[];
  skills?: string[];
  yearsOfExperience?: number;
}
