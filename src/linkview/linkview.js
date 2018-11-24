/** headタグ内のlinkから情報を読みとって、メニューを作成 */
function make_meta_menu(){
	var linkCheck = {
		"home":true,
		"alternate":true, // 同じドキュメントの別バージョン：例えば英語の文書に対する翻訳版
		"appendix":true, // 付録
		"bookmark":true, // ブックマーク
		"contents":true, // 目次
		"chapter":true, // 章
		"glossary":true, // 用語集
		"help":true,
		"index":true,
		"next":true, // 連番の次のページ
		"prev":true, // 連番の前のページ
		"section":true, // 節
		"subsection":true, // 小節
		"start":true, // ドキュメント集の最初の文書
		"copyright":false,
		"stylesheet":false
	};
	var linkMenu = document.getElementsByTagName("link");
	if( !linkMenu ) return;
	
	var menuBox = document.createElement( "div" );
	menuBox.id="meta-menu";
	var menuButton = document.createElement( "button" );
	menuButton.id = 'title-menu-close-button'
	menuButton.onclick=title_menu_close
	menuBox.appendChild( menuButton )
	
	var metaMenuList = document.createElement( "ul" );
	metaMenuList.id="meta-menu-list";
	
	for( var i=0; i < linkMenu.length; i++ ){
		if( !linkMenu[i].href || !linkCheck[linkMenu[i].rel] )	continue;
		var ahr = document.createElement("a");	// リンクのアンカー
		ahr.href = linkMenu[i].href;
		ahr.target = "_self";
		ahr.appendChild( document.createTextNode( linkMenu[i].rel ) );
		
		var liBox = document.createElement("li");
		liBox.className=linkMenu[i].rel;
		liBox.appendChild( ahr );
		metaMenuList.appendChild( liBox );
	}
	menuBox.appendChild( metaMenuList );
	document.body.appendChild( menuBox );
}

function title_menu_close(){
	$('meta-menu-list').style.display = ($('meta-menu-list').style.display=='none')?'block':'none';
}

//window.onload=make_meta_menu;
Event.observe( window, 'load', make_meta_menu, false );	//prototype.js イベント。こっちのほうが安全

