'use client';

import React from 'react';
import { MapPin, Calendar, Briefcase, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { JobMatch } from '@/types';
import { formatRelativeTime, calculateSimilarityPercentage, getSimilarityColor, truncateText } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface JobCardProps {
  job: JobMatch;
  onViewDetails: () => void;
  onApply: () => void;
}

export function JobCard({ job, onViewDetails, onApply }: JobCardProps) {
  const similarityPercentage = calculateSimilarityPercentage(job.similarity_score);
  const similarityColorClass = getSimilarityColor(job.similarity_score);

  return (
    <Card hover className="transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-primary-600 cursor-pointer" onClick={onViewDetails}>
              {job.job_title}
            </h3>
            <p className="text-base text-gray-700 font-medium mb-2">{job.company_name}</p>
          </div>
          <div className={cn('px-3 py-1 rounded-full text-sm font-medium', similarityColorClass)}>
            {similarityPercentage} match
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
          {job.min_experience_years && (
            <div className="flex items-center space-x-1">
              <Briefcase className="w-4 h-4" />
              <span>{job.min_experience_years}+ years</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatRelativeTime(job.first_published)}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {truncateText(job.chunk_text, 200)}
        </p>

        <div className="flex gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={onApply}
            className="flex-1"
          >
            Quick Apply
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={onViewDetails}
            className="flex-1"
          >
            View Details
          </Button>
          <a
            href={job.job_link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <ExternalLink className="w-5 h-5 text-gray-600" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
