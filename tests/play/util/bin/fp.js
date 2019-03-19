"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
exports.TICK = 350;
exports.LENGTH = 25;
function gaussian(i) {
    var variance = 0.6;
    var shift = 2;
    var x = (shift * 2 * i) / (exports.LENGTH - 1) - shift;
    var value = Math.exp(-Math.pow(x, 2) / (2 * variance)) / Math.sqrt(2 * Math.PI * variance);
    return value;
}
exports.gaussian = gaussian;
var histogram = function () {
    var draw = function (brush) {
        return rxjs_1.pipe(operators_1.map(function (num) { return brush.repeat(Math.floor(num * 65)); }), operators_1.take(25));
    };
    var gaussianStream = rxjs_1.interval(350).pipe(operators_1.map(gaussian), draw('-'), operators_1.map(function (v) { return '|' + v + v.length; }));
    var subscribe = gaussianStream.subscribe(function (v) { return console.log(v); });
    return subscribe;
};
var scanExample = function () {
    var source = rxjs_1.of(1, 2, 3);
    // 基础的 scan 示例，从0开始，随着时间的推移计算总数
    var example = source.pipe(operators_1.scan(function (acc, curr) { return acc + curr; }, 0));
    // 输出累加值
    // 输出: 1,3,6
    var subscribe = example.subscribe(function (val) { return console.log('scaned', val); });
    return subscribe;
};
var delayExample = function () {
    // 发出一项
    var example = rxjs_1.of(null);
    // 每延迟一次输出便增加1秒延迟时间
    var message = rxjs_1.merge(example.pipe(operators_1.mapTo('Hello')), example.pipe(operators_1.mapTo('World!'), operators_1.delay(1000)), example.pipe(operators_1.mapTo('Goodbye'), operators_1.delay(2000)), example.pipe(operators_1.mapTo('World!'), operators_1.delay(3000)));
    // 输出: 'Hello'...'World!'...'Goodbye'...'World!'
    var subscribe = message.subscribe(function (val) { return console.log(val); });
    return subscribe;
};
delayExample();
scanExample();
histogram();
//# sourceMappingURL=fp.js.map