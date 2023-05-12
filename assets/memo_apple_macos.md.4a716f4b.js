import{_ as s,o as a,c as n,R as l}from"./chunks/framework.bdd825cc.js";const C=JSON.parse('{"title":"macOS 配置及常用命令","description":"","frontmatter":{},"headers":[],"relativePath":"memo/apple/macos.md","filePath":"memo/apple/macos.md","lastUpdated":1683891457000}'),o={name:"memo/apple/macos.md"},e=l(`<h1 id="macos-配置及常用命令" tabindex="-1">macOS 配置及常用命令 <a class="header-anchor" href="#macos-配置及常用命令" aria-label="Permalink to &quot;macOS 配置及常用命令&quot;">​</a></h1><h2 id="macos-配置" tabindex="-1">macOS 配置 <a class="header-anchor" href="#macos-配置" aria-label="Permalink to &quot;macOS 配置&quot;">​</a></h2><h3 id="macos-脚本加载器" tabindex="-1">macOS 脚本加载器 <a class="header-anchor" href="#macos-脚本加载器" aria-label="Permalink to &quot;macOS 脚本加载器&quot;">​</a></h3><div class="language-zsh"><button title="Copy Code" class="copy"></button><span class="lang">zsh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">/bin/zsh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-c</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#FFCB6B;">curl</span><span style="color:#C3E88D;"> -fsSL https://cdn.jsdelivr.net/gh/viarotel-org/environments@main/apple/shell/main.sh</span><span style="color:#89DDFF;">)&quot;</span></span></code></pre></div><h3 id="macos-环境配置" tabindex="-1">macOS 环境配置 <a class="header-anchor" href="#macos-环境配置" aria-label="Permalink to &quot;macOS 环境配置&quot;">​</a></h3><blockquote><p>个人自用的 macOS 环境配置脚本</p></blockquote><div class="language-zsh"><button title="Copy Code" class="copy"></button><span class="lang">zsh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">/bin/zsh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-c</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#FFCB6B;">curl</span><span style="color:#C3E88D;"> -fsSL https://cdn.jsdelivr.net/gh/viarotel-org/environments@main/apple/shell/macos/main.sh</span><span style="color:#89DDFF;">)&quot;</span></span></code></pre></div><h2 id="macos-常用命令" tabindex="-1">macOS 常用命令 <a class="header-anchor" href="#macos-常用命令" aria-label="Permalink to &quot;macOS 常用命令&quot;">​</a></h2><div class="language-zsh"><button title="Copy Code" class="copy"></button><span class="lang">zsh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 修复打开软件提示已损坏 appPath 为软件路径</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">xattr</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-r</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">com.apple.quarantine</span><span style="color:#A6ACCD;"> [appPath]</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 开启允许任何来源</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">spctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--master-disable</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 启用管理员权限</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">su</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 退出管理员权限</span></span>
<span class="line"><span style="color:#82AAFF;">exit</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 安装 Rosetta</span></span>
<span class="line"><span style="color:#FFCB6B;">softwareupdate</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--install-rosetta</span></span></code></pre></div>`,9),t=[e];function p(c,r,i,m,h,d){return a(),n("div",null,t)}const u=s(o,[["render",p]]);export{C as __pageData,u as default};
