/* eslint-disable no-unused-vars */
import './App.css'
import React, { useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadialBarChart, RadialBar } from 'recharts';
import { Leaf, Users, Award, TrendingUp, TrendingDown, Shield, Database, Zap, Settings, Bell, Download, RefreshCw, Eye, Filter, MapPin, Calendar, Star, TreePine, Coins, BadgeCheck } from 'lucide-react';

const GreenTrustDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState(5);

  // Sample data for Green Trust Score MVP
  const [dashboardData, setDashboardData] = useState({
    overview: {
      totalWorkers: 2847,
      avgTrustScore: 78.5,
      nftBadgesIssued: 1592,
      carbonOffset: 45.2,
      verifiedGigs: 8934,
      totalRewards: 12500,
      growthRate: 23.5,
      systemUptime: 99.7
    },
    trustScoreData: [
      { range: '90-100', count: 412, color: '#22c55e' },
      { range: '80-89', count: 728, color: '#84cc16' },
      { range: '70-79', count: 891, color: '#eab308' },
      { range: '60-69', count: 543, color: '#f97316' },
      { range: '0-59', count: 273, color: '#ef4444' }
    ],
    carbonData: [
      { month: 'Jan', offset: 12.5, workers: 1200, nfts: 450 },
      { month: 'Feb', offset: 15.2, workers: 1450, nfts: 520 },
      { month: 'Mar', offset: 18.7, workers: 1680, nfts: 640 },
      { month: 'Apr', offset: 22.1, workers: 1920, nfts: 750 },
      { month: 'May', offset: 28.9, workers: 2150, nfts: 890 },
      { month: 'Jun', offset: 35.4, workers: 2480, nfts: 1120 },
      { month: 'Jul', offset: 45.2, workers: 2847, nfts: 1592 }
    ],
    topWorkers: [
      { id: 1, name: 'Alice Green', score: 96, nfts: 5, co2Saved: 2.4, category: 'Delivery' },
      { id: 2, name: 'Bob Eco', score: 94, nfts: 4, co2Saved: 1.9, category: 'Rideshare' },
      { id: 3, name: 'Carol Earth', score: 92, nfts: 4, co2Saved: 2.1, category: 'Food Delivery' },
      { id: 4, name: 'Dave Nature', score: 89, nfts: 3, co2Saved: 1.7, category: 'Courier' },
      { id: 5, name: 'Eve Sustain', score: 87, nfts: 3, co2Saved: 1.5, category: 'Delivery' }
    ],
    recentActivity: [
      { id: 1, type: 'verification', worker: 'Alice Green', action: 'OSINT verification completed', time: '2 mins ago', status: 'success' },
      { id: 2, type: 'nft', worker: 'Bob Eco', action: 'NFT Badge earned: Gold Eco Warrior', time: '5 mins ago', status: 'success' },
      { id: 3, type: 'score', worker: 'Carol Earth', action: 'Trust Score updated: 92', time: '12 mins ago', status: 'info' },
      { id: 4, type: 'carbon', worker: 'Dave Nature', action: 'Carbon footprint calculated', time: '18 mins ago', status: 'success' },
      { id: 5, type: 'registration', worker: 'Eve Sustain', action: 'New worker registered', time: '25 mins ago', status: 'info' }
    ]
  });

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setDashboardData(prev => ({
        ...prev,
        overview: {
          ...prev.overview,
          totalWorkers: prev.overview.totalWorkers + Math.floor(Math.random() * 10),
          avgTrustScore: Math.round((prev.overview.avgTrustScore + Math.random() * 2 - 1) * 10) / 10
        }
      }));
    }, 1000);
  };

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue', suffix = '' }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">
            {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
          {change && (
            <div className={`flex items-center mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span className="text-sm font-medium">{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-full bg-${color}-100`}>
          <Icon className={`w-8 h-8 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const TrustScoreGauge = ({ score }) => (
    <div className="relative w-48 h-48 mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[{ value: score, fill: score >= 75 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444' }]}>
          <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">{score}</div>
          <div className="text-sm text-gray-500">Trust Score</div>
        </div>
      </div>
    </div>
  );

  const WorkerCard = ({ worker, rank }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {rank}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{worker.name}</h4>
            <p className="text-sm text-gray-500">{worker.category}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{worker.score}</div>
          <div className="text-xs text-gray-500">Score</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-900">{worker.nfts}</div>
          <div className="text-xs text-gray-500">NFT Badges</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-900">{worker.co2Saved}kg</div>
          <div className="text-xs text-gray-500">CO₂ Saved</div>
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getIcon = (type) => {
      switch(type) {
        case 'verification': return <Shield className="w-5 h-5 text-blue-500" />;
        case 'nft': return <Award className="w-5 h-5 text-purple-500" />;
        case 'score': return <Star className="w-5 h-5 text-yellow-500" />;
        case 'carbon': return <TreePine className="w-5 h-5 text-green-500" />;
        case 'registration': return <Users className="w-5 h-5 text-gray-500" />;
        default: return <Bell className="w-5 h-5 text-gray-500" />;
      }
    };

    return (
      <div className="flex items-center space-x-3 py-3 border-b border-gray-100 last:border-b-0">
        <div className="flex-shrink-0">
          {getIcon(activity.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{activity.worker}</p>
          <p className="text-sm text-gray-500">{activity.action}</p>
        </div>
        <div className="text-xs text-gray-400">{activity.time}</div>
      </div>
    );
  };

  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        active 
          ? 'bg-green-100 text-green-700' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Leaf className="w-8 h-8 text-green-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Green Trust Score</h1>
                  <p className="text-sm text-gray-500">Eco-Friendly Gig Worker Verification</p>
                </div>
              </div>
              <div className="bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                <Database className="w-4 h-4" />
                <span>Blockchain Powered</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
                {notifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-4 pb-4">
            <TabButton id="overview" label="Overview" icon={Eye} active={activeTab === 'overview'} onClick={setActiveTab} />
            <TabButton id="workers" label="Workers" icon={Users} active={activeTab === 'workers'} onClick={setActiveTab} />
            <TabButton id="nfts" label="NFT Rewards" icon={Award} active={activeTab === 'nfts'} onClick={setActiveTab} />
            <TabButton id="carbon" label="Carbon Impact" icon={TreePine} active={activeTab === 'carbon'} onClick={setActiveTab} />
            <TabButton id="blockchain" label="Blockchain" icon={Database} active={activeTab === 'blockchain'} onClick={setActiveTab} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Workers"
                value={dashboardData.overview.totalWorkers}
                change={dashboardData.overview.growthRate}
                icon={Users}
                color="blue"
              />
              <StatCard
                title="Average Trust Score"
                value={dashboardData.overview.avgTrustScore}
                change={2.3}
                icon={Star}
                color="yellow"
              />
              <StatCard
                title="NFT Badges Issued"
                value={dashboardData.overview.nftBadgesIssued}
                change={15.7}
                icon={Award}
                color="purple"
              />
              <StatCard
                title="Carbon Offset"
                value={dashboardData.overview.carbonOffset}
                change={28.9}
                icon={TreePine}
                color="green"
                suffix="kg"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Trust Score Distribution */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trust Score Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dashboardData.trustScoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Carbon Impact Trend */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Carbon Impact Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dashboardData.carbonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="offset" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Top Workers */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Workers</h3>
                <div className="space-y-4">
                  {dashboardData.topWorkers.map((worker, index) => (
                    <WorkerCard key={worker.id} worker={worker} rank={index + 1} />
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-1">
                  {dashboardData.recentActivity.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workers' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Worker Management</h3>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Users className="w-4 h-4" />
                    <span>Add Worker</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardData.topWorkers.map((worker) => (
                  <div key={worker.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{worker.name}</h4>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Trust Score</span>
                        <span className="font-semibold">{worker.score}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">NFT Badges</span>
                        <span className="font-semibold">{worker.nfts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">CO₂ Saved</span>
                        <span className="font-semibold">{worker.co2Saved}kg</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'nfts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">NFT Rewards System</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-100">Gold Badges</p>
                      <p className="text-2xl font-bold">324</p>
                    </div>
                    <Award className="w-8 h-8 text-yellow-100" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-100">Silver Badges</p>
                      <p className="text-2xl font-bold">678</p>
                    </div>
                    <Award className="w-8 h-8 text-gray-100" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Bronze Badges</p>
                      <p className="text-2xl font-bold">590</p>
                    </div>
                    <Award className="w-8 h-8 text-orange-100" />
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                  <BadgeCheck className="w-5 h-5" />
                  <span>Minimum Trust Score: 75+ for NFT eligibility</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'carbon' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Carbon Impact Analytics</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Monthly Carbon Offset</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dashboardData.carbonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="offset" stroke="#22c55e" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Environmental Impact</h4>
                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <TreePine className="w-6 h-6 text-green-600" />
                        <div>
                          <p className="font-semibold text-green-800">Trees Equivalent</p>
                          <p className="text-green-600">~67 trees saved</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="font-semibold text-blue-800">Distance Saved</p>
                          <p className="text-blue-600">~1,240 km eco-friendly</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'blockchain' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Blockchain & Security</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">System Components</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Database className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Polygon Network</p>
                        <p className="text-sm text-gray-500">Blockchain Storage</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Shield className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">IPFS Integration</p>
                        <p className="text-sm text-gray-500">Decentralized Storage</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Zap className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium">Smart Contracts</p>
                        <p className="text-sm text-gray-500">ERC-721 Tokens</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">System Status</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Network Status</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        Online
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Uptime</span>
                      <span className="font-semibold">99.7%</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Gas Price</span>
                      <span className="font-semibold">12 gwei</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Transactions</span>
                      <span className="font-semibold">2,847</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GreenTrustDashboard;
 