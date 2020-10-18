import React, { useState } from 'react'
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
  const questions = [
    {
      a: 1,
      operator: '+',
      b: 1,
      answer: 2,
    },
    {
      a: 1,
      operator: '+',
      b: 2,
      answer: 3,
    },
    {
      a: 1,
      operator: '+',
      b: 3,
      answer: 4,
    },
    {
      a: 1,
      operator: '+',
      b: 4,
      answer: 5,
    },
  ]

  const [userAnswers, setUserAnswers] = useState<Answer>()
  const [showResults, setShowResults] = useState(false)

  const storeAnswer = (question: number, answer: string) => {
    setShowResults(false)
    setUserAnswers({
      ...userAnswers,
      [question]: questions[question].answer === Number(answer),
    })
  }

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
            <span>{userAnswers[key] === true ? 'Correct' : 'Incorrect'}</span>
          )}
          <hr />
        </React.Fragment>
      ))}
      <button onClick={() => userAnswers && setShowResults(!showResults)}>Show Results</button>
    </>
  )
}

export default App
