'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trash2, ExternalLink, Clock, CheckCircle, XCircle, Timer } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ApplicationHistory } from '@/types';
import { getApplicationHistory, deleteApplication, updateApplicationStatus } from '@/lib/storage';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { toast } from 'sonner';

export default function HistoryPage() {
  const [applications, setApplications] = useState<ApplicationHistory[]>([]);

  useEffect(() => {
    setApplications(getApplicationHistory());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      deleteApplication(id);
      setApplications(getApplicationHistory());
      toast.success('Application deleted');
    }
  };

  const handleUpdateStatus = (id: string, status: ApplicationHistory['status']) => {
    updateApplicationStatus(id, status);
    setApplications(getApplicationHistory());
    toast.success('Status updated');
  };

  const getStatusIcon = (status: ApplicationHistory['status']) => {
    switch (status) {
      case 'applied':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'interviewing':
        return <Timer className="w-5 h-5 text-blue-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: ApplicationHistory['status']) => {
    switch (status) {
      case 'applied':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'interviewing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" size="md">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Application History</h1>
            </div>
            <p className="text-gray-600">{applications.length} applications</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {applications.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <Clock className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Applications Yet</h2>
            <p className="text-gray-600 mb-6">Start applying to jobs to see your history here</p>
            <Link href="/">
              <Button variant="primary" size="lg">
                Find Jobs
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <Card key={app.id} hover>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {app.jobTitle}
                      </h3>
                      <p className="text-base text-gray-700 font-medium mb-3">
                        {app.companyName}
                      </p>

                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className={`px-3 py-1 rounded-lg border text-sm font-medium flex items-center space-x-1 ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          <span className="capitalize">{app.status}</span>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatRelativeTime(app.appliedAt)}</span>
                          <span className="text-gray-400">•</span>
                          <span>{formatDate(app.appliedAt)}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <select
                          value={app.status}
                          onChange={(e) => handleUpdateStatus(app.id, e.target.value as ApplicationHistory['status'])}
                          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="pending">Pending</option>
                          <option value="applied">Applied</option>
                          <option value="interviewing">Interviewing</option>
                          <option value="rejected">Rejected</option>
                        </select>

                        <a
                          href={app.jobLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View Job
                        </a>

                        <button
                          onClick={() => handleDelete(app.id)}
                          className="inline-flex items-center px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
