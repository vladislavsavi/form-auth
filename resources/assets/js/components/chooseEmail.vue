<template>
    <div class="col">
        <div class="alert">
            <h3>{{options.title}}</h3>
        </div>
        <transition-group name="list">
            <div class="alert you-email" role="alert" v-on:click.prevent="choose" v-for="(item, i) in emails" :mail="item" :key="i" :id="i">
                <strong :mail="item">{{ item }}</strong>
                <span :key="i" style="font-size: 15px; color: #888585" v-on:click.prevent="removeEmail" class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
            </div>
        </transition-group>
        <div class="alert text-center">
            <button class="input-other-email" :class="options.btn.class" v-on:click="ipnutOtherEmail">Ввести другой email</button>
        </div>
    </div>
</template>

<script>
    export default {
        props:['options'],
        data(){
            return{
                emails: ''
            }
        },
        mounted(){
            this.emails = localStorage.getItem('email').split(',')
        },
        methods:{
            removeEmail(){
                event.stopPropagation()
                let numberInArr = event.target.parentNode.getAttribute('id')
                this.emails.splice(numberInArr, 1)
                localStorage.setItem('email', this.emails)
                if(localStorage.getItem('email') == ''){
                        this.$store.commit('setPage', 'email')
                }
            },
            choose(){
                let emailNow = event.target.getAttribute('mail')
                this.$store.dispatch('resEmail',{
                    email: emailNow
                })
            },
            ipnutOtherEmail(){
                this.$store.commit('setPage', 'email')
            }
        }
    }
</script>
