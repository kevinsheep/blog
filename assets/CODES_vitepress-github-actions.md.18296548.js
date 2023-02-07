import{_ as s,o as n,c as a,a as p}from"./app.c22aa5a8.js";const m=JSON.parse('{"title":"自动部署博客","description":"","frontmatter":{"title":"自动部署博客","updateTime":"2023/01/28"},"headers":[{"level":2,"title":"Github","slug":"github","link":"#github","children":[]},{"level":2,"title":"Gitee","slug":"gitee","link":"#gitee","children":[]}],"relativePath":"CODES/vitepress-github-actions.md","lastUpdated":1675782493000}'),e={name:"CODES/vitepress-github-actions.md"},l=p(`<p>一般文档，写到构建完成就该差不多了。可 <code>VitePress</code> 相当认真地，写了在好几种平台上的部署方案。详见 <a href="https://vitepress.vuejs.org/guide/deploying" target="_blank" rel="noreferrer">Deploying</a>。</p><h2 id="github" tabindex="-1">Github <a class="header-anchor" href="#github" aria-hidden="true">#</a></h2><p>使用 GitHub Actions 发布的体验很舒服。</p><p>你只需要配置好 GitHub Actions，每次 Git Push 后，坐等几分钟就看到自己的博客自动更新了，当然，前提是你已本地测试完善没有构建错误，也没有文章死链等。</p><p>VitePress 官方文档连<a href="https://vitepress.vuejs.org/guide/deploying" target="_blank" rel="noreferrer">使用 GitHub Actions 部署的方法</a>都有教，可谓相当贴心了。</p><p>官方文档的 yml 配置是基于 <code>yarn</code> 打包的，这里分享一下我基于 <code>pnmp</code> 打包的配置文件：</p><div class="language-yml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;"># Simple workflow for deploying static content to GitHub Pages</span></span>
<span class="line"><span style="color:#A6ACCD;">name: Deploy static content to Pages</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">on:</span></span>
<span class="line"><span style="color:#A6ACCD;">  # Runs on pushes targeting the default branch</span></span>
<span class="line"><span style="color:#A6ACCD;">  push:</span></span>
<span class="line"><span style="color:#A6ACCD;">    branches: [&#39;master&#39;]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  # Allows you to run this workflow manually from the Actions tab</span></span>
<span class="line"><span style="color:#A6ACCD;">  workflow_dispatch:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages</span></span>
<span class="line"><span style="color:#A6ACCD;">permissions:</span></span>
<span class="line"><span style="color:#A6ACCD;">  contents: write</span></span>
<span class="line"><span style="color:#A6ACCD;">  pages: write</span></span>
<span class="line"><span style="color:#A6ACCD;">  id-token: write</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Allow one concurrent deployment</span></span>
<span class="line"><span style="color:#A6ACCD;">concurrency:</span></span>
<span class="line"><span style="color:#A6ACCD;">  group: &#39;pages&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  cancel-in-progress: true</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">jobs:</span></span>
<span class="line"><span style="color:#A6ACCD;">  # Single deploy job since we&#39;re just deploying</span></span>
<span class="line"><span style="color:#A6ACCD;">  deploy:</span></span>
<span class="line"><span style="color:#A6ACCD;">    environment:</span></span>
<span class="line"><span style="color:#A6ACCD;">      name: github-pages</span></span>
<span class="line"><span style="color:#A6ACCD;">      url: \${{ steps.deployment.outputs.page_url }}</span></span>
<span class="line"><span style="color:#A6ACCD;">    runs-on: ubuntu-latest</span></span>
<span class="line"><span style="color:#A6ACCD;">    steps:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - name: Checkout</span></span>
<span class="line"><span style="color:#A6ACCD;">        uses: actions/checkout@v3</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#A6ACCD;">      - name: Install Node.js</span></span>
<span class="line"><span style="color:#A6ACCD;">        uses: actions/setup-node@v3</span></span>
<span class="line"><span style="color:#A6ACCD;">        with:</span></span>
<span class="line"><span style="color:#A6ACCD;">          node-version: 18</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span></span>
<span class="line"><span style="color:#A6ACCD;">      - uses: pnpm/action-setup@v2</span></span>
<span class="line"><span style="color:#A6ACCD;">        name: Install pnpm</span></span>
<span class="line"><span style="color:#A6ACCD;">        id: pnpm-install</span></span>
<span class="line"><span style="color:#A6ACCD;">        with:</span></span>
<span class="line"><span style="color:#A6ACCD;">          version: 7</span></span>
<span class="line"><span style="color:#A6ACCD;">          run_install: false</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      - name: Get pnpm store directory</span></span>
<span class="line"><span style="color:#A6ACCD;">        id: pnpm-cache</span></span>
<span class="line"><span style="color:#A6ACCD;">        shell: bash</span></span>
<span class="line"><span style="color:#A6ACCD;">        run: |</span></span>
<span class="line"><span style="color:#A6ACCD;">          echo &quot;STORE_PATH=$(pnpm store path)&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      - uses: actions/cache@v3</span></span>
<span class="line"><span style="color:#A6ACCD;">        name: Setup pnpm cache</span></span>
<span class="line"><span style="color:#A6ACCD;">        with:</span></span>
<span class="line"><span style="color:#A6ACCD;">          path: \${{ steps.pnpm-cache.outputs.STORE_PATH }}</span></span>
<span class="line"><span style="color:#A6ACCD;">          key: \${{ runner.os }}-pnpm-store-\${{ hashFiles(&#39;**/pnpm-lock.yaml&#39;) }}</span></span>
<span class="line"><span style="color:#A6ACCD;">          restore-keys: |</span></span>
<span class="line"><span style="color:#A6ACCD;">            \${{ runner.os }}-pnpm-store-</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      - name: Install dependencies</span></span>
<span class="line"><span style="color:#A6ACCD;">        run: pnpm install</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span></span>
<span class="line"><span style="color:#A6ACCD;">      - name: Build</span></span>
<span class="line"><span style="color:#A6ACCD;">        run: pnpm docs:build</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#A6ACCD;">      - name: Deploy</span></span>
<span class="line"><span style="color:#A6ACCD;">        uses: peaceiris/actions-gh-pages@v3</span></span>
<span class="line"><span style="color:#A6ACCD;">        with:</span></span>
<span class="line"><span style="color:#A6ACCD;">          github_token: \${{ secrets.GITHUB_TOKEN }}</span></span>
<span class="line"><span style="color:#A6ACCD;">          publish_dir: docs/dist</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br></div></div><h2 id="gitee" tabindex="-1">Gitee <a class="header-anchor" href="#gitee" aria-hidden="true">#</a></h2><p>本博客同时发布到 GitHub 与 Gitee，有对比就伤害，差距太大了。</p><p>Gitee 这边的免费服务就没那么好用了。要自动发布？有个“流水线”不知道好不好用，反正收费。自定义域名？收费。每次发布的过程中，Gitee Pages 还会有中国特色的“内容审查”，发布时会提示查出问题，可只告诉你是哪页内容，而不告诉你有什么问题。谁知道那些落后的关键词匹配法，会包括哪些敏感词？</p><p>我仍然是使用本地手动生成静态，再上传更新这种传统而麻烦方式。过段时间打算写个本地脚本执行好了。<strong>TODO</strong></p>`,11),r=[l];function c(i,o,t,b,A,u){return n(),a("div",null,r)}const y=s(e,[["render",c]]);export{m as __pageData,y as default};
