import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

test('renders reset button', () => {
  render(<App />)
  const resetButton = screen.findByText(/Reset/i).then(() => {
    expect(resetButton).toBeInTheDocument()
  })
})
