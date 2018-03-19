$().ready(function() {

	//控制icon比例
	var iconH = parseInt($('.icon').css('width'));
	//	console.log(iconH);
	$('.icon').css('height', iconH);

/////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////验证码倒计时//////////////////

	function getCode() {

		$('.getVfCode').on('click', function(e) {

			var phoneNum = $('.phone').val();

			$('.getVfCode').off('click')

			console.log(phoneNum)

			console.log(Main.getUrl('/user/senMessage/') + phoneNum)

			$.ajax({
				type: "get",
				url: Main.getUrl('/user/senMessage/') + phoneNum,
				async: true,
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				success: function(data) {

					console.log(data)

					if(data.statusCode == 0) {

						$('.getVfCode').off('click').css('color', 'rgb(144, 153, 172)')

						var tmp = 30;

						$('.getVfCode').text(tmp + '秒后重新获取')

						//倒计时定时器
						var setIn = setInterval(function() {
							--tmp
							$('.getVfCode').text(tmp + '秒后重新获取')
							if(tmp == 0) {
								clearInterval(setIn)
								$('.getVfCode').text('点击获取验证码').css('color', 'rgb(237, 85, 100)')
								getCode()
							}

						}, 1000)

					} else {
						alert(data.statusMessage)
						getCode()
					}

				},
				error: function() {
					//					alert('网络错误')
					getCode()
				}
			});

		})

	}

///////////////////////////////////////////////////////////////

////////////////////////////////////这是调用验证码接口
	getCode()


	//监听下一步(radio选项)
	$('#pro').on('click', function() {

		console.log($('#pro').prop('checked'))

		if(($('#pro').prop('checked')) && $('.phone').val() && $('.vfCode').val()) {
			//
			$('.next').off('click')
			$('.next').css('backgroundColor', 'rgb(6,190,189)').on('click', sbmt)

		} else {
			$('.next').css('backgroundColor', 'rgba(144,153,172,0.8)').off('click')
		}
	})

	//监听phone输入框
	$('.phone').on('keyup', function() {

		console.log($('#pro').prop('checked'))

		if(($('#pro').prop('checked')) && $('.phone').val() && $('.vfCode').val()) {
			//
			$('.next').off('click')
			$('.next').css('backgroundColor', 'rgb(6,190,189)').on('click', sbmt)

		} else {
			$('.next').css('backgroundColor', 'rgba(144,153,172,0.8)').off('click')
		}
	})

	//监听验证码输入框
	$('.vfCode').on('keyup', function() {

		console.log($('#pro').prop('checked'))

		if(($('#pro').prop('checked')) && $('.phone').val() && $('.vfCode').val()) {
			//
			$('.next').off('click')
			
			$('.next').css('backgroundColor', 'rgb(6,190,189)').on('click', sbmt)

		} else {
			$('.next').css('backgroundColor', 'rgba(144,153,172,0.8)').off('click')
		}
	})
//////////////////////////////////////////////////////////////////
	

////////////////////////////////////提交注册绑定/////////
	function sbmt() {
		var sbmtUrl = Main.getUrl('/user/registerAndLogin'),

			sumtData = {
				"code": $('.vfCode').val(),
				"open_id": openId,
				"patient_phone": $('.phone').val(),
				"signedAgreementVo": {
					"patient_user_id": "",
					"signed_agreement_content": "www.baidu.com",
					"signed_agreement_id": "",
					"signed_agreement_version": "1.0"
				}
			},

			tranData = JSON.stringify(sumtData);

//		console.log(sumtData)

//		console.log(tranData)

		$.ajax({
			type: "post",
			url: sbmtUrl,
			async: true,
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: tranData,
			success: function(data) {
				console.log(data)
				
				if(data.statusCode == 0){
					
					location.href = 'pay.html'
					
				}else{
//					alert(data.statusMessage)
				}
				
			},
			error: function(data) {
				console.log(data)
			}
		});
	}


})