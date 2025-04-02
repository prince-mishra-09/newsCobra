import loading from './loading.mp4'
import '../index.css'
import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center loading'>
        <video src={loading} autoPlay muted loop width={"100px"}></video>
      </div>
    )
  }
}
