import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import GameCard from "./GameCard";

interface Game {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
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
    value: number;
    overOdds: number;
    underOdds: number;
  };
}

const LiveOddsBoard = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Mock data for different sports categories
  const mockGames: Record<string, Game[]> = {
    all: [
      {
        id: "1",
        league: "NBA",
        homeTeam: "Los Angeles Lakers",
        awayTeam: "Boston Celtics",
        startTime: "7:30 PM ET",
        moneyline: { home: -150, away: +130 },
        spread: { home: -3.5, homeOdds: -110, away: +3.5, awayOdds: -110 },
        total: { value: 219.5, overOdds: -110, underOdds: -110 },
      },
      {
        id: "2",
        league: "NFL",
        homeTeam: "Kansas City Chiefs",
        awayTeam: "Buffalo Bills",
        startTime: "4:25 PM ET",
        moneyline: { home: -120, away: +100 },
        spread: { home: -1.5, homeOdds: -110, away: +1.5, awayOdds: -110 },
        total: { value: 53.5, overOdds: -110, underOdds: -110 },
      },
      {
        id: "3",
        league: "MLB",
        homeTeam: "New York Yankees",
        awayTeam: "Boston Red Sox",
        startTime: "1:05 PM ET",
        moneyline: { home: -180, away: +160 },
        spread: { home: -1.5, homeOdds: +120, away: +1.5, awayOdds: -140 },
        total: { value: 8.5, overOdds: -115, underOdds: -105 },
      },
    ],
    nba: [
      {
        id: "1",
        league: "NBA",
        homeTeam: "Los Angeles Lakers",
        awayTeam: "Boston Celtics",
        startTime: "7:30 PM ET",
        moneyline: { home: -150, away: +130 },
        spread: { home: -3.5, homeOdds: -110, away: +3.5, awayOdds: -110 },
        total: { value: 219.5, overOdds: -110, underOdds: -110 },
      },
      {
        id: "4",
        league: "NBA",
        homeTeam: "Golden State Warriors",
        awayTeam: "Brooklyn Nets",
        startTime: "10:00 PM ET",
        moneyline: { home: -200, away: +170 },
        spread: { home: -5.5, homeOdds: -110, away: +5.5, awayOdds: -110 },
        total: { value: 232.5, overOdds: -110, underOdds: -110 },
      },
    ],
    nfl: [
      {
        id: "2",
        league: "NFL",
        homeTeam: "Kansas City Chiefs",
        awayTeam: "Buffalo Bills",
        startTime: "4:25 PM ET",
        moneyline: { home: -120, away: +100 },
        spread: { home: -1.5, homeOdds: -110, away: +1.5, awayOdds: -110 },
        total: { value: 53.5, overOdds: -110, underOdds: -110 },
      },
      {
        id: "5",
        league: "NFL",
        homeTeam: "Dallas Cowboys",
        awayTeam: "Philadelphia Eagles",
        startTime: "8:20 PM ET",
        moneyline: { home: -110, away: -110 },
        spread: { home: -0.5, homeOdds: -110, away: +0.5, awayOdds: -110 },
        total: { value: 49.5, overOdds: -110, underOdds: -110 },
      },
    ],
    mlb: [
      {
        id: "3",
        league: "MLB",
        homeTeam: "New York Yankees",
        awayTeam: "Boston Red Sox",
        startTime: "1:05 PM ET",
        moneyline: { home: -180, away: +160 },
        spread: { home: -1.5, homeOdds: +120, away: +1.5, awayOdds: -140 },
        total: { value: 8.5, overOdds: -115, underOdds: -105 },
      },
      {
        id: "6",
        league: "MLB",
        homeTeam: "Los Angeles Dodgers",
        awayTeam: "San Francisco Giants",
        startTime: "10:10 PM ET",
        moneyline: { home: -200, away: +170 },
        spread: { home: -1.5, homeOdds: -105, away: +1.5, awayOdds: -115 },
        total: { value: 7.5, overOdds: -120, underOdds: +100 },
      },
    ],
    nhl: [
      {
        id: "7",
        league: "NHL",
        homeTeam: "Toronto Maple Leafs",
        awayTeam: "Montreal Canadiens",
        startTime: "7:00 PM ET",
        moneyline: { home: -160, away: +140 },
        spread: { home: -1.5, homeOdds: +150, away: +1.5, awayOdds: -170 },
        total: { value: 5.5, overOdds: -115, underOdds: -105 },
      },
      {
        id: "8",
        league: "NHL",
        homeTeam: "Vegas Golden Knights",
        awayTeam: "Colorado Avalanche",
        startTime: "10:00 PM ET",
        moneyline: { home: +110, away: -130 },
        spread: { home: +1.5, homeOdds: -200, away: -1.5, awayOdds: +170 },
        total: { value: 6.5, overOdds: -110, underOdds: -110 },
      },
    ],
  };

  const handleAddToBetSlip = (selection: any) => {
    // This would be implemented to add the selection to the bet slip
    console.log("Added to bet slip:", selection);
  };

  return (
    <div className="w-full h-full bg-background rounded-lg p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Live Odds</h2>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4 bg-gray-800">
          <TabsTrigger value="all">All Sports</TabsTrigger>
          <TabsTrigger value="nba">NBA</TabsTrigger>
          <TabsTrigger value="nfl">NFL</TabsTrigger>
          <TabsTrigger value="mlb">MLB</TabsTrigger>
          <TabsTrigger value="nhl">NHL</TabsTrigger>
        </TabsList>

        {Object.keys(mockGames).map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {mockGames[category].length > 0 ? (
              mockGames[category].map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onAddToBetSlip={handleAddToBetSlip}
                />
              ))
            ) : (
              <Card className="p-6 text-center text-gray-400">
                No games available for this category
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default LiveOddsBoard;
