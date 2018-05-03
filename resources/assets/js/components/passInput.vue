<template>
    <form  @submit.prevent="validateBeforeSubmit">
        <div class="form-row">
            <div class="col text-center">
                <span v-if="this.$store.state.data.forgotPass" v-on:click="otherEntrance" class="step-prev">
                    <<Выбрыть другой способ входа
                </span>
                <p class="warningMessage" v-if="!this.$store.state.data.forgotPass">
                    <!--icon-->
                    <span>
                        {{getMail.email}}
                    </span>
                    уже используется на нашем сайте Авторизуйтесь, если это ваш Email или
                    <a v-on:click="changeMail">Зарегистрируйте другой</a>
                </p>
            </div>
            <div class="col  text-center">
                <h3 v-html="options.title"></h3>
            </div>
            <div class="col text-center input-wraper">
                <input id="exampleInputPassword1" :class='options.inp.class' type="password" name="пароль" v-model="password">
                <small id="emailHelp" class="form-text text-muted">Укажите ваш пароль</small>
            </div>
            <div class="col text-center">
                <button type="submit" :class="options.btn.class">{{ options.btn.title }}</button>
            </div>
        </div>
        <div v-if="!this.$store.state.data.forgotPass" class="termsOfUse">
            <p>Забыли пароль? <a v-on:click="reestablish" href="#">Востановить пароль</a></p>
        </div>
    </form>
</template>

<script>
    export default {
        props:['options'],
        data(){
            return{
                password:'',
            }
        },
        computed: {
            getMail () {
                return this.$store.state.data
            }
        },
        methods:{
            validateBeforeSubmit() {
               if(this.password.length > 5){
                   this.$store.dispatch('resPass', {
                       pass: this.password
                   })
               }
            },
            otherEntrance(){
                this.$store.commit('setPage', 'chooseEntrance')
            },
            changeMail(){
                this.$store.commit('setPage', 'email')
            },
            reestablish(){
                this.$store.commit('setPage', 'chooseEntrance')
                this.$store.commit('setMode', true)
            }
        },
        mounted(){
            document.getElementById('exampleInputPassword1').focus()
        }
    }
</script>
