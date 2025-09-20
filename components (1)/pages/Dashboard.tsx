import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { ActivityFeed } from "../ActivityFeed";
import { 
  Search, 
  Plus, 
  User,
  ArrowUpRight,
  BarChart3,
  Activity,
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Trophy,
  Clock,
  CheckCircle,
  Star,
  Users,
  Briefcase,
  Shield,
  AlertCircle,
  Zap,
  RefreshCw,
  Eye,
  FileText,
  Award,
  Target,
  ArrowRight
} from "lucide-react";

// Types for QuestBond Dashboard
interface UserRole {
  type: 'creator' | 'client' | 'dual';
  primary: 'creator' | 'client';
  confidence: number;
}

interface DashboardStats {
  role: 'creator' | 'client';
  earnings: {
    total: number;
    thisMonth: number;
    pending: number;
    trend: number;
  };
  spending: {
    total: number;
    thisMonth: number;
    activeBounties: number;
  };
  bounties: {
    active: number;
    completed: number;
    successRate: number;
  };
  reputation: {
    score: number;
    level: number;
    badges: string[];
  };
  portfolio: {
    nftCount: number;
    totalValue: number;
    recentMints: number;
  };
}

interface QuickAction {
  id: string;
  label: string;
  icon: any;
  variant: 'primary' | 'secondary' | 'outline';
  onClick: () => void;
}

