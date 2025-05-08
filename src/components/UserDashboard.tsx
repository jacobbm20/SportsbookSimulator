import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  BarChart3Icon,
  ClockIcon,
  CheckIcon,
  XIcon,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserDashboardProps {
  isOpen?: boolean;
  onClose?: () => void;
  virtualBalance?: number;
}

const UserDashboard = ({
  isOpen = true,
  onClose = () => {},
  virtualBalance = 1000,
}: UserDashboardProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const { user, logout } = useAuth();

  // Use provided virtual balance instead of mock data
  const userBalance = virtualBalance;
  const bettingHistory = [
    {
      id: 1,
      type: "Moneyline",
      selection: "Lakers",
      odds: "+150",
      stake: 50,
      potentialPayout: 125,
      status: "won",
      date: "2023-06-15",
    },
    {
      id: 2,
      type: "Spread",
      selection: "Warriors -4.5",
      odds: "-110",
      stake: 100,
      potentialPayout: 190.91,
      status: "lost",
      date: "2023-06-14",
    },
    {
      id: 3,
      type: "Over/Under",
      selection: "Over 220.5",
      odds: "-105",
      stake: 75,
      potentialPayout: 146.43,
      status: "pending",
      date: "2023-06-16",
    },
    {
      id: 4,
      type: "Parlay",
      selection: "Multiple",
      odds: "+450",
      stake: 25,
      potentialPayout: 137.5,
      status: "won",
      date: "2023-06-13",
    },
    {
      id: 5,
      type: "Moneyline",
      selection: "Celtics",
      odds: "-200",
      stake: 200,
      potentialPayout: 300,
      status: "lost",
      date: "2023-06-12",
    },
  ];

  const stats = {
    winRate: 40,
    averageStake: 90,
    profitLoss: -50.25,
    totalBets: 5,
    pendingBets: 1,
  };

  const filteredBets = bettingHistory.filter((bet) => {
    if (activeTab === "all") return true;
    return bet.status === activeTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "won":
        return (
          <Badge className="bg-green-600">
            <CheckIcon className="h-3 w-3 mr-1" /> Won
          </Badge>
        );
      case "lost":
        return (
          <Badge className="bg-red-600">
            <XIcon className="h-3 w-3 mr-1" /> Lost
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-600">
            <ClockIcon className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-gray-900 text-white max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            User Dashboard{" "}
            {user && (
              <span className="text-sm text-green-500 ml-2">
                ({user.email})
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm">
                Virtual Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${userBalance.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm">Win Rate</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <BarChart3Icon className="h-5 w-5 mr-2 text-blue-400" />
              <p className="text-3xl font-bold">{stats.winRate}%</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm">
                Profit/Loss
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              {stats.profitLoss >= 0 ? (
                <ArrowUpIcon className="h-5 w-5 mr-2 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-5 w-5 mr-2 text-red-500" />
              )}
              <p
                className={`text-3xl font-bold ${stats.profitLoss >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                ${Math.abs(stats.profitLoss).toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Betting History</h3>
            <TabsList className="bg-gray-800">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-blue-600"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-blue-600"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="won"
                className="data-[state=active]:bg-blue-600"
              >
                Won
              </TabsTrigger>
              <TabsTrigger
                value="lost"
                className="data-[state=active]:bg-blue-600"
              >
                Lost
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 hover:bg-gray-800">
                      <TableHead className="text-gray-400">Date</TableHead>
                      <TableHead className="text-gray-400">Type</TableHead>
                      <TableHead className="text-gray-400">Selection</TableHead>
                      <TableHead className="text-gray-400">Odds</TableHead>
                      <TableHead className="text-gray-400">Stake</TableHead>
                      <TableHead className="text-gray-400">
                        Potential Payout
                      </TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBets.length > 0 ? (
                      filteredBets.map((bet) => (
                        <TableRow
                          key={bet.id}
                          className="border-gray-700 hover:bg-gray-700"
                        >
                          <TableCell>{bet.date}</TableCell>
                          <TableCell>{bet.type}</TableCell>
                          <TableCell>{bet.selection}</TableCell>
                          <TableCell>{bet.odds}</TableCell>
                          <TableCell>${bet.stake.toFixed(2)}</TableCell>
                          <TableCell>
                            ${bet.potentialPayout.toFixed(2)}
                          </TableCell>
                          <TableCell>{getStatusBadge(bet.status)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-8 text-gray-400"
                        >
                          No bets found for this filter
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Performance Statistics</h3>
            {user && (
              <Button
                onClick={() => logout()}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                Logout
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm">
                  Total Bets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats.totalBets}</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm">
                  Pending Bets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats.pendingBets}</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm">
                  Average Stake
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  ${stats.averageStake.toFixed(2)}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm">
                  Win/Loss Ratio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {stats.winRate / (100 - stats.winRate) > 1
                    ? (stats.winRate / (100 - stats.winRate)).toFixed(2)
                    : "1 : " +
                      ((100 - stats.winRate) / stats.winRate).toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDashboard;
