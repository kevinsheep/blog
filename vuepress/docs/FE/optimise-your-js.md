---
updateTime: 2019/01/25
---

# JavaScript代码优化
**程序**，是为了发挥计算机最大的优势，能用指令更省力地、自动地完成一系列操作，让繁重的操作变得轻松，让冗长的代码变得简洁易读，而不是让我们自己的工作变得更麻烦。  
<!-- more -->
无论使用何种语言和语法，写代码都是需要技巧的。  
见识过一些代码，用着匪夷所思的麻烦方式来实现一些不必要的操作。有一些其实自己也曾用过，😏但一旦掌握了更好的办法后，会再也不想回去。  
当然，不断优化代码的目的，不是刻意地追求简短。  
代码简洁、可读性、执行效率需要一个平衡。如果其中一方面只是稍差一点，以微小的代价可使其他方面大大提高，那么这种优化就是值得的。如果各方面都能提高，那更是势在必行的优化了。  
以下从亲自经历的项目、网上案例中收集，供参考。

::: tip
ES6\7发布后，一些传统的算法有了更简洁的解决方案，有时我们称之为**现代**写法。  
本文个别代码会使用到这些语法，而不会所有地方都加以说明。
:::

## 多重条件判断

判断**多个条件中的一条**成立，比较直接的想法可能是这样：
```javascript
function test(condition) {
  if (condition == "CA" || condition == "CB" || condition == "CC") {
    console.log(true)
  }
  else {
    console.log(false)
  }
}
test("CA") //true
test("CX") //false
```

特别地，当所需的输出值/返回值是 `Bool` 类型时，那么 `if-else` 的写法就可以省略了：
```javascript
function test(condition) {
  console.log (condition == "CA" || condition == "CB" || condition == "CC");
}
test("CA") //true
test("CX") //false
```

如果有很多个条件呢，总不能一直使用 `||` 并列下去。  
可使用 `Array.includes` 优化 <Badge text="ES2016" type="tip"/>：
```javascript
function test(condition) {
  console.log (["CA", "CB", "CC", "CD", "CE"].includes(condition))
}
test("CA") //true
test("CX") //false
```

## 数据处理

假设已有一个数组 `arrA`，需要先把数据结构稍作更改，然后筛选其中符合条件的对象，放进新数组 `arrB` 中。  
```javascript
let arrA = [
  {
    name: "aaa",
    amount: 11
  },
  {
    name: "bbb",
    amount: 22
  },
  {
    name: "ccc",
    amount: 33
  }
]

//期望得到结构稍微不同，amount小于30的数组：
let arrB = [
  {
    item: {
      id: 0,
      name: "aaa",
      amount: 11
    }
  },
  {
    item: {
      id: 1,
      name: "bbb",
      amount: 22
    }
  }
]
```

使用 `for` 循环的写法（也可以用 `forEach` ，思路是差不多的）
```javascript
let arrB = []
for(let index in arrA) {
  let item = arrA[index]
  if (item.amount < 30) {
    arrB.push({
      item: {
        id: parseInt(index),
        name: item.name,
        amount: item.amount
      }
    })
  }
}
```

虽然结果达到预期，思路也清晰，但不太简洁。  
可使用 `Array.filter` `Array.map` 优化下 <Badge text="ES2016" type="tip"/>：
```javascript
let arrB = arrA
    .filter(ele => ele.amount < 30)
    .map(item => ({ item }))
arrB.forEach((ele, id) => {ele.item.id = id})
```

::: tip
以上也叫“函数式编程”。  
大部分的数据转换操作，都可以用函数式编程的方式处理。
:::