import { useEffect, useRef } from "react";
import { SDKInstance } from "../../../../types/matterport";
import { useDispatch } from "react-redux";
import { setSdk } from "../../../../features/sdk/sdkSlice";
import { useMattertag } from "../hooks/UseMattertag";

interface MatterportViewerProps {
  modelSid: string;
  sdkKey: string;
}

export const MatterportIframe = ({
  modelSid,
  sdkKey,
}: MatterportViewerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const dispatch = useDispatch();
  useMattertag();

  useEffect(() => {
    if (!iframeRef) return;
    if (!iframeRef.current) return;

    const showcase = iframeRef.current;
    const showcaseWindow = showcase.contentWindow;
    if (!showcaseWindow) return;
    showcase.addEventListener("load", async function () {
      let mpSdk: SDKInstance;
      try {
        mpSdk = await showcaseWindow.MP_SDK.connect(showcase);
        dispatch(setSdk(mpSdk));
      } catch (e) {
        console.error(e);
        return;
      }
    });
  }, [dispatch]);

  return (
    <iframe
      ref={iframeRef}
      id="showcase"
      width="740"
      height="480"
      src={`/bundle/showcase.html?m=${modelSid}&applicationKey=${sdkKey}`}
      allow="vr"
    ></iframe>
  );
};
