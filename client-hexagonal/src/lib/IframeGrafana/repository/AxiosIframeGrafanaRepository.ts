import axios from "axios";
import { IframeGrafana } from "../domain/IframeGrafana";
import { IframeGrafanaRepository } from "../domain/IframeGrafanaRepository";
import { createQueryService } from "../../Shared/application/queryService";

const queryService = createQueryService();
export const createAxiosIframeGrafanaRepository =
  (): IframeGrafanaRepository => ({
    find: async (iframeGrafanafind): Promise<IframeGrafana[]> => {
      const queries = queryService.createQueries(iframeGrafanafind ?? {});
      let url = "http://localhost:8000/iframe-grafana";
      if (queries) url = `${url}${queries}`;
      const response = await axios.get<IframeGrafana[]>(url);
      return response.data;
    },
    save: async (iframeGrafana): Promise<void> => {
      if (iframeGrafana.id) {
        await axios.patch(
          `http://localhost:8000/iframe-grafana/${iframeGrafana.id}`,
          iframeGrafana
        );
      } else {
        await axios.post("http://localhost:8000/iframe-grafana", iframeGrafana);
      }
    },
    remove: async (id): Promise<void> => {
      await axios.delete(`http://localhost:8000/iframe-grafana/${id}`);
    },
  });
