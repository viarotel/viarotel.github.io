import{_ as s,c as i,ag as t,o as e}from"./chunks/framework.OIs7uhT6.js";const o=JSON.parse('{"title":"让 await 永远不要抛出错误","description":"","frontmatter":{},"headers":[],"relativePath":"memo/web/await-catch.md","filePath":"memo/web/await-catch.md","lastUpdated":1729145874000}'),n={name:"memo/web/await-catch.md"};function h(l,a,p,k,r,d){return e(),i("div",null,a[0]||(a[0]=[t(`<h1 id="让-await-永远不要抛出错误" tabindex="-1">让 await 永远不要抛出错误 <a class="header-anchor" href="#让-await-永远不要抛出错误" aria-label="Permalink to &quot;让 await 永远不要抛出错误&quot;">​</a></h1><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 这样的话，请求失败也不会抛错</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> result</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> e;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div>`,2)]))}const E=s(n,[["render",h]]);export{o as __pageData,E as default};
