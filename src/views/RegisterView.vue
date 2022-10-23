<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col sm="8" md="6" lg="4">
                <v-card>
                    <v-img :src="require('../assets/pokemon.png')" height="60" alt="Pokemon" />
                    <v-card-title>Registro de usuario</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="userRegistration">
                            <v-text-field prepend-icon="mdi-email" label="Correo" placeholder="johndoe@gmail.com"
                                type="email" v-model="v$.emailUser.$model" />
                            <v-text-field prepend-icon="mdi-lock" label="Contraseña" placeholder="6 caracteres"
                                type="password" v-model="passUser" @blur="v$.passUser.$touch"/>
                            <v-text-field prepend-icon="mdi-lock-check" label="Confirmar" placeholder="6 caracteres"
                                type="password" v-model="confirm" @blur="v$.confirm.$touch"/>
                            <v-btn block color="primary" size="large" type="submit" variant="elevated">
                                Registrar
                            </v-btn>
                        </v-form>
                    </v-card-text>
                    <v-alert v-if="v$.emailUser.$error" type="error" variant="text">Error en la direccion de correo</v-alert>
                    <v-alert v-if="v$.passUser.$error" type="error" variant="text">Error en la contraseña(mínimo 6 caracteres)</v-alert>
                    <v-alert v-if="v$.confirm.$error" type="error" variant="text">La confirmación debe ser identica a la primer contraseña</v-alert>
                    <v-alert v-if="errorMsg.show" type="error" variant="text">{{errorMsg.msg}}</v-alert>
                    <v-card-actions>
                        <RouterLink to="/login">Ir a inicio de sesión</RouterLink>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import { auth } from '@/firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

export default {
    name: 'LoginView',
    data: () => ({
        emailUser: "",
        passUser: "",
        confirm: "",
        errorMsg: {show:false, msg:''},

    }),
    methods: {
        async userRegistration() {
            const isFormCorrect = await this.v$.$validate();
            if(isFormCorrect){
            createUserWithEmailAndPassword(auth, this.email, this.pass)
                .then(() => {
                    this.$router.replace('/home')
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
            confirm: { sameAsPassword: sameAs(this.passUser) },
        }
    },
}
</script>
  