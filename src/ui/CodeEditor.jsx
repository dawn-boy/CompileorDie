import { useEffect, useRef, useState } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView, basicSetup } from 'codemirror'
import { python } from '@codemirror/lang-python'
import { autocompletion } from '@codemirror/autocomplete'
import { oneDark } from '@codemirror/theme-one-dark'

function CodeEditor({ code, onChange }) {
  const editorRef = useRef(null)
  const viewRef = useRef(null)

  useEffect(() => {
    if (!editorRef.current) return

    const startState = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        python(),
        autocompletion(),
        oneDark,
        EditorView.lineWrapping,
        EditorView.updateListener.of(update => {
          if (update.docChanged) onChange(update.state.doc.toString())
        }),
      ],
    })

    viewRef.current = new EditorView({
      state: startState,
      parent: editorRef.current,
    })

    return () => {
      viewRef.current.destroy()
    }
  }, [])

  useEffect(() => {
    const newCode = code || ''
    const editor = viewRef.current
    if (editor && editor.state.doc.toString() !== newCode) {
      editor.dispatch({
        changes: { from: 0, to: editor.state.doc.length, insert: newCode },
      })
    }
  }, [code])

  return (
    <div
      ref={editorRef}
      style={{
        border: '1px solid #ccc',
        height: '800px',
        width: '1300px',
        textAlign: 'left',
        borderRadius: '5px',
        overflow: 'auto',
        fontFamily: 'monospace',
        fontSize: '34px',
        fontWeight: 'bold',
        padding: '10px',
        margin: '10px',
        backgroundColor: '#282c34',
        color: '#abb2bf',
      }}
    />
  )
}

export default CodeEditor
