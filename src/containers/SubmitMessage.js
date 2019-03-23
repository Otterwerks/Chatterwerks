
import React from 'react'
import { connect } from 'react-redux'
import { submitMessage } from '../actions'

const SubmitMessage = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(submitMessage(input.value))
        input.value = ''
      }}>
        <input ref={node => input = node} />
        <button type="submit">
          Send
        </button>
      </form>
    </div>
  )
}

export default connect()(SubmitMessage)