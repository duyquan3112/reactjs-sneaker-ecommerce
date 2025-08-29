export const CACHE_KEYS = {
  // Use prefix 'cache:' for temporary data
  // Use ':' to create hierarchy clearly
  PRODUCT: {
    // Cache tất cả products
    ALL: "cache:product:all",

    // Cache product by ID - use identifier
    BY_ID: "cache:product:id:{id}",

    // Cache products by name - use identifier
    BY_NAME: "cache:product:name:{name}",

    // Cache search results - use identifier
    SEARCH: "cache:product:search:{query}",

    // Pattern to invalidate all product cache
    PATTERN: "cache:product:*",
  },

  // Can be expanded for other modules
  USER: {
    BY_ID: "cache:user:id:{id}",
    SETTINGS: "cache:user:id:{id}:settings",
    CART: "cache:user:id:{id}:cart",
    PATTERN: "cache:user:*",
  },

  ORDER: {
    BY_ID: "cache:order:id:{id}",
    BY_USER: "cache:order:user:{userId}",
    BY_DATE: "cache:order:date:{date}",
    PATTERN: "cache:order:*",
  },

  // Cache for common features
  COMMON: {
    HOMEPAGE: "cache:common:homepage",
    FEATURED: "cache:common:featured",
    CATEGORIES: "cache:common:categories",
    PATTERN: "cache:common:*",
  },
} as const;

export const CACHE_TTL = {
  PRODUCT: {
    ALL: 300, // 5 minutes - data rarely changes
    BY_ID: 600, // 10 minutes - data rarely changes
    BY_NAME: 300, // 5 minutes - search results
    SEARCH: 180, // 3 minutes - search results
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
