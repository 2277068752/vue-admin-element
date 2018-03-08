<!--菜单页-->
<template>
  <div class="menus-page">
    <div slot="header" class="clearfix header">
    </div>
    <i-table :list="menusList" :otherHeight="otherHeight" :columns="columns" :operates="operates"></i-table>
  </div>
</template>

<script type="text/jsx">
import iTable from '../../components/iTable/Index'
import { mapState } from 'vuex'

export default {
  components: { iTable },
  data () {
    return {
      menusList: [],
      columns: [
        {
          prop: 'name',
          label: '名称',
          align: 'left',
          width: 200,
          className: 'first-level',
          formatter: function (row, column) {
            let marginLeft = parseInt(row.level) * 20
            if (row.icon) {
              let icon = `<span class="axon-icon" style="margin-right:4px;margin-left:${marginLeft}px;font-size:16px;">${row.icon}</span>`
              return `${icon}<span>${row.name}</span>`
            } else {
              return `<span style="margin-left:${marginLeft}px;">${row.name}</span>`
            }
          }
        }, {
          prop: 'link',
          label: '地址',
          align: 'center'
        }, {
          prop: 'level',
          label: '排序',
          align: 'center',
          width: 100
        }, {
          prop: 'state',
          label: '状态',
          align: 'center',
          width: 100,
          render: function (row, column) {
            return row.state === 1 ? <el-tag>启用</el-tag> : <el-tag type="info">禁用</el-tag>
          }
        }
      ],
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
            show: true,
            icon: 'el-icon-delete',
            plain: true,
            disabled: false,
            method: (index, row) => {
              this.handelDel(index, row)
            }
          }
        ]
      },
      otherHeight: 216
    }
  },
  mounted () {
    this.initMenus()
  },
  computed: {
    ...mapState([
      'menus'
    ]),
    loading () {
      return this.$store.getters.btnLoading.str && this.$store.getters.btnLoading.id
    }
  },
  methods: {
    initMenus () {
      if (this.menus && this.menus.sidebar.length > 0) {
        let level = 1
        this.formatMenusList(this.menus.sidebar, level)
      }
    },
    // 递归menus的各级菜单
    formatMenusList (list, level) {
      for (let i = 0; i < list.length; i++) {
        this.menusList.push({ ...list[i], level })
        if (list[i].children) {
          level++
          this.formatMenusList(list[i].children, level)
        }
      }
    },
    // 编辑菜单
    handleEdit (index, row) {
      console.log(row)
    },
    // 删除菜单
    handelDel (index, row) {
      console.log(row)
    },
    add () {
      console.log('into add()')
    },
    // 转换 string 方法名为 Function 对象
    callback (fn) {
      fn = `this.${fn}()`
      return eval(fn) // eslint-disable-line
      // this.__callback(fn, this)
    }
  }
}
</script>

<style lang="scss">
.menus-page {
  background-color: #fff;
  .header {
    padding: 10px 10px;
  }
}
</style>
