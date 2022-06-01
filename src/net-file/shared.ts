const netFileHost = `https://public.netfile.com`;

export const getNetFileURL = (aid: string): string => {
  return `${netFileHost}/pub2/?aid=${aid}`
}
