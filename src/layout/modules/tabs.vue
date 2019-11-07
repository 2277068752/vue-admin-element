<!--
* @Author : ChangJun
* @Date :  2019/10/24
* @Version : 1.0
* @Content : 顶部多菜单栏
-->
<template>
  <div class="layout-tabs-page">
    <div class="tabs-main">
      <div class="tabs-nav-scroll">
        <div class="tabs-nav">
          <template v-for="(t, i) in tabs">
            <div :key="i" :class="t.path === currPath ? 'tab-item active' : 'tab-item'" @click="handleTabTab(t)">
              <span class="title">{{ t.name }}</span>
              <span class="close el-icon-close" @click.stop="handleCloseCurrTab(t, i)"></span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';
import Menu from '@/model/global/Menu';
import {Route} from 'vue-router';

@Component({})
export default class TheTabs extends Vue {
  @Getter('tabs') public tabs!: Menu[];
  @Getter('index') public index!: Menu;
  @Getter('menus') private menus!: Menu[];
  @Action('delTab') public delTab: any;
  @Action('addTab') public addTab: any;

  get currPath (): string {
    return this.$route.path;
  }

  @Watch('$route', {deep: true, immediate: true})
  onRouteChange (to: any) {
    this.handleAddTagByRoute(to);
  }

  /**
   * 点击tab跳转route
   * @param tab
   */
  private handleTabTab (tab: Menu): void {
    this.$router.push({path: tab.path});
  }

  /**
   * 关闭当前tab
   * @param tab
   * @param index
   */
  private handleCloseCurrTab (tab: Menu, index: number): void {
    if (this.currPath === this.index.path && index === 0) {
      return;
    }
    // 判断关闭的是否为当前路由
    if (tab.path === this.currPath) {
      let pre = this.tabs[index - 1];
      if (!pre) {
        pre = this.index;
        this.addTab(pre);
      }
      // 自动启用上一个tab
      this.$router.push({path: pre.path});
    }
    this.delTab(tab);
  }

  /**
   * 根据路由变化，同步当前多标签
   * @param to
   */
  private handleAddTagByRoute (to: Menu) {
    this.$nextTick(() => {
      this.addTab(to);
    });
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/app/theme";

.layout-tabs-page {
  .tabs-main {
    padding: 6px 0;

    .tabs-nav-scroll {
      overflow: hidden;
      white-space: nowrap;
      padding: 0 12px;

      .tabs-nav {
        padding-left: 0;
        margin: 0;
        float: left;
        list-style: none;
        box-sizing: border-box;
        position: relative;
        transition: transform .5s ease-in-out;

        &::before {
          display: table;
          content: " ";
        }

        .tab-item {
          height: 32px;
          background: #fff;
          border-radius: 3px;
          border: none;
          margin-right: 6px;
          color: #808695;
          padding: 5px 16px 4px;
          transition: all .3s ease-in-out;
          display: inline-block;
          box-sizing: border-box;
          cursor: pointer;
          text-decoration: none;
          position: relative;

          &.active {
            .title {
              color: @main-color;
            }
          }

          .title {
            font-size: 14px;
          }

          .close {
            width: 22px;
            text-align: right;
            transform: translateZ(0);
            margin-right: -6px;
            color: #999;
            font-size: 14px;
            vertical-align: middle;
            overflow: hidden;
            position: relative;
            top: -1px;
            transform-origin: 100% 50%;
          }
        }
      }
    }
  }
}
</style>
