<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col sm="8" md="6" lg="4">
        <v-select v-model="select" :hint="`${select.state}, ${select.abbr}`" :items="items" item-title="state"
          item-value="abbr" label="Select" persistent-hint return-object single-line></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" md="6" lg="9">
        <v-row>
          <v-col xs="12" md="6" lg="4">
            <PokeCard />
          </v-col>
          <v-col xs="12" md="6" lg="4">
            <PokeCard />
          </v-col>
          <v-col xs="12" md="6" lg="4">
            <PokeCard />
          </v-col>
          <v-col xs="12" md="6" lg="4">
            <PokeCard />
          </v-col>
          <v-col xs="12" md="6" lg="4">
            <PokeCard />
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
            <tr v-for="item in pokemonsList" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.skills }}</td>
              <td>
                <v-btn color="error" icon="mdi-delete-circle" variant="plain"></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PokeCard from '@/components/PokeCard'
export default {
  name: 'HomeView',
  components: {
    PokeCard
  },
  data: () => ({
    select: { state: 'Florida', abbr: 'FL' },
    items: [
      { state: 'Florida', abbr: 'FL' },
      { state: 'Georgia', abbr: 'GA' },
      { state: 'Nebraska', abbr: 'NE' },
      { state: 'California', abbr: 'CA' },
      { state: 'New York', abbr: 'NY' },
    ],
    pokemonsList: [
      { id: 1, name: 'pikachu', skills: 'rayo' },
    ]
  })
}
</script>
