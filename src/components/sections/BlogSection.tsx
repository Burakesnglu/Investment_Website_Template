'use client';

import React, { useState, useRef } from 'react';
import SectionContainer from '../layout/SectionContainer';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  link: string;
}

interface BlogSectionProps {
  title: string;
  subtitle?: string;
  posts: BlogPost[];
  viewAllLink?: string;
}

export default function BlogSection({
  title,
  subtitle,
  posts,
  viewAllLink,
}: BlogSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  
  const totalSlides = Math.ceil(posts.length / 3);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  };
  
  const nextSlide = () => {
    const next = (currentSlide + 1) % totalSlides;
    goToSlide(next);
  };
  
  const prevSlide = () => {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prev);
  };
  
  return (
    <SectionContainer background="light">
      <SectionTitle 
        title={title}
        subtitle={subtitle}
      />
      
      <div className="relative">
        {/* Carousel container */}
        <div className="overflow-hidden">
          <div 
            ref={slideRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ width: `${totalSlides * 100}%` }}
          >
            {Array(totalSlides).fill(0).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full" style={{ flexShrink: 0 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.slice(slideIndex * 3, slideIndex * 3 + 3).map((post) => (
                    <Card
                      key={post.id}
                      title={post.title}
                      description={post.excerpt}
                      variant="blog"
                      href={post.link}
                    >
                      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                        <span>{post.author}</span>
                        <span>{post.date}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation buttons */}
        <button 
          onClick={prevSlide}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-white text-primary w-10 h-10 rounded-full shadow-soft flex items-center justify-center hover:shadow-premium transition-shadow focus:outline-none"
          aria-label="Önceki"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-white text-primary w-10 h-10 rounded-full shadow-soft flex items-center justify-center hover:shadow-premium transition-shadow focus:outline-none"
          aria-label="Sonraki"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Carousel indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array(totalSlides).fill(0).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentSlide === index ? 'bg-primary' : 'bg-gray-300'
            }`}
            aria-label={`Slayt ${index + 1}`}
          ></button>
        ))}
      </div>
      
      {viewAllLink && (
        <div className="text-center mt-12">
          <Button 
            href={viewAllLink}
            variant="outline"
          >
            Tüm Makaleleri Görüntüle
          </Button>
        </div>
      )}
    </SectionContainer>
  );
} 