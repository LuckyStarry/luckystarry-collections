/* tslint:disable */
import { expect } from 'chai'
import uuid from 'uuid'
import { Dictionary } from '../src/dictionary'
import { EqualityComparer } from '../src/equality-comparer'
import { KeyValuePair } from '../src/key-value-pair'
import { List } from '../src/list'

describe('./dictionary.ts', function () {
  it('存在 Class Dictionary', function () {
    expect(Dictionary).not.null
    expect(Dictionary).not.undefined
    expect(typeof Dictionary).to.equal('function')
  })

  it('Dictionary 可使用无参构造函数', function () {
    let dictionary = new Dictionary()
    expect(dictionary.Count()).is.equal(0)
  })

  it('Dictionary 可使用容量构造函数 (0)', function () {
    let dictionary = new Dictionary(0)
    expect(dictionary.Count()).is.equal(0)
  })

  it('Dictionary 可使用容量构造函数 (2)', function () {
    let dictionary = new Dictionary(2)
    expect(dictionary.Count()).is.equal(0)
  })

  it('Dictionary 可使用容量构造函数 (3)', function () {
    let dictionary = new Dictionary(3)
    expect(dictionary.Count()).is.equal(0)
  })

  it('Dictionary 可使用容量构造函数 (7199369 + 1)', function () {
    this.slow()
    let dictionary = new Dictionary(7199369 + 1)
    expect(dictionary.Count()).is.equal(0)
  })

  it('Dictionary 可使用容量构造函数 (-1) => throw', function () {
    expect(() => {
      new Dictionary(-1)
    }).to.throw('capacity 小于 0')
  })

  it('Dictionary 可使用 Map 构造函数', function () {
    let original = new Map()
    original.set(1, 2)
    original.set(2, 3)
    let dictionary = new Dictionary(original)
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get(1)).is.equal(2)
    expect(dictionary.Get(2)).is.equal(3)
  })

  it('Dictionary 可使用 IEnumerable 构造函数', function () {
    let map = new Map()
    map.set(1, 2)
    map.set(2, 3)
    let original = new Dictionary(map)
    let dictionary = new Dictionary(original)
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get(1)).is.equal(2)
    expect(dictionary.Get(2)).is.equal(3)
  })

  it('Dictionary.Set 可正常覆盖', function () {
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

  it('Dictionary.Set 可正常扩容', function () {
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

  it('Dictionary.Set 可正常扩容', function () {
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

  it('Dictionary.Set 随机设置Key-Value测试（100组）', function () {
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

  it('Dictionary.Set 随机设置Key-Value测试（+100 -30 +150 -200）', function () {
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

  it('Dictionary.Add 有相同Key时报错', function () {
    let original = new Map()
    original.set(1, 2)
    original.set(2, 3)
    let dictionary = new Dictionary(original)
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get(1)).is.equal(2)
    expect(dictionary.Get(2)).is.equal(3)

    expect(() => dictionary.Add(2, 300)).to.throw('已经存在相同的Key')
  })

  it('Dictionary.Get Key存在时正常', function () {
    let original = new Map()
    original.set('KEY_01', 2)
    original.set('KEY_02', 3)
    let dictionary = new Dictionary(original)
    expect(dictionary.Get('KEY_01')).is.equal(2)
    expect(dictionary.Get('KEY_02')).is.equal(3)
  })

  it('Dictionary.Get Key不存在时异常', function () {
    let original = new Map()
    original.set('KEY_01', 2)
    original.set('KEY_02', 3)
    let dictionary = new Dictionary(original)

    expect(() => dictionary.Get('KEY_03')).to.throw('不存在的Key')
  })

  it('Dictionary.ContainsKey 空字典返回 false', function () {
    let dictionary = new Dictionary()
    expect(dictionary.Count()).is.equal(0)
    expect(dictionary.ContainsKey('KEY_03')).is.false
    expect(dictionary.Count()).is.equal(0)
  })

  it('Dictionary.ContainsKey 不存在返回 false', function () {
    let dictionary = new Dictionary()
    dictionary.Set('KEY_01', 100)
    dictionary.Set('KEY_02', 200)
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get('KEY_01')).is.equal(100)
    expect(dictionary.Get('KEY_02')).is.equal(200)
    expect(dictionary.ContainsKey('KEY_03')).is.false
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get('KEY_01')).is.equal(100)
    expect(dictionary.Get('KEY_02')).is.equal(200)
  })

  it('Dictionary.ContainsKey 存在返回 true', function () {
    let dictionary = new Dictionary()
    dictionary.Set('KEY_01', 100)
    dictionary.Set('KEY_02', 200)
    dictionary.Set('KEY_03', 300)
    expect(dictionary.Count()).is.equal(3)
    expect(dictionary.Get('KEY_01')).is.equal(100)
    expect(dictionary.Get('KEY_02')).is.equal(200)
    expect(dictionary.Get('KEY_03')).is.equal(300)
    expect(dictionary.ContainsKey('KEY_02')).is.true
    expect(dictionary.Count()).is.equal(3)
    expect(dictionary.Get('KEY_01')).is.equal(100)
    expect(dictionary.Get('KEY_02')).is.equal(200)
    expect(dictionary.Get('KEY_03')).is.equal(300)
  })

  it('Dictionary.Clear 空字典正常', function () {
    let dictionary = new Dictionary()
    expect(dictionary.Count()).is.equal(0)
    dictionary.Clear()
    expect(dictionary.Count()).is.equal(0)
  })

  it('Dictionary.Clear 有数据的字典正常', function () {
    let dictionary = new Dictionary()
    dictionary.Set('KEY_01', 100)
    dictionary.Set('KEY_02', 200)
    expect(dictionary.Count()).is.equal(2)
    dictionary.Clear()
    expect(dictionary.Count()).is.equal(0)
  })

  it('Dictionary.Remove 空字典返回 false', function () {
    let dictionary = new Dictionary()
    expect(dictionary.Count()).is.equal(0)
    expect(dictionary.Remove('KEY_01')).is.false
    expect(dictionary.Count()).is.equal(0)
  })

  it('Dictionary.Remove 不存在返回 false', function () {
    let dictionary = new Dictionary()
    dictionary.Set('KEY_01', 100)
    dictionary.Set('KEY_02', 200)
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get('KEY_01')).is.equal(100)
    expect(dictionary.Get('KEY_02')).is.equal(200)
    expect(dictionary.Remove('KEY_03')).is.false
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get('KEY_01')).is.equal(100)
    expect(dictionary.Get('KEY_02')).is.equal(200)
  })

  it('Dictionary.Remove 存在删除正常返回 true', function () {
    let dictionary = new Dictionary()
    dictionary.Set('KEY_01', 100)
    dictionary.Set('KEY_02', 200)
    dictionary.Set('KEY_03', 300)
    expect(dictionary.Count()).is.equal(3)
    expect(dictionary.Get('KEY_01')).is.equal(100)
    expect(dictionary.Get('KEY_02')).is.equal(200)
    expect(dictionary.Get('KEY_03')).is.equal(300)
    expect(dictionary.Remove('KEY_02')).is.true
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get('KEY_01')).is.equal(100)
    expect(dictionary.Get('KEY_03')).is.equal(300)
  })

  it('Dictionary.TryGetValue 不存在返回 [false, undefined]', function () {
    let dictionary = new Dictionary()
    dictionary.Set('KEY_01', 100)
    dictionary.Set('KEY_02', 200)
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get('KEY_01')).is.equal(100)
    expect(dictionary.Get('KEY_02')).is.equal(200)
    let [ok, value] = dictionary.TryGetValue('KEY_03')
    expect(ok).is.false
    expect(value).is.undefined
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get('KEY_01')).is.equal(100)
    expect(dictionary.Get('KEY_02')).is.equal(200)
  })

  it('Dictionary.TryGetValue 存在返回 [true, value]', function () {
    let dictionary = new Dictionary()
    dictionary.Set('KEY_01', 100)
    dictionary.Set('KEY_02', 200)
    dictionary.Set('KEY_03', 300)
    expect(dictionary.Count()).is.equal(3)
    expect(dictionary.Get('KEY_01')).is.equal(100)
    expect(dictionary.Get('KEY_02')).is.equal(200)
    expect(dictionary.Get('KEY_03')).is.equal(300)
    let [ok, value] = dictionary.TryGetValue('KEY_02')
    expect(ok).is.true
    expect(value).is.equal(200)
    expect(dictionary.Count()).is.equal(3)
    expect(dictionary.Get('KEY_01')).is.equal(100)
    expect(dictionary.Get('KEY_02')).is.equal(200)
    expect(dictionary.Get('KEY_03')).is.equal(300)
  })

  it('Dictionary.All 方法正常运作', function () {
    let dictionary = new Dictionary()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)

    expect(dictionary.All((kv) => typeof kv.Key === 'string')).is.true
    expect(dictionary.All((kv) => kv.Value > 0)).is.true
  })

  it('Dictionary.Any 方法正常运作', function () {
    let dictionary = new Dictionary()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)

    expect(dictionary.Any()).is.true
    expect(dictionary.Any((kv) => typeof kv.Key === 'string')).is.true
    expect(dictionary.Any((kv) => kv.Value > 0)).is.true
    expect(dictionary.Any((kv) => kv.Value < 0)).is.false
  })

  it('Dictionary.AsEnumerable 方法正常运作', function () {
    let dictionary = new Dictionary()
    dictionary.Set('KEY_01', 'AAA')
    dictionary.Set('KEY_02', 'BBB')

    let enumerables = dictionary.AsEnumerable()
    expect(enumerables.Any()).is.true
    expect(enumerables.Count()).is.equal(2)
  })

  it('Dictionary.Average 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)

    let average = dictionary.Average((kv) => kv.Value)
    expect(average).is.equal(1.5)
  })

  it('Dictionary.Concat 方法正常运作', function () {
    let left = new Dictionary<string, number>()
    left.Set('KEY_01', 1)
    left.Set('KEY_02', 2)

    let right = new Dictionary<string, number>()
    right.Set('KEY_02', 4)
    right.Set('KEY_03', 5)

    let enumerables = left.Concat(right)

    expect(enumerables.Count()).is.equal(4)
  })

  it('Dictionary.Contains 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)

    let kv1 = new KeyValuePair('KEY_01', 1)
    let kv2 = new KeyValuePair('KEY_03', 3)

    class E extends EqualityComparer<KeyValuePair<string, number>> {
      public Equals(x: KeyValuePair<string, number>, y: KeyValuePair<string, number>): boolean {
        return x.Key === y.Key
      }
    }

    expect(dictionary.Contains(kv1)).is.false
    expect(dictionary.Contains(kv1, new E())).is.true
    expect(dictionary.Contains(kv2)).is.false
  })

  it('Dictionary.Count 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)

    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Count((kv) => kv.Value > 1)).is.equal(1)
    expect(dictionary.Count((kv) => kv.Value > 2)).is.equal(0)
  })

  it('Dictionary.DefaultIfEmpty 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    let enumerables = dictionary.DefaultIfEmpty()

    expect(enumerables).is.not.null
    expect(enumerables).is.not.undefined
    expect(enumerables.Any()).is.false
  })

  it('Dictionary.Distinct 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    let dictincted = dictionary.Distinct()

    expect(dictincted.Count()).is.equal(3)
  })

  it('Dictionary.ElementAt 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    expect(dictionary.ElementAt(0).Key).is.equal('KEY_01')
    expect(dictionary.ElementAt(2).Key).is.equal('KEY_03')
  })

  it('Dictionary.ElementAtOrDefault 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    expect(dictionary.ElementAtOrDefault(new KeyValuePair('DEFAULT', 0), 0).Key).is.equal('KEY_01')
    expect(dictionary.ElementAtOrDefault(new KeyValuePair('DEFAULT', 0), 2).Key).is.equal('KEY_03')
    expect(dictionary.ElementAtOrDefault(new KeyValuePair('DEFAULT', 0), 10).Key).is.equal('DEFAULT')
  })

  it('Dictionary.Except 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)

    let kv1 = new KeyValuePair('KEY_02', 1)
    let kv2 = new KeyValuePair('KEY_03', 3)
    let kv3 = new KeyValuePair('KEY_04', 3)

    class E extends EqualityComparer<KeyValuePair<string, number>> {
      public Equals(x: KeyValuePair<string, number>, y: KeyValuePair<string, number>): boolean {
        return x.Key === y.Key
      }
    }

    let expected = dictionary.Except(new List([kv1, kv2, kv3]), new E())
    expect(expected.Count()).is.equal(1)
    expect(expected.ElementAt(0).Key).is.equal('KEY_01')
  })

  it('Dictionary.First 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    expect(dictionary.First().Key).is.equal('KEY_01')
    expect(dictionary.First((kv) => kv.Value > 2).Value).is.equal(3)
  })

  it('Dictionary.FirstOrDefault 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    expect(dictionary.FirstOrDefault(new KeyValuePair('DEFAULT', 100)).Value).is.equal(1)
    expect(dictionary.FirstOrDefault(new KeyValuePair('DEFAULT', 100), (kv) => kv.Value > 2).Value).is.equal(3)
    expect(dictionary.FirstOrDefault(new KeyValuePair('DEFAULT', 100), (kv) => kv.Value > 3).Value).is.equal(100)
  })

  it('Dictionary.GroupBy 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    dictionary.Set('KEY_04', 1)
    let grouped = dictionary.GroupBy((x) => x.Value)
    expect(grouped.Count()).is.equal(3)
    expect(grouped.ElementAt(0).Key).is.equal(1)
    expect(grouped.ElementAt(0).Count()).is.equal(2)
    expect(grouped.ElementAt(0).ElementAt(0).Key).is.equal('KEY_01')
    expect(grouped.ElementAt(0).ElementAt(1).Key).is.equal('KEY_04')
    expect(grouped.ElementAt(1).Key).is.equal(2)
    expect(grouped.ElementAt(2).Key).is.equal(3)
  })

  it('Dictionary.GroupJoin 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)

    let kv1 = new KeyValuePair('KEY_02', 1)
    let kv2 = new KeyValuePair('KEY_03', 3)
    let kv3 = new KeyValuePair('KEY_04', 3)
    let kv4 = new KeyValuePair('KEY_02', 11)
    let kv5 = new KeyValuePair('KEY_03', 31)

    class E extends EqualityComparer<KeyValuePair<string, number>> {
      public Equals(x: KeyValuePair<string, number>, y: KeyValuePair<string, number>): boolean {
        return x.Key === y.Key
      }
    }

    let grouped = dictionary.GroupJoin(
      new List([kv1, kv2, kv3, kv4, kv5]),
      (x) => x,
      (y) => y,
      (x, ys) => {
        return { Outer: x, Inners: ys }
      },
      new E()
    )
    expect(grouped.Count()).is.equal(3)
    expect(grouped.ElementAt(0).Outer.Key).is.equal('KEY_01')
    expect(grouped.ElementAt(0).Inners.Any()).is.false
    expect(grouped.ElementAt(1).Outer.Key).is.equal('KEY_02')
    expect(grouped.ElementAt(1).Inners.Count()).is.equal(2)
    expect(grouped.ElementAt(1).Inners.ElementAt(0).Value).is.equal(1)
    expect(grouped.ElementAt(1).Inners.ElementAt(1).Value).is.equal(11)
    expect(grouped.ElementAt(2).Outer.Key).is.equal('KEY_03')
    expect(grouped.ElementAt(2).Inners.Count()).is.equal(2)
  })

  it('Dictionary.Intersect 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)

    let kv1 = new KeyValuePair('KEY_02', 1)
    let kv2 = new KeyValuePair('KEY_03', 3)
    let kv3 = new KeyValuePair('KEY_04', 3)
    let kv4 = new KeyValuePair('KEY_02', 11)
    let kv5 = new KeyValuePair('KEY_03', 31)

    class E extends EqualityComparer<KeyValuePair<string, number>> {
      public Equals(x: KeyValuePair<string, number>, y: KeyValuePair<string, number>): boolean {
        return x.Key === y.Key
      }
    }
    let grouped = dictionary.Intersect(new List([kv1, kv2, kv3, kv4, kv5]), new E())
    expect(grouped.Count()).is.equal(2)
    expect(grouped.ElementAt(0).Key).is.equal('KEY_02')
    expect(grouped.ElementAt(1).Key).is.equal('KEY_03')
  })

  it('Dictionary.Join 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)

    let kv1 = new KeyValuePair('KEY_02', 1)
    let kv2 = new KeyValuePair('KEY_03', 3)
    let kv3 = new KeyValuePair('KEY_04', 3)
    let kv4 = new KeyValuePair('KEY_02', 11)
    let kv5 = new KeyValuePair('KEY_03', 31)

    class E extends EqualityComparer<KeyValuePair<string, number>> {
      public Equals(x: KeyValuePair<string, number>, y: KeyValuePair<string, number>): boolean {
        return x.Key === y.Key
      }
    }
    let grouped = dictionary.Join(
      new List([kv1, kv2, kv3, kv4, kv5]),
      (x) => x,
      (y) => y,
      (x, y) => {
        return { Outer: x, Inner: y }
      },
      new E()
    )
    expect(grouped.Count()).is.equal(4)
    expect(grouped.ElementAt(0).Outer.Value).is.equal(2)
    expect(grouped.ElementAt(0).Inner.Value).is.equal(1)
    expect(grouped.ElementAt(1).Outer.Value).is.equal(2)
    expect(grouped.ElementAt(1).Inner.Value).is.equal(11)
    expect(grouped.ElementAt(2).Outer.Value).is.equal(3)
    expect(grouped.ElementAt(2).Inner.Value).is.equal(3)
    expect(grouped.ElementAt(3).Outer.Value).is.equal(3)
    expect(grouped.ElementAt(3).Inner.Value).is.equal(31)
  })

  it('Dictionary.Last 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    expect(dictionary.Last().Key).is.equal('KEY_03')
    expect(dictionary.Last().Value).is.equal(3)
    expect(dictionary.Last((kv) => kv.Value < 3).Key).is.equal('KEY_02')
  })

  it('Dictionary.LastOrDefault 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    expect(dictionary.LastOrDefault(new KeyValuePair('DEFAULT', 100)).Value).is.equal(3)
    expect(dictionary.LastOrDefault(new KeyValuePair('DEFAULT', 100), (item) => item.Value > 2).Value).is.equal(3)
    expect(dictionary.LastOrDefault(new KeyValuePair('DEFAULT', 100), (item) => item.Value > 3).Value).is.equal(100)
  })

  it('Dictionary.Max 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    expect(dictionary.Max((kv) => kv.Value)).is.equal(3)
  })

  it('Dictionary.Min 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    expect(dictionary.Min((kv) => kv.Value)).is.equal(1)
  })

  it('Dictionary.Reverse 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    let reverse = dictionary.Reverse()
    expect(reverse.Count()).is.equal(3)
    expect(reverse.ElementAt(0).Key).is.equal('KEY_03')
    expect(reverse.ElementAt(1).Key).is.equal('KEY_02')
    expect(reverse.ElementAt(2).Key).is.equal('KEY_01')
  })

  it('Dictionary.Select 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    let selected = dictionary.Select((kv) => kv.Value * 2)
    expect(selected.Count()).is.equal(3)
    expect(selected.ElementAt(0)).is.equal(2)
    expect(selected.ElementAt(1)).is.equal(4)
    expect(selected.ElementAt(2)).is.equal(6)
  })

  it('Dictionary.SelectMany 方法正常运作', function () {
    let dictionary = new Dictionary<string, List<number>>()
    dictionary.Set('KEY_01', new List([1]))
    dictionary.Set('KEY_02', new List([2, 5]))
    dictionary.Set('KEY_03', new List([3]))
    let selected = dictionary.SelectMany<number, number>(
      (x) => x.Value,
      (kv, c) => c * 4
    )
    expect(selected.Count()).is.equal(4)
    expect(selected.ElementAt(0)).is.equal(4)
    expect(selected.ElementAt(1)).is.equal(8)
    expect(selected.ElementAt(2)).is.equal(20)
    expect(selected.ElementAt(3)).is.equal(12)
  })

  it('Dictionary.SequenceEqual 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)

    let kv1 = new KeyValuePair('KEY_01', 1)
    let kv2 = new KeyValuePair('KEY_02', 2)
    let kv3 = new KeyValuePair('KEY_03', 3)

    class E extends EqualityComparer<KeyValuePair<string, number>> {
      public Equals(x: KeyValuePair<string, number>, y: KeyValuePair<string, number>): boolean {
        return x.Key === y.Key
      }
    }
    expect(dictionary.SequenceEqual(new List([kv1, kv3, kv2]), new E())).is.false
    expect(dictionary.SequenceEqual(new List([kv1, kv2, kv3]), new E())).is.true
  })

  it('Dictionary.Single 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    expect(dictionary.Single().Key).is.equal('KEY_01')
  })

  it('Dictionary.SingleOrDefault 方法正常运作', function () {
    let dictionary = new Dictionary([])
    expect(dictionary.SingleOrDefault(new KeyValuePair('DEFAULT', 100)).Key).is.equal('DEFAULT')
  })

  it('Dictionary.Skip 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    dictionary.Set('KEY_04', 4)
    dictionary.Set('KEY_05', 5)
    expect(dictionary.Skip(2).Count()).is.equal(3)
    expect(dictionary.Skip(2).ElementAt(0).Value).is.equal(3)
  })

  it('Dictionary.SkipWhile 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    dictionary.Set('KEY_04', 4)
    dictionary.Set('KEY_05', 5)
    expect(dictionary.SkipWhile((kv) => kv.Value > 2).Count()).is.equal(5)
    expect(dictionary.SkipWhile((kv) => kv.Value < 2).Count()).is.equal(4)
    expect(dictionary.SkipWhile((kv) => kv.Value < 1).Count()).is.equal(5)
  })

  it('Dictionary.Sum 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    dictionary.Set('KEY_04', 4)
    dictionary.Set('KEY_05', 5)

    let sum = dictionary.Sum((kv) => kv.Value)
    expect(sum).is.equal(15)
  })

  it('Dictionary.Take 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    dictionary.Set('KEY_04', 4)
    dictionary.Set('KEY_05', 5)
    expect(dictionary.Take(2).Count()).is.equal(2)
    expect(dictionary.Take(2).ElementAt(0).Value).is.equal(1)
  })

  it('Dictionary.TakeWhile 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    dictionary.Set('KEY_04', 4)
    dictionary.Set('KEY_05', 5)
    expect(dictionary.TakeWhile((kv) => kv.Value > 2).Count()).is.equal(0)
    expect(dictionary.TakeWhile((kv) => kv.Value < 2).Count()).is.equal(1)
    expect(dictionary.TakeWhile((kv) => kv.Value < 1).Count()).is.equal(0)
  })

  it('Dictionary.ToArray 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    dictionary.Set('KEY_04', 4)
    dictionary.Set('KEY_05', 5)
    let array = dictionary.ToArray()
    expect(array).is.instanceof(Array)
    expect(array.length).is.equal(5)
    expect(array[0].Value).is.equal(1)
    expect(array[1].Value).is.equal(2)
    expect(array[2].Value).is.equal(3)
  })

  it('Dictionary.ToDictionary 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    dictionary.Set('KEY_04', 4)
    dictionary.Set('KEY_05', 5)
    let dic = dictionary.ToDictionary(
      (x) => x.Key,
      (y) => y.Value * 3
    )
    expect(dic).is.instanceof(Dictionary)
    expect(dic.Count()).is.equal(5)
    expect(dic.Get('KEY_01')).is.equal(3)
    expect(dic.Get('KEY_02')).is.equal(6)
    expect(dic.Get('KEY_03')).is.equal(9)
    expect(dic.Get('KEY_04')).is.equal(12)
    expect(dic.Get('KEY_05')).is.equal(15)
  })

  it('Dictionary.ToList 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    dictionary.Set('KEY_04', 4)
    dictionary.Set('KEY_05', 5)
    let listed = dictionary.ToList()
    expect(listed).is.instanceof(List)
    expect(listed.Count()).is.equal(5)
    expect(listed.Get(0).Value).is.equal(1)
    expect(listed.Get(1).Value).is.equal(2)
    expect(listed.Get(2).Value).is.equal(3)
  })

  it('Dictionary.Union 方法正常运作', function () {
    let left = new Dictionary<string, number>()
    left.Set('KEY_01', 1)
    left.Set('KEY_02', 2)
    left.Set('KEY_03', 3)
    let right = new Dictionary<string, number>()
    right.Set('KEY_04', 4)
    right.Set('KEY_05', 5)
    let enumerables = left.Union(right)
    expect(enumerables.Count()).is.equal(5)
  })

  it('Dictionary.Where 方法正常运作', function () {
    let dictionary = new Dictionary<string, number>()
    dictionary.Set('KEY_01', 1)
    dictionary.Set('KEY_02', 2)
    dictionary.Set('KEY_03', 3)
    dictionary.Set('KEY_04', 1)
    dictionary.Set('KEY_05', 5)
    let filtered = dictionary.Where((kv) => kv.Value >= 2)
    expect(filtered.Count()).is.equal(3)
    expect(filtered.ElementAt(0).Value).is.equal(2)
    expect(filtered.ElementAt(1).Value).is.equal(3)
    expect(filtered.ElementAt(2).Value).is.equal(5)
  })
})
