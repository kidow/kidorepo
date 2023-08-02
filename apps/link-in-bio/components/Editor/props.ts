import type { EditorProps } from '@tiptap/pm/view'

export const TiptapEditorProps: EditorProps = {
  attributes: {
    class:
      'prose-lg prose-stone dark:prose-invert prose-headings:font-display font-default focus:outline-none max-w-full'
  },
  handleDOMEvents: {
    keydown: (_view, event) => {
      if (['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
        const slashCommand = document.querySelector('#slash-command')
        if (slashCommand) {
          return true
        }
      }
    }
  },
  handlePaste: (view, event) => {
    if (
      event.clipboardData &&
      event.clipboardData.files &&
      event.clipboardData.files[0]
    ) {
      event.preventDefault()
      const file = event.clipboardData.files[0]
      const pos = view.state.selection.from

      console.log('file', file)
      //   startImageUpload(file, view, pos)
      return true
    }
    return false
  },
  handleDrop: (view, event, _slice, moved) => {
    if (
      !moved &&
      event.dataTransfer &&
      event.dataTransfer.files &&
      event.dataTransfer.files[0]
    ) {
      event.preventDefault()
      const file = event.dataTransfer.files[0]
      const coordinates = view.posAtCoords({
        left: event.clientX,
        top: event.clientY
      })

      console.log('file', file)
      //   startImageUpload(file, view, coordinates.pos - 1)
      return true
    }
    return false
  }
}