export function Dashboard() {
  // State Management
  const [userRole, setUserRole] = useState<UserRole>({ 
    type: 'creator', 
    primary: 'creator', 
    confidence: 0.95 
  });
  const [currentRole, setCurrentRole] = useState<'creator' | 'client'>('creator');
  const [isLoading, setIsLoading] = useState(true);
  const [walletConnected, setWalletConnected] = useState(true);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock Data - In production, this would come from blockchain and APIs
  const mockUser = {
    name: "Alex Johnson",
    address: "0x742d...35Cc",
    avatar: null,
    joinedDate: "March 2024"
  };

  const mockStats: DashboardStats = {
    role: currentRole,
    earnings: {
      total: 2450.67,
      thisMonth: 325.50,
      pending: 150.00,
      trend: 12.5
    },
    spending: {
      total: 1850.25,
      thisMonth: 425.00,
      activeBounties: 8
    },
    bounties: {
      active: currentRole === 'creator' ? 5 : 12,
      completed: currentRole === 'creator' ? 23 : 45,
      successRate: currentRole === 'creator' ? 94.2 : 87.3
    },
    reputation: {
      score: 2340,
      level: 8,
      badges: ["Reliable", "Fast Delivery", "Quality Work"]
    },
    portfolio: {
      nftCount: 12,
      totalValue: 1250.00,
      recentMints: 3
    }
  };

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    if (!realTimeUpdates) return;
    
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [realTimeUpdates]);

  // Role switching handler
  const handleRoleSwitch = (newRole: 'creator' | 'client') => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentRole(newRole);
      setIsLoading(false);
    }, 800);
  };

  // Quick Actions based on role
  const getQuickActions = (): QuickAction[] => {
    const baseActions: QuickAction[] = [
      {
        id: 'browse',
        label: 'Browse Jobs',
        icon: Search,
        variant: 'primary',
        onClick: () => console.log('Browse jobs')
      }
    ];

    if (currentRole === 'creator') {
      return [
        ...baseActions,
        {
          id: 'portfolio',
          label: 'View Portfolio',
          icon: Award,
          variant: 'secondary',
          onClick: () => console.log('View portfolio')
        },
        {
          id: 'submissions',
          label: 'My Submissions',
          icon: FileText,
          variant: 'outline',
          onClick: () => console.log('View submissions')
        }
      ];
    } else {
      return [
        {
          id: 'create',
          label: 'Create Bounty',
          icon: Plus,
          variant: 'primary',
          onClick: () => console.log('Create bounty')
        },
        {
          id: 'approvals',
          label: 'Pending Approvals',
          icon: Clock,
          variant: 'secondary',
          onClick: () => console.log('View approvals')
        },
        {
          id: 'analytics',
          label: 'Analytics',
          icon: BarChart3,
          variant: 'outline',
          onClick: () => console.log('View analytics')
        }
      ];
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Welcome Section - Material 3 */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="w-full px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* User Info */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl text-foreground mb-1">
                  {getGreeting()}, {mockUser.name}
                </h1>
                <div className="flex items-center gap-3 mb-2">
                  <Badge 
                    variant="secondary" 
                    className="bg-primary/10 text-primary border-primary/20 rounded-full px-3 py-1"
                  >
                    Level {mockStats.reputation.level} {currentRole === 'creator' ? 'Creator' : 'Client'}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Shield className="w-3 h-3" />
                    <span>{mockStats.reputation.score} reputation</span>
                  </div>
                </div>
                
                {/* Role Switcher */}
                {userRole.type === 'dual' && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Switch role:</span>
                    <div className="flex bg-muted rounded-lg p-1">
                      <Button
                        size="sm"
                        variant={currentRole === 'creator' ? 'default' : 'ghost'}
                        className="h-7 px-3 text-xs"
                        onClick={() => handleRoleSwitch('creator')}
                      >
                        Creator
                      </Button>
                      <Button
                        size="sm"
                        variant={currentRole === 'client' ? 'default' : 'ghost'}
                        className="h-7 px-3 text-xs"
                        onClick={() => handleRoleSwitch('client')}
                      >
                        Client
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Wallet Status & Quick Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Wallet Connection Status */}
              <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                <div className={`w-2 h-2 rounded-full ${walletConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <Wallet className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {walletConnected ? mockUser.address : 'Disconnected'}
                </span>
              </div>
              
              {/* Quick Actions */}
              <div className="flex gap-2">
                {getQuickActions().map((action) => (
                  <Button
                    key={action.id}
                    size="sm"
                    variant={action.variant}
                    onClick={action.onClick}
                    className="rounded-lg px-4 py-2 shadow-sm"
                  >
                    <action.icon className="h-4 w-4 mr-2" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-6 space-y-6">
        {/* Statistics Grid */}
        <section aria-label="Dashboard Statistics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
            {/* Primary Metric Card */}
            <Card className="p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {currentRole === 'creator' ? 'USDC Earnings' : 'USDC Spending'}
                    </p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                  mockStats.earnings.trend > 0 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {mockStats.earnings.trend > 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(mockStats.earnings.trend)}%
                </div>
              </div>
              <div>
                <p className="text-2xl text-foreground mb-1">
                  ${currentRole === 'creator' ? mockStats.earnings.total : mockStats.spending.total}
                </p>
                <p className="text-sm text-muted-foreground">
                  ${currentRole === 'creator' ? mockStats.earnings.thisMonth : mockStats.spending.thisMonth} this month
                </p>
              </div>
            </Card>

            {/* Active Bounties Card */}
            <Card className="p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Bounties</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {mockStats.bounties.successRate}% success
                </Badge>
              </div>
              <div>
                <p className="text-2xl text-foreground mb-1">
                  {mockStats.bounties.active}
                </p>
                <p className="text-sm text-muted-foreground">
                  {mockStats.bounties.completed} completed total
                </p>
              </div>
            </Card>

            {/* Reputation Card */}
            <Card className="p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-chart-3/10 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-chart-3" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reputation</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Level {mockStats.reputation.level}
                </Badge>
              </div>
              <div>
                <p className="text-2xl text-foreground mb-1">
                  {mockStats.reputation.score}
                </p>
                <div className="flex items-center gap-2">
                  <Progress value={75} className="flex-1 h-2" />
                  <span className="text-xs text-muted-foreground">Next: 2500</span>
                </div>
              </div>
            </Card>

            {/* Portfolio/Performance Card */}
            <Card className="p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-chart-4/10 rounded-xl flex items-center justify-center">
                    {currentRole === 'creator' ? (
                      <Trophy className="w-5 h-5 text-chart-4" />
                    ) : (
                      <Target className="w-5 h-5 text-chart-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {currentRole === 'creator' ? 'WorkNFT Portfolio' : 'Project Success'}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Eye className="w-3 h-3" />
                </Button>
              </div>
              <div>
                {currentRole === 'creator' ? (
                  <>
                    <p className="text-2xl text-foreground mb-1">
                      {mockStats.portfolio.nftCount} NFTs
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Est. ${mockStats.portfolio.totalValue} value
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-2xl text-foreground mb-1">
                      {mockStats.bounties.successRate}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {mockStats.spending.activeBounties} active projects
                    </p>
                  </>
                )}
              </div>
            </Card>
          </div>

          {/* Real-time Status Indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${realTimeUpdates ? 'bg-green-500' : 'bg-red-500'}`} />
              <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 ml-1"
                onClick={() => setLastUpdate(new Date())}
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
            >
              View Detailed Analytics
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </section>

        <Separator />

        {/* Activity Feed Section */}
        <section aria-label="Recent Activity">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-foreground">Recent Activity</h2>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Activity className="w-3 h-3 mr-1" />
                Live
              </Badge>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </div>
          <ActivityFeed />
        </section>

        {/* Additional Quick Actions Section */}
        <section aria-label="Quick Actions">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 rounded-xl border hover:shadow-md transition-all duration-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-foreground">Community Hub</p>
                  <p className="text-sm text-muted-foreground">Connect with other creators</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
              </div>
            </Card>

            <Card className="p-4 rounded-xl border hover:shadow-md transition-all duration-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-chart-2/10 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-foreground">Skill Assessment</p>
                  <p className="text-sm text-muted-foreground">Boost your reputation</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
              </div>
            </Card>

            <Card className="p-4 rounded-xl border hover:shadow-md transition-all duration-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-chart-3/10 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-foreground">Help Center</p>
                  <p className="text-sm text-muted-foreground">Get support and guides</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}

// Dashboard Skeleton Loading Component
function DashboardSkeleton() {
  return (
    <div className="w-full bg-background min-h-screen">
      {/* Welcome Section Skeleton */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="w-full px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-24 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-6 space-y-6">
        {/* Statistics Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-6 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-10 h-10 rounded-xl" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </Card>
          ))}
        </div>

        {/* Activity Feed Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-3 w-16" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}