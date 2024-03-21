import { View, Text,FlatList,TouchableOpacity,Image } from 'react-native'
import React from 'react'

const PopularItems = () => {
    const popularItems=[
        {
          id:'01',
          image: require("../../assets/images/biryani.jpg"),
          name:'Biryani'
        },{
          id:'02',
          image: require("../../assets/images/friedrice.jpg"),
          name:'Fried Rice'
        },{
          id:'03',
          image: require("../../assets/images/momos.jpg"),
          name:'Momo'
        },{
          id:'04',
          image: require("../../assets/images/chowmien.jpg"),
          name:'Chowmien'
        },{
            id:'05',
            image: require("../../assets/images/saugages.jpg"),
            name:'Saugages'
          },{
            id:'06',
            image: require("../../assets/images/friedchicken.jpg"),
            name:'Fried Chicken'
          },
          {
            id:'07',
            image: require("../../assets/images/fries.jpg"),
            name:'Fries'
          }
      ]
      const renderPopularItems =({item,index})=>{
        return(
          <View className='items-center'>
          <TouchableOpacity >
          <Image className='rounded-3xl ml-3 mr-2' source={item.image} style={{height:110,width:120}}/>
          </TouchableOpacity>
          <Text>{item.name}</Text>
          </View>
        )
      }
  return (
    <View>
    <FlatList showsHorizontalScrollIndicator={false}
       data={popularItems} renderItem={renderPopularItems} horizontal pagingEnabled/>
    </View>
  )
}

export default PopularItems