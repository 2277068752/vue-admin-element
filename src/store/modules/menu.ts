/**
 * @Author : ChangJun
 * @Date : 2019-10-22
 * @Version : 1.0
 * @Content :
 */

import Menu from '@/model/global/Menu';
import {Vue} from 'vue-property-decorator';
import {returnStatement} from '@babel/types';

const MutationType = {
  setCollapse: 'SET_COLLAPSE',
  setTab: 'SET_TAB',
  setMenus: 'SET_MENUS',
  emptyMenus: 'EMPTY_MENUS',
  emptyTab: 'EMPTY_TABS'

};
const state = {
  collapse: false,
  tabs: [],
  menus: [],
  index: {name: '首页', path: '/home'} // 默认首页
};
const getters = {
  collapse: (state: any) => {
    return state.collapse;
  },
  tabs: (state: any) => {
    return state.tabs;
  },
  index: (state: any) => {
    return state.index;
  },
  menus: (state: any) => {
    return state.menus;
  }
};
const mutations = {
  [MutationType.setCollapse] (state: any, val: boolean) {
    state.collapse = val || false;
  },
  [MutationType.setTab] (state: any, val: Menu) {
    state.tabs = val;
  },
  [MutationType.setMenus] (state: any, val: Menu[]) {
    state.menus = val;
  },
  [MutationType.emptyMenus] (state: any) {
    state.menus = [];
  }
};
const actions = {
  // 权限缓存
  async setMenus (props: any, menus: Menu[]) {
    // 首先要清空当前菜单
    await props.commit(MutationType.emptyMenus);
    props.commit(MutationType.setMenus, menus);
  },
  // 菜单栏的显示隐藏
  setCollapse (props: any) {
    const val = !props.state.collapse;
    props.commit(MutationType.setCollapse, val);
  },
  // 追加Tab标签
  addTab (props: any, val: Menu) {
    const preTab: Menu[] = props.state.tabs;
    if (preTab.length === 0) {
      Vue.set(preTab, 0, props.state.index);
    }
    const index = preTab.findIndex((item: Menu) => item.path === val.path);
    if (index < 0) {
      // @ts-ignore
      Vue.set(preTab, preTab.length, val);
      props.commit(MutationType.setTab, preTab);
    }
  },
  // 关闭某个标签
  delTab (props: any, val: Menu) {
    const preTab: Menu[] = props.state.tabs;
    try {
      // 返回当前 tab 集合的键值对，按照索引删除
      for (const [index, tab] of preTab.entries()) {
        // @ts-ignore
        if (tab.path === val.path) {
          // @ts-ignore
          Vue.delete(preTab, index);
          // preTab.splice(index, 1);
          props.commit(MutationType.setTab, preTab);
        }
      }
    } catch (e) {
      window.$globalHub.$message.warning('当前tab关闭失败!');
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
