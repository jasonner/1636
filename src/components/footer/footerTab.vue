<template>
    <div class="footer">
      <ul class="footer_ul">
        <li class="active"><a href="index.html"><span class="glyphicon glyphicon-home"></span><br/>首页</a></li>
        <li><a href="#"><span class="glyphicon glyphicon-save"></span><br/>收件</a></li>
        <li><a href="#"><span class="glyphicon glyphicon-open"></span><br/>发件</a></li>
        <li><a href="my.html"><span class="glyphicon glyphicon-user"></span><br/>我的</a></li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "footer-tab"
    }
</script>

<style scoped>
  .footer{border-top:1px solid #eee;position:fixed;bottom:0;width:100%;background:#F8F8F8;}
  .footer .footer_ul li{padding:5px 0;width:25%;float:left;text-align:center;}
  .footer .footer_ul li>a{color: #000; font-size: 28px}
  .footer .footer_ul li.active{font-weight:600;}
  .footer .footer_ul li.active>a{color: #942987;}
</style>
