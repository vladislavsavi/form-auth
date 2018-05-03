<template>
    <form @submit.prevent>
        <div class="control-group">
            <h1>{{options.title}}</h1>
            <label class="control control-radio" v-for="(item, i) in emails">First radio
                <input type="radio" name="radio" :id="'radio'+i" :value="item"/>
                <div class="control-indicator"></div>
            </label>
        </div>
    </form>
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
