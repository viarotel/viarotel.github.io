import{_ as a,o as s,c as e,V as o}from"./chunks/framework.89869c06.js";const m=JSON.parse('{"title":"Hyper-V 删除损坏的虚拟机","description":"","frontmatter":{},"headers":[],"relativePath":"category/microsoft/hyperv-damage.md"}'),n={name:"category/microsoft/hyperv-damage.md"},t=o(`<h1 id="hyper-v-删除损坏的虚拟机" tabindex="-1">Hyper-V 删除损坏的虚拟机 <a class="header-anchor" href="#hyper-v-删除损坏的虚拟机" aria-label="Permalink to &quot;Hyper-V 删除损坏的虚拟机&quot;">​</a></h1><blockquote><p>注意: 必须在管理员权限下执行</p></blockquote><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 获取虚拟机列表</span></span>
<span class="line"><span style="color:#FFCB6B;">vm-get</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 删除指定虚拟机</span></span>
<span class="line"><span style="color:#FFCB6B;">remove-vm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Windows10</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-force</span></span></code></pre></div>`,3),l=[t];function p(c,r,i,_,y,d){return s(),e("div",null,l)}const C=a(n,[["render",p]]);export{m as __pageData,C as default};
