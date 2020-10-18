import * as React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  max-width: 850px;
  margin: 0 auto;
  padding: 0 20px;
`

type ContainerProps = {
  children: unknown
}

export default ({ children }: ContainerProps): JSX.Element => (
  <Container>{children}</Container>
)
