<template>
  <div>
    <v-card variant="tonal" elevation="2">
      <div v-if="pokemonLoading">
        <v-card-title class="text-capitalize">
          {{name}}
        </v-card-title>
        <v-sheet height="400" class="d-flex justify-center">
          <v-progress-circular :size="100" color="green" indeterminate class="align-self-center"></v-progress-circular>
        </v-sheet>
      </div>
      <div v-else>
        <v-img :src="pokemon.img" cover>
          <v-chip color="info" class="float-left ma-3">
            No {{pokemon.id}}
          </v-chip>
          <v-btn color="info" icon="mdi-magnify" class="float-right ma-1" @click="viewPokemonDetail"></v-btn>
        </v-img>

        <v-card-title class="text-capitalize">
          {{pokemon.name}}
          <div class="float-right">
            <v-chip v-for="t in pokemon.types" :key="t.name" color="primary" size="small" label class="ma-1">
              {{t.name}}
            </v-chip>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-subtitle>
          Habilidades:
        </v-card-subtitle>
        <v-chip v-for="skill in pokemon.skills" :key="skill.name" color="success" size="small" class="ma-1">
          {{skill.name}}
        </v-chip>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="selectPokemon" color="primary" variant="outlined">
            Seleccionar
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>

<script>
import pokemonService from '@/store/pokemonService'
export default {
  name: "PokeCard",
  props: {
    name: String,
  },
  data: () => ({
    pokemon: {},
    pokemonLoading: true,
  }),
  methods: {
    getPokemon() {
      pokemonService.getPokemonByName(this.name)
        .then((res) => {
          this.pokemon.id = res.data.id;
          this.pokemon.name = res.data.name;
          this.pokemon.img = res.data.sprites.other.home.front_default;
          this.pokemon.skills = res.data.abilities.map(element => ({ name: element.ability.name }));
          this.pokemon.types = res.data.types.map(element => ({ name: element.type.name }));
          this.pokemon.height = res.data.height;
          this.pokemon.weight = res.data.weight;
          this.pokemon.specie = res.data.species.name;
          this.pokemon.moves = res.data.moves.length;
        })
        .finally(() => this.pokemonLoading = false)
    },
    selectPokemon() {
      const pokemon = {
        id: this.pokemon.id,
        name: this.pokemon.name,
        skills: this.pokemon.skills,
      };
      this.$emit("selectPokemon", pokemon);
    },
    viewPokemonDetail() {
      this.$emit("viewPokemonDetail", this.pokemon);
    }
  },
  created() {
    this.getPokemon();
  },
}
</script>