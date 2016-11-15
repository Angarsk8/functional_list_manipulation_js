/* HEAD AND TAIL FUNCTIONS */

export const hd = ([head, ..._]) => head
export const tl = ([_, ...tail]) => tail

/* IS_LIST FUNCTION */

export const is_list = list => Array.isArray(list)

/* LENGTH FUNCTION */

export const length = list => _length(list, 0)
const _length = ([_, ...tail], acc) =>
  ![_, ...tail][0] ? acc : _length(tail, acc + 1)

/* REDUCE FUNCTION */

export const reduce = ([head, ...tail], acc = 0, fun) =>
  !length([head, ...tail]) ? acc : reduce(tail, fun(acc, head), fun)

/* MAP FUNCTION IMPLEMENTATIONS */

export const map = (list, fun) =>
  reduce(list, [], (acc, val) => [...acc, fun(val)])

export const map2 = (list, fun) => _map2(list, fun, [])
const _map2 = ([head, ...tail], fun, acc) =>
  !length([head, ...tail]) ? acc : _map2(tail, fun, [...acc, fun(head)])

export const map3 = ([head, ...tail], fun) =>
  !length([head, ...tail]) ? [] : [fun(head), ...map3(tail, fun)]

/* FILTER FUNCTION IMPLEMENTATIONS */

export const filter = (list, fun) =>
  reduce(list, [], (acc, val) => fun(hd(list)) ? [...acc, hd(list)] : acc)

export const filter2 = (list, fun) => _filter2(list, fun, [])
const _filter2 = ([head, ...tail], fun, acc) =>
  !length([head, ...tail]) ? acc : _filter2(tail, fun, fun(head) ? [...acc, head] : acc)

export const filter3 = ([head, ...tail], fun) =>
  !length([head, ...tail]) ? [] : (
    fun(head) ? [head, ...filter3(tail, fun)] : filter3(tail, fun)
  )

/* FOREACH FUNCTION */

export const foreach = ([head, ...tail], fun) =>
  !length([head, ...tail]) ? undefined : (
    fun(head) ? undefined : foreach(tail, fun)
  )

/* REVERSE FUNCTION */

export const reverse = ([head, ...tail]) =>
  !length([head, ...tail]) ? [] : [...reverse(tail), head]

/* SOME FUNCTION */

export const some = ([head, ...tail], fun) =>
  !length([head, ...tail]) ? false : (
    fun(head) ? true : some(tail, fun)
  )

/* EVERY FUNCTION */

export const every = ([head, ...tail], fun) =>
  !length([head, ...tail]) ? true : (
    fun(head) ? every(tail, fun) : false
  )

/* FLATTEN FUNCTION */

export const flatten = ([head, ...tail]) =>
  !length([head, ...tail]) ? [] : (
    is_list(head)
    ? [...flatten(head), ...flatten(tail)]
    : [head, ...flatten(tail)]
  )

/* CONCAT FUNCTION */

export const concat = (list, ...values) => [...list, ...flatten(values)]


/* FILL FUNCTION */

export const fill = (list, val, start = 0, end = length(list)) =>
  _fill(list, val, start, end, 0)

const _fill = ([head, ...tail], val, start, end, index) =>
  !length([head, ...tail]) ? [] : (
    index >= start && index <= end
    ? [val , ..._fill(tail, val, start, end, index + 1)]
    : [head, ..._fill(tail, val, start, end - 1, index + 1)]
  )

/* JOIN FUNCTION */

export const join = (list, sep) =>
  reduce(list, "", (acc, val) => !acc ? `${val}` : `${acc}${sep}${val}`)

/* TO_STRING FUNCTION */

export const to_string = list => join(list, ",")

/* FIND FUNCTION */

export const find = ([head, ...tail], fun) =>
  !length([head, ...tail]) ? undefined : (
    fun(head) ? head : find(tail, fun)
  )

/* BASIC SORT FUNCTION */

export const basic_sort = ([head, ...tail])  =>
  !length([head, ...tail]) ? [] :  (
    concat(
      sort(filter([head, ...tail], x => x < head)),
      head,
      sort(filter([head, ...tail], x => x > head))
    )
  )

/* RANGE FUNCTION */

export const range = (start, finish) => _range(start, finish, [])
const _range = (start, finish, acc) =>
  start > finish ? acc : _range(start + 1, finish, [...acc, start])
