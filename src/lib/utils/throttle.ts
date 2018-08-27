function throttle(fn, time = 500) {
  let lock

  return function (...args) {
    if (!lock) {
      fn.apply(this, args)

      lock = setTimeout(() => {
        lock = null
      }, time)
    }
  }
}