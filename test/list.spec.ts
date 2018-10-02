/* tslint:disable */
import { expect } from 'chai'
import { List } from '../src/list'
import { EqualityComparer } from '../src/equality-comparer'

describe('./list.ts', function() {
  it('存在 Class List', function() {
    expect(List).not.null
    expect(List).not.undefined
    expect(typeof List).to.equal('function')
  })

  it('List 可使用无参构造函数', function() {
    let list = new List()
    expect(list.Count()).is.equal(0)
  })

  it('List 可使用 Array 构造函数', function() {
    let original = [1, 2, 3, 4, 5]
    let list = new List(original)
    expect(list.Count()).is.equal(5)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
    expect(list.Get(2)).is.equal(3)
    expect(list.Get(3)).is.equal(4)
    expect(list.Get(4)).is.equal(5)
  })

  it('List 可使用 IEnumerable 构造函数', function() {
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

  it('List.All 方法正常运作', function() {
    let list = new List([1, 2])
    expect(list.All(item => item > 0)).is.true
    expect(list.All(item => item > 1)).is.false
  })

  it('List.Any 方法正常运作', function() {
    let list = new List([1, 2])

    expect(list.Any()).is.true
    expect(list.Any(item => item > 0)).is.true
    expect(list.Any(item => item > 1)).is.true
  })

  it('List.AsEnumerable 方法正常运作', function() {
    let list = new List([1, 2])

    let enumerables = list.AsEnumerable()
    expect(enumerables.Any()).is.true
    expect(enumerables.Count()).is.equal(2)
  })

  it('List.Average 方法正常运作', function() {
    let list = new List([1, 2])

    let average = list.Average()
    expect(average).is.equal(1.5)
  })

  it('List.Concat 方法正常运作', function() {
    let left = new List([1, 2])
    let right = new List([2, 3])
    let enumerables = left.Concat(right)
    expect(enumerables.Count()).is.equal(4)
  })

  it('List.Contains 方法正常运作', function() {
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

  it('List.Count 方法正常运作', function() {
    let list = new List([1, 2])

    expect(list.Count()).is.equal(2)
    expect(list.Count(item => item > 1)).is.equal(1)
    expect(list.Count(item => item > 2)).is.equal(0)
  })

  it('List.DefaultIfEmpty 方法正常运作', function() {
    let list = new List()
    let enumerables = list.DefaultIfEmpty()

    expect(enumerables).is.not.null
    expect(enumerables).is.not.undefined
    expect(enumerables.Any()).is.false
  })

  it('List.Distinct 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    let dictincted = list.Distinct()

    expect(dictincted.Count()).is.equal(3)
  })

  it('List.ElementAt 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.ElementAt(0)).is.equal(1)
    expect(list.ElementAt(2)).is.equal(3)
  })

  it('List.ElementAtOrDefault 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.ElementAtOrDefault(100, 0)).is.equal(1)
    expect(list.ElementAtOrDefault(100, 2)).is.equal(3)
    expect(list.ElementAtOrDefault(100, 10)).is.equal(100)
  })

  it('List.Except 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    let expected = list.Except(new List([1, 2]))
    expect(expected.Count()).is.equal(1)
    expect(expected.ElementAt(0)).is.equal(3)
  })

  it('List.First 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.First()).is.equal(1)
    expect(list.First(item => item > 2)).is.equal(3)
  })

  it('List.FirstOrDefault 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.FirstOrDefault(100)).is.equal(1)
    expect(list.FirstOrDefault(100, item => item > 2)).is.equal(3)
    expect(list.FirstOrDefault(100, item => item > 3)).is.equal(100)
  })

  it('List.GroupBy 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    let grouped = list.GroupBy(x => x)
    expect(grouped.Count()).is.equal(3)
    expect(grouped.ElementAt(0).Key).is.equal(1)
    expect(grouped.ElementAt(0).Count()).is.equal(2)
    expect(grouped.ElementAt(1).Key).is.equal(2)
    expect(grouped.ElementAt(2).Key).is.equal(3)
  })

  it('List.GroupJoin 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    let grouped = list.GroupJoin(new List([2, 3, 4, 5, 3]), x => x, y => y)
    expect(grouped.Count()).is.equal(5)
    expect(grouped.ElementAt(0).Outer).is.equal(1)
    expect(grouped.ElementAt(0).Inners.Any()).is.false
    expect(grouped.ElementAt(1).Outer).is.equal(2)
    expect(grouped.ElementAt(1).Inners.Count()).is.equal(1)
    expect(grouped.ElementAt(2).Outer).is.equal(3)
    expect(grouped.ElementAt(2).Inners.Count()).is.equal(2)
  })

  it('List.Intersect 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    let grouped = list.Intersect(new List([2, 3, 4, 5, 3]))
    expect(grouped.Count()).is.equal(2)
    expect(grouped.ElementAt(0)).is.equal(2)
    expect(grouped.ElementAt(1)).is.equal(3)
  })

  it('List.Join 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    let grouped = list.Join(new List([2, 3, 4, 5, 3]), x => x, y => y)
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

  it('List.Last 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.Last()).is.equal(2)
    expect(list.Last(item => item > 2)).is.equal(3)
  })

  it('List.LastOrDefault 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.LastOrDefault(100)).is.equal(2)
    expect(list.LastOrDefault(100, item => item > 2)).is.equal(3)
    expect(list.LastOrDefault(100, item => item > 3)).is.equal(100)
  })

  it('List.Max 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.Max()).is.equal(3)
  })

  it('List.Min 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.Min()).is.equal(1)
  })

  it('List.Reverse 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    let reverse = list.Reverse()
    expect(reverse.Count()).is.equal(5)
    expect(reverse.ElementAt(0)).is.equal(2)
    expect(reverse.ElementAt(1)).is.equal(1)
    expect(reverse.ElementAt(2)).is.equal(3)
    expect(reverse.ElementAt(3)).is.equal(2)
    expect(reverse.ElementAt(4)).is.equal(1)
  })

  it('List.Select 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    let selected = list.Select(x => x * 2)
    expect(selected.Count()).is.equal(5)
    expect(selected.ElementAt(0)).is.equal(2)
    expect(selected.ElementAt(1)).is.equal(4)
    expect(selected.ElementAt(2)).is.equal(6)
    expect(selected.ElementAt(3)).is.equal(2)
    expect(selected.ElementAt(4)).is.equal(4)
  })

  it('List.SelectMany 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    let selected = list.SelectMany(x => new List([x]), c => c * 2)
    expect(selected.Count()).is.equal(5)
    expect(selected.ElementAt(0)).is.equal(2)
    expect(selected.ElementAt(1)).is.equal(4)
    expect(selected.ElementAt(2)).is.equal(6)
    expect(selected.ElementAt(3)).is.equal(2)
    expect(selected.ElementAt(4)).is.equal(4)
  })

  it('List.SequenceEqual 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.SequenceEqual(new List([2, 3, 4, 5, 3]))).is.false
    expect(list.SequenceEqual(new List([1, 2, 3, 1, 2]))).is.true
  })

  it('List.Single 方法正常运作', function() {
    let list = new List([2])
    expect(list.Single()).is.equal(2)
  })

  it('List.SingleOrDefault 方法正常运作', function() {
    let list = new List([])
    expect(list.SingleOrDefault(100)).is.equal(100)
  })

  it('List.Skip 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.Skip(2).Count()).is.equal(3)
    expect(list.Skip(2).ElementAt(0)).is.equal(3)
  })

  it('List.SkipWhile 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.SkipWhile(x => x > 2).Count()).is.equal(5)
    expect(list.SkipWhile(x => x < 2).Count()).is.equal(4)
    expect(list.SkipWhile(x => x < 1).Count()).is.equal(5)
  })

  it('List.Sum 方法正常运作', function() {
    let list = new List([1, 2])

    let sum = list.Sum()
    expect(sum).is.equal(3)
  })

  it('List.Take 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.Take(2).Count()).is.equal(2)
    expect(list.Take(2).ElementAt(0)).is.equal(1)
  })

  it('List.TakeWhile 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    expect(list.TakeWhile(x => x > 2).Count()).is.equal(0)
    expect(list.TakeWhile(x => x < 2).Count()).is.equal(1)
    expect(list.TakeWhile(x => x < 1).Count()).is.equal(0)
  })

  it('List.ToArray 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    let array = list.ToArray()
    expect(array).is.instanceof(Array)
    expect(array.length).is.equal(5)
    expect(array[0]).is.equal(1)
    expect(array[1]).is.equal(2)
    expect(array[2]).is.equal(3)
  })

  it('List.ToList 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    let listed = list.ToList()
    expect(listed).is.instanceof(List)
    expect(listed.Count()).is.equal(5)
    expect(listed.Get(0)).is.equal(1)
    expect(listed.Get(1)).is.equal(2)
    expect(listed.Get(2)).is.equal(3)
  })

  it('List.Where 方法正常运作', function() {
    let list = new List([1, 2, 3, 1, 2])
    let filtered = list.Where(x => x >= 2)
    expect(filtered.Count()).is.equal(3)
    expect(filtered.ElementAt(0)).is.equal(2)
    expect(filtered.ElementAt(1)).is.equal(3)
    expect(filtered.ElementAt(2)).is.equal(2)
  })
})
