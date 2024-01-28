import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { server } from '../index'
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorCompo from './ErrorCompo';

const Exchanges = () => {
  const [exchanges,setexchanges]=useState();
  const [loading,setloading]=useState(true);
  const [error,seterror]=useState(false);

  useEffect(() => {
    const fetchExchanges=async()=>{
    try{const {data} =await axios.get(`${server}/exchangwes?per_page=20`);
    console.log(data);
    setexchanges(data);
    setloading(false);}
    
    catch(error)
    {
      seterror(true);
    setloading(false);
    }};
    fetchExchanges();
  }, []);

  if(error)
  return <ErrorCompo message={'error while fetchExchanges'}/>


  return (
    <Container maxW={'container.xl'}>
   {loading? <Loader/> : (
    <>
    <HStack wrap={'wrap'}>
      {exchanges.map((i)=>(
       
        <ExchangeCard 
        key={i.id}
        name={i.name} 
        img={i.image} 
        rank={i.trust_score_rank} 
        url={i.url}
        />  
        
      ))}
    </HStack>
    </>
   )}
  </Container>
  );
};
const ExchangeCard =({name,img,rank,url})=>(
  <a href={url} target={'blank'}>
   <VStack w={'50'} p={'8'} shadow={'lg'} borderRadius={'lg'} transition={'all 0.5s'}
   m={'4'}
   css={{
    "&:hover":{
      transform:'scale(1.3)'
    },
   }}>
     <Image 
     src={img}
     w={'10'}
     h={'10'}
     objectFit={'contain'}
     alt='Exchange'/>
     <Heading size={'md'} noOfLines={1}>{rank}</Heading>
     <Text noOfLines={1}>{name}</Text>
   </VStack>
  </a> 
);
export default Exchanges






  




