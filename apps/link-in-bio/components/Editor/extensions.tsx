'use client'

import { InputRule } from '@tiptap/core'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Color } from '@tiptap/extension-color'
import Gapcursor from '@tiptap/extension-gapcursor'
import HardBreak from '@tiptap/extension-hard-break'
import Highlight from '@tiptap/extension-highlight'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import TiptapImage from '@tiptap/extension-image'
import TiptapLink from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextStyle from '@tiptap/extension-text-style'
import TiptapUnderline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { lowlight } from 'lowlight/lib/core'
import { Markdown } from 'tiptap-markdown'

import SlashCommand from './slash-command'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

const CustomImage = TiptapImage.extend({
  //   addProseMirrorPlugins() {
  //     return [UploadImagesPlugin()];
  //   },
})

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-background-color'),
        renderHTML: (attributes) => {
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`
          }
        }
      }
    }
  }
})

export const TiptapExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc list-outside leading-3 -mt-2'
      }
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal list-outside leading-3 -mt-2'
      }
    },
    listItem: {
      HTMLAttributes: {
        class: 'leading-normal -mb-2'
      }
    },
    blockquote: {
      HTMLAttributes: {
        class: 'border-l-4 border-stone-700'
      }
    },
    codeBlock: {
      HTMLAttributes: {
        class:
          'rounded-sm bg-stone-100 p-5 font-mono font-medium text-stone-800'
      }
    },
    code: {
      HTMLAttributes: {
        class:
          'rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-stone-900',
        spellcheck: 'false'
      }
    },
    horizontalRule: false,
    dropcursor: {
      color: '#DBEAFE',
      width: 4
    },
    gapcursor: false
  }),
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {}

            const { tr } = state
            const start = range.from
            const end = range.to

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end)
            )
          }
        })
      ]
    }
  }).configure({
    HTMLAttributes: {
      class: 'mt-4 mb-6 border-t border-stone-300'
    }
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class:
        'text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer'
    }
  }),
  CustomImage.configure({
    allowBase64: true,
    HTMLAttributes: {
      class: 'rounded-lg border border-stone-200'
    }
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return `Heading ${node.attrs.level}`
      }
      return "명령어는 '/' 입력"
    },
    includeChildren: true
  }),
  SlashCommand,
  TiptapUnderline,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: 'not-prose pl-2'
    }
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: 'flex items-start my-4'
    },
    nested: true
  }),
  Markdown.configure({
    html: false,
    transformCopiedText: true
  }),
  CodeBlockLowlight.configure({
    lowlight
  }),
  Gapcursor,
  Table.configure({ resizable: true }),
  TableHeader,
  CustomTableCell,
  TableRow,
  HardBreak.configure({
    keepMarks: false
  })
]
