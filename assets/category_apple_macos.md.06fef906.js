import{_ as s,o as a,c as n,V as l}from"./chunks/framework.89869c06.js";const A=JSON.parse('{"title":"macOS 常用命令","description":"","frontmatter":{},"headers":[],"relativePath":"category/apple/macos.md"}'),o={name:"category/apple/macos.md"},p=l(`<h1 id="macos-常用命令" tabindex="-1">macOS 常用命令 <a class="header-anchor" href="#macos-常用命令" aria-label="Permalink to &quot;macOS 常用命令&quot;">​</a></h1><div class="language-zsh"><button title="Copy Code" class="copy"></button><span class="lang">zsh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 修复打开软件提示已损坏 appPath 为软件路径</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">xattr</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-r</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">com.apple.quarantine</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">appPath</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 开启允许任何来源</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">spctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--master-disable</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 启用管理员权限</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">su</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 退出管理员权限</span></span>
<span class="line"><span style="color:#82AAFF;">exit</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 安装 Rosetta</span></span>
<span class="line"><span style="color:#FFCB6B;">softwareupdate</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--install-rosetta</span></span></code></pre></div>`,2),t=[p];function e(c,r,i,y,C,_){return a(),n("div",null,t)}const D=s(o,[["render",e]]);export{A as __pageData,D as default};
