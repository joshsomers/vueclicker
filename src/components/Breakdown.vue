<template>
  <div class="breakdown">
    <h2>Stonks</h2>
    <table>
      <tr class="worker" v-if="clicks > 0">
        <td class="name" style="width:40%;"><h4>Clicks</h4></td>
        <td class="quantity" style="width:10%;">x{{ clicks }}</td>
        <td class="earned" style="width:50%;">{{ kFormat(Math.round(clicksTotal)) }}</td>
      </tr>
      <tr :key="index"
          class="worker"
          v-for="(worker, index) in workers"
      >
        <td class="name" style="width:40%;"><h4>{{ worker.name }}</h4></td>
        <td class="quantity" style="width:10%;">x{{ worker.quantity }}</td>
        <td class="earned" style="width:50%;">{{ kFormat(Math.round(worker.earned)) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "breakdown",
    methods: {
      kFormat(num) {
        if(Math.abs(num) > 999999){
          return Math.sign(num) * ((Math.abs(num) / 1000000).toFixed(1)) + 'm';
        } else if(Math.abs(num) > 9999){
          return Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k';
        } else {
          return Math.sign(num) * Math.abs(num);
        }
      }
    },
    computed: {
      clicksTotal() {
        return this.$store.state.clicksTotal;
      },
      clicks() {
        return this.$store.state.clicks;
      },
      workers() {
        return this.$store.getters.purchasedWorkers;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .breakdown {
    margin-top: 50px;
  }

  table {
    border-collapse: collapse;
    margin-top: 30px;

    tr {
      border-bottom:1px solid rgba(#000,.1);
      td {
        padding: 10px 0;
        font-weight: 700;

        & + td {
          padding-left: 10px;
        }

        &.quantity {
          text-align: center;
        }

        &.earned {
          text-align: right;
        }
      }
    }
  }
</style>