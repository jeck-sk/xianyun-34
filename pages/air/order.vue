<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                 <orderForm :data='infoData' @setJiner='setJiner'/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <OrderAside :data='infoData' :Jiner='Jiner'/>           
            </div>
        </el-row>
    </div>
</template>

<script>
import orderForm from '@/components/air/orderForm.vue';
import OrderAside from '@/components/air/orderAside.vue';
export default {
    components:{
       orderForm,
       OrderAside
    },
    data(){
        return{
          infoData:{
            insurances: [],
            seat_infos:{}
          },
          Jiner:0
        }
    },
    methods:{
        setJiner(price){
             this.Jiner=price
        }
    },
    mounted(){
         const {id,seat_xid} = this.$route.query;

        this.$axios({
            url: `airs/`+id,
            params: {
                seat_xid:seat_xid 
            }
        }).then(res => {
            this.infoData = res.data;
            console.log(this.infoData)
        })
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>