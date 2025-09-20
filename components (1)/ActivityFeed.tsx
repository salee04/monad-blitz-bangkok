import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Search,
  ArrowUpRight,
  DollarSign,
  Award,
  MessageSquare,
  Zap,
  Clock3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "bounty" | "payment" | "nft" | "review";
  title: string;
  description: string;
  time: string;
  timestamp: number;
  avatarFallback: string;
  status: "success" | "pending" | "warning" | "info";
  action?: string;
  amount?: number;
  isNew?: boolean;
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "bounty",
    title: "New bounty application received",
    description: "Full Stack E-commerce Platform Development",
    time: "2 minutes ago",
    timestamp: Date.now() - 2 * 60 * 1000,
    avatarFallback: "JD",
    status: "info",
    action: "Review Application",
    isNew: true,
  },
  {
    id: "2",
    type: "payment",
    title: "Payment received",
    description: "Logo Design for TechCorp completed",
    time: "1 hour ago",
    timestamp: Date.now() - 60 * 60 * 1000,
    avatarFallback: "TC",
    status: "success",
    action: "View Receipt",
    amount: 250,
  },
  {
    id: "3",
    type: "bounty",
    title: "Bounty milestone completed",
    description: "Mobile App UI/UX Design - Phase 2",
    time: "3 hours ago",
    timestamp: Date.now() - 3 * 60 * 60 * 1000,
    avatarFallback: "MA",
    status: "success",
    action: "Continue to Phase 3",
  },
  {
    id: "4",
    type: "review",
    title: "New review received",
    description:
      "5-star rating for React Component Development",
    time: "6 hours ago",
    timestamp: Date.now() - 6 * 60 * 60 * 1000,
    avatarFallback: "RC",
    status: "success",
    action: "View Review",
  },
];

export function ActivityFeed({
  className = "",
}: {
  className?: string;
}) {
  const [activities, setActivities] =
    useState<ActivityItem[]>(mockActivities);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] =
    useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        const types: ActivityItem["type"][] = [
          "bounty",
          "payment",
          "nft",
          "review",
        ];
        const statuses: ActivityItem["status"][] = [
          "success",
          "pending",
          "warning",
          "info",
        ];

        const newActivity: ActivityItem = {
          id: Date.now().toString(),
          type: types[Math.floor(Math.random() * types.length)],
          title: "New activity update",
          description: "Real-time activity simulation",
          time: "Just now",
          timestamp: Date.now(),
          avatarFallback: "RT",
          status:
            statuses[
              Math.floor(Math.random() * statuses.length)
            ],
          action: "View Details",
          isNew: true,
        };

        setActivities((prev) => [
          newActivity,
          ...prev.slice(0, -1),
        ]);

        setTimeout(() => {
          setActivities((prev) =>
            prev.map((activity) =>
              activity.id === newActivity.id
                ? { ...activity, isNew: false }
                : activity,
            ),
          );
        }, 2000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Filter activities
  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      activity.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "all" || activity.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Paginate activities
  const totalPages = Math.ceil(
    filteredActivities.length / itemsPerPage,
  );
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bounty":
        return Zap;
      case "payment":
        return DollarSign;
      case "nft":
        return Award;
      case "review":
        return MessageSquare;
      default:
        return Zap;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "bounty":
        return {
          color: "text-primary",
          bgColor: "bg-primary/10",
        };
      case "payment":
        return {
          color: "text-chart-2",
          bgColor: "bg-chart-2/10",
        };
      case "nft":
        return {
          color: "text-secondary-foreground",
          bgColor: "bg-secondary/20",
        };
      case "review":
        return {
          color: "text-chart-3",
          bgColor: "bg-chart-3/10",
        };
      default:
        return {
          color: "text-primary",
          bgColor: "bg-primary/10",
        };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-chart-2";
      case "pending":
        return "bg-chart-3";
      case "warning":
        return "bg-destructive";
      case "info":
        return "bg-primary";
      default:
        return "bg-muted";
    }
  };

  return (
    <Card
      className={`bg-card border border-border rounded-xl shadow-sm ${className}`}
    >
      {/* Activity Header */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg text-foreground">
              Recent Activity
            </h2>
            {filteredActivities.length > 0 && (
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 rounded-full"
              >
                {filteredActivities.length}
              </Badge>
            )}
          </div>

          {/* Activity Controls */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-8 w-full sm:w-48 text-xs"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant={
                  selectedType === "all" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedType("all")}
                className="text-xs px-2 py-1 h-7"
              >
                All
              </Button>
              <Button
                variant={
                  selectedType === "bounty"
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => setSelectedType("bounty")}
                className="text-xs px-2 py-1 h-7"
              >
                Bounty
              </Button>
              <Button
                variant={
                  selectedType === "payment"
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => setSelectedType("payment")}
                className="text-xs px-2 py-1 h-7"
              >
                Payment
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-border">
        {paginatedActivities.length > 0 ? (
          paginatedActivities.map((activity) => {
            const TypeIcon = getTypeIcon(activity.type);
            const typeStyles = getTypeStyles(activity.type);

            return (
              <div
                key={activity.id}
                className={`p-4 hover:bg-accent/50 transition-all duration-300 border-l-2 ${
                  activity.isNew
                    ? "border-l-primary bg-primary/5"
                    : "border-l-transparent"
                } group`}
                style={{ minHeight: "72px" }}
              >
                <div className="flex items-start gap-3">
                  {/* Activity Type Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${typeStyles.bgColor} flex-shrink-0`}
                  >
                    <TypeIcon
                      className={`h-5 w-5 ${typeStyles.color}`}
                    />
                  </div>

                  {/* Avatar */}
                  <Avatar className="w-8 h-8 border border-border flex-shrink-0">
                    <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                      {activity.avatarFallback}
                    </AvatarFallback>
                  </Avatar>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-2">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm text-foreground truncate">
                            {activity.title}
                          </h4>
                          {activity.amount && (
                            <Badge
                              variant="secondary"
                              className="bg-chart-2/10 text-chart-2 border-chart-2/20 rounded-full px-2 py-0.5 text-xs"
                            >
                              ${activity.amount}
                            </Badge>
                          )}
                        </div>

                        <p className="text-muted-foreground text-xs mb-2">
                          {activity.description}
                        </p>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <div
                              className={`w-2 h-2 rounded-full ${getStatusColor(activity.status)}`}
                            ></div>
                            <span className="text-xs text-muted-foreground">
                              {activity.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {activity.action && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-border text-muted-foreground hover:bg-accent rounded-lg text-xs px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            {activity.action}
                            <ArrowUpRight className="h-3 w-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock3 className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm mb-1">
              No activities found
            </p>
            <p className="text-muted-foreground text-xs">
              {searchTerm || selectedType !== "all"
                ? "Try adjusting your filters"
                : "Your activity will appear here as you interact with the platform"}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Page {currentPage} of {totalPages} (
              {filteredActivities.length} total)
            </p>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.max(1, prev - 1),
                  )
                }
                disabled={currentPage === 1}
                className="h-7 w-7 p-0"
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(totalPages, prev + 1),
                  )
                }
                disabled={currentPage === totalPages}
                className="h-7 w-7 p-0"
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}