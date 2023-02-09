<template>
    <div>
       <div @click="handleClick">
        点我 点我 点我
       </div> 
    </div>
</template>

<script setup lang="ts">
import {} from "vue"
import axios from "axios"

function handleClick(){
    axios.post('http://localhost:3000/api/user/register').then(res =>{
        console.log(res,'res');
        
    })
}
</script>

<style lang="scss" scoped>

</style>
