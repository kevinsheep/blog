---
title: 把人工智能嵌入到VitePress
updateTime: 2023/02/16
---

## Intro
网上到处可见各种引流的应用。

这些应用大部分还是非常不稳定的，界面和交互粗制滥造，可居然有些还要收费体验。毕竟能蹭流量赚点钱，还是很多人愿意的，也不知道有多少人是[付费使用API](https://openai.com/api/pricing/)的。

最近连微软也要把ChatGPT加入到搜索引擎中了，New Bing什么的。这样的关注量，利益驱动，或许真的能大大加快人工智能的发展吧！

我也尝试在博客中引入一下，效果如：[openai-playground](/CODES/openai-playground.html)

## 准备工作
1. 如果注册和试用ChatGPT，[另文介绍](/CODES/ChatGPT.html)。

2. 注册好后，拿到属于自己的[API keys](https://platform.openai.com/account/api-keys)

3. 挑选想要调用的[应用例子](https://platform.openai.com/examples)，点进去拿到对应的API代码。

## 挂到后端服务
以 eggjs 为例。服务部署过程从略。
安装好 eggjs 后，再安装一下 `openapi`：

```nodejs
npm install openapi
```

主要的代码如下：

::: code-group
```javascript [router]
// ~/router.js
module.exports = (app) => {
  const { router, controller } = app;
  router.post('/chat', controller.home.chat);
};
```

```javascript [controller]
// ~/controller/home.js
const { Controller } = require('egg');

class HomeController extends Controller {
  async chat() {
    const { service, request } = this.ctx;
    const { words } = request.body;
    const res = await service.openai.chat(words);
    this.ctx.body = res;
  }
}

module.exports = HomeController;
```

```javascript [service]
// ~/service/github.js
const { Service } = require('egg');
const { Configuration, OpenAIApi } = require('openai');

class ChatService extends Service {
  async chat(prompt = '') {
    // ~/config 配置文件内容从略
    const { open_api_key } = this.config;
    const configuration = new Configuration({
      apiKey: open_api_key,
    });
    const openai = new OpenAIApi(configuration);

    // 以下可参考官方不同的样例代码
    // `max_tokens` 越大，答案最大长度最长，免费账户或付费账户的钱花得越快
    // 可是太小了，答案往往没有说完就戛然而止
    try {
      const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.9,
        max_tokens: 500, 
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: [' Human:', ' AI:'],
      });

      return completion.data.choices[0].text;
    } catch (error) {
      if (error.response) {
        return error.response.status;
      }
      return '';
    }
  }
}

module.exports = ChatService;
```
:::

## 引入到VitePress
服务搭建好后，就着手搞前端的调用。

先写好调用 eggjs 服务的方法：

```typescript
//～/openai.ts
import axios from 'axios';

const baseURL = 'xxxxx'; // 这里是 eggjs 所在的地址`
const axiosService = axios.create({ baseURL });

// 默认有一段引入语，要不然空空的也不便开始使用
export const DEFAULT_CHAT = 'Human:你叫什么名字？\nAI:';

// 生成对话
export const generateChat = async (words: string) => {
    const url = '/chat';
    const res = await axiosService({ method: 'post', url, data: { words } });

    if (res && res.data) {
        return `${words}${res.data}\n\nHuman:`;
    }

    return words;
};
```

将主要的页面放到一个组件中：

```vue
<script setup>
import { ref } from 'vue';
import { generateChat, DEFAULT_CHAT } from '../openai.ts';

const chat = ref(DEFAULT_CHAT);

const send = async () =>  chat.value = await generateChat(chat.value);

const input = ({ target }) => (chat.value = target.value);

const reset = () => (chat.value = DEFAULT_CHAT);
</script>

<template>
    <div class="wrapper">
        <textarea :value="chat" @input="input" placeholder="基于 ChatGPT API 的聊天程序" />
    </div>
    <div class="toolbar">
        <span class="letters">{{ chat.length || 0 }}</span>
        <button @click="send" class="send">Send</button>
        <button @click="reset">Reset</button>
    </div>
</template>

<style scoped>
/**样式从略 */
</style>

```

随意新建个md文档，引入前面做好的调用组件：

```vue
---
title: ChatGPT Playground
---

<script setup>
import OpenAI from '../.vitepress/components/OpenAI.vue'
</script>

<Suspense>
    <OpenAI />
</Suspense>
```

这里我使用的是默认的 `docs` 布局，当然你也可以选用没有边框，或者特殊的布局，甚至空页面。由于组件含异步调用，故使用 `Suspense` 包裹着。

以上。
