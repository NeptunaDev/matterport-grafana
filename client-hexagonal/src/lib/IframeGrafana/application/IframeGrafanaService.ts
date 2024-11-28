import { IframeGrafana, IframeGrafanafind } from "../domain/IframeGrafana";
import { IframeGrafanaRepository } from "../domain/IframeGrafanaRepository";

export const createIframeGrafanaService = (
  repository: IframeGrafanaRepository
) => ({
  find: async (iframeGrafanafind?: IframeGrafanafind) =>
    await repository.find(iframeGrafanafind),
  save: async (iframeGrafana: IframeGrafana) => {
    await repository.save(iframeGrafana);
  },
  remove: async (id: string) => {
    await repository.remove(id);
  },
});
