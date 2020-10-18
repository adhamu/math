import React, { useEffect, useState } from 'react'
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
  color: #fff;
  padding: 10px 15px;
  border-radius: 4px;
  font-weight: bold;
  border: none;
  font-size: 16px;
  cursor: pointer;
`

const ShowResults = styled(Button)`
  background: green;
  float: right;
`

const Main = styled.div``

const App = (): JSX.Element => {
  const [userAnswers, setUserAnswers] = useState<Answer>()
  const [showResults, setShowResults] = useState(false)
  const [questions, setQuestions] = useState([])
  const [operator, setOperator] = useState('+')

  useEffect(() => {
    setQuestions(generateRandomQuestions())
  }, [])

  useEffect(() => {
    setQuestions(generateRandomQuestions())
  }, [operator])

  useEffect(() => {
    setUserAnswers({})
    setShowResults(false)
  }, [questions])

  const storeAnswer = (question: number, answer: string) => {
    setShowResults(false)
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
      const a = Math.floor(Math.random() * 20) + 1
      const b = Math.floor(Math.random() * 20) + 1

      return {
        a,
        operator: operator,
        b,
        answer: calculateAnswer(a, b),
      }
    })

  const generateQuestions = (pow: number): Question[] =>
    Array.from({ length: 30 }).map((_, i) => ({
      a: i,
      operator: operator,
      b: pow,
      answer: calculateAnswer(i, pow),
    }))

  return (
    <Main>
      <Global styles={GlobalStyle} />
      <Header />
      <Container>
        <>
          <ShowResults
            onClick={() => userAnswers && setShowResults(!showResults)}>
            Show Results
          </ShowResults>
          <Button onClick={() => setQuestions(generateRandomQuestions())}>
            Generate Random Questions
          </Button>
          <br />
          <label>
            Adding{' '}
            <input type="radio" checked={operator === '+'} onClick={addMode} />
          </label>
          <label>
            Subtracting{' '}
            <input
              type="radio"
              checked={operator === '-'}
              onClick={subtractMode}
            />
          </label>
          <br />
          {Array.from({ length: 15 }).map((_, key) => (
            <Button
              key={key}
              onClick={() => {
                setQuestions(generateQuestions(key + 1))
                setUserAnswers({})
              }}>
              {key + 1}
            </Button>
          ))}
          <br />
        </>
      </Container>
      <Questions
        questions={questions}
        storeAnswer={storeAnswer}
        showResults={showResults}
        userAnswers={userAnswers}
      />
    </Main>
  )
}

export default App
