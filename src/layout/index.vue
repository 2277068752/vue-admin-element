<!--
* @Author : ChangJun
* @Date :  2019-10-19
* @Version : 1.0
* @Content : 页面主框架
-->
<template>
  <div class="layout-wrapper">
    <the-menu></the-menu>
    <div class="layout-inside">
      <the-header></the-header>
      <the-tab></the-tab>
      <div class="inside-content">
        <the-main></the-main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import TheHeader from './modules/header.vue';
import TheTab from './modules/tabs.vue';
import TheMenu from './modules/menus/index.vue';
import TheMain from './modules/main.vue';

@Component({
  components: {
    TheHeader, TheTab, TheMenu, TheMain
  }
})
export default class LayoutPage extends Vue {
}
</script>

<style lang="less" scoped>
.layout-wrapper {
  width: 100%;
  min-height: 100%;
  height: 100%;
  display: flex;
  flex: auto;
  flex-direction: row;
  background-color: #f7f7f7;

  .layout-inside {
    flex: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;

    .inside-content {
      overflow: hidden;
      padding: 0 12px 12px 12px;
      box-sizing: border-box;
      height: calc(~"100% - 64px");
    }
  }

}
</style>
