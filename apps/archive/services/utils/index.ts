import { allContents } from 'contentlayer/generated'
import { toc } from 'mdast-util-toc'
import { remark } from 'remark'
import { visit } from 'unist-util-visit'

export function flattenNode(node) {
  const p = []
  visit(node, (node) => {
    if (!['text', 'emphasis', 'strong', 'inlineCode'].includes(node.type))
      return
    p.push(node.value)
  })
  return p.join(``)
}

export function getItems(node, current): { items?: Item[] } {
  if (!node) {
    return {}
  }

  if (node.type === 'paragraph') {
    visit(node, (item) => {
      if (item.type === 'link') {
        current.url = item.url
        current.title = flattenNode(node)
      }

      if (item.type === 'text') {
        current.title = flattenNode(node)
      }
    })

    return current
  }

  if (node.type === 'list') {
    current.items = node.children.map((i) => getItems(i, {}))

    return current
  } else if (node.type === 'listItem') {
    const heading = getItems(node.children[0], {})

    if (node.children.length > 1) {
      getItems(node.children[1], heading)
    }

    return heading
  }

  return {}
}

export async function getToc(content: string) {
  const result = await remark()
    .use(() => (node, file) => {
      const table = toc(node)
      file.data = getItems(table.map, {})
    })
    .process(content)

  return result.data
}

export function filterContents(
  allLinks: LinkItem['items'],
  title: string
): LinkItem['items'] {
  return allLinks.filter((item) => item.slug?.startsWith(`/${title}`))
}
