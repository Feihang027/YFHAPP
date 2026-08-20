<template>


<div>


<h1>
开发工作
</h1>



<button
@click="addTest"
>
新增项目
</button>



<div
v-for="item in store.projects"
:key="item.id"
>


<h3>
{{item.name}}
</h3>


<p>
{{item.status}}
</p>


</div>



</div>


</template>



<script setup lang="ts">


import {
onMounted
}
from "vue"


import {
useDevelopmentStore
}
from "@/stores/developmentStore"



const store =
useDevelopmentStore()



onMounted(()=>{


store.loadProjects()


})



function addTest(){


store.createProject({

id:
Date.now().toString(),


name:
"YFHAPP开发",


description:
"Personal OS项目",


status:
"developing",


milestones:[],


logs:[],


nextAction:
"继续开发",


createdAt:
new Date().toISOString(),


updatedAt:
new Date().toISOString()


})


}



</script>