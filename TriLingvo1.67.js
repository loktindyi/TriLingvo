// ==UserScript==
// @name         TriLingvo言叶言语
// @name:zh      TriLingvo言叶言语
// @name:zh-CN   TriLingvo言叶言语
// @name:en      TriLingvo
// @namespace    https://space.bilibili.com/379335206
// @version      1.67
// @description:zh 自定义任何网站的样式 反馈群：884813590
// @description:en Customize css style of any site QQGroup:884813590
// @author       哔哩哔哩@言叶与言
// @include      *
// @run-at       document-start
// @supportURL   https://jq.qq.com/?_wv=1027&k=IMqY916N
// @updateURL    https://cdn.jsdelivr.net/gh/loktindyi/TriLingvo@master/TriLingvo-latest.user.js
// @require      https://cdn.jsdelivr.net/npm/jquery@3.4.0/dist/jquery.min.js
// @icon         https://cdn.jsdelivr.net/gh/loktindyi/TriLingvo@master/Tri.png
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @note         1.67 每个匹配对应一个样式 不再支持引用
// @note         1.64 进行了一些优化
// @note         1.62 修复泛匹配错误 更新了变量名|未来计划：开发者模式——更多信息
// @note         1.60 改名
// @note         1.50 移除正则 改用关键词匹配
// @note         1.40 支持引用样式 多个正则可以引用同一样式 |支持纯字符串匹配
// @note         1.30 全面支持正则！
// @note         1.20 样式较大改动 现在存储的是host|在未来，我有计划将用户输入的正则表达式应用到匹配域名上
// @note         1.10 增加logo与支持链接 改名
// ==/UserScript==

(function() {
	//初始化
	var Trilato = [
		{
			ViEstasEll: 1,
			Prompto: "泛匹配|这个例子指定对哔哩哔哩视频页注入样式",
			TriEsprimo: "bilibili.com/video/*",
			TriLingvo: "body{background-size: cover; background-attachment: fixed; background-image: url('https://g.hiphotos.baidu.com/zhidao/pic/item/8644ebf81a4c510f973523a36b59252dd52aa592.jpg')}"
		},
		{
			Prompto: "绝对匹配|这个例子指定仅对哔哩哔哩主页注入样式",
			TriEsprimo: "www.bilibili.com",
			TriLingvo: ".simplify-home{background-color:transparent !important}body{background-size: cover; background-attachment: fixed; background-image: url('https://g.hiphotos.baidu.com/zhidao/pic/item/8644ebf81a4c510f973523a36b59252dd52aa592.jpg')}"
		},{
			TriEsprimo: "www.baidu.com",
			TriLingvo: "body{background-size: cover; background-attachment: fixed; background-image: url('https://g.hiphotos.baidu.com/zhidao/pic/item/8644ebf81a4c510f973523a36b59252dd52aa592.jpg')}"
		}
	]
	//关键词匹配
	function LingvoTest(Esprimo){
		if (Esprimo.indexOf("*") != -1){
			let v = 0;
			Esprimo.split("*").forEach(function(e){if(window.location.href.indexOf(e) != -1){v++}})
			if (v == Esprimo.split("*").length){return true}else{return false}
		}else{
			let c = window.location.href.replace(/https?:\/\//,"");
			if (c[c.length-1] == "/"){c = c.slice(0,c.length-1)}
			if (Esprimo == c){return true}else{return false}
		}
	}

    //实时调试

	//取得用户样式 取得索引 加载
    Trilato = GM_getValue("Trilato",Trilato);
	try{
		var Trindex,TriLingvo;
		for (let i = 0; i < Trilato.length; i++){
			if (LingvoTest(Trilato[i].TriEsprimo)){
				Trindex = i;
				TriLingvo = Trilato[i].TriLingvo
			}
		}
		if (Trindex != undefined){GM_addStyle(TriLingvo);console.log("索引 " + Trindex + " 注入样式 >>\n" + TriLingvo)}
	}
	catch(err){if (Trilato[0].ViEstasEll){console.error(err)}}

	//菜单
	GM_registerMenuCommand("调试",function(){
		GM_addStyle(`
@-webkit-keyframes twinkling{0%{opacity:1}50%{opacity:0}100%{opacity:1}}
.Vzin-joinus{-webkit-animation: twinkling 1s 2 ease-in-out; box-shadow: 0 0 15px 3px rgba(250,114,152,.4); position: fixed; top: 0; right: 0; width: 6%; height: 5%; outline: none; border: none; border-bottom-left-radius: 8px; color: #fa7298; background-color: rgba(255, 255, 255, 0.6); z-index: 99999}
.Vzin_config{width: 300px; height: 650px !important; position: fixed; top: 5%; right: 8%; background-color: rgba(255, 255, 255, 0.9); font-size: 120%; color: #fa7298; resize: none; outline: none; border-radius: 16px; border-color: white; padding: 15px; z-index: 99999}
.Vzin_config:focus{box-shadow: 0 0 15px 3px rgba(250,114,152,.3);}
.Trindex{position: fixed; left: 6%; top: 6%; cursor: default; background: blanchedalmond; z-index: 99999}
.Vzin_btn{box-shadow: 0 0 15px 3px rgba(250,114,152,.4); position: fixed; top: 0; left: 0; width: 6%; height: 5%; outline: none; border: none; border-bottom-right-radius: 8px; background-color: rgba(255, 255, 255, 0.3); z-index: 99999}`);
		if (!$("#Vzin_btn")[0]){$("body")[0].innerHTML += `
<input id="Vzin-joinus" type="button" style="display:none" class="Vzin-joinus" onclick="window.open('https://jq.qq.com/?_wv=1027&k=IMqY916N')" value="加入星凰">
<input id="Vzin_btn" type="button" class="Vzin_btn" onclick="if (document.querySelector('#Vzin_container').style.display == 'none'){document.querySelector('#Vzin_container').style.display = 'block'}else{document.querySelector('#Vzin_container').style.display = 'none'}">
<div id="Vzin_container" style="display: block">
<div class="Trindex">La nuna informoj: <font color="#fa7298">` + Trindex + `</font></div>
<textarea id="Vzin_config" class="Vzin_config" onfocus="document.querySelector('#Vzin-joinus').style.display= 'block'" onkeyup="document.querySelector('#Vzin_style').innerHTML = JSON.parse(this.value.replace(/\\n/g,''))[` + Trindex + `].TriLingvo" type="input">` + JSON.stringify(Trilato).replace(/,/g,",\n").replace(/\},/g,"},\n") + `</textarea>
</div><style id="Vzin_style" type="text/css">` + TriLingvo + `</style>`
		}});
	GM_registerMenuCommand("保存",function(){GM_setValue("Trilato",JSON.parse($("#Vzin_config")[0].value.replace(/\n/g,"")));setTimeout(function(){window.location.reload()}, 200)});
	GM_registerMenuCommand("重置",function(){GM_deleteValue("Trilato");setTimeout(function(){window.location.reload()}, 200)});
})();
