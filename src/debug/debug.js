/** �f�o�b�O���b�Z�[�W�\���֐� */
var debug = false;
function dm( mes ){
	if( !debug )	return;
	if( $('debug-message') ){
		$('debug-message').style.display='block';
		$('debug-message').innerHTML=mes;
	}
}
