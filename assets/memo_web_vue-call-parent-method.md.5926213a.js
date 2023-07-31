import{_ as s,o as a,c as n,U as l}from"./chunks/framework.a0f12ab5.js";const A=JSON.parse('{"title":"vue 中子组件调用父组件方法最佳实践","description":"","frontmatter":{},"headers":[],"relativePath":"memo/web/vue-call-parent-method.md","filePath":"memo/web/vue-call-parent-method.md","lastUpdated":1690786726000}'),p={name:"memo/web/vue-call-parent-method.md"},e=l(`<h1 id="vue-中子组件调用父组件方法最佳实践" tabindex="-1">vue 中子组件调用父组件方法最佳实践 <a class="header-anchor" href="#vue-中子组件调用父组件方法最佳实践" aria-label="Permalink to &quot;vue 中子组件调用父组件方法最佳实践&quot;">​</a></h1><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// parent-component</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 将需要被 &lt;Child/&gt; 调用的方法通过 v-bind 传递给 &lt;Child/&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Child</span><span style="color:#89DDFF;"> :refresh=&quot;query&quot;&gt;&lt;/Child&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">default</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">  methods: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">query</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// child-component</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 在 &lt;Child/&gt; 中通过 props.refresh 调用 &lt;Parent/&gt; 中的方法</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">  &lt;div @click=&quot;refresh&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">default</span><span style="color:#89DDFF;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">  props: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">refresh</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Function</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#82AAFF;">default</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div>`,2),o=[e];function t(c,r,D,y,i,F){return a(),n("div",null,o)}const d=s(p,[["render",t]]);export{A as __pageData,d as default};
