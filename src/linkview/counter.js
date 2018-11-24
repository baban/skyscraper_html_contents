/** カウンタの値を取得して、JavaScriptで出力する。 */
Event.observe(window, 'load', function(){
	function updateCounter( _s ){
		var obj;
		try{
			obj = eval( "("+_s.responseText+")" );
		}catch(e){
			$('counter').innerHTML = "script eval error";
			return;
		}
		$('counter').innerHTML = 
			"<ul id='counter-list'>"+
			"<li id='counter-listitem-total'><span id='counter-total'>Total:</span> "+ obj['total'] +"</li>"+
			"<li><span id='counter-today'>Today :</span> "+ obj['today'] + "</li>"+
			"<li><span id='counter-yestaday'>Yestaday :</span> "+ obj['yestaday'] +"</li>"+
			"</ul>";
	}
	var host = "http://baban.0ch.biz/";
	//var host = "http://localhost/";
	new Ajax.Request( host + "counter/counter.cgi", { method:'get', onComplete:updateCounter } );
}, false);
