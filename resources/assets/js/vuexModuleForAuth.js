import axios from "axios";

export const moduleAuth = {
    namespaced: true,
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
            code: null,
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
                .then(()=>{
                    console.col('успешно')
                })
                .catch((err)=>{console.log(err)})
        },
        resPass({state, commit}, {code}){
            console.log('asdsd')
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
        }
    }
}

