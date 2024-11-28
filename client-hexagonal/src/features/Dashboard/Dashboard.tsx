import { Stack } from "@mui/material";
import { MatterportView } from "./components/MatterportView";
import { IframeGrafanas } from "./components/IframeGrafanas";

export function Dashboard() {
  return (
    <Stack>
      <MatterportView />
      <IframeGrafanas />
    </Stack>
  );
}
