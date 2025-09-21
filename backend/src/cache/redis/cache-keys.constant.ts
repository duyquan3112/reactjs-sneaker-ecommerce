export const CACHE_KEYS = {
  // Use prefix 'cache:' for temporary data
  // Use ':' to create hierarchy clearly
  PRODUCT: {
    ALL: "cache:product:all",
    HOME: "cache:product:home:{limit}",

    BY_ID: "cache:product:id:{id}",

    BY_NAME: "cache:product:name:{name}",

    SEARCH: "cache:product:search:{query}",

    // Pattern to invalidate all product cache
    PATTERN: "cache:product:*",
  },
} as const;

export const CACHE_TTL = {
  PRODUCT: {
    ALL: 300,
    HOME: 300,
    BY_ID: 600,
    BY_NAME: 300,
    SEARCH: 180,
  },
} as const;

// Helper function to generate key with parameters
export const generateCacheKey = (
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
