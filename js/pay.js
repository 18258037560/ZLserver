$().ready(function(){
	
	var Alipaychecked = false;
	
	var weChatchecked = false;
	
	//支付宝radio按钮选择
	$('.Alipay').on('click',function(){
		
		if(!Alipaychecked){
			$('.radioImgA').prop('src','img/checked.png');
			Alipaychecked = true;
			$('.radioImgW').prop('src','img/notchecked.png');
			weChatchecked = false;
			
		}else{
			$('.radioImgA').prop('src','img/notchecked.png')
			Alipaychecked = false
		}
		
		console.log('Alipaychecked:'+Alipaychecked)
		
		console.log('weChatchecked:'+weChatchecked)
		
	})
	
	//微信radio按钮选择
	$('.WeChat_Payment').on('click',function(){
		
		if(!weChatchecked){
			$('.radioImgW').prop('src','img/checked.png');
			weChatchecked = true;
			$('.radioImgA').prop('src','img/notchecked.png');
			Alipaychecked = false;
			
		}else{
			$('.radioImgW').prop('src','img/notchecked.png')
			weChatchecked = false
		}
		
		console.log('Alipaychecked:'+Alipaychecked)
		
		console.log('weChatchecked:'+weChatchecked)
		
	})
	
	$('.confirmPay').on('click',function(){
		
		if(Alipaychecked){
			alert('选择的是支付宝接口')
		}else if(weChatchecked){
			alert('选择的是微信接口')
		}else{
			alert('请选择支付方式')
		}
		
	})
	
})
