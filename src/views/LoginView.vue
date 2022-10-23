<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col sm="8" md="6" lg="4">
                <v-card>
                    <v-img :src="require('../assets/pokemon.png')" height="60" alt="Pokemon" />
                    <v-card-title>Inicio de sesión</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="login">
                            <v-text-field label="Correo" placeholder="johndoe@gmail.com" type="email"
                                v-model="v$.emailUser.$model"/>
                            <v-text-field label="Contraseña" placeholder="6 caracteres" type="password"
                                v-model="passUser" @blur="v$.passUser.$touch"/>
                            <v-btn block color="success" size="large" type="submit" variant="elevated">
                                Entrar
                            </v-btn>
                            
                        </v-form>
                    </v-card-text>
                    <v-alert v-if="v$.emailUser.$error" type="error" variant="text">Error en la direccion de correo</v-alert>
                    <v-alert v-if="v$.passUser.$error" type="error" variant="text">Error en la contraseña(mínimo 6 caracteres)</v-alert>
                    <v-alert v-if="errorMsg.show" type="error" variant="text">{{errorMsg.msg}}</v-alert>
                    <v-card-actions>
                        <RouterLink to="/register">Registrarse</RouterLink>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import { auth } from '@/firebase/firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export default {
    name: 'LoginView',
    data: () => ({
        emailUser: "",
        passUser: "",
        errorMsg: {show:false, msg:''},

    }),
    methods: {
        async login() {
            const isFormCorrect = await this.v$.$validate();
            if(isFormCorrect){
                signInWithEmailAndPassword(auth, this.emailUser, this.passUser)
                .then(() => {
                    this.$router.replace('/')
                })
                .catch(() => {
                    this.errorMsg.show=true;
                    this.errorMsg.msg = "Error al iniciar sesión revise los datos";
                });
            }else{
                this.errorMsg.show=true;
                this.errorMsg.msg = "Llena los comapos con datos válidos";
            }
        }
    },
    setup() {
        return { v$: useVuelidate() }
    },
    validations() {
        return {
            emailUser: { required, email },
            passUser: { required, minLength: minLength(6) },
        }
    },
}
</script>
  