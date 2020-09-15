// ==UserScript==
// @name         Tri-言叶言语
// @name:zh      Tri-言叶言语
// @name:zh      Tri-言叶言语
// @name:en      TriLingvo
// @namespace    https://space.bilibili.com/379335206
// @version      1.63
// @description:zh 自定义任何网站的样式 反馈群：884813590
// @description:en Customize css style of any site QQGroup:884813590
// @author       哔哩哔哩@言叶与言
// @include      *
// @run-at       document-start
// @supportURL   https://jq.qq.com/?_wv=1027&k=IMqY916N
// @updateURL    https://cdn.jsdelivr.net/gh/loktindyi/TriLingvo@master/Tri-UserCss-latest.user.js
// @require      https://cdn.jsdelivr.net/npm/jquery@3.4.0/dist/jquery.min.js
// @icon         https://cdn.jsdelivr.net/gh/loktindyi/TriLingvo@master/Tri.png
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @note         1.62 修复泛匹配错误 更新了变量名|未来计划：开发者模式——更多信息
// @note         1.60 改名
// @note         1.50 移除正则 改用关键词匹配
// @note         1.40 支持引用样式 多个正则可以引用同一样式 |支持纯字符串匹配
// @note         1.30 全面支持正则！
// @note         1.20 样式较大改动 现在存储的是host|在未来，我有计划将用户输入的正则表达式应用到匹配域名上
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
			TriLingvoEstasEll: 1,
			Prompto: "绝对匹配|这个例子指定仅对哔哩哔哩主页注入样式|被引用时需要Trindex",
			Trindex: 0,
			TriEsprimo: "www.bilibili.com",
			TriLingvo: "body{background-size: cover; background-attachment: fixed; background-image: url('https://g.hiphotos.baidu.com/zhidao/pic/item/8644ebf81a4c510f973523a36b59252dd52aa592.jpg')}"
		},
		{
			Prompto: "泛匹配|引用样式",
			Trindex: 1,
			TriEsprimo: "bilibili.com/video/*",
			TriLingvo: "0"
		},
		{
			Prompto: "TrindexIsNotNecessary >> Tri",
			TriEsprimo: "",
			TriLingvo: ""
		}
	]
	//关键词匹配
	function Lingvo(_TriEsprimo){
		if (_TriEsprimo.indexOf("*") != -1){
			let v =0;
			_TriEsprimo = _TriEsprimo.split("*");
			for (let i = 0; i < _TriEsprimo.length; i++){if(window.location.href.indexOf(_TriEsprimo[i]) != -1){v++}}
			if (v == _TriEsprimo.length){console.log(_TriEsprimo);return true}else{return false}
		}else{
			let curl = window.location.href.replace(/https?:\/\//,"");
			if (curl[curl.length-1] == "/"){curl = curl.slice(0,curl.length-1)}
			if (_TriEsprimo == curl){console.log(_TriEsprimo+curl);return true}else{return false}
		}
	}
	//取得用户样式 取得索引 加载
	VzinConfig = GM_getValue("VzinConfig",VzinConfig);
	try{
		for (let tri = 0; tri < VzinConfig.length; tri++){
			if (Lingvo(VzinConfig[tri].TriEsprimo)){
				var Trindex = tri,_Trindex;
				var TriCss = VzinConfig[tri].TriLingvo;
				if (/^\d{1}$/.test(TriCss)){
					_Trindex = parseInt(TriCss);
					TriCss = VzinConfig[_Trindex].TriLingvo;
					console.log(tri + " >> 引用样式 => 索引为 " + _Trindex);
					_Trindex = " >> " + _Trindex
				}else{_Trindex = ""}
				GM_addStyle(TriCss)
			}
		}
	}catch(err){if(VzinConfig[0].TriLingvoEstasEll){console.log(err)}}
	if (typeof(Trindex) != "undefined"){console.log(" 索引 " + Trindex + _Trindex + " 注入样式 " + TriCss)}else{_Trindex = ""}
	//菜单
	GM_registerMenuCommand("调试",function(){
		if (!$("#Vzin_user_btn")[0]){$("body")[0].innerHTML += `
<input id="Vzin-joinus" type="button" style="display:none" class="Vzin-joinus" onclick="window.open('https://jq.qq.com/?_wv=1027&k=IMqY916N')" value="加入星凰">
<input id="Vzin_user_btn" type="button" class="Vzin_user_btn" onclick="if (document.querySelector('#Vzin_container').style.display == 'none'){document.querySelector('#Vzin_container').style.display = 'block'}else{document..querySelector('#Vzin_container').style.display = 'none'}">
<div id="Vzin_container" style="display: block">
<div class="Trindex">La nuna informoj: <font color="#fa7298">` + Trindex + _Trindex + `</font></div>
<textarea id="Vzin_user_config" class="Vzin_user_config" onfocus="document.querySelector('#Vzin-joinus').style.display= 'block'" onkeyup="document.querySelector('#Vzin_user_style').innerHTML = JSON.parse(this.value)[` + Trindex + `].TriLingvo" type="input">` + JSON.stringify(VzinConfig).replace(/,/g,",\n").replace(/\},/g,"},\n").replace(/Ell":1,/g,'Ell":1,\n') + `</textarea>
</div><style id="Vzin_user_style" type="text/css">` + TriCss + `</style>`
		}});
	GM_registerMenuCommand("保存",function(){GM_setValue("VzinConfig",JSON.parse($("#Vzin_user_config")[0].value.replace(/\n/g,"")));setTimeout(function(){window.location.reload()}, 200)});
	GM_registerMenuCommand("重置",function(){GM_deleteValue("VzinConfig");setTimeout(function(){window.location.reload()}, 200)});
})();
