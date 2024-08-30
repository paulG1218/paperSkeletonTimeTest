import React, { useEffect, useState } from 'react'
import { Row, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import "../css/DisplayModeSwitch.css"

const DisplayModeSwitch = () => {
    const root = document.getElementById("root")

    const dispatch = useDispatch()

    const isDark = useSelector((state) => state.isDark)

    useEffect(() => {
        if (!isDark) {
            root.className = "dark-mode"
        } else {
            root.className = ""
        }
    }, [isDark])

    const handleDisplayMode = (e) => {
        dispatch({
            type: "displayChange",
            payload: e.target.checked
        })
    }

  return (
    <Row className='display-switch-row'>
        <img src="/light-mode.svg" alt="light mode" className='light-mode-svg'/>
      <label class="switch">
        <input type="checkbox" checked={isDark} onClick={(e) => handleDisplayMode(e)}/>
        <span class="slider round"></span>
        </label>
      <img src="/dark-mode.svg" alt="dark mode" className='dark-mode-svg'/>
    </Row>
  )
}

export default DisplayModeSwitch
