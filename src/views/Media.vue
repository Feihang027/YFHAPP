<template>

<div>


<h1>
自媒体管理
</h1>



<button
@click="addTest"
>
新增测试内容
</button>



<div
v-for="item in mediaStore.medias"
:key="item.id"
>


<h3>
{{item.title}}
</h3>


<p>
状态：{{item.status}}
</p>


</div>



</div>

</template>



<script setup lang="ts">


import {
    onMounted
} from "vue"


import {
    useMediaStore
} from "@/stores/mediaStore"



const mediaStore =
    useMediaStore()



onMounted(()=>{
    mediaStore.loadMedias()

})

function addTest(){


    mediaStore.createMedia({


        id:
        Date.now().toString(),


        title:
        "测试自媒体内容",


        platform:
        "Bilibili",


        contentType:
        "视频",


        status:
        "idea",


        views:0,


        likes:0,


        comments:0,


        createdAt:
        new Date().toISOString(),


        updatedAt:
        new Date().toISOString()


    })


}
</script>