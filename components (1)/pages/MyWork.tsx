import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { 
  Clock, 
  CheckCircle, 
  Star,
  DollarSign,
  Briefcase,
  Building,
  TrendingUp,
  Sparkles,
  Calendar,
  MessageSquare,
  Upload
} from "lucide-react";

export function MyWork() {
  const [userRole, setUserRole] = useState<'Creator' | 'Employer'>('Creator');

  const userStats = {
    totalEarnings: 12750,
    completedJobs: 47,
    averageRating: 4.8,
    activeJobs: 5,
    nftCollection: 31,
    successRate: 96
  };

  const workItems = [
    {
      id: '1',
      title: 'DeFi Protocol Dashboard Design',
      description: 'Create a comprehensive dashboard for monitoring DeFi positions',
      status: 'Active',
      priority: 'High',
      budget: 850,
      progress: 65,
      clientName: 'DeFiProtocol',
      deadline: 'Due in 3 days'
    },
    {
      id: '2',
      title: 'Smart Contract Security Audit',
      description: 'Comprehensive security review of NFT marketplace contracts',
      status: 'Submitted',
      priority: 'Urgent',
      budget: 1200,
      progress: 100,
      clientName: 'NFTMarket',
      deadline: 'Due in 1 day'
    },
    {
      id: '3',
      title: 'Marketing Video Production',
      description: 'Create a 90-second promotional video for DeFi protocol',
      status: 'Revision Required',
      priority: 'Medium',
      budget: 650,
      progress: 80,
      clientName: 'CryptoStartup',
      deadline: 'Due in 7 days'
    }
  ];

  const nftItems = [
    {
      id: '1',
      title: 'DeFi Trading Bot Implementation',
      category: 'Blockchain Development',
      rating: 5,
      earnings: 2500,
      completedDate: '30 days ago'
    },
    {
      id: '2',
      title: 'NFT Marketplace Frontend',
      category: 'Frontend Development',
      rating: 4.8,
      earnings: 1800,
      completedDate: '45 days ago'
    },
    {
      id: '3',
      title: 'Brand Identity Design',
      category: 'Graphic Design',
      rating: 5,
      earnings: 950,
      completedDate: '60 days ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Submitted': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'In Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Revision Required': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full bg-background min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-medium text-foreground mb-2">My Work</h1>
          <p className="text-muted-foreground">
            {userRole === 'Creator' 
              ? 'Manage your active jobs, submissions, and WorkNFT portfolio'
              : 'Monitor your posted bounties and review submissions'
            }
          </p>
        </div>

        {/* Role Toggle */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    id="role-toggle"
                    checked={userRole === 'Employer'}
                    onCheckedChange={(checked) => setUserRole(checked ? 'Employer' : 'Creator')}
                  />
                  <Label htmlFor="role-toggle" className="font-medium">
                    {userRole === 'Creator' ? '👨‍💻 Creator Mode' : '🏢 Employer Mode'}
                  </Label>
                </div>
                
                <Badge variant="outline" className="text-xs">
                  {userRole === 'Creator' ? 'Managing your work' : 'Managing your bounties'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mb-2 mx-auto">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <p className="text-lg font-medium text-foreground">${userStats.totalEarnings.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Earnings</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-green-500/10 rounded-full mb-2 mx-auto">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-lg font-medium text-foreground">{userStats.completedJobs}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-500/10 rounded-full mb-2 mx-auto">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <p className="text-lg font-medium text-foreground">{userStats.averageRating}</p>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500/10 rounded-full mb-2 mx-auto">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-lg font-medium text-foreground">{userStats.activeJobs}</p>
              <p className="text-xs text-muted-foreground">Active Jobs</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-500/10 rounded-full mb-2 mx-auto">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-lg font-medium text-foreground">{userStats.nftCollection}</p>
              <p className="text-xs text-muted-foreground">WorkNFTs</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-chart-2/10 rounded-full mb-2 mx-auto">
                <TrendingUp className="w-5 h-5 text-chart-2" />
              </div>
              <p className="text-lg font-medium text-foreground">{userStats.successRate}%</p>
              <p className="text-xs text-muted-foreground">Success Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="active">Active Work</TabsTrigger>
            <TabsTrigger value="portfolio">WorkNFT Portfolio</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-foreground">{item.title}</h3>
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)}`} />
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {item.clientName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.deadline}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            ${item.budget}
                          </span>
                        </div>
                      </div>
                      
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    
                    {item.status === 'Active' && (
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground">{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          3
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Upload className="w-3 h-3 mr-1" />
                          1
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        {item.status === 'Active' && <Button size="sm">Submit</Button>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workItems.filter(item => item.status === 'Active').map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground">{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{item.deadline}</span>
                      <Button size="sm">Continue Work</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  WorkNFT Collection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nftItems.map((nft) => (
                    <Card key={nft.id}>
                      <CardContent className="p-6">
                        <div className="aspect-square bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-lg mb-4 flex items-center justify-center">
                          <Sparkles className="w-16 h-16 text-primary/50" />
                        </div>
                        
                        <h3 className="font-medium text-foreground mb-1">{nft.title}</h3>
                        
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="text-xs">{nft.category}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{nft.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Earned</span>
                          <span className="font-medium text-primary">${nft.earnings}</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                          <span className="text-xs text-muted-foreground">{nft.completedDate}</span>
                          <Button variant="outline" size="sm">View NFT</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Success Rate</span>
                      <span className="text-sm font-medium">{userStats.successRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg. Rating</span>
                      <span className="text-sm font-medium">{userStats.averageRating}/5.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Response Time</span>
                      <span className="text-sm font-medium">&lt; 2 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Earned</span>
                      <span className="text-sm font-medium">${userStats.totalEarnings.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium">Work Submitted</p>
                      <p className="text-muted-foreground">Smart Contract Security Audit</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Message Received</p>
                      <p className="text-muted-foreground">DeFi Protocol Dashboard Design</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Work Accepted</p>
                      <p className="text-muted-foreground">Marketing Video Production</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}