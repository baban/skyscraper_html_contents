/* bodyタグ内のonloadに関数を書き足します */
function add_onload(){
	var oldVal = document.body.getAttribute( "onload" );
	( oldVal )?	oldVal+=";" : oldVal="";

	document.body.setAttribute( 
		"onload",
		oldVal + "brouwzwer_check();"
	);
}

add_onload();

/* ブラウザ判別スクリプト、好きな関数入れて実行して下さい */
function brouwzwer_check(){
	var funcFlag = false;
	if (document.layers) { 
	　　/* NN4 */
	} else if ( window.opera ) { 
	　　/* Opera */
	　　create_article_link();
	} else if ( !document.getElementById && document.all ) { 
	　　/* IE4 */
	} else if ( document.getElementById && document.all ) { 
	　　/* IE5以降 */
	} else if ( document.getElementById ) { 
	　　/* Netscape6以降 or Mozilla */
	　　create_article_link();
	　　make_meta_menu();
	} else { 
	　　/* その他 */
	} 
}

/* リンクのidを手に入れるための、アンカーを作成します。 */
function create_article_link() {
	var articles = document.getElementById( "news_space" ).getElementsByTagName("DIV");
	for( var i=0; i < articles.length; i++ )
		if( "article" == articles[i].className )
			if( articles[i].id ) {
				var forBlogLinkElem = document.createElement("A");
				forBlogLinkElem.appendChild( document.createTextNode( "id" ) );
				forBlogLinkElem.setAttribute( "href", window.location +"#"+ articles[i].id );
				forBlogLinkElem.setAttribute( "class", "id_link" );
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
		menuBox.setAttribute( "class", "meta_menu" );
		document.body.insertBefore( menuBox, document.body.firstChild );
	}
}
