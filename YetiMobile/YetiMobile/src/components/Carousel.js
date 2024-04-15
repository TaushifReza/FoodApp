import { View, Text,Image,TouchableOpacity,FlatList } from 'react-native'
import React from 'react'

const Carousel = () => {
    const carouselData=[
        {
          id:"01",
          image: require("../../assets/images/Burger1.jpg")
        },
        {
          id:"02",
          image: require("../../assets/images/Pizza.jpg")
        },{
          id:"03",
          image: require("../../assets/images/Noodles.jpg")
        }
      ]
      const renderCarouselItems =({item,index})=>{
        return(
          <View >
          <TouchableOpacity >
          <Image className='rounded-3xl ml-3 mr-2' source={item.image} style={{height:230,width:380}}/>
          </TouchableOpacity>
          </View>
        )
      }
  return (
    <View>
    <FlatList showsHorizontalScrollIndicator={false} data={carouselData} 
    renderItem={renderCarouselItems} horizontal pagingEnabled/>
    </View>
  )
}

export default Carousel