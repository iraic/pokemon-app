import axios from "axios";
const API = "https://pokeapi.co/api/v2/";

export default {
    getTypes() {
        return axios.get(API + "type");
    },
    getPokemonByType(type) {
        return axios.get(API + "type/" + type);
    },
    getAllPokemon() {
        return axios.get(API + "pokemon");
    },
    getPokemonByName(name) {
        return axios.get(API + "pokemon/"+name);
    }
}