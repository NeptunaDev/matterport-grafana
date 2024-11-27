import React from "react";
import { Box } from "@mui/material";
import { Props } from "../../interfaces";

import { MatterportIframe } from "./components/MatterportIframe";

// const IFRAME_ID = 'matterport-showcase';

const MatterportViewer: React.FC<Props> = ({ modelId, applicationKey }) => {
  // const { sdk, error, isLoading } = useMatterportSdk(IFRAME_ID);
  // useMattertag(sdk);

  // if (error) {
  //   return (
  //     <Alert severity="error" sx={{ m: 2 }}>
  //       Error connecting to Matterport: {error.message}
  //     </Alert>
  //   );
  // }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 480,
        position: "relative",
      }}
    >
      <MatterportIframe modelSid={modelId} sdkKey={applicationKey} />
    </Box>
  );
};

export default MatterportViewer;
