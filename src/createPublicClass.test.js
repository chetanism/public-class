const createPublicClass = require("./createPublicClass").createPublicClass
const publicClass = require("./createPublicClass").publicClass

class Test {
  constructor(private1, private2, public1, public2) {
    this.private1 = private1
    this.private2 = private2
    this.public1 = public1
    this.public2 = public2
  }

  getPrivate1() {
    return this.private1
  }
  getPrivate2() {
    return this.private2
  }
  setPrivate1(value) {
    this.private1 = value
  }
  setPrivate2(value) {
    this.private2 = value
  }

  privateMethod() {
    return this.private1 + this.public1 + this.publicMethod1()
  }

  publicMethod1() {
    return this.public2 + this.private2
  }

  total() {
    return this.privateMethod()
  }
}

const TestClass = createPublicClass(Test, [
  "public1",
  "public2",
  "getPrivate1",
  "getPrivate2",
  "setPrivate1",
  "setPrivate2",
  "publicMethod1",
  "total"
])

describe("createPublicClass", () => {
  let t
  beforeEach(() => (t = new TestClass(1, 2, 3, 4)))
  afterEach(() => (t = null))

  it("returns a class", () => {
    expect(TestClass).toBeInstanceOf(Function)
  })

  it("doesn't exposes private stuff", () => {
    expect(t.private1).not.toBeDefined()
    expect(t.private2).not.toBeDefined()
    expect(t.privateMethod).not.toBeDefined()
  })

  it("exposes public stuff", () => {
    expect(t.public1).toBeDefined()
    expect(t.public2).toBeDefined()
    expect(t.getPrivate1).toBeInstanceOf(Function)
    expect(t.getPrivate2).toBeInstanceOf(Function)
    expect(t.setPrivate1).toBeInstanceOf(Function)
    expect(t.setPrivate2).toBeInstanceOf(Function)
    expect(t.publicMethod1).toBeInstanceOf(Function)
    expect(t.total).toBeInstanceOf(Function)
  })

  it("exposed public stuff works as expected", () => {
    expect(t.getPrivate1()).toBe(1)
    expect(t.getPrivate2()).toBe(2)

    t.setPrivate1(5)
    t.setPrivate2(6)

    expect(t.getPrivate1()).toBe(5)
    expect(t.getPrivate2()).toBe(6)

    expect(t.public1).toBe(3)
    expect(t.public2).toBe(4)

    t.public1 = 7
    t.public2 = 8

    expect(t.publicMethod1()).toBe(14)
    expect(t.total()).toBe(26)
  })
})

describe("publicClass", () => {
  it("works as expected", () => {
    expect(publicClass).toBeInstanceOf(Function)

    const classCreator = publicClass(["public1", "getPrivate1", "setPrivate1"])
    expect(classCreator).toBeInstanceOf(Function)

    const TestClass2 = classCreator(Test)
    expect(TestClass2).toBeInstanceOf(Function)

    const t = new TestClass2(1, 2, 3, 4)

    expect(t.private1).not.toBeDefined()
    expect(t.private2).not.toBeDefined()
    expect(t.public1).toBe(3)

    expect(t.getPrivate1()).toBe(1)
    t.setPrivate1(6)
    expect(t.getPrivate1()).toBe(6)
  })
})
