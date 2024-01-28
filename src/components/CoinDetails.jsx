import axios from 'axios'; 
import React,{useEffect, useState} from 'react'
import { server } from '../index';
import { Box, Button, Container, VStack,HStack, Radio, RadioGroup, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorCompo from './ErrorCompo';
import {useParams} from 'react-router-dom';
import Chart from './Chart';

const CoinDetails = () => {
  const [coin,setcoin]=useState({});
  const [loading,setloading]=useState(true);
  const [error,seterror]=useState(false);
  const [days,setdays]=useState('24h');
  const [chartArray,setChartArray]=useState([]);
 
  const[currency,setcurrency]=useState('inr');
  const currenysym=
  currency==='inr' ? "₹" :'$';

  const params=useParams();

  const btns=['24h','7d','14d','30d','60d','200d','max'];

  const switchChartStats=(key)=>{
    switch (key) {
      case '24h':
        setdays('24h');
        setloading(true);
        break;
        case '7d':
          setdays('7d');
          setloading(true);
          break;
        
          case '14d':
        setdays('14d');
        setloading(true);
        break;
        case '30d':
        setdays('30d');
        setloading(true);
        break;
        case '60d':
        setdays('60d');
        setloading(true);
        case '200d':
        setdays('200d');
        setloading(true);
        case 'max':
        setdays('max');
        setloading(true);
        break;
      default:
        setdays('7d');
        setloading(true);
        break;
    }
  }

  useEffect(() => {
    const fetchCoin=async()=>{
    try{
      const {data} =await axios.get(`${server}/coins/${params.id}`);

      const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
    // console.log(chartData);
    setcoin(data);
    setChartArray(chartData.prices);
    setloading(false);}
    
    catch(error)
    {
      seterror(true);
    setloading(false);
    }};
    fetchCoin();
  }, [params.id,currency,days])

  if(error)
return <ErrorCompo message={'error while Fetching Coins'}/>

  return (
   <Container maxW={"container.xl"}>
    {loading?(<Loader/>):
    <>
    <Box width={'full'} borderWidth={'1'}>
            <Chart arr={chartArray} currency={currenysym} days={days}/>
    </Box>

    <HStack padding={'4'} overflowX={'auto'}>
      {
        btns.map((i)=>(
          <Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>
        ))
      }
    </HStack>

    <RadioGroup value={currency} onChange={setcurrency} padding={'8'}>
      <HStack spacing={'4'}>
        <Radio value='inr'>₹ INR</Radio>
        <Radio value='usd'>$ USD</Radio>
      
      </HStack>
    </RadioGroup>
      
      <VStack spacing={'4'} p='16' alignItems={'flex-start'}>
        <Text fontSize={'small'} alignSelf={'center'}>
             Last updated on {Date(coin.market_data.last_updated).split('G')[0]}
        </Text>

        <Image src={coin.image.large} 
        width={'16'}
        height={'16'}
        objectFit={'contain'}/>

        <Stat>
          <StatLabel>{coin.name}</StatLabel>
          <StatNumber>{currenysym}{coin.market_data.current_price[currency]}</StatNumber>
          <StatHelpText>
            <StatArrow type={coin.market_data.price_change_percentage_24h>0?"increase":"decrease"}/>
            {coin.market_data.price_change_percentage_24h}%
          </StatHelpText>
        </Stat>
        <Badge
        fontSize={'2xl'}
        bgColor={'blackAlpha.800'}
        color={'white'}
        >
          {`#${coin.market_cap_rank}`}
        </Badge>

        <CustomBar high={`${coin.market_data.high_24h[currency]}`} 
        low={`${coin.market_data.low_24h[currency]}`}/>

        <Box w={'full'} p='4'>
            <Item title={'Max Supply'}
             value={coin.market_data.max_supply}/>
             <Item title={'Circulating Supply'}
             value={coin.market_data.circulating_supply}/>

             <Item title={'Market cap'}
             value={`${currenysym}${coin.market_data.market_cap[currency]}`}/>
             <Item title={'All Time Low '}
             value={`${currenysym}${coin.market_data.atl[currency]}`}/>
             <Item title={'All Time high '}
             value={`${currenysym}${coin.market_data.ath[currency]}`}/>
        </Box>
      </VStack>



    </>}

   </Container>
  );
};

const CustomBar=({high,low})=>(
  <VStack w={'full'}>
    <Progress value={50} colorScheme='teal' w={'full'}/>
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={low} colorScheme={'red'}/>
      <Text fontSize={'sm'}>24Hr range</Text>
      <Badge children={high} colorScheme={'green'}/>
    </HStack>
  </VStack>
);

const Item=({title,value})=>(
  <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
    <Text fontFamily={'Bebas neue'} letterSpacing={'widest'} >
      {title}
    </Text>
    <Text>
      {value}
    </Text>

  </HStack>
)

export default CoinDetails