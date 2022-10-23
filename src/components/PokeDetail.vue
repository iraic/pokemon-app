<template>
    <v-card>
        <span class="float-left ma-3">
            <v-chip color="info">
                No {{pokemon.id}}
            </v-chip>
        </span>

        <v-card-title class="text-capitalize d-flex justify-center">
            {{pokemon.name}}
        </v-card-title>
        <div class="d-flex justify-center">
            <v-spacer></v-spacer>
            <v-img :src="pokemon.img" height="400" />
            <div class="align-self-center">
                <v-chip class="ma-2" color="success" label>
                    <v-icon start icon="mdi-label"></v-icon>
                    Altura: {{pokemon.height}}
                </v-chip>
                <br>
                <v-chip class="ma-2" color="success" label>
                    <v-icon start icon="mdi-label"></v-icon>
                    Peso: {{pokemon.weight}}
                </v-chip>
                <br>
                <v-chip class="ma-2" color="success" label>
                    <v-icon start icon="mdi-label"></v-icon>
                    Especie: {{pokemon.specie}}
                </v-chip>
                <br>
                <v-chip class="ma-2" color="success" label>
                    <v-icon start icon="mdi-label"></v-icon>
                    Movimientos: {{pokemon.moves}}
                </v-chip>
            </div>
            <v-spacer></v-spacer>
        </div>
        <v-divider></v-divider>
        <div class="d-flex justify-center">
            <v-spacer></v-spacer>
            <div>
                <v-card-text>
                    Tipos:
                </v-card-text>
                <div>
                    <v-chip v-for="t in pokemon.types" :key="t.name" color="primary" label class="ma-1">
                        {{t.name}}
                    </v-chip>
                </div>
            </div>
            <v-spacer></v-spacer>
            <div>
                <v-card-text>
                    Habilidades:
                </v-card-text>
                <div>
                    <v-chip v-for="skill in pokemon.skills" :key="skill.name" color="success" class="ma-1">
                        {{skill.name}}
                    </v-chip>
                </div>
            </div>
            <v-spacer></v-spacer>
        </div>
    </v-card>
</template>
<script>
export default {
    name: "PokeDetail",
    props: {
        pokemon: Object,
    },
}
</script>