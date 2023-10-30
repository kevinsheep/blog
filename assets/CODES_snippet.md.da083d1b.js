import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.7c19ea01.js";const b=JSON.parse('{"title":"其他代码片段","description":"","frontmatter":{"title":"其他代码片段","updateTime":"2019/01/25","tags":"前端"},"headers":[],"relativePath":"CODES/snippet.md","filePath":"CODES/snippet.md","lastUpdated":1698628246000}'),p={name:"CODES/snippet.md"},o=l(`<h2 id="数据规整处理" tabindex="-1">数据规整处理 <a class="header-anchor" href="#数据规整处理" aria-label="Permalink to &quot;数据规整处理&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@author</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">kevinsheep</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> 根据不同位数，取最接近的10(n)*5倍数</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">val</span><span style="color:#6A737D;"> 整型数值</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getFixNum</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">val</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">n</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Math.</span><span style="color:#B392F0;">max</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, val.</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">().</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">d</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Math.</span><span style="color:#B392F0;">pow</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">, n</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> Math.</span><span style="color:#B392F0;">ceil</span><span style="color:#E1E4E8;">(val </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> d) </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> d</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">getFixNum</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">//5</span></span>
<span class="line"><span style="color:#B392F0;">getFixNum</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">//5</span></span>
<span class="line"><span style="color:#B392F0;">getFixNum</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">//10</span></span>
<span class="line"><span style="color:#B392F0;">getFixNum</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">//15</span></span>
<span class="line"><span style="color:#B392F0;">getFixNum</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">231</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">//250</span></span>
<span class="line"><span style="color:#B392F0;">getFixNum</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3991</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">//4000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@author</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">kevinsheep</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> 根据不同位数，取最接近的10(n)*5倍数</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">val</span><span style="color:#6A737D;"> 整型数值</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getFixNum</span><span style="color:#24292E;">(</span><span style="color:#E36209;">val</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">n</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Math.</span><span style="color:#6F42C1;">max</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, val.</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">().</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">d</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Math.</span><span style="color:#6F42C1;">pow</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">, n</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> Math.</span><span style="color:#6F42C1;">ceil</span><span style="color:#24292E;">(val </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> d) </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> d</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">getFixNum</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">//5</span></span>
<span class="line"><span style="color:#6F42C1;">getFixNum</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">//5</span></span>
<span class="line"><span style="color:#6F42C1;">getFixNum</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">7</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">//10</span></span>
<span class="line"><span style="color:#6F42C1;">getFixNum</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">12</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">//15</span></span>
<span class="line"><span style="color:#6F42C1;">getFixNum</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">231</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">//250</span></span>
<span class="line"><span style="color:#6F42C1;">getFixNum</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3991</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">//4000</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="ajax防重复提交" tabindex="-1">Ajax防重复提交 <a class="header-anchor" href="#ajax防重复提交" aria-label="Permalink to &quot;Ajax防重复提交&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">* </span><span style="color:#F97583;">@author</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">kevinsheep</span></span>
<span class="line"><span style="color:#6A737D;">* </span><span style="color:#F97583;">@since</span><span style="color:#6A737D;"> 2018.10</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#E1E4E8;">$.</span><span style="color:#B392F0;">ajaxSetup</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">beforeSend</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">xhr</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">_url</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.url</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;"> window.requestCount) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            window.requestCount </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;"> window.requestCount[_url]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            window.requestCount[_url] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;重复提交:&quot;</span><span style="color:#E1E4E8;">, _url) </span><span style="color:#6A737D;">//这里自定义是否提示，或提示的方法</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">complete</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">xhr</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">status</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">_url</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.url</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (window.requestCount[_url]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            window.requestCount[_url] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">* </span><span style="color:#D73A49;">@author</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">kevinsheep</span></span>
<span class="line"><span style="color:#6A737D;">* </span><span style="color:#D73A49;">@since</span><span style="color:#6A737D;"> 2018.10</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#24292E;">$.</span><span style="color:#6F42C1;">ajaxSetup</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">beforeSend</span><span style="color:#24292E;">(</span><span style="color:#E36209;">xhr</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">_url</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.url</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;"> window.requestCount) {</span></span>
<span class="line"><span style="color:#24292E;">            window.requestCount </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {}</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;"> window.requestCount[_url]) {</span></span>
<span class="line"><span style="color:#24292E;">            window.requestCount[_url] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;重复提交:&quot;</span><span style="color:#24292E;">, _url) </span><span style="color:#6A737D;">//这里自定义是否提示，或提示的方法</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">complete</span><span style="color:#24292E;">(</span><span style="color:#E36209;">xhr</span><span style="color:#24292E;">, </span><span style="color:#E36209;">status</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">_url</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.url</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (window.requestCount[_url]) {</span></span>
<span class="line"><span style="color:#24292E;">            window.requestCount[_url] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h2 id="修改后退按钮行为" tabindex="-1">修改后退按钮行为 <a class="header-anchor" href="#修改后退按钮行为" aria-label="Permalink to &quot;修改后退按钮行为&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">pushHistory</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  window.history.</span><span style="color:#B392F0;">pushState</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    title: </span><span style="color:#9ECBFF;">&quot;index&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    url: </span><span style="color:#9ECBFF;">&quot;https://ceil.top&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//定义需要强行跳转的链接地址</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, </span><span style="color:#9ECBFF;">&quot;index&quot;</span><span style="color:#E1E4E8;">, location.href)</span></span>
<span class="line"><span style="color:#E1E4E8;">  window.history.</span><span style="color:#B392F0;">pushState</span><span style="color:#E1E4E8;">({ title: </span><span style="color:#9ECBFF;">&quot;index&quot;</span><span style="color:#E1E4E8;">, url: </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> }, </span><span style="color:#9ECBFF;">&quot;index&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">pushHistory</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">//页面onload时执行</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">window.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;popstate&quot;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (window.history.state </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> window.history.state.url) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    location.href </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> window.history.state.url</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">pushHistory</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  window.history.</span><span style="color:#6F42C1;">pushState</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    title: </span><span style="color:#032F62;">&quot;index&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    url: </span><span style="color:#032F62;">&quot;https://ceil.top&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//定义需要强行跳转的链接地址</span></span>
<span class="line"><span style="color:#24292E;">  }, </span><span style="color:#032F62;">&quot;index&quot;</span><span style="color:#24292E;">, location.href)</span></span>
<span class="line"><span style="color:#24292E;">  window.history.</span><span style="color:#6F42C1;">pushState</span><span style="color:#24292E;">({ title: </span><span style="color:#032F62;">&quot;index&quot;</span><span style="color:#24292E;">, url: </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> }, </span><span style="color:#032F62;">&quot;index&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">pushHistory</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">//页面onload时执行</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">window.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;popstate&quot;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (window.history.state </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> window.history.state.url) {</span></span>
<span class="line"><span style="color:#24292E;">    location.href </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> window.history.state.url</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="h5判断手机横竖屏状态" tabindex="-1">H5判断手机横竖屏状态 <a class="header-anchor" href="#h5判断手机横竖屏状态" aria-label="Permalink to &quot;H5判断手机横竖屏状态&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//判断手机横竖屏状态：</span></span>
<span class="line"><span style="color:#E1E4E8;">window.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;onorientationchange&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> window </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;orientationchange&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;resize&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (window.orientation </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">180</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> window.orientation </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">alert</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;竖屏状态！&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (window.orientation </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">90</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> window.orientation </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">90</span><span style="color:#E1E4E8;"> ){ </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">alert</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;横屏状态！&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//判断手机横竖屏状态：</span></span>
<span class="line"><span style="color:#24292E;">window.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;onorientationchange&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> window </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;orientationchange&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;resize&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (window.orientation </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">180</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> window.orientation </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">alert</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;竖屏状态！&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (window.orientation </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">90</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> window.orientation </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">90</span><span style="color:#24292E;"> ){ </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">alert</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;横屏状态！&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}, </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`,8),e=[o];function t(r,c,E,y,i,u){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{b as __pageData,d as default};
