---
title: 微信小程序导出csv数据
updateTime: 2024/06/16
tags: json|csv|wechat
---

## Intro
去年底，为了鼓励孩子锻炼身体，又不接受别人做好的工具中，那些扑面而来的开屏广告，就自己开发了个[小闻打卡](/CODES/punch-of-miniprogram.html)小程序。

当时规划要做的“数据导出”功能，一拖就是半年。

## 方案选择
导出数据，一般 CSV 文件就够用了，Excel 没必要，文件大不必说，而且导出数据是为了二次编辑、整理，也没有必要设置复杂的格式。

本着“不重复造轮子”的原则，就先找一下现成的 `json2csv` 工具库。安装都很顺利，但对微信小程序而言，安装依赖包后，还要再次在开发工具中“构建npm”，这个对 npm 包有比较多的约束。折腾了半天，发现就像掉进一个越来越大的坑中。

有这功夫，干脆自己写一个格式转换方法得了！

## JSON TO CSV
写转换方法时，还是想偷个懒，想看看 AI 工具能不能自动生成我要的代码……生成结果如下：

```javascript{19,20}
// BY IFLYCODE
function jsonToCsv(json) {
  const keys = Object.keys(json[0]);
  const result = [];

  result.push(keys.join(',')); // 添加表头

  for (let i = 0; i < json.length; i++) {
    let line = '';
    for (let j = 0; j < keys.length; j++) {
      line += json[i][keys[j]];
      if (j < keys.length - 1) {
        line += ',';
      }
    }
    result.push(line); // 添加数据行
  }

  return result.join('
'); // 将结果数组转换为CSV字符串
}

const json = [
  { "name": "张三", "age": 30, "city": "北京" },
  { "name": "李四", "age": 28, "city": "上海" },
  { "name": "王五", "age": 25, "city": "深圳" }
];

console.log(jsonToCsv(json));
```

首先尝试的是科大讯飞。生成的代码质量……甚至不能直接跑起来。仔细查看，是由于换行直接用 `''` 进行包裹，不会用转义符 `\n`，也不会用模板字符串 ` `` ` 表达，于是出错。

又找 ChatGPT、文心一言对比了下，各有千秋，不过好歹能直接跑。其中 ChatGPT 的代码较为简练，深得我心。但可能用的都是 3.x 免费版本，总是有点欠缺，还是要加工一番。

不是为了讨论 AIGC 的，AI 生成的代码，就不全部贴上来了。

后来我自己写的，为了使用方便，考虑到了数组/非数组的情况，作了简单的兼容。

代码如下：

```typescript
/**
 * csv 格式 节点转换
 */
function parseCsvToken(obj: object | string | number) {
  if (isNumber(obj)) {
    return obj;
  }
  if (isString(obj)) {
    return JSON.stringify(obj);
  }
  return `"${JSON.stringify(obj).replace(/\"/g, '""')}"`;
}

/**
 * json 转为 csv 格式，若 json 为数组，则递归调用本方法
 * @param obj 要转换的源数据
 * @param withTh 是否推入表头（列表数据只需要推入第一个表头）
 * @returns string
 */
function json2csv(obj: WechatMiniprogram.IAnyObject, withTh = true) {
  const json = typeof obj === 'object' ? obj : JSON.parse(obj);
  const result = [];

  if (isArray(json)) {
    json.forEach((ele, index) => {
      result.push(json2csv(ele as WechatMiniprogram.IAnyObject, index === 0));
    });
  } else {
    const keys = Object.keys(json).map((k) => parseCsvToken(k));
    const values = Object.values(json).map((v) =>
      parseCsvToken(v as WechatMiniprogram.IAnyObject)
    );
    if (withTh) {
      result.push(keys.join(','));
    }
    result.push(values.join(','));
  }

  return result.join('\r\n');
}
```

## 应用到小程序中
基础方法说得再厉害，还是要落地使用才有意义。

使用的是 `writeFile` 方法，封装成 promise 更方便：

```typescript
// 将二进制数据写入到文件
export async function writeFile(data: string | ArrayBuffer, filePath: string, encoding: FileEncoding = 'utf-8') {
  return new Promise<string>((resolve, reject) =>
    wx.getFileSystemManager().writeFile({
      filePath,
      data,
      encoding,
      success(res) {
        resolve(filePath)
      },
      fail(err) {
        reject(err)
      },
    }),
  )
}
```

有了 CSV 文件，就可以使用 `shareFileMessage` 保存或转发，对应方法也习惯封装一下：

```typescript
// 转发文件到聊天
export async function shareFileMessage(filePath: string) {
  return new Promise<WechatMiniprogram.GeneralCallbackResult>((resolve, reject) =>
    wx.shareFileMessage({
      filePath,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    }),
  )
}
```

实践过程有个小坑提一下。

原本的思路，是点一下按钮，生成 CSV 文件后，就自动触发保存/转发的动作。可是实际上报错了：

::: danger 微信开发者工具：
Error: MiniProgramError
\{"errMsg":"shareFileMessage:fail can only be invoked by user TAP gesture."\}
:::

我大脑死循环了好一会：点按钮时马上就保存文件？可是这时文件都还没生成啊？🙃

进入页面即自动生成文件？浪费计算资源，不太科学。

放两个按钮，一个生成，一个下载，分别操作？这样的用户交互又很蠢。

最后的方案，是待 CSV 文件生成成功后，弹出对话框，让用户确认一下，似乎没那么蠢了：

![CSV Share](/assets/docs/csv-share.png)

保存文件，打开查看效果：

![CSV Share](/assets/docs/csv-file.png)

大功告成！