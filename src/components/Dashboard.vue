<template>
<div>
  <Message :msg="msg" v-show="msg" />
  <div class="dash">
    <div class="card" v-for="request in requests" :key="request.id">
      <div class="id">
        <span>Pedido nº:</span>
        <p>{{ toId(request.id) }}</p>
      </div>
      <div class="name">
        <p>{{ request.username }}</p>
      </div>
      <div class="main">
        <div class="right">
          <div class="breadType">
            <span>Tipo do Pão: </span>
            <p>{{ request.breadType }}</p>
          </div>
          <div class="burgerType">
            <span>Hamburguer: </span>
            <p>{{ request.burgerType }}</p>
          </div>
          <div class="coldCuts">
            <span>Frios: </span>
            <ul v-for="(coldCuts, index) in request.coldCuts" :key="index">
              <li>{{ coldCuts }}</li>
            </ul>
          </div>
          <div class="add">
            <span>Extras: </span>
            <ul v-for="(extras, index) in request.extras" :key="index">
              <li>{{ extras }}</li>
            </ul>
          </div>
        </div>
        <div class="left">
          <div class="breadMode">
            <span>Modo do Pão: </span>
            <p>{{ request.breadMode }}</p>
          </div>
          <div class="spices">
            <span>Temperos: </span>
            <ul v-for="(spices, index) in request.spices" :key="index">
              <li>{{ spices }}</li>
            </ul>
          </div>
          <div class="salad">
            <span>Salada: </span>
            <ul v-for="(salad, index) in request.salad" :key="index">
              <li>{{ salad }}</li>
            </ul>
          </div>
          <div class="sauces">
            <span>Molhos: </span>
            <ul v-for="(sauces, index) in request.sauces" :key="index">
              <li>{{ sauces }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="action">
        <InputSelect id="status" v-model="request.status"
        @input="updateStatus(request)" :options="status"/>
        <button class="delete-btn" @click="deleteBurger(request.id)">Cancelar Pedido</button>
      </div>
    </div>
  </div>
</div>
      
</template>
<script>
import Message from './Message.vue'
import { reference } from '@/firebase'
import { onValue } from "firebase/database"
import Vue from 'vue'
import InputSelect from "@/components/inputs/Select"
import { setBurger, getBurgers } from '@/firebase'

export default {
  data() {
      return {
        requests: [],
        requests_id: null,
        status: [
          { id: 1, value: 'Em espera' },
          { id: 2, value: 'Em produção' },
          { id: 3, value: 'Finalizado' },
        ],
        msg: null
      }
    },
    methods: {
      async updateStatus ({ id, status, username }) {
        const oldData = await getBurgers().then(x => {
          return x?.[username] ?? []
        })
        const oldDate = oldData.map( item => {
          if (item.id === id) {
            return {
              ...item,
              status
            }
          }
          return item
        })
      },
      toId (id) {
        console.log('id', id)
        return id.slice(0, 5)
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
    computed: {
      testeAbc () {
        return teste
      }
    },
    mounted () {
      onValue(reference, (snapshot) => {
        snapshot.forEach(snap => {
          console.log(snap.val())
          this.requests = snap.val()
        })
      })
    },
    components: {
      Message,
      InputSelect
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