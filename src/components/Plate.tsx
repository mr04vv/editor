import React, { useState, useMemo } from 'react'
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { withHistory } from 'slate-history'

const PlainTextExample = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue)
  const editor = useMemo(() => withHistory(withReact(createEditor() as ReactEditor)), [])
  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable placeholder="Enter some plain text..." />
    </Slate>
  )
}

const initialValue: Descendant[] = [
  {
    children: [
      { text: 'This is editable plain text, just like a <textarea>!' },
    ],
  },
]

export default PlainTextExample