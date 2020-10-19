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

const ShowResults = styled(Button)`
  background: green;
  border: 2px solid green;
  float: right;
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
`

const Main = styled.div``

const App = (): JSX.Element => {
  const [userAnswers, setUserAnswers] = useState<Answer>()
  const [showResults, setShowResults] = useState(false)
  const [questions, setQuestions] = useState([])
  const [operator, setOperator] = useState('+')
  const questionsRef = useRef(null)

  useEffect(() => {
    setQuestions(generateRandomQuestions())
  }, [])

  useEffect(() => {
    setQuestions(generateRandomQuestions())
  }, [operator])

  useEffect(() => {
    setUserAnswers({})
    setShowResults(false)
    questionsRef.current.reset()
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
      const b = Math.floor(Math.random() * 20) + 1
      const a = Math.floor(Math.random() * 20) + b

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
      <Toolbar>
        <Container>
          <ShowResults
            onClick={() => userAnswers && setShowResults(!showResults)}>
            Show Results
          </ShowResults>
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
          <br />
          {/* {Array.from({ length: 15 }).map((_, key) => (
            <Button
              key={key}
              onClick={() => {
                setQuestions(generateQuestions(key + 1))
                setUserAnswers({})
              }}>
              {key + 1}
            </Button>
          ))}
          <br /> */}
        </Container>
      </Toolbar>
      <form onSubmit={e => e.preventDefault()} ref={questionsRef}>
        <Questions
          questions={questions}
          storeAnswer={storeAnswer}
          showResults={showResults}
          userAnswers={userAnswers}
        />
      </form>
    </Main>
  )
}

export default App
