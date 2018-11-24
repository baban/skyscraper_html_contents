function createElement( obj ){
	var elem = document.createElement( obj["tag"] );
	if( obj["class"] )	elem.className = obj["class"];
	if( obj["id"] )	elem.id = obj["class"];
	return elem;
}

/** ���݂̃}�E�X�ʒu���擾���܂� */
function mp( e ){
	return ( window.opera || document.all ) ?{	//IE,Opera�ł̃}�E�X�ʒu
			x:(document.body.scrollLeft + e.clientX),
			y:(document.body.scrollTop + e.clientY)
		} : document.getElementById ?	// Mozilla�n�̃}�E�X�ʒu
		{ x:e.pageX, y:e.pageY }
		:null;	// ���ɂ�����Ȃ��� null ���Ԃ�
}

/** �`��̈�̃T�C�Y���L�^����\���� */
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

/** �`��̈�E�ォ��̍��W */
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

/* �����Ŏw�肳�ꂽ�X�^�C���V�[�g��HTML���ɓǂݍ��܂��� */
function set_stylesheet( sheetDir ) {
	var linkElem = document.createElement("link");
	linkElem.rel="stylesheet";
	linkElem.href= sheetDir;
	linkElem.type="text/css";
	document.getElementsByTagName("head")[0].appendChild( linkElem );
}

/*
	���̃m�[�h�̎��̃G�������g���擾���ĕԂ��܂�
	���ꂪ�����Ȃ������ꍇ�ɂ́A�������g���A���܂�
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


