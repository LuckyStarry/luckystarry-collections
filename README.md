# luckystarry-collections

模仿 .NET 的集合类，对数组类提供了类似于 LINQ 的方法，如 _Select_ _Where_ _ToList_ 等

[![Build Status](https://www.travis-ci.org/LuckyStarry/luckystarry-collections.svg?branch=master)](https://www.travis-ci.org/LuckyStarry/luckystarry-collections?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/LuckyStarry/luckystarry-collections/badge.svg?branch=master)](https://coveralls.io/github/LuckyStarry/luckystarry-collections?branch=master)
[![Npm Status](https://img.shields.io/npm/v/luckystarry-collections.svg)](https://www.npmjs.com/package/luckystarry-collections)
[![install size](https://packagephobia.now.sh/badge?p=luckystarry-collections)](https://packagephobia.now.sh/result?p=luckystarry-collections)
[![JSDelivr](https://data.jsdelivr.com/v1/package/npm/luckystarry-collections/badge)](https://www.jsdelivr.com/package/npm/luckystarry-collections)
[![codebeat badge](https://codebeat.co/badges/6339b0a3-d394-4706-b283-b8bfc6acd0dc)](https://codebeat.co/projects/github-com-luckystarry-luckystarry-collections-master)
[![License Status](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://raw.githubusercontent.com/LuckyStarry/luckystarry-collections/master/LICENSE)

## Install

### 打包安装使用

```bash
npm install -S luckystarry-collections
```

### 浏览器引入使用

```html
<script src="https://cdn.jsdelivr.net/npm/luckystarry-collections/dist/index.min.js"></script>
```

## Usage

### Array<T>

#### All(predicate: (item: T) => boolean): boolean

```typescript
[1, 2, 3].All(x => x > 0)
// true

[1, 2, 3].All(x => x > 1)
// false
```

#### Any(predicate: (item: T) => boolean): boolean

```typescript
[1, 2, 3].Any(x => x > 0)
// true

[1, 2, 3].Any(x => x > 1)
// true

[1, 2, 3].Any(x => x > 3)
// false
```

#### AsEnumerable(): IEnumerable<T>

```typescript
[1, 2, 3].AsEnumerable()
// [1, 2, 3]
```

#### Average(selector?: (item: T) => number): number | null

```typescript
[1, 2, 3].Average()
// 2

[1, 2, 3].Average(x => x * 2)
// 4
```

#### Concat(second: IEnumerable<T>): IEnumerable<T>

```typescript
[1, 2, 3].Concat([3, 4, 5])
// [1, 2, 3, 3, 4, 5]
```

#### Contains(value: T, comparer?: IEqualityComparer<T>): boolean

```typescript
[1, 2, 3].Contains(2)
// true
```

#### Count(predicate?: (item: T) => boolean): number

```typescript
[1, 2, 3].Count()
// 3

[1, 2, 3].Count(x => x > 1)
// 2
```

#### DefaultIfEmpty(defaultValue?: IEnumerable<T>): IEnumerable<T>

```typescript
[1, 2, 3].DefaultIfEmpty()
// [1, 2, 3]

[].DefaultIfEmpty([1])
// [1]
```

#### Distinct(comparer?: IEqualityComparer<T>): IEnumerable<T>

```typescript
[1, 2, 3].Distinct()
// [1, 2, 3]

[1, 2, 3, 3, 4].Distinct()
// [1, 2, 3, 4]
```

#### ElementAt(index: number): T

```typescript
[1, 2, 3].ElementAt(1)
// 2
```

#### ElementAtOrDefault(defaultValue: T, index: number): T

```typescript
[1, 2, 3].ElementAtOrDefault(0, 1)
// 2

[1, 2, 3].ElementAtOrDefault(0, 3)
// 0
```

#### Except(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T>

```typescript
[1, 2, 3].Except([3, 4])
// [1, 2]
```

#### First(predicate?: (item: T) => boolean): T

```typescript
[1, 2, 3].First()
// 1

[1, 2, 3].First(x => x > 1)
// 2
```

#### FirstOrDefault(defaultValue: T, predicate?: (item: T) => boolean): T

```typescript
[1, 2, 3].FirstOrDefault(0)
// 1

[1, 2, 3].FirstOrDefault(0, x => x > 1)
// 2

[1, 2, 3].FirstOrDefault(0, x => x > 3)
// 0
```

#### GroupBy<TKey, TElement = T>(keySelector: (item: T) => TKey, elementSelector?: (item: T) => TElement, comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>

```typescript
[1, 2, 3].GroupBy(x => x)
// [{ Key: 1, [1] }, { Key: 2, [2] }, { Key: 3, [3] }]

[{ Value: 1 }, { Value: 1 }, { Value: 2 })].GroupBy(x => x.Value, e => e)
// [{ Key: 1, [{ Value: 1 }, { Value: 1}] }, { Key: 2, [{ Value : 2}] }]
```

#### GroupJoin<TInner, TKey, TResult = { Outer: T; Inners: IEnumerable<TInner> }>(inner: IEnumerable<TInner>, outerKeySelector: (item: T) => TKey, innerKeySelector: (item: TInner) => TKey, resultSelector?: (item: T, inners: IEnumerable<TInner>) => TResult, comparer?: IEqualityComparer<TKey>): IEnumerable<TResult>

```typescript
[1, 2, 3].GroupJoin([3, 4, 5], o => o, i => i)
// [{ Outer: 1, Inners: [] }, { Outer: 2, Inners: [] }, { Outer: 3, Inners: [3] }]
```

#### Intersect(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T>

```typescript
[1, 2, 3].Intersect([3, 4])
// [3]
```

#### Join<TInner, TKey, TResult = { Outer: T; Inner: TInner }>(inner: IEnumerable<TInner>, outerKeySelector: (item: T) => TKey, innerKeySelector: (item: TInner) => TKey, resultSelector?: (item: T, inners: TInner) => TResult, comparer?: IEqualityComparer<TKey>): IEnumerable<TResult>

```typescript
[1, 2, 3].Join([3, 4, 5], o => o, i => i)
// [{ Outer: 3, Inner: [3] }]
```

#### Last(predicate?: (item: T) => boolean): T

```typescript
[1, 2, 3].Last()
// 3

[1, 2, 3].Last(x => x > 1)
// 3
```

#### LastOrDefault(defaultValue: T, predicate?: (item: T) => boolean): T

```typescript
[1, 2, 3].LastOrDefault(0)
// 3

[1, 2, 3].LastOrDefault(0, x => x > 1)
// 3

[1, 2, 3].LastOrDefault(0, x => x < 1)
// 0
```

#### Max(selector?: (item: T) => number): number | null

```typescript
[1, 2, 3].Max()
// 3

[1, 2, 3].Max(x => x * 2)
// 6
```

#### Min(selector?: (item: T) => number): number | null

```typescript
[1, 2, 3].Min()
// 1

[1, 2, 3].Min(x => x * 2)
// 2
```

#### Reverse(): IEnumerable<T>

```typescript
[1, 2, 3].Select(x => x)
// [1, 2, 3]

[1, 2, 3].Select(x => x * 3)
// [3, 6, 9]
```

#### Select<TResult>(selector: (item: T, index?: number) => TResult): IEnumerable<TResult>

```typescript
[1, 2, 3].Reverse()
// [3, 2, 1]
```

#### SelectMany<TCollection, TResult = TCollection>(collectionSelector: (item: T, index?: number) => IEnumerable<TCollection>, resultSelector?: (item: T, collection: TCollection) => TResult): IEnumerable<TResult>

```typescript
[[1, 2], [2, 3], [3, 4]].SelectMany(x => x)
// [1, 2, 2, 3, 3, 4]
```

#### SequenceEqual(second: Iterable<T>, comparer?: IEqualityComparer<T>): boolean

```typescript
[1, 2, 3].SequenceEqual([1, 2, 3])
// true

[1, 2, 3, 4].SequenceEqual([1, 2, 3])
// false

[1, 2, 3].SequenceEqual([3, 2, 1])
// false
```

#### Single(predicate?: (item: T) => boolean): T

```typescript
[1].Single()
// 1

[1, 2, 3].Single(x => x > 2)
// 3
```

#### SingleOrDefault(defaultValue: T, predicate?: (item: T) => boolean): T

```typescript
[1].SingleOrDefault(0)
// 1

[1, 2, 3].SingleOrDefault(0, x => x > 2)
// 3

[1, 2, 3].SingleOrDefault(0, x => x > 3)
// 0
```

#### Skip(count: number): IEnumerable<T>

```typescript
[1, 2, 3].Skip(1)
// [2, 3]
```

#### SkipWhile(predicate: (item: T, index?: number) => boolean): IEnumerable<T>

```typescript
[1, 2, 3].SkipWhile(x => x < 2)
// [2, 3]
```

#### Sum(selector?: (item: T) => number): number | null

```typescript
[1, 2, 3].Sum()
// 6

[1, 2, 3].Sum(x => x * 2)
// 12
```

#### Take(count: number): IEnumerable<T>

```typescript
[1, 2, 3].Take(2)
// [1, 2]
```

#### TakeWhile(predicate: (item: T, index?: number) => boolean): IEnumerable<T>

```typescript
[1, 2, 3].TakeWhile(x => x < 2)
// [1]
```

#### ToArray(): Array<T>

```typescript
[1, 2, 3].ToArray()
// [1, 2, 3]
```

#### ToDictionary<TKey, TElement = T>(keySelector: (item: T) => TKey, elementSelector?: (item: T) => TElement, comparer?: IEqualityComparer<TKey>): Dictionary<T>

```typescript
[1, 2, 3].ToDictionary(x => x)
// [{1, 1}, {2, 2}, {3, 3}]
```

#### ToList(): List<T>

```typescript
[1, 2, 3].ToList()
// [1, 2, 3]
```

#### Union(second: Iterable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T>

```typescript
[1, 2, 3].Union([3, 4, 5])
// [1, 2, 3, 4, 5]
```

#### Where(predicate: (item: T, index?: number) => boolean): IEnumerable<T>

```typescript
[1, 2, 3].Where(x => x > 1)
// [2, 3]
```

## LICENSE

MIT License

Copyright (c) 2018 SUN BO <starry@vip.qq.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
