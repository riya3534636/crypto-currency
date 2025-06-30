import React, { useState } from 'react'
import axios from "axios"
import {useEffect} from "react"
import {server} from "../index"
import { Container, HStack,Button, RadioGroup, Radio} from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import CoinCard from './CoinCard'


const Coins = () => {
    let[coins,setCoins]=useState([])
    let[loader,setLoader]=useState(true)
    let[error,setError]=useState(false)
    let[page,setPage]=useState(1)
    let[currency,setCurrency]=useState("inr")

    

    const currencySymbol=currency==="inr"?"₹":currency==="eur"?"€":"$ "

    const ChangePage=(page)=>{
        setPage(page);
        setLoader(true);
    }

    const btns=new Array(132).fill(1)

    useEffect(() => {
     const fetchCoins=async()=>{
        try{
            const {data}=await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data)
        setLoader(false)
        } catch(error){
            setError(true)
            setLoader(false)

        }
     }
     fetchCoins();
    }, [currency,page])

    if(error) return <ErrorComponent message={"Error while fetching coins"} />
    
  return (
    <Container maxW={"container.xl"}>
        { loader ?   (<Loader/>)
           : (
            <>
<RadioGroup value={currency} onChange={setCurrency} p={"8"}>
    <HStack spacing={"4"}>
        <Radio value={"inr"}>INR</Radio>
        <Radio value={"usd"}>USD</Radio>
        <Radio value={"eur"}>EUR</Radio>

    </HStack>
</RadioGroup>
            <HStack wrap={"wrap"} justifyContent={"space-evenly"} >
                {coins.map((i)=>(
                    <CoinCard key={i.id} id={i.id} name={i.name} img={i.image} price={i.current_price} symbol={i.symbol} currencySymbol={currencySymbol} />
                ))}
            </HStack>
            <HStack w={"full"} overflow={"auto"} p={"8"}>
                {
                    btns.map((items,index)=>(
                        <Button key={index} bgColor={"blackAlpha.900"} color={"white"} onClick={()=>ChangePage(index+1)}>
                            {index+1}</Button>
                     
                    ))
                }
            </HStack>
            </>
       ) }

    </Container>

  )
}



export default Coins