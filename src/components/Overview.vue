<template>
  <div class="overview">
    <div class="overview-total">
      <h4>Coins</h4>
      <h1><img class="coin" src="../assets/coin-gold.svg"> <span>{{ kFormat(coins) }}</span></h1>
    </div>
    <div class="overview-xp">
      <h3 class="level currentLevel">{{ level }}</h3>
      <div class="overview-xp-bar">
        <div :style="percentageBar"></div>
      </div>
      <h3 class="level nextLevel">{{ level + 1 }}</h3>
    </div>
    <div class="overview-stats">
      <div>
        <h4>Coins per second</h4>
        <h2>{{ kFormat(cps) }}</h2>
      </div>
      <div>
        <h4>Coins to next level</h4>
        <h2>{{ kFormat(nextLevel) }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "overview",
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
    },
    computed: {
      coins() {
        return Math.round(this.$store.state.coins);
      },
      cps() {
        return Math.round(this.$store.state.cps);
      },
      level() {
        return this.$store.state.player.level;
      },
      nextLevel() {
        return this.$store.getters.nextLevel;
      },
      xp() {
        return this.$store.state.coinsFromLevel / (this.$store.state.player.nextLevel / 100);
      },
      percentageBar () {
        return 'width: '+ this.xp +'%';
      }
    }
  }
</script>

<style lang="scss">
  .overview {
    padding: 50px 0;

    &-xp {
      margin: 30px 0;
      display: flex;
      align-items: center;

      &-bar {
        width: 100%;
        height: 10px;
        border-radius: 100px;
        background: var(--color-offwhite);
        overflow: hidden;

        > div {
          background: var(--color-pri);
          height:100%;
          width:0%;
        }
      }

      .level {
        width: 50px;

        &.nextLevel {
          text-align: right;
        }
      }
    }

    &-stats {
      display: flex;
      align-items: center;
      margin-top: 30px;

      > div {
        width: 100%;

        & + div {
          border-left: 1px solid black;
          padding-left: 30px;
        }
      }
    }
  }
</style>