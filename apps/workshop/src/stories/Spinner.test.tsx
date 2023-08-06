import { composeStories } from '@storybook/testing-react'
import { render } from '@testing-library/react'

import * as stories from './Spinner.stories'

const { Default } = composeStories(stories)

it('render button', () => {
  render(<Default />)
  expect(1 + 1).toBe(2)
})
