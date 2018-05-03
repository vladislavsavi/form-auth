<template>
    <form autocomplete="off" @submit.prevent>
        <div class="col text-center step-prev">
            <span v-on:click="changeMail"><<изменить email</span>
        </div>
        <div class="col text-center">
            <p>Чтобы продолжть мы должны удосовериться что вы не робот</p>
        </div>
        <div class="col text-center input-wraper">
            <h3 v-html="options.title"></h3>
            <some-inp :quantity="Array.apply(null, {length: 10})" @req="reqNumber" :inpClass="options.inp.class" type="phone" style="font-size: 28px">
            </some-inp>
            <transition name="error" mode="out-in">
                <p v-if="!err">Номер телефона * (Для Казахстана)</p>
                <span v-if="err" class="err">{{err}}</span>
            </transition>
        </div>
        <div class="col text-center">
            <button v-on:click="reqNumber($store.state.data.phone)" :class="options.btn.class">{{options.btn.title}}</button>
        </div>
        <div class="col" v-html="options.footer">
            <!--значение из footer-->
        </div>
    </form>
</template>

<script>
    import someInp from './someInut'
    export default {
        props:['options'],
        data(){
         return{
             err: false
         }
        },
        computed: {
            getMail () {
                return this.$store.state.data.email
            }
        },
        components:{
            someInp
        },
        methods:{
            reqNumber(phone) {
                let regex = /^\d+$/;
                if(regex.test(phone) && phone.length == 10){
                    this.$store.dispatch('resPhone',{
                        phone: phone
                    })
                }else {
                    this.err = 'проверте правильность набота телефона'
                }
            },
            changeMail(){
                this.$store.commit('setPage', 'email')
            }
        }
    }
</script>

<style>
.prev{
    cursor: pointer;
    }
.err{
    color: #ff4236;
}
.error-enter-active, .error-leave-active {
    transition: opacity .3s ease;
}
.error-enter, .error-leave-to {
    opacity: 0;
}
</style>
