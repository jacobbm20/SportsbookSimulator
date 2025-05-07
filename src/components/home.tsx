import React, { useState } from "react";
import LiveOddsBoard from "./LiveOddsBoard";
import BetSlip from "./BetSlip";
import UserDashboard from "./UserDashboard";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Wallet, User } from "lucide-react";

interface Bet {
  id: string;
  type: "moneyline" | "spread" | "overUnder";
  selection: string;
  odds: number;
  game: {
    id: string;
    homeTeam: string;
    awayTeam: string;
    startTime: string;
  };
  stake?: number;
}

export default function Home() {
  const [selectedBets, setSelectedBets] = useState<Bet[]>([]);
  const [virtualBalance, setVirtualBalance] = useState<number>(1000); // Starting with $1000 virtual currency
  const [dashboardOpen, setDashboardOpen] = useState<boolean>(false);

  const addToBetSlip = (bet: Bet) => {
    // Check if bet already exists in slip
    const existingBetIndex = selectedBets.findIndex(
      (selectedBet) => selectedBet.id === bet.id,
    );

    if (existingBetIndex >= 0) {
      // Remove bet if already selected
      const updatedBets = [...selectedBets];
      updatedBets.splice(existingBetIndex, 1);
      setSelectedBets(updatedBets);
    } else {
      // Add new bet to slip
      setSelectedBets([...selectedBets, bet]);
    }
  };

  const placeBet = (bets: Bet[], totalStake: number) => {
    // Deduct stake from virtual balance
    setVirtualBalance((prevBalance) => prevBalance - totalStake);

    // In a real app, we would track the bet for settlement later
    // For now, we'll just clear the bet slip
    setSelectedBets([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-green-500">BetSim</div>
            <span className="rounded-md bg-gray-800 px-2 py-1 text-xs">
              SIMULATOR
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 rounded-md bg-gray-800 px-3 py-2">
              <Wallet className="h-4 w-4 text-green-500" />
              <span className="font-medium">${virtualBalance.toFixed(2)}</span>
            </div>

            <Dialog open={dashboardOpen} onOpenChange={setDashboardOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              </DialogTrigger>
              <UserDashboard virtualBalance={virtualBalance} />
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex flex-col gap-4 p-4 lg:flex-row">
        {/* Live Odds Board */}
        <div className="flex-1">
          <LiveOddsBoard
            onSelectBet={addToBetSlip}
            selectedBets={selectedBets}
          />
        </div>

        {/* Bet Slip */}
        <div className="w-full lg:w-80 xl:w-96">
          <BetSlip
            bets={selectedBets}
            onRemoveBet={(betId) => {
              setSelectedBets(selectedBets.filter((bet) => bet.id !== betId));
            }}
            onUpdateStake={(betId, stake) => {
              setSelectedBets(
                selectedBets.map((bet) =>
                  bet.id === betId ? { ...bet, stake } : bet,
                ),
              );
            }}
            onPlaceBet={placeBet}
            virtualBalance={virtualBalance}
          />
        </div>
      </main>
    </div>
  );
}
