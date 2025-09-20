import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  DollarSign, 
  FileText, 
  Settings,
  Upload,
  Clock,
  Star,
  Shield,
  Eye,
  X,
  CloudUpload,
  AlertCircle,
  Info,
  Plus,
  Users,
  Target,
  Briefcase,
  Wallet as WalletIcon,
  Globe,
  MessageSquare,
  FileImage,
  FilePdf,
  FileSpreadsheet,
  CheckCircle2,
  RefreshCw,
  BarChart3,
  AlertTriangle,
  Lightbulb,
  MapPin,
  Building,
  Palette,
  Code,
  PenTool,
  Database
} from "lucide-react";

// Simplified types
interface BountyData {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  skills: string[];
  difficulty: string;
  rewardAmount: number;
  deadline: string;
  timeCommitment: string;
  projectType: string;
  geography: string;
  deliverables: string[];
  tools: string[];
  ipRights: string;
  revisions: number;
  assignmentMode: string;
  maxSubmissions: number;
  autoApproval: boolean;
  privacy: string;
  featured: boolean;
  confidentiality: boolean;
  communication: string[];
}

export function CreateBounty() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showTransactionDialog, setShowTransactionDialog] = useState(false);
  const [walletConnected, setWalletConnected] = useState(true);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Form data
  const [bountyData, setBountyData] = useState<BountyData>({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    skills: [],
    difficulty: 'Intermediate',
    rewardAmount: 0,
    deadline: '',
    timeCommitment: '',
    projectType: 'One-time',
    geography: 'Global',
    deliverables: [],
    tools: [],
    ipRights: 'work-for-hire',
    revisions: 2,
    assignmentMode: 'application-based',
    maxSubmissions: 1,
    autoApproval: false,
    privacy: 'public',
    featured: false,
    confidentiality: false,
    communication: ['platform']
  });

  // Helper states
  const [newSkill, setNewSkill] = useState('');
  const [newDeliverable, setNewDeliverable] = useState('');

  // Mock data
  const categories = [
    { id: 'design', name: 'Design', icon: Palette, subcategories: ['UI/UX Design', 'Graphic Design', 'Branding'] },
    { id: 'development', name: 'Development', icon: Code, subcategories: ['Frontend', 'Backend', 'Mobile'] },
    { id: 'content', name: 'Content', icon: PenTool, subcategories: ['Writing', 'Video', 'Marketing'] },
    { id: 'business', name: 'Business', icon: Building, subcategories: ['Strategy', 'Research', 'Analysis'] },
    { id: 'data', name: 'Data & AI', icon: Database, subcategories: ['Data Science', 'ML', 'Analytics'] }
  ];

  const steps = [
    { id: 1, title: "Job Details", description: "Basic information", icon: FileText },
    { id: 2, title: "Requirements", description: "Skills and specs", icon: Target },
    { id: 3, title: "Timeline & Budget", description: "Deadline and reward", icon: Clock },
    { id: 4, title: "Files & Brief", description: "Upload attachments", icon: Upload },
    { id: 5, title: "Configuration", description: "Bounty settings", icon: Settings },
    { id: 6, title: "Preview & Publish", description: "Review and confirm", icon: Eye }
  ];

  // Validation
  const validateStep = (step: number): boolean => {
    const errors: string[] = [];

    switch (step) {
      case 1:
        if (!bountyData.title.trim()) errors.push('Title is required');
        if (bountyData.title.length < 5) errors.push('Title must be at least 5 characters');
        if (!bountyData.description.trim()) errors.push('Description is required');
        if (bountyData.description.length < 50) errors.push('Description must be at least 50 characters');
        if (!bountyData.category) errors.push('Category is required');
        break;
      case 2:
        if (bountyData.skills.length === 0) errors.push('At least one skill is required');
        if (bountyData.deliverables.length === 0) errors.push('At least one deliverable is required');
        break;
      case 3:
        if (bountyData.rewardAmount < 5) errors.push('Minimum reward is $5 USDC');
        if (bountyData.rewardAmount > 10000) errors.push('Maximum reward is $10,000 USDC');
        if (!bountyData.deadline) errors.push('Deadline is required');
        break;
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setValidationErrors([]);
  };

  // Helper functions
  const addSkill = useCallback(() => {
    try {
      if (newSkill.trim() && !bountyData.skills.includes(newSkill.trim())) {
        setBountyData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
        setNewSkill('');
      }
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  }, [newSkill, bountyData.skills]);

  const removeSkill = (skillToRemove: string) => {
    setBountyData(prev => ({ 
      ...prev, 
      skills: prev.skills.filter(skill => skill !== skillToRemove) 
    }));
  };

  const addDeliverable = useCallback(() => {
    try {
      if (newDeliverable.trim() && !bountyData.deliverables.includes(newDeliverable.trim())) {
        setBountyData(prev => ({ 
          ...prev, 
          deliverables: [...prev.deliverables, newDeliverable.trim()] 
        }));
        setNewDeliverable('');
      }
    } catch (error) {
      console.error('Error adding deliverable:', error);
    }
  }, [newDeliverable, bountyData.deliverables]);

  const removeDeliverable = (deliverableToRemove: string) => {
    setBountyData(prev => ({ 
      ...prev, 
      deliverables: prev.deliverables.filter(d => d !== deliverableToRemove) 
    }));
  };

  const calculateCosts = () => {
    const reward = bountyData.rewardAmount;
    const platformFee = Math.round(reward * 0.02);
    const gasFee = 2.5;
    const featuredFee = bountyData.featured ? 10 : 0;
    const total = reward + platformFee + gasFee + featuredFee;
    return { reward, platformFee, gasFee, featuredFee, total };
  };

  const handlePublishBounty = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('Bounty published successfully!');
    } catch (error) {
      console.error('Failed to publish bounty:', error);
    } finally {
      setIsLoading(false);
      setShowTransactionDialog(false);
    }
  };

  const renderStepContent = () => {
    try {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title <span className="text-destructive">*</span></Label>
              <Input
                id="title"
                value={bountyData.title}
                onChange={(e) => setBountyData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter a clear, descriptive title"
                className="h-11"
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">{bountyData.title.length}/100 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description <span className="text-destructive">*</span></Label>
              <Textarea
                id="description"
                value={bountyData.description}
                onChange={(e) => setBountyData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your project in detail..."
                className="min-h-32"
                maxLength={2000}
              />
              <p className="text-xs text-muted-foreground">{bountyData.description.length}/2000 characters (minimum 50)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category <span className="text-destructive">*</span></Label>
                <Select 
                  value={bountyData.category} 
                  onValueChange={(value) => setBountyData(prev => ({ ...prev, category: value, subcategory: '' }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => {
                      const CategoryIcon = cat.icon;
                      return (
                        <SelectItem key={cat.id} value={cat.name}>
                          <div className="flex items-center gap-2">
                            <CategoryIcon className="h-4 w-4" />
                            {cat.name}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {bountyData.category && (
                <div className="space-y-2">
                  <Label>Subcategory</Label>
                  <Select 
                    value={bountyData.subcategory} 
                    onValueChange={(value) => setBountyData(prev => ({ ...prev, subcategory: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {(() => {
                        const category = categories.find(c => c.name === bountyData.category);
                        return category?.subcategories?.map(sub => (
                          <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                        )) || [];
                      })()}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Project Type</Label>
                <Select 
                  value={bountyData.projectType} 
                  onValueChange={(value) => setBountyData(prev => ({ ...prev, projectType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="One-time">One-time Project</SelectItem>
                    <SelectItem value="Ongoing">Ongoing Work</SelectItem>
                    <SelectItem value="Contest">Design Contest</SelectItem>
                    <SelectItem value="Collaboration">Collaboration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Geographic Preference</Label>
                <Select 
                  value={bountyData.geography} 
                  onValueChange={(value) => setBountyData(prev => ({ ...prev, geography: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Global">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Global (Anywhere)
                      </div>
                    </SelectItem>
                    <SelectItem value="Regional">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Regional Preference
                      </div>
                    </SelectItem>
                    <SelectItem value="Local">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Local Only
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Required Skills <span className="text-destructive">*</span></Label>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="Type a skill and press Enter"
                  className="flex-1"
                />
                <Button type="button" onClick={addSkill} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              {bountyData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg border">
                  {bountyData.skills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                      onClick={() => removeSkill(skill)}
                    >
                      {skill}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label>Difficulty Level</Label>
              <RadioGroup 
                value={bountyData.difficulty} 
                onValueChange={(value) => setBountyData(prev => ({ ...prev, difficulty: value }))}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <RadioGroupItem value={level} id={level} />
                    <Label htmlFor={level} className="text-sm">{level}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Expected Deliverables <span className="text-destructive">*</span></Label>
              <div className="flex gap-2">
                <Input
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addDeliverable();
                    }
                  }}
                  placeholder="Describe a deliverable"
                  className="flex-1"
                />
                <Button type="button" onClick={addDeliverable} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              {bountyData.deliverables.length > 0 && (
                <div className="space-y-2">
                  {bountyData.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded border">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="flex-1 text-sm">{deliverable}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDeliverable(deliverable)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label>Required Tools/Software</Label>
              <Textarea
                value={bountyData.tools.join(', ')}
                onChange={(e) => setBountyData(prev => ({
                  ...prev,
                  tools: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                }))}
                placeholder="List tools, software, or resources needed"
                className="min-h-20"
              />
            </div>

            <div className="space-y-3">
              <Label>Allowed Revisions: {bountyData.revisions}</Label>
              <Slider
                value={[bountyData.revisions]}
                onValueChange={([value]) => setBountyData(prev => ({ ...prev, revisions: value }))}
                max={5}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>No revisions</span>
                <span>Up to 5 revisions</span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Reward Amount (USDC) <span className="text-destructive">*</span></Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  value={bountyData.rewardAmount || ''}
                  onChange={(e) => setBountyData(prev => ({ ...prev, rewardAmount: parseFloat(e.target.value) || 0 }))}
                  placeholder="Enter amount (minimum $5)"
                  className="pl-10 h-11"
                  min={5}
                  max={10000}
                />
              </div>
              <p className="text-xs text-muted-foreground">Minimum: $5 USDC • Maximum: $10,000 USDC</p>
            </div>

            <div className="space-y-3">
              <Label>Project Deadline <span className="text-destructive">*</span></Label>
              <Input
                type="datetime-local"
                value={bountyData.deadline}
                onChange={(e) => setBountyData(prev => ({ ...prev, deadline: e.target.value }))}
                className="h-11"
                min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}
              />
              <p className="text-xs text-muted-foreground">Minimum 24 hours from now</p>
            </div>

            <div className="space-y-3">
              <Label>Estimated Time Commitment</Label>
              <Select 
                value={bountyData.timeCommitment} 
                onValueChange={(value) => setBountyData(prev => ({ ...prev, timeCommitment: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select estimated time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5 hours">1-5 hours</SelectItem>
                  <SelectItem value="5-10 hours">5-10 hours</SelectItem>
                  <SelectItem value="10-20 hours">10-20 hours</SelectItem>
                  <SelectItem value="20-40 hours">20-40 hours</SelectItem>
                  <SelectItem value="40+ hours">40+ hours</SelectItem>
                  <SelectItem value="1 week">1 week</SelectItem>
                  <SelectItem value="2-4 weeks">2-4 weeks</SelectItem>
                  <SelectItem value="1+ months">1+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(() => {
                  const costs = calculateCosts();
                  return (
                    <>
                      <div className="flex justify-between">
                        <span>Reward Amount</span>
                        <span className="font-medium">${costs.reward.toFixed(2)} USDC</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Platform Fee (2%)</span>
                        <span>${costs.platformFee.toFixed(2)} USDC</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Estimated Gas Fee</span>
                        <span>${costs.gasFee.toFixed(2)} USDC</span>
                      </div>
                      {costs.featuredFee > 0 && (
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Featured Placement</span>
                          <span>${costs.featuredFee.toFixed(2)} USDC</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total Cost</span>
                        <span className="text-primary">${costs.total.toFixed(2)} USDC</span>
                      </div>
                    </>
                  );
                })()}
              </CardContent>
            </Card>

            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-primary">Escrow Protection</h4>
                  <p className="text-sm text-primary/80 mt-1">
                    Your payment will be held securely in escrow until the work is completed and approved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Project Files & Attachments</Label>
              <p className="text-sm text-muted-foreground">
                Upload project briefs, mockups, references, or any supporting materials
              </p>
              
              <div className="border-2 border-dashed border-border hover:border-primary transition-colors rounded-xl p-8 text-center">
                <CloudUpload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">Drop files here or click to browse</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports PDF, DOC, ZIP, images up to 25MB per file
                </p>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            </div>

            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground mb-2">File Upload Tips</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Include a detailed project brief with requirements and examples</li>
                      <li>• Add mockups or wireframes to communicate your vision</li>
                      <li>• Provide brand guidelines or style references if applicable</li>
                      <li>• Include any existing assets or files the creator will need</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Assignment Mode</Label>
              <RadioGroup 
                value={bountyData.assignmentMode} 
                onValueChange={(value) => setBountyData(prev => ({ ...prev, assignmentMode: value }))}
                className="space-y-3"
              >
                <div className="flex items-start space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="application-based" id="application-based" className="mt-1" />
                  <div className="space-y-1">
                    <Label htmlFor="application-based" className="font-medium">Application-Based</Label>
                    <p className="text-sm text-muted-foreground">
                      Review applications and choose the best creator for your project
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="first-come" id="first-come" className="mt-1" />
                  <div className="space-y-1">
                    <Label htmlFor="first-come" className="font-medium">First Come, First Served</Label>
                    <p className="text-sm text-muted-foreground">
                      The first qualified creator to accept gets the job
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Bounty Visibility</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="privacy"
                  checked={bountyData.privacy === 'public'}
                  onCheckedChange={(checked) => setBountyData(prev => ({
                    ...prev,
                    privacy: checked ? 'public' : 'private'
                  }))}
                />
                <Label htmlFor="privacy">
                  {bountyData.privacy === 'public' ? 'Public (visible to all users)' : 'Private (invite only)'}
                </Label>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Maximum Submissions: {bountyData.maxSubmissions}</Label>
              <Slider
                value={[bountyData.maxSubmissions]}
                onValueChange={([value]) => setBountyData(prev => ({ ...prev, maxSubmissions: value }))}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 submission</span>
                <span>10 submissions</span>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Advanced Settings</Label>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Auto-approval</Label>
                    <p className="text-sm text-muted-foreground">Automatically approve work that meets criteria</p>
                  </div>
                  <Switch
                    checked={bountyData.autoApproval}
                    onCheckedChange={(checked) => setBountyData(prev => ({ ...prev, autoApproval: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Confidentiality Required</Label>
                    <p className="text-sm text-muted-foreground">Require NDA agreement for sensitive projects</p>
                  </div>
                  <Switch
                    checked={bountyData.confidentiality}
                    onCheckedChange={(checked) => setBountyData(prev => ({ ...prev, confidentiality: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Featured Bounty</Label>
                    <p className="text-sm text-muted-foreground">Highlight this bounty for better visibility (+$10)</p>
                  </div>
                  <Switch
                    checked={bountyData.featured}
                    onCheckedChange={(checked) => setBountyData(prev => ({ ...prev, featured: checked }))}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-lg font-medium">Bounty Preview</Label>
              
              <Card className="border">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold">{bountyData.title || 'Untitled Bounty'}</h3>
                      <div className="flex gap-2">
                        {bountyData.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <Badge variant="outline">
                          {bountyData.privacy === 'public' ? 'Public' : 'Private'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        ${bountyData.rewardAmount} USDC
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {bountyData.deadline ? new Date(bountyData.deadline).toLocaleDateString() : 'No deadline set'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        {bountyData.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{bountyData.category}</Badge>
                      {bountyData.subcategory && (
                        <Badge variant="outline">{bountyData.subcategory}</Badge>
                      )}
                    </div>
                    
                    {bountyData.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {bountyData.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Description</Label>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {bountyData.description || 'No description provided'}
                    </p>
                  </div>

                  {bountyData.deliverables.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Deliverables</Label>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {bountyData.deliverables.map((deliverable, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="border">
              <CardHeader>
                <CardTitle>Final Cost Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const costs = calculateCosts();
                  return (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Bounty Reward</span>
                        <span>${costs.reward.toFixed(2)} USDC</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Platform Fee (2%)</span>
                        <span>${costs.platformFee.toFixed(2)} USDC</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Gas Fee (estimated)</span>
                        <span>${costs.gasFee.toFixed(2)} USDC</span>
                      </div>
                      {costs.featuredFee > 0 && (
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Featured Placement</span>
                          <span>${costs.featuredFee.toFixed(2)} USDC</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-primary">${costs.total.toFixed(2)} USDC</span>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            <Card className={`border ${walletConnected ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <WalletIcon className={`h-5 w-5 ${walletConnected ? 'text-green-600' : 'text-orange-600'}`} />
                  <div className="flex-1">
                    <p className={`font-medium ${walletConnected ? 'text-green-800' : 'text-orange-800'}`}>
                      {walletConnected ? 'Wallet Connected' : 'Wallet Not Connected'}
                    </p>
                    <p className={`text-sm ${walletConnected ? 'text-green-600' : 'text-orange-600'}`}>
                      {walletConnected 
                        ? 'Ready to proceed with bounty creation'
                        : 'Please connect your wallet to continue'
                      }
                    </p>
                  </div>
                  {!walletConnected && (
                    <Button size="sm">Connect Wallet</Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{' '}
                  <button className="text-primary hover:underline">Terms of Service</button>
                  {' '}and{' '}
                  <button className="text-primary hover:underline">Bounty Guidelines</button>
                </Label>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Step content not found</p>
          </div>
        );
    }
    } catch (error) {
      console.error('Error rendering step content:', error);
      return (
        <div className="text-center py-8">
          <p className="text-destructive">Error loading step content</p>
          <Button variant="outline" onClick={() => setCurrentStep(1)} className="mt-2">
            Go to Step 1
          </Button>
        </div>
      );
    }
  };

  try {
    return (
      <div className="w-full bg-background min-h-screen">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="w-full px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-foreground mb-1">Create New Bounty</h1>
              <p className="text-muted-foreground">
                Post a project and connect with talented creators
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Progress Stepper */}
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm text-foreground font-medium">Step {currentStep} of 6</h2>
                <span className="text-xs text-muted-foreground">{Math.round((currentStep / 6) * 100)}% Complete</span>
              </div>
              <Progress value={(currentStep / 6) * 100} className="h-2 mb-6" />
              
              <div className="hidden md:flex items-center justify-between">
                {steps.map((step) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={step.id} className="flex flex-col items-center space-y-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                        currentStep > step.id
                          ? 'bg-primary text-primary-foreground' 
                          : currentStep === step.id
                          ? 'border-2 border-primary text-primary bg-primary/10'
                          : 'border-2 border-border text-muted-foreground'
                      }`}>
                        {currentStep > step.id ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <StepIcon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="text-center">
                        <p className={`text-xs font-medium ${
                          currentStep === step.id ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <Card className="border-destructive">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <h4 className="font-medium text-destructive">Please fix the following issues:</h4>
                    <ul className="mt-2 space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index} className="text-sm text-destructive">
                          • {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Form Content */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const currentStepData = steps.find(s => s.id === currentStep);
                  if (currentStepData) {
                    return (
                      <>
                        <currentStepData.icon className="h-5 w-5" />
                        {currentStepData.title}
                      </>
                    );
                  }
                  return "Step";
                })()}
              </CardTitle>
              <p className="text-muted-foreground">
                {steps.find(s => s.id === currentStep)?.description || "Step description"}
              </p>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="h-11 px-6"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="h-11 px-6">
                <RefreshCw className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              
              {currentStep < 6 ? (
                <Button onClick={nextStep} className="h-11 px-6">
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={() => setShowTransactionDialog(true)}
                  disabled={!walletConnected || validationErrors.length > 0}
                  className="h-11 px-6"
                >
                  <WalletIcon className="h-4 w-4 mr-2" />
                  Publish Bounty
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Dialog */}
      <Dialog open={showTransactionDialog} onOpenChange={setShowTransactionDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Bounty Publication</DialogTitle>
            <DialogDescription>
              You're about to publish your bounty. This will initiate an escrow transaction.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-2">Transaction Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total Escrow Amount</span>
                  <span className="font-medium">${calculateCosts().total.toFixed(2)} USDC</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Network</span>
                  <span>Monad Testnet</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Gas</span>
                  <span>~$2.50</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-primary/20 bg-primary/10 rounded-lg">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-primary mt-0.5" />
                <p className="text-sm text-primary">
                  Your funds will be held securely in escrow until the work is completed and approved.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowTransactionDialog(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handlePublishBounty} disabled={isLoading} className="flex-1">
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <WalletIcon className="h-4 w-4 mr-2" />
                  Confirm & Sign
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    );
  } catch (error) {
    console.error('Error in CreateBounty component:', error);
    return (
      <div className="w-full bg-background min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-xl text-foreground">Something went wrong</h2>
          <p className="text-muted-foreground">There was an error loading the Create Bounty page.</p>
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }
}