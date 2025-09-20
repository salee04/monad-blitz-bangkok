import { useState, useEffect, useMemo } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign,
  Star,
  Heart,
  Share2,
  ArrowRight,
  Users,
  Calendar,
  Briefcase,
  Award,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  SlidersHorizontal,
  Grid3X3,
  List,
  BookmarkPlus,
  Bookmark,
  Eye,
  FileText,
  Target,
  TrendingUp,
  Zap,
  ChevronDown,
  X,
  ArrowUpRight,
  ExternalLink,
  MessageCircle,
  CheckCircle2,
  Timer,
  Wallet as WalletIcon,
  Globe
} from "lucide-react";

// Types for QuestBond Browse Jobs
interface JobCategory {
  id: string;
  name: string;
  subcategories?: string[];
}

interface Employer {
  id: string;
  name: string;
  address: string;
  reputation: number;
  verified: boolean;
  avatar?: string;
  completionRate: number;
  totalJobs: number;
  responseTime: string;
}

interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  reward: {
    amount: number;
    currency: 'USDC';
    usdValue: number;
  };
  deadline: Date;
  status: 'Open' | 'Accepted' | 'Submitted' | 'Completed' | 'Expired';
  employer: Employer;
  requirements: {
    skills: string[];
    experience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    timeCommitment: string;
    tools?: string[];
  };
  metadata: {
    createdAt: Date;
    views: number;
    applications: number;
    featured: boolean;
    urgent: boolean;
  };
  attachments?: Array<{
    name: string;
    type: string;
    size: number;
    ipfsHash: string;
  }>;
}

interface JobFilters {
  query: string;
  categories: string[];
  rewardRange: [number, number];
  deadlineFilter: 'all' | 'today' | 'week' | 'month' | 'custom';
  experienceLevel: string[];
  employerReputation: number;
  jobStatus: string[];
  sortBy: 'newest' | 'reward' | 'deadline' | 'popularity';
  viewMode: 'grid' | 'list';
}

