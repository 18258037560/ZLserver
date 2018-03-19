$().ready(function() {
	//固定背景图比例
	var wid = $('#bg1').css('width');
	var heig = parseInt(wid) / 0.83;
	$('#bg1').css('height', heig);

	$('.buy').on('click', function() {
//		var buyUrl = Main.getUrl('/weChat/buyProductPackage?open_id=')+openId
//		console.log(buyUrl)
//		$.ajax({
//			type: "get",
//			url: buyUrl,
//			async: true,
//			dataType: 'json',
//			contentType: 'application/json;charset=utf-8',
//			success:function(data){
//				console.log(data)
//			},
//			error:function(){
//				
//			}
//		});

	location.href = 'vfCode.html'
	})

})