import { interval, merge, of, pipe } from "rxjs";
import { delay, map, mapTo, scan, take } from "rxjs/operators";
export const TICK = 350;
export const LENGTH = 25;

export function gaussian(i: number) {
  const variance = 0.6;
  const shift = 2;
  const x = (shift * 2 * i) / (LENGTH - 1) - shift;
  const value = Math.exp(-Math.pow(x, 2) / (2 * variance)) / Math.sqrt(2 * Math.PI * variance);
  return value;
}

const histogram = () => {
  const draw = (brush: string) =>
    pipe(
      map((num: number) => brush.repeat(Math.floor(num * 65))),
      take(25),
    );

  const gaussian_stream = interval(350).pipe(
    map(gaussian),
    draw("-"),
    map(v => "|" + v + v.length),
  );

  const subscribe = gaussian_stream.subscribe(v => console.log(v));
};

const scanExample = () => {
  const source = of(1, 2, 3);
  // 基础的 scan 示例，从0开始，随着时间的推移计算总数
  const example = source.pipe(scan((acc, curr) => acc + curr, 0));
  // 输出累加值
  // 输出: 1,3,6
  const subscribe = example.subscribe(val => console.log("scaned", val));
  return subscribe;
};

const delayExample = () => {
  // 发出一项
  const example = of(null);
  // 每延迟一次输出便增加1秒延迟时间
  const message = merge(
    example.pipe(mapTo("Hello")),
    example.pipe(
      mapTo("World!"),
      delay(1000),
    ),
    example.pipe(
      mapTo("Goodbye"),
      delay(2000),
    ),
    example.pipe(
      mapTo("World!"),
      delay(3000),
    ),
  );
  // 输出: 'Hello'...'World!'...'Goodbye'...'World!'
  const subscribe = message.subscribe(val => console.log(val));
  return subscribe;
};

delayExample();
scanExample();
histogram();
