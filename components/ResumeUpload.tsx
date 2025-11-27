'use client';

import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { isValidResumeFile, formatFileSize } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ResumeUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onRemove: () => void;
  loading?: boolean;
}

export function ResumeUpload({ onFileSelect, selectedFile, onRemove, loading }: ResumeUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError(null);

    if (!isValidResumeFile(file)) {
      setError('Please upload a valid resume file (PDF, DOC, DOCX, or TXT) under 15MB');
      return;
    }

    onFileSelect(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  if (selectedFile) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-100 p-3 rounded-lg">
                <File className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            {!loading && (
              <button
                onClick={onRemove}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200',
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 bg-gray-50 hover:border-primary-400 hover:bg-primary-25'
        )}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={cn(
            'p-4 rounded-full transition-colors',
            isDragging ? 'bg-primary-200' : 'bg-primary-100'
          )}>
            <Upload className={cn(
              'w-8 h-8',
              isDragging ? 'text-primary-700' : 'text-primary-600'
            )} />
          </div>

          <div>
            <p className="text-lg font-medium text-gray-900 mb-1">
              {isDragging ? 'Drop your resume here' : 'Upload your resume'}
            </p>
            <p className="text-sm text-gray-500">
              PDF, DOC, DOCX, or TXT (max 15MB)
            </p>
          </div>

          <Button
            variant="outline"
            onClick={handleBrowseClick}
            type="button"
          >
            Browse Files
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </>
  );
}
