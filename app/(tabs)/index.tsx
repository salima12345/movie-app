import React from 'react';
import SearchBar from '../../components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '../../constants/images';
import { View, Text, Image, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import useFetch from '@/services/useFetch';
import { fetchMovies } from '@/services/api';
import MovieCard from '@/components/MovieCard';
import { getTrendingMovies } from '@/services/appwrite';
import TrendingCard from '@/components/TrendingCard';

export default function Home() {
  const router = useRouter();
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError    
   
  } = useFetch(getTrendingMovies);
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({ query: '' }));


  return (
    <View className='flex-1 bg-primary'>
      {/* Background Image */}
      <Image 
        source={images.bg} 
        className='absolute w-full h-full'
        resizeMode='cover'
      />
      
      {/* Main Scroll Container */}
      <ScrollView 
       className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        {/* Header Content (non-scrollable) */}
        <View className='items-center justify-center mt-24 px-5'>
          <Image source={icons.logo} className='w-[59px] h-[43px] mb-10'/>
        </View>

        {/* Scrollable Content Area */}
        <View className='flex-1 px-5 pb-10'>
          {moviesLoading  || trendingLoading? (
            <ActivityIndicator
              size="large"
              color="#FFFFFF"
              className='mt-10 self-center'
            />
          ) : moviesError || trendingError ? (
            <Text className='text-white text-center'>
              Error: {moviesError?.message} || {trendingError?.message} ? message
            </Text>
          ) : (
            <>
              <SearchBar
                onPress={() => router.push('/search')}
                placeholder="Search for a movie"
              />
             {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}
              
              <Text className='text-lg text-white font-bold mt-5 mb-3'>
                Latest Movies
              </Text>

              {/* Movie List - with independent scrolling */}
              <View style={{ height: movies?.length > 0 ? 'auto' : 0 }}>
                <FlatList
                  data={movies}
                  renderItem={({ item }) => (
                   <MovieCard
                 {...item}
                   />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  scrollEnabled={false} // Disable internal scrolling
                  columnWrapperStyle={{ 
                    justifyContent: 'flex-start',
                    gap:20,
                    paddingRight:5,
                    marginBottom:10
                   }}
                   className='mt-2 pb-32'
                  contentContainerStyle={{ paddingBottom: 20 }}
                  ListEmptyComponent={
                    <Text className='text-white text-center mt-10'>
                      No movies found
                    </Text>
                  }
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}