import{_ as i,c as a,ag as n,o as l}from"./chunks/framework.OIs7uhT6.js";const E=JSON.parse('{"title":"避免 vue 双向绑定进入死循环","description":"","frontmatter":{},"headers":[],"relativePath":"memo/web/vmodel-loop-error.md","filePath":"memo/web/vmodel-loop-error.md","lastUpdated":1729145874000}'),e={name:"memo/web/vmodel-loop-error.md"};function p(t,s,h,k,r,d){return l(),a("div",null,s[0]||(s[0]=[n(`<h1 id="避免-vue-双向绑定进入死循环" tabindex="-1">避免 vue 双向绑定进入死循环 <a class="header-anchor" href="#避免-vue-双向绑定进入死循环" aria-label="Permalink to &quot;避免 vue 双向绑定进入死循环&quot;">​</a></h1><blockquote><p>更新绑定值时校验值是否相等 如果相等则不进行更新</p></blockquote><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { isEqual } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;lodash-es&#39;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// ...</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">watch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    handler</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(newValue, oldValue) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isEqual</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(newValue, oldValue)) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$emit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;input&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, newValue)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// ...</span></span></code></pre></div>`,3)]))}const c=i(e,[["render",p]]);export{E as __pageData,c as default};
