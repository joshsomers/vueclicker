<template>
  <div id="game">
    <div class="game-main">
      <Overview/>
      <Clicker/>
      <Upgrades/>
      <Workers/>
    </div>
    <!--
    Buffs, e.g. "Clicks count for 10 clicks for 30 seconds".
    EXP Bar
    Visual Workers
    -->
    <div class="game-breakdown">
      <Breakdown/>
    </div>
  </div>
</template>

<script>
  import Overview from './components/Overview';
  import Breakdown from './components/Breakdown';
  import Clicker from './components/Clicker';
  import Upgrades from './components/Upgrades';
  import Workers from './components/Workers';

  export default {
    name: 'App',
    components: {
      Overview,
      Breakdown,
      Clicker,
      Workers,
      Upgrades
    },
    methods: {
      loop() {
        // Game Loop
        this.$store.commit('coinsPerSecond');
        this.levelManager();
        requestAnimationFrame(this.loop);
      },
      levelManager() {
        if (this.$store.getters.nextLevel <= 0) {
          this.$store.commit('levelUp');
        }
      }
    },
    created() {
      this.loop();
    }
  }
</script>

<style lang="scss">
  :root {
    --color-pri: #29E173;
    --color-sec: #FFBE17;
    --color-offwhite: #F2F2F2;
    --color-grey: #9B9B9B;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Helvetica Neue', sans-serif;
  }

  #game {
    width: 1000px;
    margin: 0 auto;
    display: flex;

    .game-main {
      width: 70%;
      padding-right: 15px;
    }

    .game-breakdown {
      width: 30%;
      padding-left: 15px;
    }
  }

  .coin {
    height: 1em;
    display: inline-block;
    vertical-align: middle;

    & + span {
      vertical-align: middle;
    }
  }

  h1 {
    font-size: 40px;
  }

  h2 {
    font-size: 30px;
  }
</style>
