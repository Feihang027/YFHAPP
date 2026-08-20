<template>


<div>


<h1>
饮食计划
</h1>

<button
@click="addTestDiet"
>
新增饮食记录
</button>

<h2>
饮食记录
</h2>

<div v-for="item in dietStore.diets" :key="item.id">


<h3>

{{item.meal}}

</h3>


<p>
食物：{{item.food}}
</p>


<p>
热量：{{item.calories}} kcal
</p>


<p>
蛋白质：{{item.protein}} g
</p>


<hr>


</div>



</div>


</template>


<script setup lang="ts">


import {
onMounted
} from "vue"


import {
useDietStore
} from "@/stores/dietStore"



const dietStore =
useDietStore()



onMounted(()=>{


    dietStore.loadDiet()


})

async function addTestDiet(){

await dietStore.createDiet({


id:
Date.now().toString(),

date:
new Date().toISOString(),

meal:
"午餐",

food:
"鸡胸肉+米饭",

calories:
600,

protein:
40,

carbs:
70,

fat:
15,

createdAt:
new Date().toISOString(),



updatedAt:
new Date().toISOString()

})

await dietStore.loadDiet()

}
</script>