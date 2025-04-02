import React, { Component } from 'react'
import Nav from './components/Navbar'
import NewsCompo from './components/NewsCompo'


export class App extends Component {
  render() {
    return (
      <>
      <Nav />
      <NewsCompo />
      </>
    )
  }
}

export default App
