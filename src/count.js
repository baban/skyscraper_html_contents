{
	function get_date_count ( yy, mm, dd ){
		var today = new Date(),	xDay = new Date(yy, mm-1, dd);
		return Math.ceil( (xDay.getTime() - today.getTime()) / (24*60*60*1000) );
	}
	
	var days=0;
	var d = get_date_count( 2004, 1, 17 );

	var msg1 = "センター試験まであと<em>" + d + "</em>日(毎年恒例でゴメン…)<br />";
	var msg2 = "センター試験<em>当日</em><br />";
	var msg3 = "センター試験<em>２日目</em><br />";
	var msg4 = "センター試験<em>終了</em><br />";
	
	if (d > 0){
		document.write( msg1 );
	}else if ( d==0 ){
		document.write( msg2 );
	}else if ( d==-1 ){
		document.write( msg2 );
	}else{
		if (d * -1 < days || days == 0 ){
			document.write( msg3 );
		}
	}
}
