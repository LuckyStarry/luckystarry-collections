# luckystarry-collections

模仿 .NET 的集合类，对数组类提供了类似于 LINQ 的方法，如 _Select_ _Where_ _ToList_ 等

[![Build Status](https://www.travis-ci.org/LuckyStarry/luckystarry-collections.svg?branch=master)](https://www.travis-ci.org/LuckyStarry/luckystarry-collections?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/LuckyStarry/luckystarry-collections/badge.svg?branch=master)](https://coveralls.io/github/LuckyStarry/luckystarry-collections?branch=master)
[![Npm Status](https://img.shields.io/npm/v/luckystarry-collections.svg)](https://www.npmjs.com/package/luckystarry-collections)
[![install size](https://packagephobia.now.sh/badge?p=luckystarry-collections)](https://packagephobia.now.sh/result?p=luckystarry-collections)
[![JSDelivr](https://data.jsdelivr.com/v1/package/npm/luckystarry-collections/badge)](https://www.jsdelivr.com/package/npm/luckystarry-collections)
[![codebeat badge](https://codebeat.co/badges/6339b0a3-d394-4706-b283-b8bfc6acd0dc)](https://codebeat.co/projects/github-com-luckystarry-luckystarry-collections-master)
[![Known Vulnerabilities](https://snyk.io/test/github/LuckyStarry/luckystarry-collections/badge.svg?targetFile=package.json)](https://snyk.io/test/github/LuckyStarry/luckystarry-collections?targetFile=package.json)
[![License Status](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://raw.githubusercontent.com/LuckyStarry/luckystarry-collections/master/LICENSE)

## Install

### 打包安装使用

```bash
npm install -S luckystarry-collections
```
使用此种方式请在项目入口处增加以下代码，否则无法对**Array**进行扩展
```typescript
import 'luckystarry-collections'
```

### 浏览器引入使用

```html
<script src="https://cdn.jsdelivr.net/npm/luckystarry-collections/dist/index.min.js"></script>
```

## Usage

### 类或接口

#### IEnumerable&lt;T&gt;
可枚举的集合

#### List&lt;T&gt; 及 IList&lt;T&gt;
列表对象 及 列表接口

#### Dictionary&lt;TKey, TValue&gt; 及 IDictionary&lt;TKey, TValue&gt;
字典对象 及 字典接口

#### ReadOnlyCollection&lt;T&gt;
只读列表

#### Array&lt;T&gt;
数组

### 集合类的公共方法

#### All(predicate: (item: T) => boolean): boolean
判断集合中是否所有元素均符合 *predicate* 的要求，是则返回 true 否则 返回 false
```typescript
[1, 2, 3].All(x => x > 0)
// true

[1, 2, 3].All(x => x > 1)
// false
```

#### Any(predicate: (item: T) => boolean): boolean
判断集合中是否存在元素符合 *predicate* 的要求，是则返回 true 否则 返回 false
```typescript
[1, 2, 3].Any(x => x > 0)
// true

[1, 2, 3].Any(x => x > 1)
// true

[1, 2, 3].Any(x => x > 3)
// false
```

#### AsEnumerable(): IEnumerable&lt;T&gt;
将一个集合对象转为其可枚举接口形式表达
```typescript
[1, 2, 3].AsEnumerable()
// [1, 2, 3]
```

#### Average(selector?: (item: T) => number): number | null
计算集合中数据的平均值，如果集合为非数型集合，则利用 *selector* 映射出列表中每个元素的数值
```typescript
[1, 2, 3].Average()
// 2

[1, 2, 3].Average(x => x * 2)
// 4
```

#### Concat(second: IEnumerable&lt;T&gt;): IEnumerable&lt;T&gt;
连接两个集合
```typescript
[1, 2, 3].Concat([3, 4, 5])
// [1, 2, 3, 3, 4, 5]
```

#### Contains(value: T, comparer?: IEqualityComparer&lt;T&gt;): boolean
判断集合中是否存在某个元素值，并可通过指定的等值比较器进行比较，如果存在则返回 true
```typescript
[1, 2, 3].Contains(2)
// true
```

#### Count(predicate?: (item: T) => boolean): number
计算集合中符合 *predicate* 要求的元素的数目，如果没有传入此条件，则返回集合中全部元素的数目
```typescript
[1, 2, 3].Count()
// 3

[1, 2, 3].Count(x => x > 1)
// 2
```

#### DefaultIfEmpty(defaultValue?: IEnumerable&lt;T&gt;): IEnumerable&lt;T&gt;
判断集合是否为空集，如果为空集则返回 *defaultValue* 作为默认集合，否则返回一个新的包含原有全部元素的集合对象
```typescript
[1, 2, 3].DefaultIfEmpty()
// [1, 2, 3]

[].DefaultIfEmpty([1])
// [1]
```

#### Distinct(comparer?: IEqualityComparer&lt;T&gt;): IEnumerable&lt;T&gt;
将一个集合去重，并可通过 *comparer* 作为等值判断器来判断元素是否相等
```typescript
[1, 2, 3].Distinct()
// [1, 2, 3]

[1, 2, 3, 3, 4].Distinct()
// [1, 2, 3, 4]
```

#### ElementAt(index: number): T
从前向后取出从 **0** 开始的第 *index* 个元素
```typescript
[1, 2, 3].ElementAt(1)
// 2
```

#### ElementAtOrDefault(defaultValue: T, index: number): T
从前向后取出从 **0** 开始的第 *index* 个元素，如果超出集合范围，则返回 *defaultValue* 作为默认值
```typescript
[1, 2, 3].ElementAtOrDefault(0, 1)
// 2

[1, 2, 3].ElementAtOrDefault(0, 3)
// 0
```

#### Except(second: IEnumerable&lt;T&gt;, comparer?: IEqualityComparer&lt;T&gt;): IEnumerable&lt;T&gt;
从集合中排除 *second* 中存在的元素，并可通过 *comparer* 作为等值判断器来判断元素是否相等
```typescript
[1, 2, 3].Except([3, 4])
// [1, 2]
```

#### First(predicate?: (item: T) => boolean): T
从集合中取出符合 *predicate* 要求的第一个元素，如果不使用此条件，则返回集合的第一个元素
```typescript
[1, 2, 3].First()
// 1

[1, 2, 3].First(x => x > 1)
// 2
```

#### FirstOrDefault(defaultValue: T, predicate?: (item: T) => boolean): T
从集合中取出符合 *predicate* 要求的第一个元素，如果不使用此条件，则返回集合的第一个元素，如果元素不存在，则返回 *defaultValue* 作为默认值

```typescript
[1, 2, 3].FirstOrDefault(0)
// 1

[1, 2, 3].FirstOrDefault(0, x => x > 1)
// 2

[1, 2, 3].FirstOrDefault(0, x => x > 3)
// 0
```

#### GroupBy<TKey, TElement = T>(keySelector: (item: T) => TKey, elementSelector?: (item: T) => TElement, comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>
将集合的每一个元素按照 *keySelector* 选择出的值作为分组条件，将每个元素通过 *elementSelector* 映射后做组合，判断键值相等时可使用 *comparer* 作为等值比较器进行比较
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

#### Intersect(second: IEnumerable&lt;T&gt;, comparer?: IEqualityComparer&lt;T&gt;): IEnumerable&lt;T&gt;
从集合中取出 *second* 中也存在的元素集合，并可通过 *comparer* 作为等值判断器来判断元素是否相等
```typescript
[1, 2, 3].Intersect([3, 4])
// [3]
```

#### Join<TInner, TKey, TResult = { Outer: T; Inner: TInner }>(inner: IEnumerable<TInner>, outerKeySelector: (item: T) => TKey, innerKeySelector: (item: TInner) => TKey, resultSelector?: (item: T, inners: TInner) => TResult, comparer?: IEqualityComparer<TKey>): IEnumerable<TResult>
将集合的每一个元素按照 *outerKeySelector* 映射出的值，与 *inner* 通过 *innerKeySelector* 映射出的值，使用 *comparer* 作为等值比较器进行比较，将二者都存在的数据通过 *resultSelector* 映射为新集合的结果
```typescript
[1, 2, 3].Join([3, 4, 5], o => o, i => i)
// [{ Outer: 3, Inner: [3] }]
```

#### Last(predicate?: (item: T) => boolean): T
从集合中取出符合 *predicate* 要求的最后一个元素，如果不使用此条件，则返回集合的最后一个元素
```typescript
[1, 2, 3].Last()
// 3

[1, 2, 3].Last(x => x > 1)
// 3
```

#### LastOrDefault(defaultValue: T, predicate?: (item: T) => boolean): T
从集合中取出符合 *predicate* 要求的最后一个元素，如果不使用此条件，则返回集合的最后一个元素，如果元素不存在，则返回 *defaultValue* 作为默认值
```typescript
[1, 2, 3].LastOrDefault(0)
// 3

[1, 2, 3].LastOrDefault(0, x => x > 1)
// 3

[1, 2, 3].LastOrDefault(0, x => x < 1)
// 0
```

#### Max(selector?: (item: T) => number): number | null
计算集合中数据的最大值，如果集合为非数型集合，则利用 *selector* 映射出列表中每个元素的数值
```typescript
[1, 2, 3].Max()
// 3

[1, 2, 3].Max(x => x * 2)
// 6
```

#### Min(selector?: (item: T) => number): number | null
计算集合中数据的最小值，如果集合为非数型集合，则利用 *selector* 映射出列表中每个元素的数值
```typescript
[1, 2, 3].Min()
// 1

[1, 2, 3].Min(x => x * 2)
// 2
```

#### Reverse(): IEnumerable&lt;T&gt;
生成一个与现有集合元素顺序相反的新集合
```typescript
[1, 2, 3].Select(x => x)
// [1, 2, 3]

[1, 2, 3].Select(x => x * 3)
// [3, 6, 9]
```

#### Select<TResult>(selector: (item: T, index?: number) => TResult): IEnumerable<TResult>
通过 *selector* 将集合中的每一个元素映射成新的元素并组成新的集合
```typescript
[1, 2, 3].Reverse()
// [3, 2, 1]
```

#### SelectMany<TCollection, TResult = TCollection>(collectionSelector: (item: T, index?: number) => IEnumerable<TCollection>, resultSelector?: (item: T, collection: TCollection) => TResult): IEnumerable<TResult>
通过 *collectionSelector* 将集合中的每一个元素映射成集合对象，并将全部的集合对象的值通过 *resultSelector* 映射出新的元素集合
```typescript
[[1, 2], [2, 3], [3, 4]].SelectMany(x => x)
// [1, 2, 2, 3, 3, 4]
```

#### SequenceEqual(second: Iterable&lt;T&gt;, comparer?: IEqualityComparer&lt;T&gt;): boolean
判断集合与 *second* 是否每一个元素都相等且顺序一致，可通过 *comparer* 判断两个元素是否相等
```typescript
[1, 2, 3].SequenceEqual([1, 2, 3])
// true

[1, 2, 3, 4].SequenceEqual([1, 2, 3])
// false

[1, 2, 3].SequenceEqual([3, 2, 1])
// false
```

#### Single(predicate?: (item: T) => boolean): T
从集合中取出符合 *predicate* 要求的唯一元素，如果不使用此条件，则返回集合的唯一元素，如果集合中符合条件的元素不唯一，则会抛出异常
```typescript
[1].Single()
// 1

[1, 2, 3].Single(x => x > 2)
// 3
```

#### SingleOrDefault(defaultValue: T, predicate?: (item: T) => boolean): T
从集合中取出符合 *predicate* 要求的唯一元素，如果不使用此条件，则返回集合的唯一元素，如果集合中符合条件的元素不唯一，则会抛出异常，如果元素不存在，则返回 *defaultValue* 作为默认值
```typescript
[1].SingleOrDefault(0)
// 1

[1, 2, 3].SingleOrDefault(0, x => x > 2)
// 3

[1, 2, 3].SingleOrDefault(0, x => x > 3)
// 0
```

#### Skip(count: number): IEnumerable&lt;T&gt;
从集合中跳过 *count* 个元素，并将剩余元素组成新的集合
```typescript
[1, 2, 3].Skip(1)
// [2, 3]
```

#### SkipWhile(predicate: (item: T, index?: number) => boolean): IEnumerable&lt;T&gt;
从集合中跳过符合 *predicate* 要求的元素，并将剩余元素组成新的集合
```typescript
[1, 2, 3].SkipWhile(x => x < 2)
// [2, 3]
```

#### Sum(selector?: (item: T) => number): number | null
计算集合中数据的总和，如果集合为非数型集合，则利用 *selector* 映射出列表中每个元素的数值
```typescript
[1, 2, 3].Sum()
// 6

[1, 2, 3].Sum(x => x * 2)
// 12
```

#### Take(count: number): IEnumerable&lt;T&gt;
从集合中选取 *count* 个元素组成新的集合
```typescript
[1, 2, 3].Take(2)
// [1, 2]
```

#### TakeWhile(predicate: (item: T, index?: number) => boolean): IEnumerable&lt;T&gt;
从集合中选取符合 *predicate* 要求的元素，并将这些元素组成新的集合
```typescript
[1, 2, 3].TakeWhile(x => x < 2)
// [1]
```

#### ToArray(): Array&lt;T&gt;
将集合中的所有元素放置在一个新的数组对象中
```typescript
[1, 2, 3].ToArray()
// [1, 2, 3]
```

#### ToDictionary<TKey, TElement = T>(keySelector: (item: T) => TKey, elementSelector?: (item: T) => TElement, comparer?: IEqualityComparer<TKey>): Dictionary&lt;T&gt;
将集合中的所有元素放置在一个新的字典对象中，其中每一个元素通过 *keySelector* 映射成键，通过 *elementSelector* 映射为值
```typescript
[1, 2, 3].ToDictionary(x => x)
// [{1, 1}, {2, 2}, {3, 3}]
```

#### ToList(): List&lt;T&gt;
将集合中的所有元素放置在一个新的列表对象中
```typescript
[1, 2, 3].ToList()
// [1, 2, 3]
```

#### Union(second: Iterable&lt;T&gt;, comparer?: IEqualityComparer&lt;T&gt;): IEnumerable&lt;T&gt;
将两个集合连接起来，并去除重复的元素，可通过 *comparer* 判断两个元素是否相等
```typescript
[1, 2, 3].Union([3, 4, 5])
// [1, 2, 3, 4, 5]
```

#### Where(predicate: (item: T, index?: number) => boolean): IEnumerable&lt;T&gt;
从集合中筛选出符合 *predicate* 要求的元素，并组成一个新的集合
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
