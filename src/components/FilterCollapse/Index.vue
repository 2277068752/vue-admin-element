<template>
  <div class="filter-collapse">
    <el-collapse class="table-action">
      <el-collapse-item name="1">
        <template slot="title">
          {{ title }}
          <div class="filter-items">
            <template v-for="(item, index) in filterList">
              <el-tag v-if="item[1]"> {{ item[1] }}</el-tag>
            </template>
          </div>
        </template>
        <slot></slot>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '数据筛选：'
    },
    filterData: {
      type: Object,
      default: {}
    } // 筛选条件
  },
  components: {},
  data () {
    return {
      filter: {},
      filterList: []
    }
  },
  beforeUpdate () {
    this.filter = this.filterData
    this.formatFilterList()
  },
  computed: {},
  watch: {
    filter (val) {
      console.log('val:' + val)
      this.formatFilterList()
    }
  },
  mounted () {
  },
  methods: {
    // 整理筛选数据
    formatFilterList () {
      this.filterList = Object.entries(this.filter)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-collapse {
  background-color: #fff;
  position: relative;
  padding: 0 12px;
  .filter-btn {
    position: absolute;
    right: 40px;
    top: 10px;
  }
  .filter-items {
    margin-left: 12px;
    display: inline-block;
    .el-tag {
      margin-right: 12px;
    }
  }
}
</style>
