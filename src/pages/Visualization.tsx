
import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import HeatMap from '../components/HeatMap';

const Visualization = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Nav />
      <main>
        <section className="py-12 md:py-16 lg:py-20 bg-white relative">
          <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/5 text-primary rounded-full mb-4">
                Data Visualization
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Crisis Forecast Visualization</h1>
              <p className="text-lg text-muted-foreground">
                View global conflict hotspots based on validated historical data from ACLED. 
                Our forecasting models use this data to predict future crisis areas.
              </p>
            </div>
            
            <div className="glass-card overflow-hidden">
              <HeatMap />
            </div>
            
            <div className="mt-12 md:mt-16 max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Understanding the Visualization</h2>
              <p className="text-muted-foreground mb-6">
                This heatmap visualization represents historical conflict data, showing intensity 
                levels across different regions. Our forecasting models analyze these patterns 
                along with data from EM-DAT and HDI to predict future crisis areas.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-lg mb-2">ACLED Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Conflict data from the Armed Conflict Location & Event Data Project, 
                    providing detailed information about political violence and protests worldwide.
                  </p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-lg mb-2">EM-DAT</h3>
                  <p className="text-sm text-muted-foreground">
                    The Emergency Events Database, containing essential data on natural 
                    and technological disasters and their impacts worldwide.
                  </p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-lg mb-2">HDI Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Human Development Index data provides context on socio-economic factors 
                    that affect vulnerability to crises and humanitarian needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Visualization;
