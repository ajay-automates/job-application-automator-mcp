'use client';

import React from 'react';
import { X, MapPin, Calendar, Briefcase, ExternalLink, TrendingUp } from 'lucide-react';
import { JobMatch } from '@/types';
import { Button } from './ui/Button';
import { formatRelativeTime, calculateSimilarityPercentage, getSimilarityColor } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface JobDetailModalProps {
  job: JobMatch;
  onClose: () => void;
  onApply: () => void;
}

export function JobDetailModal({ job, onClose, onApply }: JobDetailModalProps) {
  const similarityPercentage = calculateSimilarityPercentage(job.similarity_score);
  const similarityColorClass = getSimilarityColor(job.similarity_score);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-lg p-2 hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="bg-white px-6 pt-6 pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 pr-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.job_title}</h2>
                <p className="text-lg text-gray-700 font-medium">{job.company_name}</p>
              </div>
              <div className={cn('px-4 py-2 rounded-full text-base font-semibold whitespace-nowrap', similarityColorClass)}>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>{similarityPercentage}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              {job.min_experience_years && (
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{job.min_experience_years}+ years experience</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Posted {formatRelativeTime(job.first_published)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
              <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-wrap">
                {job.chunk_text}
              </div>

              {job.experience_details && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Experience Requirements</h3>
                  <p className="text-gray-600">{job.experience_details}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 flex gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={onApply}
              className="flex-1"
            >
              Quick Apply
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open(job.job_link, '_blank')}
              className="flex-1"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Original
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
