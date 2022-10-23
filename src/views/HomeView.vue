<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col sm="8" md="6" lg="4">
        <v-select :loading="pokemonTypesListLoading" v-model="pokemonTypeSelect" label="Tipo de pokemon"
          :items="pokemonTypesList" item-title="name" item-value="name" clearable>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" md="6" lg="9">
        <v-row>
          <v-progress-linear indeterminate color="green" :active="pokemonListLoading"></v-progress-linear>
          <v-col xs="12" md="6" lg="4" v-for="pokemon in pokemonList" :key="pokemon.name">
            <PokeCard :name="pokemon.name" @selectPokemon="pokemonAdd" @viewPokemonDetail="pokemonShow"/>
          </v-col>
        </v-row>
      </v-col>
      <v-col xs="12" md="6" lg="3">
        <v-table density="compact" class="elevation-1">
          <thead>
            <tr>
              <th>Pokemon</th>
              <th>Habilidades</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pokemonSelectList" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.skills }}</td>
              <td>
                <v-btn @click="pokemonRemove(item)" color="error" icon="mdi-delete-circle" variant="plain"></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-dialog v-model="pokemonShowDetail" >
      <PokeDetail :pokemon="pokemonDetail"/>
      <v-btn color="primary" @click="pokemonShowDetail = false">Cerrar</v-btn>
    </v-dialog>
  </v-container>
</template>

<script>
import PokeCard from '@/components/PokeCard'
import PokeDetail from '@/components/PokeDetail'
import pokemonService from '@/store/pokemonService'
export default {
  name: 'HomeView',
  components: {
    PokeCard,
    PokeDetail
  },
  data: () => ({
    pokemonTypesListLoading: true,
    pokemonTypesList: [],
    pokemonTypeSelect: null,
    pokemonSelectList: [],
    pokemonListLoading: true,
    pokemonList: [],
    pokemonShowDetail: false,
    pokemonDetail: {}
  }),
  methods: {
    getTypes() {
      this.pokemonTypesListLoading = true;
      pokemonService.getTypes()
        .then((res) => {
          this.pokemonTypesList = res.data.results;
        })
        .finally(() => this.pokemonTypesListLoading = false)
    },
    onChagePokemonType() {
      this.pokemonListLoading = true;
      if (this.pokemonTypeSelect) {
        pokemonService.getPokemonByType(this.pokemonTypeSelect)
          .then((res) => {
            this.pokemonList = res.data.pokemon.map(pokemon => ({
              name: pokemon.pokemon.name,
              url: pokemon.pokemon.url,
            }))
          })
          .finally(() => this.pokemonListLoading = false)
      } else {
        pokemonService.getAllPokemon()
          .then((res) => {
            this.pokemonList = res.data.results;
          })
          .finally(() => this.pokemonListLoading = false)
      }
    },
    pokemonAdd(pokemon){
      var i = this.pokemonSelectList.find( element => element.name == pokemon.name );
      if(i == undefined){
        let skillsText = "";
        pokemon.skills.forEach(element => {
          skillsText += element.name + ", ";
        });
        pokemon.skills = skillsText;
        this.pokemonSelectList.push(pokemon);
      }
    },
    pokemonRemove(pokemon){
      var i = this.pokemonSelectList.indexOf( pokemon );
      if ( i !== -1 ) {
        this.pokemonSelectList.splice( i, 1 );
      }
    },
    pokemonShow(pokemon){
      console.log(pokemon)
      this.pokemonDetail = pokemon;
      this.pokemonShowDetail = true;
    }
  },
  created() {
    this.getTypes();
    this.onChagePokemonType();
  },
  watch: {
    pokemonTypeSelect() {
      this.onChagePokemonType();
    }
  }
}
</script>
