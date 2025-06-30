import React, { useState } from 'react'
import axios from "axios"
import {useEffect} from "react"
import {server} from "../index"
import { Container, HStack, VStack,Image, Heading ,Text} from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'

const Exchanges = () => {
    let[exchange,setExchanges]=useState([])
    let[loader,setLoader]=useState(true)
    let[error,setError]=useState(false)


    useEffect(() => {
     const fetchExchange=async()=>{
        try{
            const {data}=await axios.get(`${server}/exchanges`);
        setExchanges(data)
        setLoader(false)
        } catch(error){
            setError(true)
            setLoader(false)

        }
     }
     fetchExchange();
    }, [])

    if(error) return <ErrorComponent message={"Error while fetching Exchange"} />
    
  return (
    <Container maxW={"container.xl"}>
        { loader ?   (<Loader/>)
           : (
            <>
            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                {exchange.map((i)=>(
                    <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url}/>
                ))}
            </HStack>
            </>
       ) }

    </Container>

  )
}

const ExchangeCard=({name,img,rank,url})=>(
    <a href={url} target={"blank"}>
        <VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s"}
          m={"4"} 
          css={{
            "&:hover":{
                transform:"scale(1.1)"
            }
          }}
        >
            <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"exchange"}/>
            <Heading size={"md"} noOfLines={1}>{rank}</Heading>
            <Text noOfLines={1}>{name}</Text>
        </VStack>
       
    </a>
) 

export default Exchanges