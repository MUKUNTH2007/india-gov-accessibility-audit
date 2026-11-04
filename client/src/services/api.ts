export interface ApiPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const CACHE_KEY = "audit-api-posts";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CachedPosts {
  data: ApiPost[];
  timestamp: number;
}

function getCachedPosts(): CachedPosts | null {
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);

    if (!cachedData) {
      return null;
    }

    const parsedData: CachedPosts = JSON.parse(cachedData);

    if (
      !Array.isArray(parsedData.data) ||
      typeof parsedData.timestamp !== "number"
    ) {
      return null;
    }

    return parsedData;
  } catch {
    return null;
  }
}

export async function fetchPosts(): Promise<ApiPost[]> {
  const cachedPosts = getCachedPosts();

  // Use cached data if it is less than 5 minutes old.
  if (
    cachedPosts &&
    Date.now() - cachedPosts.timestamp < CACHE_DURATION
  ) {
    return cachedPosts.data;
  }

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Unable to fetch data from the server.");
    }

    const data: ApiPost[] = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid data received from the server.");
    }

    // Save fresh API data in localStorage.
    try {
      const cache: CachedPosts = {
        data,
        timestamp: Date.now(),
      };

      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch {
      console.warn("Unable to save API data in localStorage.");
    }

    return data;
  } catch (error) {
    // Use expired cached data if the API request fails.
    if (cachedPosts) {
      return cachedPosts.data;
    }

    throw error;
  }
}