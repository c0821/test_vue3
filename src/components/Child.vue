<template>
    <button @click = "childFun">button</Button>
</template>

<script setup lang="ts">
import {defineEmits} from 'vue'

//子组件定义事件
const emit = defineEmits(['fRead', 'pending'])
const childFun=(()=>{
    //子组件发送这个事件
    emit('fRead',"click");
})
</script>