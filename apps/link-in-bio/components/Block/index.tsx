import Link from 'next/link'
import { getRichTextClassName, getYouTubeVideoId } from '@/utils'
import type {
  BookmarkBlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  CalloutBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  ImageBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  ParagraphBlockObjectResponse,
  QuoteBlockObjectResponse,
  RichTextItemResponse,
  TableBlockObjectResponse,
  ToDoBlockObjectResponse,
  ToggleBlockObjectResponse,
  VideoBlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints'
import { TriangleIcon } from 'lucide-react'
import { cn } from 'utils'

import Code from './Code'

function RichText(item: RichTextItemResponse) {
  const className = getRichTextClassName(item)
  return item.href ? (
    <Link
      className={className}
      href={item.href}
      target="_blank"
      rel="noopenner noreferrer"
    >
      <span>{item.plain_text}</span>
    </Link>
  ) : (
    <span className={className}>{item.plain_text}</span>
  )
}

function Bookmark({
  metadata,
  ...block
}: BookmarkBlockObjectResponse & { metadata: Record<string, string> }) {
  const title =
    metadata.title || metadata['og:title'] || metadata['twitter:title']
  const description =
    metadata.description ||
    metadata['og:description'] ||
    metadata['twitter:description']
  const image =
    metadata.image || metadata['og:image'] || metadata['twitter:image']
  return (
    <Link
      href={block.bookmark.url}
      target="_blank"
      rel="noopenner noreferrer"
      className="relative my-5 flex select-none flex-wrap-reverse items-stretch overflow-hidden rounded border text-left no-underline"
    >
      <div className="flex min-h-[106px] flex-[4_1_180px] flex-col gap-1 overflow-hidden px-4 py-3 text-left duration-150 hover:bg-neutral-100">
        <div className="text-sm text-stone-800">{title}</div>
        <div className="flex-1 text-xs text-stone-400">{description}</div>
        <div className="text-xs text-stone-500">{block.bookmark.url}</div>
      </div>
      <div className="relative flex-[1_1_180px]">
        <div className="absolute inset-0">
          <div className="h-full w-full">
            <img
              src={image}
              alt=""
              className="m-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

function BulletedListItem({
  children,
  ...block
}: BulletedListItemBlockObjectResponse & ReactProps) {
  return (
    <li>
      {block.bulleted_list_item.rich_text.map((item, key) => (
        <RichText key={key} {...item} />
      ))}
      {children}
    </li>
  )
}

function Callout(block: CalloutBlockObjectResponse) {
  return (
    <div className="flex items-center gap-2 border py-4 pl-3 pr-4">
      <span>
        {block.callout.icon.type === 'file' && (
          <img
            src={block.callout.icon.file.url}
            alt=""
            className="m-0 h-5 w-5 object-cover"
          />
        )}
        {block.callout.icon.type === 'external' && (
          <img
            src={block.callout.icon.external.url}
            alt=""
            className="m-0 h-5 w-5 object-cover"
          />
        )}
        {block.callout.icon.type === 'emoji' && block.callout.icon.emoji}
      </span>
      <div>
        {block.callout.rich_text.map((item, key) => (
          <RichText {...item} key={key} />
        ))}
      </div>
    </div>
  )
}

function Heading1(block: Heading1BlockObjectResponse) {
  return (
    <h1>
      {block.heading_1.rich_text.map((item, key) => (
        <RichText {...item} key={key} />
      ))}
    </h1>
  )
}

function Heading2(block: Heading2BlockObjectResponse) {
  return (
    <h2>
      {block.heading_2.rich_text.map((item, key) => (
        <RichText {...item} key={key} />
      ))}
    </h2>
  )
}

function Heading3(block: Heading3BlockObjectResponse) {
  return (
    <h3>
      {block.heading_3.rich_text.map((item, key) => (
        <RichText {...item} key={key} />
      ))}
    </h3>
  )
}

function Image(block: ImageBlockObjectResponse) {
  return (
    <figure>
      {block.image.type === 'external' && (
        <img
          src={block.image.external.url}
          alt={block.image.caption[0]?.plain_text || ''}
          className="mx-auto rounded shadow-md"
        />
      )}
      {block.image.type === 'file' && (
        <img
          src={block.image.file.url}
          alt={block.image.caption[0]?.plain_text || ''}
          className="mx-auto rounded shadow-md"
        />
      )}
      <legend className="mt-2 text-center text-sm text-stone-500">
        {block.image.caption.map((item, key) => (
          <RichText {...item} key={key} />
        ))}
      </legend>
    </figure>
  )
}

function NumberedListItem({
  children,
  ...block
}: NumberedListItemBlockObjectResponse & ReactProps) {
  return (
    <li>
      {block.numbered_list_item.rich_text.map((item, key) => (
        <RichText {...item} key={key} />
      ))}
      {children}
    </li>
  )
}

function Paragraph(block: ParagraphBlockObjectResponse) {
  return (
    <p className="whitespace-pre-wrap break-words">
      {block.paragraph.rich_text.map((item, key) => (
        <RichText {...item} key={key} />
      ))}
    </p>
  )
}

function Quote(block: QuoteBlockObjectResponse) {
  return (
    <blockquote>
      {block.quote.rich_text.map((item, key) => (
        <RichText {...item} key={key} />
      ))}
    </blockquote>
  )
}

function Table(block: TableBlockObjectResponse) {
  return (
    <table>
      <thead>
        <tr>
          <th>Heading 1</th>
          <th>Heading 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1, 1</td>
          <td>1, 2</td>
        </tr>
        <tr>
          <td>2, 1</td>
          <td>2, 2</td>
        </tr>
      </tbody>
    </table>
  )
}

function Todo(block: ToDoBlockObjectResponse) {
  return (
    <div
      className={cn('flex items-center gap-2', {
        'text-red-500': block.to_do.color === 'red',
        'text-orange-500': block.to_do.color === 'orange',
        'text-yellow-500': block.to_do.color === 'yellow',
        'text-green-500': block.to_do.color === 'green',
        'text-blue-500': block.to_do.color === 'blue',
        'text-purple-500': block.to_do.color === 'purple',
        'text-pink-500': block.to_do.color === 'pink',
        'text-gray-500': block.to_do.color === 'gray',
        'bg-red-100': block.to_do.color === 'red_background',
        'bg-orange-100': block.to_do.color === 'orange_background',
        'bg-yellow-100': block.to_do.color === 'yellow_background',
        'bg-green-100': block.to_do.color === 'green_background',
        'bg-blue-100': block.to_do.color === 'blue_background',
        'bg-purple-100': block.to_do.color === 'purple_background',
        'bg-pink-100': block.to_do.color === 'pink_background',
        'bg-gray-100': block.to_do.color === 'gray_background'
      })}
    >
      <input
        type="checkbox"
        checked={block.to_do.checked}
        readOnly
        className={cn(
          'relative h-5 w-5 appearance-none rounded border bg-white checked:before:absolute checked:before:left-1.5 checked:before:top-[3px] checked:before:h-2.5 checked:before:w-1.5 checked:before:rotate-45 checked:before:border-b-2 checked:before:border-r-2 checked:before:border-white',
          {
            'border-slate-500 checked:border-blue-500 checked:bg-blue-500':
              block.to_do.color === 'default',
            'border-red-500 checked:bg-red-500':
              block.to_do.color.startsWith('red'),
            'border-orange-500 checked:bg-orange-500':
              block.to_do.color.startsWith('orange'),
            'border-yellow-500 checked:bg-yellow-500':
              block.to_do.color.startsWith('yellow'),
            'border-green-500 checked:bg-green-500':
              block.to_do.color.startsWith('green'),
            'border-blue-500 checked:bg-blue-500':
              block.to_do.color.startsWith('blue'),
            'border-purple-500 checked:bg-purple-500':
              block.to_do.color.startsWith('purple'),
            'border-pink-500 checked:bg-pink-500':
              block.to_do.color.startsWith('pink'),
            'border-gray-500 checked:bg-gray-500':
              block.to_do.color.startsWith('gray')
          }
        )}
      />
      {block.to_do.rich_text.map((item, key) => (
        <RichText {...item} key={key} />
      ))}
    </div>
  )
}

function Toggle({
  children,
  ...block
}: ToggleBlockObjectResponse & ReactProps) {
  return (
    <button className="group block text-left focus:outline-none">
      <div className="inline-flex items-center gap-2">
        <TriangleIcon
          size={16}
          className="rotate-90 duration-150 group-focus:rotate-180"
        />
        <div>
          {block.toggle.rich_text.map((item, key) => (
            <RichText {...item} key={key} />
          ))}
        </div>
      </div>
      {children}
    </button>
  )
}

function Video(block: VideoBlockObjectResponse) {
  if (block.video.type === 'external') {
    const youtubeId = getYouTubeVideoId(block.video.external.url)
    if (youtubeId) {
      return (
        <div className="my-5 flex">
          <div className="relative flex-grow overflow-hidden">
            <div className="relative cursor-pointer">
              <div className="relative">
                <div className="pointer-events-none block w-full">
                  <div className="relative flex h-0 min-h-[100px] w-full justify-center pb-[56.25%]">
                    <div className="absolute left-0 top-0 h-full w-full">
                      <div className="h-full w-full">
                        <div className="pointer-events-auto absolute left-0 top-0 h-full w-full">
                          <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
                            sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
                            allowFullScreen
                            className="pointer-events-auto absolute left-0 top-0 h-full w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  return <></>
}

export {
  Bookmark,
  BulletedListItem,
  Callout,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image,
  NumberedListItem,
  Paragraph,
  Quote,
  Table,
  Todo,
  Toggle,
  Video,
  RichText
}
