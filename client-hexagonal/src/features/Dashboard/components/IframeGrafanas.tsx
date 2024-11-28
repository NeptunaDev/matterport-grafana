import { useQuery } from "@tanstack/react-query";
import { createAxiosIframeGrafanaRepository } from "../../../lib/IframeGrafana/repository/AxiosIframeGrafanaRepository";
import { createIframeGrafanaService } from "../../../lib/IframeGrafana/application/IframeGrafanaService";
import { Stack } from "@mui/material";

const repository = createAxiosIframeGrafanaRepository();
const service = createIframeGrafanaService(repository);
export  function IframeGrafanas() {
  const { data: iframes } = useQuery({
    queryKey: ["iframe-grafanas"],
    queryFn: service.find,
  });

  return (
    <Stack>
      {iframes &&
        iframes.map((iframe) => (
          <Stack
            maxWidth={"450px"}
            minHeight={"250px"}
            width={"100%"}
            height={"100%"}
            mx={"auto"}
            key={iframe.id}
          >
            <iframe src={iframe.url} width="100%" height="100%"></iframe>
          </Stack>
        ))}
    </Stack>
  );
}
