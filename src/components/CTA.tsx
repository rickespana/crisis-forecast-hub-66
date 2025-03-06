
import React from 'react';
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute h-64 w-64 rounded-full bg-primary/5 -top-20 -right-20 animate-float"></div>
      <div className="absolute h-48 w-48 rounded-full bg-primary/5 -bottom-10 -left-10 animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="section-container">
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 lg:p-16 text-center animate-slideUp">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-6">
            Ready to Transform Your Approach?
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Anticipating Crises Today
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join forward-thinking humanitarian organizations using data-driven forecasting to maximize impact and save more lives.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-md px-8 py-6 h-auto">
              Schedule a Demo
            </Button>
            <Button variant="outline" size="lg" className="bg-white/90 rounded-md px-8 py-6 h-auto">
              Contact Sales
            </Button>
          </div>
          
          <div className="mt-12 pt-6 border-t border-gray-100">
            <p className="text-sm text-muted-foreground">
              Have questions? Email us at <a href="mailto:info@c-car.io" className="text-primary hover:underline">info@c-car.io</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
