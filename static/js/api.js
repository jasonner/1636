	
	
	var _token = sessionStorage.getItem('2nk_token');
	var _user = JSON.parse(sessionStorage.getItem('user'));
	var _pwd = sessionStorage.getItem('2nkpwd');
	
	if(_token==null){
		window.location.href = "./login.html";
	}
	var API = 'http://192.168.1.123:8080/zkhzupmserver';
//	var API_before = API + '/api/before/verify',//登录之前的验证
//		API_login = API + '/api/login',//登录
	var API_out = API + '/api/logout',//退出
//		API_getcode = API + '/api/signin/signinBeH5',//获取验证码
//		API_forget = API + '/api/forget/update',//忘记密码之更改密码
		API_showbyid = API + '/api/user/show',//查询个人信息
		API_userUpdate = API + '/api/user/update',//修改用户信息
		API_pwdUpdate = API + '/api/user/modifyPwd';//修改密码