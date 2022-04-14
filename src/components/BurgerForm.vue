<template>
  <div>
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
          :options="options.breadType"/>
        </div>
        <div class="input-container">
          <InputSelect id="breadModes" 
          v-model="form.breadMode"
          label="Modo do Pão"
          :options="options.breadMode"/>
        </div>
        <div class="input-container">
          <InputSelect id="burgerTypes" 
          v-model="form.burgerType"
          label="Hamburguer"
          :options="options.burgerType"/>
        </div>


        <div class="opcionais-container">
          <label class="opcionais-title">
            Tempero
          </label>
          <div class="checkbox-container" v-for="item in options.spices" :key="item.id">
            <input type="checkbox" :value="item.type" v-model="form.spices">
            <span>{{ item.type }}</span>
          </div>
        </div>
        <div class="opcionais-container">
          <label class="opcionais-title">
            Frios
          </label>
          <div class="checkbox-container" 
          v-for="item in options.coldCuts" 
          :key="item.id">
            <input type="checkbox" 
            :value="item.type" 
            v-model="form.coldCuts">
            <span>{{ item.type }}</span>
          </div>
        </div>
        <div class="opcionais-container">
          <label class="opcionais-title">
            Salada
          </label>
          <div class="checkbox-container" 
          v-for="item in options.salads" 
          :key="item.id">
            <input type="checkbox" 
            :value="item.type" 
            v-model="form.salads">
            <span>{{ item.type }}</span>
          </div>
        </div>
        <div class="opcionais-container">
          <label class="opcionais-title">
            Extras
          </label>
          <div class="checkbox-container" 
          v-for="item in options.extras" 
          :key="item.id">
            <input type="checkbox"
            :value="item.type" 
            v-model="form.extras">
            <span>{{ item.type }}</span>
          </div>
        </div>
        <div class="opcionais-container">
          <label class="opcionais-title">
            Molhos
          </label>
          <div class="checkbox-container" 
          v-for="item in options.sauces" 
          :key="item.id">
            <input type="checkbox" 
            :value="item.type" 
            v-model="form.sauces">
            <span>{{ item.type }}</span>
          </div>
        </div>
        <div class="input-container-btn">
          <input type="submit" value="Finalizar Pedido" class="submit-btn">
        </div>
        {{ form }}
      </form>
    </div>
  </div>
</template>

<script>
import Message from './Message'
import InputText from '@/components/inputs/Text.vue'
import InputSelect from '@/components/inputs/Select.vue'
import Select from '@/components/inputs/Text.vue'
import Checkbox from '@/components/inputs/Checkbox.vue'

export default {
  name: "BurgerForm",
  components: {
    Message,
    InputText,
    InputSelect,
    Select,
    Checkbox
  },
  mounted () {
    this.getIngredients()
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
        breadTypes: [],
        breadModes: [],
        burgerType: [],
        spices: [],
        coldCuts: [],
        salads: [],
        extras: [],
        sauces: []
      },
      msg: null
    } 
  },
  methods: {
    async getIngredients() {
      const req = await fetch('https://ritasburger-api.herokuapp.com/ingredients')
      const data = await req.json()
      this.options.breadType = data.breadType
      this.options.breadMode = data.breadMode
      this.options.burgerType = data.burgerType
      this.options.spices = data.spices
      this.options.coldCuts = data.coldCuts
      this.options.salads = data.salad
      this.options.extras = data.extras
      this.options.sauces = data.sauces
    },
    async createBurger($event) {
      const data = {
        nameRequest: this.form.username,
        breadTypeRequest: this.form.breadType,
        breadModeRequest: this.form.breadMode,
        burgerTypeRequest: this.form.burgerType,
        checkedSpices: Array.from(this.form.spices),
        checkedColdCuts: Array.from(this.form.coldCuts),
        checkedSalad: Array.from(this.form.salads),
        checkedExtras: Array.from(this.form.extras),
        checkedSauces: Array.from(this.form.sauces),
        statusRequest: "Solicitado"
      }

      const jsonInText = JSON.stringify(data)

      const req = await fetch("https://ritasburger-api.herokuapp.com/requests", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: jsonInText
      });
      
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