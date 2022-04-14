<template>
  <div>
    <div>
      <form id="burger-form" @submit.prevent="createBurger">
        <h1>Monte o seu burger ♥</h1>
        <Message :msg="msg" v-show="msg" />
        <InputText type="text" label="Nome" placeholder="Digite seu nome" v-model="nameRequest" />
        
        

        <div class="input-container">
          <label for="breadType">
            Pão
          </label>
          <select name="breadTypeRequest" id="breadTypeRequest" v-model="breadTypeRequest">
            <option v-for="breadTypeRequest in breadType" :key="breadTypeRequest.id" :value="breadTypeRequest.type">{{ breadTypeRequest.type }}</option>
          </select>
        </div>
        <div class="input-container">
          <label for="breadMode">
            Modo do Pão
          </label>
          <select name="breadModeRequest" id="breadModeRequest" v-model="breadModeRequest">
            <option v-for="breadModeRequest in breadMode" :key="breadModeRequest.id" :value="breadModeRequest.type">{{ breadModeRequest.type }}</option>
          </select>
        </div>
        <div class="input-container">
          <label for="burgerType">
            Hamburguer
          </label>
          <select name="burgerTypeRequest" id="burgerTypeRequest" v-model="burgerTypeRequest">
            <option v-for="burgerTypeRequest in burgerType" :key="burgerTypeRequest.id" :value="burgerTypeRequest.type">{{ burgerTypeRequest.type }}</option>
          </select>
        </div>


        <div class="opcionais-container">
          <label class="opcionais-title" for="spices">
            Tempero
          </label>
          <div class="checkbox-container" v-for="spicesRequest in spices" :key="spicesRequest.id">
            <input type="checkbox" name="spicesRequest" :value="spicesRequest.type" v-model="checkedSpices">
            <span>{{ spicesRequest.type }}</span>
          </div>
        </div>
        <div class="opcionais-container">
          <label class="opcionais-title" for="coldCuts">
            Frios
          </label>
          <div class="checkbox-container" v-for="coldCutsRequest in coldCuts" :key="coldCutsRequest.id">
            <input type="checkbox" name="coldCutsRequest" :value="coldCutsRequest.type" v-model="checkedColdCuts">
            <span>{{ coldCutsRequest.type }}</span>
          </div>
        </div>
        <div class="opcionais-container">
          <label class="opcionais-title" for="salad">
            Salada
          </label>
          <div class="checkbox-container" v-for="saladRequest in salad" :key="saladRequest.id">
            <input type="checkbox" name="saladRequest" :value="saladRequest.type" v-model="checkedSalad">
            <span>{{ saladRequest.type }}</span>
          </div>
        </div>
        <div class="opcionais-container">
          <label class="opcionais-title" for="extras">
            Extras
          </label>
          <div class="checkbox-container" v-for="extrasRequest in extras" :key="extrasRequest.id">
            <input type="checkbox" name="extrasRequest" :value="extrasRequest.type" v-model="checkedExtras">
            <span>{{ extrasRequest.type }}</span>
          </div>
        </div>
        <div class="opcionais-container">
          <label class="opcionais-title" for="sauces">
            Molhos
          </label>
          <div class="checkbox-container" v-for="saucesRequest in sauces" :key="saucesRequest.id">
            <input type="checkbox" name="saucesRequest" :value="saucesRequest.type" v-model="checkedSauces">
            <span>{{ saucesRequest.type }}</span>
          </div>
        </div>
        <div class="input-container-btn">
          <input type="submit" value="Finalizar Pedido" class="submit-btn">
          </div>
      </form>
    </div>
  </div>
</template>

<script>
import Message from './Message'
import InputText from '@/components/inputs/Text.vue'
import Select from '@/components/inputs/Text.vue'
import Checkbox from '@/components/inputs/Checkbox.vue'

export default {
  name: "BurgerForm",
  data() {
    return {
      breadType: null,
      breadMode: null,
      burgerType: null,
      spices: [],
      coldCuts: [],
      salad: [],
      extras: [],
      sauces: [],
      nameRequest: null,
      breadTypeRequest: null,
      breadModeRequest: null,
      burgerTypeRequest: null,
      checkedSpices: [],
      checkedColdCuts: [],
      checkedSalad: [],
      checkedExtras: [],
      checkedSauces: [],
      msg: null
    } 
  },
  methods: {
    async getIngredients() {
      const req = await fetch('https://ritasburger-api.herokuapp.com/ingredients')
      const data = await req.json()
  
      this.breadType = data.breadType
      this.breadMode = data.breadMode
      this.burgerType = data.burgerType
      this.spices = data.spices
      this.coldCuts = data.coldCuts
      this.salad = data.salad
      this.extras = data.extras
      this.sauces = data.sauces
    },
    async createBurger() {
      console.log(this.nameRequest)
      const data = {
        nameRequest: this.nameRequest,
        breadTypeRequest: this.breadTypeRequest,
        breadModeRequest: this.breadModeRequest,
        burgerTypeRequest: this.burgerTypeRequest,
        checkedSpices: Array.from(this.checkedSpices),
        checkedColdCuts: Array.from(this.checkedColdCuts),
        checkedSalad: Array.from(this.checkedSalad),
        checkedExtras: Array.from(this.checkedExtras),
        checkedSauces: Array.from(this.checkedSauces),
        statusRequest: "Solicitado"
      }

      const dataJson = JSON.stringify(data)

      const req = await fetch("https://ritasburger-api.herokuapp.com/requests", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: dataJson
      });
      
      const res = await req.json()
      console.log(res)

      this.msg = "Pedido realizado com sucesso!"
      setTimeout(() => this.msg = "", 3000)

      this.nameRequest = ""
      this.breadTypeRequest = ""
      this.breadModeRequest = ""
      this.burgerTypeRequest = ""
      this.checkedSpices = []
      this.checkedColdCuts = []
      this.checkedSalad = []
      this.checkedExtras = []
      this.checkedSauces = []
    }
  },
    mounted () {
      this.getIngredients()
    },
    components: {
      Message,
      InputText,
      Select,
      Checkbox
    }
}
</script>

<style scoped>

  #burger-form {
    max-width: 500px;
    background-color: #FFF;
    margin: 50px auto 50px 50px;
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
  
  .opcionais-container {
    display: flex;
    margin-bottom: 10px;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .opcionais-title {
    width: 100%;
  }

  .checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 10px;
  }

  .checkbox-container span,
  .checkbox-container input {
    width: auto;
  }

  .checkbox-container span {
    margin-left: 10px;
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