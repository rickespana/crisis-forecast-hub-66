
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { 
  LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Area, AreaChart 
} from 'recharts';
import { 
  Map, AlertTriangle, BarChart3, LineChart as LineChartIcon, 
  Filter, RefreshCw, Download, Info
} from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

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
  const [activeTab, setActiveTab] = useState('forecasts');
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();
  
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
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex space-x-8">
              <button 
                onClick={() => setActiveTab('forecasts')}
                className={`pb-4 px-1 ${activeTab === 'forecasts' 
                  ? 'border-b-2 border-primary text-primary font-medium' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Forecasts
              </button>
              <button 
                onClick={() => setActiveTab('accuracy')}
                className={`pb-4 px-1 ${activeTab === 'accuracy' 
                  ? 'border-b-2 border-primary text-primary font-medium' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Accuracy Metrics
              </button>
              <button 
                onClick={() => setActiveTab('vulnerability')}
                className={`pb-4 px-1 ${activeTab === 'vulnerability' 
                  ? 'border-b-2 border-primary text-primary font-medium' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Vulnerability Index
              </button>
              <button 
                onClick={() => setActiveTab('about')}
                className={`pb-4 px-1 ${activeTab === 'about' 
                  ? 'border-b-2 border-primary text-primary font-medium' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                About
              </button>
            </nav>
          </div>
          
          {activeTab === 'forecasts' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Global Forecasts for {currentMonth} {currentYear}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {violenceTypeData.map((item) => (
                        <div key={item.type} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{item.type}</span>
                            <span className="text-sm font-semibold">{item.events.toLocaleString()}</span>
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
                    
                    <div className="mt-6 space-y-4">
                      <h4 className="font-medium">Country</h4>
                      <div className="relative">
                        <select 
                          className="w-full p-2 pr-8 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                          defaultValue="all"
                        >
                          <option value="all">All</option>
                          <option value="ukraine">Ukraine</option>
                          <option value="syria">Syria</option>
                          <option value="sudan">Sudan</option>
                          <option value="myanmar">Myanmar</option>
                          <option value="ethiopia">Ethiopia</option>
                        </select>
                      </div>
                      
                      <h4 className="font-medium">Outcome</h4>
                      <div className="relative">
                        <select 
                          className="w-full p-2 pr-8 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                          defaultValue="allEvents"
                        >
                          <option value="allEvents">All Event Types</option>
                          <option value="battles">Battles</option>
                          <option value="explosions">Explosions & Remote Violence</option>
                          <option value="violence">Violence Against Civilians</option>
                        </select>
                      </div>
                      
                      <h4 className="font-medium">Compare forecast to</h4>
                      <div className="relative">
                        <select 
                          className="w-full p-2 pr-8 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                          defaultValue="12months"
                        >
                          <option value="12months">Last 12 months</option>
                          <option value="6months">Last 6 months</option>
                          <option value="3months">Last 3 months</option>
                        </select>
                      </div>
                      
                      <h4 className="font-medium">Select forecast date</h4>
                      <div className="relative">
                        <select 
                          className="w-full p-2 pr-8 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                          defaultValue={`${currentMonth.toLowerCase()}${currentYear}`}
                        >
                          <option value={`${currentMonth.toLowerCase()}${currentYear}`}>{currentMonth} {currentYear}</option>
                          <option value={`apr${currentYear}`}>April {currentYear}</option>
                          <option value={`may${currentYear}`}>May {currentYear}</option>
                        </select>
                      </div>
                      
                      <Button variant="ghost" className="w-full flex items-center justify-center mt-2">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset to default view
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
                    <LineChart
                      data={historyData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                      />
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
                      Relative to 12-Month Average
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
                        {forecastData.map((row) => (
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
            </div>
          )}
          
          {activeTab === 'vulnerability' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vulnerability Index Based on Human Development Index</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm font-medium text-muted-foreground">
                      <span>Higher Vulnerability</span>
                      <span>Lower Vulnerability</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Most Vulnerable Countries</h3>
                        <div className="space-y-4">
                          {vulnerabilityData
                            .sort((a, b) => b.vulnerabilityScore - a.vulnerabilityScore)
                            .slice(0, 10)
                            .map((item) => (
                              <div key={item.country} className="flex items-center">
                                <div className="w-1/3 font-medium">{item.country}</div>
                                <div className="w-2/3">
                                  <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                      <div 
                                        className="h-2.5 rounded-full bg-gradient-to-r from-red-500 to-yellow-500" 
                                        style={{ width: `${item.vulnerabilityScore}%` }}
                                      ></div>
                                    </div>
                                    <span className={`ml-2 text-sm font-medium ${getVulnerabilityColor(item.vulnerabilityScore)}`}>
                                      {item.vulnerabilityScore}
                                    </span>
                                  </div>
                                  <div className="mt-1 text-xs text-muted-foreground">
                                    HDI: {item.hdi.toFixed(3)}
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Vulnerability Metrics</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-2xl font-bold">87.6</div>
                              <div className="text-sm font-medium text-muted-foreground">
                                Average vulnerability score
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-2xl font-bold">0.471</div>
                              <div className="text-sm font-medium text-muted-foreground">
                                Average HDI
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-2xl font-bold">3</div>
                              <div className="text-sm font-medium text-muted-foreground">
                                Countries with critical status
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-2xl font-bold">7</div>
                              <div className="text-sm font-medium text-muted-foreground">
                                Countries at high risk
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold mb-4">Understanding the Index</h3>
                          <p className="text-sm text-gray-600">
                            The vulnerability index is calculated based on the Human Development Index (HDI) 
                            and additional conflict/disaster risk factors. Countries with lower HDI scores 
                            typically have higher vulnerability to crises. The index ranges from 0-100, 
                            with higher scores indicating greater vulnerability.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Vulnerability & Crisis Correlation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={vulnerabilityData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="country" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="vulnerabilityScore" name="Vulnerability Score" fill="#8884d8" />
                        <Bar yAxisId="right" dataKey="hdi" name="HDI Score" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === 'accuracy' && (
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
                            { month: 'Oct', accuracy: 87 },
                            { month: 'Nov', accuracy: 89 },
                            { month: 'Dec', accuracy: 91 }
                          ]}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[75, 100]} />
                          <Tooltip />
                          <Area type="monotone" dataKey="accuracy" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Regional Accuracy Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium mb-4">Accuracy by Region</h4>
                      <ul className="space-y-4">
                        {[
                          { region: 'Middle East & North Africa', accuracy: 91 },
                          { region: 'Sub-Saharan Africa', accuracy: 87 },
                          { region: 'South Asia', accuracy: 88 },
                          { region: 'Europe & Central Asia', accuracy: 93 },
                          { region: 'East Asia & Pacific', accuracy: 90 },
                          { region: 'Latin America & Caribbean', accuracy: 86 }
                        ].map((item) => (
                          <li key={item.region} className="flex items-center">
                            <span className="w-2/3">{item.region}</span>
                            <div className="w-1/3 flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                <div 
                                  className="h-2.5 rounded-full bg-primary" 
                                  style={{ width: `${item.accuracy}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{item.accuracy}%</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-4">Accuracy by Event Type</h4>
                      <ul className="space-y-4">
                        {[
                          { type: 'Battles', accuracy: 92 },
                          { type: 'Explosions & Remote Violence', accuracy: 89 },
                          { type: 'Violence Against Civilians', accuracy: 87 },
                          { type: 'Protests', accuracy: 83 },
                          { type: 'Natural Disasters', accuracy: 91 },
                          { type: 'Disease Outbreaks', accuracy: 84 }
                        ].map((item) => (
                          <li key={item.type} className="flex items-center">
                            <span className="w-2/3">{item.type}</span>
                            <div className="w-1/3 flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                <div 
                                  className="h-2.5 rounded-full bg-primary" 
                                  style={{ width: `${item.accuracy}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{item.accuracy}%</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === 'about' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Complex Crises Anticipated Response (C-CAR)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    C-CAR is an advanced crisis forecasting platform that helps humanitarian organizations 
                    anticipate and respond to emergencies more effectively. Our platform integrates data from 
                    multiple sources to provide accurate forecasts of conflicts, natural disasters, and other 
                    crises around the world.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">How It Works</h3>
                  <p className="mb-4">
                    Our forecasting model combines historical conflict data, climate information, socioeconomic 
                    indicators, and real-time news feeds to generate predictions about potential crises. The 
                    platform uses machine learning algorithms that have been trained on decades of historical data 
                    to identify patterns and predict future events.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Data Sources</h3>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Armed Conflict Location & Event Data Project (ACLED)</li>
                    <li>UN Human Development Index</li>
                    <li>World Bank Development Indicators</li>
                    <li>UNHCR Displacement Data</li>
                    <li>Climate and weather prediction models</li>
                    <li>News and social media analysis</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Trial Version Limitations</h3>
                  <p>
                    This free trial version provides access to basic forecasting features and historical data. 
                    For full access to all features including custom alerts, detailed country reports, API access, 
                    and more, please consider upgrading to our premium subscription.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
          
          <div className="mt-8">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-none">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900">Ready to unlock the full potential?</h3>
                    <p className="text-muted-foreground">Upgrade now to access advanced features, custom alerts, and detailed reports.</p>
                  </div>
                  <div className="flex space-x-4">
                    <Button variant="outline">Learn More</Button>
                    <Button>Upgrade Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrialDashboard;
