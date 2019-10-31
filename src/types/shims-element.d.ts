import Vue from 'vue';

declare module 'vue/types/vue' {

  interface Vue {
    // @ts-ignore
    $message: any;
  }
}
