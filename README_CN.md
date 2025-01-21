# luckystarry-collections

[English](README.md) | [中文](README_CN.md)

一个模仿 .NET 风格的集合库，为数组提供类似 LINQ 的方法，如 _Select_、_Where_、_ToList_ 等。

[![CI Test](https://github.com/LuckyStarry/luckystarry-collections/actions/workflows/ci-test.yml/badge.svg)](https://github.com/LuckyStarry/luckystarry-collections/actions/workflows/ci-test.yml)
[![Coverage Status](https://coveralls.io/repos/github/LuckyStarry/luckystarry-collections/badge.svg?branch=master)](https://coveralls.io/github/LuckyStarry/luckystarry-collections?branch=master)
[![Npm Status](https://img.shields.io/npm/v/luckystarry-collections.svg)](https://www.npmjs.com/package/luckystarry-collections)
[![install size](https://packagephobia.now.sh/badge?p=luckystarry-collections)](https://packagephobia.now.sh/result?p=luckystarry-collections)
[![JSDelivr](https://data.jsdelivr.com/v1/package/npm/luckystarry-collections/badge)](https://www.jsdelivr.com/package/npm/luckystarry-collections)
[![codebeat badge](https://codebeat.co/badges/6339b0a3-d394-4706-b283-b8bfc6acd0dc)](https://codebeat.co/projects/github-com-luckystarry-luckystarry-collections-master)
[![Known Vulnerabilities](https://snyk.io/test/github/LuckyStarry/luckystarry-collections/badge.svg?targetFile=package.json)](https://snyk.io/test/github/LuckyStarry/luckystarry-collections?targetFile=package.json)
[![License Status](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://raw.githubusercontent.com/LuckyStarry/luckystarry-collections/master/LICENSE)

## 安装

### 包安装

```bash
npm install -S luckystarry-collections
```

使用此方式时，需要在项目入口处添加以下代码来扩展 **Array** 原型：

```typescript
import 'luckystarry-collections'
```

### 浏览器使用

```html
<script src="https://cdn.jsdelivr.net/npm/luckystarry-collections/dist/index.min.js"></script>
```

## 使用说明

### 类和接口

#### IEnumerable<T>

可枚举集合的接口

#### List<T> 和 IList<T>

列表对象和列表接口

#### Dictionary<TKey, TValue> 和 IDictionary<TKey, TValue>

字典对象和字典接口

#### ReadOnlyCollection<T>

只读列表

#### Array<T>

数组

### 常用集合方法

#### All(predicate: (item: T) => boolean): boolean

判断集合中的所有元素是否都满足指定条件。如果所有元素都满足条件则返回 true，否则返回 false。

```typescript
[1, 2, 3].All(x => x > 0)    // true
[1, 2, 3].All(x => x > 1)    // false
```

#### Any(predicate: (item: T) => boolean): boolean

判断集合中是否存在满足指定条件的元素。如果存在任一元素满足条件则返回 true，否则返回 false。

```typescript
[1, 2, 3].Any(x => x > 0)    // true
[1, 2, 3].Any(x => x > 1)    // true
[1, 2, 3].Any(x => x > 3)    // false
```

#### AsEnumerable(): IEnumerable<T>

将集合转换为其可枚举接口形式。

```typescript
[1, 2, 3].AsEnumerable()     // [1, 2, 3]
```

#### Average(selector?: (item: T) => number): number | null

计算集合的平均值。如果集合包含非数值元素，使用选择器将每个元素映射为数值。

```typescript
[1, 2, 3].Average()          // 2
[1, 2, 3].Average(x => x * 2)    // 4
```

#### Concat(second: IEnumerable<T>): IEnumerable<T>

连接两个集合。

```typescript
[1, 2, 3].Concat([3, 4, 5])    // [1, 2, 3, 3, 4, 5]
```

#### Contains(value: T, comparer?: IEqualityComparer<T>): boolean

判断集合是否包含指定元素。可以提供可选的相等比较器。

```typescript
[1, 2, 3].Contains(2)    // true
```

#### Count(predicate?: (item: T) => boolean): number

计算满足指定条件的元素数量。如果未提供条件，则返回元素总数。

```typescript
[1, 2, 3].Count()            // 3
[1, 2, 3].Count(x => x > 1)  // 2
```

#### DefaultIfEmpty(defaultValue?: IEnumerable<T>): IEnumerable<T>

如果集合为空则返回默认值；否则返回包含所有原始元素的新集合。

```typescript
[1, 2, 3].DefaultIfEmpty()   // [1, 2, 3]
[].DefaultIfEmpty([1])       // [1]
```

#### Distinct(comparer?: IEqualityComparer<T>): IEnumerable<T>

返回集合中的不重复元素。可以提供可选的相等比较器。

```typescript
[1, 2, 3].Distinct()         // [1, 2, 3]
[1, 2, 3, 3, 4].Distinct()   // [1, 2, 3, 4]
```

#### ElementAt(index: number): T

返回指定索引处的元素。

```typescript
[1, 2, 3].ElementAt(1)       // 2
```

#### ElementAtOrDefault(defaultValue: T, index: number): T

返回指定索引处的元素，如果索引超出范围则返回默认值。

```typescript
[1, 2, 3].ElementAtOrDefault(0, 1)    // 2
[1, 2, 3].ElementAtOrDefault(0, 3)    // 0
```

#### Except(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T>

返回第一个集合中存在但在第二个集合中不存在的元素。

```typescript
[1, 2, 3].Except([3, 4])    // [1, 2]
```

#### First(predicate?: (item: T) => boolean): T

返回满足条件的第一个元素。如果未提供条件，则返回第一个元素。

```typescript
[1, 2, 3].First()           // 1
[1, 2, 3].First(x => x > 1) // 2
```

#### FirstOrDefault(defaultValue: T, predicate?: (item: T) => boolean): T

返回满足条件的第一个元素，如果未找到则返回默认值。如果未提供条件，则返回第一个元素，如果集合为空则返回默认值。

```typescript
[1, 2, 3].FirstOrDefault(0)                // 1
[1, 2, 3].FirstOrDefault(0, x => x > 1)    // 2
[1, 2, 3].FirstOrDefault(0, x => x > 3)    // 0
```

#### GroupBy<TKey, TElement = T>(keySelector: (item: T) => TKey, elementSelector?: (item: T) => TElement, comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>

根据键选择器对元素进行分组，并使用可选的元素选择器映射元素。可以使用可选的比较器进行键相等性比较。

```typescript
[1, 2, 3].GroupBy(x => x)    
// [{ Key: 1, [1] }, { Key: 2, [2] }, { Key: 3, [3] }]

[{ Value: 1 }, { Value: 1 }, { Value: 2 }].GroupBy(x => x.Value, e => e)
// [{ Key: 1, [{ Value: 1 }, { Value: 1}] }, { Key: 2, [{ Value: 2}] }]
```

#### GroupJoin<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (item: T) => TKey, innerKeySelector: (item: TInner) => TKey, resultSelector?: (item: T, inners: IEnumerable<TInner>) => TResult, comparer?: IEqualityComparer<TKey>): IEnumerable<TResult>

基于键相等性关联两个序列的元素并对结果进行分组。

```typescript
[1, 2, 3].GroupJoin([3, 4, 5], o => o, i => i)
// [{ Outer: 1, Inners: [] }, { Outer: 2, Inners: [] }, { Outer: 3, Inners: [3] }]
```

#### Intersect(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T>

返回同时存在于两个集合中的元素。可以使用可选的比较器进行元素相等性比较。

```typescript
[1, 2, 3].Intersect([3, 4])    // [3]
```

#### Join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (item: T) => TKey, innerKeySelector: (item: TInner) => TKey, resultSelector?: (item: T, inners: TInner) => TResult, comparer?: IEqualityComparer<TKey>): IEnumerable<TResult>

基于匹配键关联两个序列的元素。

```typescript
[1, 2, 3].Join([3, 4, 5], o => o, i => i)
// [{ Outer: 3, Inner: 3 }]
```

#### Last(predicate?: (item: T) => boolean): T

返回满足条件的最后一个元素。如果未提供条件，则返回最后一个元素。

```typescript
[1, 2, 3].Last()            // 3
[1, 2, 3].Last(x => x > 1)  // 3
```

#### LastOrDefault(defaultValue: T, predicate?: (item: T) => boolean): T

返回满足条件的最后一个元素，如果未找到则返回默认值。如果未提供条件，则返回最后一个元素，如果集合为空则返回默认值。

```typescript
[1, 2, 3].LastOrDefault(0)                 // 3
[1, 2, 3].LastOrDefault(0, x => x > 1)     // 3
[1, 2, 3].LastOrDefault(0, x => x < 1)     // 0
```

#### Max(selector?: (item: T) => number): number | null

返回集合中的最大值。对于非数值集合，使用选择器将元素映射为数值。

```typescript
[1, 2, 3].Max()             // 3
[1, 2, 3].Max(x => x * 2)   // 6
```

#### Min(selector?: (item: T) => number): number | null

返回集合中的最小值。对于非数值集合，使用选择器将元素映射为数值。

```typescript
[1, 2, 3].Min()             // 1
[1, 2, 3].Min(x => x * 2)   // 2
```

#### Reverse(): IEnumerable<T>

返回一个新集合，元素顺序相反。

```typescript
[1, 2, 3].Reverse()         // [3, 2, 1]
```

#### Select<TResult>(selector: (item: T, index?: number) => TResult): IEnumerable<TResult>

使用选择器函数将每个元素投影为新形式。

```typescript
[1, 2, 3].Select(x => x)        // [1, 2, 3]
[1, 2, 3].Select(x => x * 3)    // [3, 6, 9]
```

#### SelectMany<TCollection, TResult = TCollection>(collectionSelector: (item: T, index?: number) => IEnumerable<TCollection>, resultSelector?: (item: T, collection: TCollection) => TResult): IEnumerable<TResult>

将每个元素投影到 IEnumerable<T> 并将结果序列平展为一个序列。

```typescript
[[1, 2], [2, 3], [3, 4]].SelectMany(x => x)    // [1, 2, 2, 3, 3, 4]
```

#### SequenceEqual(second: Iterable<T>, comparer?: IEqualityComparer<T>): boolean

通过比较元素确定两个序列是否相等。

```typescript
[1, 2, 3].SequenceEqual([1, 2, 3])         // true
[1, 2, 3, 4].SequenceEqual([1, 2, 3])      // false
[1, 2, 3].SequenceEqual([3, 2, 1])         // false
```

#### Single(predicate?: (item: T) => boolean): T

返回满足条件的唯一元素。如果不是恰好一个元素，则抛出异常。

```typescript
[1].Single()                    // 1
[1, 2, 3].Single(x => x > 2)   // 3
```

#### SingleOrDefault(defaultValue: T, predicate?: (item: T) => boolean): T

返回满足条件的唯一元素，如果未找到则返回默认值。如果有多个匹配元素，则抛出异常。

```typescript
[1].SingleOrDefault(0)                      // 1
[1, 2, 3].SingleOrDefault(0, x => x > 2)    // 3
[1, 2, 3].SingleOrDefault(0, x => x > 3)    // 0
```

#### Skip(count: number): IEnumerable<T>

跳过指定数量的元素并返回剩余元素。

```typescript
[1, 2, 3].Skip(1)    // [2, 3]
```

#### SkipWhile(predicate: (item: T, index?: number) => boolean): IEnumerable<T>

当谓词为真时跳过元素，然后返回剩余元素。

```typescript
[1, 2, 3].SkipWhile(x => x < 2)    // [2, 3]
```

#### Sum(selector?: (item: T) => number): number | null

计算序列的和。对于非数值集合，使用选择器将元素映射为数值。

```typescript
[1, 2, 3].Sum()                 // 6
[1, 2, 3].Sum(x => x * 2)       // 12
```

#### Take(count: number): IEnumerable<T>

从序列的开始返回指定数量的连续元素。

```typescript
[1, 2, 3].Take(2)    // [1, 2]
```

#### TakeWhile(predicate: (item: T, index?: number) => boolean): IEnumerable<T>

当谓词为真时从序列的开始返回元素。

```typescript
[1, 2, 3].TakeWhile(x => x < 2)    // [1]
```

#### ToArray(): Array<T>

从集合创建数组。

```typescript
[1, 2, 3].ToArray()    // [1, 2, 3]
```

#### ToDictionary<TKey, TElement = T>(keySelector: (item: T) => TKey, elementSelector?: (item: T) => TElement, comparer?: IEqualityComparer<TKey>): Dictionary<TKey, TElement>

使用指定的键和元素选择器从集合创建 Dictionary<TKey, TElement>。

```typescript
[1, 2, 3].ToDictionary(x => x)    // Dictionary { 1 => 1, 2 => 2, 3 => 3 }
```

#### ToList(): List<T>

从集合创建 List<T>。

```typescript
[1, 2, 3].ToList()    // List [1, 2, 3]
```

#### Union(second: Iterable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T>

使用指定的相等比较器生成两个序列的并集。

```typescript
[1, 2, 3].Union([3, 4, 5])    // [1, 2, 3, 4, 5]
```

#### Where(predicate: (item: T, index?: number) => boolean): IEnumerable<T>

基于谓词筛选值序列。

```typescript
[1, 2, 3].Where(x => x > 1)    // [2, 3]
```

## 许可证

**重要提示：以下中文译文仅供参考。本项目的许可协议以英文原文为准，如有歧义应以英文原文为准。**

MIT License

Copyright (c) 2018 SUN BO <starry@vip.qq.com>

特此免费授予任何获得本软件副本和相关文档文件（"软件"）的人不受限制地处理本软件的权利，
包括不受限制地使用、复制、修改、合并、发布、分发、再许可和/或出售本软件副本，
以及允许本软件的使用者这样做，但须符合以下条件：

上述版权声明和本许可声明应包含在本软件的所有副本或重要部分中。

本软件按"原样"提供，不提供任何形式的明示或暗示的保证，包括但不限于对适销性、
特定用途的适用性和非侵权性的保证。在任何情况下，作者或版权持有人均不对任何索赔、
损害或其他责任负责，无论是在合同诉讼、侵权行为或其他方面，由软件或软件的使用或
其他交易引起、产生或与之相关。

For the original English version of the license, please see [LICENSE](LICENSE) file or [README.md](README.md#license).
