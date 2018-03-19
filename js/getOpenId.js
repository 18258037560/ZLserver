//var openIdUrl = 'http://5da6553b.ngrok.io/weChat/myProductPackage/e2f0bbaefe558aeab68263570aeb17db9df58f686fd7b28aadcdfa7cd6705523';
var openIdUrl = 'http://localhost:8080/weChat/buyProductPackage?open_id=e2f0bbaefe558aeab68263570aeb17db9df58f686fd7b28aadcdfa7cd6705523';

var hasOpenid = openIdUrl.indexOf('open_id');

console.log(hasOpenid)

if(hasOpenid != -1) {
	var lastIndex = openIdUrl.lastIndexOf('?');

	console.log(lastIndex);

	var openId = openIdUrl.slice(lastIndex + 9)

	console.log(openId)
	
	localStorage.setItem('openId',openId)
}