export function BrowseJobs() {
  // State Management
  const [filters, setFilters] = useState<JobFilters>({
    query: '',
    categories: [],
    rewardRange: [0, 2000],
    deadlineFilter: 'all',
    experienceLevel: [],
    employerReputation: 0,
    jobStatus: ['Open'],
    sortBy: 'newest',
    viewMode: 'grid'
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [favoriteJobs, setFavoriteJobs] = useState<Set<string>>(new Set());
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock Data - In production, this would come from blockchain and APIs
  const mockCategories: JobCategory[] = [
    { id: 'design', name: 'Design', subcategories: ['UI/UX', 'Graphic Design', 'Branding', 'Illustration'] },
    { id: 'development', name: 'Development', subcategories: ['Frontend', 'Backend', 'Mobile', 'Blockchain'] },
    { id: 'content', name: 'Content', subcategories: ['Writing', 'Video Editing', 'Marketing', 'Social Media'] },
    { id: 'business', name: 'Business', subcategories: ['Strategy', 'Research', 'Analysis', 'Consulting'] }
  ];

  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'DeFi Dashboard UI Design',
      description: 'Create a modern, intuitive dashboard for our DeFi protocol. Must include dark mode, responsive design, and interactive charts. Experience with Web3 interfaces preferred.',
      category: 'Design',
      subcategory: 'UI/UX',
      reward: { amount: 750, currency: 'USDC', usdValue: 750 },
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
      status: 'Open',
      employer: {
        id: 'emp1',
        name: 'DeFiProtocol',
        address: '0x742d...35Cc',
        reputation: 4.8,
        verified: true,
        completionRate: 96,
        totalJobs: 24,
        responseTime: '< 2 hours'
      },
      requirements: {
        skills: ['Figma', 'UI/UX Design', 'Web3', 'Responsive Design'],
        experience: 'Intermediate',
        timeCommitment: '20-30 hours',
        tools: ['Figma', 'Adobe Creative Suite']
      },
      metadata: {
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        views: 156,
        applications: 8,
        featured: true,
        urgent: false
      },
      attachments: [
        { name: 'Design_Brief.pdf', type: 'pdf', size: 2048000, ipfsHash: 'QmX...' },
        { name: 'Wireframes.fig', type: 'figma', size: 512000, ipfsHash: 'QmY...' }
      ]
    },
    {
      id: '2',
      title: 'Smart Contract Security Audit',
      description: 'Comprehensive security audit for our NFT marketplace smart contracts. Must identify vulnerabilities and provide detailed report with recommendations.',
      category: 'Development',
      subcategory: 'Blockchain',
      reward: { amount: 1500, currency: 'USDC', usdValue: 1500 },
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      status: 'Open',
      employer: {
        id: 'emp2',
        name: 'NFTMarketplace',
        address: '0x123a...78Bc',
        reputation: 4.9,
        verified: true,
        completionRate: 100,
        totalJobs: 12,
        responseTime: '< 1 hour'
      },
      requirements: {
        skills: ['Solidity', 'Security Auditing', 'Smart Contracts', 'Ethereum'],
        experience: 'Expert',
        timeCommitment: '40-60 hours',
        tools: ['Hardhat', 'Foundry', 'Mythril']
      },
      metadata: {
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        views: 89,
        applications: 3,
        featured: false,
        urgent: false
      }
    },
    {
      id: '3',
      title: 'Marketing Video Creation',
      description: 'Create a 60-second promotional video for our DeFi protocol launch. Must be engaging, professional, and explain complex concepts simply.',
      category: 'Content',
      subcategory: 'Video Editing',
      reward: { amount: 400, currency: 'USDC', usdValue: 400 },
      deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day (urgent)
      status: 'Open',
      employer: {
        id: 'emp3',
        name: 'CryptoStartup',
        address: '0x456b...90Cd',
        reputation: 4.3,
        verified: false,
        completionRate: 85,
        totalJobs: 6,
        responseTime: '< 4 hours'
      },
      requirements: {
        skills: ['Video Editing', 'Motion Graphics', 'Storytelling', 'After Effects'],
        experience: 'Intermediate',
        timeCommitment: '15-20 hours',
        tools: ['After Effects', 'Premiere Pro', 'Cinema 4D']
      },
      metadata: {
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        views: 234,
        applications: 15,
        featured: false,
        urgent: true
      }
    },
    {
      id: '4',
      title: 'Token Economics Research',
      description: 'Analyze and model token economics for our new governance token. Provide recommendations for distribution, vesting, and incentive mechanisms.',
      category: 'Business',
      subcategory: 'Research',
      reward: { amount: 950, currency: 'USDC', usdValue: 950 },
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
      status: 'Open',
      employer: {
        id: 'emp4',
        name: 'DAOBuilder',
        address: '0x789c...12De',
        reputation: 4.7,
        verified: true,
        completionRate: 92,
        totalJobs: 18,
        responseTime: '< 3 hours'
      },
      requirements: {
        skills: ['Tokenomics', 'Economic Modeling', 'DeFi', 'Research'],
        experience: 'Advanced',
        timeCommitment: '25-35 hours',
        tools: ['Excel', 'Python', 'Mathematical Modeling']
      },
      metadata: {
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        views: 67,
        applications: 4,
        featured: false,
        urgent: false
      }
    }
  ];

  // Filter jobs based on current filters
  const filteredJobs = useMemo(() => {
    let filtered = [...mockJobs];

    // Text search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.requirements.skills.some(skill => skill.toLowerCase().includes(query)) ||
        job.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(job => filters.categories.includes(job.category));
    }

    // Reward range filter
    filtered = filtered.filter(job => 
      job.reward.amount >= filters.rewardRange[0] && 
      job.reward.amount <= filters.rewardRange[1]
    );

    // Experience level filter
    if (filters.experienceLevel.length > 0) {
      filtered = filtered.filter(job => filters.experienceLevel.includes(job.requirements.experience));
    }

    // Employer reputation filter
    if (filters.employerReputation > 0) {
      filtered = filtered.filter(job => job.employer.reputation >= filters.employerReputation);
    }

    // Status filter
    if (filters.jobStatus.length > 0) {
      filtered = filtered.filter(job => filters.jobStatus.includes(job.status));
    }

    // Deadline filter
    const now = new Date();
    if (filters.deadlineFilter !== 'all') {
      const deadlineMap = {
        'today': 1,
        'week': 7,
        'month': 30
      };
      const days = deadlineMap[filters.deadlineFilter as keyof typeof deadlineMap];
      if (days) {
        const deadline = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(job => job.deadline <= deadline);
      }
    }

    // Sort jobs
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return b.metadata.createdAt.getTime() - a.metadata.createdAt.getTime();
        case 'reward':
          return b.reward.amount - a.reward.amount;
        case 'deadline':
          return a.deadline.getTime() - b.deadline.getTime();
        case 'popularity':
          return b.metadata.views - a.metadata.views;
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, mockJobs]);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    if (!realTimeUpdates) return;
    
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [realTimeUpdates]);

  // Utility functions
  const getUrgencyBadge = (deadline: Date) => {
    const now = new Date();
    const timeLeft = deadline.getTime() - now.getTime();
    const hoursLeft = timeLeft / (1000 * 60 * 60);
    
    if (hoursLeft < 24) {
      return { label: 'Urgent', color: 'bg-destructive text-destructive-foreground', icon: AlertTriangle };
    } else if (hoursLeft < 72) {
      return { label: 'Soon', color: 'bg-chart-3/20 text-chart-3', icon: Timer };
    }
    return null;
  };

  const formatTimeLeft = (deadline: Date) => {
    const now = new Date();
    const timeLeft = deadline.getTime() - now.getTime();
    const days = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
    
    if (days < 1) {
      const hours = Math.ceil(timeLeft / (1000 * 60 * 60));
      return `${hours}h left`;
    }
    return `${days} day${days !== 1 ? 's' : ''} left`;
  };

  const handleFavorite = (jobId: string) => {
    setFavoriteJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const handleApplyJob = (job: Job) => {
    setAppliedJobs(prev => new Set([...prev, job.id]));
    setSelectedJob(null);
    // In production, this would trigger a blockchain transaction
    console.log('Applying for job:', job.title);
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      categories: [],
      rewardRange: [0, 2000],
      deadlineFilter: 'all',
      experienceLevel: [],
      employerReputation: 0,
      jobStatus: ['Open'],
      sortBy: 'newest',
      viewMode: filters.viewMode
    });
  };

  if (isLoading) {
    return <BrowseJobsSkeleton />;
  }

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Header Section */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="w-full px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl text-foreground mb-2">Browse Jobs</h1>
              <p className="text-muted-foreground">
                Discover {filteredJobs.length} available opportunities • Updated {lastUpdate.toLocaleTimeString()}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRealTimeUpdates(!realTimeUpdates)}
                className={realTimeUpdates ? 'border-primary' : ''}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${realTimeUpdates ? 'animate-spin' : ''}`} />
                Real-time
              </Button>
              
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  size="sm"
                  variant={filters.viewMode === 'grid' ? 'default' : 'ghost'}
                  className="h-8 w-8 p-0"
                  onClick={() => setFilters(prev => ({ ...prev, viewMode: 'grid' }))}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={filters.viewMode === 'list' ? 'default' : 'ghost'}
                  className="h-8 w-8 p-0"
                  onClick={() => setFilters(prev => ({ ...prev, viewMode: 'list' }))}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-6">
        {/* Search and Filter Section */}
        <Card className="p-4 mb-6 shadow-sm">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search jobs, skills, or keywords..." 
                  className="pl-10 h-11 rounded-lg"
                  value={filters.query}
                  onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                />
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="h-11 px-4 rounded-lg"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {(filters.categories.length > 0 || filters.experienceLevel.length > 0) && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                    {filters.categories.length + filters.experienceLevel.length}
                  </Badge>
                )}
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort:</span>
                <select 
                  className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                >
                  <option value="newest">Newest</option>
                  <option value="reward">Highest Reward</option>
                  <option value="deadline">Deadline Soon</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Categories */}
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Categories</label>
                    <div className="space-y-2">
                      {mockCategories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={category.id}
                            checked={filters.categories.includes(category.name)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFilters(prev => ({ 
                                  ...prev, 
                                  categories: [...prev.categories, category.name] 
                                }));
                              } else {
                                setFilters(prev => ({ 
                                  ...prev, 
                                  categories: prev.categories.filter(c => c !== category.name) 
                                }));
                              }
                            }}
                          />
                          <label htmlFor={category.id} className="text-sm">{category.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reward Range */}
                  <div>
                    <label className="text-sm text-foreground mb-2 block">
                      Reward Range: ${filters.rewardRange[0]} - ${filters.rewardRange[1]}
                    </label>
                    <Slider
                      value={filters.rewardRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, rewardRange: value as [number, number] }))}
                      max={2000}
                      min={0}
                      step={50}
                      className="mt-2"
                    />
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Experience Level</label>
                    <div className="space-y-2">
                      {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox 
                            id={level}
                            checked={filters.experienceLevel.includes(level)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFilters(prev => ({ 
                                  ...prev, 
                                  experienceLevel: [...prev.experienceLevel, level] 
                                }));
                              } else {
                                setFilters(prev => ({ 
                                  ...prev, 
                                  experienceLevel: prev.experienceLevel.filter(l => l !== level) 
                                }));
                              }
                            }}
                          />
                          <label htmlFor={level} className="text-sm">{level}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Deadline</label>
                    <select 
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                      value={filters.deadlineFilter}
                      onChange={(e) => setFilters(prev => ({ ...prev, deadlineFilter: e.target.value as any }))}
                    >
                      <option value="all">All Deadlines</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                  <Button variant="outline" onClick={clearFilters} size="sm">
                    <X className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Job Listings */}
        <div className={
          filters.viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            : "space-y-4"
        }>
          {filteredJobs.map((job) => {
            const urgencyBadge = getUrgencyBadge(job.deadline);
            const isFavorited = favoriteJobs.has(job.id);
            const isApplied = appliedJobs.has(job.id);

            return (
              <Card 
                key={job.id} 
                className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border ${
                  job.metadata.featured ? 'border-primary/30 bg-primary/5' : 'border-border'
                } ${urgencyBadge ? 'ring-2 ring-destructive/20' : ''}`}
                onClick={() => setSelectedJob(job)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {job.metadata.featured && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {urgencyBadge && (
                      <Badge className={urgencyBadge.color}>
                        <urgencyBadge.icon className="w-3 h-3 mr-1" />
                        {urgencyBadge.label}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavorite(job.id);
                      }}
                    >
                      {isFavorited ? (
                        <Bookmark className="w-4 h-4 text-primary fill-primary" />
                      ) : (
                        <BookmarkPlus className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Share2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>

                {/* Job Title and Category */}
                <div className="mb-3">
                  <h3 className="text-lg text-foreground mb-1 line-clamp-2">{job.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="rounded-full">
                      {job.category}
                    </Badge>
                    <span>•</span>
                    <span>{new Date(job.metadata.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {job.description}
                </p>

                {/* Employer Info */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-foreground">{job.employer.name}</span>
                      {job.employer.verified && (
                        <ShieldCheck className="w-3 h-3 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 fill-chart-3 text-chart-3" />
                      <span>{job.employer.reputation}</span>
                      <span>•</span>
                      <span>{job.employer.totalJobs} jobs</span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {job.requirements.skills.slice(0, 3).map((skill, index) => (
                    <Badge 
                      key={index}
                      variant="secondary"
                      className="rounded-full bg-secondary/50 text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {job.requirements.skills.length > 3 && (
                    <Badge variant="secondary" className="rounded-full bg-secondary/50 text-xs">
                      +{job.requirements.skills.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">${job.reward.amount}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeLeft(job.deadline)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{job.metadata.applications}</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className={`rounded-lg ${isApplied ? 'bg-green-600 hover:bg-green-700' : ''}`}
                    disabled={isApplied}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Applied
                      </>
                    ) : (
                      <>
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg text-foreground mb-2">No jobs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)}
          onApply={handleApplyJob}
          isApplied={appliedJobs.has(selectedJob.id)}
          isFavorited={favoriteJobs.has(selectedJob.id)}
          onFavorite={() => handleFavorite(selectedJob.id)}
        />
      )}
    </div>
  );
}

// Job Detail Modal Component
interface JobDetailModalProps {
  job: Job;
  onClose: () => void;
  onApply: (job: Job) => void;
  isApplied: boolean;
  isFavorited: boolean;
  onFavorite: () => void;
}

function JobDetailModal({ job, onClose, onApply, isApplied, isFavorited, onFavorite }: JobDetailModalProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleApply = () => {
    onApply(job);
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Dialog open={true} onOpenChange={() => onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="text-xl mb-2">{job.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <Badge variant="outline">{job.category}</Badge>
                  <span>•</span>
                  <span>Posted {new Date(job.metadata.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{job.metadata.views} views</span>
                </DialogDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={onFavorite}>
                  {isFavorited ? (
                    <Bookmark className="w-4 h-4 text-primary fill-primary" />
                  ) : (
                    <BookmarkPlus className="w-4 h-4" />
                  )}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-6">
              {/* Job Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <DollarSign className="w-6 h-6 text-primary mx-auto mb-1" />
                  <p className="text-lg text-foreground">${job.reward.amount}</p>
                  <p className="text-sm text-muted-foreground">USDC Reward</p>
                </div>
                <div className="text-center">
                  <Clock className="w-6 h-6 text-primary mx-auto mb-1" />
                  <p className="text-lg text-foreground">{job.requirements.timeCommitment}</p>
                  <p className="text-sm text-muted-foreground">Time Commitment</p>
                </div>
                <div className="text-center">
                  <Target className="w-6 h-6 text-primary mx-auto mb-1" />
                  <p className="text-lg text-foreground">{job.requirements.experience}</p>
                  <p className="text-sm text-muted-foreground">Experience Level</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg text-foreground mb-3">Job Description</h3>
                <p className="text-muted-foreground leading-relaxed">{job.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg text-foreground mb-3">Requirements</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm text-foreground mb-2">Skills Required</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="rounded-full">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {job.requirements.tools && (
                    <div>
                      <h4 className="text-sm text-foreground mb-2">Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.tools.map((tool, index) => (
                          <Badge key={index} variant="secondary" className="rounded-full">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Attachments */}
              {job.attachments && job.attachments.length > 0 && (
                <div>
                  <h3 className="text-lg text-foreground mb-3">Attachments</h3>
                  <div className="space-y-2">
                    {job.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                        <FileText className="w-5 h-5 text-primary" />
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(attachment.size / 1024 / 1024).toFixed(1)} MB
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Employer Info */}
              <div>
                <h3 className="text-lg text-foreground mb-3">About the Employer</h3>
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-foreground">{job.employer.name}</h4>
                        {job.employer.verified && (
                          <ShieldCheck className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{job.employer.address}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Rating</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-chart-3 text-chart-3" />
                            <span className="text-foreground">{job.employer.reputation}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Jobs Posted</p>
                          <p className="text-foreground">{job.employer.totalJobs}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Success Rate</p>
                          <p className="text-foreground">{job.employer.completionRate}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Response Time</p>
                          <p className="text-foreground">{job.employer.responseTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {job.metadata.views} views
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {job.metadata.applications} applicants
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Deadline: {job.deadline.toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Employer
              </Button>
              <Button 
                onClick={() => setShowConfirmDialog(true)}
                disabled={isApplied}
                className={isApplied ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {isApplied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Applied
                  </>
                ) : (
                  <>
                    <WalletIcon className="w-4 h-4 mr-2" />
                    Accept Job
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Application Confirmation Dialog */}
      {showConfirmDialog && (
        <Dialog open={true} onOpenChange={() => setShowConfirmDialog(false)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Job Application</DialogTitle>
              <DialogDescription>
                You are about to accept this job. This action will initiate a blockchain transaction.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="text-sm text-foreground mb-2">Job Details</h4>
                <p className="text-sm text-muted-foreground mb-1">{job.title}</p>
                <p className="text-sm text-foreground">${job.reward.amount} USDC</p>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <h4 className="text-sm text-foreground mb-2">Transaction Details</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network</span>
                    <span className="text-foreground">Monad Testnet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Gas</span>
                    <span className="text-foreground">~$0.50</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleApply} className="flex-1">
                <WalletIcon className="w-4 h-4 mr-2" />
                Confirm & Sign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

// Skeleton Loading Component
function BrowseJobsSkeleton() {
  return (
    <div className="w-full bg-background min-h-screen">
      {/* Header Skeleton */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="w-full px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-16" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-6">
        {/* Search Skeleton */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Skeleton className="flex-1 h-11" />
            <Skeleton className="h-11 w-24" />
            <Skeleton className="h-11 w-32" />
          </div>
        </Card>

        {/* Job Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <div className="flex justify-between items-center pt-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}