lg(GetScriptName());

let guestList = "Guests: \n * John \n Pete: \n";

let str1 = "Hello\nWorld";
let str3 = `Hello
World`;

lg("\u00A9");
lg("\u{1F60D}");

lg(str1[5]);
lg(str1.charAt(5));

lg(str1[1000] === undefined);
lg(str1.charAt(1000) === '' );

for (let ch in "hello"){
    lg(ch);  // key
}

for (let ch of "hello"){
    lg(ch);  // value
}

// case 
lg(str1.toUpperCase());
lg(str1.toLowerCase());

// search
let str4 = "Widget with id";
lg(str4.indexOf('Widget')); //0, 
lg(str4.indexOf('widget')); //-1, not found
lg(str4.indexOf("id")); //1, 

let str5 = "aa bb cc dd aaa fff ddd aa cc z";
lg('last index:' + str5.lastIndexOf("aa"));
lg('last index:' + str5.lastIndexOf("aa", 10)); // wrong

// has substring
lg('Has substring : ' + str5.includes("aa"));
lg('Has substring : from position 10 : ' + str5.includes("bb", 10));

lg(str5.startsWith("aaa")); // false
lg(str5.endsWith("aa")); // false

// slice
lg(str5.slice(10, 10+5)); // 10 -> 15
lg(str5.slice(2)); // 2 -> end
lg(str5.slice(-5, -1)); // 5th from end -> 1th from end
lg(str5.slice(4,2)); // empty string

// substring 
lg(str5.substring(2,6));
lg(str5.substring(6,2));
lg(str5.slice(2,6));

// substr
lg("substring : " + str5.substr(1, 5));
lg("substring : " + str5.substr(-1, 5));

// code point <-> string
lg("z".codePointAt(0));
lg(String.fromCodePoint("90"));

lg('\u005a'); // Z

let str8 = '';
for (let i = 65; i <= 220; i++) {
    str8 += String.fromCodePoint(i);
}
lg( str8 );

// surrogate
lg( '😂'.length );
for(let c of '😂'){
    lg(c);
    // ð
    // Ÿ
    // ˜
    // ‚
}