<template>
    <div style="display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;">
        <div class="massage">
        <form @submit.prevent="validateBeforeSubmit">
            <div style="display: flex;
            flex-direction: row;
             justify-content: start;
            align-items: start;">
                <template v-if="page == 0">
                    <div class="newForm">
                        <div class="inpContainer">
                            <input name="Имя" v-validate="'required|alpha'" data-vv-delay="500" :class="{'is-danger': errors.has('email') }" type="text" v-model="name" placeholder="Имя">
                            <span v-show="errors.has('Имя')" class="errorMessage">{{ errors.first('Имя') }}</span>
                        </div>

                        <div class="inpContainer">
                            <input v-validate="'required|email'" type="text" data-vv-as="email"  name="email" :class="{'is-danger': errors.has('email') }" placeholder="Email" v-model="email">
                            <span v-show="errors.has('email')" class="errorMessage">{{ errors.first('email') }}</span>
                        </div>


                        <div class="inpContainer">
                            <TheMask :mask="'+(###) ###-##-##'" placeholder="Телефон" :class="{'is-danger': errors.has('email') }" name="телефон" v-validate="'required|min:10'" data-vv-as="телефон" v-model="phoneNumber"/>
                            <span v-show="errors.has('телефон')" class="errorMessage">{{ errors.first('телефон') }}</span>
                        </div>
                    </div>
                </template>

                <template v-if="page == 1">
                    <div class="massageForm">
                        <textarea cols="30" rows="10" placeholder="Введите ваш вопрос" v-validate="'required|min:5'" data-vv-as="ТЕКСТ СООБЩЕНИЯ" name="ТЕКСТ СООБЩЕНИЯ" @keyup="inputMassage()" v-model="text" maxlength="500" class="massageText"></textarea>
                        <span class="lost">{{lost}}</span>
                        <span v-show="errors.has('ТЕКСТ СООБЩЕНИЯ')" class="errorMessage">{{ errors.first('ТЕКСТ СООБЩЕНИЯ') }}</span>
                    </div>
                </template>
            </div>

            <div class="btnContainer">
                <button  class="btn btn-secondary">{{textBttn}}</button>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
    import {TheMask} from 'vue-the-mask'
    import VeeValidate, { Validator } from 'vee-validate';
    import messagesRU from 'vee-validate/dist/locale/ru.js';
    Vue.use(VeeValidate);
    Validator.localize('ru', messagesRU);
    export default {
        data(){
            return {
                name: '',
                phoneNumber: '',
                email: '',
                text: '',
                textBttn: 'Далее',
                page : '0',
                correct: false,
                lost: 500
            }
        },
        methods:{
            further: function(){
                if(this.page !=1){
                    this.page ++
                    this.textBttn = 'Отправить вопрос'
                }
            },
            inputMassage: function () {
                let area = event.target;
                let max = area.getAttribute('maxlength');
                this.lost = max - area.value.length;
            },
            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.correct = true;
                        this.further();
                        return;
                    }else
                        this.correct = false;
                });
            }
        },
        mounted(){
            console.log('Component "message" is mounted"')
        }
    }
</script>

<style scoped>
    /*.fade-enter-active {*/
        /*transition: all .5s ease;*/
    /*}*/
    /*.fade-leave-active {*/
        /*transition: all .5s ease;*/
    /*}*/
    /*.fade-enter{*/
        /*display: block !important;*/
    /*}*/
    /*.fade-enter-to{*/
        /*display: none;*/
    /*}*/
    /*.fade-enter, .slide-fade-leave-to {*/
        /*transform: translateX(100%);*/
        /*opacity: 0;*/
    /*}*/
    .massage {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: start;
        color: #2e3436;
        overflow: hidden;
    }

    .massage input{
        min-width: 300px;
    }

    .massage textarea{
        min-width: 300px;
        min-height: 180px;
        max-width: 523px;
        max-height: 233px
    }
    .newForm {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }

    .massageForm{
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        min-height: 280px;
    }

    .massageForm .lost{
        background-color: #fff;
        width: 30px;
        height: 20px;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .errorMessage {
        color: #960707;
    }
    .is-danger{
        border: 1px solid red;
    }
    .inpContainer{
        min-height: 65px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .btnContainer{
        display: flex;
        flex-direction: row;
        min-width: 300px;
        justify-content: center;
        align-items: center;
    }
</style>