<!--region 封装的分页 table-->
<template>
  <div class="table">
    <el-table id="iTable" v-loading.iTable="options.loading" :data="list" :max-height="height" :stripe="options.stripe" ref="mutipleTable"
              @selection-change="handleSelectionChange">
      <!--region 选择框-->
      <el-table-column v-if="options.mutiSelect" type="selection" style="width: 55px;">
      </el-table-column>
      <!--endregion-->
      <!--region 数据列-->
      <template v-for="(column, index) in columns">
        <el-table-column :prop="column.prop"
                         :label="column.label"
                         :align="column.align"
                         :width="column.width">
          <template slot-scope="scope">
            <template v-if="column.formatter">
              <span v-html="column.formatter(scope.row, column)"></span>
            </template>
            <template v-else>
              <span>{{scope.row[column.prop]}}</span>
            </template>
          </template>
        </el-table-column>
      </template>
      <!--endregion-->
      <!--region 按钮操作组-->
      <el-table-column label="操作" align="center" :width="operates.width" :fixed="operates.fixed"
                       v-if="operates.list.filter(_x=>_x.show === true).length > 0">
        <template slot-scope="scope">
          <div class="operate-group">
            <template v-for="(btn, key) in operates.list">
              <div class="item" v-if="btn.show">
                <el-button :type="btn.type" size="mini" :icon="btn.icon" :disabled="btn.disabled"
                           :plain="btn.plain" @click.native.prevent="btn.method(key,scope.row)">{{ btn.label }}
                </el-button>
              </div>
            </template>
          </div>
        </template>
      </el-table-column>
      <!--endregion-->
    </el-table>
    <div style="height:12px"></div>
    <!--region 分页-->
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleIndexChange"
                   :page-size="pageSize"
                   :page-sizes="[10, 20, 50]" :current-page="pageIndex" layout="total,sizes, prev, pager, next,jumper"
                   :total="total"></el-pagination>
    <!--endregion-->
  </div>
</template>
<!--endregion-->
<script>
  export default {
    props: {
      list: {
        type: Array,
        default: []
      }, // 数据列表
      columns: {
        type: Array,
        default: []
      }, // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
      operates: {
        type: Array,
        default: []
      }, // 操作按钮组 === label: 文本，type :类型（primary / success / warning / danger / info / text），show：是否显示，icon：按钮图标，plain：是否朴素按钮，disabled：是否禁用，method：回调方法
      total: {
        type: Number,
        default: 0
      }, // 总数
      pageSize: {
        type: Number,
        default: 20
      }, // 每页显示的数量
      otherHeight: {
        type: Number,
        default: 160
      }, // 用来计算表格的高度
      options: {
        type: Object,
        default: {
          stripe: false, // 是否为斑马纹 table
          highlightCurrentRow: false // 是否要高亮当前行
        }
      } // table 表格的控制参数
    },
    components: {},
    data () {
      return {
        pageIndex: 1,
        multipleSelection: [] // 多行选中
      }
    },
    mounted () {},
    computed: {
      height () {
        return this.$utils.Common.getWidthHeight().height - this.otherHeight
      }
    },
    methods: {
      // 切换每页显示的数量
      handleSizeChange (size) {
        this.$emit('handleSizeChange', size)
        this.pageIndex = 1
      },
      // 切换页码
      handleIndexChange (index) {
        this.$emit('handleIndexChange', index)
        this.pageIndex = index
      },
      // 多行选中
      handleSelectionChange (val) {
        this.multipleSelection = val
        this.$emit('handleSelectionChange', val)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../assets/styles/mixins";

  .table {
    height: 100%;
    .el-pagination {
      float: right;
      margin: 20px;
    }
    .el-table__header-wrapper {
      thead {
        tr {
          th {
            color: #333333;
          }
        }
      }
    }
    .el-table-column--selection .cell {
      padding: 0;
      text-align: center;
    }
    .el-table__fixed-right {
      bottom: 0 !important;
      right: 6px !important;
      z-index: 1004;
    }
    .operate-group {
      display: flex;
      flex-wrap: wrap;
      .item {
        margin-top: 4px;
        margin-bottom: 4px;
        display: block;
        flex: 0 0 50%;
      }
    }
  }
</style>
