import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionContainer from '../layout/SectionContainer';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';

interface Report {
  id: number;
  title: string;
  date: string;
  image: string;
  link: string;
}

interface ReportsSectionProps {
  title: string;
  subtitle?: string;
  reports: Report[];
  viewAllLink?: string;
}

export default function ReportsSection({
  title,
  subtitle,
  reports,
  viewAllLink,
}: ReportsSectionProps) {
  return (
    <SectionContainer background="light">
      <SectionTitle 
        title={title}
        subtitle={subtitle}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-soft hover:shadow-premium transition-shadow duration-300">
            {/* Thumbnail or Placeholder */}
            <div className="h-40 bg-accent-gray rounded-t-lg relative overflow-hidden">
              {/* Placeholder for thumbnail - would use Image component in production */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400">PDF</span>
              </div>
              
              {/* Category badge */}
              <div className="absolute top-3 left-3 bg-primary text-text-dark text-xs px-2 py-1 rounded">
                Rapor
              </div>
            </div>
            
            {/* Content */}
            <div className="p-5">
              <h3 className="font-semibold mb-2 line-clamp-2">{report.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{report.date}</p>
              
              <Link 
                href={report.link} 
                className="inline-flex items-center text-primary hover:underline"
              >
                <span>Raporu İndir</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {viewAllLink && (
        <div className="text-center mt-12">
          <Button 
            href={viewAllLink}
            variant="outline"
          >
            Tüm Raporları Görüntüle
          </Button>
        </div>
      )}
    </SectionContainer>
  );
} 