<template>
  <div class="table-page">
    <i-table :list="list" :total="total" @handleSizeChange="handleSizeChange"
             @handleIndexChange="handleIndexChange" @handleSelectionChange="handleSelectionChange" :options="options"
             :columns="columns" :operates="operates">
    </i-table>
  </div>
</template>
<script>
  import iTable from '../../components/Table/Index'
  import BLL from './Index'

  export default {
    components: {iTable},
    data () {
      return {
        total: 0,
        list: [],
        date: '',
        phone: '',
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
            align: 'center',
            width: 180,
            formatter: (row, column, cellValue) => {
              return this.$utils.Common.dateFormat(row.createDate, 'YYYY年MM月DD日 hh:mm')
            }
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
              plain: true,
              disabled: true,
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
        page: 1,
        limit: 20,
        options: {
          stripe: true,
          loading: true,
          highlightCurrentRow: true,
          mutiSelect: true
        } // table 的参数
      }
    },
    created () {
      this.BLL = new BLL(this)
    },
    mounted () {
      this.BLL.getList()
    },
    methods: {
      // 切换每页显示的数量
      handleSizeChange (size) {
        this.limit = size
        this.BLL.getList()
      },
      // 切换页码
      handleIndexChange (index) {
        this.page = index
        console.log(' this.page:', this.page)
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
      },
      // 删除
      handleDel (index, row) {
        console.log(' index:', index)
        console.log(' row:', row)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "./Index";
</style>
