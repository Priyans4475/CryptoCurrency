

import React from 'react'

import { Heading, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


const CoinsCard =({name,img,id,symbol,price,currenysym='₹'})=>(
    <Link to={`/coins/${id}`} target={'blank'}>
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

       <Heading size={'md'} noOfLines={1}>{symbol}</Heading>

       <Text noOfLines={1}>{name}</Text>
       <Text noOfLines={1}>{price? `${currenysym}${price}`:"NA" }</Text>
     </VStack>
    </Link> 
  );

export default CoinsCard