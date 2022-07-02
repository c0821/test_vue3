<template>
    <TicTacToe fontSize = 60 title="物联网1903陈彦茹"/>
    <img src="http://127.0.0.1:8800/user" />
</template>


<script  setup lang="ts">
import {defineComponent } from 'vue'
import  TicTacToe  from '@/components/TicTacToe.vue';

defineComponent({TicTacToe});

// export default class TicTacToeView extends Vue {}
</script>

<style scoped>
img{
    height: 300px;
}

</style>

