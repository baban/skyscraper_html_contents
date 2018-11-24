// IEでの高速化
/*@cc_on _d=document;eval('var document=_d')@*/

document.write(	"<script src='/src/lib/prototype.js' type='text/javascript'></script>" );
//document.write(	'<script src="/src/lib/pt_effect.js" type="text/javascript"></script>' );
//document.write(	'<script src="/src/lib/behaviour.js" type="text/javascript"></script>' );

//document.write(	"<script src='/src/ArekorePopup/ArekorePopup.js' type='text/javascript'></script>" );
//document.write( "<link href='/src/ArekorePopup/ArekorePopup.css' rel='stylesheet' type='text/css' />" );
document.write( '<script src="/src/jQuery.js"	type="text/javascript"></script>' );

document.write(	'<script src="/src/counter.js"	type="text/javascript"></script>' );

/**
 * IEのHTML5対応向けhack
 * */
(function(){
	document.createElement( 'header' );  
	document.createElement( 'section' );  
	document.createElement( 'nav' );  
	document.createElement( 'aside' );  
	document.createElement( 'footer' );  
	document.createElement( 'article' );  
})();

/** デバッグメッセージ表示関数 */
var debug = false;
function dm( mes ){
	if( !debug )	return;
	$('debug-message').style.display='block';
	$('debug-message').innerHTML=mes;
}

