<template>
    <form  @submit.prevent="validateBeforeSubmit">
        <div class="form-row">
            <div class="col  text-center">
                <h3 v-html="options.title"></h3>
            </div>
            <div class="col text-center input-wraper">
                <input type="email" v-on:keyup="space" :class='options.inp.class'  id="exampleInputEmail1" v-validate="'required|email'" data-vv-as="email" v-model="email" aria-describedby="emailHelp">
                <small id="emailHelp" class="form-text text-muted">Укажите ваш e-mail</small>
            </div>
            <div class="col text-center">
                <button type="submit" :class="options.btn.class">{{ options.btn.title }}</button>
            </div>
        </div>
            <p v-html="options.footer"></p>
    </form>
</template>

<script>
    export default {
        props:['options'],
        data(){
            return{
                email:'',
            }
        },
        methods:{
           validateBeforeSubmit() {
               let self = this;
                 this.$validator.validateAll()
                    .then((result) => {
                    if (result) {
                       this.$store.dispatch('resEmail', {
                          email: self.email
                       })
                    }
                });
            },
            space: function () {
                let arr = this.email.split('')
                let space = arr.indexOf(' ')
                if(space != -1){
                    arr.splice(space,1)
                    this.email = arr.join('')
                }
                if(arr.indexOf(' ') != -1){
                    this.space()
                }
            }
        },
        mounted(){
            document.getElementById('exampleInputEmail1').focus()
        }
    }
</script>