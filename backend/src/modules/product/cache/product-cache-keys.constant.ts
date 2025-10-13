export const PRODUCT_CACHE_KEYS = {
  // Use prefix 'cache:' for temporary data
  // Use ':' to create hierarchy clearly

  ALL: "cache:product:all",
  HOME: "cache:product:home:{limit}",

  BY_ID: "cache:product:id:{id}",

  BY_NAME: "cache:product:name:{name}",

  SEARCH: "cache:product:search:{query}",

  // Pattern to invalidate all product cache
  PATTERN: "cache:product:*"
} as const;

export const PRODUCT_CACHE_TTL = {
  ALL: 300,
  HOME: 300,
  BY_ID: 600,
  BY_NAME: 300,
  SEARCH: 180
} as const;
