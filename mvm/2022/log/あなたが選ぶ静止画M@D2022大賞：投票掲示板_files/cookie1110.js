// init
strcookie = document.cookie + ";";
start = strcookie.indexOf("EZBBS3=");
if (start != -1) {
	end = strcookie.indexOf(";", start);
	strcookie = strcookie.substring(start + 7, end) + "^";
} else {
	strcookie = "";
}

// getvalue()
function getvalue(n) {
	start = strcookie.indexOf(n);
	if (start != -1) {
		end = strcookie.indexOf("^", start);
		return unescape(strcookie.substring(start + n.length, end));
	} else {
		return "";
	}
}

if (strcookie != "") {
	// l_name
	l_name = getvalue("l_name:");
	if (l_name != "") {
		document.bbs.l_name.value = l_name;
	}

	// l_mail
	l_mail = getvalue("l_mail:");
	if (l_mail != "") {
		document.bbs.l_mail.value = l_mail;
	}

	// l_col1
	l_col1 = getvalue("l_col1:");
	if (l_col1 != "") {
		for (i = 0; i < document.bbs.l_col1.length; i++) {
			if (l_col1 == document.bbs.l_col1.options[i].value) {
				document.bbs.l_col1.selectedIndex = i;
				break;
			}
		}
	}

	// l_col2
	l_col2 = getvalue("l_col2:");
	if (l_col2 != "") {
		for (i = 0; i < document.bbs.l_col2.length; i++) {
			if (l_col2 == document.bbs.l_col2.options[i].value) {
				document.bbs.l_col2.selectedIndex = i;
				break;
			}
		}
	}

	// l_url
	l_url = getvalue("l_url:");
	if (l_url != "") {
		document.bbs.l_url.value = l_url;
	}
}

function setcookie() {
	window.onerror = null;
	var exp = new Date();
	exp.setTime(exp.getTime() + 30 * 86400000);
	document.cookie = "EZBBS3=l_name:" + escape(document.bbs.l_name.value) + "^l_mail:" + escape(document.bbs.l_mail.value) + "^l_col1:" + document.bbs.l_col1.options[document.bbs.l_col1.selectedIndex].value + "^l_col2:" + document.bbs.l_col2.options[document.bbs.l_col2.selectedIndex].value + "^l_delkey:^l_url:" + escape(document.bbs.l_url.value) + "; expires=" + exp.toGMTString() + "; path=/; domain=.ezbbs.net;";
}
