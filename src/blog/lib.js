/** ハッシュなオブジェクトからDOM Elementを作って返します */
function createElement( obj ){
	if( 'Object' != typeof obj )	return null;
	var elem = document.createElement(obj["tag"]);
	if( obj["class"] )	elem.className = obj["class"];
	if( obj["id"] )	elem.className = obj["id"];
	
	return elem;
}

/** 配列の内容を逆転して返します(prototype.jsにArray.reverseがあるので消し) */
Array.prototype.inverse = function(){
	var arr=[];
	for(var i=0; i<this.length; i++)
		arr[i]=this[this.length-i-1];
	return arr;
}

/* 指定した開始色、終了色から、rgb(赤、緑、青)の配列を返します */
function make_color_fade( sr,sg,sb, fr,fg,fb, flength ){
	var arr=[],cr,cg,cb;
	for( var i=0; i<=flength; i++ ){
		cr = Math.ceil((fr*i+sr*(flength-i)) / flength);
		cg = Math.ceil((fg*i+sg*(flength-i)) / flength);
		cb = Math.ceil((fb*i+sb*(flength-i)) / flength);
		arr[i] = ("rgb("+cr+","+cg+","+cb+");");
	}
	return arr;
}

/* 読み込むスタイルシートを一つ追加します */
function set_stylesheet( sheetDir ) {
	var linkElem = document.createElement("link");
	linkElem.rel="stylesheet";
	linkElem.href= sheetDir;
	linkElem.type="text/css";
	document.getElementsByTagName("head")[0].appendChild( linkElem );
}

