import React, { Component } from 'react'
import styled from 'styled-components'

class Logo extends Component {
  // Create a Title component that'll render an <h1> tag with some styles
  static get Title () {
    return styled.h1`
      font-size: 1.5em
      text-align: center
      color: palevioletred
    `
  }

  // Create a Wrapper component that'll render a <section> tag with some styles
  static get Wrapper () {
    return styled.section`
      padding: 4em
      background: papayawhip
    `
  }

  // Use Title and Wrapper like any other React component – except they're styled!
  render () {
    const {Wrapper, Title} = Logo

    return (
      <Wrapper>
        <Title>
          ixo, Logo styled component!
        </Title>
      </Wrapper>
    );
  }
}

module.exports = Logo