import { Coordinates } from "../domain/BaeCoordinates";

export const createQueryService = () => ({
  createQueries: (queries: {
    [key: string]: string | number | Date | Coordinates | boolean;
  }) => {
    const query = Object.entries(queries).reduce(
      (acc, [key, value]) => `${acc}${key}=${value}&`,
      "?"
    );
    return query.slice(0, query.length - 1);
  },
});
