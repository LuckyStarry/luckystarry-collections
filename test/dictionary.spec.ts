/* tslint:disable */
import { expect } from 'chai'
import { Dictionary } from '../src/dictionary'
import uuid from 'uuid'

describe('./dictionary.ts', function() {
  it('存在 Class Dictionary', function() {
    expect(Dictionary).not.null
    expect(Dictionary).not.undefined
    expect(typeof Dictionary).to.equal('function')
  })

  it('Dictionary 可使用无参构造函数', function() {
    let dictionary = new Dictionary()
    expect(dictionary.Count()).is.equal(0)
  })

  it('Dictionary 可使用 Map 构造函数', function() {
    let original = new Map()
    original.set(1, 2)
    original.set(2, 3)
    let dictionary = new Dictionary(original)
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get(1)).is.equal(2)
    expect(dictionary.Get(2)).is.equal(3)
  })

  it('Dictionary 可使用 IEnumerable 构造函数', function() {
    let map = new Map()
    map.set(1, 2)
    map.set(2, 3)
    let original = new Dictionary(map)
    let dictionary = new Dictionary(original)
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get(1)).is.equal(2)
    expect(dictionary.Get(2)).is.equal(3)
  })

  it('Dictionary.Set 可正常覆盖', function() {
    let original = new Map()
    original.set(1, 2)
    original.set(2, 3)
    let dictionary = new Dictionary(original)
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get(1)).is.equal(2)
    expect(dictionary.Get(2)).is.equal(3)

    dictionary.Set(2, 300)
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get(2)).is.equal(300)
  })

  it('Dictionary.Set 可正常扩容', function() {
    let original = new Map()
    original.set(1, 'AAA')
    original.set(2, 'BBB')
    let dictionary = new Dictionary(original)
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get(1)).is.equal('AAA')
    expect(dictionary.Get(2)).is.equal('BBB')

    dictionary.Set(3, 'CCC')
    expect(dictionary.Count()).is.equal(3)
    expect(dictionary.Get(3)).is.equal('CCC')

    dictionary.Set(4, 'DDD')
    dictionary.Set(5, 'EEE')
    dictionary.Set(6, 'FFF')
    dictionary.Set(7, 'GGG')
    dictionary.Set(8, 'HHH')
    expect(dictionary.Count()).is.equal(8)
    expect(dictionary.Get(8)).is.equal('HHH')
  })

  it('Dictionary.Set 可正常扩容', function() {
    let original = new Map()
    original.set(1, 'AAA')
    original.set(2, 'BBB')
    let dictionary = new Dictionary(original)
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get(1)).is.equal('AAA')
    expect(dictionary.Get(2)).is.equal('BBB')

    dictionary.Set(3, 'CCC')
    expect(dictionary.Count()).is.equal(3)
    expect(dictionary.Get(3)).is.equal('CCC')

    dictionary.Set(4, 'DDD')
    dictionary.Set(5, 'EEE')
    dictionary.Set(6, 'FFF')
    dictionary.Set(7, 'GGG')
    dictionary.Set(8, 'HHH')
    expect(dictionary.Count()).is.equal(8)
    expect(dictionary.Get(8)).is.equal('HHH')
  })

  it('Dictionary.Set 随机设置Key-Value测试（100组）', function() {
    let length = 100
    let keys = []
    let values = []
    for (let i = 0; i < length; i++) {
      keys.push(uuid())
      values.push(uuid())
    }
    let dictionary = new Dictionary()
    for (let i = 0; i < length; i++) {
      let key = keys[i]
      let value = values[i]
      dictionary.Set(key, value)
    }

    expect(dictionary.Count()).is.equal(length)

    for (let i = 0; i < length; i++) {
      let key = keys[i]
      let value = values[i]
      expect(dictionary.Get(key)).is.equal(value)
    }
  })

  it('Dictionary.Set 随机设置Key-Value测试（+100 -30 +150 -200）', function() {
    let length = 100
    let keys = []
    let values = []
    for (let i = 0; i < length; i++) {
      keys.push(uuid())
      values.push(uuid())
    }
    let dictionary = new Dictionary()
    for (let i = 0; i < length; i++) {
      let key = keys[i]
      let value = values[i]
      dictionary.Set(key, value)
    }

    expect(dictionary.Count()).is.equal(length)

    for (let i = 0; i < length; i++) {
      let key = keys[i]
      let value = values[i]
      expect(dictionary.Get(key)).is.equal(value)
    }

    for (let i = 0; i < 30; i++) {
      let key = keys[i]
      expect(dictionary.Remove(key)).is.true
    }

    expect(dictionary.Count()).is.equal(length - 30)

    keys = keys.slice(30)
    values = values.slice(30)

    for (let i = 0; i < length - 30; i++) {
      let key = keys[i]
      let value = values[i]
      expect(dictionary.Get(key)).is.equal(value)
    }

    for (let i = 0; i < 150; i++) {
      let key = uuid()
      let value = uuid()
      keys.push(key)
      values.push(value)
      dictionary.Set(key, value)
    }

    expect(dictionary.Count()).is.equal(length - 30 + 150)

    for (let i = 0; i < 200; i++) {
      let key = keys[i]
      expect(dictionary.Remove(key)).is.true
    }

    expect(dictionary.Count()).is.equal(length - 30 + 150 - 200)

    keys = keys.slice(200)
    values = values.slice(200)

    for (let i = 0; i < length - 30 + 150 - 200; i++) {
      let key = keys[i]
      let value = values[i]
      expect(dictionary.Get(key)).is.equal(value)
    }
  })
})
