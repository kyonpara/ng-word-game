import React, { useState, useEffect, useRef } from 'react'
import { Button, ButtonGroup, Flex, Box, Grid } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import Notice from '../Notice'
import TextField from '../TextField'
import exportRecordedText from '../func/exportRecordedText'
import sound from '../../alertNgWord.mp3'
import Candidates from '../../candidate_words.json'
import TagField from './TagField'
export default function NgWordGameScreen() {
  //音声認識する処理
  const recognizerRef = useRef()
  // 音声認識
  const [detecting, setDetecting] = useState(false) // 音声認識ステータス
  const [finalText, setFinalText] = useState('') // 確定された文章
  const [transcript, setTranscript] = useState('スタートを押して検知開始') // 認識中の文章
  const [alertOpen, setAlertOpen] = useState(false) // カタカナ検知アラート
  const [alertWord, setAlertWord] = useState('') // カタカナ
  const [recordStatus, setRecordStatus] = useState('スタート')
  // 単語検知
  const initialTagValues = ['大変'] // デフォルト検知単語
  const [tagValues, setTagValues] = useState(initialTagValues) // 検知単語一覧
  useEffect(() => {
    const music = new Audio(sound) // デフォルト音
    const isAndroid = window.navigator.userAgent.includes('Android') // Android chrome用のフラグ
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert('お使いのブラウザには未対応です')
      return
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    recognizerRef.current = new SpeechRecognition()
    recognizerRef.current.lang = 'ja-JP'
    recognizerRef.current.interimResults = true
    recognizerRef.current.continuous = true
    recognizerRef.current.onstart = () => {
      setDetecting(true)
    }

    recognizerRef.current.onend = () => {
      recognizerRef.current.stop()
      console.log('ストップ')
      setDetecting(false)
    }

    recognizerRef.current.onresult = event => {
      ;[...event.results].slice(event.resultIndex).forEach(result => {
        const transcript = result[0].transcript
        setTranscript(transcript)
        if (result.isFinal) {
          // カタカナが含まれていたらアラート
          if (tagValues.some(value => transcript.includes(value))) {
            console.log('NGワードが含まれています')
            setAlertOpen(true)
            music.play()
            setRecordStatus('スタート')
          }
          // 音声認識が完了して文章が確定
          setFinalText(prevState => {
            // Android chromeなら値をそのまま返す
            return isAndroid ? transcript : prevState + transcript
          })

          // 文章確定したら候補を削除
          setTranscript('')
        }
      })
    }
  })
  return (
    <Flex flexDirection="column" alignItems="center">
      {/* カタカナ禁止ゲームの画面のコンテンツ */}
      <Box
        p="2"
        bg="#00B8A9"
        height={100}
        width={2000}
        justifyContent="center"
        display="flex"
        alignItems="center"
      >
        <Heading size="lg" color="white">
          NGワードゲーム
        </Heading>
      </Box>
      <Box marginTop="70px">
        <Flex flexDirection="column" alignItems="center">
          <Grid>
            <TagField
              disabled={detecting}
              options={Candidates}
              defaultValue={initialTagValues}
              label="禁止する単語"
              placeholder="単語を追加 +"
              onTagChange={values => {
                setTagValues(values)
              }}
            />
          </Grid>
          <Button
            colorScheme="red"
            width={200}
            onClick={() => {
              if (recordStatus === 'スタート') {
                recognizerRef.current.start()
                setRecordStatus('録音中...')
                console.log(1)
              } else {
                setRecordStatus('スタート')
                recognizerRef.current.abort()
                console.log(2)
              }
            }}
          >
            {recordStatus}
          </Button>
          <Box marginTop="40px">
            <TextField
              finalText={finalText}
              transcript={transcript}
              isMatch={alertOpen}
              katakana={alertWord}
            />
          </Box>
          <Notice
            open={alertOpen}
            severity="error"
            onClose={() => {
              setAlertOpen(false)
            }}
          >
            NGワードを検知しました
          </Notice>
        </Flex>
      </Box>
    </Flex>
  )
}
