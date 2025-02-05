<template>
  <view class="user-container">
    <view class="user-info">
<image class="avatar" src="https://img.icons8.com/ios/100/user-circle--v1.png"></image>
      <view class="info">
        <view class="nickname">未登录</view>
        <view class="remaining-times">剩余次数：{{remainingQuota}}次</view>
      </view>
    </view>
    <!-- 待完善具体内容 -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      remainingQuota: 2
    }
  }
}
</script>

<style lang="scss">
.user-container {
  .user-info {
    padding: 40rpx;
    display: flex;
    align-items: center;
    background: #6B238E;
    color: #fff;
    
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 60rpx;
      margin-right: 30rpx;
    }
    
    .info {
      .nickname {
        font-size: 32rpx;
        margin-bottom: 10rpx;
      }
      
      .remaining-times {
        font-size: 28rpx;
        opacity: 0.8;
      }
    }
  }
}
</style>
