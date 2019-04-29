$(function(){
	//API_showbyid
	console.log(_token)
	console.log(_user)
	
	$('.name').html(_user.user.username)
	$('.sex').html(_user.user.sex)
//	$('.bumen').html(_user.user.realname)
	$('.phone').html(_user.user.phone)

	if(_user.user.utypeid==0){
		var usertype  = '教师'
	}else if(_user.user.utypeid==1){
		var usertype  = '学生'
	}else if(_user.user.utypeid==2){
		var usertype  = '家长'
	}else{
		var usertype  = '访客'
	}
	$('.usertype').html(usertype)
	$('.touxiang img').attr('src',_user.user.currimg)
	
	
	function hide(){
		$('.cog_index').hide();
		$('.cog_email').hide();
		$('.cog_password').hide();
		$('.cog_phone').hide();	
		
		$('#myModal_cog').modal('hide')
		
		$('.emailNum').val('');
		$('.codeValue').val('');
		$('.loginPassword').val('');
		clearInterval(timer);
		$('.getCode').html("获取验证码");
		$('.getCode').removeClass('disabled')
		countdown = 60;
		timer = null;
		
		$('.oldpwd').val('');
		$('.newpwd').val('');
		$('.newpwdAgain').val('');
	}
	
	$('.bb').on('click',function(){
		hide();
		$('.cog_index').show();
	});
	//进入修改邮箱
	$('.email_update').on('click',function(){
		hide();
		$('.cog_email').show();	
	})
	//进入修改手机
	$('.phone_update').on('click',function(){
	    hide();
		$('.cog_phone').show();
	})
	//进入修改密码
	$('.password_update').on('click',function(){
		hide();
		$('.cog_password').show();
	})
	
	
	//邮箱
	var timer = null;
	var codeMa = '';
	
	$('.getCode').on('click',function(){
		var email = $('.emailNum').val();
		var countdown = 60;
		if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email)){
        	// 验证码60秒倒计时
			if (!timer) {
			  	$.ajax({
					url:API_getcode,
					type:"get",
					data:{"registerAcc":email,"account":_user.user.account},
					success:function(res){
						console.log(res)
						if(res.code==1){
							console.log('已发送成功')
							codeMa = res.data;
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
						}else{
							alert(res.message)	
						}
					},
					error:function(data){
						alert('服务器出错啦！请稍候再试吧')
					}
				})
			   	
			}	
		}else{
			alert('请输入正确的邮箱号码')
		}	
	})
	
	

	$('.codeValue').on('blur',function(){
		var codeValue = $('.codeValue').val();
		if(codeValue!=''){
			if(codeValue!=codeMa){
				alert('验证码输入错误！');
			}
		}
	});
	
	$('.queding_email').on('click',function(){
		
		if($('.emailNum').val()==''||$('.codeValue').val()==''||$('.loginPassword').val()==''){
			alert('请完整填写信息！')
		}else if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test($('.emailNum').val())){
			alert('请输入正确的邮箱号！')
		}else if(hex_sha1($('.loginPassword').val())==_pwd){//密码相同
			var codeValue = $('.codeValue').val();
			if(codeValue!=''){
				if(codeValue!=codeMa){
					alert('验证码输入错误！');
				}else{
					$('#myModal_cog').modal('show')
					$.ajax({
						url:API_userUpdate,
						type:"post",
						data:{
							"H5Token":_token,
							"account":_user.user.account,
							"username":_user.user.username,
							"userid":_user.user.userid,
							"utypeid":_user.user.utypeid,
							"email" : $('.emailNum').val(),
							"bindemail":true
						},
						success:function(res){
							console.log(res)
							if(res.code==1){
								setTimeout(function(){
									hide();
									$('.cog_index').show();
									alert('修改成功')
								},2000)
								
							}else if(res.code==2){
								sessionStorage.clear();
								window.location.href = "./login.html";
							}else{
								alert(res.message)
							}
						},
						error:function(data){
							alert('服务器出错啦！请稍候再试吧')
						}
					})
				}
			}
	
		}else{
			alert('登录密码错误！')
		}
	})
	
	
	
	//密码修改
	$('.queding_password').on('click',function(){
		var oldpwd = $('.oldpwd').val();
		var newpwd = $('.newpwd').val();
		var newpwdAgain = $('.newpwdAgain').val();
		 
		if(oldpwd==''||newpwd==''||newpwdAgain==''){
		 	alert('请完整填写信息！')
		}else if(newpwd!=newpwdAgain){
			alert('两次新密码不一致！')
		}else{
			$('#myModal_cog').modal('show')
			$.ajax({
				url:API_pwdUpdate,
				type:"post",
				data:{
					"H5Token":_token,	
					"userId":_user.user.userid,
					"oldPwd" : hex_sha1(oldpwd),
					"newPwd" : hex_sha1(newpwd),
				},
				success:function(res){
					console.log(res)
					if(res.code==1){
						setTimeout(function(){
							hide();
							sessionStorage.clear();
							alert('密码已修改成功,请重新登录！')
							window.location.href = "./login.html";
						},2000)
						
					}else if(res.code==2){
						sessionStorage.clear();
						window.location.href = "./login.html";
					}else{
						alert(res.message)
						$('#myModal_cog').modal('hide')
					}
				},
				error:function(data){
					alert('服务器出错啦！请稍候再试吧')
					$('#myModal_cog').modal('hide')
				}
			})
		}
		
	})
	
	
	
	$('.out').on('click',function(){//退出
		$.ajax({
			url:API_out,
			type:"post",
			data:{"H5Token":_token},
			dataType: "json",
			success:function(res){
				if(res.code==1){
					sessionStorage.clear();
					window.location.href = "./login.html";
				}else if(res.code==2){
					sessionStorage.clear();
					window.location.href = "./login.html";
				}else{
					alert(res.message)
				}
			},
			error:function(data){
				alert('服务器出错啦！请稍候再试吧')
			}
		})
	})
	
	
	
	
	
	
	
//	$.ajax({
//		url:API_showbyid,
//		type:"get",
//		data:{"id":_user.user.userid,"H5Token":_token},
//		dataType: "json",
//		success:function(res){
//			console.log(res)
//			if(res.code==1){
//				
////				sessionStorage.setItem()
//			}else{
//				alert(res.message)
//			}
//		},
//		error:function(data){
//			alert('服务器出错啦！请稍候再试吧')
//		}
//	})
	
	
})

