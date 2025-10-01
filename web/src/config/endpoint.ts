const isDevelopment = process.env.NODE_ENV === "development";

export const serverEndpoint = isDevelopment
  ? `${process.env.NEXT_PUBLIC_API_DEV}`
  : `${process.env.NEXT_PUBLIC_API_PROD}`;
