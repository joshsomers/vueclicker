<template>
  <div class="workers">
    <h2>Workers</h2>
    <div :key="index"
         class="item"
         v-for="(worker, index) in workers"
    >
      <div class="item-locked" v-if="worker.disabled">
        <i class="fas fa-lock"></i> Unlocks at Level {{ worker.unlocksAt }}
      </div>
      <div :class="`item-inner ${worker.disabled ? 'disabled' : ''}`">
        <div class="item-title">
          <h3>{{ worker.name }}</h3>
          <h4>+{{ kFormat(worker.cps) }}cps</h4>
        </div>
        <div class="item-actions">
          <button @click="() => buyWorker(index)"
          :class="`${worker.cost > coins ? 'disabled' : ''}`">
            <p class="add">+1</p>
            <p><img src="../assets/coin-white.svg" class="coin"> <span>{{ kFormat(worker.cost) }}</span></p>
          </button>
          <button @click="() => buyWorker(index, 10)"
                  :class="`${worker.cost * 10 > coins ? 'disabled' : ''}`">
            <p class="add">+10</p>
            <p><img src="../assets/coin-white.svg" class="coin"> <span>{{ kFormat(worker.cost * 10) }}</span></p>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "workers",
    computed: {
      coins (){
        return this.$store.state.coins;
      },
      workers() {
        return this.$store.getters.availableWorkers;
      }
    },
    methods: {
      kFormat(num) {
        if(Math.abs(num) > 999999){
          return Math.sign(num) * ((Math.abs(num) / 1000000).toFixed(1)) + 'm';
        } else if(Math.abs(num) > 9999){
          return Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k';
        } else {
          return Math.sign(num) * Math.abs(num);
        }
      },
      buyWorker (index, amount){
        this.$store.commit('buyWorker', {
          index,
          amount: amount ? amount : 1,
        });
      }
    }
  }
</script>

<style lang="scss">
  .workers {
    margin: 50px 0;
  }

  .item {
    background: var(--color-offwhite);
    position: relative;
    margin: 10px 0;

    &-inner{
      display: flex;
      position: relative;

      &.disabled{
        opacity:.2;
        pointer-events:none;
      }
    }
    &-locked{
      position: absolute;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
      font-weight:700;
    }

    &-title {
      padding: 20px;
    }

    &-actions {
      margin-left: auto;
      flex-shrink:0;

      button {
        width: 100px;
        background: var(--color-pri);
        border: 0;
        height: 100%;
        cursor:pointer;

        & + button{
          margin-left:1px;
        }

        &:active{
          background-color:#000;
        }
        &:focus{
          outline:0;
        }

        &.disabled{
          pointer-events:none;
          opacity:.5;
          background:var(--color-grey);
        }

        p {
          font-size: 15px;
          color: #fff;
          font-weight: 700;

          &.add {
            font-size: 20px;
          }
        }
      }
    }
  }
</style>