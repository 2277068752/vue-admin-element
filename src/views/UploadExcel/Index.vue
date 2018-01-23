<!--region excel 文件上传-->
<template>
  <div class="upload-excel-page">
    <upload-excel @on-selected-file='selected'></upload-excel>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for='item of tableHeader' align="center" :prop="item" :label="item" :key='item'>
      </el-table-column>
    </el-table>
  </div>
</template>
<!--endregion-->
<script>
  import UploadExcel from '../../components/Upload/UploadExcel'

  export default {
    components: {UploadExcel},
    data () {
      return {
        tableData: [],
        tableHeader: []
      }
    },
    mounted () {},
    methods: {
      selected (data) {
        this.tableData = data.results
        this.tableHeader = data.header
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .upload-excel-page {
  }
</style>
