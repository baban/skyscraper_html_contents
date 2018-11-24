/** 立ち上がり処理を行う */
//function startfunc(){};
//Behaviour.addLoadEvent( startfunc );

var menubar = {
	"h1":function(el){
		el.onclick = function( e ) {
			title_menu_close();
		};
	},
	"h2":function(el){
		el.onclick = function( e ) {
			title_menu_close();
		};
	},
	"h3":function(el){
		el.onclick = function( e ) {
			title_menu_close();
		};
	},
	"h4":function(el){
		el.onclick = function( e ) {
			title_menu_close();
		};
	}
}
Behaviour.register(menubar);

