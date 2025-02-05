<template>
  <view class="container">
    <view class="header">
      <image class="logo" src="/static/images/logo.png" mode="aspectFit"></image>
      <text class="title">NEOASTRO</text>
    </view>
    
    <view class="content">
      <view class="feature-list">
        <navigator url="/pages/fortune/index" class="feature-item">
          <text class="feature-title">命理分析</text>
          <text class="feature-desc">专业的命理分析工具</text>
        </navigator>
        
        <navigator url="/pages/mbti/index" class="feature-item">
          <text class="feature-title">MBTI测试</text>
          <text class="feature-desc">了解你的性格类型</text>
        </navigator>
        
        <navigator url="/pages/chat/index" class="feature-item">
          <text class="feature-title">智能问答</text>
          <text class="feature-desc">AI助手为你解答</text>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  onLoad() {
    console.log('Index page loaded')
  },
  methods: {
  }
}
</script>

<style lang="scss">
.container {
  padding: 20px;
  min-height: 100vh;
  background-color: #1a1a2e;
  
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
    
    .logo {
      width: 120px;
      height: 120px;
    }
    
    .title {
      margin-top: 20px;
      font-size: 24px;
      color: #fff;
      font-weight: bold;
    }
  }
  
  .content {
    margin-top: 40px;
    
    .feature-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      
      .feature-item {
        background-color: rgba(255, 255, 255, 0.1);
        padding: 20px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        
        .feature-title {
          font-size: 18px;
          color: #fff;
          margin-bottom: 8px;
        }
        
        .feature-desc {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }
}
</style>
