$().ready(function() {

	//获取病人基本信息接口

	var notPregnant = false;

	var pregnant = false;

	var hNation = false;

	var oNation = false;

	$.ajax({
		type: "get",
		url: Main.getUrl('/user/getPatientInfo/') + localStorage.openId,
		async: true,
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		success: function(data) {
			console.log(data);
			var patient_name = data.data.patient_name,
				nation = data.data.nation,
				address = data.data.address,
				id_number = data.data.id_number,
				is_pregnant = data.data.is_pregnant;

			$('.realName').val(patient_name);

			$('.realIdCard').val(id_number);

			$('.realaddress').val(address);

			if(is_pregnant == 1) {
				$('#pregnant1').prop('src', 'img/checked.png');
				notPregnant = true;
				$('#pregnant2').prop('src', 'img/notchecked.png');
				pregnant = false;
			} else if(is_pregnant == 2) {
				$('#pregnant1').prop('src', 'img/notchecked.png');
				notPregnant = false;
				$('#pregnant2').prop('src', 'img/checked.png');
				pregnant = true;
			}

			if(nation == 1) {
				$('#nation1').prop('src', 'img/checked.png');
				hNation = true;
				$('#nation2').prop('src', 'img/notchecked.png');
				oNation = false;
			}else if(nation == 2){
				$('#nation1').prop('src', 'img/notchecked.png');
				hNation = false;
				$('#nation2').prop('src', 'img/checked.png');
				oNation = true;
			}

		},
		error: function() {

		}
	});

	//////////////////////////////////////////////////////////////////////
	//监听输入框的焦点事件
	$('.realName').on('focus', function() {
		$('.posi').show()
	})

	$('.realName').on('blur', function() {
		$('.posi').hide()
	})

	//备孕radio按钮选择
	$('.hBox').on('click', function() {

		if(!notPregnant) {
			$('#pregnant1').prop('src', 'img/checked.png');
			notPregnant = true;
			$('#pregnant2').prop('src', 'img/notchecked.png');
			pregnant = false;

		} else {
			$('.pregnant1').prop('src', 'img/notchecked.png')
			notPregnant = false
		}

		console.log('notPregnant:' + notPregnant)

		console.log('pregnant:' + pregnant)

	})

	//已怀孕radio按钮选择
	$('.nBox').on('click', function() {

		if(!pregnant) {
			$('#pregnant2').prop('src', 'img/checked.png');
			pregnant = true;
			$('#pregnant1').prop('src', 'img/notchecked.png');
			notPregnant = false;

		} else {
			$('#pregnant2').prop('src', 'img/notchecked.png')
			pregnant = false
		}

		//		console.log('notPregnant:' + notPregnant)
		//
		//		console.log('pregnant:' + pregnant)

	})
	////////////////////////////////////////////////////////////

	//民族radio按钮选择
	$('.sBox').on('click', function() {

		if(!hNation) {
			$('#nation1').prop('src', 'img/checked.png');
			hNation = true;
			$('#nation2').prop('src', 'img/notchecked.png');
			oNation = false;

		} else {
			$('#nation1').prop('src', 'img/notchecked.png')
			hNation = false
		}

		//		console.log('hNation:' + hNation)
		//
		//		console.log('oNation:' + oNation)

	})

	//其他民族radio按钮选择
	$('.bBox').on('click', function() {

		if(!oNation) {
			$('#nation2').prop('src', 'img/checked.png');
			oNation = true;
			$('#nation1').prop('src', 'img/notchecked.png');
			hNation = false;

		} else {
			$('#nation2').prop('src', 'img/notchecked.png')
			oNation = false
		}

		console.log('hNation:' + hNation)

		console.log('oNation:' + oNation)

	})

	var is_pregnant = '';

	var nationValue = '';

	function changeNextBg() {

		$('.next').off('click')

		if($('.realName').val() && is_pregnant && nationValue && $('.realIdCard').val() && $('.realaddress').val()) {

			$('.next').css('backgroundColor', 'rgb(6, 190, 189)').on('click', function() {

				var infoUrl = Main.getUrl('/user/addUserInfo')

				console.log(infoUrl)

				var infoData = {
					"address": $('.realaddress').val(),
					"id_number": $('.realIdCard').val(),
					"is_pregnant": is_pregnant,
					"nation": nationValue,
					'open_id': localStorage.openId,
					"patient_id": '',
					"patient_name": $('.realName').val()
				}

				var postData = JSON.stringify(infoData)

				console.log(postData)

				$.ajax({
					type: "post",
					url: infoUrl,
					async: true,
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					data: postData,
					success: function(data) {
						console.log(data)

						if(data.statusCode == 0) {

							console.log('请求已经成功')

							//							location.href = 'chooseHospital.html'
						}

					},
					error: function(data) {
						console.log(data)
					}
				});

			})

		} else {
			$('.next').css('backgroundColor', 'rgba(144,153,172,0.8)').off('click')
		}
	}

	//监听状态

	$(document).on('click', function() {

		if(notPregnant) {
			is_pregnant = 1
		} else if(pregnant) {
			is_pregnant = 2
		} else {
			is_pregnant = ''
		}

		if(hNation) {
			nationValue = 1
		} else if(oNation) {
			nationValue = 2
		} else {
			nationValue = ''
		}

		changeNextBg()

		console.log('hNation:' + hNation)

		console.log('oNation:' + oNation)

		console.log('notPregnant:' + notPregnant)

		console.log('pregnant:' + pregnant)
	})

	//监听姓名输入框

	$('.realName').on('keyup', function() {

		changeNextBg()

	})

	//监听身份证号码

	$('.realIdCard').on('keyup', function() {

		changeNextBg()
	})

	//监听地址

	$('.realaddress').on('keyup', function() {

		changeNextBg()

	})

})