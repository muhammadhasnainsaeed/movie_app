import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const renderMovieItem = ({ item }: { item: Movie }) => <MovieCard {...item} />;
const movieKeyExtractor = (item: Movie) => item.id.toString();

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryRef = useRef(searchQuery);
  searchQueryRef.current = searchQuery;

  const {
    data: movies = [],
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQueryRef.current }), false);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, loadMovies, reset]);

  useEffect(() => {
    const hasResults = (movies?.length ?? 0) > 0;
    if (hasResults && movies?.[0] && searchQuery.trim()) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies, searchQuery]);
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        className="px-5"
        data={movies}
        keyExtractor={movieKeyExtractor}
        renderItem={renderMovieItem}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              (movies?.length ?? 0) > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
