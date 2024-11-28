export function serializeFormData(matter: FormData|HTMLFormElement|null|undefined) {
  if (!matter) {
    return {};
  }

  const data = (matter instanceof FormData) ? matter : new FormData(matter);
  const result: Record<string, string> = {};

  for(const [key, value] of data) {
    Object.assign(result, { [key]: value });
  }

  return result;
}