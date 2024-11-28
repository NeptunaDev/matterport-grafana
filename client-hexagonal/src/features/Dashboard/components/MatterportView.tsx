import { Skeleton, Stack } from "@mui/material";
import { usePlantStore } from "../../../hooks/usePlantStore";
import { useEffect, useRef } from "react";
import { ShowcaseEmbedWindow } from "../../../lib/Sdk/domain/Sdk";
import { useSdkStore } from "../../../hooks/useSdkStore";
const SDK_KEY = "hnd36ckp618rdffr20yn02hed";

export function MatterportView() {
  const plant = usePlantStore((state) => state.plantSelected);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const setSdk = useSdkStore((state) => state.setSdk);

  useEffect(() => {
    if (!iframeRef) return;
    if (!iframeRef.current) return;

    const showcase = iframeRef.current;
    const showcaseWindow = showcase.contentWindow as ShowcaseEmbedWindow;
    if (!showcaseWindow) return;
    showcase.addEventListener("load", async function () {
      try {
        const mpSdk = await showcaseWindow.MP_SDK.connect(showcase);
        setSdk(mpSdk);
      } catch (e) {
        console.error(e);
        return;
      }
    });
  }, [plant, plant?.matterportSid, setSdk]);

  return (
    <Stack>
      {plant?.matterportSid ? (
        <iframe
          ref={iframeRef}
          width="740"
          height="480"
          src={`/bundle/showcase.html?m=${plant.matterportSid}&applicationKey=${SDK_KEY}`}
          allow="vr"
        ></iframe>
      ) : (
        <Skeleton variant="rectangular" width="740px" height="480px" />
      )}
    </Stack>
  );
}
