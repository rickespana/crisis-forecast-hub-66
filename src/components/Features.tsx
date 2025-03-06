
import React from 'react';
import { 
  TrendingUp, 
  Map, 
  AlertTriangle, 
  Database, 
  BarChart3, 
  Shield 
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Predictive Intelligence",
      description: "Leverage powerful AI models trained on historical and real-time data to forecast crisis regions with unprecedented accuracy."
    },
    {
      icon: <Map className="h-6 w-6 text-primary" />,
      title: "Geospatial Analysis",
      description: "Visualize risk forecasts with detailed regional mapping to pinpoint areas requiring the most urgent intervention."
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-primary" />,
      title: "Early Warning System",
      description: "Receive automated alerts when trend indicators suggest emerging risks in monitored regions."
    },
    {
      icon: <Database className="h-6 w-6 text-primary" />,
      title: "Resource Optimization",
      description: "Make informed decisions about pre-positioning supplies and allocating resources based on data-driven forecasts."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Impact Analytics",
      description: "Measure the effectiveness of interventions with comprehensive analytics dashboards and reporting tools."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Risk Mitigation",
      description: "Develop targeted intervention strategies using our scenario planning and simulation capabilities."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white relative">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slideUp">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/5 text-primary rounded-full mb-4">
            Core Features
          </span>
          <h2 className="section-title">Data-Driven Decision Making</h2>
          <p className="text-muted-foreground text-lg">
            Our comprehensive platform offers everything you need to anticipate and respond to humanitarian crises effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-6 sm:p-8 flex flex-col animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="rounded-full bg-primary/10 p-3 w-fit mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground flex-grow">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
