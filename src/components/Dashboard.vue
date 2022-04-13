<template>
<div>
  <Message :msg="msg" v-show="msg" />
  <div class="dash">
    <div class="card" v-for="request in requests" :key="request.id">
      <div class="id">
        <span>Pedido nº:</span>
        <p>{{ request.id }}</p>
      </div>
      <div class="name">
        <p>{{ request.nameRequest }}</p>
      </div>
      <div class="main">
        <div class="right">
          <div class="breadType">
            <span>Tipo do Pão: </span>
            <p>{{ request.breadTypeRequest }}</p>
          </div>
          <div class="burgerType">
            <span>Hamburguer: </span>
            <p>{{ request.burgerTypeRequest }}</p>
          </div>
          <div class="coldCuts">
            <span>Frios: </span>
            <ul v-for="(checkedColdCuts, index) in request.checkedColdCuts" :key="index">
              <li>{{ checkedColdCuts }}</li>
            </ul>
          </div>
          <div class="add">
            <span>Extras: </span>
            <ul v-for="(checkedExtras, index) in request.checkedExtras" :key="index">
              <li>{{ checkedExtras }}</li>
            </ul>
          </div>
        </div>
        <div class="left">
          <div class="breadMode">
            <span>Modo do Pão: </span>
            <p>{{ request.breadModeRequest }}</p>
          </div>
          <div class="spices">
            <span>Temperos: </span>
            <ul v-for="(checkedSpices, index) in request.checkedSpices" :key="index">
              <li>{{ checkedSpices }}</li>
            </ul>
          </div>
          <div class="salad">
            <span>Salada: </span>
            <ul v-for="(checkedSalad, index) in request.checkedSalad" :key="index">
              <li>{{ checkedSalad }}</li>
            </ul>
          </div>
          <div class="sauces">
            <span>Molhos: </span>
            <ul v-for="(checkedSauces, index) in request.checkedSauces" :key="index">
              <li>{{ checkedSauces }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="action">
        <select name="status" class="status" @change="updateBurger($event, request.id)">
          <option :value="s.type" v-for="s in status" :key="s.id" :selected="request.statusRequest == s.type">{{ s.type }}</option>
        </select>
        <button class="delete-btn" @click="deleteBurger(request.id)">Cancelar Pedido</button>
      </div>
    </div>
  </div>
</div>
      
</template>
<script>
import Message from './Message.vue'

export default {
  data() {
      return {
        requests: null,
        requests_id: null,
        status: [],
        msg: null
      }
    },
    methods: {
      async getPedidos() {
        const req = await fetch('https://ritasburger-api.herokuapp.com/requests')
        const data = await req.json()
        this.requests = data

        this.getStatus()
      },
      async getStatus() {
        const req = await fetch('https://ritasburger-api.herokuapp.com/status')
        const data = await req.json()
        this.status = data
      },
      async deleteBurger(id){
        const req = await fetch(`https://ritasburger-api.herokuapp.com/requests/${id}`, {
          method: "DELETE"
        })
        const res = await req.json()

        this.msg = "Pedido removido com sucesso!"
        setTimeout(() => this.msg = "", 3000)
        this.getPedidos();
      },
      async updateBurger (event, id) {
        const option = event.target.value;
        const dataJson = JSON.stringify({statusRequest: option});
        const req = await fetch(`https://ritasburger-api.herokuapp.com/requests/${id}`, {
          method: "PATCH",
          headers: {"Content-type":"application/json"},
          body: dataJson
        });
        const res = await req.json();
        this.msg = `Status do pedido nº: ${id} atualizado com sucesso!`
        setTimeout(() => this.msg = "", 3000)
      }
    },
    mounted () {
      this.getPedidos()
    },
    components: {
      Message
    }
  }
</script>
<style scoped>
  .dash {
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-size: .8em;
  }

  .card {
    width: 350px;
    height: 460px;
    background-color: #FFF;
    margin: 20px 10px;
    border: 2px solid #222;
    border-radius: 10px;
  }

  .id {
    background-color: #FCBA03;
    border-radius: 9px 9px 0 0;
    text-align: center;
    font-weight: bolder;
    font-size: 1em;
    padding: 5px;
    border-bottom: #222 solid 2px;
    display: flex;
    justify-content: center;
  }

  .id span {
    margin-right: 10px;
    font-weight: bold;
    font-size: 1em;
  }

  .name {
    padding: 10px;
    color: #222;
    font-weight: bold;
    font-size: 1em;
  }

  .bread, .burger, .colunm, .name {
    display: flex;
    justify-content: space-around;
    align-content: center;
    align-items: center;
  }

  .main, .action {
    display: flex;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;
  }

  .breadType, .breadMode {
    margin-top: 1em;
    height: 50px;
  }

  .burgerType, .spices, .sauces, .coldCuts, .add, .salad {
    height: 90px;
  }

  span {
    font-weight: bold;
    font-size: .8em;
    padding-left: 10px;
    border-left: 4px solid #fcba0398;
  }

  ul {
    padding-left: 20px;
  }

  li {
    list-style: circle;
  }

  .action {
    padding: 5px;
  }

  .action button {
    background-color: #222;
    color:#fcba03;
    font-weight: bold;
    border: 1px solid #222;
    margin-top: 10px;
    padding: 10px;
    cursor: pointer;
    transition: .5s;
    max-width: 200px;
    border-radius: 10px
  }

  .action button:hover {
    background-color: transparent;
    color: #222;
  }

  .action select {
    background-color: transparent;
    color: #222;
    border: 1px solid #222;
    margin-top: 10px;
    padding: 10px;
    cursor: pointer;
    transition: .5s;
    max-width: 200px;
    border-radius: 5px
  }
</style>