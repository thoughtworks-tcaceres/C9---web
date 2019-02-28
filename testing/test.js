var string1 = "tyler";
var string2 = "relyto";

var myMap = {};
var myMap2 = {};


for(var i = 0; i < string1.length; i++) {
    var currentChar = string1.charAt(i);
    //console.log(currentChar);
    if(myMap[currentChar] === undefined) {
        myMap[currentChar] = 0;
    }
        myMap[currentChar] += 1;
}

for(var i = 0; i < string2.length; i++) {
    var currentChar = string2.charAt(i);
    //console.log(currentChar);
    if(myMap2[currentChar] === undefined) {
        myMap2[currentChar] = 0;
    }
        myMap2[currentChar] += 1;
}

var same = true;

console.log(myMap);
var myMapKeys = Object.keys(myMap);

myMapKeys.forEach(function(mapItem) {
    if(myMap[mapItem] !== myMap2[mapItem]) {
        same = false;
    }
    });

// for(var i = 0; i < myMapKeys.length; i++) {
//     if (myMap[myMapKeys[i]] !== myMap2[myMapKeys[i]]) {
//         same = false;
//     }
// }

console.log(same);
