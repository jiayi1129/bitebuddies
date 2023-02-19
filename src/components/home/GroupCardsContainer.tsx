import { Grid } from "@mui/material";
import { useQuery } from "../../../convex/_generated/react"
import GroupCard from "./GroupCard";
import { Id } from "../../../convex/_generated/dataModel";

export default function GroupCardsContainer({ startTimestamp, endTimestamp, price, userId }: {startTimestamp: bigint, endTimestamp: bigint, price: bigint, userId: Id<"users"> | null}) {
  const groups = useQuery("getAllGroups", startTimestamp, endTimestamp, price) || [];

  return (
    <Grid container spacing={1}>
      {groups.map(g => <Grid item xs={12} sm={6} md={4}><GroupCard group={g} userId={userId}></GroupCard></Grid>)}
    </Grid>
  )
}