import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { server } from '../index'
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorCompo from './ErrorCompo';
import CoinsCard from './CoinsCard';

const Coins = () => {
  const [coins,setcoins]=useState();
  const [loading,setloading]=useState(true);
  const [error,seterror]=useState(false);
  const [page,setpage]=useState(1);
  const[currency,setcurrency]=useState('inr');

  const currenysym=
  currency==='inr' ? "₹" :'$';

  const changePage=(page)=>{
    setpage(page);
    setloading(true);
  }

  const btns=new Array(132).fill(1); 

  useEffect(() => {
    const fetchCoins=async()=>{
    try{const {data} =await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
    console.log(data);
    setcoins(data);
    setloading(false);}
    
    catch(error)
    {
      seterror(true);
    setloading(false);
    }};
    fetchCoins();
  }, [currency,page]);

  if(error)
  return <ErrorCompo message={'error while Fetching Coins'}/>


  return (
    <Container maxW={'container.xl'}>
   {loading? <Loader/> : (
    <>
    <RadioGroup value={currency} onChange={setcurrency} padding={'8'}>
      <HStack spacing={'4'}>
        <Radio value='inr'>₹ INR</Radio>
        <Radio value='usd'>$ USD</Radio>
      
      </HStack>
    </RadioGroup>
    <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
      {coins.map((i)=>(
       
        <CoinsCard 

        key={i.id}
        id={i.id}
        name={i.name} 
        img={i.image} 
        price={i.current_price}
        symbol={i.symbol}
        currenysym={currenysym}
        
        />  
        
      ))}
    </HStack>

    <HStack w={'full'} overflowX={'auto'} p={'8'}>
      {
        btns.map((item,index)=>(
          <Button
          key={index}
          bgColor={'blackAlpha.900'}
          color={'white'}
          onClick={()=>changePage(index+1)}
          >{index+1}</Button>
        ))
      }
    </HStack>
    </>
   )}
  </Container>
  );
};


export default Coins