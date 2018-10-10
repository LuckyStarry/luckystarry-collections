/* tslint:disable */
import { expect } from 'chai'
import { EqualityComparer } from '../src/equality-comparer'
import { Dictionary } from '../src/dictionary'
import { List } from '../src/list'

describe('./array.ts', function() {
  it('Array.All 方法正常运作', function() {
    let list = [1, 2]
    expect(list.All(item => item > 0)).is.true
    expect(list.All(item => item > 1)).is.false
  })

  it('Array.Any 方法正常运作', function() {
    let list = [1, 2]

    expect(list.Any()).is.true
    expect(list.Any(item => item > 0)).is.true
    expect(list.Any(item => item > 1)).is.true
  })

  it('Array.AsEnumerable 方法正常运作', function() {
    let list = [1, 2]

    let enumerables = list.AsEnumerable()
    expect(enumerables.Any()).is.true
    expect(enumerables.Count()).is.equal(2)
  })

  it('Array.Average 方法正常运作', function() {
    let list = [1, 2]

    let average = list.Average()
    expect(average).is.equal(1.5)
  })

  it('Array.Concat 方法正常运作', function() {
    let left = [1, 2]
    let right = [2, 3]
    let enumerables = left.Concat(right)
    expect(enumerables.Count()).is.equal(4)
  })

  it('Array.Contains 方法正常运作', function() {
    let list = [1, 2]

    class E extends EqualityComparer<number> {
      public Equals(x: number, y: number): boolean {
        return x === y
      }
    }

    expect(list.Contains(1)).is.true
    expect(list.Contains(2, new E())).is.true
    expect(list.Contains(3)).is.false
  })

  it('Array.Count 方法正常运作', function() {
    let list = [1, 2]

    expect(list.Count()).is.equal(2)
    expect(list.Count(item => item > 1)).is.equal(1)
    expect(list.Count(item => item > 2)).is.equal(0)
  })

  it('Array.DefaultIfEmpty 方法正常运作', function() {
    let list = []
    let enumerables = list.DefaultIfEmpty()

    expect(enumerables).is.not.null
    expect(enumerables).is.not.undefined
    expect(enumerables.Any()).is.false
  })

  it('Array.Distinct 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    let dictincted = list.Distinct()

    expect(dictincted.Count()).is.equal(3)
  })

  it('Array.ElementAt 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    expect(list.ElementAt(0)).is.equal(1)
    expect(list.ElementAt(2)).is.equal(3)
  })

  it('Array.ElementAtOrDefault 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    expect(list.ElementAtOrDefault(100, 0)).is.equal(1)
    expect(list.ElementAtOrDefault(100, 2)).is.equal(3)
    expect(list.ElementAtOrDefault(100, 10)).is.equal(100)
  })

  it('Array.Except 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    let expected = list.Except([1, 2])
    expect(expected.Count()).is.equal(1)
    expect(expected.ElementAt(0)).is.equal(3)
  })

  it('Array.First 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    expect(list.First()).is.equal(1)
    expect(list.First(item => item > 2)).is.equal(3)
  })

  it('Array.FirstOrDefault 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    expect(list.FirstOrDefault(100)).is.equal(1)
    expect(list.FirstOrDefault(100, item => item > 2)).is.equal(3)
    expect(list.FirstOrDefault(100, item => item > 3)).is.equal(100)
  })

  it('Array.GroupBy 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    let grouped = list.GroupBy(x => x)
    expect(grouped.Count()).is.equal(3)
    expect(grouped.ElementAt(0).Key).is.equal(1)
    expect(grouped.ElementAt(0).Count()).is.equal(2)
    expect(grouped.ElementAt(1).Key).is.equal(2)
    expect(grouped.ElementAt(2).Key).is.equal(3)
  })

  it('Array.GroupJoin 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    let grouped = list.GroupJoin([2, 3, 4, 5, 3], x => x, y => y)
    expect(grouped.Count()).is.equal(5)
    expect(grouped.ElementAt(0).Outer).is.equal(1)
    expect(grouped.ElementAt(0).Inners.Any()).is.false
    expect(grouped.ElementAt(1).Outer).is.equal(2)
    expect(grouped.ElementAt(1).Inners.Count()).is.equal(1)
    expect(grouped.ElementAt(2).Outer).is.equal(3)
    expect(grouped.ElementAt(2).Inners.Count()).is.equal(2)
  })

  it('Array.Intersect 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    let grouped = list.Intersect([2, 3, 4, 5, 3])
    expect(grouped.Count()).is.equal(2)
    expect(grouped.ElementAt(0)).is.equal(2)
    expect(grouped.ElementAt(1)).is.equal(3)
  })

  it('Array.Join 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    let grouped = list.Join([2, 3, 4, 5, 3], x => x, y => y)
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

  it('Array.Last 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    expect(list.Last()).is.equal(2)
    expect(list.Last(item => item > 2)).is.equal(3)
  })

  it('Array.LastOrDefault 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    expect(list.LastOrDefault(100)).is.equal(2)
    expect(list.LastOrDefault(100, item => item > 2)).is.equal(3)
    expect(list.LastOrDefault(100, item => item > 3)).is.equal(100)
  })

  it('Array.Max 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    expect(list.Max()).is.equal(3)
  })

  it('Array.Min 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    expect(list.Min()).is.equal(1)
  })

  it('Array.Reverse 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    let reverse = list.Reverse()
    expect(reverse.Count()).is.equal(5)
    expect(reverse.ElementAt(0)).is.equal(2)
    expect(reverse.ElementAt(1)).is.equal(1)
    expect(reverse.ElementAt(2)).is.equal(3)
    expect(reverse.ElementAt(3)).is.equal(2)
    expect(reverse.ElementAt(4)).is.equal(1)
  })

  it('Array.Select 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    let selected = list.Select(x => x * 2)
    expect(selected.Count()).is.equal(5)
    expect(selected.ElementAt(0)).is.equal(2)
    expect(selected.ElementAt(1)).is.equal(4)
    expect(selected.ElementAt(2)).is.equal(6)
    expect(selected.ElementAt(3)).is.equal(2)
    expect(selected.ElementAt(4)).is.equal(4)
  })

  it('Array.SelectMany 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    let selected = list.SelectMany(x => [x], c => c * 2)
    expect(selected.Count()).is.equal(5)
    expect(selected.ElementAt(0)).is.equal(2)
    expect(selected.ElementAt(1)).is.equal(4)
    expect(selected.ElementAt(2)).is.equal(6)
    expect(selected.ElementAt(3)).is.equal(2)
    expect(selected.ElementAt(4)).is.equal(4)
  })

  it('Array.SequenceEqual 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    expect(list.SequenceEqual([2, 3, 4, 5, 3])).is.false
    expect(list.SequenceEqual([1, 2, 3, 1, 2])).is.true
  })

  it('Array.Single 方法正常运作', function() {
    let list = [2]
    expect(list.Single()).is.equal(2)
  })

  it('Array.SingleOrDefault 方法正常运作', function() {
    let list = []
    expect(list.SingleOrDefault(100)).is.equal(100)
  })

  it('Array.Skip 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    expect(list.Skip(2).Count()).is.equal(3)
    expect(list.Skip(2).ElementAt(0)).is.equal(3)
  })

  it('Array.SkipWhile 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    expect(list.SkipWhile(x => x > 2).Count()).is.equal(5)
    expect(list.SkipWhile(x => x < 2).Count()).is.equal(4)
    expect(list.SkipWhile(x => x < 1).Count()).is.equal(5)
  })

  it('Array.Sum 方法正常运作', function() {
    let list = [1, 2]

    let sum = list.Sum()
    expect(sum).is.equal(3)
  })

  it('Array.Take 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    expect(list.Take(2).Count()).is.equal(2)
    expect(list.Take(2).ElementAt(0)).is.equal(1)
  })

  it('Array.TakeWhile 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    expect(list.TakeWhile(x => x > 2).Count()).is.equal(0)
    expect(list.TakeWhile(x => x < 2).Count()).is.equal(1)
    expect(list.TakeWhile(x => x < 1).Count()).is.equal(0)
  })

  it('Array.ToArray 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    let array = list.ToArray()
    expect(array).is.instanceof(Array)
    expect(array.length).is.equal(5)
    expect(array[0]).is.equal(1)
    expect(array[1]).is.equal(2)
    expect(array[2]).is.equal(3)
  })

  it('Array.ToDictionary 方法正常运作', function() {
    let list = [3, 1, 2]
    let dic = list.ToDictionary(x => x, y => y * 3)
    expect(dic).is.instanceof(Dictionary)
    expect(dic.Count()).is.equal(3)
    expect(dic.Get(3)).is.equal(9)
    expect(dic.Get(1)).is.equal(3)
    expect(dic.Get(2)).is.equal(6)
  })

  it('Array.ToList 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    let listed = list.ToList()
    expect(listed).is.instanceof(List)
    expect(listed.Count()).is.equal(5)
    expect(listed.Get(0)).is.equal(1)
    expect(listed.Get(1)).is.equal(2)
    expect(listed.Get(2)).is.equal(3)
  })

  it('Array.Union 方法正常运作', function() {
    let left = [1, 2]
    let right = [2, 3]
    let enumerables = left.Union(right)
    expect(enumerables.Count()).is.equal(3)
  })

  it('Array.Where 方法正常运作', function() {
    let list = [1, 2, 3, 1, 2]
    let filtered = list.Where(x => x >= 2)
    expect(filtered.Count()).is.equal(3)
    expect(filtered.ElementAt(0)).is.equal(2)
    expect(filtered.ElementAt(1)).is.equal(3)
    expect(filtered.ElementAt(2)).is.equal(2)
  })
})
