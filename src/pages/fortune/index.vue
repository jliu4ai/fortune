<template>
  <view class="fortune-container">
    <!-- 用户信息展示 -->
    <view class="user-info-card">
      <view class="basic-info">
        <text class="name">{{userInfo.name}}</text>
        <text class="birth-time">{{userInfo.birthday}}</text>
      </view>
      <view class="elements-chart">
        <view class="chart-title">五行分析</view>
        <view class="elements">
          <view class="element-item" v-for="(value, element) in elements" :key="element">
            <view class="element-bar" :style="{ height: value + '%' }">
              <text class="element-value">{{value}}%</text>
            </view>
            <text class="element-name">{{element}}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 运势分析标签页 -->
    <view class="fortune-tabs">
      <view 
        class="tab-item" 
        v-for="(tab, index) in tabs" 
        :key="index"
        :class="{ active: currentTab === index }"
        @click="switchTab(index)"
      >
        {{tab.name}}
      </view>
    </view>

    <!-- 运势内容区 -->
    <view class="fortune-content">
      <swiper :current="currentTab" @change="swiperChange" style="height: 800rpx;">
        <swiper-item v-for="(tab, index) in tabs" :key="index">
          <scroll-view scroll-y style="height: 100%;">
            <view class="content-card">
              <view class="card-title">
                <image :src="tab.icon" mode="aspectFit"></image>
                <text>{{tab.name}}运势</text>
              </view>
              <view class="fortune-text">{{fortuneContent[tab.key]}}</view>
              
              <!-- 星级评分 -->
              <view class="rating">
                <text class="rating-label">运势指数：</text>
                <view class="stars">
                  <text 
                    v-for="i in 5" 
                    :key="i" 
                    class="star"
                    :class="{ active: i <= tab.rating }"
                  >★</text>
                </view>
              </view>

              <!-- 吉凶提醒 -->
              <view class="tips">
                <view class="tip-item good">
                  <text class="tip-title">宜：</text>
                  <text class="tip-content">{{tab.goodFor}}</text>
                </view>
                <view class="tip-item bad">
                  <text class="tip-title">忌：</text>
                  <text class="tip-content">{{tab.badFor}}</text>
                </view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 咨询按钮 -->
    <view class="action-buttons">
      <button class="consult-btn" @click="startConsult">开始咨询</button>
      <button class="share-btn" @click="shareResult">分享运势</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: '测试用户',
        birthday: '2000-01-01'
      },
      currentTab: 0,
      elements: {
        '金': 80,
        '木': 60,
        '水': 40,
        '火': 30,
        '土': 50
      },
      tabs: [
        {
          name: '今日',
          key: 'today',
          icon: 'https://img.icons8.com/nolan/64/calendar.png',
          rating: 4,
          goodFor: '谈判、投资、开始新项目',
          badFor: '轻率决策、过度消费'
        },
        {
          name: '本周',
          key: 'week',
          icon: 'https://img.icons8.com/nolan/64/calendar-week.png',
          rating: 3,
          goodFor: '学习、旅行、社交活动',
          badFor: '冲动消费、激进投资'
        },
        {
          name: '本月',
          key: 'month',
          icon: 'https://img.icons8.com/nolan/64/calendar-month.png',
          rating: 5,
          goodFor: '升职加薪、表白、搬家',
          badFor: '争执、赌博、冒险'
        },
        {
          name: '本年',
          key: 'year',
          icon: 'https://img.icons8.com/nolan/64/calendar-year.png',
          rating: 4,
          goodFor: '创业、结婚、置业',
          badFor: '投机、借贷、改行'
        }
      ],
      fortuneContent: {
        today: '今日五行属水，利于谋划未来。财运方面会有意外收获，建议把握机会适度投资。感情方面桃花运旺，单身者可能遇到心仪对象。工作上长辈可能会给予帮助，事业发展顺利。',
        week: '本周运势平稳，适合稳扎稳打。事业上可能遇到一些挑战，但只要保持冷静就能化险为夷。财运方面要注意节制，避免冲动消费。感情方面可能需要多一些耐心和包容。',
        month: '本月运势极佳，是实现目标的黄金期。事业上会遇到贵人相助，有望获得晋升机会。财运亨通，适合开展新的投资计划。感情方面有望修成正果，适合确定关系。',
        year: '今年整体运势不错，但需要把握关键时机。上半年适合稳固基础，下半年则可大展拳脚。事业上会有重要机遇，财运方面可能有大笔收入。感情方面将遇到贵人，姻缘和谐。'
      }
    }
  },
  onLoad(options) {
    // 获取从首页传递的用户信息
    uni.$on('setUserInfo', (data) => {
      this.userInfo = data
      this.calculateElements()
    })
  },
  methods: {
    switchTab(index) {
      this.currentTab = index
    },
    swiperChange(e) {
      this.currentTab = e.detail.current
    },
    calculateElements() {
      // 这里可以根据生辰八字计算五行比例
      // 目前使用示例数据
    },
    startConsult() {
      // 检查剩余次数
      const remainingQuota = uni.getStorageSync('remainingQuota') || 2
      if (remainingQuota > 0) {
        uni.navigateTo({
          url: '/pages/chat/index'
        })
      } else {
        uni.showModal({
          title: '提示',
          content: '免费咨询次数已用完，是否付费继续？',
          success: (res) => {
            if (res.confirm) {
              this.showPayment()
            }
          }
        })
      }
    },
    showPayment() {
      uni.showActionSheet({
        itemList: ['支付 6.66 元', '支付 16.66 元', '支付 26.66 元'],
        success: (res) => {
          const amounts = [6.66, 16.66, 26.66]
          this.processPayment(amounts[res.tapIndex])
        }
      })
    },
    processPayment(amount) {
      // 调用支付接口
      uni.showLoading({
        title: '正在处理支付'
      })
      // 模拟支付过程
      setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
          title: '支付成功',
          icon: 'success'
        })
      }, 1500)
    },
    shareResult() {
      uni.showShareMenu({
        withShareTicket: true
      })
    }
  }
}
</script>

