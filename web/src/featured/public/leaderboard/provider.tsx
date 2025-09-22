import { TopBuyer } from "@/@types/user";
import React, { createContext, useContext, useState } from "react";

export type TimeFilter = "all-time" | "this-week" | "this-month"

interface LedaerboardContextState{
    data: TopBuyer[];
    timeFilter: TimeFilter;
    setTimeFilter: React.Dispatch<React.SetStateAction<TimeFilter>>
}

const LeaderboardContext = createContext<LedaerboardContextState>({} as LedaerboardContextState);

interface LeaderboardProviderProps{
    data:TopBuyer[];
    children:React.ReactNode
}

export function LeaderboardProvider({children, data}:LeaderboardProviderProps){
    const [timeFilter, setTimeFilter] = useState<TimeFilter>("all-time");
    
    const value:LedaerboardContextState = {
        data,
        setTimeFilter,
        timeFilter
    }

    return(
        <LeaderboardContext.Provider value={value}>
            {children}
        </LeaderboardContext.Provider>
    )
}

export const useLeaderboardContext = () => useContext(LeaderboardContext)