import{_ as a,o as e,c as t,R as n}from"./chunks/framework.23834729.js";const m=JSON.parse('{"title":"修复设置 npm 私服后 yarn 无法安装包的问题","description":"","frontmatter":{},"headers":[],"relativePath":"category/web/yarn-private-error.md"}'),s={name:"category/web/yarn-private-error.md"},o=n('<h1 id="修复设置-npm-私服后-yarn-无法安装包的问题" tabindex="-1">修复设置 npm 私服后 yarn 无法安装包的问题 <a class="header-anchor" href="#修复设置-npm-私服后-yarn-无法安装包的问题" aria-label="Permalink to &quot;修复设置 npm 私服后 yarn 无法安装包的问题&quot;">​</a></h1><blockquote><p>具体表现为 yarn install 提示 error Couldn&#39;t find package &quot;tinycolor2&quot; on the &quot;npm&quot; registry.</p></blockquote><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">config</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">set</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">always-auth</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true</span></span></code></pre></div>',3),r=[o];function l(p,c,i,_,y,d){return e(),t("div",null,r)}const h=a(s,[["render",l]]);export{m as __pageData,h as default};