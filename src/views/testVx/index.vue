<template>
  <div class="testVx">
       vuex的state中的数据{{$store.state.count}}
    <common-a></common-a>
    <button @click="fn">赋值</button>
    <button @click="fn_increment">自增</button>
  </div>
</template>

<script>
import CommonA from '@/components/common-a'
export default {
  name: 'TextVx',
  components: { CommonA },
  methods: {
    fn () {
      this.$store.commit('giveNum', { num: 20 })
    },
    fn_increment () {
      this.$store.commit('increment')
    }
  }
}
</script>

<style>

</style>
