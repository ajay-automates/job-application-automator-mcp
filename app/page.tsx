'use client';

import React, { useState } from 'react';
import { Briefcase, History, Upload, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { ResumeUpload } from '@/components/ResumeUpload';
import { JobFilters } from '@/components/JobFilters';
import { JobList } from '@/components/JobList';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { JobFilters as JobFiltersType, MatchResponse } from '@/types';
import { uploadResumeAndMatch } from '@/lib/api/jobs';
import { toast } from 'sonner';

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filters, setFilters] = useState<JobFiltersType>({
    sortBy: 'similarity',
  });
  const [matchResults, setMatchResults] = useState<MatchResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setMatchResults(null);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setMatchResults(null);
  };

  const handleSearch = async () => {
    if (!selectedFile) {
      toast.error('Please upload your resume first');
      return;
    }

    setLoading(true);
    try {
      const results = await uploadResumeAndMatch(selectedFile, filters);
      setMatchResults(results);

      if (results.total_matches === 0) {
        toast.info('No matching jobs found. Try adjusting your filters.');
      } else {
        toast.success(`Found ${results.total_matches} matching jobs!`);
      }
    } catch (error: any) {
      console.error('Search error:', error);
      toast.error(error.message || 'Failed to search jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Job Application Bot</h1>
            </div>
            <Link href="/history">
              <Button variant="outline" size="md">
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {!matchResults && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect Job in Seconds
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your resume and let AI find the best matching jobs for you
            </p>
          </div>
        )}

        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Upload className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">Upload Resume</h3>
            </div>
          </CardHeader>
          <CardContent>
            <ResumeUpload
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              onRemove={handleRemoveFile}
              loading={loading}
            />
          </CardContent>
        </Card>

        {/* Filters Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">Filter Jobs (Optional)</h3>
            </div>
          </CardHeader>
          <CardContent>
            <JobFilters filters={filters} onChange={setFilters} />
          </CardContent>
        </Card>

        {/* Search Button */}
        {selectedFile && !matchResults && (
          <div className="flex justify-center mb-8">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSearch}
              loading={loading}
              className="px-12"
            >
              {loading ? 'Searching...' : 'Find Matching Jobs'}
            </Button>
          </div>
        )}

        {/* Results Section */}
        {matchResults && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {matchResults.total_matches} Matching Jobs
                </h2>
                {matchResults.extracted_skills && matchResults.extracted_skills.length > 0 && (
                  <p className="text-gray-600 mt-1">
                    Based on your skills: {matchResults.extracted_skills.slice(0, 5).join(', ')}
                    {matchResults.extracted_skills.length > 5 && ` +${matchResults.extracted_skills.length - 5} more`}
                  </p>
                )}
              </div>
              <Button variant="outline" onClick={() => setMatchResults(null)}>
                New Search
              </Button>
            </div>

            {matchResults.resume_processing && (
              <Card className="bg-primary-50 border-primary-200">
                <CardContent className="py-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Resume File</p>
                      <p className="font-medium text-gray-900">{matchResults.resume_processing.filename}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Enhancement</p>
                      <p className="font-medium text-gray-900">
                        {matchResults.resume_processing.enhancement_used ? 'AI Enhanced' : 'Original'}
                      </p>
                    </div>
                    {matchResults.user_experience && (
                      <div>
                        <p className="text-gray-600">Experience Level</p>
                        <p className="font-medium text-gray-900">{matchResults.user_experience}+ years</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <JobList jobs={matchResults.matches} loading={false} />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4" />
            <p className="text-lg text-gray-600">Analyzing your resume and finding matching jobs...</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600">
          <p>Powered by AI &middot; Built with Next.js</p>
        </div>
      </footer>
    </div>
  );
}
