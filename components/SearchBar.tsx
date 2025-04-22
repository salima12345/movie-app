import { StyleSheet, Text, View,Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
interface Props {
  placeholder:string;
  onPress?:()=>void;
}

const SearchBar = ({onPress,placeholder}:Props) => {
  return (
   <View className=' flex-1 w-full rounded-[30px] flex   flex-row gap-3 bg-dark-200 py-5 px-7'>
     <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="ab8bff" />
      <TextInput
      onPress={onPress}
      placeholder={placeholder}
      value=''
      onChangeText={()=>{}}
      placeholderTextColor="#a8b5db"
      className='flex-1 ml-2 text-white'

      />
   </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})