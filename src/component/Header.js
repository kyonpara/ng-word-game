import { Flex } from '@chakra-ui/react'

export default function Header({ onTop }) {
  return (
    <Flex
      justifyContent="center"
      minWidth="max-content"
      alignItems="center"
      gap="2"
      height={100}
      width='100%'
      backgroundColor="#FAFAFA"
      onClick={onTop}
      fontSize={40}
      fontWeight="bold"
    >
      NG Word Game
    </Flex>
  )
}
