export interface Base {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export function idIsValid(id: string): boolean {
  // const isValidMongoId = /^[0-9a-fA-F]{24}$/.test(id);
  // if (!isValidMongoId) {
  //   return false;
  // }
  // return true;
  if (id === "") {
    return false;
  }
  return true;
}

export function ensureBaseIdIsValid(id: string): void {
  if (!idIsValid(id)) {
    throw new Error(`Invalid id: ${id}`);
  }
}

export function dateIsValid(date: Date): boolean {
  if (isNaN(date.getTime())) {
    return false;
  }

  const currentData = new Date();
  if (date > currentData) {
    return false;
  }
  return true;
}

export function ensureBaseDateIsValid(date: Date): void {
  if (!dateIsValid(date)) {
    throw new Error(`Invalid Date: ${date.toString()}`);
  }
}