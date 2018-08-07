function initProxy(obj, publicItems, proxyObj) {
  for (const item of publicItems) {
    if (!Reflect.has(obj, item)) {
      throw new Error(`Invalid property name: '${item}' provided.`)
    }

    const objItem = obj[item]

    if (objItem instanceof Function) {
      proxyObj[item] = objItem.bind(obj)
    } else {
      Reflect.defineProperty(proxyObj, item, {
        enumerable: true,
        get: () => obj[item],
        set: value => (obj[item] = value)
      })
    }
  }

  return proxyObj
}

function createPublicClass(Klass, publicItems) {
  return function(...args) {
    const obj = new Klass(...args)
    initProxy(obj, publicItems, this)
  }
}

function publicClass(publicItems) {
  return function(Klass) {
    return createPublicClass(Klass, publicItems)
  }
}

module.exports = {
  createPublicClass,
  publicClass
}
