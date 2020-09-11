// ==UserScript==
// @name         Tri-UserCss
// @namespace    https://space.bilibili.com/379335206
// @version      1.30
// @description  通过这个脚本，你可以方便地自定义任何网站的样式 反馈群：884813590
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
// @note         1.30 全面支持正则！
// @note         1.20 样式较大改动 现在存储的是host，不会存在www.xxx.com/ggggg存储的样式到了www.xxx.com/hhhhh不起作用的情况 |在未来，我有计划将用户输入的正则表达式应用到匹配域名上
// @note         1.10 增加logo与支持链接 改名
// ==/UserScript==

(function() {
	//基本样式
	GM_addStyle(`
@-webkit-keyframes twinkling{0%{opacity:1}50%{opacity:0}100%{opacity:1}}
.Vzin-joinus{-webkit-animation: twinkling 1s 2 ease-in-out; box-shadow: 0 0 15px 3px rgba(250,114,152,.4); position: fixed; top: 0; right: 0; width: 6%; height: 5%; outline: none; border: none; border-bottom-left-radius: 8px; color: #fa7298; background-color: rgba(255, 255, 255, 0.6); z-index: 99999}
.Vzin_user_config{width: 300px; height: 650px !important; position: fixed; top: 5%; right: 8%; background-color: rgba(255, 255, 255, 0.8); font-size: 120%; color: #fa7298; resize: none; outline: none; border-radius: 16px; border-color: white; padding: 15px; z-index: 99999}
.Vzin_user_config:focus{box-shadow: 0 0 15px 3px rgba(250,114,152,.3);}
.Trindex{position: fixed; left: 6%; top: 6%; cursor: default; background: blanchedalmond; z-index: 99999}
.Vzin_user_btn{box-shadow: 0 0 15px 3px rgba(250,114,152,.4); position: fixed; top: 0; left: 0; width: 6%; height: 5%; outline: none; border: none; border-bottom-right-radius: 8px; background-color: rgba(255, 255, 255, 0.3); z-index: 99999}`);
	//初始化
	var VzinConfig = [
		{
			TriPrompto: "这是一个给百度网页添加背景图的例子|TriIndex不是必需的，额...这个也不是——Tri",
			TriIndex: 0,
			TriRegExp: "/www.baidu.com/",
			TriUserCss: "body{background-size: cover; background-attachment: fixed; background-image: url('https://g.hiphotos.baidu.com/zhidao/pic/item/8644ebf81a4c510f973523a36b59252dd52aa592.jpg')}"
		},
		{
			TriIndex: 1,
			TriRegExp: "",
			TriUserCss: ""
		},
		{
			TriIndex: 2,
			TriRegExp: "",
			TriUserCss: ""
		}
	]
	//取得用户样式 取得索引 加载
	VzinConfig = GM_getValue("VzinConfig",VzinConfig);
	for (let tri = 0; tri < VzinConfig.length; tri++){
		if (VzinConfig[tri].TriRegExp && eval(VzinConfig[tri].TriRegExp).test(window.location.href)){
			var Trindex = tri;
			var TriCss = VzinConfig[tri].TriUserCss;
			GM_addStyle(TriCss)
		}
	}
	console.log(" 索引 " + Trindex + " 注入样式 " + TriCss);
	//菜单
	GM_registerMenuCommand("调试",function(){
		if (!$("#Vzin_user_btn")[0]){$("body")[0].innerHTML += `
<input id="Vzin-joinus" type="button" style="display:none" class="Vzin-joinus" onclick="window.open('https://jq.qq.com/?_wv=1027&k=IMqY916N')" value="加入星凰">
<input id="Vzin_user_btn" type="button" class="Vzin_user_btn" onclick="if (document.getElementById('Vzin_container').style.display == 'none'){document.getElementById('Vzin_container').style.display = 'block'}else{document.getElementById('Vzin_container').style.display = 'none'}">
<div id="Vzin_container" style="display: block">
<div class="Trindex">La nuna informoj: <font color="#fa7298">` + Trindex + `</font></div>
<textarea id="Vzin_user_config" class="Vzin_user_config" onfocus="$('#Vzin-joinus')[0].style.display= 'block'" onkeyup="document.getElementById('Vzin_user_style').innerHTML = JSON.parse(this.value)[` + Trindex + `].TriUserCss" type="input">` + JSON.stringify(VzinConfig).replace(/,/g,",\n").replace(/\},/g,"},\n").replace(/Tri",/g,'Tri",\n') + `</textarea>
</div><style id="Vzin_user_style" type="text/css">` + TriCss + `</style>`
		}});
	GM_registerMenuCommand("保存",function(){GM_setValue("VzinConfig",JSON.parse($("#Vzin_user_config")[0].value.replace(/\n/g,"")));setTimeout(function(){window.location.reload()}, 200)});
	GM_registerMenuCommand("重置",function(){GM_deleteValue("VzinConfig");setTimeout(function(){window.location.reload()}, 200)});
})();
