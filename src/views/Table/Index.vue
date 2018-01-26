<template>
  <div class="table-page">
    <!--region  表格操作-->
    <div class="action-container">
      <filter-collapse :title="collapseTitle" :filterData="filter" @handleFilter="filterData">
        <el-form :model="filter" ref="filter" :inline="true">
          <el-form-item prop="phone" label="联系方式" label-width="80px">
            <el-input v-model="filter.phone"></el-input>
          </el-form-item>
          <el-form-item prop="date" label="发布时间" label-width="100px">
            <el-date-picker type="date" placeholder="选择日期" v-model="filter.date" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="reLoad('filter')"><i class="el-icon-sort"></i> 刷新</el-button>
            <el-button type="primary" @click="download()"><i class="el-icon-download"></i> 下载Excel</el-button>
          </el-form-item>
        </el-form>
      </filter-collapse>
    </div>
    <!--endregion-->
    <!--region table 表格-->
    <i-table :list="list" :total="total" :otherHeight="otherHeight" @handleSizeChange="handleSizeChange"
             @handleIndexChange="handleIndexChange" @handleSelectionChange="handleSelectionChange" :options="options"
             :pagination="pagination"
             :columns="columns" :operates="operates" @handleFilter="handleFilter" @handelAction="handelAction">
    </i-table>
    <!--endregion-->
  </div>
</template>
<script>
  import iTable from '../../components/Table/Index'
  import FilterCollapse from '../../components/FilterCollapse/Index'
  import BLL from './Index'

  export default {
    components: {iTable, FilterCollapse},
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
            render: (h, params) => {
              return h('el-tag', {
                props: {type: params.row.state === 0 ? 'success' : params.row.state === 1 ? 'info' : 'danger'} // 组件的props
              }, params.row.state === 0 ? '上架' : params.row.state === 1 ? '下架' : '审核中')
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
          loading: false, // 是否添加表格loading加载动画
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
      reLoad (form) {
        this.$refs[form].resetFields()
        this.filter = {date: '', phone: ''}
        this.BLL.getList()
      },
      // 筛选数据
      filterData () {
        this.BLL.getList()
      },
      // 下载
      download () {
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['编号', '标题', '状态', '作者', '联系方式', '邮箱', '时间']
          const tFiled = ['id', 'title', 'state', 'author', 'phone', 'email', 'createDate']
          let data = this.formatJson(tFiled, this.list)
          excel.export_json_to_excel(tHeader, data, 'table-list')
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === '时间') {
            return this.$utils.Common.dateFormat(v[j], 'YYYY年MM月DD日 hh:mm')
          } else {
            return v[j]
          }
        }))
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "./Index";
</style>
