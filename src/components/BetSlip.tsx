import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Trash2, X } from "lucide-react";

interface BetOption {
  id: string;
  type: "moneyline" | "spread" | "overUnder";
  team?: string;
  opponent?: string;
  selection: string;
  odds: number;
  spread?: number;
  total?: number;
  stake?: number;
}

interface BetSlipProps {
  bets?: BetOption[];
  onRemoveBet?: (id: string) => void;
  onPlaceBet?: (bets: BetOption[], type: "single" | "parlay") => void;
  balance?: number;
}

const BetSlip: React.FC<BetSlipProps> = ({
  bets = [],
  onRemoveBet = () => {},
  onPlaceBet = () => {},
  balance = 1000,
}) => {
  const [betType, setBetType] = useState<"single" | "parlay">("single");
  const [stakes, setStakes] = useState<Record<string, number>>({});
  const [parlayStake, setParlayStake] = useState<number>(10);

  const handleStakeChange = (id: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setStakes((prev) => ({ ...prev, [id]: numValue }));
  };

  const handleParlayStakeChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setParlayStake(numValue);
  };

  const calculatePotentialWin = (bet: BetOption) => {
    const stake = stakes[bet.id] || 0;
    return stake * bet.odds;
  };

  const calculateParlayOdds = () => {
    if (bets.length === 0) return 0;
    return bets.reduce((acc, bet) => acc * bet.odds, 1);
  };

  const calculateParlayWin = () => {
    return parlayStake * calculateParlayOdds();
  };

  const totalStaked =
    betType === "single"
      ? Object.values(stakes).reduce((sum, stake) => sum + stake, 0)
      : parlayStake;

  const totalPotentialWin =
    betType === "single"
      ? bets.reduce((sum, bet) => sum + calculatePotentialWin(bet), 0)
      : calculateParlayWin();

  const handlePlaceBet = () => {
    const betsWithStakes = bets.map((bet) => ({
      ...bet,
      stake:
        betType === "single" ? stakes[bet.id] || 0 : parlayStake / bets.length,
    }));
    onPlaceBet(betsWithStakes, betType);
  };

  const formatOdds = (odds: number) => odds.toFixed(2);
  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  const renderBetDescription = (bet: BetOption) => {
    switch (bet.type) {
      case "moneyline":
        return `${bet.selection} to win`;
      case "spread":
        return `${bet.selection} ${bet.spread && bet.spread > 0 ? "+" : ""}${bet.spread}`;
      case "overUnder":
        return `${bet.selection} ${bet.total}`;
      default:
        return bet.selection;
    }
  };

  return (
    <Card className="h-full bg-gray-900 border-gray-800 text-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          Bet Slip
          <Badge variant="secondary" className="text-xs">
            {bets.length} {bets.length === 1 ? "Selection" : "Selections"}
          </Badge>
        </CardTitle>
        {bets.length > 1 && (
          <Tabs
            value={betType}
            onValueChange={(value) => setBetType(value as "single" | "parlay")}
          >
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="single">Single Bets</TabsTrigger>
              <TabsTrigger value="parlay">Parlay</TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </CardHeader>

      <CardContent>
        {bets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <div className="rounded-full bg-gray-800 p-3 mb-4">
              <Trash2 size={24} />
            </div>
            <p className="text-center">Your bet slip is empty</p>
            <p className="text-center text-sm mt-2">Select odds to add bets</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {betType === "single" ? (
                bets.map((bet) => (
                  <div
                    key={bet.id}
                    className="bg-gray-800 rounded-lg p-3 relative"
                  >
                    <button
                      onClick={() => onRemoveBet(bet.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    >
                      <X size={16} />
                    </button>

                    <div className="mb-2">
                      <div className="font-medium">
                        {bet.team} vs {bet.opponent}
                      </div>
                      <div className="text-sm text-gray-400">
                        {renderBetDescription(bet)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <div className="text-xs text-gray-400">Odds</div>
                        <div className="font-medium text-green-500">
                          {formatOdds(bet.odds)}
                        </div>
                      </div>

                      <div className="w-24">
                        <div className="text-xs text-gray-400 mb-1">Stake</div>
                        <Input
                          type="number"
                          min="0"
                          step="1"
                          value={stakes[bet.id] || ""}
                          onChange={(e) =>
                            handleStakeChange(bet.id, e.target.value)
                          }
                          className="bg-gray-700 border-gray-600 text-white h-8"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-3 text-sm">
                      <span className="text-gray-400">Potential Win:</span>
                      <span className="font-medium text-green-500">
                        {formatCurrency(calculatePotentialWin(bet))}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">
                      Parlay ({bets.length} selections)
                    </h3>
                    {bets.map((bet) => (
                      <div
                        key={bet.id}
                        className="flex justify-between py-2 border-b border-gray-700 text-sm"
                      >
                        <div>
                          <div>
                            {bet.team} vs {bet.opponent}
                          </div>
                          <div className="text-xs text-gray-400">
                            {renderBetDescription(bet)}
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveBet(bet.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between mb-2">
                      <div className="text-sm text-gray-400">Total Odds:</div>
                      <div className="font-medium text-green-500">
                        {formatOdds(calculateParlayOdds())}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-400 mb-1">Stake</div>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        value={parlayStake || ""}
                        onChange={(e) =>
                          handleParlayStakeChange(e.target.value)
                        }
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div className="flex justify-between mt-3">
                      <span className="text-gray-400">Potential Win:</span>
                      <span className="font-medium text-green-500">
                        {formatCurrency(calculateParlayWin())}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>

      {bets.length > 0 && (
        <CardFooter className="flex flex-col border-t border-gray-800 pt-4">
          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Stake:</span>
              <span>{formatCurrency(totalStaked)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Potential Win:</span>
              <span className="font-bold text-green-500">
                {formatCurrency(totalPotentialWin)}
              </span>
            </div>

            <Separator className="my-2 bg-gray-800" />

            <div className="flex justify-between text-xs mb-3">
              <span className="text-gray-400">Balance:</span>
              <span>{formatCurrency(balance)}</span>
            </div>

            <Button
              onClick={handlePlaceBet}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={totalStaked <= 0 || totalStaked > balance}
            >
              Place Bet
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default BetSlip;
