<template>
    <div class="container mt-5">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6">
                <div class="card px-5 py-5" id="form1">
                    <div class="invalid-feedback d-block mb-4" v-for="error in loginError">{{ error }}</div>
                    <div class="form-data" >
                        <div class="forms-inputs mb-4"><span>Email</span> <input autocomplete="off"
                                                                                             type="text"
                                                                                             v-model="email"
                                                                                             @blur="validateEmail"
                                                                                             v-bind:class="{'form-control':true, 'is-invalid' :emailError}">
                            <div class="invalid-feedback" v-if="emailError">{{emailError}}</div>
                        </div>
                        <div class="forms-inputs mb-4"><span>Password</span> <input autocomplete="off" type="password" v-model="password"
                                                                                    @blur="validatePassword"
                                                                                    v-bind:class="{'form-control':true, 'is-invalid' : passwordError}">
                            <div class="invalid-feedback" v-if="passwordError">{{passwordError}}</div>
                        </div>
                        <div class="mb-3">
                            <button @click="login" class="btn btn-dark w-100">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive, toRefs, watchEffect} from "vue";
import {useStore} from "vuex";
import {DASHBOARD_ROUTE} from "../../Router/routeNames";
import {redirectToRoute} from "../../Services/routerHelper";
export default {
    name: "LoginComponent",
    setup(){
        const credentials=reactive({
            password:'',
            email:''
        })
        const credentialErrors=reactive({
            passwordError:'',
            emailError:'',
            loginError:''
        })

        const validateEmail = () => {
          if(!credentials.email){
              credentialErrors.emailError='Email Field is required'
          }
        }
        const validatePassword=()=>{
            if(!credentials.password){
                credentialErrors.passwordError='Password Field is required'
            }
            if(credentials.password.length < 8){
                credentialErrors.passwordError='Password length should be at least 8 characters '
            }
        }
        watchEffect(()=>{
            if (credentials.email){
                credentialErrors.emailError=''
            }
            if (credentials.password){
                if (credentials.password.length < 8 && credentials.password.length!==0){
                    credentialErrors.passwordError='Password length should be at least 8 characters '
                    return;
                }
                credentialErrors.passwordError=''
            }
        })
        const store=useStore()
        const login=async ()=> {
           let response=await store.dispatch('login',{
               email:credentials.email,
               password:credentials.password
           })
           if (response?.success){
               await redirectToRoute(DASHBOARD_ROUTE.name)
           }
           if (response?.error){
               credentialErrors.loginError=extractErrorsAndReturnArray(response.errors)
           }
        }
        const extractErrorsAndReturnArray=(errors)=>{
            let errorValues=[]
            for (const error in errors) {
                errorValues.push(errors[error][0])
            }
            return errorValues;
        }
        return{
            ...toRefs(credentials),
            ...toRefs(credentialErrors),
            validateEmail,
            validatePassword,
            login
        }
    }
}

</script>

<style scoped>
body {
    background: #000
}

.card {
    border: none;
    height: 320px
}

.forms-inputs {
    position: relative
}

.forms-inputs span {
    position: absolute;
    top: -18px;
    left: 10px;
    background-color: #fff;
    padding: 5px 10px;
    font-size: 15px
}

.forms-inputs input {
    height: 50px;
    border: 2px solid #eee
}

.forms-inputs input:focus {
    box-shadow: none;
    outline: none;
    border: 2px solid #000
}

.btn {
    height: 50px
}

.success-data {
    display: flex;
    flex-direction: column
}

.bxs-badge-check {
    font-size: 90px
}
</style>
