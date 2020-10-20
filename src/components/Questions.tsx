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
    flex-grow: 0.5;
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
  text-align: left;
  width: 25%;
`

const Correct = styled.span`
  color: green;
  position: relative;
  display: inline-block;

  &:before {
    position: absolute;
    right: -55px;
    top: 4px;
    content: '💘'
  }
`

const Incorrect = styled.span`
  color: red;
  position: relative;
  display: inline-block;

  &:before {
    position: absolute;
    right: -55px;
    top: 4px;
    content: '💩'
  }
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
                {userAnswers[key] === true ? (
                  <Correct>Correct</Correct>
                ) : (
                  <Incorrect>Incorrect</Incorrect>
                )}
              </Results>
            }
          </QuestionWrapper>
        ))}
      </Container>
    </QuestionList>
  )
}
