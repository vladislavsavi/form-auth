<template>
    <div id="inpWraper" class="d-flex">
        <input :class="inpClass" v-for="(value, key) in arrDB" @focus="focusInp" v-on:keyup.delete="del" type="tel"
               :name="key" :id="key" v-model="arrDB[key]"
               maxlength="1" class="arr-inp" v-on:keydown.enter="complete" v-on:keyup="movement" v-on:input="change">
    </div>
</template>
<script>
    export default {
        props:['quantity', 'type','inpClass'],
        data(){
            return{
                arrDB: [],
                str: ''
            }
        },
        watch:{
            arrDB: function () {
                this.str = this.arrDB.join('')
                if (this.str.length == this.quantity.length && this.type != 'phone') {
                    this.$emit('req', this.str)
                }
            }
        },
        beforeMount(){
          this.arrDB = this.quantity.map((i)=>{
              return this.quantity[i]
          })
        },mounted(){
            if(this.type == 'phone'){
                let inpWraper = document.getElementById('inpWraper')
                let inpArr = document.getElementsByClassName('arr-inp')
                for(let i = 0; i<= inpArr.length; i ++){
                    switch (i){
                        case 0:
                            inpWraper.insertBefore(document.createTextNode('+7('), inpWraper.children[i])
                            break;
                        case 3:
                            inpWraper.insertBefore(document.createTextNode(')'), inpWraper.children[i])
                    }
                }
            }
            document.getElementsByClassName('arr-inp')[0].focus()
        },
        methods:{
            del(e){
                let thisTargetnumber = parseInt(e.target.getAttribute('name'))
                if(e.keyCode == 8 || e.keyCode == 46){
                    if(thisTargetnumber > 0) {
                        document.getElementsByClassName('arr-inp')[thisTargetnumber -1].focus()
                    }
                }
            },
            change(e){
                let thisTargetnumber = parseInt(e.target.getAttribute('name'))
                let rex = /\d/
                console.log(rex.test(e.target.value))
                if(rex.test(e.target.value)){
                    if(thisTargetnumber < this.quantity.length -1)
                        document.getElementsByClassName('arr-inp')[thisTargetnumber + 1].focus()
                }else{
                    this.arrDB[thisTargetnumber] = ''
                }
            },
            complete(){
                if(this.type == 'phone'){
                    this.$emit('req', this.str)
                }
            },
            focusInp(e){
                e.target.select()
            },
            movement(e){
                let arrInp =  document.getElementsByClassName('arr-inp')
                let inpNow = parseInt(e.target.getAttribute('name'))
                switch (e.keyCode){
                    case 37:
                        if(inpNow > 0)
                            arrInp[inpNow - 1].focus()
                        else
                            e.target.select()
                        break
                    case 32:
                    case 39:
                        if(inpNow < arrInp.length - 1)
                            arrInp[inpNow + 1].focus()
                        else
                            e.target.select()
                        break
                }
            }
        },
    }
</script>

<style scoped>
    #inpWraper input{
        display: inline-block;
        width: 40px;
        margin-right: 10px;
    }
</style>