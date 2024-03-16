import { Box, Text } from '@chakra-ui/react'

export default function TextField({ finalText, transcript, isMatch }) {
  return (
    <Box width={400} textAlign="center">
      <Text fontSize="20px">
        {finalText}
        <span style={{ color: isMatch ? '#f00' : '#aaa' }}>{transcript}</span>
      </Text>
    </Box>
  )
}
