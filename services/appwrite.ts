import Constants from "expo-constants";
import { Platform } from "react-native";
import { Client, Databases, ID, Query } from "react-native-appwrite";
import "react-native-url-polyfill/auto";

// Platform ID must match what's registered in Appwrite Console → Project → Platforms
const getPlatformId = () => {
  const config = Constants.expoConfig;
  return Platform.OS === "android"
    ? config?.android?.package ?? "host.exp.Exponent"
    : Platform.OS === "ios"
      ? config?.ios?.bundleIdentifier ?? "host.exp.Exponent"
      : "host.exp.Exponent";
};

const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const endpoint = "https://fra.cloud.appwrite.io/v1";

const appwriteClient = new Client()
  .setProject(projectId)
  .setEndpoint(endpoint)
  .setPlatform(getPlatformId());

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const database = new Databases(appwriteClient);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        },
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        count: 1,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    return false;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
