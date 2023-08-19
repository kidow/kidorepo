'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components'
import { filterContents } from '@/services'
import Fuse from 'fuse.js'
import {
  BanIcon,
  BookOpenIcon,
  BoxIcon,
  Code2Icon,
  LightbulbIcon,
  SearchIcon,
  SettingsIcon,
  XIcon
} from 'lucide-react'
import { Modal } from 'ui'

interface Props {
  allLinks: LinkItem['items']
}

function CommandMenu({ allLinks }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedSlug, setSelectedSlug] = useState<string>('')
  const { push } = useRouter()

  const links: LinkItem[] = useMemo(() => {
    if (!searchValue) {
      return [
        { title: 'components', items: filterContents(allLinks, 'components') },
        { title: 'hooks', items: filterContents(allLinks, 'hooks') },
        { title: 'utils', items: filterContents(allLinks, 'utils') },
        { title: 'settings', items: filterContents(allLinks, 'settings') },
        { title: 'tips', items: filterContents(allLinks, 'tips') },
        { title: 'wiki', items: filterContents(allLinks, 'wiki') },
        { title: 'error', items: filterContents(allLinks, 'error') },
        { title: 'algorithm', items: filterContents(allLinks, 'algorithm') }
      ]
    }

    const fuse = (list: LinkItem['items']) =>
      new Fuse(list, { keys: ['title', 'slug'], includeScore: true })
        .search(searchValue)
        .filter((item) => item.score <= 0.14)
        .map(({ item }) => item)

    return [
      {
        title: 'components',
        items: fuse(filterContents(allLinks, 'components'))
      },
      { title: 'hooks', items: fuse(filterContents(allLinks, 'hooks')) },
      { title: 'utils', items: fuse(filterContents(allLinks, 'utils')) },
      { title: 'settings', items: fuse(filterContents(allLinks, 'settings')) },
      { title: 'tips', items: fuse(filterContents(allLinks, 'tips')) },
      { title: 'wiki', items: fuse(filterContents(allLinks, 'wiki')) },
      { title: 'error', items: fuse(filterContents(allLinks, 'error')) },
      { title: 'algorithm', items: fuse(filterContents(allLinks, 'algorithm')) }
    ]
  }, [searchValue, allLinks])

  const flatLink: LinkItem['items'] = useMemo(
    () => links.map((item) => item.items).flat(1),
    [links]
  )

  const handleArrowKeys = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        const index = flatLink.findIndex((item) => item.slug === selectedSlug)

        if (e.key === 'ArrowUp') {
          if (index === 0) {
            setSelectedSlug(flatLink[flatLink.length - 1].slug || '')
            document
              .querySelector(
                `[data-slug="${flatLink[flatLink.length - 1].slug}"]`
              )
              ?.scrollIntoView({ block: 'center' })
          } else {
            setSelectedSlug(flatLink[index - 1].slug || '')
            document
              .querySelector(`[data-slug="${flatLink[index - 1].slug}"]`)
              ?.scrollIntoView({ block: 'center' })
          }
        }
        if (e.key === 'ArrowDown') {
          if (index === flatLink.length - 1) {
            setSelectedSlug(flatLink[0].slug || '')
            document
              .querySelector(`[data-slug="${flatLink[0].slug}"]`)
              ?.scrollIntoView({ block: 'center' })
          } else {
            setSelectedSlug(flatLink[index + 1].slug || '')
            document
              .querySelector(`[data-slug="${flatLink[index + 1].slug}"]`)
              ?.scrollIntoView({ block: 'center' })
          }
        }
      }

      if (e.key === 'Enter') {
        e.preventDefault()
        if (selectedSlug) {
          push(selectedSlug)
          setIsOpen(false)
          setSearchValue('')
        }
      }
    },
    [selectedSlug, push, flatLink]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleArrowKeys)
    }
    return () => {
      document.removeEventListener('keydown', handleArrowKeys)
    }
  }, [isOpen, handleArrowKeys])

  useEffect(() => {
    if (isOpen) {
      setSelectedSlug(filterContents(allLinks, 'components')[0]?.slug || '')
    }
  }, [isOpen, allLinks])

  useEffect(() => {
    const handleOpen = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', handleOpen)
    return () => {
      document.removeEventListener('keydown', handleOpen)
    }
  }, [])

  useEffect(() => {
    if (!searchValue) {
      setSelectedSlug('')
    } else if (flatLink[0]?.slug) {
      setSelectedSlug(flatLink[0].slug)
    }
  }, [searchValue, flatLink])
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="dark:hover:bg-neutral-00 inline-flex items-center justify-between gap-4 rounded-md border px-4 py-2 text-sm text-neutral-400 duration-150 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900 dark:hover:text-neutral-300"
      >
        <span className="hidden lg:inline-block">Search Documentation...</span>
        <span className="lg:hidden">Search...</span>
        <kbd className="select-none rounded-md bg-neutral-200 px-1.5 py-0.5 text-[10px] dark:bg-neutral-800">
          <span className="mr-1 text-xs">⌘</span>K
        </kbd>
      </button>

      <Modal.v1
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="max-w-lg"
        padding={false}
      >
        <div className="divide-y rounded-lg border dark:divide-neutral-800 dark:border-neutral-800">
          <div className="flex h-12 items-center gap-2 px-3">
            <SearchIcon className="h-5 w-5 dark:text-neutral-500" />
            <input
              className="flex-1 bg-transparent text-sm outline-none dark:placeholder:text-neutral-700"
              placeholder="Type a command or search..."
              autoFocus
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={() => setSearchValue('')}>
              <XIcon className="h-5 w-5 dark:text-neutral-500" />
            </button>
          </div>
          <div className="h-80 overflow-auto">
            {links.length ? (
              links.map((item) => {
                if (!item.items.length) return null
                return (
                  <div
                    key={item.title}
                    className="px-2 py-1"
                    role="presentation"
                  >
                    <div
                      className="px-2 py-1.5 text-xs capitalize dark:text-neutral-400"
                      aria-hidden="true"
                    >
                      {item.title}
                    </div>
                    <ul role="group" className="text-sm">
                      {item.items.map((subItem, key) => (
                        <li
                          key={key}
                          role="option"
                          aria-selected={subItem.slug === selectedSlug}
                          onClick={() => {
                            push(subItem.slug)
                            setIsOpen(false)
                            setSearchValue('')
                          }}
                          className="search-item flex cursor-pointer items-center gap-2 rounded-md px-2 py-3 aria-selected:bg-neutral-800"
                          onMouseEnter={() => setSelectedSlug(subItem.slug)}
                        >
                          {item.title === 'components' && (
                            <BoxIcon className="h-5 w-5 dark:text-neutral-300" />
                          )}
                          {item.title === 'hooks' && (
                            <Icon.Hook className="h-5 w-5 dark:text-neutral-300" />
                          )}
                          {item.title === 'utils' && (
                            <Icon.Wrench className="h-5 w-5 dark:text-neutral-300" />
                          )}
                          {item.title === 'settings' && (
                            <SettingsIcon className="h-5 w-5 dark:text-neutral-300" />
                          )}
                          {item.title === 'tips' && (
                            <LightbulbIcon className="h-5 w-5 dark:text-neutral-200" />
                          )}
                          {item.title === 'wiki' && (
                            <BookOpenIcon className="h-5 w-5 dark:text-neutral-200" />
                          )}
                          {item.title === 'error' && (
                            <BanIcon className="h-5 w-5 dark:text-neutral-200" />
                          )}
                          {item.title === 'algorithms' && (
                            <Code2Icon className="h-5 w-5 dark:text-neutral-200" />
                          )}
                          <div
                            data-slug={subItem.slug}
                            className="flex-1 dark:text-neutral-300"
                          >
                            {subItem.title}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })
            ) : (
              <div className="flex h-full items-center justify-center text-sm">
                No results found.
              </div>
            )}
          </div>
        </div>
      </Modal.v1>
    </>
  )
}

export default CommandMenu
