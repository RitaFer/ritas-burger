<template>
  <div id="burger-table">
    <div>
      <Message :msg="msg" v-show="msg" />
      <div id="burger-table-heading">
        <div class="order-id">#</div>
        <div>Cliente</div>
        <div>Pão</div>
        <div>Modo</div>
        <div>Hamburguer</div>
        <div>Temperos</div>
        <div>Frios</div>
        <div>Salada</div>
        <div>Extras</div>
        <div>Molhos</div>
      </div>
    </div>
    <div id="burger-table-rows">
      <div class="burger-table-row" v-for="request in requests" :key="request.id">
        <div class="order-number">{{ request.id }}</div>
        <div>{{ request.nameRequest }}</div>
        <div>{{ request.breadTypeRequest }}</div>
        <div>{{ request.breadModeRequest }}</div>
        <div>{{ request.burgerTypeRequest }}</div>
        <div>
          <ul v-for="(checkedSpices, index) in request.checkedSpices" :key="index">
            <li>{{ checkedSpices }}</li>
          </ul>
        </div>
        <div>
          <ul v-for="(checkedColdCuts, index) in request.checkedColdCuts" :key="index">
            <li>{{ checkedColdCuts }}</li>
          </ul>
        </div>
        <div>
          <ul v-for="(checkedSalad, index) in request.checkedSalad" :key="index">
            <li>{{ checkedSalad }}</li>
          </ul>
        </div>
        <div>
          <ul v-for="(checkedExtras, index) in request.checkedExtras" :key="index">
            <li>{{ checkedExtras }}</li>
          </ul>
        </div>
        <div>
          <ul v-for="(checkedSauces, index) in request.checkedSauces" :key="index">
            <li>{{ checkedSauces }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="action" v-for="request in requests" :key="request.id">
      <select name="status" class="status" @change="updateBurger($event, request.id)">
        <option :value="s.type" v-for="s in status" :key="s.id" :selected="request.statusRequest == s.type">{{ s.type }}</option>
      </select>
      <button class="delete-btn" @click="deleteBurger(request.id)">Cancelar Pedido</button>
    </div>
  </div>
</template>
<script>
import Message from './Message'

export default {
  name: "Dashboard",
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
  #burger-table {
    max-width: 100vw;
    margin: 0 auto;
  }
  #burger-table-heading,
  #burger-table-rows,
  .burger-table-row {
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
  #burger-table-heading {
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 3px solid #333;
  }

  ul li {
    list-style: none;
  }

  .burger-table-row {
    width: 100%;
    padding: 10px 0px;
    border-bottom: 1px solid #CCC;
    align-items: center;
  }
  #burger-table-heading div,
  .burger-table-row div {
    width: 19%;
  }
  #burger-table-heading .order-id,
  .burger-table-row .order-number {
    width: 5%;
  }

  .action {
    display: flex;
    justify-content: end;
    justify-items: end;
    margin: 10px
  }

  .delete-btn {
    background-color: #222;
    color:#fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin-left: 10px;
    cursor: pointer;
    transition: .5s;
  }
  
  .delete-btn:hover {
    background-color: transparent;
    color: #222;
  }
</style>