import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.c697fbd8.js";const u=JSON.parse('{"title":"vue 中子组件调用父组件方法最佳实践","description":"","frontmatter":{},"headers":[],"relativePath":"memo/web/vue-call-parent-method.md","filePath":"memo/web/vue-call-parent-method.md","lastUpdated":1693984904000}'),p={name:"memo/web/vue-call-parent-method.md"},t=l(`<h1 id="vue-中子组件调用父组件方法最佳实践" tabindex="-1">vue 中子组件调用父组件方法最佳实践 <a class="header-anchor" href="#vue-中子组件调用父组件方法最佳实践" aria-label="Permalink to &quot;vue 中子组件调用父组件方法最佳实践&quot;">​</a></h1><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// parent-component</span></span>
<span class="line"><span style="color:#6A737D;">// 将需要被 &lt;Child/&gt; 调用的方法通过 v-bind 传递给 &lt;Child/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#79B8FF;">Child</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">:refresh=&quot;query&quot;&gt;&lt;/Child&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#B392F0;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">query</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span><span style="color:#FDAEB7;font-style:italic;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// child-component</span></span>
<span class="line"><span style="color:#6A737D;">// 在 &lt;Child/&gt; 中通过 props.refresh 调用 &lt;Parent/&gt; 中的方法</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&lt;div</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">@click=&quot;refresh&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#B392F0;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  props: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    refresh: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: Function,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span><span style="color:#FDAEB7;font-style:italic;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// parent-component</span></span>
<span class="line"><span style="color:#6A737D;">// 将需要被 &lt;Child/&gt; 调用的方法通过 v-bind 传递给 &lt;Child/&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#005CC5;">Child</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">:refresh=&quot;query&quot;&gt;&lt;/Child&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">export</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  methods: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">query</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">}</span><span style="color:#B31D28;font-style:italic;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// child-component</span></span>
<span class="line"><span style="color:#6A737D;">// 在 &lt;Child/&gt; 中通过 props.refresh 调用 &lt;Parent/&gt; 中的方法</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&lt;div</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">@click=&quot;refresh&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">export</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  props: {</span></span>
<span class="line"><span style="color:#24292E;">    refresh: {</span></span>
<span class="line"><span style="color:#24292E;">      type: Function,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {}</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">}</span><span style="color:#B31D28;font-style:italic;">;</span></span></code></pre></div>`,2),e=[t];function o(c,r,i,y,E,d){return n(),a("div",null,e)}const f=s(p,[["render",o]]);export{u as __pageData,f as default};
