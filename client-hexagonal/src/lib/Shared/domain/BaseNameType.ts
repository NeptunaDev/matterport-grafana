export type BaseName = string;

export function baseNameIsValid(name: BaseName): boolean {
  const namePattern = /^[a-zA-Z0-9 ,.!?&(){}[\]“”'"\\/^$#@;_:+-=<>"|`~]{1,50}$/;
  const isValidName = namePattern.test(name);
  if (!isValidName) {
    return false;
  }
  return true;
}

export function ensureBaseNameIsValid(name: BaseName): void {
  if (!baseNameIsValid(name)) {
    throw new Error(`Invalid name: ${name}`);
  }
}