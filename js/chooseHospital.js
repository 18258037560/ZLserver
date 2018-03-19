$().ready(function() {

	var hospitalUrl = Main.getUrl('/user/getHospitalListByWeChat');

	var doctorUrl = Main.getUrl('/user/getDoctorListByWeChat/');

	var bindDoctor = Main.getUrl('/user/bindUserToDoctor');
	//	console.log(hospitalUrl)

	//获得整个医院列表
	$.ajax({
		type: "get",
		url: hospitalUrl,
		async: true,
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		success: function(data) {
			//			console.log(data)

			var hospital_list = data.data;

			//			console.log(hospital_list)

			for(var i = 0; i < hospital_list.length; i++) {

				//				console.log(hospital_list[i].hospital_name)

				var list = '<li class="list">' + hospital_list[i].hospital_name + '</li>';

				$('.hospital_list').append(list)

			}

			//获取医院id

			$('.hospital_list').on('click', '.list', function() {
				$('.doctor_list').off()
				$('.docList').remove()

				var hospital_id = hospital_list[$(this).index()].hospital_id

				console.log(hospital_id);

				$('.hosChoose').text(hospital_list[$(this).index()].hospital_name)

				$('.search_hospital').hide()

				//通过医院id获取医生列表

				$.ajax({
					type: "get",
					url: doctorUrl + hospital_id,
					async: true,
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					success: function(data) {

						console.log(data)

						var doctor_list = data.data;

						console.log(doctor_list)

						for(var i = 0; i < doctor_list.length; i++) {

							console.log(doctor_list[i].doctor_name)

							var list = '<li class="docList">' + doctor_list[i].doctor_name + '</li>';

							$('.doctor_list').append(list)

						}

						$('.doctor_list').on('click', '.docList', function() {

							console.log($(this).index())

							var index = $(this).index()
							//选取选到医院的索引

							console.log(doctor_list[index])

							//医生名字

							var doctorName = doctor_list[index].doctor_name;

							var doctorId = doctor_list[index].doctor_id;

							console.log(doctorName);

							console.log(doctorId);

							$('.docChoose').text(doctorName)

							$('.bigBox').hide()

							$('.complete').on('click', function() {
								var postData = JSON.stringify({
									doctor_id: doctorId,
									hospital_id: hospital_id,
									patient_id: '',
									open_id:localStorage.openId
								})
								
								console.log(postData)
								$.ajax({
									type: "post",
									url: bindDoctor,
									async: true,
									dataType: 'json',
									data: postData,
									contentType: 'application/json;charset=utf-8',
									success: function(data) {
										console.log(data)
									},
									error: function() {

									}
								});
							})

						})

					},
					error: function(data) {

					}
				});

			})

		},
		error: function(data) {
			console.log(data)
		},

	});

	//控制医院选择框显示
	$('.hostital').on('click', function() {
		$('.search_hospital').show()
	})
	//控制医院选择框消失
	$('.search_right').on('click', function() {
		$('.search_hospital').hide()
	})

	//控制医生选择框显示
	$('.doctor').on('click', function() {

		$('.bigBox').hide()

		if($('.hosChoose').text() == '请选择') {
			alert('请先选择医院')
			return false;
		} else {
			$('.bigBox').show()
		}
	})

	//控制医生选择框消失
	$('.cancel').on('click', function() {
		$('.bigBox').hide()
	})

	//

	$('.list').on('click', function() {
		$('.doctor_list').remove()
	})

	$(document).on('click',function(){
		if($('.docChoose').text()!='请选择'&&$('.hosChoose').text()!='请选择'){
			$('.complete').css('backgroundColor','rgb(6, 190, 189)')
		}
	})
})