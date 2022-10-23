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
                                type="email" v-model="email" />
                            <v-text-field prepend-icon="mdi-lock" label="Contraseña" placeholder="6 caracteres"
                                type="password" v-model="pass" />
                            <v-text-field prepend-icon="mdi-lock-check" label="Confirmar" placeholder="6 caracteres"
                                type="password" v-model="confirm" />
                            <v-btn block color="primary" size="large" type="submit" variant="elevated">
                                Registrar
                            </v-btn>
                        </v-form>
                    </v-card-text>
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

export default {
    name: 'LoginView',
    data: () => ({
        email: "",
        pass: "",
        confirm: ""

    }),
    methods: {
        userRegistration() {
            createUserWithEmailAndPassword(auth, this.email, this.pass)
                .then(() => {
                    this.$router.replace('/home')
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    }
}
</script>
  