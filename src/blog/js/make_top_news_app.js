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
	} else if (window.opera) { 
	　　/* Opera */
	　　create_article_link();
	} else if (!document.getElementById && document.all) { 
	　　/* IE4 */
	} else if (document.getElementById && document.all) { 
	　　/* IE5以降 */
	　　create_article_link();
	} else if (document.getElementById) { 
	　　/* Netscape6以降 or Mozilla */
	　　create_article_link();
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
				var forBlogLinkElement = document.createElement("A");
				forBlogLinkElement.setAttribute( "href", window.location +"#"+ articles[i].id );
				var blogLinkAttr = document.createAttribute( "class" );
				blogLinkAttr.value = "id_link";
				forBlogLinkElement.setAttributeNode( blogLinkAttr );
				forBlogLinkElement.appendChild( document.createTextNode( "id" ) );
				articles[i].insertBefore ( forBlogLinkElement, articles[i].firstChild );
			}
}
