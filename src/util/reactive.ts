import { TICK, LENGTH, gaussian } from './math'
import { of, from, interval, pipe, merge, Subscription } from 'rxjs'
import {
  delay,
  mapTo,
  filter,
  concat,
  debounce,
  map,
  take,
  mergeMap,
  scan,
  reduce
} from 'rxjs/operators'

// https://rxjs-cn.github.io/learn-rxjs-operators/operators/filtering/filter.html
// 发出 (1,2,3,4,5)
//
export const filterExample = () => {
  const source = from([1, 2, 3, 4, 5])
  // 过滤掉奇数
  const example = source.pipe(filter(num => num % 2 === 0))
  // 输出: "Even number: 2", "Even number: 4"
  const subscribe = example.subscribe(val => {
    console.log(`Even number: ${val}`)
    return val
  })
  return subscribe
}

/**
 * literal example
 *
 */
export const beautyExample = () => {
  const beauty = from(['Monica', 'Johana'])
  const hansome = from(['Antonio', 'Juan'])

  const mostBeautiful = beauty.pipe(filter(name => name === 'Monica'))

  mostBeautiful.subscribe({
    next: value => console.log(`Beauty coming, she is ${value}`),
    error: error => console.log(error)
  })

  const couples = mostBeautiful.pipe(concat(hansome))
  const subscribe = couples.subscribe(value => {
    console.log(`Good couples: ${value}`)
  })
  return subscribe
}

export const mapToExample = () => {
  try {
    // 每2.5秒发出值
    const first = interval(2500)
    // 每2秒发出值
    const second = interval(2000)
    // 每1.5秒发出值
    const third = interval(1500)
    // 每1秒发出值
    const fourth = interval(1000)

    // 从一个 observable 中发出输出值
    const example = merge(
      first.pipe(mapTo('FIRST!')),
      second.pipe(mapTo('SECOND!')),
      third.pipe(mapTo('THIRD')),
      fourth.pipe(mapTo('FOURTH'))
    )
    // 输出: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
    const subscribe = example.subscribe(val => {
      console.log(val)
    })
    return subscribe
  } catch (error) {
    console.log(error)
  }
}

export const reduceExample = () => {
  const source = of(1, 2, 3, 4)
  const example = source.pipe(reduce((acc, val) => acc + val))
  // 输出: Sum: 10'
  const subscribe = example.subscribe(val => console.log('ReducedSum:', val))
  return subscribe
}

export const scanExample = () => {
  const source = of(1, 2, 3)
  // 基础的 scan 示例，从0开始，随着时间的推移计算总数
  const example = source.pipe(scan((acc, curr) => acc + curr, 0))
  // 输出累加值
  // 输出: 1,3,6
  const subscribe = example.subscribe(val => console.log('scaned', val))
  return subscribe
}

export const delayExample = () => {
  // 发出一项
  const example = of(null)
  // 每延迟一次输出便增加1秒延迟时间
  const message = merge(
    example.pipe(mapTo('Hello')),
    example.pipe(
      mapTo('World!'),
      delay(1000)
    ),
    example.pipe(
      mapTo('Goodbye'),
      delay(2000)
    ),
    example.pipe(
      mapTo('World!'),
      delay(3000)
    )
  )
  // 输出: 'Hello'...'World!'...'Goodbye'...'World!'
  const subscribe = message.subscribe(val => console.log(val))
  return subscribe
}

/**
 * Reactive Explorer Examples
 * @example
 * import { interval } from 'rxjs';
 * import { take } from 'rxjs/operators';
 * const intervalCount = interval(1000);
 * const takeFive = intervalCount.pipe(take(5));
 * takeFive.subscribe(x => console.log(x));
 */

export const pipeExample = () => {
  const draw = (brush: string) =>
    pipe(
      map((num: number) => brush.repeat(Math.floor(num * 65))),
      take(25)
    )

  const gaussianStream = interval(350).pipe(
    map(gaussian),
    draw('•')
  )

  const subscribe = gaussianStream.subscribe(v => console.log(v))
  return subscribe
}
