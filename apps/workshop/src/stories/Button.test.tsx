import { composeStories } from '@storybook/testing-react'
import { render } from '@testing-library/react'

import * as stories from './Button.stories'

const { Primary } = composeStories(stories)

it('render button', () => {
  render(<Primary />)
  expect(1 + 1).toBe(2)
})
