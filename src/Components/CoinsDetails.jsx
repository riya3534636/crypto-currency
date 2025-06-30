import { Box, Container,RadioGroup, Radio,HStack,VStack,Text ,Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Center } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {server} from "../index"
import ErrorComponent from './ErrorComponent'


const CoinsDetails = () => {

      let[coin,setCoin]=useState({})
      let[loader,setLoader]=useState(true)
      let[error,setError]=useState(false)
      let[currency,setCurrency]=useState("inr")

      const params=useParams();
      const currencySymbol=currency==="inr"?"₹":currency==="eur"?"€":"$ "


      useEffect(() => {
        const fetchCoin=async()=>{
           try{
               const {data}=await axios.get(`${server}/coins/${params.id}`);
               console.log(data)
           setCoin(data)
           setLoader(false)
           } catch(error){
               setError(true)
               setLoader(false)
   
           }
        }
        fetchCoin();
       }, [params.id])

       if(error) return <ErrorComponent message={"Error while fetching coin"} />



  return (
    <Container maxWidth={"container.xl"}>

      { loader?<Loader />:
           (
            <>
            <Box width={"full"} borderWidth={1}>

            </Box>



                        
            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                <HStack spacing={"4"}>
                    <Radio value={"inr"}>INR</Radio>
                    <Radio value={"usd"}>USD</Radio>
                    <Radio value={"eur"}>EUR</Radio>
                        </HStack>
                    </RadioGroup>

                    <VStack spacing={"4"} alignItems={"flex-start"}>
                   <Text fontSize={"small"} alignSelf="center" opacity={0.7} >Last Upadated on {Date(coin.market_data.last_updated).split("G")[0]}</Text>
                   <Image src={coin.image.large} w={"16"} h={"16"} objectFit={"contain"}/>
                   <Stat>
                    <StatLabel>{coin.name}</StatLabel>
                    <StatNumber>{ currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
                    <StatHelpText>
                      <StatArrow type={coin.market_data.price_change_percentage_24h> 0?
                        'increase':'decrease'
                      }/>
                      {coin.market_data.price_change_percentage_24h}%
                    </StatHelpText>
                   </Stat>

                   <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
                    {`#${coin.market_cap_rank}`}
                   </Badge>

                   <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} 
                     low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
                   />
                    </VStack>

                    <Box w={"full"} p={"4"}>
                   <Item  title={"Max Supply"} value={coin.market_data.max_supply}/>
                   <Item  title={"Circulating Supply"} value={coin.market_data.circulating_supply}/>
                   <Item  title={"Market Capital"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>
                   <Item  title={"All time low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
                   <Item  title={"All time high"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>


                    </Box>
            </>
           )}
    

    </Container>
  );
};

const Item=({title,value})=>(
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neus"} letterSpacing={"widest"}>
        {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
)



const CustomBar=({high,low})=>(
  <VStack w={"full"}>
    <Progress value={"50"} colorScheme='teal' w={"full"}/>
    <HStack justifyContent={"space-between"} w={"full"}>
       <Badge children={low} colorScheme='red'/>
        <Text fontSize={"sm"}>24H Range</Text>
       <Badge children={high} colorScheme='green'/>
       </HStack>
  </VStack>
)

export default CoinsDetails