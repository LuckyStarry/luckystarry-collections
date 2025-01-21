# luckystarry-collections

[English](README.md) | [中文](README_CN.md)

A .NET-style collection library that provides LINQ-like methods for arrays, such as _Select_, _Where_, _ToList_, etc.

[![CI Test](https://github.com/LuckyStarry/luckystarry-collections/actions/workflows/ci-test.yml/badge.svg)](https://github.com/LuckyStarry/luckystarry-collections/actions/workflows/ci-test.yml)
[![Coverage Status](https://coveralls.io/repos/github/LuckyStarry/luckystarry-collections/badge.svg?branch=master)](https://coveralls.io/github/LuckyStarry/luckystarry-collections?branch=master)
[![Npm Status](https://img.shields.io/npm/v/luckystarry-collections.svg)](https://www.npmjs.com/package/luckystarry-collections)
[![install size](https://packagephobia.com/badge?p=luckystarry-collections)](https://packagephobia.com/result?p=luckystarry-collections)
[![JSDelivr](https://data.jsdelivr.com/v1/package/npm/luckystarry-collections/badge)](https://www.jsdelivr.com/package/npm/luckystarry-collections)
[![codebeat badge](https://codebeat.co/badges/6339b0a3-d394-4706-b283-b8bfc6acd0dc)](https://codebeat.co/projects/github-com-luckystarry-luckystarry-collections-master)
[![Known Vulnerabilities](https://snyk.io/test/github/LuckyStarry/luckystarry-collections/badge.svg?targetFile=package.json)](https://snyk.io/test/github/LuckyStarry/luckystarry-collections?targetFile=package.json)
[![License Status](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://raw.githubusercontent.com/LuckyStarry/luckystarry-collections/master/LICENSE)

## Install

### Package Installation

```bash
npm install -S luckystarry-collections
```

When using this method, add the following code at your project entry point to extend the **Array** prototype:

```typescript
import 'luckystarry-collections'
```

### Browser Usage

```html
<script src="https://cdn.jsdelivr.net/npm/luckystarry-collections/dist/index.min.js"></script>
```

## Usage

### Classes and Interfaces

#### IEnumerable<T>

Interface for enumerable collections

#### List<T> and IList<T>

List object and list interface

#### Dictionary<TKey, TValue> and IDictionary<TKey, TValue>

Dictionary object and dictionary interface

#### ReadOnlyCollection<T>

Read-only list

#### Array<T>

Array

### Common Collection Methods

#### All(predicate: (item: T) => boolean): boolean

Determines whether all elements in the collection satisfy the specified condition. Returns true if all elements meet the condition, otherwise returns false.

```typescript
[1, 2, 3].All(x => x > 0)    // true
[1, 2, 3].All(x => x > 1)    // false
```

#### Any(predicate: (item: T) => boolean): boolean

Determines whether any element in the collection satisfies the specified condition. Returns true if any element meets the condition, otherwise returns false.

```typescript
[1, 2, 3].Any(x => x > 0)    // true
[1, 2, 3].Any(x => x > 1)    // true
[1, 2, 3].Any(x => x > 3)    // false
```

#### AsEnumerable(): IEnumerable<T>

Converts the collection to its enumerable interface form.

```typescript
[1, 2, 3].AsEnumerable()     // [1, 2, 3]
```

#### Average(selector?: (item: T) => number): number | null

Computes the average of the collection. For non-numeric collections, use the selector to map elements to numbers.

```typescript
[1, 2, 3].Average()          // 2
[1, 2, 3].Average(x => x * 2)    // 4
```

#### Concat(second: IEnumerable<T>): IEnumerable<T>

Concatenates two collections.

```typescript
[1, 2, 3].Concat([3, 4, 5])    // [1, 2, 3, 3, 4, 5]
```

#### Contains(value: T, comparer?: IEqualityComparer<T>): boolean

Determines whether the collection contains the specified element. An optional equality comparer can be provided.

```typescript
[1, 2, 3].Contains(2)    // true
```

#### Count(predicate?: (item: T) => boolean): number

Counts the number of elements that satisfy the specified condition. If no condition is provided, returns the total count of elements.

```typescript
[1, 2, 3].Count()            // 3
[1, 2, 3].Count(x => x > 1)  // 2
```

#### DefaultIfEmpty(defaultValue?: IEnumerable<T>): IEnumerable<T>

Returns defaultValue if the collection is empty; otherwise, returns a new collection containing all original elements.

```typescript
[1, 2, 3].DefaultIfEmpty()   // [1, 2, 3]
[].DefaultIfEmpty([1])       // [1]
```

#### Distinct(comparer?: IEqualityComparer<T>): IEnumerable<T>

Returns distinct elements from the collection. An optional equality comparer can be provided.

```typescript
[1, 2, 3].Distinct()         // [1, 2, 3]
[1, 2, 3, 3, 4].Distinct()   // [1, 2, 3, 4]
```

#### ElementAt(index: number): T

Returns the element at the specified index.

```typescript
[1, 2, 3].ElementAt(1)       // 2
```

#### ElementAtOrDefault(defaultValue: T, index: number): T

Returns the element at the specified index or defaultValue if the index is out of range.

```typescript
[1, 2, 3].ElementAtOrDefault(0, 1)    // 2
[1, 2, 3].ElementAtOrDefault(0, 3)    // 0
```

#### Except(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T>

Returns elements that exist in the first collection but not in the second collection.

```typescript
[1, 2, 3].Except([3, 4])    // [1, 2]
```

#### First(predicate?: (item: T) => boolean): T

Returns the first element that satisfies the condition. If no condition is provided, returns the first element.

```typescript
[1, 2, 3].First()           // 1
[1, 2, 3].First(x => x > 1) // 2
```

#### FirstOrDefault(defaultValue: T, predicate?: (item: T) => boolean): T

Returns the first element that satisfies the condition, or defaultValue if no element is found. If no condition is provided, returns the first element or defaultValue if the collection is empty.

```typescript
[1, 2, 3].FirstOrDefault(0)                // 1
[1, 2, 3].FirstOrDefault(0, x => x > 1)    // 2
[1, 2, 3].FirstOrDefault(0, x => x > 3)    // 0
```

#### GroupBy<TKey, TElement = T>(keySelector: (item: T) => TKey, elementSelector?: (item: T) => TElement, comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>

Groups elements by a key selector and maps elements using an optional element selector. An optional comparer can be used for key equality comparison.

```typescript
[1, 2, 3].GroupBy(x => x)    
// [{ Key: 1, [1] }, { Key: 2, [2] }, { Key: 3, [3] }]

[{ Value: 1 }, { Value: 1 }, { Value: 2 }].GroupBy(x => x.Value, e => e)
// [{ Key: 1, [{ Value: 1 }, { Value: 1}] }, { Key: 2, [{ Value: 2}] }]
```

#### GroupJoin<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (item: T) => TKey, innerKeySelector: (item: TInner) => TKey, resultSelector?: (item: T, inners: IEnumerable<TInner>) => TResult, comparer?: IEqualityComparer<TKey>): IEnumerable<TResult>

Correlates elements of two sequences based on key equality and groups the results.

```typescript
[1, 2, 3].GroupJoin([3, 4, 5], o => o, i => i)
// [{ Outer: 1, Inners: [] }, { Outer: 2, Inners: [] }, { Outer: 3, Inners: [3] }]
```

#### Intersect(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T>

Returns elements that exist in both collections. An optional comparer can be used for element equality comparison.

```typescript
[1, 2, 3].Intersect([3, 4])    // [3]
```

#### Join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (item: T) => TKey, innerKeySelector: (item: TInner) => TKey, resultSelector?: (item: T, inners: TInner) => TResult, comparer?: IEqualityComparer<TKey>): IEnumerable<TResult>

Correlates elements of two sequences based on matching keys.

```typescript
[1, 2, 3].Join([3, 4, 5], o => o, i => i)
// [{ Outer: 3, Inner: 3 }]
```

#### Last(predicate?: (item: T) => boolean): T

Returns the last element that satisfies the condition. If no condition is provided, returns the last element.

```typescript
[1, 2, 3].Last()            // 3
[1, 2, 3].Last(x => x > 1)  // 3
```

#### LastOrDefault(defaultValue: T, predicate?: (item: T) => boolean): T

Returns the last element that satisfies the condition, or defaultValue if no element is found. If no condition is provided, returns the last element or defaultValue if the collection is empty.

```typescript
[1, 2, 3].LastOrDefault(0)                 // 3
[1, 2, 3].LastOrDefault(0, x => x > 1)     // 3
[1, 2, 3].LastOrDefault(0, x => x < 1)     // 0
```

#### Max(selector?: (item: T) => number): number | null

Returns the maximum value in the collection. For non-numeric collections, use the selector to map elements to numbers.

```typescript
[1, 2, 3].Max()             // 3
[1, 2, 3].Max(x => x * 2)   // 6
```

#### Min(selector?: (item: T) => number): number | null

Returns the minimum value in the collection. For non-numeric collections, use the selector to map elements to numbers.

```typescript
[1, 2, 3].Min()             // 1
[1, 2, 3].Min(x => x * 2)   // 2
```

#### Reverse(): IEnumerable<T>

Returns a new collection with elements in reverse order.

```typescript
[1, 2, 3].Reverse()         // [3, 2, 1]
```

#### Select<TResult>(selector: (item: T, index?: number) => TResult): IEnumerable<TResult>

Projects each element into a new form using the selector function.

```typescript
[1, 2, 3].Select(x => x)        // [1, 2, 3]
[1, 2, 3].Select(x => x * 3)    // [3, 6, 9]
```

#### SelectMany<TCollection, TResult = TCollection>(collectionSelector: (item: T, index?: number) => IEnumerable<TCollection>, resultSelector?: (item: T, collection: TCollection) => TResult): IEnumerable<TResult>

Projects each element to an IEnumerable<T> and flattens the resulting sequences into one sequence.

```typescript
[[1, 2], [2, 3], [3, 4]].SelectMany(x => x)    // [1, 2, 2, 3, 3, 4]
```

#### SequenceEqual(second: Iterable<T>, comparer?: IEqualityComparer<T>): boolean

Determines whether two sequences are equal by comparing their elements.

```typescript
[1, 2, 3].SequenceEqual([1, 2, 3])         // true
[1, 2, 3, 4].SequenceEqual([1, 2, 3])      // false
[1, 2, 3].SequenceEqual([3, 2, 1])         // false
```

#### Single(predicate?: (item: T) => boolean): T

Returns the only element that satisfies the condition. Throws an exception if there is not exactly one element.

```typescript
[1].Single()                    // 1
[1, 2, 3].Single(x => x > 2)   // 3
```

#### SingleOrDefault(defaultValue: T, predicate?: (item: T) => boolean): T

Returns the only element that satisfies the condition, or defaultValue if no element is found. Throws an exception if there is more than one matching element.

```typescript
[1].SingleOrDefault(0)                      // 1
[1, 2, 3].SingleOrDefault(0, x => x > 2)    // 3
[1, 2, 3].SingleOrDefault(0, x => x > 3)    // 0
```

#### Skip(count: number): IEnumerable<T>

Bypasses a specified number of elements and returns the remaining elements.

```typescript
[1, 2, 3].Skip(1)    // [2, 3]
```

#### SkipWhile(predicate: (item: T, index?: number) => boolean): IEnumerable<T>

Bypasses elements while the predicate is true and returns the remaining elements.

```typescript
[1, 2, 3].SkipWhile(x => x < 2)    // [2, 3]
```

#### Sum(selector?: (item: T) => number): number | null

Computes the sum of the sequence. For non-numeric collections, use the selector to map elements to numbers.

```typescript
[1, 2, 3].Sum()                 // 6
[1, 2, 3].Sum(x => x * 2)       // 12
```

#### Take(count: number): IEnumerable<T>

Returns a specified number of contiguous elements from the start of the sequence.

```typescript
[1, 2, 3].Take(2)    // [1, 2]
```

#### TakeWhile(predicate: (item: T, index?: number) => boolean): IEnumerable<T>

Returns elements from the start of the sequence while the predicate is true.

```typescript
[1, 2, 3].TakeWhile(x => x < 2)    // [1]
```

#### ToArray(): Array<T>

Creates an array from the collection.

```typescript
[1, 2, 3].ToArray()    // [1, 2, 3]
```

#### ToDictionary<TKey, TElement = T>(keySelector: (item: T) => TKey, elementSelector?: (item: T) => TElement, comparer?: IEqualityComparer<TKey>): Dictionary<TKey, TElement>

Creates a Dictionary<TKey, TElement> from the collection using the specified key and element selectors.

```typescript
[1, 2, 3].ToDictionary(x => x)    // Dictionary { 1 => 1, 2 => 2, 3 => 3 }
```

#### ToList(): List<T>

Creates a List<T> from the collection.

```typescript
[1, 2, 3].ToList()    // List [1, 2, 3]
```

#### Union(second: Iterable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T>

Produces the set union of two sequences by using the specified equality comparer.

```typescript
[1, 2, 3].Union([3, 4, 5])    // [1, 2, 3, 4, 5]
```

#### Where(predicate: (item: T, index?: number) => boolean): IEnumerable<T>

Filters a sequence of values based on a predicate.

```typescript
[1, 2, 3].Where(x => x > 1)    // [2, 3]
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
