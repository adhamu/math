import React from 'react'
import Container from '@layout/Container'
import styled from '@emotion/styled'

const Question = styled.div`
  display: block;
  padding: 10px;
  font-size: 42px;
`

const Option = styled.div`
  display: inline-block;
  width: 120px;
  text-align: left;
`

const Operator = styled.div`
  display: inline-block;
  width: 120px;
  text-align: left;
`

const Answer = styled.div`
  display: inline-block;

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
  width: auto;
`

export default ({
  questions,
  storeAnswer,
  showResults,
  userAnswers,
}): JSX.Element => (
  <Container>
    {questions.map((question, key) => (
      <Question key={key}>
        <Option>{question.a}</Option>
        <Operator>{question.operator}</Operator>
        <Option>{question.b}</Option>
        <Answer>
          <input
            type="tel"
            onChange={e => storeAnswer(key, e.target.value)}
          />
        </Answer>
        {showResults && (
          <Results>
            {key in userAnswers &&
              (userAnswers[key] === true ? 'Correct' : 'Incorrect')}
          </Results>
        )}
      </Question>
    ))}
  </Container>
)
