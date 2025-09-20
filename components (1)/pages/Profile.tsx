import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { 
  Edit, 
  MapPin, 
  Calendar, 
  Star,
  Camera,
  Share,
  Settings,
  Award,
  ExternalLink,
  Plus,
  Eye,
  Sparkles,
  ThumbsUp
} from "lucide-react";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="w-full bg-background min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10" />
          <CardContent className="relative p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    AJ
                  </AvatarFallback>
                </Avatar>
                
                <div className="mt-4 text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <h1 className="text-2xl">Alex Johnson</h1>
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-1">Senior Full Stack Developer</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground justify-center md:justify-start">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      San Francisco, CA
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Member since Jan 2022
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xl">4.8</span>
                    </div>
                    <p className="text-sm text-muted-foreground">127 reviews</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xl">67</p>
                    <p className="text-sm text-muted-foreground">WorkNFTs</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xl">2,847</p>
                    <p className="text-sm text-muted-foreground">Profile Views</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xl">24</p>
                    <p className="text-sm text-muted-foreground">Connections</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profile Completion</span>
                    <span className="text-sm text-muted-foreground">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
                <Button variant="outline">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  <h3 className="mb-4">About</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Full-stack developer and blockchain enthusiast with 5+ years of experience building scalable web applications. 
                    Passionate about DeFi, NFTs, and creating innovative solutions that bridge traditional finance with Web3 technologies.
                  </p>
                </Card>
                
                <Card className="p-6">
                  <h3 className="mb-4">Top Skills</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>React</span>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="w-24 h-2" />
                        <span className="text-sm text-muted-foreground">95%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Solidity</span>
                      <div className="flex items-center gap-2">
                        <Progress value={88} className="w-24 h-2" />
                        <span className="text-sm text-muted-foreground">88%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Node.js</span>
                      <div className="flex items-center gap-2">
                        <Progress value={90} className="w-24 h-2" />
                        <span className="text-sm text-muted-foreground">90%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Earnings</span>
                      <span>$45,750</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Jobs Completed</span>
                      <span>67</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Success Rate</span>
                      <span className="text-green-600">98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Response Time</span>
                      <span>&lt; 2 hours</span>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div>
                        <p className="text-sm">Completed DeFi Dashboard</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div>
                        <p className="text-sm">Received 5-star review</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3>Skills & Expertise</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </div>
            
            <div className="grid gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4>React</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">23 endorsements</span>
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Proficiency Level</span>
                    <span>95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4>Solidity</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">15 endorsements</span>
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Proficiency Level</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3>WorkNFT Portfolio</h3>
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Public Link
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="group hover:shadow-lg transition-all duration-200">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-t-lg relative overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <Sparkles className="w-16 h-16 text-primary/50" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-black/70 text-white">#1</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="mb-1">DeFi Trading Dashboard</h4>
                    <p className="text-sm text-muted-foreground mb-3">Advanced trading interface with real-time analytics</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs">Frontend Development</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">5.0</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>$2,500</span>
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-lg transition-all duration-200">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-t-lg relative overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <Sparkles className="w-16 h-16 text-blue-500/50" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-black/70 text-white">#2</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="mb-1">Smart Contract Audit Tool</h4>
                    <p className="text-sm text-muted-foreground mb-3">Automated security analysis for Ethereum contracts</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs">Blockchain Development</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">4.9</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>$3,200</span>
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                    <span className="text-3xl">4.8</span>
                  </div>
                  <p className="text-muted-foreground">Overall Rating</p>
                  <p className="text-sm text-muted-foreground">127 total reviews</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Communication</span>
                    <div className="flex items-center gap-2">
                      <Progress value={98} className="w-20 h-2" />
                      <span className="text-sm">4.9</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quality</span>
                    <div className="flex items-center gap-2">
                      <Progress value={96} className="w-20 h-2" />
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Delivery</span>
                    <div className="flex items-center gap-2">
                      <Progress value={94} className="w-20 h-2" />
                      <span className="text-sm">4.7</span>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h4 className="mb-4">Achievements</h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-purple-200 bg-purple-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h5 className="text-sm">Top Rated Creator</h5>
                        <p className="text-xs text-muted-foreground">Maintained 4.8+ rating for 6 months</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-blue-200 bg-blue-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h5 className="text-sm">WorkNFT Collector</h5>
                        <p className="text-xs text-muted-foreground">Earned 50+ WorkNFTs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <Card className="p-6">
              <h4 className="mb-4">Recent Reviews</h4>
              <div className="space-y-4">
                <div className="border-b border-border pb-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="text-sm">DF</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="text-sm">DeFiProtocol</h5>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                      <p className="text-sm mb-2">Exceptional work on the trading dashboard. Alex delivered beyond expectations with clean code and innovative features.</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Project: DeFi Trading Dashboard</span>
                        <span>Feb 20, 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-border pb-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="text-sm">SD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="text-sm">SecurityDAO</h5>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                      <p className="text-sm mb-2">Outstanding security audit tool implementation. Professional communication throughout the project.</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Project: Smart Contract Audit Tool</span>
                        <span>Jan 25, 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}