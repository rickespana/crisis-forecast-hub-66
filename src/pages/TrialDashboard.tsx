import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { 
  LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Area, AreaChart 
} from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Map, AlertTriangle, BarChart3, LineChart as LineChartIcon, 
  Filter, RefreshCw, Download, Info, Save, Bell, PlusCircle
} from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useToast } from '@/hooks/use-toast';

// Mock data for the dashboard
const forecastData = [
  { country: 'Ukraine', forecast: 4507, average: 4434, change: -2 },
  { country: 'Russia', forecast: 1601, average: 1287, change: 24 },
  { country: 'Myanmar', forecast: 974, average: 1030, change: -5 },
  { country: 'Syria', forecast: 744, average: 987, change: -25 },
  { country: 'Mexico', forecast: 637, average: 626, change: 2 },
  { country: 'Brazil', forecast: 632, average: 746, change: -15 },
  { country: 'Palestine', forecast: 508, average: 1067, change: -52 },
  { country: 'Sudan', forecast: 379, average: 431, change: -12 },
  { country: 'Somalia', forecast: 294, average: 244, change: 20 },
  { country: 'Lebanon', forecast: 259, average: 988, change: -74 },
  { country: 'Iraq', forecast: 235, average: 521, change: -55 },
  { country: 'Nigeria', forecast: 230, average: 329, change: -30 },
  { country: 'Yemen', forecast: 185, average: 168, change: 10 },
  { country: 'Pakistan', forecast: 183, average: 167, change: 10 },
  { country: 'Colombia', forecast: 180, average: 181, change: -1 },
  { country: 'Dem. Rep. Congo', forecast: 179, average: 152, change: 18 },
  { country: 'Ethiopia', forecast: 114, average: 198, change: -42 },
  { country: 'Burkina Faso', forecast: 107, average: 109, change: -2 },
  { country: 'Mali', forecast: 106, average: 117, change: -9 },
  { country: 'Haiti', forecast: 98, average: 88, change: 11 }
];

const violenceTypeData = [
  { type: 'All Event Types', events: 12853, change: 2 },
  { type: 'Explosions & Remote Violence', events: 6271, change: -5 },
  { type: 'Battles', events: 4108, change: 4 },
  { type: 'Violence Against Civilians', events: 2474, change: 7 }
];

const disasterTypeData = [
  { type: 'Floods', events: 387, change: 12 },
  { type: 'Droughts', events: 142, change: 8 },
  { type: 'Earthquakes', events: 89, change: -3 },
  { type: 'Wildfires', events: 76, change: 15 }
];

const historyData = [
  { month: 'Jan', historical: 14000, forecasted: null },
  { month: 'Feb', historical: 14500, forecasted: null },
  { month: 'Mar', historical: 14200, forecasted: null },
  { month: 'Apr', historical: 15500, forecasted: null },
  { month: 'May', historical: 16200, forecasted: null },
  { month: 'Jun', historical: 17500, forecasted: null },
  { month: 'Jul', historical: 19000, forecasted: null },
  { month: 'Aug', historical: 18000, forecasted: null },
  { month: 'Sep', historical: 14800, forecasted: null },
  { month: 'Oct', historical: 13500, forecasted: null },
  { month: 'Nov', historical: 12900, forecasted: null },
  { month: 'Dec', historical: 12500, forecasted: null },
  { month: 'Jan', historical: null, forecasted: 12800 },
  { month: 'Feb', historical: null, forecasted: 12800 },
  { month: 'Mar', historical: null, forecasted: 12800 },
  { month: 'Apr', historical: null, forecasted: 12800 },
];

