﻿document.write( "<script src='../js/lib.js' type='text/javascript'></script>" );

/* リンクのidを手に入れるための、アンカーを作成します。 */
function create_article_link() {
	var articles = document.getElementById( "content" ).getElementsByTagName("DIV");
	for( var i=0; i < articles.length; i++ )
		if( "blog" == articles[i].className )
			if( articles[i].id ) {
				var forBlogLinkElem = document.createElement("A");
				forBlogLinkElem.appendChild( document.createTextNode( "id" ) );
				forBlogLinkElem.href = window.location +"#"+ articles[i].id;
				forBlogLinkElem.className =  "id_link";
				articles[i].insertBefore ( forBlogLinkElem, articles[i].firstChild );
			}
}

var linkCheck = {
	"home":true,
	"alternate":true, // 同じドキュメントの別バージョン：例えば英語の文書に対する翻訳版
	"appendix":true, // 付録
	"bookmark":true, // ブックマーク
	"contents":true, // 目次
	"chapter":true, // 章
	"copyright":false,
	"glossary":true, // 用語集
	"help":true,
	"index":true,
	"next":true, // 連番の次のページ
	"prev":true, // 連番の前のページ
	"section":true, // 節
	"subsection":true, // 小節
	"start":true, // ドキュメント集の最初の文書
	"stylesheet":false
};

/* headタグ内のlinkから情報を読みとって、メニューを作成 */
function make_meta_menu(){
	var menuBox = document.createElement( "ul" );
	var linkMenu = document.getElementsByTagName("link");
	if( linkMenu ) {
		for( var i=0; i < linkMenu.length;i++ ){
			if( linkMenu[i].href && linkCheck[linkMenu[i].rel] ){
				var aBox = document.createElement("a");
				aBox.setAttribute( "href", linkMenu[i].href );
				aBox.setAttribute( "target", "_self" );
				aBox.appendChild( document.createTextNode( linkMenu[i].rel ) );
				var liBox = document.createElement("li");
				liBox.appendChild( aBox );
				menuBox.appendChild( liBox );
			}
		}
		menuBox.className = "meta_menu";
		document.body.insertBefore( menuBox, document.body.firstChild );
	}
}

function set_js() {
	set_stylesheet( "../css/news_js_app.css" );
	create_article_link();
	make_meta_menu();
}

window.onload = set_js;

