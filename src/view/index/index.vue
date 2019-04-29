<template>
    <div class="content-box">
      首页
      <van-button type="primary">主要按钮</van-button>
      <transition name="van-fade">
        <div >Fade</div>
      </transition>
    </div>
</template>

<script>
  import { Button } from 'vant';
  import API from '@/api/api_login'
  export default {
    name: "index",
    data(){
      return {
        user : {
          visible: true,
          password: ''
        }
      }
    },
    methods: {

    }
  }
</script>
<style scoped>

</style>
