import * as React from 'react'
import styled from '@emotion/styled'

import Container from '@layout/Container'

const Footer = styled.footer`
  color: #666;
  border-top: 1px solid #efefef;
  padding: 20px 0 50px;
  text-align: center;
`

export default (): JSX.Element => (
  <Container>
    <Footer>
      <small>
        <p>
          <strong>Made with 🔥 by Amit Dhamu</strong>
        </p>
        <p>Copyright &copy; {new Date().getFullYear()}. All rights reserved</p>
      </small>
    </Footer>
  </Container>
)
