<template>
    <form :class="options.class" autocomplete="off"  @submit.prevent>
        <div class="col text-center step-prev">
            <span v-on:click="changePhone">{{prevText}}</span>
        </div>
        <div class="col text-center">
            <p>Мы отпрвили код на номер <span>{{getPhone}}</span></p>
        </div>
        <div class="col text-center input-wraper">
            <h3>{{options.title}}</h3>
            <div class="rowInp">
                <some-inp :quantity="Array.apply(null, {length: 4})" @req="reqNumber" :inpClass="options.inp.class"></some-inp>
            </div>
        </div>
        <div class="col text-center">
            <button :class="options.btn.class">{{options.btn.title}}</button>
        </div>
        <div class="col">
            <p class="termsOfUse">
                <font-awesome-icon :icon="icon" size="lg" fixed-width color="#f95704"/>
                *Если вам не пришло СМС с кодом:
                <a v-on:click="changePhone">изменить номер</a> или
                <a>отправить СМС повторно</a>
            </p>
        </div>
    </form>
</template>

<script>
    import someInp from './someInut'
    export default {
        props:['options'],
        data(){
            return{
                pin:'',
                store: this.$store,
            }
        },
        methods:{
            changePhone(){
                if(!this.$store.state.data.forgotPass){
                    this.$store.commit('setPhone', '')
                    this.$store.commit('setPage', 'phone')
                }
                else
                    this.$store.commit('setPage', 'chooseEntrance')
            },
            reqNumber(code){
                this.$store.dispatch('resCode',{
                    code: code
                })
            }
        },
        computed: {
            prevText(){
              return this.$store.state.data.forgotPass ? '<<Выбрыть другой способ входа' : '<<изменить телефон'
            },
            getMail () {
                return this.$store.state.data.email
            },
            getPhone () {
                return this.$store.getters.getPhoneForModule
            }
        },
        components:{
            someInp
        }
    }
</script>

<style scoped>

</style>