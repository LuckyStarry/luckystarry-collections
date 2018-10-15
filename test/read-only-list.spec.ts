/* tslint:disable */
import { expect } from 'chai'
import { EqualityComparer } from '../src/equality-comparer'
import { ReadOnlyList } from '../src/read-only-list'
import { Dictionary } from '../src/dictionary'
import { List } from '../src/list'

describe('./read-only-list.ts', function() {
  it('存在 Class ReadOnlyList', function() {
    expect(ReadOnlyList).not.null
    expect(ReadOnlyList).not.undefined
    expect(typeof ReadOnlyList).to.equal('function')
  })

  it('ReadOnlyList 可使用 List 构造函数', function() {
    let original = [1, 2, 3, 4, 5]
    let list = new ReadOnlyList(new List(original))
    expect(list.Count()).is.equal(5)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
    expect(list.Get(2)).is.equal(3)
    expect(list.Get(3)).is.equal(4)
    expect(list.Get(4)).is.equal(5)
  })

  it('ReadOnlyList 不可使用 null 构造函数', function() {
    expect(() => {
      new ReadOnlyList(null)
    }).to.throw('参数 list 不可为空')
  })

  it('ReadOnlyList 不可使用 undefined 构造函数', function() {
    expect(() => {
      new ReadOnlyList(undefined)
    }).to.throw('参数 list 不可为空')
  })

  it('ReadOnlyList.IsReadOnly => true', function() {
    let original = new List([1, 2, 3, 4, 5])
    expect(original.IsReadOnly).is.false
    let list = new ReadOnlyList(original)
    expect(list.IsReadOnly).is.true
  })

  it('ReadOnlyList.Add => throw', function() {
    let original = new List([1, 2, 3, 4, 5])
    let list = new ReadOnlyList(original)
    expect(list.Count()).is.equal(5)
    expect(() => {
      list.Add(6)
    }).to.throw('不可向只读列表中写入数据')
    expect(list.Count()).is.equal(5)
  })

  it('ReadOnlyList.Set => throw', function() {
    let original = new List([1, 2, 3, 4, 5])
    let list = new ReadOnlyList(original)
    expect(list.Get(0)).is.equal(1)
    expect(() => {
      list.Set(0, 6)
    }).to.throw('不可向只读列表中写入数据')
    expect(list.Get(0)).is.equal(1)
  })

  it('ReadOnlyList.Get 下标范围外异常', function() {
    let original = new List([2, 3, 4, 5])
    let list = new ReadOnlyList(original)
    expect(() => {
      list.Get(-1)
    }).to.throw(`参数 index 的范围越界 ${-1}`)
    expect(() => {
      list.Get(5)
    }).to.throw(`参数 index 的范围越界 ${5}`)
  })

  it('ReadOnlyList.Clear => throw', function() {
    let original = new List([1, 2, 3, 4, 5])
    let list = new ReadOnlyList(original)
    expect(list.Count()).is.equal(5)
    expect(() => {
      list.Clear()
    }).to.throw('不可清空只读列表')
    expect(list.Count()).is.equal(5)
  })

  it('ReadOnlyList.CopyTo 空数组正常', function() {
    let original = new List()
    let list = new ReadOnlyList(original)
    let array = []
    list.CopyTo(array, 0)
    expect(array.length).is.equal(0)
  })

  it('ReadOnlyList.CopyTo 有数据的数组正常', function() {
    let original = new List([2, 3, 4, 5])
    let list = new ReadOnlyList(original)
    let array = []
    list.CopyTo(array, 0)
    expect(array.length).is.equal(4)
    expect(array[0]).is.equal(2)
    expect(array[1]).is.equal(3)
    expect(array[2]).is.equal(4)
    expect(array[3]).is.equal(5)
  })

  it('ReadOnlyList.CopyTo 二次Copy正常', function() {
    let original = new List([2, 3, 4, 5])
    let list = new ReadOnlyList(original)
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

  it('ReadOnlyList.IndexOf 元素不存在 => -1', function() {
    let original = new List([2, 3, 4, 5])
    let list = new ReadOnlyList(original)
    expect(list.IndexOf(1)).is.equal(-1)
  })

  it('ReadOnlyList.IndexOf 元素存在 => 下标', function() {
    let original = new List([2, 3, 4, 5])
    let list = new ReadOnlyList(original)
    expect(list.IndexOf(4)).is.equal(2)
  })

  it('ReadOnlyList.Insert => throw', function() {
    let original = new List([1, 2, 3, 4, 5])
    let list = new ReadOnlyList(original)
    expect(list.Get(0)).is.equal(1)
    expect(() => {
      list.Insert(0, 6)
    }).to.throw('不可向只读列表中写入数据')
    expect(list.Get(0)).is.equal(1)
  })

  it('ReadOnlyList.Remove 存在可正常删除返回 true', function() {
    let original = new List([2, 3, 4, 5])
    let list = new ReadOnlyList(original)
    expect(list.Get(0)).is.equal(2)
    expect(() => {
      list.Remove(2)
    }).to.throw('不可从只读列表中删除数据')
    expect(list.Get(0)).is.equal(2)
  })

  it('ReadOnlyList.RemoveAt 下标范围内正常删除', function() {
    let original = new List([2, 3, 4, 5])
    let list = new ReadOnlyList(original)
    expect(list.Get(0)).is.equal(2)
    expect(() => {
      list.RemoveAt(0)
    }).to.throw('不可从只读列表中删除数据')
    expect(list.Get(0)).is.equal(2)
  })

  it('ReadOnlyList.All 方法正常运作', function() {
    let original = new List([1, 2])
    let list = new ReadOnlyList(original)
    expect(list.All(item => item > 0)).is.true
    expect(list.All(item => item > 1)).is.false
  })

  it('ReadOnlyList.Any 方法正常运作', function() {
    let original = new List([1, 2])
    let list = new ReadOnlyList(original)

    expect(list.Any()).is.true
    expect(list.Any(item => item > 0)).is.true
    expect(list.Any(item => item > 1)).is.true
  })

  it('ReadOnlyList.AsEnumerable 方法正常运作', function() {
    let original = new List([1, 2])
    let list = new ReadOnlyList(original)

    let enumerables = list.AsEnumerable()
    expect(enumerables.Any()).is.true
    expect(enumerables.Count()).is.equal(2)
  })

  it('ReadOnlyList.Average 方法正常运作', function() {
    let original = new List([1, 2])
    let list = new ReadOnlyList(original)

    let average = list.Average()
    expect(average).is.equal(1.5)
  })

  it('ReadOnlyList.Concat 方法正常运作', function() {
    let left = new ReadOnlyList(new List([1, 2]))
    let right = new ReadOnlyList(new List([2, 3]))
    let enumerables = left.Concat(right)
    expect(enumerables.Count()).is.equal(4)
  })

  it('ReadOnlyList.Contains 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2]))

    class E extends EqualityComparer<number> {
      public Equals(x: number, y: number): boolean {
        return x === y
      }
    }

    expect(list.Contains(1)).is.true
    expect(list.Contains(2, new E())).is.true
    expect(list.Contains(3)).is.false
  })

  it('ReadOnlyList.Count 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2]))

    expect(list.Count()).is.equal(2)
    expect(list.Count(item => item > 1)).is.equal(1)
    expect(list.Count(item => item > 2)).is.equal(0)
  })

  it('ReadOnlyList.DefaultIfEmpty 方法正常运作', function() {
    let list = new ReadOnlyList(new List())
    let enumerables = list.DefaultIfEmpty()

    expect(enumerables).is.not.null
    expect(enumerables).is.not.undefined
    expect(enumerables.Any()).is.false
  })

  it('ReadOnlyList.Distinct 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    let dictincted = list.Distinct()

    expect(dictincted.Count()).is.equal(3)
  })

  it('ReadOnlyList.ElementAt 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    expect(list.ElementAt(0)).is.equal(1)
    expect(list.ElementAt(2)).is.equal(3)
  })

  it('ReadOnlyList.ElementAtOrDefault 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    expect(list.ElementAtOrDefault(100, 0)).is.equal(1)
    expect(list.ElementAtOrDefault(100, 2)).is.equal(3)
    expect(list.ElementAtOrDefault(100, 10)).is.equal(100)
  })

  it('ReadOnlyList.Except 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    let expected = list.Except(new ReadOnlyList(new List([1, 2])))
    expect(expected.Count()).is.equal(1)
    expect(expected.ElementAt(0)).is.equal(3)
  })

  it('ReadOnlyList.First 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    expect(list.First()).is.equal(1)
    expect(list.First(item => item > 2)).is.equal(3)
  })

  it('ReadOnlyList.FirstOrDefault 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    expect(list.FirstOrDefault(100)).is.equal(1)
    expect(list.FirstOrDefault(100, item => item > 2)).is.equal(3)
    expect(list.FirstOrDefault(100, item => item > 3)).is.equal(100)
  })

  it('ReadOnlyList.GroupBy 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    let grouped = list.GroupBy(x => x)
    expect(grouped.Count()).is.equal(3)
    expect(grouped.ElementAt(0).Key).is.equal(1)
    expect(grouped.ElementAt(0).Count()).is.equal(2)
    expect(grouped.ElementAt(1).Key).is.equal(2)
    expect(grouped.ElementAt(2).Key).is.equal(3)
  })

  it('ReadOnlyList.GroupJoin 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    let grouped = list.GroupJoin(
      new ReadOnlyList(new List([2, 3, 4, 5, 3])),
      x => x,
      y => y
    )
    expect(grouped.Count()).is.equal(5)
    expect(grouped.ElementAt(0).Outer).is.equal(1)
    expect(grouped.ElementAt(0).Inners.Any()).is.false
    expect(grouped.ElementAt(1).Outer).is.equal(2)
    expect(grouped.ElementAt(1).Inners.Count()).is.equal(1)
    expect(grouped.ElementAt(2).Outer).is.equal(3)
    expect(grouped.ElementAt(2).Inners.Count()).is.equal(2)
  })

  it('ReadOnlyList.Intersect 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    let grouped = list.Intersect(new ReadOnlyList(new List([2, 3, 4, 5, 3])))
    expect(grouped.Count()).is.equal(2)
    expect(grouped.ElementAt(0)).is.equal(2)
    expect(grouped.ElementAt(1)).is.equal(3)
  })

  it('ReadOnlyList.Join 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    let grouped = list.Join(
      new ReadOnlyList(new List([2, 3, 4, 5, 3])),
      x => x,
      y => y
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

  it('ReadOnlyList.Last 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    expect(list.Last()).is.equal(2)
    expect(list.Last(item => item > 2)).is.equal(3)
  })

  it('ReadOnlyList.LastOrDefault 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    expect(list.LastOrDefault(100)).is.equal(2)
    expect(list.LastOrDefault(100, item => item > 2)).is.equal(3)
    expect(list.LastOrDefault(100, item => item > 3)).is.equal(100)
  })

  it('ReadOnlyList.Max 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    expect(list.Max()).is.equal(3)
  })

  it('ReadOnlyList.Min 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    expect(list.Min()).is.equal(1)
  })

  it('ReadOnlyList.Reverse 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    let reverse = list.Reverse()
    expect(reverse.Count()).is.equal(5)
    expect(reverse.ElementAt(0)).is.equal(2)
    expect(reverse.ElementAt(1)).is.equal(1)
    expect(reverse.ElementAt(2)).is.equal(3)
    expect(reverse.ElementAt(3)).is.equal(2)
    expect(reverse.ElementAt(4)).is.equal(1)
  })

  it('ReadOnlyList.Select 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    let selected = list.Select(x => x * 2)
    expect(selected.Count()).is.equal(5)
    expect(selected.ElementAt(0)).is.equal(2)
    expect(selected.ElementAt(1)).is.equal(4)
    expect(selected.ElementAt(2)).is.equal(6)
    expect(selected.ElementAt(3)).is.equal(2)
    expect(selected.ElementAt(4)).is.equal(4)
  })

  it('ReadOnlyList.SelectMany 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    let selected = list.SelectMany(
      x => new ReadOnlyList(new List([x])),
      c => c * 2
    )
    expect(selected.Count()).is.equal(5)
    expect(selected.ElementAt(0)).is.equal(2)
    expect(selected.ElementAt(1)).is.equal(4)
    expect(selected.ElementAt(2)).is.equal(6)
    expect(selected.ElementAt(3)).is.equal(2)
    expect(selected.ElementAt(4)).is.equal(4)
  })

  it('ReadOnlyList.SequenceEqual 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    expect(list.SequenceEqual(new ReadOnlyList(new List([2, 3, 4, 5, 3])))).is
      .false
    expect(list.SequenceEqual(new ReadOnlyList(new List([1, 2, 3, 1, 2])))).is
      .true
  })

  it('ReadOnlyList.Single 方法正常运作', function() {
    let list = new ReadOnlyList(new List([2]))
    expect(list.Single()).is.equal(2)
  })

  it('ReadOnlyList.SingleOrDefault 方法正常运作', function() {
    let list = new ReadOnlyList(new List([]))
    expect(list.SingleOrDefault(100)).is.equal(100)
  })

  it('ReadOnlyList.Skip 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    expect(list.Skip(2).Count()).is.equal(3)
    expect(list.Skip(2).ElementAt(0)).is.equal(3)
  })

  it('ReadOnlyList.SkipWhile 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    expect(list.SkipWhile(x => x > 2).Count()).is.equal(5)
    expect(list.SkipWhile(x => x < 2).Count()).is.equal(4)
    expect(list.SkipWhile(x => x < 1).Count()).is.equal(5)
  })

  it('ReadOnlyList.Sum 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2]))

    let sum = list.Sum()
    expect(sum).is.equal(3)
  })

  it('ReadOnlyList.Take 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    expect(list.Take(2).Count()).is.equal(2)
    expect(list.Take(2).ElementAt(0)).is.equal(1)
  })

  it('ReadOnlyList.TakeWhile 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    expect(list.TakeWhile(x => x > 2).Count()).is.equal(0)
    expect(list.TakeWhile(x => x < 2).Count()).is.equal(1)
    expect(list.TakeWhile(x => x < 1).Count()).is.equal(0)
  })

  it('ReadOnlyList.ToArray 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    let array = list.ToArray()
    expect(array).is.instanceof(Array)
    expect(array.length).is.equal(5)
    expect(array[0]).is.equal(1)
    expect(array[1]).is.equal(2)
    expect(array[2]).is.equal(3)
  })

  it('ReadOnlyList.ToDictionary 方法正常运作', function() {
    let list = new ReadOnlyList(new List([3, 1, 2]))
    let dic = list.ToDictionary(x => x, y => y * 3)
    expect(dic).is.instanceof(Dictionary)
    expect(dic.Count()).is.equal(3)
    expect(dic.Get(3)).is.equal(9)
    expect(dic.Get(1)).is.equal(3)
    expect(dic.Get(2)).is.equal(6)
  })

  it('ReadOnlyList.ToList 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    expect(list.Length).is.equal(5)
    let listed = list.ToList()
    expect(listed).is.instanceof(List)
    expect(listed.Count()).is.equal(5)
    expect(listed.Get(0)).is.equal(1)
    expect(listed.Get(1)).is.equal(2)
    expect(listed.Get(2)).is.equal(3)
  })

  it('ReadOnlyList.Union 方法正常运作', function() {
    let left = new ReadOnlyList(new List([1, 2]))
    let right = new ReadOnlyList(new List([2, 3]))
    let enumerables = left.Union(right)
    expect(enumerables.Count()).is.equal(3)
  })

  it('ReadOnlyList.Where 方法正常运作', function() {
    let list = new ReadOnlyList(new List([1, 2, 3, 1, 2]))
    let filtered = list.Where(x => x >= 2)
    expect(filtered.Count()).is.equal(3)
    expect(filtered.ElementAt(0)).is.equal(2)
    expect(filtered.ElementAt(1)).is.equal(3)
    expect(filtered.ElementAt(2)).is.equal(2)
  })
})
