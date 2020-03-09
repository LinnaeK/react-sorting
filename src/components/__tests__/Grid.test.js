import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import Grid from '../Grid'


describe("<Grid />", ()=> {
  it("Has Box elements", () => {
    const { getByTestId } = render(<Grid 
      messages={[
        {message:"jfk", priority: 1, id:1234}, 
        {message:"jfk", priority: 2, id:1234}, 
        {message:"jfk", priority: 3, id:1234}]} 
    />)
    expect(getByTestId("Box"))
  })
})