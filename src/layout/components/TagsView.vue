<template>
  <!--region tab导航切换页-->
  <div class="tag-bar">
    <div class="tags-view-wrapper">
      <template v-for="(item, index) in tagBar">
        <div :key="index" :class="tagActive(item) ? 'tag-item active' : 'tag-item'"
             @click.right="rightMenus($event, item)">
          <span v-show="tagActive(item)" class="el-icon-location"></span>
          <router-link :to="item.path">{{item.name}}</router-link>
          <span class="el-icon-close tag-close" @click.prevent.stop="closeThisTag(item, index)"></span>
        </div>
      </template>
      <!--region 右键菜单栏-->
      <ul v-show="rightMenuShow" class="context-menu" ref="contextMenu">
        <li class="item" @click="closeThisTagOfRightMenu()">
          <span>关闭当前</span>
        </li>
        <li class="item" @click="closeOtherTag()">
          <span>关闭其他</span>
        </li>
        <li class="item" @click="closeAllTags()">
          <span>关闭所有</span>
        </li>
      </ul>
      <!--endregion-->
    </div>
  </div>
  <!--endregion-->
</template>
<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data () {
    return {
      rightMenuShow: false,
      currentTag: {} // 当前标签
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({ tagBar: ({ tags }) => tags.tagbar })
  },
  watch: {
    // 监听鼠标左击事件，点击机关闭右键菜单
    rightMenuShow (val) {
      let _this = this
      if (val) {
        window.addEventListener('click', function () {
          _this.closeRightMenu(event)
        })
      } else {
        window.removeEventListener('click', function () {
          _this.closeRightMenu()
        })
      }
    }
  },
  methods: {
    // tag 标签点击
    tagActive (tag) {
      if (this.$route.path === tag.path) {
        return true
      }
      return false
    },
    // 关闭当前 tag 标签
    closeThisTag (tag, index) {
      // 判断关闭的是否为当前激活的tag标签
      if (this.tagActive(tag)) {
        let preTag = this.tagBar[index - 1]
        // 启用前一个标签
        if (preTag) {
          this.$router.push({ path: preTag.path })
        } else {
          this.$router.push({ path: '/dashboard' })
        }
      }
      this.$store.dispatch('del_tagbar_item', tag)
    },
    // 关闭其他标签
    closeOtherTag () {
      this.confirm('你真的要关闭其他的标签么？只保留这一个？', '关闭其他', '取消', 'warning', () => {
        this.$store.dispatch('del_other_tags', this.currentTag).then(res => {
          this.$router.push({ path: res.path })
        })
      })
    },
    // 关闭所有标签
    closeAllTags () {
      this.confirm('打开这么多的标签，确认都不需要了？', '关闭所有', '取消', 'warning', () => {
        this.$store.dispatch('del_all_tags').then(res => {
          this.$router.push({ path: res.path })
        })
      })
    },
    // 鼠标右键的关闭当前标签
    closeThisTagOfRightMenu () {
      let _index = this.tagBar.indexOf(this.currentTag)
      this.closeThisTag(this.currentTag, _index)
    },
    // 鼠标右击事件
    rightMenus (e, tag) {
      this.currentTag = tag
      this.disabledRightBtn(e)
      // 启用自定义的右键菜单
      this.rightMenuShow = true
      this.$refs.contextMenu.style.top = e.layerY + 'px'
      this.$refs.contextMenu.style.left = e.layerX + 'px'
    },
    // 禁用鼠标右键
    disabledRightBtn (e) {
      if (!e) {
        e = window.event
      }
      if (e.button === 2) {
        e.returnValue = false
      }
    },
    // 关闭右键菜单
    closeRightMenu (e) {
      // 当用户不是右击触发的时候，直接关闭当前右键菜单
      if (e && e.button !== 2) {
        this.rightMenuShow = false
      }
    },
    // confirm 弹窗
    confirm (text, btnText1, btnText2, type, callback) {
      this.$confirm(text, '提示', {
        confirmButtonText: btnText1,
        cancelButtonText: btnText2,
        type: type
      }).then(() => {
        if (typeof callback === 'function') {
          callback()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/font";

.tag-bar {
  $height: 26px;
  position: fixed;
  top: 50px;
  width: 100%;
  z-index: 100;
  .tags-view-wrapper {
    background: #fff;
    height: 34px;
    line-height: 34px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .tag-item {
      display: inline-block;
      border: 1px solid #d8dce5;
      height: $height;
      line-height: $height;
      padding: 0 12px;
      margin-left: 12px;
      border-radius: 2px;
      color: #495060;
      font-size: $font-size-s;
      a {
        padding-right: 12px;
      }
      .tag-close {
        cursor: pointer;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s;
        transform-origin: 100% 50%;
        vertical-align: 0;
        line-height: 16px;
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
      &.active {
        background-color: #42b983;
        border-color: #42b983;
        color: #fff;
      }
    }
    ul.context-menu {
      position: absolute;
      list-style-type: none;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
      margin: 0;
      padding: 7px 0;
      z-index: 10002;
      background-color: #fff;
      border-radius: 4px;
      .item {
        $right-menu-item-height: 30px;
        list-style: none;
        height: $right-menu-item-height;
        padding: 0 20px;
        line-height: $right-menu-item-height;
        &:hover {
          background-color: #eee;
          color: #333;
        }
      }
    }
  }
}
</style>
