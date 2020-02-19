
let log = console.log

/**
 * Proxied
 */
let my = {}
let proxy = new Proxy(my, {})

proxy.getId = () => {
  return Math.ceil(Math.random() * 10)
}

log(my.getId())

for (key in proxy) log(key)

/**
 * Validation
 */
let numbers
numbers = new Proxy([1, 2, 3], {
  get(target, prop) {
    if (prop in target) {
      return target[prop]
    }
    return 0
  },
})

log(numbers[2])
log(numbers[10])

numbers = new Proxy([], {
  set(target, prop, val) {
    if (typeof val == 'number') {
      target[prop] = val
      return true
    }
    return false
  }
})

const lokAtMeGo = () => {
  try {
    numbers.push(10)
    numbers.push("test")
  } catch (err) { log(err.message) }
  log(numbers)
}
lokAtMeGo()

/**
 * Hide fields
 */
let user = {
  name: 'joni',
  age: 12,
  password: 'asdasd',
}

user = new Proxy(user, {
  ownKeys(target) {
    return Object.keys(target).filter(key => key !== 'password')
  }
})
log(Object.keys(user))

user = new Proxy(user, {
  ownKeys() { return ['a', 'b', 'c'] },
  getOwnPropertyDescriptor() {
    return {
      enumerable: true,
      configurable: true,
    }
  }
})

console.log(Object.keys(user))


let interval = {
  start: 10,
  end: 20,
}

let range = new Proxy(interval, {
  has(target, prop) {
    return prop >= target.start && prop < target.end
  }
})

log(5 in range)
log(15 in range)

