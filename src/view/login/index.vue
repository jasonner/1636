<template>
    <div class="content-box">
      <div class="login-box">
        <img class="login-box-img" src="../../../static/img/banner_login.png" alt="">
        <div class="login-img"><img src="../../../static/img/logo.png" alt=""> </div>
      </div>
      <!--登陆框-->
      <div class="content-body">
            <h3>登陆</h3>
            <div class="content-user-name">
              <van-icon name="manager-o"/><input type="text" v-model="user.name" placeholder="请输入用户名">
            </div>
            <div class="content-user-password">
              <van-icon name="bag-o"/><input type="text" v-model="user.password" placeholder="请输入用户密码">
            </div>
      </div>

      <!--登陆按钮-->
      <div class="login-Button" @click="login()">登录</div>

      <!--底部版权-->
      <div class="footer-box">copyright©2018 All Rights Resrved</div>
    </div>
</template>

<script>
  import { Notify } from 'vant';
  import API from '@/api/api_login'
    export default {
        name: "index",
        data(){
          return {
            user : {
              name: '',
              password: ''
            }
          }
        },
        methods: {
          login(){
            console.log(this.user);
            if(this.user.name == ''){
              Notify('请输入用户姓名');
            }else if(this.user.password == ''){
              Notify('请输入用户密码');
            }else {
              API.login(
              {
                'username':this.user.name,
                'password':this.user.password
              }).then((res)=>{
                console.log(res.respData);

              })
            }
          }
        }

    }
</script>

<style scoped lang="less">
  .content-box{
    width: 100%;
    height: 100%;
    position: relative;
    .login-box-img{
       width: 100%;
     }
    .login-img img{
      width: 80%;
      position: absolute;
      top:  92px;
      left: 75px;
    }
    .content-body{
      position: absolute;
      left: 64px;
      top: 232px;
      width:622px;
      height:370px;
      background:rgba(255,255,255,0.98);
      box-shadow:0px 3px 32px 0px rgba(0, 0, 0, 0.1);
      border-radius:16px;
      h3{
        font-size:36px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(148,41,135,1);
      }
      .content-user-name{
        width:494px;
        height:72px;
        line-height: 72px;
        margin: 0 auto;
        background:rgba(247,244,250,1);
        border-radius:8px;
      }
      .content-user-password{
        width:494px;
        height:72px;
        line-height: 72px;
        margin: 0 auto;
        background:rgba(247,244,250,1);
        border-radius:8px;
        margin-top: 32px;
      }
      .content-user-password input , .content-user-name input{
        border: none;
        background: transparent;
        font-size:26px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(179,163,181,1)
      }
      .content-user-password .van-icon , .content-user-name .van-icon{
        font-size: 26px;
        margin-right: 10px;
      }
    }
    .login-Button{
      width:622px;
      height:86px;
      line-height: 86px;
      margin: 0 auto;
      background:rgba(148,41,135,1);
      border-radius:8px;
      margin-top: 206px;
      font-size:36px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
    .footer-box{
      position: fixed;
      bottom: 0;
      left: 0;
      line-height: 72px;
      width:100%;
      height:72px;
      background:rgba(247,244,250,1);
    }
  }
</style>
