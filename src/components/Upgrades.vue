<template>
  <div class="upgrades">
    <h2>Upgrades</h2>
    <div :key="index"
         class="item"
         v-for="(upgrade, index) in upgrades"
    >
      <div class="item-inner">
        <div class="item-title">
          <h3>{{ upgrade.name }}</h3>
        </div>
        <div class="item-actions">
          <button @click="() => buyUpgrade(index)"
                  :class="`${upgrade.cost > coins ? 'disabled' : ''}`">
            <p class="add">+1</p>
            <p><img src="../assets/coin-white.svg" class="coin"> <span>{{ kFormat(upgrade.cost) }}</span></p>
          </button>
          <button @click="() => buyUpgrade(index, 10)"
                  :class="`${upgrade.cost * 10 > coins ? 'disabled' : ''}`">
            <p class="add">+10</p>
            <p><img src="../assets/coin-white.svg" class="coin"> <span>{{ kFormat(upgrade.cost * 10) }}</span></p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "upgrades",
    computed: {
      coins (){
        return this.$store.state.coins;
      },
      upgrades() {
        return this.$store.state.upgrades;
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
      buyUpgrade (index){
        this.$store.commit('cpcUp');
        this.$store.commit('buyUpgrade', {
          index,
          amount: 1
        });
      }
    }
  }
</script>

<style scoped lang="scss">
.upgrades{
  margin-top:50px;
}
</style>