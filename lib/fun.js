"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

/* HEAD AND TAIL FUNCTIONS */

var hd = exports.hd = function hd(_ref) {
  var _ref2 = _toArray(_ref),
      head = _ref2[0],
      _ = _ref2.slice(1);

  return head;
};
var tl = exports.tl = function tl(_ref3) {
  var _ref4 = _toArray(_ref3),
      _ = _ref4[0],
      tail = _ref4.slice(1);

  return tail;
};

/* IS_LIST FUNCTION */

var is_list = exports.is_list = function is_list(list) {
  return Array.isArray(list);
};

/* LENGTH FUNCTION */

var length = exports.length = function length(list) {
  return _length(list, 0);
};
var _length = function _length(_ref5, acc) {
  var _ref6 = _toArray(_ref5),
      _ = _ref6[0],
      tail = _ref6.slice(1);

  return ![_].concat(_toConsumableArray(tail))[0] ? acc : _length(tail, acc + 1);
};

/* REDUCE FUNCTION */

var reduce = exports.reduce = function reduce(_ref7) {
  var _ref8 = _toArray(_ref7),
      head = _ref8[0],
      tail = _ref8.slice(1);

  var acc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var fun = arguments[2];
  return !length([head].concat(_toConsumableArray(tail))) ? acc : reduce(tail, fun(acc, head), fun);
};

/* MAP FUNCTION IMPLEMENTATIONS */

var map = exports.map = function map(list, fun) {
  return reduce(list, [], function (acc, val) {
    return [].concat(_toConsumableArray(acc), [fun(val)]);
  });
};

var map2 = exports.map2 = function map2(list, fun) {
  return _map2(list, fun, []);
};
var _map2 = function _map2(_ref9, fun, acc) {
  var _ref10 = _toArray(_ref9),
      head = _ref10[0],
      tail = _ref10.slice(1);

  return !length([head].concat(_toConsumableArray(tail))) ? acc : _map2(tail, fun, [].concat(_toConsumableArray(acc), [fun(head)]));
};

var map3 = exports.map3 = function map3(_ref11, fun) {
  var _ref12 = _toArray(_ref11),
      head = _ref12[0],
      tail = _ref12.slice(1);

  return !length([head].concat(_toConsumableArray(tail))) ? [] : [fun(head)].concat(_toConsumableArray(map3(tail, fun)));
};

/* FILTER FUNCTION IMPLEMENTATIONS */

var filter = exports.filter = function filter(list, fun) {
  return reduce(list, [], function (acc, val) {
    return fun(hd(list)) ? [].concat(_toConsumableArray(acc), [hd(list)]) : acc;
  });
};

var filter2 = exports.filter2 = function filter2(list, fun) {
  return _filter2(list, fun, []);
};
var _filter2 = function _filter2(_ref13, fun, acc) {
  var _ref14 = _toArray(_ref13),
      head = _ref14[0],
      tail = _ref14.slice(1);

  return !length([head].concat(_toConsumableArray(tail))) ? acc : _filter2(tail, fun, fun(head) ? [].concat(_toConsumableArray(acc), [head]) : acc);
};

var filter3 = exports.filter3 = function filter3(_ref15, fun) {
  var _ref16 = _toArray(_ref15),
      head = _ref16[0],
      tail = _ref16.slice(1);

  return !length([head].concat(_toConsumableArray(tail))) ? [] : fun(head) ? [head].concat(_toConsumableArray(filter3(tail, fun))) : filter3(tail, fun);
};

/* FOREACH FUNCTION */

var foreach = exports.foreach = function foreach(_ref17, fun) {
  var _ref18 = _toArray(_ref17),
      head = _ref18[0],
      tail = _ref18.slice(1);

  return !length([head].concat(_toConsumableArray(tail))) ? undefined : fun(head) ? undefined : foreach(tail, fun);
};

/* REVERSE FUNCTION */

var reverse = exports.reverse = function reverse(_ref19) {
  var _ref20 = _toArray(_ref19),
      head = _ref20[0],
      tail = _ref20.slice(1);

  return !length([head].concat(_toConsumableArray(tail))) ? [] : [].concat(_toConsumableArray(reverse(tail)), [head]);
};

/* SOME FUNCTION */

var some = exports.some = function some(_ref21, fun) {
  var _ref22 = _toArray(_ref21),
      head = _ref22[0],
      tail = _ref22.slice(1);

  return !length([head].concat(_toConsumableArray(tail))) ? false : fun(head) ? true : some(tail, fun);
};

/* EVERY FUNCTION */

var every = exports.every = function every(_ref23, fun) {
  var _ref24 = _toArray(_ref23),
      head = _ref24[0],
      tail = _ref24.slice(1);

  return !length([head].concat(_toConsumableArray(tail))) ? true : fun(head) ? every(tail, fun) : false;
};

/* FLATTEN FUNCTION */

var flatten = exports.flatten = function flatten(_ref25) {
  var _ref26 = _toArray(_ref25),
      head = _ref26[0],
      tail = _ref26.slice(1);

  return !length([head].concat(_toConsumableArray(tail))) ? [] : is_list(head) ? [].concat(_toConsumableArray(flatten(head)), _toConsumableArray(flatten(tail))) : [head].concat(_toConsumableArray(flatten(tail)));
};

/* CONCAT FUNCTION */

var concat = exports.concat = function concat(list) {
  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  return [].concat(_toConsumableArray(list), _toConsumableArray(flatten(values)));
};

/* FILL FUNCTION */

var fill = exports.fill = function fill(list, val) {
  var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var end = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : length(list);
  return _fill(list, val, start, end, 0);
};

var _fill = function _fill(_ref27, val, start, end, index) {
  var _ref28 = _toArray(_ref27),
      head = _ref28[0],
      tail = _ref28.slice(1);

  return !length([head].concat(_toConsumableArray(tail))) ? [] : index >= start && index <= end ? [val].concat(_toConsumableArray(_fill(tail, val, start, end, index + 1))) : [head].concat(_toConsumableArray(_fill(tail, val, start, end - 1, index + 1)));
};

/* JOIN FUNCTION */

var join = exports.join = function join(list, sep) {
  return reduce(list, "", function (acc, val) {
    return !acc ? "" + val : "" + acc + sep + val;
  });
};

/* TO_STRING FUNCTION */

var to_string = exports.to_string = function to_string(list) {
  return join(list, ",");
};

/* FIND FUNCTION */

var find = exports.find = function find(_ref29, fun) {
  var _ref30 = _toArray(_ref29),
      head = _ref30[0],
      tail = _ref30.slice(1);

  return !length([head].concat(_toConsumableArray(tail))) ? undefined : fun(head) ? head : find(tail, fun);
};

/* BASIC SORT FUNCTION */

var basic_sort = exports.basic_sort = function basic_sort(_ref31) {
  var _ref32 = _toArray(_ref31),
      head = _ref32[0],
      tail = _ref32.slice(1);

  return !length([head].concat(_toConsumableArray(tail))) ? [] : concat(sort(filter([head].concat(_toConsumableArray(tail)), function (x) {
    return x < head;
  })), head, sort(filter([head].concat(_toConsumableArray(tail)), function (x) {
    return x > head;
  })));
};

/* RANGE FUNCTION */

var range = exports.range = function range(start, finish) {
  return _range(start, finish, []);
};
var _range = function _range(start, finish, acc) {
  return start > finish ? acc : _range(start + 1, finish, [].concat(_toConsumableArray(acc), [start]));
};
