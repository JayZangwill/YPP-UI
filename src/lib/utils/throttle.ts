function throttle(fn, time = 500) {
  let lock

  return function (this: any, ...args) {
    if (!lock) {
      fn.apply(this, args)

      lock = setTimeout(() => {
        lock = null
      }, time)
    }
  }
}