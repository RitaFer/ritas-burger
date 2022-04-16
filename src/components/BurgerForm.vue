<template>
  <div class="main">
    <div>
      <form id="burger-form" @submit.prevent="createBurger">
        <h1>Monte o seu burger ♥</h1>
        <Message :msg="msg" v-show="msg" />
        <InputText type="text" 
        label="Nome" 
        placeholder="Digite seu nome" 
        v-model="form.username" />

        <div class="input-container">
          <InputSelect id="breadTypes" 
          v-model="form.breadType"
          label="Pão"
          :options="options.breadTypes"/>
        </div>
        <div class="input-container">
          <InputSelect id="breadModes" 
          v-model="form.breadMode"
          label="Modo do Pão"
          :options="options.breadModes"/>
        </div>
        <div class="input-container">
          <InputSelect id="burgerTypes"
          v-model="form.burgerType"
          label="Hamburguer"
          :options="options.burgerTypes"/>
        </div>
        <InputCheckbox
        id="spices"
        label="Temperos"
        v-model="form.spices"
        :options="options.spices"
        />
        <InputCheckbox
        id="coldCuts"
        label="Frios"
        v-model="form.coldCuts"
        :options="options.coldCuts"
        />
        <InputCheckbox
        id="salads"
        label="Saladas"
        v-model="form.salads"
        :options="options.salads"
        />
        <InputCheckbox
        id="extras"
        label="Extras"
        v-model="form.extras"
        :options="options.extras"
        />
        <InputCheckbox
        id="sauces"
        label="Molhos"
        v-model="form.sauces"
        :options="options.sauces"
        />
        <div class="input-container-btn">
          <input type="submit" value="Finalizar Pedido" class="submit-btn">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Message from './Message'
import InputText from '@/components/inputs/Text'
import InputSelect from '@/components/inputs/Select'
import InputCheckbox from '@/components/inputs/Checkbox'

import { setBurger, getBurgers } from '@/firebase'
import { v4 as uuidv4 } from 'uuid';

export default {
  name: "BurgerForm",
  components: {
    Message,
    InputText,
    InputSelect,
    InputCheckbox
  },
  async mounted () {
    // console.log(setBurger({
    //   username: 'usuario teste',
    //   xpto: 'udsadas'
    // }))
  },
  data() {
    return {
      form: {
        username: undefined,
        breadType: undefined,
        breadMode: undefined,
        burgerType: undefined,
        spices: [],
        coldCuts: [],
        salads: [],
        extras: [],
        sauces: []
      },
      options: {
        breadTypes: [
          { id: 1, value: "Carne" },
          { id: 2, value: "Vegetariano" },
          { id: 3, value: "Sem Hamburguer" }
        ],
        breadModes: [
        { id: 1, value: "Normal" },
        { id: 2, value: "Selado + Azeite" },
        { id: 3, value: "Selado + Manteiga" },
        { id: 4, value: "Selado + Margarina" }
        ],
        burgerTypes: [
          { id: 1, value: "Normal" },
          { id: 2, value: "Com Gergelim" }
        ],
        spices: [
          { id: 1, value: "Sal" },
          { id: 2, value: "Pimenta" },
          { id: 3, value: "Fumaça em Pó" },
          { id: 4, value: "Edu Guedes" }
        ],
        coldCuts: [
          { id: 1, value: "Presunto" },
          { id: 2, value: "Salame" },
          { id: 3, value: "Cheddar" },
          { id: 4, value: "Queijo Mussarela" }
        ],
        salads: [
          { id: 1, value: "Alface" },
          { id: 2, value: "Tomate" },
          { id: 3, value: "Pepino" },
          { id: 4, value: "Cebola Roxa" }
        ],
        extras: [
          { id: 1, value: "Ovo" },
          { id: 2, value: "Bacon" },
          { id: 3, value: "Cebola Caramelizada" },
          { id: 4, value: "Orégano" }],
        sauces: [
          { id: 1, value: "Ketchup" },
          { id: 2, value: "Requeijão" },
          { id: 3, value: "Maionese" },
          { id: 4, value: "Maionese Verde" }
        ]
      },
      msg: null
    } 
  },
  methods: {
    // async getIngredients() {
    //   const req = await fetch('https://ritasburger-api.herokuapp.com/ingredients')
    //   const data = await req.json()
    //   this.options.breadType = data.breadType
    //   this.options.breadMode = data.breadMode
    //   this.options.burgerType = data.burgerType
    //   this.options.spices = data.spices
    //   this.options.coldCuts = data.coldCuts
    //   this.options.salads = data.salad
    //   this.options.extras = data.extras
    //   this.options.sauces = data.sauces
    // },
    async createBurger($event) {
      const jsonInText = JSON.parse(JSON.stringify(this.form))
      const oldData = await getBurgers().then(x => {
        return x?.[jsonInText.username] ?? []
      })
      const data = {
        [this.form.username]: [
          ...oldData,
          {
          id: uuidv4(),
          status: 'Em espera',
          ...jsonInText
          }
        ].filter(x => x !== undefined)
      }
      console.log(oldData, data)
      setBurger(data)

      // console.log(jsonInText)
      // const req = await fetch("https://ritas-burger-default-rtdb.firebaseio.com/", {
      //   method: "POST",
      //   headers: { "Content-Type" : "application/json" },
      //   body: jsonInText
      // });
      
      this.msg = "Pedido realizado com sucesso!"
      setTimeout(() => this.msg = "", 3000)

      this.form = {
        breadType: undefined,
        breadMode: undefined,
        burgerType: undefined,
        spices: [],
        coldCuts: [],
        salads: [],
        extras: [],
        sauces: []
      }
    }
  }
}
</script>

<style scoped>
  #burger-form {
    max-width: 500px;
    background-color: #FFF;
    margin: 30px auto;
    border: 2px solid #222;
    border-radius: 10px;
    padding: 10px;
  }

  h1 {
    font-size: 2em;
    margin: 10px;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  label {
    font-weight: bold;
    margin-bottom: 10px;
    color: #222;
    padding: 5px 10px;
    border-left: 4px solid #fcba0398;
  }

  input, select {
    padding: 5px 10px;
  }
  


  .input-container-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .submit-btn {
    background-color: #222;
    color:#fcba03;
    font-weight: bold;
    border: 1px solid #222;
    margin-top: 10px;
    padding: 10px;
    cursor: pointer;
    transition: .5s;
    max-width: 200px;
  }

  .submit-btn:hover {
    background-color: transparent;
    color: #222;
  }

</style>