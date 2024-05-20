"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function add(a, b) {
    return a + b;
}
function times(n) {
    var promise = new Promise(function (resolve) {
        setTimeout(function (a) {
            resolve(a);
        }, n * 1000, 67);
    });
    return promise;
}
console.log('Before promise');
var prom = times(5);
times(5).then(function (result) {
    console.log("done", result);
}).catch(function () {
    console.log("rejected");
});
console.log("promise worked");
