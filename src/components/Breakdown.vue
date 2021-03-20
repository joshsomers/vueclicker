<template>
  <div class="breakdown">
    <h2>Stonks</h2>
    <div class="worker-wrapper">
      <div class="worker" v-if="clicks > 0">
        <div class="worker-title">
          <h4>Clicks</h4>
          <div>
            <span class="worker-title-quantity">x{{ clicks }}</span>
            <span class="worker-title-earned"><img class="coin" src="../assets/coin-black.svg"> <span>{{ kFormat(Math.round(clicksTotal)) }}</span></span>
          </div>
        </div>
      </div>
      <div :key="index"
           class="worker"
           v-for="(worker, index) in workers"
      >
        <div class="worker-title">
          <h4>{{ worker.name }}</h4>
          <div>
            <span class="worker-title-quantity">x{{ worker.quantity }}</span>
            <span class="worker-title-cps">{{ kFormat(worker.cps * worker.quantity) }}/s</span>
            <span class="worker-title-earned"><img alt="" class="coin" src="../assets/coin-black.svg"> <span>{{ kFormat(Math.round(worker.earned)) }}</span></span>
          </div>
        </div>
        <div class="worker-view">
          <div :key="n" class="item" v-for="n in worker.quantity"><i class="fas" :class="'fa-'+ worker.icon"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "breakdown",
    methods: {
      kFormat(num) {
        if (Math.abs(num) > 999999) {
          return Math.sign(num) * ((Math.abs(num) / 1000000).toFixed(1)) + 'm';
        } else if (Math.abs(num) > 9999) {
          return Math.sign(num) * ((Math.abs(num) / 1000).toFixed(0)) + 'k';
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

  .worker-wrapper {
    margin-top:10px;
    .worker {
      padding: 20px;
      background: var(--color-offwhite);

      & + .worker {
        margin-top: 10px;
      }

      &-view {
        display: flex;
        flex-wrap: wrap;
        margin-top:20px;

        .item{
          margin:0;
          width:3%;
          height:30px;
        }
        i{
          line-height:1;
        }
      }

      &-title {
        display: flex;


        > div {
          margin-left: auto;

          > span {
            display: inline-block;
            width: 90px;
            text-align: right;
          }
        }
      }
    }
  }
</style>