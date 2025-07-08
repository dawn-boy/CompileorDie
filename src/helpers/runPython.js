function runPython(code, onOutput, onError) {
  if (!window.Sk) {
    onError('Python is not yet loaded')
    return
  }

  window.Sk.pre = 'output'
  window.Sk.configure({
    output: onOutput,
    read: function (filename) {
      if (
        window.Sk.builtinFiles === undefined ||
        window.Sk.builtinFiles['files'][filename] === undefined
      ) {
        throw new Error("File not found: '" + filename + "'")
      }
      return window.Sk.builtinFiles['files'][filename]
    },
  })
  window.Sk.misceval
    .asyncToPromise(() =>
      window.Sk.importMainWithBody('<stdin>', false, code, false)
    )
    .catch(err => {
      onError(err.toString())
    })
}

export default runPython
