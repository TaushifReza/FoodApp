import { View, Text, FlatList, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const RenderAllProducts=({item,index})=>{
    const navigation = useNavigation()
    return(
        <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails",{product:item})} className='ml-3 mr-3 ' style={{height:230,width:100}}>
        <View>
        <View>
        <Image className='rounded-3xl' source={item.image} style={{height:100,width:100}}/>
        </View>
        <View>
        <Text>{item.name}</Text>
        </View>
        </View>
        </TouchableOpacity>
    )
}

const MoreItems = () => {
    const MoreProducts=[
        {
            id:'1',
            image:require("../../assets/images/cbiryani.jpg"),
            name:'Chicken Biryani',
            price:200,
            store:'Oli Restaurant',
            rating:4.2,
            frating:5,
            time:'20-25 Mins',
            logo:require("../../assets/images/1.jpg")
        },
        {
            id:'2',
            image:require("../../assets/images/chana.jpg"),
            name:'Chana Soup',
            price:70,
            store:'Hotel Saptagiri',
            rating:4.5,
            frating:4.5,
            time:'15 Mins',
            logo:require("../../assets/images/2.jpg")
        },
        {
            id:'3',
            image:require("../../assets/images/samosa.jpg"),
            name:'Samosa',
            price:100,
            store:'Nature Samosa',
            rating:4.9,
            frating:4.2,
            time:'20 Mins',
            logo:require("../../assets/images/3.jpg")
        },
        {
            id:'4',
            image:require("../../assets/images/omlette.jpg"),
            name:'Omlette',
            price:150,
            store:'Sandwich Slinger',
            rating:4.6,
            frating:4.8,
            time:'30 Mins',
            logo:require("../../assets/images/4.jpg")
        },
        {
            id:'5',
            image:require("../../assets/images/panipuri.jpg"),
            name:'Pani Puri',
            price:50,
            store:'Simple Meals',
            rating:4.4,
            frating:4.8,
            time:'10 Mins',
            logo:require("../../assets/images/5.jpg")
        },
        {
            id:'6',
            image:require("../../assets/images/puri.jpg"),
            name:'Puri Tarkari',
            price:80,
            store:'Namaste Khaja',
            rating:4.8,
            frating:4.7,
            time:'35 Mins',
            logo:require("../../assets/images/6.jpg")
        }
    ]
  return (
    <View>
        <FlatList horizontal className='flex-row' data={MoreProducts} renderItem={({item})=><RenderAllProducts item={item}/>}/>
    </View>
  )
}

export default MoreItems