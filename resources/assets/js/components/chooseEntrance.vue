<template>
    <div class="col">
        <div class="alert">
           <h3>Как вы хотите востановить пароль?</h3>
        </div>
        <div class="alert you-email" v-on:click.pervent="choose" typelink="SEND_PASSWORD">
           Выслать пароль на почту
        </div>
        <div class="alert you-email" v-on:click="choose" typelink="SEND_LINK">
          Выслать ссылку для авторизации на почту
        </div>
        <div class="alert you-email" v-on:click="choose" typelink="SEND_SMS">
           Выслать СМС
        </div>
    </div>
</template>

<script>
    export default {
       methods:{
           choose(){
               console.log(event.target.getAttribute('typelink'))
               this.$store.commit('setTypeRecovery', event.target.getAttribute('typelink'))
               this.$store.commit('setPage', 'chekEmail')
           }
       }
    }
</script>
