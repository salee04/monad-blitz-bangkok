import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { 
  User, 
  Bell, 
  Shield, 
  Palette,
  CheckCircle,
  Download
} from "lucide-react";

export function Settings() {
  return (
    <div className="p-4 space-y-4 bg-background min-h-screen">
      <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
        <h1 className="text-lg text-foreground mb-1">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account preferences and application settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Settings */}
        <Card className="p-6 rounded-lg border border-border shadow-sm bg-card">
          <div className="flex items-center gap-3 mb-6">
            <User className="h-5 w-5 text-primary" />
            <h3 className="text-lg text-foreground">Account Information</h3>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="username" className="text-foreground">Username</Label>
                <Input 
                  id="username"
                  defaultValue="alexjohnson"
                  className="mt-2 rounded-lg bg-input-background border-border h-12"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input 
                  id="email"
                  defaultValue="alex.johnson@email.com"
                  className="mt-2 rounded-lg bg-input-background border-border h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone" className="text-foreground">Phone</Label>
                <Input 
                  id="phone"
                  defaultValue="+1 (555) 123-4567"
                  className="mt-2 rounded-lg bg-input-background border-border h-12"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-foreground">Location</Label>
                <Input 
                  id="location"
                  defaultValue="San Francisco, CA"
                  className="mt-2 rounded-lg bg-input-background border-border h-12"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="timezone" className="text-foreground">Timezone</Label>
              <Select>
                <SelectTrigger className="mt-2 rounded-lg bg-input-background border-border h-12">
                  <SelectValue placeholder="Pacific Standard Time (PST)" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border rounded-lg">
                  <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                  <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                  <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" className="rounded-lg border-border hover:bg-accent">Cancel</Button>
              <Button className="rounded-lg bg-primary hover:bg-primary/90">Save Changes</Button>
            </div>
          </form>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6 rounded-lg border border-border shadow-sm bg-card">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="text-lg text-foreground">Notifications</h3>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-4 text-foreground">Email Notifications</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">New Job Matches</p>
                    <p className="text-sm text-muted-foreground">Get notified when jobs match your skills</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Payment Updates</p>
                    <p className="text-sm text-muted-foreground">Receive updates about payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Project Messages</p>
                    <p className="text-sm text-muted-foreground">Get notified about communications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4 text-foreground">Push Notifications</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Urgent Messages</p>
                    <p className="text-sm text-muted-foreground">Critical communications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Deadline Reminders</p>
                    <p className="text-sm text-muted-foreground">Upcoming deadlines</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="p-6 rounded-lg border border-border shadow-sm bg-card">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg text-foreground">Privacy & Security</h3>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-4 text-foreground">Profile Visibility</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Public Profile</p>
                    <p className="text-sm text-muted-foreground">Allow others to view your profile</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Show Portfolio</p>
                    <p className="text-sm text-muted-foreground">Display your work publicly</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4 text-foreground">Two-Factor Authentication</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">2FA Status</p>
                  <p className="text-sm text-muted-foreground">Extra security for your account</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="rounded-full bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Enabled
                  </Badge>
                  <Button variant="outline" size="sm" className="rounded-lg">Configure</Button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full rounded-lg border-border hover:bg-accent">
                <Download className="h-4 w-4 mr-2" />
                Download My Data
              </Button>
              <Button variant="outline" className="w-full rounded-lg text-red-600 border-red-600 hover:bg-red-50">
                Delete Account
              </Button>
            </div>
          </div>
        </Card>

        {/* Appearance Settings */}
        <Card className="p-6 rounded-lg border border-border shadow-sm bg-card">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="h-5 w-5 text-primary" />
            <h3 className="text-lg text-foreground">Appearance</h3>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="theme" className="text-foreground">Theme</Label>
              <Select>
                <SelectTrigger className="mt-2 rounded-lg bg-input-background border-border h-12">
                  <SelectValue placeholder="System" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border rounded-lg">
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="language" className="text-foreground">Language</Label>
              <Select>
                <SelectTrigger className="mt-2 rounded-lg bg-input-background border-border h-12">
                  <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border rounded-lg">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Compact Mode</p>
                  <p className="text-sm text-muted-foreground">Show more content in less space</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Animations</p>
                  <p className="text-sm text-muted-foreground">Enable smooth transitions</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Connected Accounts */}
      <Card className="p-6 rounded-lg border border-border shadow-sm bg-card">
        <h3 className="text-lg text-foreground mb-6">Connected Accounts</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">G</div>
              <div>
                <p className="font-medium text-foreground">Google Account</p>
                <p className="text-sm text-muted-foreground">alex.johnson@gmail.com</p>
              </div>
            </div>
            <Badge className="rounded-full bg-green-100 text-green-800">Connected</Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white">G</div>
              <div>
                <p className="font-medium text-foreground">GitHub</p>
                <p className="text-sm text-muted-foreground">Not connected</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-lg">Connect</Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white">W</div>
              <div>
                <p className="font-medium text-foreground">Web3 Wallet</p>
                <p className="text-sm text-muted-foreground">MetaMask connected</p>
              </div>
            </div>
            <Badge className="rounded-full bg-green-100 text-green-800">Connected</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}