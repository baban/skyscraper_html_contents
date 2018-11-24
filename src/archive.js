document.write(	"<script src='/src/lib/prototype.js' type='text/javascript'></script>" );
document.write(	'<script src="/src/lib/pt_effect.js" type="text/javascript"></script>' );
document.write(	'<script src="/src/lib/behaviour.js" type="text/javascript"></script>' );

document.write(	"<script src='/src/ArekorePopup/ArekorePopup.js' type='text/javascript'></script>" );
document.write( "<link href='/src/ArekorePopup/ArekorePopup.css' rel='stylesheet' type='text/css' />" );

if( !document.all ){
	document.write(	'<script src="/src/menu.js"	type="text/javascript"></script>' );
}

/** デバッグメッセージ表示関数 */
var debug = false;
function dm( mes ){
	if( !debug )	return;
	$('debug-message').style.display='block';
	$('debug-message').innerHTML=mes;
}

