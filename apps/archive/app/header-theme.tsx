'use client'

import { MoonStarIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Dropdown } from 'ui'

function HeaderTheme() {
  const { setTheme } = useTheme()
  return (
    <Dropdown.v2
      position="bottom-start"
      className="hidden h-6 md:inline-block"
      onClick={(index) => {
        if (index === 0) setTheme('light')
        else if (index === 1) setTheme('dark')
        else if (index === 2) setTheme('system')
      }}
      list={['Light', 'Dark', 'System']}
      trigger={
        <button>
          <MoonStarIcon
            size={24}
            className="text-neutral-500 duration-150 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-50"
          />
        </button>
      }
    />
  )
}

export default HeaderTheme
