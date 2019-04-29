$(function(){
	var APILOG = 'http://192.168.1.123:8080/zkhzupmserver';
	var API_before = APILOG + '/api/before/verify',//登录之前的验证
		API_login = APILOG + '/api/login',//登录
		API_getcode = APILOG + '/api/signin/signinBeH5',//获取验证码
		API_forget = APILOG + '/api/forget/update';//更改密码
	//点击登录
	$('.login-btn').on('click',function(){
		
		var user = $(".user").val();
		var pwd = hex_sha1($(".pwd").val())//加密一下hash
		if(user==''||pwd==''){
			alert('请输入登录信息')
		}else{
			$('#myModal_login').modal('show');
			$.ajax({	
				url:API_before,
				type:"post",
				data:{"register":user,"password":pwd},
				success:function(res){
					console.log(res)
					if(res.code==1){
						sessionStorage.setItem('2nkpwd',pwd);
						$.ajax({
							url:API_login,
							type:"post",
							data:{"register":user,"password":pwd},
							success:function(res){
								console.log(res)
								if(res.code==1){
									$('#myModal_login').modal('hide');
									sessionStorage.setItem('2nk_token',res.data.token);
									sessionStorage.setItem('user',JSON.stringify(res.data));
									window.location.href = "./index.html";
								}else{
									$('#myModal_login').modal('hide');
									alert(res.message)
								}
							},
							error:function(data){
								$('#myModal_login').modal('hide');
								alert('服务器出错啦！请稍候再试吧')
							}
						})
					}else if(res.code==0){
						$('#myModal_login').modal('hide');
						if(res.data.count>2&&res.data.count<res.data.limit){
	                        alert('您已经连续'+res.data.count+'次密码错误，连续'+res.data.limit+'次账号将被冻结30分钟！')     
	        			}else if(res.data.count==res.data.limit){
	        				if(res.data.time==''){
	        					alert('您已经连续'+res.data.limit+'次密码错误，账户已冻结，请30分钟后重试')    					
	        				}else{
	        					alert('账户已冻结，请'+Math.ceil(res.data.time/60)+'分钟后重试')
	        				}
	        			}else{
	        				alert('密码错误')
	        			}	
					}else{
						$('#myModal_login').modal('hide');
						alert(res.message)
					}
				},
				error:function(data){
					$('#myModal_login').modal('hide');
					alert('服务器出错啦！请稍候再试吧')
				}
			})
		}
		
		
	})
	
	
	//找回密码
	var timer = null;
	$('.getCode').on('click',function(){
		console.log($('.register').val())
		console.log($('.email').val())
		console.log($('.newpwd').val())
		console.log($('.newpwdAgain').val())
		console.log($('.codeValue').val());
		var email = $('.email').val();
		var account = $('.register').val();
		var countdown = 60;
		if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email)){
        	// 验证码60秒倒计时
			if (!timer) {
			  	$.ajax({
					url:API_getcode,
					type:"get",
					data:{"registerAcc":email,"account":account},
					success:function(res){
						console.log(res)
						if(res.code==1){
							
						}else{
							alert(res.message)
						}
					},
					error:function(data){
						alert('服务器出错啦！请稍候再试吧')
					}
				})
			   	timer = setInterval(function(){
			   		if(countdown > 0 && countdown <= 60) {
			    		countdown--;
			    		if(countdown !== 0) {
			    			$('.getCode').html("重新发送(" + countdown + ")");
			    			$('.getCode').addClass('disabled')
			    		} else {
				    		clearInterval(timer);
				    		$('.getCode').html("获取验证码");
				    		$('.getCode').removeClass('disabled')
				    		countdown = 60;
				    		timer = null;
			    		}
			   		}
			    }, 1000)
			}
			
			
		}else{
			alert('请输入正确的邮箱号码')
		}	
	})
	
	$('.queding').on('click',function(){
		
		if($('.register').val()==''||$('.email').val()==''||$('.newpwd').val()==''||$('.newpwdAgain').val()==''){
			alert('请完整填写信息！')
		}else if($('.codeValue').val()==''){
			alert('请输入验证码！')
		}else if($('.codeValue').val()!='8888'){
			alert('验证码错误！')
		}else if($('.newpwd').val()!=$('.newpwdAgain').val()){
			alert('两次密码不一致！')
		}else{
			$('#myModal_forget').modal('show')
			$.ajax({
				url:API_forget,
				type:"post",
				data:{"register":$('.register').val(),"password":$('.newpwd').val()},
				success:function(res){
					console.log(res)
					$('#myModal_forget').modal('hide')
					if(res.code==1){
						alert('密码修改成功，返回登录页重新登录')
					}else{
						alert(res.message)
					}
					
					
				},
				error:function(data){
					alert('服务器出错啦！请稍候再试吧')
				}
			})
			
			
			
			
		}
	})
	
})