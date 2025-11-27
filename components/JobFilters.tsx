'use client';

import React from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';
import { JobFilters as JobFiltersType } from '@/types';

interface JobFiltersProps {
  filters: JobFiltersType;
  onChange: (filters: JobFiltersType) => void;
}

export function JobFilters({ filters, onChange }: JobFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Keywords</span>
          </div>
        </label>
        <input
          type="text"
          placeholder="e.g., Python, Machine Learning"
          value={filters.keywords || ''}
          onChange={(e) => onChange({ ...filters, keywords: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Location</span>
          </div>
        </label>
        <input
          type="text"
          placeholder="e.g., Remote, San Francisco"
          value={filters.location || ''}
          onChange={(e) => onChange({ ...filters, location: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Posted Date</span>
          </div>
        </label>
        <select
          value={filters.startDate || ''}
          onChange={(e) => {
            const value = e.target.value;
            const today = new Date();
            let startDate = '';

            if (value === '7') {
              const date = new Date(today);
              date.setDate(date.getDate() - 7);
              startDate = date.toISOString().split('T')[0];
            } else if (value === '30') {
              const date = new Date(today);
              date.setDate(date.getDate() - 30);
              startDate = date.toISOString().split('T')[0];
            } else if (value === '90') {
              const date = new Date(today);
              date.setDate(date.getDate() - 90);
              startDate = date.toISOString().split('T')[0];
            }

            onChange({ ...filters, startDate, endDate: today.toISOString().split('T')[0] });
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">Any time</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>
    </div>
  );
}
