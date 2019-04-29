<template>
    <div class="content-box">
      <!--Tab选项卡-->
      <tab :line-width="1" active-color="#942987"  :custom-bar-width="getBarWidth" style="height: 30px">
        <tab-item @on-item-click="onItemClick" selected>消息</tab-item>
        <tab-item @on-item-click="onItemClick">通知</tab-item>
        <tab-item @on-item-click="onItemClick">公告</tab-item>
        <tab-item @on-item-click="onItemClick">待办</tab-item>
      </tab>
      <!--搜索-->
      <div class="searchbar">
        <input type="text" placeholder="请输入姓名或部门进行搜索" v-model="seatchName">
        <button @click="seatchSure(seatchName)">搜索</button>
      </div>
      <!--发送人消息-->
      <div class="messageContent-box">
          <dl>
            <dt>
              <img src="../../../static/img/userHeader.jpg" alt="">
              <div class="sendName">
                <p>姓名</p>
                <p>最新消息主题</p>
              </div>
            </dt>
            <dd>
              <p>10:28</p>
              <p>1</p>
            </dd>
          </dl>
      </div>
      <!--尾部-->
      <foote-tab></foote-tab>
    </div>
</template>
<i18n>
  set bar-active-color:
  zh-CN: 设置bar颜色
</i18n>
<script>
    import { Tab, TabItem,Search } from 'vux'
    import footeTab from '../../components/footer/footerTab'

    export default {
        name: "index",
        components: { Tab,TabItem,Search,footeTab },
        data() {
          return {
            getBarWidth: function (index) {
              return 22 + 'px'
            },
            value: '',
            seatchName: '',
            results: []
          };
      },
        methods:{
          //Tab选项卡
          onItemClick(){
            console.log(666)
          },
          //搜索
          seatchSure(seatchName){
            console.log(seatchName);
            console.log('进行部门筛选')
          },
        },
    }
</script>

<style  lang="less">
  html{
    height: 100%;
  }
  .content-box{
    background: #fff;
    /*Tab选项*/
    .vux-tab-container{
      height: 94px;
      font-size: 28px;
    }
    .vux-tab-wrap{
      .vux-tab{
        height: 94px;
        line-height: 94px;
        .vux-tab-item{
          line-height: 94px;
          font-size: 28px;
        }
      }
    }
    /*搜索*/
    .searchbar{
      border-top: 1px solid #E5E5E5;
      padding: 30px 0;
      box-sizing: border-box;
      input{
        width:558px;
        height:64px;
        border:1px solid rgba(229,229,229,1);
        border-radius:8px;
        font-size: 28px;
        padding-left: 65px;
      }
      button{
        width:104px;
        height:64px;
        background:rgba(148,41,135,1);
        border-radius:8px;
        font-size:28px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        border: none;
        margin-left: 24px;
      }
    }
    /*消息选择*/
    .messageContent-box{
      padding: 0 30px;
      box-sizing: border-box;
      dl{
        height: 160px;
        display: flex;
        dd,dt{
          flex: 1;
        }
        dd{
          text-align: right;
        }
        dt{
          text-align: left;
          img{
            width:100px;
            height:100px;
            background:rgba(229,229,229,1);
            border-radius:100%;
            float: left;
            margin-right: 16px;
          }
          .sendName{
            p:nth-of-type(1){
              font-size:28px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(0,0,0,1);
            }

          }
        }
      }
    }
  }

</style>
