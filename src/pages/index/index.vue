<template>
  <view class="container">
    <!-- logo区域 -->
    <view class="logo-area">
      <image 
        class="logo" 
        src="https://ibb.co/jvZwmm6p" 
        mode="aspectFit"
      ></image>
      <view class="slogan">Scientific Astrology for Modern Life</view>
    </view>
    
    <!-- 功能入口区 -->
    <view class="function-area">
      <view class="function-item" @click="navigateTo('/pages/mbti/index')">
        <image src="https://img.icons8.com/ios/100/psychological-state.png"></image>
        <text>MBTI测试</text>
      </view>
      <view class="function-item" @click="navigateTo('/pages/fortune/index')">
        <image src="https://img.icons8.com/ios/100/crystal-ball.png"></image>
        <text>命理五行</text>
      </view>
    </view>
    
    <!-- 信息输入区 -->
    <view class="input-area">
      <view class="title">开始你的命理之旅</view>
      <form @submit="handleSubmit">
        <input type="text" v-model="userInfo.name" placeholder="请输入姓名" />
        <picker mode="date" v-model="userInfo.birthday" placeholder="请选择出生日期">
          <view class="picker">{{userInfo.birthday || '请选择出生日期'}}</view>
        </picker>
        <picker mode="selector" :range="genderRange" v-model="userInfo.gender">
          <view class="picker">{{genderRange[userInfo.gender] || '请选择性别'}}</view>
        </picker>
        <button form-type="submit" type="primary">开始分析</button>
      </form>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: '',
        birthday: '',
        gender: ''
      },
      genderRange: ['男', '女'],
    }
  },
  methods: {
    navigateTo(url) {
      uni.navigateTo({
        url
      })
    },
    handleSubmit() {
      if (!this.userInfo.name || !this.userInfo.birthday || this.userInfo.gender === '') {
        uni.showToast({
          title: '请填写完整信息',
          icon: 'none'
        })
        return
      }
      
      uni.navigateTo({
        url: '/pages/fortune/index',
        success: () => {
          uni.$emit('setUserInfo', this.userInfo)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 20rpx;
  background-color: #1a1a2e;
  min-height: 100vh;
  color: #fff;
  
  .logo-area {
    padding: 60rpx 0;
    text-align: center;
    
    .logo {
      width: 400rpx;
      height: 400rpx;
    }
    
    .slogan {
      font-size: 28rpx;
      color: rgba(255,255,255,0.8);
      margin-top: 20rpx;
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      -webkit-background-clip: text;
      color: transparent;
    }
  }
  
  .function-area {
    display: flex;
    justify-content: space-around;
    margin: 40rpx 0;
    
    .function-item {
      text-align: center;
      background: rgba(255,255,255,0.1);
      padding: 30rpx;
      border-radius: 20rpx;
      width: 45%;
      
      image {
        width: 120rpx;
        height: 120rpx;
        margin-bottom: 20rpx;
        filter: invert(1);
      }
      
      text {
        font-size: 28rpx;
        color: #fff;
      }
    }
  }
  
  .input-area {
    background: rgba(255,255,255,0.1);
    padding: 30rpx;
    border-radius: 20rpx;
    
    .title {
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 30rpx;
      color: #fff;
    }
    
    input, .picker {
      width: 100%;
      height: 80rpx;
      border: 1rpx solid rgba(255,255,255,0.2);
      border-radius: 10rpx;
      margin-bottom: 20rpx;
      padding: 0 20rpx;
      box-sizing: border-box;
      color: #fff;
      background: rgba(255,255,255,0.05);
    }
    
    button {
      margin-top: 40rpx;
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      border: none;
      
      &::after {
        border: none;
      }
    }
  }
}
</style>
