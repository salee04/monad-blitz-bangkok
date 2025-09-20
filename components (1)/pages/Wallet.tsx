import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Wallet as WalletIcon, 
  DollarSign,
  Zap,
  Sparkles,
  Shield,
  CheckCircle,
  ArrowDownLeft,
  ArrowUpRight,
  Copy,
  RefreshCw,
  Send,
  Download,
  Eye,
  ExternalLink
} from "lucide-react";

export function Wallet() {
  const copyAddress = () => {
    const address = '0x742d35Cc6C4f4e8278b8ddE3e3F5f7c8a1B2c34d';
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="w-full bg-background min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Wallet Header */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10" />
          <CardContent className="relative p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <WalletIcon className="w-8 h-8 text-primary" />
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl">Wallet Connected</h2>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>alex.questbond.eth</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={copyAddress}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <span>Monad Testnet</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8" />
                <Badge variant="secondary" className="bg-white/20 text-primary-foreground border-0">
                  Primary
                </Badge>
              </div>
              <div>
                <p className="text-sm opacity-90">USDC Balance</p>
                <p className="text-2xl">$2,847.50</p>
                <p className="text-sm opacity-75 mt-1">Primary Balance</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Zap className="w-8 h-8 text-blue-500" />
                <Badge variant="outline">Gas Token</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">MONAD Balance</p>
                <p className="text-2xl">156.7340</p>
                <p className="text-sm text-muted-foreground mt-1">≈ $133.22 USD</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Sparkles className="w-8 h-8 text-purple-500" />
                <Badge variant="outline">Portfolio</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">WorkNFTs</p>
                <p className="text-2xl">12</p>
                <p className="text-sm text-muted-foreground mt-1">≈ $7,500 USD</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Shield className="w-8 h-8 text-green-500" />
                <Badge variant="outline">Escrow</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Escrow</p>
                <p className="text-2xl">$2,050</p>
                <p className="text-sm text-muted-foreground mt-1">2 active bounties</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Transaction History */}
            <Card className="p-6">
              <h3 className="mb-6">Recent Transactions</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100 text-green-600">
                      <ArrowDownLeft className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Payment Received</h4>
                      <p className="text-sm text-muted-foreground">DeFi Dashboard Design</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+$850 USDC</p>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Confirmed
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">WorkNFT Minted</h4>
                      <p className="text-sm text-muted-foreground">Smart Contract Audit</p>
                      <p className="text-xs text-muted-foreground">6 hours ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Gas Only</p>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Confirmed
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-red-100 text-red-600">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Bounty Created</h4>
                      <p className="text-sm text-muted-foreground">Marketing Video</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">-$1,200 USDC</p>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Confirmed
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  View All Transactions
                </Button>
              </div>
            </Card>
            
            {/* Portfolio Performance */}
            <Card className="p-6">
              <h3 className="mb-4">Portfolio Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Portfolio Value</span>
                  <span className="font-medium">$10,530</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monthly Growth</span>
                  <span className="font-medium text-green-600">+12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Earned</span>
                  <span className="font-medium">$45,750</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Bounties</span>
                  <span className="font-medium">2</span>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start">
                  <Send className="w-4 h-4 mr-2" />
                  Send Payment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Withdraw Funds
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Explorer
                </Button>
              </div>
            </Card>
            
            {/* Recent NFTs */}
            <Card className="p-6">
              <h3 className="mb-4">Recent WorkNFTs</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">DeFi Dashboard</h4>
                    <p className="text-xs text-muted-foreground">Frontend Development</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$2,500</p>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Eye className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Smart Contract Audit</h4>
                    <p className="text-xs text-muted-foreground">Blockchain Development</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$3,200</p>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Eye className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  View All NFTs
                </Button>
              </div>
            </Card>
            
            {/* Network Status */}
            <Card className="p-6">
              <h3 className="mb-4">Network Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Network</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Monad Testnet
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Gas Price</span>
                  <span className="text-sm font-medium">20 Gwei</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Block Height</span>
                  <span className="text-sm font-medium">1,234,567</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status</span>
                  <Badge className="bg-green-100 text-green-800">
                    Synced
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}