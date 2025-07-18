import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

//STYLES
const TogglableWrapper = styled.div`
  background-color: #8d84b3;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 500px;
`

const ButtonWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
`

const CancelButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 16px;
  &:hover {
    background-color: #444;
  }
`

//LOGIC
const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <TogglableWrapper>
      <ButtonWrapper style={hideWhenVisible}>
        <div onClick={toggleVisibility}>{props.buttonLabel}</div>
      </ButtonWrapper>

      <div style={showWhenVisible}>
        {props.children}
        <CancelButton onClick={toggleVisibility}>Cancel</CancelButton>
      </div>
    </TogglableWrapper>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
Togglable.displayName = 'Togglable'

export default Togglable
