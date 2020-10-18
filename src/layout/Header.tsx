import * as React from 'react'
import styled from '@emotion/styled'

import Container from '@layout/Container'

const Header = styled.div`
  padding: 20px 0;
  position: relative;
  width: 100%;
  z-index: 1;
  color: purple;
  margin-bottom: 20px;

  &:after {
    content: '';
    height: 4px;
    width: 100%;
    position: absolute;
    left: 0;
    top: 65px;
    background-image: linear-gradient(
      to right,
      #feca57,
      #feca57 20%,
      #ff6b6b 20%,
      #ff6b6b 40%,
      #ff9ff3 40%,
      #ff9ff3 60%,
      #1dd1a1 60%,
      #1dd1a1 80%,
      #ff9f43 80%
    ) !important;
  }
`

export default (): JSX.Element => (
  <Header>
    <Container>
      <h1>Fun with Maths</h1>
    </Container>
  </Header>
)
