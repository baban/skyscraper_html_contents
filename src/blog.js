var metalinkAnim = [
	{opacity:0.0},
	{opacity:0.25},
	{opacity:0.5},
	{opacity:0.75},
	{opacity:1.0}
];

/* 立ち上がり処理を行う */
function startfunc(){
	new Effect.bgFade( $('meta-menu'), "fadein", metalinkAnim );
};
Event.observe( window, 'load', startfunc, false );

