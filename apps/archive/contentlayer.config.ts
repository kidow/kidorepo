import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { codeImport } from 'remark-code-import'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

export const Content = defineDocumentType(() => ({
  name: 'Content',
  filePathPattern: `./**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: false },
    toc: { type: 'boolean', default: true, required: false },
    keywords: { type: 'string', required: false }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/')
    }
  }
}))

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Content],
  mdx: {
    remarkPlugins: [remarkGfm, codeImport],
    rehypePlugins: [
      rehypeSlug,
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children
            if (codeEl.tagName !== 'code') return

            if (codeEl.data?.meta) {
              const regex = /event="([^"]*)"/
              const match = codeEl.data?.meta.match(regex)
              if (match) {
                node.__event = match ? match[1] : null
                codeEl.data.meta = codeEl.data.meta.replace(regex, '')
              }
            }
            node.__rawstring__ = codeEl.children?.[0].value
          }
        })
      },
      rehypeStringify,
      [
        rehypePrettyCode,
        {
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted')
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted']
          }
        }
      ],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'div') {
            if (!('data-rehype-pretty-code-fragment' in node.properties)) return

            const pre = node.children?.at(-1)
            if (pre.tagName !== 'pre') return

            pre.properties['__withmeta__'] = String(
              node.children.at(0).tagName === 'div'
            )
            pre.properties['__rawstring__'] = node.__rawstring__

            if (node.__event__) {
              pre.properties['__event__'] = node.__event__
            }
          }
        })
      },
      () => (tree) => {
        visit(tree, (node) => {
          if (node.type !== 'element' || node?.tagName !== 'pre') return

          // npm install.
          if (node.properties?.['__rawstring__']?.startsWith('npm install')) {
            const npmCommand = node.properties?.['__rawstring__']
            node.properties['__npmcommand__'] = npmCommand
            node.properties['__yarncommand__'] = npmCommand.replace(
              'npm install',
              'yarn add'
            )
            node.properties['__pnpmcommand__'] = npmCommand.replace(
              'npm install',
              'pnpm add'
            )
          }

          // npx create.
          if (node.properties?.['__rawstring__']?.startsWith('npx create-')) {
            const npmCommand = node.properties?.['__rawstring__']
            node.properties['__npmcommand__'] = npmCommand
            node.properties['__yarncommand__'] = npmCommand.replace(
              'npx create-',
              'yarn create '
            )
            node.properties['__pnpmcommand__'] = npmCommand.replace(
              'npx create-',
              'pnpm create '
            )
          }

          // npx.
          if (
            node.properties?.['__rawstring__']?.startsWith('npx') &&
            !node.properties?.['__rawstring__']?.startsWith('npx create-')
          ) {
            const npmCommand = node.properties?.['__rawstring__']
            node.properties['__npmcommand__'] = npmCommand
            node.properties['__yarncommand__'] = npmCommand
            node.properties['__pnpmcommand__'] = npmCommand.replace(
              'npx',
              'pnpm dlx'
            )
          }
        })
      },
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section'
          }
        }
      ]
    ]
  }
})
