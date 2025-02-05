<script>
export default {
  onLaunch: function() {
    console.log('App Launch');
    // 检查用户登录状态
    this.checkLoginStatus();
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  },
  methods: {
    async checkLoginStatus() {
      try {
        const token = uni.getStorageSync('token');
        if (token) {
          // 已登录，获取用户信息
          // TODO: 调用获取用户信息接口
        }
      } catch (e) {
        console.error('检查登录状态失败：', e);
      }
    }
  }
};
</script>

<style>
/* 全局样式 */
page {
  background-color: #f8f8f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica,
    Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei',
    sans-serif;
}

/* 通用样式类 */
.container {
  width: 100%;
  min-height: 100vh;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-primary {
  color: #6B238E;
}

.bg-primary {
  background-color: #6B238E;
}

.text-center {
  text-align: center;
}

/* 按钮样式 */
.btn-primary {
  background-color: #6B238E;
  color: #fff;
  border: none;
  border-radius: 8rpx;
  padding: 20rpx 40rpx;
}

.btn-primary:active {
  opacity: 0.8;
}

/* 卡片样式 */
.card {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}
</style>
