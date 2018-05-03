require('./bootstrap')
window.Vue = require('vue');
import Vuex from 'vuex'
import axios from 'axios';
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
fontawesome.library.add(solid.faUser)




Vue.use(Vuex);
Vue.component('example-component', require('./components/ExampleComponent.vue'));


const store = new Vuex.Store({
    state: {
        currentPage: {
            email: false,
            phone: false,
            code: false,
            password: false,
            chooseEmail: false,
            chooseEntrance: false,
            chekEmail: false
        },
        data: {
            email: '',
            phone: '',
            code: {
                was: false,
                answer: false
            },
            password: null,
            auth: '',
            forgotPass:false,
            howRecover: ''
        },
    },
    getters:{
      getPhoneForModule: (state)=> {
            return state.data.phone.split('').map((item, i)=> {
               switch (i){
                   case 0:
                       return '+(' + item;
                       break;
                   case 3:
                   case 6:
                   case 8:
                       return '-' + item;
                       break;
                   case 2:
                       return item + ')';
                       break;
                   default:
                       return item;
               }
            }).join('')
      }
    },
    actions: {
        resEmail ({ commit}, {email}) {

            axios.get(`http://127.0.0.1:8000/auth`, {
                params: {
                    email: email
                }
            })
                .then((res)=>{
                    if(res.data.registered) {
                        commit('setPage', 'password');
                    } else {
                        commit('setPage', 'phone');
                    }
                     commit('setEmail', email)
                    commit('setRegistered', res.data.registered)
                })
                .catch((err)=>{
                    console.log(err);
                })
        },
        resPhone({commit, state}, {phone}){
            axios.get('http://127.0.0.1:8000/auth',{
                params:{
                    email: state.data.email,
                    phone: phone
                }
            })
                .then((res)=>{
                    if(res.data.code){
                        commit('setPage', 'code')
                        commit('setPhone', phone)
                    }
            })
                .catch((err)=>{
                    console.log(err);
                })
        },
        resCode({commit, state}, {code}){
            axios.get('http://127.0.0.1:8000/auth',{
                params:{
                    email: state.data.email,
                    phone: state.data.phone,
                    code: code
                }
            })
                .then((res)=>{
                    commit('setAnswerCode', res.data.auth)
                })
                .catch((err)=>{console.log(err)})
        },
        resPass({state, commit}, {pass}){
            axios.get('http://127.0.0.1:8000/auth',{
                params:{
                    email: state.data.email,
                    pass: pass
                }
            })
                .then((res)=>{
                commit('setAnswerCode', res.data.registered)
            })
                .catch((err)=>{
                    console.log(err)
                })
        }
    },
    mutations: {
        setPage (state, page) {
            Object.keys(state.currentPage).forEach(key => {
                state.currentPage[key] = key === page;
            });
        },
        setEmail (state, mail) {
            state.data.email = mail
        },
        setPhone(state, phoneNumber){
            state.data.phone = phoneNumber;
        },
        setRegistered(state, reg){
            state.data.registered = reg
        },
        setMode(state, bul){
            state.data.forgotPass = bul
        },
        setTypeRecovery(state, type){
            state.data.howRecover = type
        },
        setAnswerCode(state, answer){
          if(answer){
            let emailList = localStorage.getItem('email')
            if(emailList){
                let arr = emailList.split(',')
                console.log(arr)
                console.log(state.data.email)
                console.log(arr.indexOf(state.data.email))
                if(arr.indexOf(state.data.email) == -1){
                    arr.push(state.data.email)
                    localStorage.setItem('email', arr)
                }
            }else {
                localStorage.setItem('email', state.data.email)
            }
          }
        },
    }
});


const app = new Vue({
    store,
    el: '#app',
})
