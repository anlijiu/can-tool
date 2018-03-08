export class Message extends Object {
    constructor() {
      super()
      Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class Signal extends Object {
    constructor() {
      super()
      Object.setPrototypeOf(this, new.target.prototype);
    }
}
