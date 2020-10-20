import React, { useEffect, useRef, useState } from 'react'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import Header from '@layout/Header'
import Container from '@layout/Container'
import Questions from '@components/Questions'
import { Answer, Question } from './types'

const GlobalStyle = css`
  * {
    padding: 0;
    margin: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 16px;
    line-height: 28px;
    color: #000;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight: bold;
  }
`

const Button = styled.button`
  background: purple;
  border: 2px solid purple;
  color: #fff;
  padding: 10px 15px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 5px;
  margin-right: 5px;
`

const OperatorToggle = styled(Button)`
  background: #fff;
  border: 2px solid blue;
  color: blue;

  &.active {
    background: blue;
    color: #fff;
  }
`

const Toolbar = styled.div`
  background: #efefef;
  padding: 20px 0 15px;
  position: fixed;
  width: 100%;
  top: 65px;
  z-index: 1;
`

const Difficulty = styled.div`
  font-weight: 600;
  border-radius: 4px;
  float: right;
  border: 2px solid red;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  cursor: pointer;

  input {
    padding: 0;
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    background: #fff;
    outline: none;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    position: relative;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    cursor: pointer;

    &:after {
      content: '- Difficulty +';
      position: absolute;
      left: 15%;
      top: 25%;
      color: #000;
      font-weight: 600;
      font-size: 16px;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 35px;
      height: 40px;
      background: red;
      border-radius: 4px;
    }
  }
`

const Main = styled.div``

const App = (): JSX.Element => {
  const [userAnswers, setUserAnswers] = useState<Answer>()
  const [questions, setQuestions] = useState([])
  const [operator, setOperator] = useState('+')
  const [difficulty, setDifficulty] = useState(20)
  const questionsRef = useRef(null)

  useEffect(() => {
    setQuestions(generateRandomQuestions())
  }, [])

  useEffect(() => {
    setQuestions(generateRandomQuestions())
  }, [operator, difficulty])

  useEffect(() => {
    setUserAnswers({})
    questionsRef.current.reset()
  }, [questions])

  const storeAnswer = (question: number, answer: string) => {
    setUserAnswers({
      ...userAnswers,
      [question]: questions[question].answer === Number(answer),
    })
  }

  const addMode = () => setOperator('+')
  const subtractMode = () => setOperator('-')

  const calculateAnswer = (a: number, b: number) =>
    // eslint-disable-next-line no-eval
    eval(`${a} ${operator} ${b}`)

  const generateRandomQuestions = (): Question[] =>
    Array.from({ length: 30 }).map(() => {
      const b = Math.floor(Math.random() * difficulty) + 1
      const a = Math.floor(Math.random() * difficulty) + b

      return {
        a,
        operator: operator,
        b,
        answer: calculateAnswer(a, b),
      }
    })

  return (
    <Main>
      <Global styles={GlobalStyle} />
      <Header />
      <Toolbar>
        <Container>
          <Button onClick={() => setQuestions(generateRandomQuestions())}>
            Generate Random Questions
          </Button>
          <OperatorToggle
            className={operator === '+' ? 'active' : ''}
            onClick={addMode}>
            Adding
          </OperatorToggle>
          <OperatorToggle
            className={operator === '-' ? 'active' : ''}
            onClick={subtractMode}>
            Subtracting
          </OperatorToggle>
          <Difficulty>
            <input
              type="range"
              min="20"
              value={difficulty}
              step="20"
              max="100"
              onChange={e => setDifficulty(Number(e.target.value))}
              className="slider"
              id="myRange"
            />
          </Difficulty>
        </Container>
      </Toolbar>
      <form onSubmit={e => e.preventDefault()} ref={questionsRef}>
        <Questions
          questions={questions}
          storeAnswer={storeAnswer}
          userAnswers={userAnswers}
        />
      </form>
    </Main>
  )
}

export default App
