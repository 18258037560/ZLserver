$().ready(function() {

	var getRecordUrl = Main.getUrl('/weChat/myProductPackageInfo/') + openId;
	
	console.log(getRecordUrl)
	$.ajax({
		type: "get",
		url: getRecordUrl,
		async: true,
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		success: function(data) {
			console.log(data);
			
			var patient_name = data.data.patient_name,
				phoneNum = data.data.patient_phone,
				address = data.data.address,
				hospital_name = data.data.hospital_name,
				doctor_name = data.data.doctor_name,
				pay_date = data.data.pay_date,
				pay_amount = data.data.pay_amount;
				recordNum = data.data.consultation_record_list.length,
				record = data.data.consultation_record_list;
				
				if(data.data.nation == 1){
					var nation = '汉族'
				}else if(data.data.nation == 2){
					var nation = '其他'
				}
			
			$('.number').text(5-recordNum);
			$('.relName').text(patient_name);
			$('.phone').text(phoneNum);
			$('.nation').text(nation);
			$('.address').text(address);
			$('.hospital').text(hospital_name);
			$('.doctor').text(doctor_name);
			$('.date').text(pay_date);
			$('.money').text(pay_amount);
			
			
			
			for (var i = 0;i<recordNum;i++) {
				$('.contentBox').append($('.tmp').html().replace('{{date}}',record[i].consultation_date))
			}
		},
		error: function() {

		}
	});
})