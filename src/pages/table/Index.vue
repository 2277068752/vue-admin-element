<template>
  <div class="table-page">
    <!--region table 表格-->
    <i-table :list="list" :total="total" :loading="loading" :otherHeight="otherHeight"
             @handleSizeChange="handleSizeChange"
             @handleIndexChange="handleIndexChange" @handleSelectionChange="handleSelectionChange" :options="options"
             :pagination="pagination" :columns="columns" :operates="operates">
    </i-table>
    <!--endregion-->
  </div>
</template>
<script type="text/jsx">
import iTable from '../../components/iTable/Index'
import BLL from './Index'
import { mapGetters } from 'vuex'

export default {
  components: { iTable },
  data () {
    return {
      total: 0,
      list: [],
      otherHeight: 208,
      filter: {
        date: '',
        phone: ''
      },
      collapseTitle: '筛选条件：',
      columns: [
        {
          prop: 'id',
          label: '编号',
          align: 'center',
          width: 60
        },
        {
          prop: 'title',
          label: '标题',
          align: 'center',
          width: 400,
          formatter: (row, column, cellValue) => {
            return `<span style="white-space: nowrap;color: dodgerblue;">${row.title}</span>`
          }
        },
        {
          prop: 'state',
          label: '状态',
          align: 'center',
          width: '160',
          render: (row, column) => {
            return row.state === 0 ? <el-tag type='success'> 上架 </el-tag> : row.state === 1
              ? <el-tag type="info">下架</el-tag> : <el-tag type='danger'>审核中</el-tag>
          }
        }, {
          prop: 'author',
          label: '作者',
          align: 'center',
          width: 120
        },
        {
          prop: 'phone',
          label: '联系方式',
          align: 'center',
          width: 160
        },
        {
          prop: 'email',
          label: '邮箱',
          align: 'center',
          width: 240
        },
        {
          prop: 'createDate',
          label: '发布时间',
          align: 'center'
        }
      ], // 需要展示的列
      operates: {
        width: 200,
        fixed: 'right',
        list: [
          {
            label: '编辑',
            type: 'warning',
            show: true,
            icon: 'el-icon-edit',
            plain: false,
            disabled: false,
            method: (index, row) => {
              this.handleEdit(index, row)
            }
          },
          {
            label: '删除',
            type: 'danger',
            icon: 'el-icon-delete',
            show: true,
            plain: false,
            disabled: false,
            method: (index, row) => {
              this.handleDel(index, row)
            }
          }
        ]
      }, // 操作按钮组
      pagination: {
        pageIndex: 1,
        pageSize: 20
      }, // 分页参数
      options: {
        stripe: true, // 是否为斑马纹 table
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: true // 是否支持列表项选中功能
      } // table 的参数
    }
  },
  created () {
    this.BLL = new BLL(this)
  },
  mounted () {
    this.BLL.getList()
  },
  computed: {
    ...mapGetters(['button']),
    loading () {
      return this.$store.getters.btnLoading.str && this.$store.getters.btnLoading.id
    }
  },
  methods: {
    // 切换每页显示的数量
    handleSizeChange (pagination) {
      this.pagination = pagination
      this.BLL.getList()
    },
    // 切换页码
    handleIndexChange (pagination) {
      this.pagination = pagination
      this.BLL.getList()
    },
    // 选中行
    handleSelectionChange (val) {
      console.log('val:', val)
    },
    // 编辑
    handleEdit (index, row) {
      console.log(' index:', index)
      console.log(' row:', row)
      this.BLL.getList()
    },
    // 删除
    handleDel (index, row) {
      console.log(' index:', index)
      console.log(' row:', row)
    },
    // 刷新
    reload (form) {
      console.log('into reload')
      this.$refs['filter'].resetFields()
      this.filter = { date: '', phone: '' }
      this.BLL.getList()
    },
    // 筛选数据
    filterData () {
      this.BLL.getList()
    }
  }
}
</script>

<style lang="scss">
@import "./Index";
</style>
