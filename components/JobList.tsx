'use client';

import React, { useState } from 'react';
import { JobMatch } from '@/types';
import { JobCard } from './JobCard';
import { JobDetailModal } from './JobDetailModal';
import { ApplyModal } from './ApplyModal';

interface JobListProps {
  jobs: JobMatch[];
  loading?: boolean;
}

export function JobList({ jobs, loading }: JobListProps) {
  const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null);
  const [applyingJob, setApplyingJob] = useState<JobMatch | null>(null);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-64" />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
        <p className="text-gray-600">Try adjusting your filters or upload a different resume</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <JobCard
            key={`${job.job_link}-${index}`}
            job={job}
            onViewDetails={() => setSelectedJob(job)}
            onApply={() => setApplyingJob(job)}
          />
        ))}
      </div>

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={() => {
            setApplyingJob(selectedJob);
            setSelectedJob(null);
          }}
        />
      )}

      {applyingJob && (
        <ApplyModal
          job={applyingJob}
          onClose={() => setApplyingJob(null)}
        />
      )}
    </>
  );
}
