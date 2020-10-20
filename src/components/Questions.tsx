import React, { useEffect, useState } from 'react'
import Container from '@layout/Container'
import styled from '@emotion/styled'
import { Answer, Question } from '@global/types'

const QuestionList = styled.div`
  padding-top: 150px;
`

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  font-size: 42px;

  div {
    flex-grow: 1;
    flex-basis: 0;
  }
`

const AnswerWrapper = styled.div`
  input {
    appearance: none;
    width: 120px;
    height: 120px;
    border: 1px solid #ccc;
    text-align: center;
    font-size: 50px;
  }
`

const Results = styled.div`
  display: inline-block;
  text-align: right;
  width: 25%;
`

export default ({
  questions,
  storeAnswer,
  userAnswers,
}: {
  questions: Question[]
  storeAnswer: (key: number, value: string) => void
  userAnswers: Answer
}): JSX.Element => {
  const [isResultsVisible, setIsResultsVisible] = useState({})

  useEffect(() => {
    setIsResultsVisible({})
  }, [questions])

  return (
    <QuestionList>
      <Container>
        {questions.map(({ a, operator, b }, key) => (
          <QuestionWrapper key={key}>
            <div>{a}</div>
            <div>{operator}</div>
            <div>{b}</div>
            <AnswerWrapper>
              <input
                type="tel"
                onChange={e => {
                  storeAnswer(key, e.target.value)
                  e.target.value === '' &&
                    setIsResultsVisible({ ...isResultsVisible, [key]: false })
                }}
                onBlur={e => {
                  e.target.value !== '' &&
                    setIsResultsVisible({ ...isResultsVisible, [key]: true })
                }}
              />
            </AnswerWrapper>
            {
              <Results
                style={{
                  visibility: isResultsVisible[key] ? 'visible' : 'hidden',
                }}>
                {userAnswers[key] === true ? 'Correct' : 'Incorrect'}
              </Results>
            }
          </QuestionWrapper>
        ))}
      </Container>
    </QuestionList>
  )
}
