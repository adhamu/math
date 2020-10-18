import React, { useEffect, useState } from 'react'
import { Global, css } from '@emotion/core'

const GlobalStyle = css`
  * {
    padding: 0;
    margin: 0;
  }
  body {
    font-family: 'Open Sans', cursive;
    font-size: 16px;
    line-height: 28px;
  }
`

type Answer = {
  [key in number]: boolean
}

const App = (): JSX.Element => {
  const [userAnswers, setUserAnswers] = useState<Answer>()
  const [showResults, setShowResults] = useState(false)
  const [questions, setQuestions] = useState([])
  const [operator, setOperator] = useState('+')

  useEffect(() => {
    setQuestions(generateRandomQuestions())
  }, [])

  useEffect(() => {
    setUserAnswers({})
    setShowResults(false)
    setQuestions(generateRandomQuestions())
  }, [operator])

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

  const generateRandomQuestions = () =>
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

  const generateQuestions = (pow: number) =>
    Array.from({ length: 30 }).map((_, i) => ({
      a: i,
      operator: operator,
      b: pow,
      answer: calculateAnswer(i, pow),
    }))

  return (
    <>
      <Global styles={GlobalStyle} />
      <h1>Maths Questions</h1>
      {questions.map((question, key) => (
        <React.Fragment key={key}>
          {question.a} {question.operator} {question.b} ={' '}
          <input
            type="number"
            onChange={e => storeAnswer(key, e.target.value)}
          />
          {showResults && (
            <span>
              {key in userAnswers &&
                (userAnswers[key] === true ? 'Correct' : 'Incorrect')}
            </span>
          )}
          <hr />
        </React.Fragment>
      ))}
      <button onClick={() => userAnswers && setShowResults(!showResults)}>
        Show Results
      </button>
      <button onClick={() => setQuestions(generateRandomQuestions())}>
        Generate Random Questions
      </button>
      <button onClick={() => addMode()}>Adding</button>
      <button onClick={() => subtractMode()}>Subtracting</button>
      {Array.from({ length: 15 }).map((_, key) => (
        <button
          key={key}
          onClick={() => setQuestions(generateQuestions(key + 1))}>
          {key + 1}
        </button>
      ))}
    </>
  )
}

export default App
