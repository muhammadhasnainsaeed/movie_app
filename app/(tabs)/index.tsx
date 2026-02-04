import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

const TRENDING_ITEM_SEPARATOR = () => <View className="w-4" />;

const renderTrendingItem = ({ item, index }: { item: TrendingMovie; index: number }) => (
  <TrendingCard movie={item} index={index} />
);

const trendingKeyExtractor = (item: TrendingMovie, index: number) =>
  `trending-${item.movie_id}-${index}`;

const moviesKeyExtractor = (item: Movie) => item.id.toString();

const renderMovieItem = ({ item }: { item: Movie }) => <MovieCard {...item} />;

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: isMoviesLoading,
    error: isMovieError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const handleSearchPress = useCallback(() => {
    router.push("/search");
  }, [router]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 20 }}
      >
        <Image source={icons.logo} className="w-16 h-12 mt-20 mb-5 mx-auto" />
        {isMoviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : isMovieError || trendingError ? (
          <Text className="text-white text-center mt-10">
            Error: {isMovieError?.message || trendingError?.message}
          </Text>
        ) : (
          <View className="mt-5">
            <SearchBar
              onPress={handleSearchPress}
              placeholder="Search through 300+ movies online"
            />

            {trendingMovies && trendingMovies.length > 0 && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  contentContainerStyle={{ gap: 26 }}
                  renderItem={renderTrendingItem}
                  keyExtractor={trendingKeyExtractor}
                  ItemSeparatorComponent={TRENDING_ITEM_SEPARATOR}
                  initialNumToRender={3}
                  maxToRenderPerBatch={5}
                />
              </View>
            )}

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={movies ?? []}
                renderItem={renderMovieItem}
                keyExtractor={moviesKeyExtractor}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
                initialNumToRender={9}
                maxToRenderPerBatch={9}
                windowSize={5}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
