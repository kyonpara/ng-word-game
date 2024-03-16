import './App.css'
import { Button, ButtonGroup, ChakraProvider, Flex } from '@chakra-ui/react'
import { useState, useRef, useEffect } from 'react'
import KatakanaGameScreen from './component/KatakanaGame/KatakanaGameScreen'
import NgWordGameScreen from './component/NgWordGame/NgWordGameScreen'
import Header from './component/Header'

function App() {
  const [showKatakanaGame, setShowKatakanaGame] = useState(false)
  const [showNgWordGame, setShowNgWordGame] = useState(false)
  const [showTop, setShowTop] = useState(true)

  const onKatakanaGame = () => {
    setShowTop(false)
    setShowNgWordGame(false)
    setShowKatakanaGame(true)
  }

  const onNgWordGame = () => {
    setShowTop(false)
    setShowKatakanaGame(false)
    setShowNgWordGame(true)
  }

  const onTop = () => {
    setShowTop(true)
    setShowKatakanaGame(false)
    setShowNgWordGame(false)
    console.log(showTop)
  }
  if (showKatakanaGame && !showTop) {
    return (
      // カタカナ禁止ゲームの画面を表示
      <ChakraProvider>
        <Flex
          alignItems="center"
          height="100vh"
          bg="#F8F3D4"
          flexDirection="column"
        >
          <Header onTop={onTop} />
          <KatakanaGameScreen />
        </Flex>
      </ChakraProvider>
    )
  } else if (showNgWordGame && !showTop) {
    // NGワードゲームの画面を表示
    return (
      <ChakraProvider>
        <Flex
          alignItems="center"
          height="100vh"
          bg="#F8F3D4"
          flexDirection="column"
        >
          <Header onTop={onTop} />
          <NgWordGameScreen />
        </Flex>
      </ChakraProvider>
    )
  } else {
    // ボタンを表示
    return (
      <ChakraProvider>
        <Flex justifyContent="center" height="100vh" bg="#F8F3D4">
          <Header onTop={onTop} />
          <div
            className="buttons"
            style={{ position: 'absolute', top: '200px' }}
          >
            <div className="buttonContainer">
              <Button
                bg="#FFDE7D"
                width="300px"
                height="60px"
                mb={30}
                onClick={onKatakanaGame}
              >
                カタカナ禁止ゲーム
              </Button>
            </div>
            <div className="buttonContainer">
              <Button
                bg="#47d7cb"
                width="300px"
                height="60px"
                onClick={onNgWordGame}
              >
                NGワードゲーム
              </Button>
            </div>
          </div>
        </Flex>
      </ChakraProvider>
    )
  }
}

export default App
