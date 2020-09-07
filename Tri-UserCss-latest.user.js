// ==UserScript==
// @name         Tri-UserCss
// @namespace    https://space.bilibili.com/379335206
// @version      1.20
// @description  通过这个脚本，你可以方便地自定义任何网站的样式（若你有一定的相关知识，你可以将那些网站美化得十分漂亮）
// @author       哔哩哔哩@言叶与言
// @include      *
// @run-at       document-start
// @supportURL   https://jq.qq.com/?_wv=1027&k=IMqY916N
// @updateURL    https://cdn.jsdelivr.net/gh/loktindyi/userCss@master/Tri-UserCss-latest.user.js
// @require      https://cdn.jsdelivr.net/npm/jquery@3.4.0/dist/jquery.min.js
// @icon         https://cdn.jsdelivr.net/gh/loktindyi/mybaiduhp@master/Tri.png
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @note         1.20 样式较大改动 现在存储的是host，不会存在www.xxx.com/ggggg存储的样式到了www.xxx.com/hhhhh不起作用的情况 |在未来，我有计划将用户输入的正则表达式应用到匹配域名上
// @note         1.10 增加logo与支持链接 改名
// ==/UserScript==

(function() {
	//基本样式
	GM_addStyle(`
@-webkit-keyframes twinkling{0%{opacity:1}50%{opacity:0}100%{opacity:1}}
.Vzin-joinus{-webkit-animation: twinkling 1s 2 ease-in-out;box-shadow: 0 0 15px 3px rgba(250,114,152,.4); position: fixed; top: 0; right: 0; width: 6%; height: 5%; outline: none; border: none; border-bottom-left-radius: 8px; color: #fa7298; background-color: rgba(255, 255, 255, 0.6); z-index: 99999}
.Vzin_user_css_text{width: 300px; height: 650px !important; position: fixed; right: 8%; top: 5%; background-color: rgba(255, 255, 255, 0.8); font-size: 100%; color: #fa7298; resize: none; outline: none; border-radius: 16px; border-color: white; padding: 15px; z-index: 99999}
.Vzin_user_css_text:focus{box-shadow: 0 0 15px 3px rgba(250,114,152,.3);}
.Vzin_user_btn{box-shadow: 0 0 15px 3px rgba(250,114,152,.4); position: fixed; top: 0; left: 0; width: 6%; height: 6%; outline: none; border: none; border-bottom-right-radius: 8px; background-color: rgba(255, 255, 255, 0.3); z-index: 99999}`);
	//初始化
	var userCss = ``;
	var curl = window.location.host;
	//取得用户样式
	userCss = GM_getValue(curl,userCss);
	console.log(GM_listValues());
	//加载样式
	GM_addStyle(userCss);
	//菜单
	GM_registerMenuCommand("调试",function(){
		if (!$("#Vzin_user_btn")[0]){$("body")[0].innerHTML += `
<input id="Vzin-joinus" type="button" style="display:none" class="Vzin-joinus" onclick="window.open('https://jq.qq.com/?_wv=1027&k=IMqY916N')" value="加入星凰">
<input id="Vzin_user_btn" type="button" class="Vzin_user_btn" onclick="if (document.getElementById('Vzin_user_css_text').style.display == 'none'){document.getElementById('Vzin_user_css_text').style.display = 'block'}else{document.getElementById('Vzin_user_css_text').style.display = 'none'}">
<textarea id="Vzin_user_css_text" class="Vzin_user_css_text" onfocus="$('#Vzin-joinus')[0].style.display= 'block'" onkeyup="document.getElementById('Vzin_user_style').innerHTML = this.value" type="input" style="display: block">` + userCss + `</textarea>
<style id="Vzin_user_style" type="text/css">` + userCss + `</style>`
		}});
	GM_registerMenuCommand("保存",function(){GM_setValue(curl,$("#Vzin_user_css_text")[0].value)});
	GM_registerMenuCommand("重置",function(){GM_deleteValue(curl);setTimeout(function(){window.location.reload()}, 200)});
})();
