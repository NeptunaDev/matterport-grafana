import { Repository } from "../../Shared/domain/Repository";
import { IframeGrafana } from "../domain/IframeGrafana";

export const createIframeGrafanaService = (
  repository: Repository<IframeGrafana>
) => ({
  find: async () => await repository.find(),
  save: async (iframeGrafana: IframeGrafana) => {
    await repository.save(iframeGrafana);
  },
  remove: async (id: string) => {
    await repository.remove(id);
  },
});
