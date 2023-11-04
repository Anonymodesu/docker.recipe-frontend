import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App'

test('Renders basic components', async () => {
  render(<App />)
  const basicComponents = ['Reset', 'Recipes', 'Ingredients']

  for (const componentText of basicComponents) {
    const component = await screen.findByText(componentText)
    expect(component).toBeInTheDocument()
  }
})

test('Standard workflow', async () => {
  const user = userEvent.setup()
  render(<App />)

  const recipeButtons = await Promise.all([
    screen.findByText('Avocado Salmon Toast'),
    screen.findByText('Bacon and Egg Roll'),
    screen.findByText('Freyas special egg bread')
  ])
  for (const recipeButton of recipeButtons) {
    expect(recipeButton).toHaveStyle({ color: 'black' })
    await user.click(recipeButton)
    expect(recipeButton).toHaveStyle({ color: 'red' })
  }

  // Not an exhaustive list of recipes
  const expectedIngredients: Record<string, number> = {
    Avocado: 2,
    Bread: 3,
    Egg: 2,
    Yoghurt: 1
  }

  const ingredientButtons: HTMLElement[] = []
  for (const ingredient in expectedIngredients) {
    const numIngredients = expectedIngredients[ingredient]
    const ingredientsButton = await screen.findByText(`${ingredient}: ${numIngredients}`)
    ingredientButtons.push(ingredientsButton)

    expect(ingredientsButton).toHaveStyle({ textDecoration: 'initial' })
    await user.click(ingredientsButton)
    expect(ingredientsButton).toHaveStyle({ textDecoration: 'line-through' })
    await user.click(ingredientsButton)
    expect(ingredientsButton).toHaveStyle({ textDecoration: 'initial' })
  }

  const resetButton = await screen.findByText('Reset')
  await user.click(resetButton)
  for (const recipeButton of recipeButtons) {
    expect(recipeButton).toHaveStyle({ color: 'black' })
  }
  for (const ingredientsButton of ingredientButtons) {
    expect(ingredientsButton).not.toBeInTheDocument()
  }
})
