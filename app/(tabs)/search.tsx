import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'

const search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  // Optional: For live search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        refetch();
      }else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <View className='flex-1 bg-primary'>
      <Image 
        source={images.bg}
        className='flex-1 absolute h-full z-0'
        resizeMode='cover'
      />
      <FlatList
        data={movies}
        renderItem={({item}) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        className='px-5'
        columnWrapperStyle={{
          justifyContent: 'space-between',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={
          !moviesLoading && !moviesError? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20'>
              <Image source={icons.logo} className='w-12 h-10'/>
            </View>
            <View className='my-5'>
              <SearchBar 
                placeholder='Search movies ...'
                value={searchQuery}
                onChangeText={setSearchQuery}
                onPress={() => {
                  if (searchQuery.trim()) {
                    refetch();
                  }
                }}
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator size="large" color="#0000ff" className="my-3"/>
            )}
            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {moviesError?.message}
              </Text>
            )}
            {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
              <Text className='text-xl text-white font-bold'>
                Search results for {' '}
                <Text className='text-accent'>{searchQuery}</Text>
              </Text>
            )}
          </>
        }
      />
    </View>
  )
}

export default search