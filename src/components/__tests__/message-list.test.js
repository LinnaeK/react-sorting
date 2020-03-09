import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import MessageList from '../message-list'

describe("<MessageList />", ()=> {
  it("Renders without crashing", () => {
    const { getByText } = render(<MessageList />)
    expect(getByText("Help.com Coding Challenge")).toBeInTheDocument()
  })
})

describe("The Default UI of message-list", ()=> {
  it("Renders a stop/start button and clear button", () => {
    const { getByText, queryAllByText } = render(<MessageList />)
    expect(getByText("Stop")).toBeInTheDocument()
    expect(queryAllByText("Clear")[0]).toBeInTheDocument()
  })
})

