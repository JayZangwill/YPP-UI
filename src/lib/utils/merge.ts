export default function() {
  const target = arguments[0]
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {}

    if (JSON.stringify(source) === '{}') break
    
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop]

        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }

  return target
}