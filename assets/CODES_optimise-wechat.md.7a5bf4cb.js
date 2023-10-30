import{_ as e,o as t,c as a,Q as o}from"./chunks/framework.7c19ea01.js";const c="/assets/docs/miniprogram.png",f=JSON.parse('{"title":"微信小程序性能优化","description":"","frontmatter":{"title":"微信小程序性能优化","updateTime":"2023/05/21","tags":"前端|wechat"},"headers":[],"relativePath":"CODES/optimise-wechat.md","filePath":"CODES/optimise-wechat.md","lastUpdated":1698628246000}'),i={name:"CODES/optimise-wechat.md"},p=o('<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>最近遇到的一些微信小程序性能开发案例，记录一下心得。</p><p>项目背景，是一个控制家电的应用。包括家庭、房间、设备、场景等维度。其中设备列表是以卡片列表形式展示。卡片可以看到设备的名称、图标，开关、离线状态；交互还蛮多，可以直接控制，也可以点击弹出控制框进行更多的控制，还可以长按进行拖拽排序、批量编辑。界面还受 <code>websocket</code> 推送的影响，需要实时刷新列表。</p><p><img src="'+c+'" alt="miniprogram"></p><p>项目刚开始，都只是十来条的测试设备数据，负责设备模块的同事，尽职完成产品的需求。效果酷炫的同时还兼顾了丝滑。</p><p>没想到同事离职后，领导忽然要做压力测试。大家蓦然发现，才增加到 40 个设备，原来运行得好好的应用，就开始明显卡顿；增加到 80 个设备后，已卡到怀疑人生。包括首次加载，以及非常简单的操作交互。</p><p>尽管一个房间同时放上百个设备的场景不多，但 40 个设备就明显卡顿，实在很难向领导解释。努力优化吧！</p><h2 id="基本的优化" tabindex="-1">基本的优化 <a class="header-anchor" href="#基本的优化" aria-label="Permalink to &quot;基本的优化&quot;">​</a></h2><p>首先找到<a href="https://developers.weixin.qq.com/community/business/course/000606628dc2e86dc0ddcbb115940d" target="_blank" rel="noreferrer">官方文档</a>，所有相关的优化实践都研究一番，能做的都做一遍。收效有，但不明显。</p><p>除了官方文档提及的，还使用过的主要措施，包括：</p><ul><li><p>引入官方的长列表组件 <code>recycle-view</code>，好像是快了，但页面调用变复杂了。最主要是没有达到预期的效果，而且还会出现一些莫名的缺项问题，快速滚动时的体验也因为分屏加载的原因而较差。官方文档也语焉不详，颇难进一步优化。再一想，其实 100 个卡片，每行 4 个，这规模也没有那么长。</p></li><li><p>使用独立的渲染列表。即将业务数据和渲染用的数据区分开来，为渲染单独映射一个列表，以免因为冗余数据导致 <code>setData</code> 的数据量过大。</p></li><li><p>使用分页加载的方式，将渲染列表，从一维数据变为二维数据，以便逐页进行 <code>setData</code> 操作，这个方案在前期优化成效相对显著，保证了第一屏快速展示，体验马上就相来了。在用户发呆时，列表余下部分就默默加载完了。</p></li><li><p>在多处地方使用节流控制，包括鼠标事件处理器、高频查询接口、高频的全列表刷新、<code>websocket</code> 响应等。</p></li><li><p>引入类似 <code>lodash._get</code> 的方法，精确到字段地对列表进行 diff，减少渲染压力。</p></li></ul><h2 id="被忽略的大鱼" tabindex="-1">被忽略的大鱼 <a class="header-anchor" href="#被忽略的大鱼" aria-label="Permalink to &quot;被忽略的大鱼&quot;">​</a></h2><p>也不能说是大 BUG，毕竟是正经的代码逻辑。</p><p>排查代码时，偶然发现一些用于循环的基础卡片组件，直接使用 <code>store</code> 的数据绑定。这样引用，确实能实现跨组件的状态响应式同步，然而随着业务功能细化，<code>store</code> 越来越大时，这种滥用就让状态管理不堪重负了，更新非常慢，而且循环中把一大块数据都连带着，<code>setData</code> 也频繁在控制台输出超出 1024KB 的 <code>warning</code>。</p><p>改用直接参数传递，实现基础组件与业务解耦，性能翻倍提升。可以找领导交差了。</p>',15),d=[p];function s(r,l,n,_,h,m){return t(),a("div",null,d)}const b=e(i,[["render",s]]);export{f as __pageData,b as default};
