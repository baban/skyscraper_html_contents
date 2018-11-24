function createElement( obj ){
	var elem = document.createElement( obj["tag"] );
	if( obj["class"] )	elem.className = obj["class"];
	if( obj["id"] )	elem.id = obj["class"];
	return elem;
}

/** 現在のマウス位置を取得します */
function mp( e ){
	return ( window.opera || document.all ) ?{	//IE,Operaでのマウス位置
			x:(document.body.scrollLeft + e.clientX),
			y:(document.body.scrollTop + e.clientY)
		} : document.getElementById ?	// Mozilla系のマウス位置
		{ x:e.pageX, y:e.pageY }
		:null;	// 何にも合わないと null が返る
}

/** 描画領域のサイズを記録する構造体 */
function windowSize() {
	if( undefined != self.innerHeight ){
		this.width = self.innerWidth;
		this.height = self.innerHeight;
	} else if( undefined != document.body.clientHeight ) {
		this.width = document.body.clientWidth;
		this.height = document.body.clientHeight;
	} else {
		this.width = this.height = 0;
	}
}

/** 描画領域右上からの座標 */
function windowOffset() {
	if( undefined != window.scrollX ) {	// Moziila
		this.x = window.scrollX;
		this.y = window.scrollY;
	} else if( undefined != document.body.scrollLeft ) {	// IE
		this.x = document.body.scrollLeft;
		this.y = document.body.scrollTop;
	} else {
		this.x = this.y = 0;
	}
}

/* 引数で指定されたスタイルシートをHTML側に読み込ませる */
function set_stylesheet( sheetDir ) {
	var linkElem = document.createElement("link");
	linkElem.rel="stylesheet";
	linkElem.href= sheetDir;
	linkElem.type="text/css";
	document.getElementsByTagName("head")[0].appendChild( linkElem );
}

/*
	このノードの次のエレメントを取得して返します
	それが得られなかった場合には、自分自身を帰します
*/
function get_next_element( id ) {
	do {
		switch ( id.nextSibling.nodeType ) {
			case 8: id = id.nextSibling;
			case 3:	id = id.nextSibling;
			case 1:
				return id.nextSibling;
				break;
			default:
				return id;
				break;
		}
	} while ( null != id )
	
	return id;
}


