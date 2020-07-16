/* tslint:disable */
import { expect } from 'chai'
import { Dictionary } from '../src/dictionary'
import { EqualityComparer } from '../src/equality-comparer'
import { List } from '../src/list'
import { ReadOnlyCollection } from '../src/read-only-collection'

describe('./list.ts', function () {
  it('存在 Class List', function () {
    expect(List).not.null
    expect(List).not.undefined
    expect(typeof List).to.equal('function')
  })

  it('List 可使用无参构造函数', function () {
    let list = new List()
    expect(list.Count()).is.equal(0)
  })

  it('List 可使用 Array 构造函数', function () {
    let original = [1, 2, 3, 4, 5]
    let list = new List(original)
    expect(list.Count()).is.equal(5)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
    expect(list.Get(2)).is.equal(3)
    expect(list.Get(3)).is.equal(4)
    expect(list.Get(4)).is.equal(5)
  })

  it('List 可使用 IEnumerable 构造函数', function () {
    let original = new List([1, 2, 3, 4, 5])
    let list = new List(original)
    expect(list.Count()).is.equal(5)
    expect(list).is.not.equal(original)
    expect(list.Get(0)).is.equal(original.Get(0))
    expect(list.Get(1)).is.equal(original.Get(1))
    expect(list.Get(2)).is.equal(original.Get(2))
    expect(list.Get(3)).is.equal(original.Get(3))
    expect(list.Get(4)).is.equal(original.Get(4))
  })

  it('List.IsReadOnly => false', function () {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.IsReadOnly).is.false
  })

  it('List.Add 可正常追加数据', function () {
    let list = new List([1, 2])
    expect(list.Count()).is.equal(2)
    list.Add(10)
    expect(list.Count()).is.equal(3)
    list.Add(20)
    list.Add(30)
    list.Add(40)
    expect(list.Count()).is.equal(6)
  })

  it('List.AddRange 追加空数组正常', function () {
    let list = new List([1, 2])
    expect(list.Count()).is.equal(2)
    list.AddRange([])
    expect(list.Count()).is.equal(2)
  })

  it('List.AddRange 追加非空数组正常', function () {
    let list = new List([1, 2])
    expect(list.Count()).is.equal(2)
    list.AddRange([10, 20, 30, 40])
    expect(list.Count()).is.equal(6)
  })

  it('List.AddRange 追加 null 正常', function () {
    let list = new List([1, 2])
    expect(list.Count()).is.equal(2)
    list.AddRange(null)
    expect(list.Count()).is.equal(2)
  })

  it('List.AddRange 追加 undefined 正常', function () {
    let list = new List([1, 2])
    expect(list.Count()).is.equal(2)
    list.AddRange(undefined)
    expect(list.Count()).is.equal(2)
  })

  it('List.AsReadOnly 生成可读列表正常', function () {
    let list = new List([1, 2])
    let readonly = list.AsReadOnly()
    expect(readonly).is.instanceof(ReadOnlyCollection)
    expect(readonly.Count()).is.equal(2)
  })

  it('List.Exists 功能正常', function () {
    let list = new List([1, 2])
    expect(() => {
      list.Exists(null)
    }).to.throw('参数 match 不可为空')
    expect(() => {
      list.Exists(undefined)
    }).to.throw('参数 match 不可为空')
    expect(list.Exists((x) => x > 0)).is.true
    expect(list.Exists((x) => x < 1)).is.false
    expect(list.Exists((x) => x < 2)).is.true
  })

  it('List.Find 功能正常', function () {
    let list = new List([1, 2])
    expect(() => {
      list.Find(null)
    }).to.throw('参数 match 不可为空')
    expect(() => {
      list.Find(undefined)
    }).to.throw('参数 match 不可为空')
    expect(list.Find((x) => x > 0)).is.equal(1)
    expect(list.Find((x) => x < 1)).is.null
    expect(list.Find((x) => x < 2)).is.equal(1)
    expect(list.Find((x) => x < 3)).is.equal(1)
  })

  it('List.FindAll 功能正常', function () {
    let list = new List([1, 2])
    expect(() => {
      list.FindAll(null)
    }).to.throw('参数 match 不可为空')
    expect(() => {
      list.FindAll(undefined)
    }).to.throw('参数 match 不可为空')
    let items = list.FindAll((x) => x > 0)
    expect(items).is.instanceOf(List)
    expect(items.Count()).is.equal(2)
    expect(list.FindAll((x) => x < 1)).is.not.null
    expect(list.FindAll((x) => x < 1)).is.not.undefined
    expect(list.FindAll((x) => x < 1)).is.instanceOf(List)
    expect(list.FindAll((x) => x < 1).Count()).is.equal(0)
    expect(list.FindAll((x) => x < 2).Count()).is.equal(1)
    expect(list.FindAll((x) => x < 2)).is.instanceOf(List)
    expect(list.FindAll((x) => x < 2).Get(0)).is.equal(1)
  })

  it('List.FindIndex 功能正常', function () {
    let list = new List([1, 2])
    expect(() => {
      list.FindIndex(0, 0, null)
    }).to.throw('参数 match 不可为空')
    expect(() => {
      list.FindIndex(0, 0, undefined)
    }).to.throw('参数 match 不可为空')
    expect(() => {
      list.FindIndex(-1, 0, null)
    }).to.throw('参数 startIndex 的范围越界 -1')
    expect(() => {
      list.FindIndex(2, 0, undefined)
    }).to.throw('参数 startIndex 的范围越界 2')
    expect(() => {
      list.FindIndex(0, -1, null)
    }).to.throw('参数 count 的范围越界 -1')
    expect(() => {
      list.FindIndex(0, 3, undefined)
    }).to.throw('参数 count 的范围越界 3')
    expect(() => {
      list.FindIndex(1, 2, null)
    }).to.throw('参数 startIndex + count 存在异常')

    expect(list.FindIndex(0, 2, (x) => x > 0)).is.equal(0)
    expect(list.FindIndex(1, 1, (x) => x > 0)).is.equal(1)
    expect(list.FindIndex(0, 2, (x) => x < 2)).is.equal(0)
    expect(list.FindIndex(1, 1, (x) => x < 2)).is.equal(-1)
    expect(list.FindIndex(0, 0, (x) => x > 0)).is.equal(-1)
  })

  it('List.FindLast 功能正常', function () {
    let list = new List([1, 2])
    expect(() => {
      list.FindLast(null)
    }).to.throw('参数 match 不可为空')
    expect(() => {
      list.FindLast(undefined)
    }).to.throw('参数 match 不可为空')
    expect(list.FindLast((x) => x > 0)).is.equal(2)
    expect(list.FindLast((x) => x < 1)).is.null
    expect(list.FindLast((x) => x < 2)).is.equal(1)
    expect(list.FindLast((x) => x < 3)).is.equal(2)
  })

  it('List.FindLastIndex 功能正常', function () {
    let list = new List([1, 2])
    expect(() => {
      list.FindLastIndex(0, 0, null)
    }).to.throw('参数 match 不可为空')
    expect(() => {
      list.FindLastIndex(0, 0, undefined)
    }).to.throw('参数 match 不可为空')
    expect(() => {
      list.FindLastIndex(-1, 0, null)
    }).to.throw('参数 startIndex 的范围越界 -1')
    expect(() => {
      list.FindLastIndex(2, 0, undefined)
    }).to.throw('参数 startIndex 的范围越界 2')
    expect(() => {
      list.FindLastIndex(0, -1, null)
    }).to.throw('参数 count 的范围越界 -1')
    expect(() => {
      list.FindLastIndex(0, 3, undefined)
    }).to.throw('参数 count 的范围越界 3')
    expect(() => {
      list.FindLastIndex(1, 2, null)
    }).to.throw('参数 startIndex + count 存在异常')

    expect(list.FindLastIndex(0, 2, (x) => x > 0)).is.equal(0)
    expect(list.FindLastIndex(1, 1, (x) => x > 0)).is.equal(1)
    expect(list.FindLastIndex(0, 2, (x) => x < 2)).is.equal(0)
    expect(list.FindLastIndex(1, 1, (x) => x < 2)).is.equal(-1)
    expect(list.FindLastIndex(0, 0, (x) => x > 0)).is.equal(-1)
  })

  it('List.GetRange 功能正常', function () {
    let list = new List([1, 2, 3, 4, 5, 6, 7])
    expect(() => {
      list.GetRange(-1, 0)
    }).to.throw('参数 index 的范围越界 -1')
    expect(() => {
      list.GetRange(7, 0)
    }).to.throw('参数 index 的范围越界 7')
    expect(() => {
      list.GetRange(0, -1)
    }).to.throw('参数 count 的范围越界 -1')
    expect(() => {
      list.GetRange(0, 8)
    }).to.throw('参数 count 的范围越界 8')
    expect(() => {
      list.GetRange(1, 7)
    }).to.throw('参数 index + count 存在异常')

    let items = list.GetRange(3, 4)
    expect(items).is.instanceOf(List)
    expect(items.Count()).is.equal(4)
    expect(items.Get(0)).is.equal(4)
    expect(items.Get(1)).is.equal(5)
    expect(items.Get(2)).is.equal(6)
    expect(items.Get(3)).is.equal(7)

    items = list.GetRange(1, 2)
    expect(items).is.instanceOf(List)
    expect(items.Count()).is.equal(2)
    expect(items.Get(0)).is.equal(2)
    expect(items.Get(1)).is.equal(3)
  })

  it('List.Set 索引范围内正常赋值', function () {
    let list = new List([1, 2])
    expect(list.Get(0)).is.equal(1)
    list.Set(0, 100)
    expect(list.Get(0)).is.equal(100)
    list.Set(0, 1000)
    expect(list.Get(0)).is.equal(1000)
    list.Set(1, 999)
    expect(list.Get(0)).is.equal(1000)
    expect(list.Get(1)).is.equal(999)
  })

  it('List.Set 索引范围外异常', function () {
    let list = new List([1, 2])
    expect(() => {
      list.Set(-1, 100)
    }).to.throw(`参数 index 的范围越界 ${-1}`)
    expect(() => {
      list.Set(2, 0)
    }).to.throw(`参数 index 的范围越界 ${2}`)
  })

  it('List.Get 下标范围外异常', function () {
    let list = new List([2, 3, 4, 5])
    expect(() => {
      list.Get(-1)
    }).to.throw(`参数 index 的范围越界 ${-1}`)
    expect(() => {
      list.Get(5)
    }).to.throw(`参数 index 的范围越界 ${5}`)
  })

  it('List.Clear 空数组正常', function () {
    let list = new List()
    expect(list.Count()).is.equal(0)
    list.Clear()
    expect(list.Count()).is.equal(0)
  })

  it('List.Clear 有数据的数组正常', function () {
    let list = new List([1, 2, 3, 4, 5])
    expect(list.Count()).is.equal(5)
    list.Clear()
    expect(list.Count()).is.equal(0)
  })

  it('List.CopyTo 空数组正常', function () {
    let list = new List()
    let array = []
    list.CopyTo(array, 0)
    expect(array.length).is.equal(0)
  })

  it('List.CopyTo 有数据的数组正常', function () {
    let list = new List([2, 3, 4, 5])
    let array = []
    list.CopyTo(array, 0)
    expect(array.length).is.equal(4)
    expect(array[0]).is.equal(2)
    expect(array[1]).is.equal(3)
    expect(array[2]).is.equal(4)
    expect(array[3]).is.equal(5)
  })

  it('List.CopyTo 二次Copy正常', function () {
    let list = new List([2, 3, 4, 5])
    let array = []
    list.CopyTo(array, 0)
    expect(array.length).is.equal(4)
    expect(array[0]).is.equal(2)
    expect(array[1]).is.equal(3)
    expect(array[2]).is.equal(4)
    expect(array[3]).is.equal(5)
    list.CopyTo(array, 2)
    expect(array.length).is.equal(6)
    expect(array[0]).is.equal(2)
    expect(array[1]).is.equal(3)
    expect(array[2]).is.equal(2)
    expect(array[3]).is.equal(3)
    expect(array[4]).is.equal(4)
    expect(array[5]).is.equal(5)
  })

  it('List.IndexOf 元素不存在 => -1', function () {
    let list = new List([2, 3, 4, 5])
    expect(list.IndexOf(1)).is.equal(-1)
  })

  it('List.IndexOf 元素存在 => 下标', function () {
    let list = new List([2, 3, 4, 5])
    expect(list.IndexOf(4)).is.equal(2)
  })

  it('List.Insert 下标范围内正常插入', function () {
    let list = new List([2, 3, 4, 5])
    expect(list.Count()).is.equal(4)
    expect(list.Get(0)).is.equal(2)
    list.Insert(0, 1)
    expect(list.Count()).is.equal(5)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
  })

  it('List.Insert 下标范围外异常', function () {
    let list = new List([2, 3, 4, 5])
    expect(() => {
      list.Insert(-1, 100)
    }).to.throw(`参数 index 的范围越界 ${-1}`)
    expect(() => {
      list.Insert(5, 0)
    }).to.throw(`参数 index 的范围越界 ${5}`)
  })

  it('List.Remove 存在可正常删除返回 true', function () {
    let list = new List([2, 3, 4, 5])
    expect(list.Count()).is.equal(4)
    expect(list.Get(0)).is.equal(2)
    expect(list.Get(1)).is.equal(3)
    expect(list.Get(2)).is.equal(4)
    expect(list.Get(3)).is.equal(5)
    expect(list.Remove(3)).is.true
    expect(list.Count()).is.equal(3)
    expect(list.Get(0)).is.equal(2)
    expect(list.Get(1)).is.equal(4)
    expect(list.Get(2)).is.equal(5)
  })

  it('List.Remove 不存在返回 false', function () {
    let list = new List([2, 3, 4, 5])
    expect(list.Count()).is.equal(4)
    expect(list.Get(0)).is.equal(2)
    expect(list.Get(1)).is.equal(3)
    expect(list.Get(2)).is.equal(4)
    expect(list.Get(3)).is.equal(5)
    expect(list.Remove(0)).is.false
    expect(list.Count()).is.equal(4)
    expect(list.Get(0)).is.equal(2)
    expect(list.Get(1)).is.equal(3)
    expect(list.Get(2)).is.equal(4)
    expect(list.Get(3)).is.equal(5)
  })

  it('List.Remove 多个元素一次仅删除一个', function () {
    let list = new List([2, 3, 4, 5, 3])
    expect(list.Count()).is.equal(5)
    expect(list.Get(0)).is.equal(2)
    expect(list.Get(1)).is.equal(3)
    expect(list.Get(2)).is.equal(4)
    expect(list.Get(3)).is.equal(5)
    expect(list.Get(4)).is.equal(3)
    expect(list.Remove(3)).is.true
    expect(list.Count()).is.equal(4)
    expect(list.Get(0)).is.equal(2)
    expect(list.Get(1)).is.equal(4)
    expect(list.Get(2)).is.equal(5)
    expect(list.Get(3)).is.equal(3)
  })

  it('List.RemoveAt 下标范围内正常删除', function () {
    let list = new List([2, 3, 4, 5])
    expect(list.Count()).is.equal(4)
    expect(list.Get(0)).is.equal(2)
    list.RemoveAt(0)
    expect(list.Count()).is.equal(3)
    expect(list.Get(0)).is.equal(3)
  })

  it('List.RemoveAt 下标范围外异常', function () {
    let list = new List([2, 3, 4, 5])
    expect(() => {
      list.RemoveAt(-1)
    }).to.throw(`参数 index 的范围越界 ${-1}`)
    expect(() => {
      list.RemoveAt(5)
    }).to.throw(`参数 index 的范围越界 ${5}`)
  })

  it('List.TrueForAll 功能正常', function () {
    let list = new List([1, 2])
    expect(() => {
      list.TrueForAll(null)
    }).to.throw('参数 match 不可为空')
    expect(() => {
      list.TrueForAll(undefined)
    }).to.throw('参数 match 不可为空')
    expect(list.TrueForAll((x) => x > 0)).is.true
    expect(list.TrueForAll((x) => x < 1)).is.false
    expect(list.TrueForAll((x) => x < 2)).is.false
  })

  it('List.All 方法正常运作', function () {
    let list = new List([1, 2])
    expect(list.All((item) => item > 0)).is.true
    expect(list.All((item) => item > 1)).is.false
  })

  it('List.Any 方法正常运作', function () {
    let list = new List([1, 2])

    expect(list.Any()).is.true
    expect(list.Any((item) => item > 0)).is.true
    expect(list.Any((item) => item > 1)).is.true
  })

  it('List.AsEnumerable 方法正常运作', function () {
    let list = new List([1, 2])

    let enumerables = list.AsEnumerable()
    expect(enumerables.Any()).is.true
    expect(enumerables.Count()).is.equal(2)
  })

  it('List.Average 方法正常运作', function () {
    let list = new List([1, 2])

    let average = list.Average()
    expect(average).is.equal(1.5)
  })

  it('List.Concat 方法正常运作', function () {
    let left = new List([1, 2])
    let right = new List([2, 3])
    let enumerables = left.Concat(right)
    expect(enumerables.Count()).is.equal(4)
  })

  it('List.Contains 方法正常运作', function () {
    let list = new List([1, 2])

    class E extends EqualityComparer<number> {
      public Equals(x: number, y: number): boolean {
        return x === y
      }
    }

    expect(list.Contains(1)).is.true
    expect(list.Contains(2, new E())).is.true
    expect(list.Contains(3)).is.false
  })

  it('List.Count 方法正常运作', function () {
    let list = new List([1, 2])

    expect(list.Count()).is.equal(2)
    expect(list.Count((item) => item > 1)).is.equal(1)
    expect(list.Count((item) => item > 2)).is.equal(0)
  })

  it('List.DefaultIfEmpty 方法正常运作', function () {
    let list = new List()
    let enumerables = list.DefaultIfEmpty()

    expect(enumerables).is.not.null
    expect(enumerables).is.not.undefined
    expect(enumerables.Any()).is.false
  })

  it('List.Distinct 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    let dictincted = list.Distinct()

    expect(dictincted.Count()).is.equal(3)
  })

  it('List.ElementAt 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.ElementAt(0)).is.equal(1)
    expect(list.ElementAt(2)).is.equal(3)
  })

  it('List.ElementAtOrDefault 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.ElementAtOrDefault(100, 0)).is.equal(1)
    expect(list.ElementAtOrDefault(100, 2)).is.equal(3)
    expect(list.ElementAtOrDefault(100, 10)).is.equal(100)
  })

  it('List.Except 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    let expected = list.Except(new List([1, 2]))
    expect(expected.Count()).is.equal(1)
    expect(expected.ElementAt(0)).is.equal(3)
  })

  it('List.First 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.First()).is.equal(1)
    expect(list.First((item) => item > 2)).is.equal(3)
  })

  it('List.FirstOrDefault 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.FirstOrDefault(100)).is.equal(1)
    expect(list.FirstOrDefault(100, (item) => item > 2)).is.equal(3)
    expect(list.FirstOrDefault(100, (item) => item > 3)).is.equal(100)
  })

  it('List.GroupBy 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    let grouped = list.GroupBy((x) => x)
    expect(grouped.Count()).is.equal(3)
    expect(grouped.ElementAt(0).Key).is.equal(1)
    expect(grouped.ElementAt(0).Count()).is.equal(2)
    expect(grouped.ElementAt(1).Key).is.equal(2)
    expect(grouped.ElementAt(2).Key).is.equal(3)
  })

  it('List.GroupJoin 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    let grouped = list.GroupJoin(
      new List([2, 3, 4, 5, 3]),
      (x) => x,
      (y) => y
    )
    expect(grouped.Count()).is.equal(5)
    expect(grouped.ElementAt(0).Outer).is.equal(1)
    expect(grouped.ElementAt(0).Inners.Any()).is.false
    expect(grouped.ElementAt(1).Outer).is.equal(2)
    expect(grouped.ElementAt(1).Inners.Count()).is.equal(1)
    expect(grouped.ElementAt(2).Outer).is.equal(3)
    expect(grouped.ElementAt(2).Inners.Count()).is.equal(2)
  })

  it('List.Intersect 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    let grouped = list.Intersect(new List([2, 3, 4, 5, 3]))
    expect(grouped.Count()).is.equal(2)
    expect(grouped.ElementAt(0)).is.equal(2)
    expect(grouped.ElementAt(1)).is.equal(3)
  })

  it('List.Join 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    let grouped = list.Join(
      new List([2, 3, 4, 5, 3]),
      (x) => x,
      (y) => y
    )
    expect(grouped.Count()).is.equal(4)
    expect(grouped.ElementAt(0).Outer).is.equal(2)
    expect(grouped.ElementAt(0).Inner).is.equal(2)
    expect(grouped.ElementAt(1).Outer).is.equal(3)
    expect(grouped.ElementAt(1).Inner).is.equal(3)
    expect(grouped.ElementAt(2).Outer).is.equal(3)
    expect(grouped.ElementAt(2).Inner).is.equal(3)
    expect(grouped.ElementAt(3).Outer).is.equal(2)
    expect(grouped.ElementAt(3).Inner).is.equal(2)
  })

  it('List.Last 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.Last()).is.equal(2)
    expect(list.Last((item) => item > 2)).is.equal(3)
  })

  it('List.LastOrDefault 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.LastOrDefault(100)).is.equal(2)
    expect(list.LastOrDefault(100, (item) => item > 2)).is.equal(3)
    expect(list.LastOrDefault(100, (item) => item > 3)).is.equal(100)
  })

  it('List.Max 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.Max()).is.equal(3)
  })

  it('List.Min 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.Min()).is.equal(1)
  })

  it('List.Reverse 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    let reverse = list.Reverse()
    expect(reverse.Count()).is.equal(5)
    expect(reverse.ElementAt(0)).is.equal(2)
    expect(reverse.ElementAt(1)).is.equal(1)
    expect(reverse.ElementAt(2)).is.equal(3)
    expect(reverse.ElementAt(3)).is.equal(2)
    expect(reverse.ElementAt(4)).is.equal(1)
  })

  it('List.Select 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    let selected = list.Select((x) => x * 2)
    expect(selected.Count()).is.equal(5)
    expect(selected.ElementAt(0)).is.equal(2)
    expect(selected.ElementAt(1)).is.equal(4)
    expect(selected.ElementAt(2)).is.equal(6)
    expect(selected.ElementAt(3)).is.equal(2)
    expect(selected.ElementAt(4)).is.equal(4)
  })

  it('List.SelectMany 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    let selected = list.SelectMany(
      (x) => new List([x]),
      (c) => c * 2
    )
    expect(selected.Count()).is.equal(5)
    expect(selected.ElementAt(0)).is.equal(2)
    expect(selected.ElementAt(1)).is.equal(4)
    expect(selected.ElementAt(2)).is.equal(6)
    expect(selected.ElementAt(3)).is.equal(2)
    expect(selected.ElementAt(4)).is.equal(4)
  })

  it('List.SequenceEqual 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.SequenceEqual(new List([2, 3, 4, 5, 3]))).is.false
    expect(list.SequenceEqual(new List([1, 2, 3, 1, 2]))).is.true
  })

  it('List.Single 方法正常运作', function () {
    let list = new List([2])
    expect(list.Single()).is.equal(2)
  })

  it('List.SingleOrDefault 方法正常运作', function () {
    let list = new List([])
    expect(list.SingleOrDefault(100)).is.equal(100)
  })

  it('List.Skip 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.Skip(2).Count()).is.equal(3)
    expect(list.Skip(2).ElementAt(0)).is.equal(3)
  })

  it('List.SkipWhile 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.SkipWhile((x) => x > 2).Count()).is.equal(5)
    expect(list.SkipWhile((x) => x < 2).Count()).is.equal(4)
    expect(list.SkipWhile((x) => x < 1).Count()).is.equal(5)
  })

  it('List.Sum 方法正常运作', function () {
    let list = new List([1, 2])

    let sum = list.Sum()
    expect(sum).is.equal(3)
  })

  it('List.Take 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.Take(2).Count()).is.equal(2)
    expect(list.Take(2).ElementAt(0)).is.equal(1)
  })

  it('List.TakeWhile 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.TakeWhile((x) => x > 2).Count()).is.equal(0)
    expect(list.TakeWhile((x) => x < 2).Count()).is.equal(1)
    expect(list.TakeWhile((x) => x < 1).Count()).is.equal(0)
  })

  it('List.ToArray 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    let array = list.ToArray()
    expect(array).is.instanceof(Array)
    expect(array.length).is.equal(5)
    expect(array[0]).is.equal(1)
    expect(array[1]).is.equal(2)
    expect(array[2]).is.equal(3)
  })

  it('List.ToDictionary 方法正常运作', function () {
    let list = new List([3, 1, 2])
    let dic = list.ToDictionary(
      (x) => x,
      (y) => y * 3
    )
    expect(dic).is.instanceof(Dictionary)
    expect(dic.Count()).is.equal(3)
    expect(dic.Get(3)).is.equal(9)
    expect(dic.Get(1)).is.equal(3)
    expect(dic.Get(2)).is.equal(6)
  })

  it('List.ToList 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    let listed = list.ToList()
    expect(listed).is.instanceof(List)
    expect(listed.Count()).is.equal(5)
    expect(listed.Get(0)).is.equal(1)
    expect(listed.Get(1)).is.equal(2)
    expect(listed.Get(2)).is.equal(3)
  })

  it('List.Union 方法正常运作', function () {
    let left = new List([1, 2])
    let right = new List([2, 3])
    let enumerables = left.Union(right)
    expect(enumerables.Count()).is.equal(3)
  })

  it('List.Where 方法正常运作', function () {
    let list = new List([1, 2, 3, 1, 2])
    let filtered = list.Where((x) => x >= 2)
    expect(filtered.Count()).is.equal(3)
    expect(filtered.ElementAt(0)).is.equal(2)
    expect(filtered.ElementAt(1)).is.equal(3)
    expect(filtered.ElementAt(2)).is.equal(2)
  })
})
