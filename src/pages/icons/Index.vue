<template>
  <div class="icon-page">
    <el-row :gutter="20">
      <template v-for="(item, index) in icons">
        <el-col :key="index" :span="6" class="item">
          <span class="axon-icon" v-html="item.icon"></span>
          <p><span style="color: #606266;height: 1em;font-size: 12px;">{{item.icon}}</span></p>
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      icons: [{ name: '叉号', icon: '&#xe603;' },
        { name: '原型叉号', icon: '&#xe614;' },
        { name: '栏目', icon: '&#xe61f;' },
        { name: '箭头', icon: '&#xe608;' },
        { name: '隐藏密码', icon: '&#xe620;' },
        { name: '显示密码', icon: '&#xe60c;' },
        { name: '用户', icon: '&#xe604;' },
        { name: '用户', icon: '&#xe7e9;' },
        { name: '发货', icon: '&#xe63e;' },
        { name: '订单', icon: '&#xe72d;' },
        { name: '用户', icon: '&#xe6a3;' },
        { name: '金额', icon: '&#xe736;' },
        { name: '主页', icon: '&#xe63d;' },
        { name: '错误', icon: '&#xe625;' },
        { name: '错误', icon: '&#xe610;' },
        { name: '栏目', icon: '&#xe626;' },
        { name: '栏目', icon: '&#xe60a;' },
        { name: '验证码', icon: '&#xe61b;' },
        { name: '手机', icon: '&#xe60d;' }
      ]
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.icon-page {
  background-color: #fff;
  padding: 20px 40px;
  .item {
    text-align: center;
    height: 120px;
    .axon-icon {
      font-size: 24px;
      color: #606266;
      margin-bottom: 15px;
      display: block;
    }
  }
}
</style>
