import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  DollarSign, 
  Star, 
  Briefcase, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock,
  Target,
  Award,
  BarChart3,
  Eye,
  Heart,
  MessageSquare,
  User
} from "lucide-react";
// Temporarily removing motion animations to fix webpack errors
// import { motion } from "motion/react";

interface StatCardProps {
  type: "earnings" | "jobs" | "reputation" | "portfolio";
  role: "creator" | "employer";
  value: number | string;
  label: string;
  trend: number;
  period: string;
  icon: React.ElementType;
  loading?: boolean;
}

interface StatsOverviewProps {
  userRole?: "creator" | "employer";
}

function RoleIndicator({ role }: { role: "creator" | "employer" }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Badge 
        variant="secondary"
        className={`
          px-3 py-1 rounded-full border transition-all duration-200 text-xs
          ${role === "creator" 
            ? "bg-primary/10 text-primary border-primary/20" 
            : "bg-chart-2/10 text-chart-2 border-chart-2/20"
          }
        `}
      >
        <Users className="w-3 h-3 mr-1.5" />
        {role === "creator" ? "Creator Dashboard" : "Employer Dashboard"}
      </Badge>
    </div>
  );
}

function StatCard({ type, role, value, label, trend, period, icon: Icon, loading = false }: StatCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const numericValue = typeof value === "number" ? value : parseFloat(value.toString().replace(/[^0-9.-]+/g, ""));

  useEffect(() => {
    if (!loading && typeof value === "number") {
      const duration = 1000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setAnimatedValue(numericValue);
          clearInterval(timer);
        } else {
          setAnimatedValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [value, loading, numericValue]);

  const getCardColors = (): { iconBg: string; iconColor: string; trendColor: string } => {
    if (role === "creator") {
      switch (type) {
        case "earnings":
          return {
            iconBg: "bg-primary/10",
            iconColor: "text-primary",
            trendColor: trend > 0 ? "text-chart-2" : "text-destructive"
          };
        case "reputation":
          return {
            iconBg: "bg-chart-2/10",
            iconColor: "text-chart-2",
            trendColor: trend > 0 ? "text-chart-2" : "text-chart-3"
          };
        case "jobs":
          return {
            iconBg: "bg-chart-3/10",
            iconColor: "text-chart-3",
            trendColor: trend > 0 ? "text-chart-2" : "text-muted-foreground"
          };
        case "portfolio":
          return {
            iconBg: "bg-chart-4/10",
            iconColor: "text-chart-4",
            trendColor: trend > 0 ? "text-chart-2" : "text-muted-foreground"
          };
      }
    } else {
      switch (type) {
        case "earnings":
          return {
            iconBg: "bg-chart-2/10",
            iconColor: "text-chart-2",
            trendColor: trend > 0 ? "text-chart-2" : "text-destructive"
          };
        case "jobs":
          return {
            iconBg: "bg-chart-3/10",
            iconColor: "text-chart-3",
            trendColor: trend > 0 ? "text-chart-2" : "text-muted-foreground"
          };
        case "reputation":
          return {
            iconBg: "bg-primary/10",
            iconColor: "text-primary",
            trendColor: trend > 0 ? "text-chart-2" : "text-chart-3"
          };
        case "portfolio":
          return {
            iconBg: "bg-chart-4/10",
            iconColor: "text-chart-4",
            trendColor: trend > 0 ? "text-chart-2" : "text-muted-foreground"
          };
      }
    }
    
    // Default return to satisfy TypeScript
    return {
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      trendColor: "text-muted-foreground"
    };
  };

  const colors = getCardColors();

  const formatValue = (): string => {
    if (loading) return "---";
    if (typeof value === "string") return value;
    if (type === "earnings") return "$" + animatedValue.toLocaleString();
    return animatedValue.toLocaleString();
  };

  return (
    <div>
      <Card className="p-4 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/20">
        {loading ? (
          <div className="animate-pulse">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-muted rounded-lg"></div>
              <div className="w-14 h-4 bg-muted rounded"></div>
            </div>
            <div className="space-y-1.5">
              <div className="w-20 h-6 bg-muted rounded"></div>
              <div className="w-16 h-3 bg-muted rounded"></div>
              <div className="w-12 h-2.5 bg-muted rounded"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.iconBg}`}>
                <Icon className={`h-5 w-5 ${colors.iconColor}`} />
              </div>
              {trend !== 0 && (
                <div className={`flex items-center ${colors.trendColor}`}>
                  {trend > 0 ? (
                    <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                  )}
                  <span className="text-xs">
                    {trend > 0 ? "+" : ""}{trend}%
                  </span>
                </div>
              )}
            </div>
            
            <div className="space-y-0.5">
              <p className="text-xl text-foreground font-mono">
                {formatValue()}
              </p>
              <p className="text-sm text-foreground">
                {label}
              </p>
              <p className="text-xs text-muted-foreground">
                {period}
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

function TrendCharts({ role }: { role: "creator" | "employer" }) {
  const chartData = role === "creator" 
    ? [
        { name: "Earnings", value: 2450, color: "var(--chart-1)" },
        { name: "Reputation", value: 2340, color: "var(--chart-2)" },
        { name: "Jobs", value: 12, color: "var(--chart-3)" },
        { name: "Portfolio", value: 48, color: "var(--chart-4)" }
      ]
    : [
        { name: "Spending", value: 8900, color: "var(--chart-2)" },
        { name: "Active Bounties", value: 23, color: "var(--chart-3)" },
        { name: "Reputation", value: 4.8, color: "var(--chart-1)" },
        { name: "Completed", value: 67, color: "var(--chart-4)" }
      ];

  return (
    <div>
      <Card className="p-4 rounded-xl bg-card border border-border shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-foreground">Performance Overview</h3>
          <Button variant="outline" size="sm" className="rounded-lg text-xs px-2.5 py-1">
            <BarChart3 className="w-3 h-3 mr-1" />
            View Details
          </Button>
        </div>
        
        <div className="space-y-3">
          {chartData.map((item, index) => (
            <div 
              key={item.name}
              className="space-y-1.5"
            >
              <div className="flex justify-between text-xs">
                <span className="text-foreground">{item.name}</span>
                <span className="text-muted-foreground">
                  {item.name === "Earnings" || item.name === "Spending" 
                    ? `${item.value.toLocaleString()}` 
                    : item.value}
                </span>
              </div>
              <Progress 
                value={(item.value / Math.max(...chartData.map(d => d.value))) * 100} 
                className="h-1.5"
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function StatsOverview({ userRole = "creator" }: StatsOverviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<"creator" | "employer">(userRole);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const creatorStats = [
    {
      type: "earnings" as const,
      value: 2450,
      label: "USDC Earnings",
      trend: 12.5,
      period: "↗ +12.5% this month",
      icon: DollarSign
    },
    {
      type: "reputation" as const,
      value: 2340,
      label: "Reputation Score",
      trend: 8.3,
      period: "↗ +85 pts this week",
      icon: Star
    },
    {
      type: "jobs" as const,
      value: 12,
      label: "Active Jobs",
      trend: 16.7,
      period: "↗ +2 new this week",
      icon: Briefcase
    },
    {
      type: "portfolio" as const,
      value: 48,
      label: "Completed Projects",
      trend: 0,
      period: "94% success rate",
      icon: CheckCircle
    }
  ];

  const employerStats = [
    {
      type: "earnings" as const,
      value: 8900,
      label: "Total Spent",
      trend: 23.1,
      period: "↗ +23.1% this month",
      icon: DollarSign
    },
    {
      type: "jobs" as const,
      value: 23,
      label: "Active Bounties",
      trend: 15.2,
      period: "↗ +3 new this week",
      icon: Target
    },
    {
      type: "reputation" as const,
      value: 4.8,
      label: "Employer Rating",
      trend: 2.1,
      period: "↗ +0.1 this month",
      icon: Award
    },
    {
      type: "portfolio" as const,
      value: 67,
      label: "Completed Bounties",
      trend: 0,
      period: "89% completion rate",
      icon: CheckCircle
    }
  ];

  const currentStats = role === "creator" ? creatorStats : employerStats;

  return (
    <div className="w-full space-y-5">
      {/* Role Indicator and Switch */}
      <div className="flex items-center justify-between">
        <RoleIndicator role={role} />
        <div className="flex gap-1.5">
          <Button
            variant={role === "creator" ? "default" : "outline"}
            size="sm"
            onClick={() => setRole("creator")}
            className="rounded-lg transition-all duration-200 text-xs px-3 py-1.5"
          >
            <Users className="w-3 h-3 mr-1.5" />
            Creator View
          </Button>
          <Button
            variant={role === "employer" ? "default" : "outline"}
            size="sm"
            onClick={() => setRole("employer")}
            className="rounded-lg transition-all duration-200 text-xs px-3 py-1.5"
          >
            <Briefcase className="w-3 h-3 mr-1.5" />
            Employer View
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        key={role}
      >
        {currentStats.map((stat, index) => (
          <div key={stat.label}>
            <StatCard
              type={stat.type}
              role={role}
              value={stat.value}
              label={stat.label}
              trend={stat.trend}
              period={stat.period}
              icon={stat.icon}
              loading={isLoading}
            />
          </div>
        ))}
      </div>

      {/* Trend Charts */}
      <TrendCharts role={role} />

      {/* Additional Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 rounded-xl bg-card border border-border shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 bg-chart-2/10 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-foreground">Profile Views</p>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </div>
          </div>
          <p className="text-lg text-foreground">1,234</p>
          <p className="text-xs text-chart-2">+18% from last week</p>
        </Card>

        <Card className="p-4 rounded-xl bg-card border border-border shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 bg-chart-4/10 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-chart-4" />
            </div>
            <div>
              <p className="text-sm text-foreground">Favorites</p>
              <p className="text-xs text-muted-foreground">Total received</p>
            </div>
          </div>
          <p className="text-lg text-foreground">456</p>
          <p className="text-xs text-chart-2">+5 new this week</p>
        </Card>

        <Card className="p-4 rounded-xl bg-card border border-border shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 bg-chart-3/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-chart-3" />
            </div>
            <div>
              <p className="text-sm text-foreground">Messages</p>
              <p className="text-xs text-muted-foreground">Response rate</p>
            </div>
          </div>
          <p className="text-lg text-foreground">98%</p>
          <p className="text-xs text-chart-2">Excellent response</p>
        </Card>
      </div>
    </div>
  );
}