import { Box, Stack, Text, VStack,Img } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Box 
    bgColor={'blackAlpha.900'}
    color={'whiteAlpha.700'}
    minH={'48'}
    px={'16'}
    py={['16','8']}>
    
    <Stack
    direction={['column','row']}
    h={'full'}
    alignItems={'center'}>
      
      <VStack w={'full'} alignItems={['center','flex-start']}>
            <Text fontWeight={'bold'}>About Us</Text>
            <Text 
            fontSize={'small'}
            letterSpacing={'widest'}
            textAlign={['center','left']}>We are the best crypto trading app in the World</Text>
      </VStack>

      <VStack w={'20'}>
        <Img src={'/img1.jpg'}  boxSize={'28'} mt={['4','0']} style={{ borderRadius: '50%' }}/>
        <Text>Made By Priyanshu</Text>
      </VStack>
    </Stack>
    </Box>
  )
}

export default Footer