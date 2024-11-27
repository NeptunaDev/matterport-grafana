import React from "react";
import { Box } from "@mui/material";
import { Props } from "../../interfaces";
import { MatterportIframe } from "./components/MatterportIframe";

const MatterportViewer: React.FC<Props> = ({ modelId, applicationKey }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <MatterportIframe modelSid={modelId} sdkKey={applicationKey} />
    </Box>
  );
};

export default MatterportViewer;
