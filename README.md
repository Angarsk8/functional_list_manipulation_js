# List Manipulation In JavaScript (Functional Approach)

This is a little project that I wrote in a couple of hours as a proof of concept. This project pretends to prove that is possible to recreate some of the most important methods in the `Array.prototype` object by just using functional programming ideas such as:
`Pure Functions`, `Recursion`, `The Head and Tail Pattern`, `Immutability`, `Accumulators` and `Pattern Matching` (Array Destructuring is the closest thing to Pattern Matching in JavaScript).

## Constraints

It was not allowed to use any of the following built in features of JavaScript:

* Control Flow Constructs (`if..elseif..else`, `switch`, `for`, `while`, `do..while`, `try..catch..final`, etc)
* Mutable Variables (`var`, `let`)
* Object Oriented Programming Techniques (classes, prototypes, plain objects, etc)
* `Array.prototype` Methods (Obviously! With the exception of `Array.prototype.isArray`)

## Functions

These are the functions that I decided to implement for this exercise:

### Head

Returns the head or first element of the given list. Not available in `Array.prototype`.

```javascript
export const hd = ([head, ..._]) => head
```

### Tail

Returns the tail of the given list. Not available in `Array.prototype`.

```javascript
export const tl = ([_, ...tail]) => tail
```

### Length

Returns the length of the given list.

```javascript
export const length = list => _length(list, 0)

const _length = ([_, ...tail], acc) =>
  ![_, ...tail][0] ? acc : _length(tail, acc + 1)
```

### Is_List

I know, this is a very dumb function ``¯\_(ツ)_/¯``

```javascript
export const is_list = list => Array.isArray(list)
```

### Reduce

```javascript
export const reduce = ([head, ...tail], acc = 0, fun) =>
  !length([head, ...tail]) ? acc : reduce(tail, fun(acc, head), fun)
```

### Map

```javascript
// Using our custom reduce function
export const map = (list, fun) =>
  reduce(list, [], (acc, val) => [...acc, fun(val)])
```

### Filter

```javascript
// Using our custom reduce function
export const filter = (list, fun) =>
  reduce(list, [], (acc, val) => fun(hd(list)) ? [...acc, hd(list)] : acc)
```

### Foreach

```javascript
export const foreach = ([head, ...tail], fun) =>
  !length([head, ...tail]) ? undefined : (
    fun(head) ? undefined : foreach(tail, fun)
  )
```

### Reverse

```javascript
export const reverse = ([head, ...tail]) =>
  !length([head, ...tail]) ? [] : [...reverse(tail), head]
```

### Some

```javascript
export const some = ([head, ...tail], fun) =>
  !length([head, ...tail]) ? false : (
    fun(head) ? true : some(tail, fun)
  )
```

### Every

```javascript
export const every = ([head, ...tail], fun) =>
  !length([head, ...tail]) ? true : (
    fun(head) ? every(tail, fun) : false
  )
```

### Flatten

```javascript
export const flatten = ([head, ...tail]) =>
  !length([head, ...tail]) ? [] : (
    is_list(head)
    ? [...flatten(head), ...flatten(tail)]
    : [head, ...flatten(tail)]
  )
```

### Concat

```javascript
export const concat = (list, ...values) => [...list, ...flatten(values)]
```

### Fill

```javascript
export const fill = (list, val, start = 0, end = length(list)) =>
  _fill(list, val, start, end, 0)

const _fill = ([head, ...tail], val, start, end, index) =>
  !length([head, ...tail]) ? [] : (
    index >= start && index <= end
    ? [val , ..._fill(tail, val, start, end, index + 1)]
    : [head, ..._fill(tail, val, start, end - 1, index + 1)]
  )
```

### Join

```javascript
export const join = (list, sep) =>
  reduce(list, "", (acc, val) => !acc ? `${val}` : `${acc}${sep}${val}`)
```

### To_String

```javascript
export const to_string = list => join(list, ",")
```

### Find

```javascript
export const find = ([head, ...tail], fun) =>
  !length([head, ...tail]) ? undefined : (
    fun(head) ? head : find(tail, fun)
  )
```

### Range

Not available in `Array.prototype`, but still very useful to create lists of consecutive numbers.

```javascript
export const range = (start, finish) => _range(start, finish, [])
const _range = (start, finish, acc) =>
  start > finish ? acc : _range(start + 1, finish, [...acc, start])
```
