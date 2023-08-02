import '@testing-library/jest-dom'

import { setProjectAnnotations } from '@storybook/testing-react'

import globalStorybookConfig from './.storybook/preview'

setProjectAnnotations(globalStorybookConfig)
