'use client';

import React, { useState } from 'react';
import { X, CheckCircle, ExternalLink } from 'lucide-react';
import { JobMatch, ApplicationHistory } from '@/types';
import { Button } from './ui/Button';
import { saveApplication } from '@/lib/storage';
import { toast } from 'sonner';

interface ApplyModalProps {
  job: JobMatch;
  onClose: () => void;
}

export function ApplyModal({ job, onClose }: ApplyModalProps) {
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    setApplying(true);

    // Simulate application process
    await new Promise(resolve => setTimeout(resolve, 1500));

    const application: ApplicationHistory = {
      id: `${job.job_link}-${Date.now()}`,
      jobLink: job.job_link,
      companyName: job.company_name,
      jobTitle: job.job_title,
      appliedAt: new Date().toISOString(),
      status: 'pending',
    };

    saveApplication(application);
    setApplied(true);
    setApplying(false);

    toast.success('Application submitted successfully!');

    // Open job link in new tab
    window.open(job.job_link, '_blank');
  };

  if (applied) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

          <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-6 pt-6 pb-4 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Application Submitted!
              </h3>
              <p className="text-gray-600 mb-4">
                Your application for <strong>{job.job_title}</strong> at <strong>{job.company_name}</strong> has been recorded.
              </p>
              <p className="text-sm text-gray-500">
                The job page has been opened in a new tab. Please complete the application process there.
              </p>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <Button
                variant="primary"
                size="lg"
                onClick={onClose}
                className="w-full"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-lg p-2 hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="bg-white px-6 pt-6 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Apply</h2>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-1">{job.job_title}</h3>
              <p className="text-gray-700">{job.company_name}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 rounded-full p-2 mt-0.5">
                  <ExternalLink className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">External Application</p>
                  <p className="text-sm text-gray-600">
                    This will open the job page in a new tab where you can complete your application.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 rounded-full p-2 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Track Your Application</p>
                  <p className="text-sm text-gray-600">
                    We'll save this application in your history for easy tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 flex gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleApply}
              loading={applying}
              className="flex-1"
            >
              {applying ? 'Processing...' : 'Apply Now'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
