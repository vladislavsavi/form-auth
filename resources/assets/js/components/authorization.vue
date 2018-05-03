<template>
    <div id="authorization">
        <transition name="email" mode="out-in">
            <inputEmail v-if="currentPage.email" :options='defaultOptions.email'></inputEmail>
            <phoneNumberInput v-if="currentPage.phone" :options="defaultOptions.phone"></phoneNumberInput>
            <passInput v-if="currentPage.password" :options="defaultOptions.pass"></passInput>s
            <pinCode v-if="currentPage.code" :options="defaultOptions.pinCode"></pinCode>
            <choose-email v-if="currentPage.chooseEmail" :options="options.chooseEmail"></choose-email>
            <choose-entrance v-if="currentPage.chooseEntrance"></choose-entrance>
            <chek-email v-if="currentPage.chekEmail" :options="defaultOptions.checkMail"></chek-email>
        </transition>
    </div>
</template>

<script>
    import inputEmail from './inputEmail'
    import phoneNumberInput from './phonNumberInput'
    import passInput from './passInput'
    import pinCode from './pinCode'
    import chooseEmail from './chooseEmail'
    import chooseEntrance from './chooseEntrance'
    import chekEmail from './checkEmail'

    export default {
        props: ['options'],
        data: function () {
            return {
                defaultOptions: {
                    email: {
                        value: null,
                        title: `На  какой
                        <span style="font-weight: bold; color: #000;">e-mail</span>
                         выслать Ваш документ?`,
                        btn: {
                            class: 'btn btn-default',
                            title: `Подтвердить e-mail`
                        },
                        inp:{
                            class: 'form-control text-center'
                        },
                        footer: `<p class="termsOfUse">
                                   <i class="fas fa-info-circle fa-lg" style="color:#b65318;"></i>
                                    Продолжая далее вы соглашаетесь с
                                    <a href="#">Пользовательским соглашением Договор24.</a>
                                </p>`
                    },
                    pass: {
                        title: 'Введите пароль',
                        btn:{
                            title: 'Войти',
                            class: 'btn btn-default'
                        },inp:{
                            class: 'form-control text-center'
                        }
                    },
                    phone: {
                        title: `Введите Ваш
                        <span style="font-weight: bold; color: #000;">номер телефона</span>
                         , а мы вышлем Вам смс с кодом`,
                        class:'custom-arr-input-phone',
                        btn: {
                            class: 'btn btn-default',
                            title: 'отправить СМС с кодом'
                        },
                        inp:{
                            class: 'form-control text-center'
                        },
                        footer: ``
                    },
                    pinCode:{
                        title: 'Введите СМС-код*',
                        btn:{
                            class: 'btn btn-default',
                            title: 'Подтвердить код'
                        },
                        inp:{
                            class: 'custom-arr-input-code'
                        }
                    },
                    chooseEmail:{
                        title: 'Вы входли ранее. Выберете email!',
                        emailList:{
                            class:'btn btn-default'
                        },
                        btn:{
                            class: 'btn btn-default'
                        }
                    },
                    checkMail:{
                        title:'Проверьте вашу почту',
                        btn:{
                            class: 'btn btn-default'
                        }
                    }
                }
            }
        },
        mounted() {
            if (this.options){
                this.calcOptions(this.defaultOptions, this.options)
            }
            this.setPage()
        },
        computed: {
            currentPage () {
                return this.$store.state.currentPage
            }
        },
        components:{
            inputEmail,
            phoneNumberInput,
            passInput,
            pinCode,
            chooseEmail,
            chooseEntrance,
            chekEmail
        },
        methods: {
            calcOptions: function(defaultOptions, newOptions){
                if (defaultOptions && newOptions) {
                    for(let key in defaultOptions){
                        if(newOptions.hasOwnProperty(key)){
                            if(typeof defaultOptions[key] == 'object'){
                                this.calcOptions(defaultOptions[key], newOptions[key]);
                            }
                            else {
                                defaultOptions[key] = newOptions[key];
                            }
                        }
                    }
                }
            },
            setPage(){
                if(this.defaultOptions.email.value){
                    this.$store.dispatch('resEmail', {
                        email: this.defaultOptions.email.value
                    })
                }else {
                    if(localStorage.getItem('email')){
                        this.$store.commit('setPage', 'chooseEmail')
                    }
                    else{
                        this.$store.commit('setPage', 'email')
                    }
                }
            }
        }
    }
</script>
