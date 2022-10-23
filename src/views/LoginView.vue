<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col sm="8" md="6" lg="4">
                <v-card>
                    <v-img :src="require('../assets/pokemon.png')" height="60" alt="Pokemon" />
                    <v-card-title>Inicio de sesión</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="login">
                            <v-text-field label="Correo" placeholder="johndoe@gmail.com" type="email" v-model="email" />
                            <v-text-field label="Contraseña" placeholder="6 caracteres" type="password"
                                v-model="pass" />
                            <v-btn block color="success" size="large" type="submit" variant="elevated">
                                Entrar
                            </v-btn>
                        </v-form>
                    </v-card-text>
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
export default {
    name: 'LoginView',
    data: () => ({
        email: "",
        pass: ""

    }),
    methods: {
        login() {
            signInWithEmailAndPassword(auth, this.email, this.pass)
                .then(() => {
                    this.$router.replace('/')
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    }
}
</script>
  