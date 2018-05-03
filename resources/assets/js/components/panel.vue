<template>
    <div class="container">
        <div class="panel panel-default mypanel">
            <div class="panel-body">
                <authorization
                        titleForEmailInp='На какой
                        <span style="font-weight: bold; color: #000;">email</span>
                         выслать Ваш документ?'
                        titleForPhoneInp='Введите Ваш
                        <span style="font-weight: bold; color: #000;">номер телефона</span>
                        , а мы вышлем Вам смс с кодом'
                        textBttnForPhoneInp='отправить СМС с кодом'
                        titleForPassInp='Введите пароль'
                        :options="options"
                ></authorization>
            </div>
        </div>
    </div>
</template>

<script>
    import authorization from './authorization'

    export default {
        components: {
            authorization
        },
        data: function () {
            return {
                options: {
                    email: {
                        value:  'vladislavsavi@gmail.com',
                        title: `На  какой
                        <span style="font-weight: bold; color: #000;">e-mail</span>
                         выслать Ваш документ?`,
                        btn: {
                            class: 'custom-btn',
                            title: `Подтвердить email`
                        },
                        inp:{
                            class: 'custom-input'
                        }
                    },
                    pass: {
                        title: 'Введите пароль',
                        btn:{
                            title: 'Войти',
                            class: 'custom-btn'
                        },inp:{
                            class: 'custom-input'
                        }
                    },
                    phone: {
                        title: `Введите Ваш
                        <span style="font-weight: bold; color: #000;">номер телефона</span>
                         , а мы вышлем Вам смс с кодом`,
                        class:'',
                        btn: {
                            class: 'custom-btn',
                            title: 'отправить СМС с кодом'
                        },
                        inp:{
                            class: 'custom-arr-input-phone'
                        },
                        footer: `<p class="termsOfUse">
                                     <i class="fas fa-check-square fa-lg" style="color: #2ca02c"></i>
                                      Смс бесплатное. Деньги с баланса номера не списываються
                                  </p>`
                    },
                    pinCode:{
                        title: 'Введите СМС-код*',
                        btn:{
                            class: 'custom-btn',
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
                            class: 'custom-btn'
                        },
                    },
                    checkMail:{
                        title:'Проверьте вашу почту',
                        btn:{
                            class: 'custom-btn'
                        }
                    }
                }
            }
        },
    }
</script>

<style scoped>
    .mypanel{
        max-width: 500px;
    }
</style>