
import React from 'react';
import { cn } from '@/lib/utils';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Data Collection & Integration',
      description: 'Our system aggregates data from diverse sources including conflict reports, climate data, economic indicators, population movements, and social media signals.',
      highlight: 'Comprehensive data pipeline'
    },
    {
      number: '02',
      title: 'Predictive Analysis',
      description: 'Advanced machine learning algorithms process the data to identify patterns and predict regions with the highest risk of humanitarian crises.',
      highlight: 'AI-powered forecasting'
    },
    {
      number: '03',
      title: 'Risk Assessment',
      description: 'The platform generates detailed risk assessments with confidence scores and recommended actions for each identified region.',
      highlight: 'Actionable insights'
    },
    {
      number: '04',
      title: 'Resource Planning',
      description: 'Based on the forecasts, make informed decisions about resource allocation, pre-positioning supplies, and staff deployment.',
      highlight: 'Optimized response'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3')] bg-cover bg-fixed opacity-[0.02] -z-10"></div>
      
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slideUp">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/5 text-primary rounded-full mb-4">
            The Process
          </span>
          <h2 className="section-title">How C-CAR Works</h2>
          <p className="text-muted-foreground text-lg">
            Our systematic approach transforms complex data into actionable insights for humanitarian response.
          </p>
        </div>
        
        <div className="relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 -ml-px"></div>
          
          <div className="space-y-12 md:space-y-24 relative">
            {steps.map((step, index) => (
              <div key={index} className={cn(
                "relative grid md:grid-cols-2 gap-8 items-center animate-slideUp",
                index % 2 === 1 ? "md:rtl" : ""
              )}
              style={{ animationDelay: `${index * 100}ms` }}>
                {/* Number marker */}
                <div className="absolute left-0 md:left-1/2 w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center -ml-7 md:rtl:ml-7 md:rtl:-mr-7 border border-gray-100 z-10">
                  <span className="text-primary font-bold">{step.number}</span>
                </div>
                
                {/* Content */}
                <div className={cn(
                  "pl-20 md:pl-0 md:text-right md:rtl:text-left",
                  index % 2 === 1 ? "md:order-2" : ""
                )}>
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/5 text-primary rounded-full">
                    {step.highlight}
                  </span>
                </div>
                
                {/* Illustration */}
                <div className={cn(
                  "bg-white rounded-xl overflow-hidden shadow-md border border-gray-100",
                  "aspect-video flex items-center justify-center p-6",
                  "glass-card",
                  index % 2 === 1 ? "md:order-1" : ""
                )}>
                  <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-primary text-xl font-semibold">Step {step.number} Visual</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
