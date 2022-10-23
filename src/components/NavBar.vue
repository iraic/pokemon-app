<template>
  <div>
    <v-toolbar :elevation="1" v-if="isLogin">
      <v-app-bar-nav-icon class="d-md-none" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-items class="w-100">

        <div class="mt-4 d-none d-md-flex">
          <v-icon class="ml-3">mdi-account-circle</v-icon>
          <span class="ml-1 mr-1">Bienvenido</span>
          <span><b>[{{user}}]</b></span>
        </div>

        <v-toolbar-title>
          <v-img :src="require('../assets/pokemon.png')" height="60" alt="Pokemon" />
        </v-toolbar-title>

        <div class="mt-4 d-none d-md-flex">
          <v-btn @click="home">Home</v-btn>
          <v-btn @click="home">Habilidades</v-btn>
          <v-btn @click="logout">Cerrar sesión</v-btn>
          <v-btn color="primary" variant="elevated" @click="toggleTheme">Modo oscuro</v-btn>
        </div>
      </v-toolbar-items>
    </v-toolbar>

    <v-layout>
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list-item>
          <v-img :src="require('../assets/logo.png')" height="50" alt="Pokemon" />
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item prepend-icon="mdi-account-circle" :title="user" />
        <v-divider></v-divider>

        <v-list-item>
          <v-switch @click="toggleTheme" label="Modo oscuro" class="ml-3"></v-switch>
        </v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home" title="Home" @click="home" />
          <v-list-item prepend-icon="mdi-view-dashboard" title="Habilidades" @click="home" />
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-exit-to-app" title="Cerrar sesión" @click="logout" />
        </v-list>
      </v-navigation-drawer>
    </v-layout>


  </div>
</template>

<script>
import { useTheme } from 'vuetify'
import { auth } from '@/firebase/firebaseConfig'
import { onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "NavBar",
  data: () => ({
    drawer: null,
    user: '',
    isLogin: false
  }),
  methods: {
    home() {
      this.$router.push({ name: 'home' })
    },
    logout() {
      signOut(auth).then(()=> {
          this.$router.replace('/login')
      })
    },

  },
  setup() {
    const theme = useTheme()
    
    return {
      theme,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLogin = true;
        this.user = user.email;
        this.$router.replace('/')
      } else {
        this.isLogin = false;
      }
    });
  }
}
</script>