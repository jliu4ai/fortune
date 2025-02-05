<template>
  <view class="mbti-container">
    <!-- 测试进度 -->
    <view class="progress-bar">
      <view class="progress" :style="{ width: progress + '%' }"></view>
      <text class="progress-text">{{ currentQuestion + 1 }}/{{ questions.length }}</text>
    </view>

    <!-- 问题区域 -->
    <view class="question-area" v-if="!showResult">
      <view class="question">{{ questions[currentQuestion].question }}</view>
      <view class="options">
        <view 
          class="option" 
          v-for="(option, index) in questions[currentQuestion].options" 
          :key="index"
          @click="selectOption(index)"
        >
          {{ option }}
        </view>
      </view>
    </view>

    <!-- 结果展示 -->
    <view class="result-area" v-if="showResult">
      <view class="result-title">您的MBTI类型是：</view>
      <view class="result-type">{{ result.type }}</view>
      <view class="result-desc">{{ result.description }}</view>
      <view class="result-details">
        <view class="detail-item">
          <text class="label">能量方向：</text>
          <text class="value">{{ result.details.energy }}</text>
        </view>
        <view class="detail-item">
          <text class="label">信息接收：</text>
          <text class="value">{{ result.details.information }}</text>
        </view>
        <view class="detail-item">
          <text class="label">决策方式：</text>
          <text class="value">{{ result.details.decision }}</text>
        </view>
        <view class="detail-item">
          <text class="label">生活方式：</text>
          <text class="value">{{ result.details.lifestyle }}</text>
        </view>
      </view>
      <button class="share-btn" @click="shareResult">分享结果</button>
      <button class="restart-btn" @click="restartTest">重新测试</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentQuestion: 0,
      showResult: false,
      answers: [],
      questions: [
        {
          question: "在社交场合中，你通常会：",
          options: [
            "倾向于认识新朋友，享受社交",
            "更喜欢和熟悉的朋友待在一起"
          ]
        },
        {
          question: "当面对新事物时，你更倾向于：",
          options: [
            "关注具体的细节和实际的应用",
            "思考可能性和未来的发展"
          ]
        },
        {
          question: "做决定时，你通常会：",
          options: [
            "依据逻辑和客观分析",
            "考虑他人感受和价值观"
          ]
        },
        {
          question: "你更喜欢：",
          options: [
            "按计划行事，提前安排",
            "随机应变，保持灵活"
          ]
        }
        // 可以继续添加更多问题...
      ],
      result: {
        type: "",
        description: "",
        details: {
          energy: "",
          information: "",
          decision: "",
          lifestyle: ""
        }
      }
    }
  },
  computed: {
    progress() {
      return (this.currentQuestion / this.questions.length) * 100
    }
  },
  methods: {
    selectOption(index) {
      this.answers.push(index)
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++
      } else {
        this.calculateResult()
      }
    },
    calculateResult() {
      // 简化版的MBTI计算逻辑
      const result = {
        E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
      }
      
      // 根据答案计算各维度分数
      this.answers.forEach((answer, index) => {
        switch(index % 4) {
          case 0: // E/I
            answer === 0 ? result.E++ : result.I++
            break
          case 1: // S/N
            answer === 0 ? result.S++ : result.N++
            break
          case 2: // T/F
            answer === 0 ? result.T++ : result.F++
            break
          case 3: // J/P
            answer === 0 ? result.J++ : result.P++
            break
        }
      })
      
      // 生成类型
      this.result.type = `${result.E > result.I ? 'E' : 'I'}${result.S > result.N ? 'S' : 'N'}${result.T > result.F ? 'T' : 'F'}${result.J > result.P ? 'J' : 'P'}`
      
      // 设置描述
      this.setResultDescription()
      this.showResult = true
    },
    setResultDescription() {
      // 这里可以添加每种类型的详细描述
      const descriptions = {
        'INTJ': '建筑师 - 富有想象力和战略性的思考者',
        'INTP': '逻辑学家 - 善于创新的发明家',
        'ENTJ': '指挥官 - 大胆且富有想象力的领导者',
        'ENTP': '辩论家 - 聪明好奇的思想家',
        // ... 可以添加其他类型
      }
      
      this.result.description = descriptions[this.result.type] || '独特的性格类型'
      this.result.details = {
        energy: this.result.type[0] === 'E' ? '外向 - 从外部世界获取能量' : '内向 - 从内心世界获取能量',
        information: this.result.type[1] === 'S' ? '实感 - 关注现实和细节' : '直觉 - 关注可能性和创意',
        decision: this.result.type[2] === 'T' ? '思考 - 基于逻辑做决定' : '情感 - 基于价值观做决定',
        lifestyle: this.result.type[3] === 'J' ? '判断 - 喜欢计划和确定性' : '知觉 - 喜欢灵活和适应性'
      }
    },
    shareResult() {
      uni.showShareMenu({
        withShareTicket: true
      })
    },
    restartTest() {
      this.currentQuestion = 0
      this.answers = []
      this.showResult = false
      this.result = {
        type: "",
        description: "",
        details: {
          energy: "",
          information: "",
          decision: "",
          lifestyle: ""
        }
      }
    }
  }
}
</script>

<style lang="scss">
.mbti-container {
  padding: 30rpx;
  min-height: 100vh;
  background-color: #1a1a2e;
  color: #fff;

  .progress-bar {
    height: 10rpx;
    background: rgba(255,255,255,0.1);
    border-radius: 5rpx;
    margin-bottom: 40rpx;
    position: relative;
    
    .progress {
      height: 100%;
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      border-radius: 5rpx;
      transition: width 0.3s;
    }
    
    .progress-text {
      position: absolute;
      right: 0;
      top: 20rpx;
      font-size: 24rpx;
      color: rgba(255,255,255,0.6);
    }
  }

  .question-area {
    .question {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 60rpx;
      text-align: center;
    }

    .options {
      .option {
        background: rgba(255,255,255,0.1);
        padding: 40rpx;
        border-radius: 20rpx;
        margin-bottom: 30rpx;
        text-align: center;
        transition: all 0.3s;
        
        &:active {
          background: rgba(255,255,255,0.2);
          transform: scale(0.98);
        }
      }
    }
  }

  .result-area {
    text-align: center;
    
    .result-title {
      font-size: 32rpx;
      margin-bottom: 30rpx;
    }
    
    .result-type {
      font-size: 72rpx;
      font-weight: bold;
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      -webkit-background-clip: text;
      color: transparent;
      margin-bottom: 30rpx;
    }
    
    .result-desc {
      font-size: 28rpx;
      color: rgba(255,255,255,0.8);
      margin-bottom: 60rpx;
    }
    
    .result-details {
      background: rgba(255,255,255,0.1);
      padding: 30rpx;
      border-radius: 20rpx;
      margin-bottom: 60rpx;
      
      .detail-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20rpx;
        
        .label {
          color: rgba(255,255,255,0.6);
        }
        
        .value {
          color: #4ecdc4;
        }
      }
    }
    
    .share-btn, .restart-btn {
      width: 80%;
      margin: 20rpx auto;
      padding: 20rpx 0;
      border-radius: 10rpx;
      font-size: 28rpx;
    }
    
    .share-btn {
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      color: #fff;
      border: none;
    }
    
    .restart-btn {
      background: rgba(255,255,255,0.1);
      color: #fff;
      border: 1rpx solid rgba(255,255,255,0.2);
    }
  }
}
</style>
