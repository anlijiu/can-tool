
export default class DelegatesManager {
  constructor() {
    this.delegates = new Map();
  }

  addDelegate(delegate, component) {
    this.delegates.set(delegate, component)
  }

  getComponent(items, position) {
    let keys = Array.from(this.delegates.keys());
    console.log(keys[0])
    let key = keys.find((element, index, arrays) => { console.log(element); return element.isForViewType(items, position)})
    return this.delegates.get(key)
  }
}
