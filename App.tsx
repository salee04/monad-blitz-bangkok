import { useState } from "react";
import { 
  Plus, 
  Briefcase, 
  User, 
  Wallet, 
  Settings,
  Home,
  Search
} from "lucide-react";

// Import page components
import { Dashboard } from "@/components (1)/pages/Dashboard";
import { BrowseJobs } from "@/components (1)/pages/BrowseJobs";
import { CreateBounty } from "@/components (1)/pages/CreateBounty";
import { MyWork } from "@/components (1)/pages/MyWork";
import { Profile } from "@/components (1)/pages/Profile";
import { Wallet as WalletComponent } from "@/components (1)/pages/Wallet";
import { Settings as SettingsComponent } from "@/components (1)/pages/Settings";

const topMenuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "browse-jobs", label: "Browse", icon: Search },
  { id: "create-bounty", label: "Create", icon: Plus },
  { id: "my-work", label: "Work", icon: Briefcase },
  { id: "profile", label: "Profile", icon: User },
];

const bottomMenuItems = [
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function App() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const renderActiveComponent = () => {
    try {
      switch (activeItem) {
        case "dashboard":
          return <Dashboard />;
        case "browse-jobs":
          return <BrowseJobs />;
        case "create-bounty":
          return <CreateBounty />;
        case "my-work":
          return <MyWork />;
        case "profile":
          return <Profile />;
        case "wallet":
          return <WalletComponent />;
        case "settings":
          return <SettingsComponent />;
        default:
          return <Dashboard />;
      }
    } catch (error) {
      console.error('Error rendering component:', error);
      return (
        <div className="flex items-center justify-center h-full p-8">
          <div className="text-center space-y-4">
            <h2 className="text-xl text-foreground">Something went wrong</h2>
            <p className="text-muted-foreground">Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Custom Sidebar - Material 3 */}
      <div className="w-28 border-r border-border bg-card h-screen overflow-hidden fixed left-0 top-0 z-50 shadow-sm">
        <div className="h-full flex flex-col">
          {/* Top Menu Items */}
          <div className="px-2 pt-6 flex-none">
            <div className="space-y-3">
              {topMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className="w-full flex flex-col items-center gap-1.5 p-0 h-auto bg-transparent group"
                >
                  {/* Elliptical icon container with Material 3 styling */}
                  <div className={`w-14 h-10 flex items-center justify-center rounded-2xl transition-all duration-200 ${
                    activeItem === item.id 
                      ? "bg-primary shadow-sm" 
                      : "hover:bg-accent"
                  }`}>
                    <item.icon className={`h-5 w-5 transition-all duration-200 ${
                      activeItem === item.id ? "text-primary-foreground" : "text-foreground group-hover:text-accent-foreground"
                    }`} />
                  </div>
                  
                  <span className={`text-sm text-center leading-tight px-1 transition-all duration-200 w-20 truncate ${
                    activeItem === item.id ? "text-primary" : "text-foreground/70 group-hover:text-foreground"
                  }`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Flexible spacer to push bottom menu to the bottom */}
          <div className="flex-1"></div>

          {/* Bottom Menu Items */}
          <div className="px-2 pb-6 flex-none">
            <div className="space-y-3">
              {bottomMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className="w-full flex flex-col items-center gap-1.5 p-0 h-auto bg-transparent group"
                >
                  {/* Elliptical icon container with Material 3 styling */}
                  <div className={`w-14 h-10 flex items-center justify-center rounded-2xl transition-all duration-200 ${
                    activeItem === item.id 
                      ? "bg-primary shadow-sm" 
                      : "hover:bg-accent"
                  }`}>
                    <item.icon className={`h-5 w-5 transition-all duration-200 ${
                      activeItem === item.id ? "text-primary-foreground" : "text-foreground group-hover:text-accent-foreground"
                    }`} />
                  </div>
                  
                  <span className={`text-sm text-center leading-tight px-1 transition-all duration-200 w-20 truncate ${
                    activeItem === item.id ? "text-primary" : "text-foreground/70 group-hover:text-foreground"
                  }`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-28 bg-background">
        {/* Header - Material 3 Compact */}
        <header className="h-14 border-b border-border bg-card shadow-sm flex items-center px-4">
          <div className="flex-1">
            <h1 className="text-lg text-foreground">
              {(() => {
                const allItems = [...topMenuItems, ...bottomMenuItems];
                const currentItem = allItems.find(item => item.id === activeItem);
                return currentItem?.label || "Dashboard";
              })()}
            </h1>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-3.5rem)] w-full">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
}