// HDI and vulnerability score for countries (mock data)
const vulnerabilityData = [
  { country: 'Ethiopia', hdi: 0.498, vulnerabilityScore: 89 },
  { country: 'Sudan', hdi: 0.510, vulnerabilityScore: 87 },
  { country: 'Haiti', hdi: 0.535, vulnerabilityScore: 85 },
  { country: 'Yemen', hdi: 0.455, vulnerabilityScore: 92 },
  { country: 'Mali', hdi: 0.428, vulnerabilityScore: 91 },
  { country: 'Burkina Faso', hdi: 0.449, vulnerabilityScore: 86 },
  { country: 'Dem. Rep. Congo', hdi: 0.480, vulnerabilityScore: 88 },
  { country: 'Somalia', hdi: 0.361, vulnerabilityScore: 95 },
  { country: 'Syria', hdi: 0.577, vulnerabilityScore: 84 },
  { country: 'Afghanistan', hdi: 0.478, vulnerabilityScore: 90 }
];

// Saved dashboard views
const savedViews = [
  { id: 1, name: "Global Overview", countries: ["All"], eventTypes: ["All Event Types"], timeframe: "12months" },
  { id: 2, name: "Africa Focus", countries: ["Ethiopia", "Sudan", "Somalia"], eventTypes: ["All Event Types"], timeframe: "6months" },
  { id: 3, name: "Middle East Crisis", countries: ["Syria", "Yemen", "Iraq"], eventTypes: ["Battles", "Violence Against Civilians"], timeframe: "3months" }
];

// Color utilities
const getChangeColor = (change: number) => {
  if (change > 15) return 'text-red-600';
  if (change > 5) return 'text-orange-500';
  if (change > -5) return 'text-gray-700';
  if (change > -15) return 'text-yellow-500';
  return 'text-green-600';
};

const getChangeBackground = (change: number) => {
  if (change > 15) return 'bg-red-100';
  if (change > 5) return 'bg-orange-50';
  if (change > -5) return 'bg-gray-50';
  if (change > -15) return 'bg-yellow-50';
  return 'bg-green-50';
};

const getVulnerabilityColor = (score: number) => {
  if (score > 90) return 'text-red-600';
  if (score > 80) return 'text-orange-500';
  if (score > 70) return 'text-yellow-500';
  return 'text-blue-500';
};

const TrialDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('forecasts');
  const [selectedView, setSelectedView] = useState(0);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['All']);
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>(['All Event Types']);
  const [timeframe, setTimeframe] = useState('12months');
  const [chartType, setChartType] = useState('line');
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [dashboardName, setDashboardName] = useState('');
  
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  // Load saved view when selected
  useEffect(() => {
    if (selectedView > 0) {
      const view = savedViews.find(v => v.id === selectedView);
      if (view) {
        setSelectedCountries(view.countries);
        setSelectedEventTypes(view.eventTypes);
        setTimeframe(view.timeframe);
        toast({
          title: "Dashboard view loaded",
          description: `Loaded "${view.name}" configuration`,
        });
      }
    }
  }, [selectedView]);

  // Filter data based on selections
  const filteredForecastData = forecastData.filter(item => {
    if (selectedCountries.includes('All')) return true;
    return selectedCountries.includes(item.country);
  });

  const handleSaveView = () => {
    if (dashboardName.trim() !== '') {
      toast({
        title: "Configuration saved",
        description: `"${dashboardName}" has been saved to your dashboard views.`,
      });
      setDashboardName('');
      setShowSubscribeModal(true);
    } else {
      toast({
        title: "Name required",
        description: "Please provide a name for your dashboard configuration.",
        variant: "destructive",
      });
    }
  };

  const handleSetupAlerts = () => {
    toast({
      title: "Upgrade required",
      description: "Alert configuration is available in the premium subscription.",
    });
    setShowSubscribeModal(true);
  };

  const handleGenerateReport = () => {
    toast({
      title: "Generating report",
      description: "Your insights report is being prepared.",
    });
    
    setTimeout(() => {
      setShowSubscribeModal(true);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Complex Crises Anticipated Response</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Trial Version</span>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
              <TabsTrigger value="accuracy">Accuracy Metrics</TabsTrigger>
              <TabsTrigger value="vulnerability">Vulnerability Index</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            
            <TabsContent value="forecasts" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between items-center">
                      <span>Dashboard Configuration</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setSelectedCountries(['All']);
                          setSelectedEventTypes(['All Event Types']);
                          setTimeframe('12months');
                          setSelectedView(0);
                          toast({
                            title: "Reset complete",
                            description: "Dashboard has been reset to default settings",
                          });
                        }}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-6">
                      <h4 className="font-medium">Saved Views</h4>
                      <div className="relative">
                        <select 
                          className="w-full p-2 pr-8 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                          value={selectedView}
                          onChange={(e) => setSelectedView(Number(e.target.value))}
                        >
                          <option value={0}>Custom View</option>
                          {savedViews.map(view => (
                            <option key={view.id} value={view.id}>{view.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Name this configuration..."
                          className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
                          value={dashboardName}
                          onChange={(e) => setDashboardName(e.target.value)}
                        />
                        <Button 
                          variant="secondary"
                          className="rounded-l-none"
                          onClick={handleSaveView}
                        >
                          <Save className="h-4 w-4 mr-2" /> Save
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mb-6 border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Event Types</h4>
                        <span className="text-xs text-muted-foreground">
                          {selectedEventTypes.length === 1 && selectedEventTypes[0] === 'All Event Types' 
                            ? 'All selected'
                            : `${selectedEventTypes.length} selected`}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        {[...violenceTypeData, ...disasterTypeData].map((item) => (
                          <div key={item.type} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`type-${item.type}`}
                                  className="rounded text-primary focus:ring-primary"
                                  checked={selectedEventTypes.includes(item.type) || selectedEventTypes.includes('All Event Types')}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      if (item.type === 'All Event Types') {
                                        setSelectedEventTypes(['All Event Types']);
                                      } else {
                                        setSelectedEventTypes(prev => 
                                          prev.includes('All Event Types')
                                            ? [item.type]
                                            : [...prev.filter(t => t !== 'All Event Types'), item.type]
                                        );
                                      }
                                    } else {
                                      setSelectedEventTypes(prev => prev.filter(t => t !== item.type));
                                    }
                                  }}
                                />
                                <label htmlFor={`type-${item.type}`} className="ml-2 text-sm font-medium">
                                  {item.type}
                                </label>
                              </div>
                              <span className="text-sm font-semibold">
                                {item.events.toLocaleString()}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: `${Math.min(100, (item.events / 15000) * 100)}%` }} 
                              />
                            </div>
                            <div className="flex justify-end">
                              <span className={`text-xs px-2 py-0.5 rounded ${getChangeColor(item.change)} ${getChangeBackground(item.change)}`}>
                                {item.change > 0 ? '+' : ''}{item.change}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4 border-t pt-4">
                      <h4 className="font-medium">Country</h4>
                      <div className="relative">
                        <select 
                          className="w-full p-2 pr-8 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                          value={selectedCountries.length === 1 ? selectedCountries[0] : "multiple"}
                          onChange={(e) => {
                            if (e.target.value !== "multiple") {
                              setSelectedCountries([e.target.value]);
                            }
                          }}
                        >
                          <option value="all">All</option>
                          <option value="multiple" disabled={selectedCountries.length <= 1}>
                            {selectedCountries.length > 1 ? `${selectedCountries.length} countries selected` : ""}
                          </option>
                          {forecastData.map(item => (
                            <option key={item.country} value={item.country}>{item.country}</option>
                          ))}
                        </select>
                      </div>
                      
                      <h4 className="font-medium">Compare forecast to</h4>
                      <div className="relative">
                        <select 
                          className="w-full p-2 pr-8 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                          value={timeframe}
                          onChange={(e) => setTimeframe(e.target.value)}
                        >
                          <option value="12months">Last 12 months</option>
                          <option value="6months">Last 6 months</option>
                          <option value="3months">Last 3 months</option>
                        </select>
                      </div>
                      
                      <h4 className="font-medium">Chart type</h4>
                      <div className="flex space-x-2">
                        <Button 
                          variant={chartType === 'line' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setChartType('line')}
                        >
                          <LineChartIcon className="h-4 w-4 mr-2" />
                          Line
                        </Button>
                        <Button 
                          variant={chartType === 'bar' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setChartType('bar')}
                        >
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Bar
                        </Button>
                        <Button 
                          variant={chartType === 'area' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setChartType('area')}
                        >
                          <LineChartIcon className="h-4 w-4 mr-2" />
                          Area
                        </Button>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3 border-t pt-4">
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center"
                        onClick={handleSetupAlerts}
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        Configure Email Alerts
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center"
                        onClick={handleGenerateReport}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Generate Insights Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">World Map View</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center">
                        <img 
                          src="/lovable-uploads/b6127ca4-fcb0-4f11-a176-f4c45c8b7669.png" 
                          alt="Crisis Forecast Map" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex flex-col space-y-2">
                          <Button size="icon" variant="secondary" className="h-8 w-8 bg-white shadow-md">
                            <span className="text-lg">+</span>
                          </Button>
                          <Button size="icon" variant="secondary" className="h-8 w-8 bg-white shadow-md">
                            <span className="text-lg">−</span>
                          </Button>
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 flex space-x-2">
                        <div className="flex items-center bg-white px-3 py-1 rounded-md shadow-sm text-xs">
                          <span className="w-3 h-3 bg-gray-300 rounded-sm mr-2"></span>
                          <span>Fewer than 5 Events</span>
                        </div>
                        <div className="flex items-center bg-white px-3 py-1 rounded-md shadow-sm text-xs">
                          <span className="w-3 h-3 bg-yellow-200 rounded-sm mr-2"></span>
                          <span>Predicted Decrease</span>
                        </div>
                        <div className="flex items-center bg-white px-3 py-1 rounded-md shadow-sm text-xs">
                          <span className="w-3 h-3 bg-orange-200 rounded-sm mr-2"></span>
                          <span>Limited change</span>
                        </div>
                        <div className="flex items-center bg-white px-3 py-1 rounded-md shadow-sm text-xs">
                          <span className="w-3 h-3 bg-red-200 rounded-sm mr-2"></span>
                          <span>Predicted Increase</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">Global (All Event Types)</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">View chart data</span>
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">View full screen</span>
                        <LineChartIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="aspect-[4/2]" config={{
                    historical: {
                      label: 'Historical events',
                      theme: {
                        light: '#3b82f6',
                        dark: '#60a5fa',
                      }
                    },
                    forecasted: {
                      label: 'Forecasted events',
                      theme: {
                        light: '#f97316',
                        dark: '#fb923c',
                      }
                    }
                  }}>
                    {/* Fixed: Wrap chart elements in a single React component */}
                    {chartType === 'line' ? (
                      <LineChart
                        data={historyData}
                        margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value / 1000}k`}
                        />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="historical"
                          stroke="var(--color-historical)"
                          strokeWidth={2}
                          dot={{ r: 4, strokeWidth: 2 }}
                          activeDot={{ r: 6, strokeWidth: 2 }}
                          name="historical"
                        />
                        <Line
                          type="monotone"
                          dataKey="forecasted"
                          stroke="var(--color-forecasted)"
                          strokeWidth={2}
                          dot={{ r: 4, strokeWidth: 2 }}
                          activeDot={{ r: 6, strokeWidth: 2 }}
                          name="forecasted"
                        />
                      </LineChart>
                    ) : chartType === 'bar' ? (
                      <BarChart
                        data={historyData}
                        margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value / 1000}k`}
                        />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="historical" name="historical" fill="var(--color-historical)" />
                        <Bar dataKey="forecasted" name="forecasted" fill="var(--color-forecasted)" />
                      </BarChart>
                    ) : (
                      <AreaChart
                        data={historyData}
                        margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value / 1000}k`}
                        />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="historical"
                          stroke="var(--color-historical)"
                          fill="var(--color-historical)"
                          fillOpacity={0.3}
                          name="historical"
                        />
                        <Area
                          type="monotone"
                          dataKey="forecasted"
                          stroke="var(--color-forecasted)"
                          fill="var(--color-forecasted)"
                          fillOpacity={0.3}
                          name="forecasted"
                        />
                      </AreaChart>
                    )}
                  </ChartContainer>
                  <div className="flex justify-between items-center mt-2">
                    <ChartLegend
                      className="flex-1 flex items-center space-x-4"
                      payload={[
                        { value: 'Historical events', color: '#3b82f6', dataKey: 'historical' },
                        { value: 'Forecasted events', color: '#f97316', dataKey: 'forecasted' }
                      ]}
                    />
                    <div className="flex space-x-4 text-sm">
                      <button className="text-primary hover:underline flex items-center">
                        <Info className="h-3 w-3 mr-1" />
                        What's driving the forecasts?
                      </button>
                      <button className="text-primary hover:underline">
                        Learn more
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    Forecasted Events (All Event Types) for {currentMonth} {currentYear}
                    <span className="block text-sm font-normal mt-1 text-muted-foreground">
                      Relative to {timeframe === '12months' ? '12-Month' : timeframe === '6months' ? '6-Month' : '3-Month'} Average
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left font-medium py-2 px-4">Country</th>
                          <th className="text-right font-medium py-2 px-4">Forecast</th>
                          <th className="text-right font-medium py-2 px-4">Average</th>
                          <th className="text-right font-medium py-2 px-4">Predicted Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredForecastData.map((row) => (
                          <tr key={row.country} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{row.country}</td>
                            <td className="text-right py-2 px-4">{row.forecast}</td>
                            <td className="text-right py-2 px-4">{row.average}</td>
                            <td className="text-right py-2 px-4">
                              <span className={`px-2 py-0.5 rounded ${getChangeColor(row.change)} ${getChangeBackground(row.change)}`}>
                                {row.change > 0 ? '+' : ''}{row.change}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              {/* Subscribe Modal */}
              {showSubscribeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <Card className="w-full max-w-md">
                    <CardHeader>
                      <CardTitle>Upgrade to Premium</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>To unlock premium features including:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Save custom dashboard configurations</li>
                        <li>Set up email alerts for forecast changes</li>
                        <li>Generate detailed insights reports</li>
                        <li>Access historical data going back 5 years</li>
                        <li>API access for integration with your systems</li>
                      </ul>
                      <div className="flex justify-end space-x-3 mt-6">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowSubscribeModal(false)}
                        >
                          Continue with Trial
                        </Button>
                        <Button onClick={() => {
                          toast({
                            title: "Thank you for your interest!",
                            description: "This is a demo application. In a real app, you would be directed to subscription options.",
                          });
                          setShowSubscribeModal(false);
                        }}>
                          View Plans
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="accuracy">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Forecast Accuracy Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                        <div className="text-3xl font-bold text-primary">89%</div>
                        <div className="mt-2 text-sm text-muted-foreground text-center">Overall Accuracy Rate</div>
                      </div>
                      <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                        <div className="text-3xl font-bold text-primary">±5.2%</div>
                        <div className="mt-2 text-sm text-muted-foreground text-center">Average Margin of Error</div>
                      </div>
                      <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                        <div className="text-3xl font-bold text-primary">92%</div>
                        <div className="mt-2 text-sm text-muted-foreground text-center">Directional Accuracy</div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Historical Forecast Performance</h3>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={[
                              { month: 'Jan', accuracy: 85 },
                              { month: 'Feb', accuracy: 87 },
                              { month: 'Mar', accuracy: 82 },
                              { month: 'Apr', accuracy: 88 },
                              { month: 'May', accuracy: 90 },
                              { month: 'Jun', accuracy: 89 },
                              { month: 'Jul', accuracy: 91 },
                              { month: 'Aug', accuracy: 93 },
                              { month: 'Sep', accuracy: 90 },
                              { month
