<template>
  <div class="container">
    common-a里面的vuex里面的数据：{{ $store.state.count }}
    <hr/>
    common-a里面的vuex里面的数据：{{ count }}
    <hr/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['count'])
  }
}
</script>

<style></style>