<style lang="scss">
.fortune-container {
  min-height: 100vh;
  background-color: #1a1a2e;
  padding: 30rpx;
  color: #fff;

  .user-info-card {
    background: rgba(255,255,255,0.1);
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;

    .basic-info {
      text-align: center;
      margin-bottom: 30rpx;

      .name {
        font-size: 36rpx;
        font-weight: bold;
        margin-right: 20rpx;
      }

      .birth-time {
        font-size: 28rpx;
        color: rgba(255,255,255,0.6);
      }
    }

    .elements-chart {
      .chart-title {
        font-size: 28rpx;
        margin-bottom: 20rpx;
        color: rgba(255,255,255,0.8);
      }

      .elements {
        display: flex;
        justify-content: space-between;
        height: 200rpx;
        align-items: flex-end;

        .element-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 18%;

          .element-bar {
            width: 100%;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            border-radius: 10rpx;
            position: relative;
            transition: height 0.3s;
            
            .element-value {
              position: absolute;
              top: -40rpx;
              width: 100%;
              text-align: center;
              font-size: 24rpx;
            }
          }

          .element-name {
            margin-top: 10rpx;
            font-size: 24rpx;
          }
        }
      }
    }
  }

  .fortune-tabs {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30rpx;

    .tab-item {
      flex: 1;
      text-align: center;
      padding: 20rpx 0;
      font-size: 28rpx;
      color: rgba(255,255,255,0.6);
      border-bottom: 4rpx solid transparent;
      transition: all 0.3s;

      &.active {
        color: #fff;
        border-bottom-color: #4ecdc4;
      }
    }
  }

  .fortune-content {
    .content-card {
      background: rgba(255,255,255,0.1);
      border-radius: 20rpx;
      padding: 30rpx;

      .card-title {
        display: flex;
        align-items: center;
        margin-bottom: 30rpx;

        image {
          width: 40rpx;
          height: 40rpx;
          margin-right: 10rpx;
        }

        text {
          font-size: 32rpx;
          font-weight: bold;
        }
      }

      .fortune-text {
        font-size: 28rpx;
        line-height: 1.6;
        margin-bottom: 30rpx;
        color: rgba(255,255,255,0.8);
      }

      .rating {
        display: flex;
        align-items: center;
        margin-bottom: 30rpx;

        .rating-label {
          font-size: 28rpx;
          margin-right: 20rpx;
        }

        .stars {
          .star {
            font-size: 36rpx;
            color: rgba(255,255,255,0.3);
            margin-right: 10rpx;

            &.active {
              color: #4ecdc4;
            }
          }
        }
      }

      .tips {
        .tip-item {
          margin-bottom: 20rpx;

          .tip-title {
            font-size: 28rpx;
            margin-right: 20rpx;
          }

          .tip-content {
            font-size: 28rpx;
            color: rgba(255,255,255,0.8);
          }

          &.good .tip-title {
            color: #4ecdc4;
          }

          &.bad .tip-title {
            color: #ff6b6b;
          }
        }
      }
    }
  }

  .action-buttons {
    position: fixed;
    bottom: 30rpx;
    left: 30rpx;
    right: 30rpx;
    display: flex;
    justify-content: space-between;

    button {
      width: 48%;
      padding: 20rpx 0;
      border-radius: 10rpx;
      font-size: 28rpx;
      
      &.consult-btn {
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        color: #fff;
        border: none;
      }
      
      &.share-btn {
        background: rgba(255,255,255,0.1);
        color: #fff;
        border: 1rpx solid rgba(255,255,255,0.2);
      }
    }
  }
}
</style>
