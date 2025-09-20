import { PANEL_BG } from "@/config/variables";
import { TableTitle } from "./Title";
import { Tabs } from "@/components/ui/tabs";
import { LeaderboardTableTriggerComp } from "./TabsTrigger";
import { TimeFilter, useLeaderboardContext } from "../../provider";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import { mapTopBuyersWithRanks } from "../../utils/mapTopBuyerWithRank";

export function LeaderboardTable() {
  const { setTimeFilter, timeFilter, data } = useLeaderboardContext();
  const topBuyerWithRanks = mapTopBuyersWithRanks(data);
  return (
    <div
      style={{ background: PANEL_BG }}
      className="border border-orange-500 rounded-2xl p-4 space-y-4"
    >
      <TableTitle />
      <Tabs
        value={timeFilter}
        onValueChange={(e) => setTimeFilter(e as TimeFilter)}
      >
        <LeaderboardTableTriggerComp />
      </Tabs>
      <DataTable columns={columns} data={topBuyerWithRanks} />
    </div>
  );
}
