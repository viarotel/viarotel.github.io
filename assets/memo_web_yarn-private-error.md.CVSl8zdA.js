import{_ as a,o as e,c as t,ah as s}from"./chunks/framework.iWru6dEE.js";const k=JSON.parse('{"title":"修复设置 npm 私服后 yarn 无法安装包的问题","description":"","frontmatter":{},"headers":[],"relativePath":"memo/web/yarn-private-error.md","filePath":"memo/web/yarn-private-error.md","lastUpdated":1720608146000}'),r={name:"memo/web/yarn-private-error.md"},i=s('<h1 id="修复设置-npm-私服后-yarn-无法安装包的问题" tabindex="-1">修复设置 npm 私服后 yarn 无法安装包的问题 <a class="header-anchor" href="#修复设置-npm-私服后-yarn-无法安装包的问题" aria-label="Permalink to &quot;修复设置 npm 私服后 yarn 无法安装包的问题&quot;">​</a></h1><blockquote><p>具体表现为 yarn install 提示 error Couldn&#39;t find package &quot;tinycolor2&quot; on the &quot;npm&quot; registry.</p></blockquote><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> always-auth</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span></span></code></pre></div>',3),n=[i];function o(p,l,h,c,d,_){return e(),t("div",null,n)}const u=a(r,[["render",o]]);export{k as __pageData,u as default};