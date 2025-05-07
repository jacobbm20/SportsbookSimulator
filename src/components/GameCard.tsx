import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface GameCardProps {
  gameId?: string;
  homeTeam?: {
    name: string;
    logo?: string;
    score?: number;
  };
  awayTeam?: {
    name: string;
    logo?: string;
    score?: number;
  };
  startTime?: string;
  isLive?: boolean;
  odds?: {
    moneyline: {
      home: number;
      away: number;
    };
    spread: {
      home: number;
      homeOdds: number;
      away: number;
      awayOdds: number;
    };
    total: {
      over: number;
      overOdds: number;
      under: number;
      underOdds: number;
    };
  };
  onSelectBet?: (bet: {
    gameId: string;
    type: "moneyline" | "spread" | "total";
    selection: string;
    odds: number;
    team?: string;
    line?: number;
  }) => void;
}

const GameCard: React.FC<GameCardProps> = ({
  gameId = "123456",
  homeTeam = { name: "Home Team", logo: "", score: 0 },
  awayTeam = { name: "Away Team", logo: "", score: 0 },
  startTime = "7:00 PM",
  isLive = false,
  odds = {
    moneyline: { home: -110, away: +190 },
    spread: { home: -3.5, homeOdds: -110, away: +3.5, awayOdds: -110 },
    total: { over: 42.5, overOdds: -110, under: 42.5, underOdds: -110 },
  },
  onSelectBet = () => {},
}) => {
  const formatOdds = (odd: number) => {
    return odd > 0 ? `+${odd}` : odd.toString();
  };

  const handleBetSelection = (
    type: "moneyline" | "spread" | "total",
    selection: string,
    odds: number,
    team?: string,
    line?: number,
  ) => {
    onSelectBet({
      gameId,
      type,
      selection,
      odds,
      team,
      line,
    });
  };

  return (
    <Card className="w-full mb-4 bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <div className="flex flex-col">
          {/* Game Info Header */}
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-400">{startTime}</div>
            {isLive && (
              <Badge variant="destructive" className="bg-red-600">
                LIVE
              </Badge>
            )}
          </div>

          {/* Teams Section */}
          <div className="flex justify-between mb-4">
            <div className="flex items-center space-x-2">
              {awayTeam.logo ? (
                <img
                  src={awayTeam.logo}
                  alt={awayTeam.name}
                  className="w-6 h-6"
                />
              ) : (
                <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
              )}
              <span className="font-medium text-white">{awayTeam.name}</span>
              {isLive && (
                <span className="text-white ml-2">{awayTeam.score}</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {homeTeam.logo ? (
                <img
                  src={homeTeam.logo}
                  alt={homeTeam.name}
                  className="w-6 h-6"
                />
              ) : (
                <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
              )}
              <span className="font-medium text-white">{homeTeam.name}</span>
              {isLive && (
                <span className="text-white ml-2">{homeTeam.score}</span>
              )}
            </div>
          </div>

          {/* Betting Options */}
          <div className="grid grid-cols-3 gap-2">
            {/* Moneyline */}
            <div className="bg-gray-800 rounded-md p-2">
              <div className="text-xs text-gray-400 mb-2 text-center">
                Moneyline
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                  onClick={() =>
                    handleBetSelection(
                      "moneyline",
                      "away",
                      odds.moneyline.away,
                      awayTeam.name,
                    )
                  }
                >
                  {formatOdds(odds.moneyline.away)}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                  onClick={() =>
                    handleBetSelection(
                      "moneyline",
                      "home",
                      odds.moneyline.home,
                      homeTeam.name,
                    )
                  }
                >
                  {formatOdds(odds.moneyline.home)}
                </Button>
              </div>
            </div>

            {/* Spread */}
            <div className="bg-gray-800 rounded-md p-2">
              <div className="text-xs text-gray-400 mb-2 text-center">
                Spread
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 flex flex-col"
                  onClick={() =>
                    handleBetSelection(
                      "spread",
                      "away",
                      odds.spread.awayOdds,
                      awayTeam.name,
                      odds.spread.away,
                    )
                  }
                >
                  <span className="text-xs">
                    {formatOdds(odds.spread.away)}
                  </span>
                  <span className="text-xs">
                    {formatOdds(odds.spread.awayOdds)}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 flex flex-col"
                  onClick={() =>
                    handleBetSelection(
                      "spread",
                      "home",
                      odds.spread.homeOdds,
                      homeTeam.name,
                      odds.spread.home,
                    )
                  }
                >
                  <span className="text-xs">
                    {formatOdds(odds.spread.home)}
                  </span>
                  <span className="text-xs">
                    {formatOdds(odds.spread.homeOdds)}
                  </span>
                </Button>
              </div>
            </div>

            {/* Total */}
            <div className="bg-gray-800 rounded-md p-2">
              <div className="text-xs text-gray-400 mb-2 text-center">
                Total
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 flex flex-col"
                  onClick={() =>
                    handleBetSelection(
                      "total",
                      "over",
                      odds.total.overOdds,
                      undefined,
                      odds.total.over,
                    )
                  }
                >
                  <span className="text-xs">O {odds.total.over}</span>
                  <span className="text-xs">
                    {formatOdds(odds.total.overOdds)}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 flex flex-col"
                  onClick={() =>
                    handleBetSelection(
                      "total",
                      "under",
                      odds.total.underOdds,
                      undefined,
                      odds.total.under,
                    )
                  }
                >
                  <span className="text-xs">U {odds.total.under}</span>
                  <span className="text-xs">
                    {formatOdds(odds.total.underOdds)}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;
