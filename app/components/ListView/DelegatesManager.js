
export default class DelegatesManager {
  constructor() {
    this.delegates = new Map();
  }

  addDelegate(delegate, component) {
    this.delegates.set(delegate, component)
  }

  getComponent(items, position) {
    let keys = Array.from(this.delegates.keys());
    console.log(items, position, "   ")
    console.log(keys[0])
    let key = keys.find((func, index, arrays) => { console.log(func); return func(items, position)})
    console.log(key)
    return this.delegates.get(key)
  }
}
