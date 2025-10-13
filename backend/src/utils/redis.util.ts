// Helper function to generate key with parameters
export const generateCacheKeyWithParams = (
  key: string,
  params: Record<string, any>
): string => {
  return key.replace(/\{(\w+)\}/g, (_, param) => {
    const value = params[param];
    if (value === undefined || value === null) {
      throw new Error(`Missing required parameter: ${param}`);
    }
    return value.toString();
  });
};
