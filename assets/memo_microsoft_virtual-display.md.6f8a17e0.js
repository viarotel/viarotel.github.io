import{_ as s,o,c as a,Q as e}from"./chunks/framework.c697fbd8.js";const y=JSON.parse('{"title":"Windows 添加虚拟显示器","description":"","frontmatter":{},"headers":[],"relativePath":"memo/microsoft/virtual-display.md","filePath":"memo/microsoft/virtual-display.md","lastUpdated":1694073559000}'),t={name:"memo/microsoft/virtual-display.md"},l=e('<h1 id="windows-添加虚拟显示器" tabindex="-1">Windows 添加虚拟显示器 <a class="header-anchor" href="#windows-添加虚拟显示器" aria-label="Permalink to &quot;Windows 添加虚拟显示器&quot;">​</a></h1><blockquote><p>在 powershell (管理员权限) 终端中执行以下命令</p></blockquote><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$env:script = </span><span style="color:#9ECBFF;">&quot;windows-virtual-monitor&quot;</span><span style="color:#E1E4E8;">; </span><span style="color:#B392F0;">irm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;https://gitee.com/viarotel/environments/raw/gitee/microsoft/powershell/main.ps1&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">iex</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$env:script = </span><span style="color:#032F62;">&quot;windows-virtual-monitor&quot;</span><span style="color:#24292E;">; </span><span style="color:#6F42C1;">irm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;https://gitee.com/viarotel/environments/raw/gitee/microsoft/powershell/main.ps1&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">iex</span></span></code></pre></div>',3),n=[l];function p(r,i,c,d,m,u){return o(),a("div",null,n)}const h=s(t,[["render",p]]);export{y as __pageData,h as default};