/**
 * ZenCodingでタグを生成します
 * @param {String} [$] 選択範囲の文字列
 * @return 生成したHTML(またはXML)タグ
 */
String.prototype.toZen =
String.prototype.to_zen =
String.prototype._zen = function( $, op ){
	if( undefined==$ ) $='';
	// オプション設定
	var lang='ja', charset='UTF-8';
	if( op ){
		if(op.hasOwnProperty('lang')) lang = op.lang;	// 言語コード指定
		if(op.hasOwnProperty('charset')) charset = op.charset;	// 言語コード
	}
	
	/**
	 * 数値を桁数指定してテキストに変換
	 * 桁数が足りないときは、数字の前を0で埋める
	 */
	function num2str( num, order ){
		var num = num.toString();
		var l = num.length-order;
		num = num.slice( ((l>0)?1:0), order );
		while( num.length < order ) num = '0'+num;
		return num;
	}

	// HTMLタグのデータ
	var ElementsData={
		body:'block', blockquote:'block', center:'block', colgroup:'block', comment:'block', dd:'block', dl:'block', dir:'block',
		div:'block', fieldset:'block', form:'block', frame:'block', frameset:'block', head:'block', html:'block', iframe:'block', map:'block',
		marquee:'block', menu:'block', multicol:'block', 'object':'block', ol:'block', optgroup:'block', plaintext:'block', pre:'block',
		script:'block', select:'block', style:'block', table:'block', tbody:'block', thead:'block', ul:'block',
		code:'line', dt:'line', p:'line', li:'line', option:'line', h1:'line', h2:'line', h3:'line', h4:'line', h5:'line', h6:'line',
		tr:'line', th:'line', textarea:'line', title:'line'
	};

	// 記号以外の基本文字列
	var BaseChar='A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0100-\u0131\u0134-\u013E\u0141-\u0148\u014A-\u017E\u0180-\u01C3\u01CD-\u01F0\u01F4-\u01F5\u01FA-\u0217\u0250-\u02A8\u02BB-\u02C1\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03CE\u03D0-\u03D6\u03DA\u03DC\u03DE\u03E0\u03E2-\u03F3\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E-\u0481\u0490-\u04C4\u04C7-\u04C8\u04CB-\u04CC\u04D0-\u04EB\u04EE-\u04F5\u04F8-\u04F9\u0531-\u0556\u0559\u0561-\u0586\u05D0-\u05EA\u05F0-\u05F2\u0621-\u063A\u0641-\u064A\u0671-\u06B7\u06BA-\u06BE\u06C0-\u06CE\u06D0-\u06D3\u06D5\u06E5-\u06E6\u0905-\u0939\u093D\u0958-\u0961\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8B\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AE0\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B36-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB5\u0BB7-\u0BB9\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C60-\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CDE\u0CE0-\u0CE1\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D28\u0D2A-\u0D39\u0D60-\u0D61\u0E01-\u0E2E\u0E30\u0E32-\u0E33\u0E40-\u0E45\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EAE\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0F40-\u0F47\u0F49-\u0F69\u10A0-\u10C5\u10D0-\u10F6\u1100\u1102-\u1103\u1105-\u1107\u1109\u110B-\u110C\u110E-\u1112\u113C\u113E\u1140\u114C\u114E\u1150\u1154-\u1155\u1159\u115F-\u1161\u1163\u1165\u1167\u1169\u116D-\u116E\u1172-\u1173\u1175\u119E\u11A8\u11AB\u11AE-\u11AF\u11B7-\u11B8\u11BA\u11BC-\u11C2\u11EB\u11F0\u11F9\u1E00-\u1E9B\u1EA0-\u1EF9\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2126\u212A-\u212B\u212E\u2180-\u2182\u3041-\u3094\u30A1-\u30FA\u3105-\u312C\uAC00-\uD7A3';
	// 一部の記号
	var Ideographic = '\u4E00-\u9FA5\u3007\u3021-\u3029';
	// 数字
	var Digit = '0-9\u0660-\u0669\u06F0-\u06F9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE7-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29';
	var Extender = '\u00B7\u02D0\u02D1\u0387\u0640\u0E46\u0EC6\u3005\u3031-\u3035\u309D-\u309E\u30FC-\u30FE';
	// 名前の定義
	var Letter = BaseChar+Ideographic;
	var NameChar = Letter+Digit+Extender+'\-\_:\\$';
	var Name = '['+Letter+'_:]['+NameChar+']*';
	// 属性値
	var EntityValue='(?:"[^"]*?"|\'[^\'*?]\'|\\w+)';
	var Tag = '('+Name+')?((?:[#\\.]'+Name+')+)?((?:\s*\\[.*?\\])+)?((?:\\s+'+Name+'=(?:"[^"]+?"|\'[^\']+?\'|\\S+))+)?({.*?})?';

	var parser={
		'^(\\s*\\(\\s*)':function( s ){ return '('; },	// 『(』演算子
		'^(\\s*\\)\\s*)':function( s ){ return ')'; },	// 『)』演算子
		'^(\\s*>\\s*)':function( s ){ return '>'; },	// 『>』演算子
		'^(\\s*\\+\\s*)':function( s ){ return '+'; },	// 『+』演算子
		'^(\\s*\\*\\s*)':function( s ){ return '*'; }	// 『*』演算子
	};
	parser['^\\s*([0-9]+)\\s*']=function( s ){ return s.match(new RegExp('^\\s*([0-9]+)\\s*'))[1]; }	// 『数値』演算子
	parser['^\\s*('+Tag+')']=function( s ){ return s.match(new RegExp('^\\s*('+Tag+')'))[1]; };	// タグ名
	
	var lang='ja';
	// よく使うタグをスニペットで変換
	var snippets={
		'a':function(attr){ return ['<a href=""'+attr+'>','</a>']; },
		'a:mail':function(attr){ return ['<a href="mailto:"'+attr+'>','</a>']; },
		'abbr':function(attr){ return ['<abbr title=""'+attr+'>','</abbr>']; },
		'acronym':function(attr){ return ['<acronym title=""'+attr+'>','</acronym>']; },
		'acr':function(attr){ return ['<acronym title=""'+attr+'>','</acronym>']; },
		'ac':function(attr){ return ['<acronym title=""'+attr+'>','</acronym>']; },
		'adr':function(attr){ return ['<address'+attr+'>\n','</address>\n']; },
		'base':function(attr){ return ['<base href=""'+attr+' />\n','']; },
		'blockquote':function(attr){ return ['<blockquote cite=""'+attr+'>\n','</blockquote>\n']; },
		'bq':function(attr){ return ['<blockquote cite=""'+attr+'>\n','</blockquote>\n']; },
		'body:ie':function(attr){ return ['<!--[if IE]>\n<body class="ifie"'+attr+'>\n<![endif]-->\n<!--[if !IE]>-->\n<body class="ifnoie"'+attr+'>\n<!--<![endif]-->\n','</body>\n']; },
		'body:cc':function(attr){ return ['<!--[if IE]>\n<body class="ifie"'+attr+'>\n<![endif]-->\n<!--[if !IE]>-->\n<body class="ifnoie"'+attr+'>\n<!--<![endif]-->\n','</body>\n']; },
		'q:cite':function(attr){ return ['<q cite=""'+attr+'>','</q>']; },
		'bdo':function(attr){ return ['<bdo dir="ltr"'+attr+'>','</bdo>']; },
		'bdo:l':function(attr){ return ['<bdo dir="ltr"'+attr+'>','</bdo>']; },
		'bdo:r':function(attr){ return ['<bdo dir="rtl"'+attr+'>','</bdo>']; },
		'del':function(attr){ return ['<del datetime=""'+attr+'>','</del>']; },
		'ins':function(attr){ return ['<ins datetime=""'+attr+'>','</ins>']; },
		'style':function(attr){ return ['<style type="text/css"'+attr+'>\n','</style>\n']; },
		'script':function(attr){ return ['<script type="text/javascript"'+attr+'>\n','</script>\n']; },
		'sc':function(attr){ return ['<script type="text/javascript"'+attr+'>\n','</script>\n']; },
		'script:cdata':function(attr){ return['<script type="text/javascript"'+attr+'><![CDATA[\n',']]></script>\n']; },
		'script:src':function(attr){ return['<script type="text/javascript" src="">','</script>\n']; },
		'script:jquery':function(){ return ['<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js">','</script>']; },
		'script:jqueryui':function(){ return ['<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js">','</script>']; },
		'script:validate':function(){ return ['<script type="text/javascript" src="http://ajax.microsoft.com/ajax/jQuery.Validate/1.6/jQuery.Validate.min.js">','</script>']; },
		'script:swf':function(){ return ['<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js">','</script>']; },
		'img':function(attr){ return ['<img src="" alt="" width="" height=""'+attr+' />','']; },
		'iframe':function(attr){ return ['<iframe src="" frameborder="0" width="" height=""'+attr+'>\n','</iframe>\n']; },
		'ifr':function(attr){ return ['<iframe src="" frameborder="0" width="" height=""'+attr+'>\n','</iframe>\n']; },
		'object':function(attr){ return ['<object data="" type=""'+attr+'>\n','</object>\n']; },
		'obj':function(attr){ return ['<object data="" type=""'+attr+'>\n','</object>\n']; },
		'embed':function(attr){ return ['<embed src="" type=""'+attr+' />\n', '']; },
		'emb':function(attr){ return ['<embed src="" type=""'+attr+' />\n','']; },
		'param':function(attr){ return ['<param name="" value=""'+attr+' />\n','']; },
		'map':function(attr){ return ['<map name=""'+attr+'>\n','</map>\n']; },
		'area':function(attr){ return ['<area shape="" coords="" href="" alt=""'+attr+' />\n','']; },
		'area:default':function(attr){ return ['<area shape="default" coords="" href="" alt=""'+attr+' />\n','']; },
		'area:d':function(attr){ return ['<area shape="default" coords="" href="" alt=""'+attr+' />\n','']; },
		'area:rect':function(attr){ return ['<area shape="rect" coords="" href="" alt=""'+attr+' />\n','']; },
		'area:r':function(attr){ return ['<area shape="rect" coords="" href="" alt=""'+attr+' />\n','']; },
		'area:poly':function(attr){ return ['<area shape="poly" coords="" href="" alt=""'+attr+' />\n','']; },
		'area:p':function(attr){ return ['<area shape="poly" coords="" href="" alt=""'+attr+' />\n','']; },
		'cap':function(attr){ return ['<caption'+attr+'>\n','</caption>\n']; },
		'fset':function(attr){ return ['<fieldset'+attr+'>\n','</fieldset>\n']; },
		'fld':function(attr){ return ['<fieldset'+attr+'>\n','</fieldset>\n']; },
		'col':function(attr){ return ['<col'+attr+' />\n','']; },
		'colg':function(attr){ return ['<colgroup'+attr+'>\n','</colgroup>\n']; },
		'br':function(attr){ return ['<br'+attr+' />','']; },
		'hr':function(attr){ return ['<hr'+attr+' />\n','']; },
		'link':function(attr){ return ['<link rel="" href=""'+attr+' />\n','']; },
		'link:css':function(attr){ return ['<link rel="stylesheet" type="text/css" href=".css"'+attr+' />\n','']; },
		'link:print':function(attr){ return ['<link rel="stylesheet" type="text/css" href="|print.css" media="print"'+attr+' />\n','']; },
		'link:favicon':function(attr){ return ['<link rel="shortcut icon" type="image/x-icon" href="favicon.ico"'+attr+' />\n','']; },
		'link:fav':function(attr){ return ['<link rel="shortcut icon" type="image/x-icon" href="favicon.ico"'+attr+' />\n','']; },
		'link:rss':function(attr){ return ['<link rel="alternate" type="application/rss+xml" href="rss.xml"'+attr+' />\n','']; },
		'link:atom':function(attr){ return ['<link rel="alternate" type="application/atom+xml" href="atom.xml"'+attr+' />\n','']; },
		'link:start':function(attr){ return ['<link rel="start" href=""'+attr+' />\n','']; },
		'link:next':function(attr){ return ['<link rel="next" href=""'+attr+' />\n','']; },
		'link:prev':function(attr){ return ['<link rel="prev" href=""'+attr+' />\n','']; },
		'link:contents':function(attr){ return ['<link rel="contents" href=""'+attr+' />\n','']; },
		'link:index':function(attr){ return ['<link rel="index" href=""'+attr+' />\n','']; },
		'link:copyright':function(attr){ return ['<link rel="copyright" href=""'+attr+' />\n','']; },
		'link:copy':function(attr){ return ['<link rel="copyright" href=""'+attr+' />\n','']; },
		'link:glossary':function(attr){ return ['<link rel="glossary" href=""'+attr+' />\n','']; },
		'link:chapter':function(attr){ return ['<link rel="chapter" href=""'+attr+' />\n','']; },
		'link:section':function(attr){ return ['<link rel="section" href=""'+attr+' />\n','']; },
		'link:subsection':function(attr){ return ['<link rel="subsection" href=""'+attr+' />\n','']; },
		'link:appendix':function(attr){ return ['<link rel="appendix" href=""'+attr+' />\n','']; },
		'link:help':function(attr){ return ['<link rel="help" href=""'+attr+' />\n','']; },
		'link:bookmark':function(attr){ return ['<link rel="bookmark" href=""'+attr+' />\n','']; },
		'link:jetpack':function(attr){ return ['<link rel="jetpack" href=".js" name=""'+attr+' />\n','']; },
		'link:touch':function(attr){ return ['<link rel="apple-touch-icon" href="favicon.png"'+attr+' />\n','']; },
		'link:home':function(attr){ return ['<link rel="start" href=""'+attr+' />\n','']; },
		'link:top':function(attr){ return ['<link rel="start" href=""'+attr+' />\n','']; },
		'link:origin':function(attr){ return ['<link rel="start" href=""'+attr+' />\n','']; },
		'link:child':function(attr){ return ['<link rel="next" href=""'+attr+' />\n','']; },
		'link:previous':function(attr){ return ['<link rel="prev" href=""'+attr+' />\n','']; },
		'link:prev':function(attr){ return ['<link rel="prev" href=""'+attr+' />\n','']; },
		'link:toc':function(attr){ return ['<link rel="contents" href=""'+attr+' />\n','']; },
		'link:search':function(attr){ return ['<link rel="search" href=""'+attr+' />\n','']; },
		'link:find':function(attr){ return ['<link rel="find" href=""'+attr+' />\n','']; },
		'link:author':function(attr){ return ['<link rel="author" href=""'+attr+' />\n','']; },
		'link:last':function(attr){ return ['<link rel="last" href=""'+attr+' />\n','']; },
		'link:up':function(attr){ return ['<link rel="up" href=""'+attr+' />\n','']; },
		'link:parent':function(attr){ return ['<link rel="up" href=""'+attr+' />\n','']; },
		'link:first':function(attr){ return ['<link rel="first" href=""'+attr+' />\n','']; },
		'link:begin':function(attr){ return ['<link rel="first" href=""'+attr+' />\n','']; },
		'link:made':function(attr){ return ['<link rev="made" href=""'+attr+' />\n','']; },
		'meta':function(attr){ return ['<meta http-equiv="" content=""'+attr+' />\n','']; },
		'meta:js':function(attr){ return ['<meta http-equiv="Content-Script-Type" content="text/javascript"'+attr+' />\n','']; },
		'meta:css':function(attr){ return ['<meta http-equiv="Content-Style-Type" content="text/css"'+attr+' />\n','']; },
		// charsetを指定忘れている
		'meta:charset':function(attr){ return ['<meta http-equiv="Content-Type" content="text/html;charset='+charset+'"'+attr+' />\n','']; },
		'meta:utf':function(attr){ return ['<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"'+attr+' />\n','']; },
		'meta:win':function(attr){ return ['<meta http-equiv="Content-Type" content="text/html;charset=Win-1251"'+attr+' />\n','']; },
		'meta:sjis':function(attr){ return ['<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"'+attr+' />\n','']; },
		'meta:description':function(attr){ return ['<meta name="description" content=""'+attr+' />\n','']; },
		'meta:desc':function(attr){ return ['<meta name="description" content=""'+attr+' />\n','']; },
		'meta:robots':function(attr){ return ['<meta name="robots" content="noindex,nofollow"'+attr+' />\n','']; },
		'meta:compat':function(attr){ return ['<meta http-equiv="X-UA-Compatible" content="IE=7"'+attr+' />\n','']; },
		'meta:ie7':function(attr){ return ['<meta http-equiv="X-UA-Compatible" content="IE=7"'+attr+' />\n','']; },
		'meta:ie8':function(attr){ return ['<meta http-equiv="X-UA-Compatible" content="IE=8"'+attr+' />\n','']; },
		'meta:emuie7':function(attr){ return ['<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7"'+attr+' />\n','']; },
		'meta:nocache':function(attr){ return ['<meta http-equiv="pragma" content="no-cache"'+attr+' />\n','']; },
		'form':function(attr){ return ['<form action=""'+attr+'>\n','</form>\n']; },
		'form:get':function(attr){ return ['<form action="" method="get"'+attr+'>\n','</form>\n']; },
		'form:post':function(attr){ return ['<form action="" method="post"'+attr+'>\n','</form>\n']; },
		'form:file':function(attr){ return ['<form action="" method="post" enctype="multipart/form-data"'+attr+'>\n','</form>\n']; },
		'label':function(attr){ return ['<label for=""'+attr+'>','</label>']; },
		'button':function(attr){ return ['<button type="button" value=""'+attr+'>','</button>']; },
		'button:reset':function(attr){ return ['<button type="reset" value=""'+attr+'>','</button>']; },
		'button:r':function(attr){ return ['<button type="reset" value=""'+attr+'>','</button>']; },
		'button:submit':function(attr){ return ['<button type="submit" value=""'+attr+'>','</button>']; },
		'button:s':function(attr){ return ['<button type="submit" value=""'+attr+'>','</button>']; },
		'select':function(attr){ return ['<select name=""'+attr+'>\n','</select>\n']; },
		'select:multi':function(attr){ return ['<select name="" multiple="multiple"'+attr+'>\n','</select>\n']; },
		'optgroup':function(attr){ return ['<optgroup label=""'+attr+'>\n','</optgroup>\n']; },
		'optg':function(attr){ return ['<optgroup label=""'+attr+'>\n','</optgroup>\n']; },
		'option':function(attr){ return ['<option value=""'+attr+'>','</option>\n']; },
		'opt':function(attr){ return ['<option value=""'+attr+'>','</option>\n']; },
		'op':function(attr){ return ['<option value=""'+attr+'>','</option>\n']; },
		'textarea':function(attr){ return ['<textarea name="" cols="50" rows="10"'+attr+'>\n','</textarea>\n']; },
		'input':function(attr){ return ['<input type="" name="" value=""'+attr+' />\n','']; },
		'input:hidden':function(attr){ return ['<input type="hidden" name="" value=""'+attr+' />\n','']; },
		'input:h':function(attr){ return ['<input type="hidden" name="" value=""'+attr+' />\n','']; },
		'input:text':function(attr){ return ['<input type="text" name="" value=""'+attr+' />\n','']; },
		'input:t':function(attr){ return ['<input type="text" name="" value=""'+attr+' />\n','']; },
		'input:password':function(attr){ return ['<input type="password" name="" value=""'+attr+' />\n','']; },
		'input:p':function(attr){ return ['<input type="password" name="" value=""'+attr+' />\n','']; },
		'input:checkbox':function(attr){ return ['<input type="checkbox" name="" value=""'+attr+' />\n','']; },
		'input:c':function(attr){ return ['<input type="checkbox" name="" value=""'+attr+' />\n','']; },
		'input:radio':function(attr){ return ['<input type="radio" name="" value=""'+attr+' />\n','']; },
		'input:r':function(attr){ return ['<input type="radio" name="" value=""'+attr+' />\n','']; },
		'input:submit':function(attr){ return ['<input type="submit" name="" value=""'+attr+' />\n','']; },
		'input:s':function(attr){ return ['<input type="submit" name="" value=""'+attr+' />\n','']; },
		'input:image':function(attr){ return ['<input type="image" name="" value=""'+attr+' />\n','']; },
		'input:img':function(attr){ return ['<input type="image" name="" value=""'+attr+' />\n','']; },
		'input:i':function(attr){ return ['<input type="image" name="" value=""'+attr+' />\n','']; },
		'input:button':function(attr){ return ['<input type="button" name="" value=""'+attr+' />\n','']; },
		'input:btn':function(attr){ return ['<input type="button" name="" value=""'+attr+' />\n','']; },
		'input:b':function(attr){ return ['<input type="button" name="" value=""'+attr+' />\n','']; },
		'input:file':function(attr){ return ['<input type="file" name="" value=""'+attr+' />\n','']; },
		'input:f':function(attr){ return ['<input type="file" name="" value=""'+attr+' />\n','']; },
		'input:reset':function(attr){ return ['<input type="reset" name="" value=""'+attr+' />\n','']; },
		// 言語コード認識なし
		'html:xml':function(attr){ return ['<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="'+lang+'"'+attr+'>\n','</html>\n']; },
		'html:4t':function(attr){ return ['<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta http-equiv="Content-Type" content="text/html;charset='+charset+'">\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'html:4s':function(attr){ return ['<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">\n<html lang="'+lang+'">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta http-equiv="Content-Type" content="text/html;charset='+charset+'">\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'html:4f':function(attr){ return ['<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">\n<html lang="'+lang+'">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta http-equiv="Content-Type" content="text/html;charset='+charset+'">\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'html:4':function(attr){ return ['<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">\n<html lang="'+lang+'">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta http-equiv="Content-Type" content="text/html;charset='+charset+'">\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'html4':function(attr){ return ['<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">\n<html lang="'+lang+'">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta http-equiv="Content-Type" content="text/html;charset='+charset+'">\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'html:5':function(attr){ return ['<!DOCTYPE HTML>\n<html lang="'+lang+'">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta charset="'+lang+'" />\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'html5':function(attr){ return ['<!DOCTYPE HTML>\n<html lang="'+lang+'">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta charset="'+lang+'" />\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'html:xt':function(attr){ return ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="'+lang+'">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta http-equiv="Content-Type" content="text/html;charset='+charset+'" />\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'xhtml:t':function(attr){ return ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="'+lang+'">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta http-equiv="Content-Type" content="text/html;charset='+charset+'" />\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'html:xs':function(attr){ return ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="'+lang+'">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta http-equiv="Content-Type" content="text/html;charset='+charset+'" />\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'xhtml:s':function(attr){ return ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="'+lang+'">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta http-equiv="Content-Type" content="text/html;charset='+charset+'" />\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'xhtml:1':function(attr){ return ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="'+lang+'">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta http-equiv="Content-Type" content="text/html;charset='+charset+'" />\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'xhtml1':function(attr){ return ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="'+lang+'">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta http-equiv="Content-Type" content="text/html;charset='+charset+'" />\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'html:xf':function(attr){ return ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="'+lang+'">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta http-equiv="Content-Type" content="text/html;charset='+charset+'" />\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'xhtml:f':function(attr){ return ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="'+lang+'">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta http-equiv="Content-Type" content="text/html;charset='+charset+'" />\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'html:xxs':function(attr){ return ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="'+lang+'">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta http-equiv="Content-Type" content="text/html;charset='+charset+'" />\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'xhtml:11':function(attr){ return ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="'+lang+'">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta http-equiv="Content-Type" content="text/html;charset='+charset+'" />\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'xhtml11':function(attr){ return ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="'+lang+'">\n<head>
  <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />\n\t<meta http-equiv="Content-Type" content="text/html;charset='+charset+'" />\n\t<title></title>\n  <script src="/src/ga.js"></script>
</head>\n<body'+attr+'>\n','</body>\n</html>\n']; },
		'xml:version':function(attr){ return ['<?xml version="1.0" encoding="'+charset+'"?>','']; },
		'comment':function(attr){ return ['<!--','-->']; },
		'cc':function(attr){ return ['<!--[if IE]>\n','<![endif]-->\n']; },
		'cc:ie':function(){ return ['<!--[if IE]>\n','<![endif]-->\n']; },
		'cc:noie':function(){ return ['<!--[if !IE]>-->\n','<!--<![endif]-->\n']; },
		'cc:notie':function(){ return ['<!--[if !IE]>-->\n','<!--<![endif]-->\n']; },
		'cc:ie6':function(){ return ['<!--[if IE6]>\n','<![endif]-->\n']; },
		'cc:ie7':function(){ return ['<!--[if IE7]>\n','<![endif]-->\n']; },
		'cc:ie8':function(){ return ['<!--[if IE8]>\n','<![endif]-->\n']; },
		'cc:ie9':function(){ return ['<!--[if IE9]>\n','<![endif]-->\n']; },
		'cc:ltie6':function(){ return ['<!--[if lt IE6]>\n','<![endif]-->\n']; },
		'cc:ltie7':function(){ return ['<!--[if lt IE7]>\n','<![endif]-->\n']; },
		'cc:ltie8':function(){ return ['<!--[if lt IE8]>\n','<![endif]-->\n']; },
		'cc:ltie9':function(){ return ['<!--[if lt IE9]>\n','<![endif]-->\n']; },
		'cc:gtie6':function(){ return ['<!--[if gt IE6]>\n','<![endif]-->\n']; },
		'cc:gtie7':function(){ return ['<!--[if gt IE7]>\n','<![endif]-->\n']; },
		'cc:gtie8':function(){ return ['<!--[if gt IE8]>\n','<![endif]-->\n']; },
		'cc:gtie9':function(){ return ['<!--[if gt IE9]>\n','<![endif]-->\n']; },
		'cc:lteie6':function(){ return ['<!--[if lte IE6]>\n','<![endif]-->\n']; },
		'cc:lteie7':function(){ return ['<!--[if lte IE7]>\n','<![endif]-->\n']; },
		'cc:lteie8':function(){ return ['<!--[if lte IE8]>\n','<![endif]-->\n']; },
		'cc:lteie9':function(){ return ['<!--[if lte IE9]>\n','<![endif]-->\n']; },
		'cc:gteie6':function(){ return ['<!--[if gte IE6]>\n','<![endif]-->\n']; },
		'cc:gteie7':function(){ return ['<!--[if gte IE7]>\n','<![endif]-->\n']; },
		'cc:gteie8':function(){ return ['<!--[if gte IE8]>\n','<![endif]-->\n']; },
		'cc:gteie9':function(){ return ['<!--[if gte IE9]>\n','<![endif]-->\n']; }
	};
	// タグの書式部分の解析
	function ParseTag( s, idx, inContent ){
		idx = ( 'number'!=typeof idx )?1:idx+1;
		
		var m = s.match(new RegExp(Tag));
		if(!m) return;
		m[1]=m[1]?m[1]:'div';	// タグ名が無い場合は勝手にdivタグと推測
		
		var attr = '';
		
		// ID、クラス名の変換
		var idmc = new RegExp('#('+Name+')');
		if( undefined!=m[2] )
			attr+=m[2]
				.replace( idmc, ' id="$1"' )
				.replace( new RegExp('\\.('+Name+'\\.?)+'), function(mh){ 
					return ' class="'+mh.split('.').join(' ').replace(/.*/,function($){ return $.slice(1,$.length); })+'"';
				} );
		// a[title] 等の書式の変換
		if(m[3]) attr+=m[3].replace( new RegExp('\\s*\\[(.+?)\\]', 'g'), function($1,$2){ 
			var r=/(.+?)=("(?:.*?)"|'(?:.*?)'|(?:\S*)?)/; return $2.match(r) ? $2.replace( r, ' $1=$2' ):' '+$2+'=""';
		} );
		// a title='' 等の書式の変換
		if(m[4]) attr+=m[4].replace( new RegExp('\\s('+Name+')=([^\'"]\\S+)', 'g'), ' $1="$2"' );
		// タグの情報を引き出す
		var blk = ElementsData.hasOwnProperty(m[1].toLowerCase()) ? ElementsData[m[1].toLowerCase()]: '';
		
		// タグ内部にテキストの挿入
		var inner = m[5] ? m[5].match(/{(.*?)}/)[1] : '';
		inner = inner.replace( /\$+/g, function( $1 ){ return ( 1==$1.length ) ? idx : num2str( idx, $1.length ); } );
		if( inContent )
			inner += (function(type){
				var inner='', arr = $.split('\n');
				if ( 'block'==type ){
					inner = $.replace( /(.*)\n/g, '\t$1\n' );
					$ = '';
				} else {
					inner = arr.shift();
					$ = arr.join('\n');
				}
				return inner;
			})( blk );
		
		var tag=[
			'<'+m[1]+attr+'>'+(('block'==blk)?'\n':''),
			inner,
			'</'+m[1]+'>'+(('block'==blk||'line'==blk)?'\n':''),
		];
		
		// スニペットを使ってよく使うタグのデータを変更する
		(function transSnippets( i ){
			if( !snippets.hasOwnProperty( i ) ) return;
			var r = snippets[i]( attr );
			tag[0]=r[0];
			tag[2]=r[1];
		})(m[1]);
		
		// 「$」を数字に変換
		tag[0]=tag[0].replace( /\$+/g, function( $1 ){ return ( 1==$1.length ) ? idx : num2str( idx, $1.length ); } );
		return tag;
	}
	
	// 字句解析
	var s=this.toString();
	// トークン切り出し
	var tkstack=(function token_getter(){
		var tkstack=[], cnt=0;
		continue_parse:
		while(s){
			// 全文がマッチするまで解析を続ける
			for( var i in parser ){
				if(++cnt>200) break continue_parse;
				// マッチするまでcontinueで繰り返す
				if( !parser.hasOwnProperty(i) ) continue;
				var m = s.match( new RegExp(i) );
				if(null==m) continue;
				// マッチした構文をスタックに積む
				s = s.slice( m[0].length, s.length );
				tkstack.push( parser[i](m[0]) );
				continue continue_parse;
			}
			// すべてのマッチに失敗するとundefined
			return undefined;
		}
		return tkstack;
	})(s);
	
	/**
	 * 構文木の生成（括弧の処理）
	 */
	var stk=(function parse( stk, rstk ){
		var itm;
		while( itm=stk.shift() ){
			if( ')'==itm ) return rstk;
			if( '('==itm ){ rstk.push(parse( stk, [] )); continue; }
			rstk.push(itm);
		}
		return rstk;
	})(tkstack, []);
	
	// 「*」の処理:タグの繰り返し
	function tagTimes( s, times, inContent ){
		var tag = [], rt=[];
		if( s instanceof Array ) tag=Expr(s);
		for( var i=0; i<times; i++ )
			rt.push( ('string'==typeof tag) ? tag : ParseTag( s, i, inContent ).join('') );
		return rt;
	}
	
	function Expr( stk ){
		var s = stk.shift();
		// 掛け算「*」の取り出し
		var times=1;
		if( stk[0] && ('*'==stk[0]) ){
			stk.shift();	// 「*」の取り出し
			times=eval('('+stk.shift()+')');	// 数値の取り出し
		}
		
		// スタックを消費しつくしたときは再帰終了
		if(0==stk.length)
			return tagTimes( s, times, true ).join('');
		
		// 演算子が有る場合は、内部要素の作成
		var inner = '', mark=stk.shift();
		return ({
			'+':function( befItm ){
				var tag = [], rt=[];
				if( befItm instanceof Array ) tag=Expr(befItm);
				for( var i=0; i<times; i++ )
					rt.push( ('string'==typeof tag) ? tag : ParseTag( befItm, i, true ).join('') );
				
				return rt.join('') + Expr( stk );
			},
			'>':function( befItm ){
				var rt=[], tag=[], s=Expr( stk );
				for( var i=0; i<times; i++ ){
					tag = ParseTag( befItm, i );
					rt.push( [tag[0], (('string'==typeof s)? s : s.join('')).replace(/(.*?)\n/g, function(l){ return '\t'+l; }), tag[2]].join('') );
				}
					
				return rt.join('');
			}
		})[mark](s);
	}
	
	try{
		return Expr( stk );
	}catch(e){
		return '解析失敗!!\n(不明なパターン)\n';//+e.message;
	}
}

