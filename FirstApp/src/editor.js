const fs = require('fs');
const {BrowserWindow, dialog} = require('electron').remote;

let inputArea = null;
let inputTxt = null;
let footerArea = null;

let currentPath = "";
let editor = null;

/**
ページ読み込み時の処理
*/
function onLoad(){
	//入力関連領域
	inputArea = document.getElementById("input_area");
	//入力領域
	inputTxt = document.getElementById("input_txt");
	//フッター
	footerArea = document.getElementById("footer_fixed");

	editor = ace.edit("input_txt");
	editor.getSession().setMode("ace/mode/javascript");
	editor.setTheme("ace/theme/twilight");

	document.ondragover = document.ondrop = function(e){
		e.preventDefault();
		return false;
	};

	inputArea.ondragover = function(){
		return false;
	};
	inputArea.ondrop = function(e){
		e.preventDefault();
		var file = e.dataTransfer[0];
		readFile(file.path);
		return false;
	};
};
