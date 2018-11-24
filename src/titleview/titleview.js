/** �^����ꂽ�z��ƌ^�����v���Ă��邩�`�F�b�N���܂��B�֐��̓�����Ȃ񂩂ŁA�����̃`�F�b�N�Ɏg���Ƌg */
Array.prototype.typeCheck = function( typearr ){
	if('Array' != typeof typearr)	return null;	// �ꉞ�^�`�F�b�N
	for( var i=0; i < this.length; i++ )
		if(typearr[i] != typeof this[i] )	return false;
	return true;
}

/** �z��v�f�𗘗p����if�������s���� */
Array.prototype.execIf = function( check ) {
	if( this.typeCheck( ["function", "function"] ) )	return null;
	if(check)	this[0]();
	else	this[1]();
}

/** �w�肳�ꂽ�n�b�V���z���DOM Element������ĕԂ��܂� */
function createDomElement( obj ){
	var elem = document.createElement( obj["tag"] );
	var tagFunc = {
		"class":function(){ elem.className = obj["class"]; },
		id:function(){	elem.id = obj["id"];	},
		click:function(){ Event.observe( elem, 'click', obj['click'], false ); },
		inner:function(){	elem.innerHTML = obj["inner"];	}
	}
	for( i in obj ){
		if( tagFunc[i] ){
			tagFunc[i]();
			continue;
		}
		elem.setAttribute( i, obj[i] );
	}
	return elem;
}

/** head�^�O����link�������ǂ݂Ƃ��āA���j���[���쐬 */
function title_navigation(){
	function title_list( elm ){
		var ul = document.createElement("ul");
		var elmlist = elm.getElementsByTagName("*");
		
		for( var i=0; i < elmlist.length; i++ ){
			var hName = elmlist[i].tagName.match( /H[12]/ );
			if( !hName )	continue;
			var li = createDomElement({"tag":"li","class":hName});
			var id = elmlist[i].id;
			[
				function(){ li.appendChild( createDomElement({	tag:"a", inner:elmlist[i].innerHTML, href:("#"+id) }) ); },
				function(){ li.innerHTML = elmlist[i].innerHTML; }
			].execIf( id );
			ul.appendChild( li );
		}
		return ul;
	}
	var menuBox = createDomElement( {tag:"div", id:"title-menu"} );
	
	menuBox.appendChild(createDomElement({ tag:"h1", id:'title-menu-description', inner:"�͂��Ƃ̃����N" } ));
	
	menuBox.appendChild( createDomElement({ tag:"button", id:'title-menu-close-button', click:title_menu_close}) );
	
	var lst = title_list( document.body );
	lst.id='title-menu-list'
	menuBox.appendChild( lst );
	
	document.body.appendChild( menuBox );
}

function title_menu_close(){
	var idName = 'title-menu-list';
	if('block'==$(idName).style.display){
		$(idName).style.display='none';
	}else{
		$('title-menu').style.minWidth='18em';
		$(idName).style.display='block';
	}
}

//window.onload=make_meta_menu;
Event.observe( window, 'load', title_navigation, false );	//prototype.js �C�x���g�B�������̂ق������S
