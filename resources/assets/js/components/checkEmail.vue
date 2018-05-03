<template>
    <div class="text-center">
        <span v-on:click="prevPage" class="step-prev"><<Выбрать другой способ входа</span>
        <div class="alert">
            <p v-html="getText"></p>
        </div>
        <div>
            <h3>{{options.title}}</h3>
        </div>
        <button v-on:click="complete" :class="options.btn.class">Завершить</button>
            <p class="termsOfUse">
                *Если вам не прило письмо <a>Отправить попторно</a>
            </p>
    </div>
</template>

<script>
    export default {
        props: ['options'],
        methods:{
            prevPage(){
                this.$store.commit('setPage', 'chooseEntrance')
            },
            complete(){
                switch (this.$store.state.data.howRecover){
                    case 'SEND_PASSWORD':
                        this.$store.commit('setPage', 'password')
                        break;
                    case 'SEND_LINK' :
                        this.$store.commit('setPage', 'email')
                        this.$store.commit('setMode', false)
                        break;
                    case 'SEND_SMS':
                        this.$store.commit('setPage', 'code')
                }

            }
        },
        computed:{
            getText(){
                switch (this.$store.state.data.howRecover){
                    case 'SEND_PASSWORD':
                        return 'Мы отпрвили пароль на почтовый ящик <span style="color: #000">' + this.$store.state.data.email + '</span>'
                        break;
                    case 'SEND_LINK' :
                        return 'Мы отпрвили ссылку для одноразовой авторизации на почтовый ящик <span style="color: #000">'
                            + this.$store.state.data.email + '</span>'
                        break;
                    case 'SEND_SMS':
                        return 'Мы отпрвили СМС код на номер <span style="color: #000">' + this.$store.state.data.phone + '</span>'
                }
            },
            icon(){
                return faInfoCircle
            }
        }
    }
</script>