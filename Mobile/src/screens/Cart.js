import { View, Text, TouchableOpacity,Image,FlatList } from 'react-native'
import {React,useState} from 'react'
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { cart } from '../../Database/CartItems';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Cart = (item) => {
  const [quantity, setquantity] = useState(1);
  const [price, setprice] = useState(item.price)
  const navigation = useNavigation();
  return (
    <View style={{display:'flex',justifyContent:"center",alignItems:"center",gap:100,marginTop:70}}>
    {cart.length > 0 ? (
      <>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={cart}
        renderItem={({ item }) => (
          <View style={{
            display: 'flex', flexDirection: 'row',
            backgroundColor: 'white', borderRadius: 5, width: 390, padding: 6, marginBottom:20,
            gap:10
          }} key={item.id}>
            <Image style={{ width: 100, height: 90, borderRadius: 40 }} source={{uri:item.image}} />
            <View style={{width:150}}>
            <Text style={{fontSize:17,fontWeight:'900',color:'orange',marginBottom:7}}>{item.itemName}</Text>
            <Text style={{fontSize:15,marginBottom:7,fontWeight:'200'}}>{item.seller.businessName}</Text>
            <Text style={{fontSize:15,fontWeight:'bold'}}>Rs.{item.price}</Text>
            </View>
            <View style={{paddingTop:10,display:'flex',flexDirection:'column',alignItems:'center',gap:15}}>
            <Text style={{fontWeight:'700',fontSize:15}}>
            {quantity}
            </Text>
            <View style={{width:100,height:40,backgroundColor:'orange',borderRadius:30,display:'flex',
            paddingTop:7,flexDirection:'row',justifyContent:'center',alignContent:'center',gap:15
          }}>
          <TouchableOpacity disabled={quantity<2} onPress={()=>{setquantity(quantity-1);setprice(price-item.price)}}>
          <Icon name="remove" size={25} color={'white'}/>
          </TouchableOpacity>
          <TouchableOpacity disabled={quantity>9} onPress={()=>{setquantity(quantity+1);setprice(price+item.price)}}>
          <Icon name="add" size={25} color={'white'}/>
          </TouchableOpacity>
            </View>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      /> 
      <View className='flex flex-row mr-56 bottom-14'>
      <Text className='text-lg'>Total Price : </Text>
      <Text className='text-lg text-red-600'>Rs.{price}</Text>
      </View>
      <TouchableOpacity style={{borderColor:'yellow'}} className='bottom-24 bg-yellow-400 rounded-2xl h-12 w-80'>
      <Text className='text-xl font-medium text-white text-center pt-2'>Place Order</Text>
      </TouchableOpacity>
      </>
    ):<><View >
    <LottieView
        autoPlay
        style={{
          width: 550,
          height: 450,
          marginTop:40,
          backgroundColor: 'transparent'
        }}
        source={require('../../assets/images/Cart.json')}
      />
      </View>
      <View style={{display:'flex',justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize:35,fontWeight:'100',marginBottom:20}}>Your cart is empty</Text>
      <Text style={{fontWeight:'100',fontSize:18,marginBottom:50}}>Add something to start ordering</Text>
      <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={{backgroundColor:'lightgreen',height:50,width:250,borderRadius:50}}>
      <Text style={{alignSelf:'center',fontSize:20,color:'white',paddingTop:10,fontWeight:'bold'}}>Browse Menu Lists</Text>
      </TouchableOpacity>
      </View>
      <View>
      </View>
      </>}
    </View>
  )
}

export default Cart