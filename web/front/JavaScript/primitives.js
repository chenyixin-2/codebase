lg(GetScriptName());

lg(0xFF);
lg(0xff);
lg(0b11111111);
lg(0o377);

lg(1e-6);

// num -> string
let num = 10;
lg(num.toString());
lg(num.toString(16)); // base 16
lg(12356..toString(2)); // 

// rounding
lg(Math.floor(3.1));
lg(Math.ceil(-1.1));
lg(Math.round(3.1));
lg(Math.round(3.6));
lg(Math.trunc(3.1));
lg(Math.trunc(-1.1));

// fixed
lg("to fixed : " + 1234.233.toFixed(10));

// is Finite
lg(isFinite(NaN));
lg(isNaN(NaN));
lg(isFinite(-1 / 0));
lg(isFinite(Infinity));

// special
lg(NaN === NaN); //false, NaN is unique
lg(Object.is(NaN, NaN) === true); // true, 
lg(Object.is(0, -0) === false); // true, -0 had sign bit, which different from 0

// string -> int / float
lg(parseInt('100px'));
lg(parseFloat('12.5em'));
lg(parseInt('12.3'));
lg(parseFloat('12.3.4'));

lg(parseFloat('a123')); // NaN, not a number, the first symbol (a) stops the process

lg(parseInt('0Xff', 16));
lg(parseInt('0XFF', 16)); // upper case
lg(parseInt('ff', 16)); // without 0x
lg(parseInt('2n9c', 36));

// foo's length 
// iteralbe arguments
lg('foo\'s length :' + 'foo'.length);
lg(Array.from('foo'));
lg(Array.from(new Set(['foo', 'bar', 'baz', 'foo'])));
lg(Array.from(new Map([[1, 2], [2, 4], [4, 8]])));
lg(Array.from(new Map([['1','a'], ['2', 'b']])));
