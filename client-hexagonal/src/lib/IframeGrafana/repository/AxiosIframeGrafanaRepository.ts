import axios from "axios";
import { Repository } from "../../Shared/domain/Repository";
import { IframeGrafana } from "../domain/IframeGrafana";

export const createAxiosIframeGrafanaRepository =
  (): Repository<IframeGrafana> => ({
    find: async (): Promise<IframeGrafana[]> => {
      const response = await axios.get<IframeGrafana[]>(
        "http://localhost:8000/iframe-grafana"
      );
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
