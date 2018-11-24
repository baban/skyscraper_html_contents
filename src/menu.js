Behaviour.register({
	"#site-menu ul li dl dt":function(el){
	var fArr = [
		{ backgroundColor:"transparent" },
		{ backgroundColor:"rgb(158,143,121)" },
		{ backgroundColor:"rgb(127,117,98)" },
		{ backgroundColor:"rgb(104,93,76)" },
		{ backgroundColor:"rgb(73,67,53)" },
		{ backgroundColor:"rgb(50,42,30)" }
	];
	/*var fArr = [
		{ backgroundColor:"transparent", listStyleImage:"url('/src/img/00.png')" },
		{ backgroundColor:"rgb(83,83,83)", listStyleImage:"url('/src/img/01.png')" },
		{ backgroundColor:"rgb(63,63,63)", listStyleImage:"url('/src/img/02.png')" },
		{ backgroundColor:"rgb(42,42,42)", listStyleImage:"url('/src/img/03.png')" },
		{ backgroundColor:"rgb(21,21,21)", listStyleImage:"url('/src/img/04.png')" },
		{ backgroundColor:"rgb(0,0,0)", listStyleImage:"url('/src/img/05.png')" },
		{ listStyleImage:"url('/src/img/06.png')" },
		{ listStyleImage:"url('/src/img/07.png')" },
		{ listStyleImage:"url('/src/img/08.png')" },
		{ listStyleImage:"url('/src/img/09.png')" }
	];*/
	var foArr= [
		{ backgroundColor:"rgb(50,42,30)" },
		{ backgroundColor:"rgb(73,67,53)" },
		{ backgroundColor:"rgb(104,93,76)" },
		{ backgroundColor:"rgb(127,117,98)" },
		{ backgroundColor:"rgb(158,143,121)" },
		{ backgroundColor:"transparent" },
	];

	var dlAnim = [
		{opacity:0.0},
		{opacity:0.25},
		{opacity:0.5},
		{opacity:0.75},
		{opacity:1.0}
	];
		var dd=el.parentNode.getElementsByTagName('dd')[0]
		el.onmouseover = function( e ) {
			new Effect.fadeAnim( el, "fadein", fArr, foArr );
			new Effect.fadeAnim( dd, "fadein", dlAnim );
		};
		el.onmouseout = function( e ) {
			new Effect.fadeAnim( el, "fadeout", foArr );
		};
	}
});
