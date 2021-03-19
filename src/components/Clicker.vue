<template>
  <div>
    <button @click="click">
      Earn <img class="coin" src="../assets/coin-white.svg"> <span>{{ Math.ceil(this.$store.state.cpc) }}</span>
    </button>
  </div>
</template>

<script>
  export default {
    name: "clicker",
    methods: {
      click () {
        this.$store.commit('incrementCoins', Math.ceil(this.$store.state.cpc));
        this.$store.commit('incrementClicksTotal', Math.ceil(this.$store.state.cpc));
        this.$store.commit('incrementClicks', 1);
      }
    }
  }
</script>

<style scoped lang="scss">
  button{
    width:100%;
    background:var(--color-sec);
    border:0;
    height:70px;
    color: #fff;
    font-size:25px;
    font-weight:700;
    cursor:pointer;
    &:active{
      transform:scale(0.99);
    }
    &:focus{
      outline:0;
    }
  }
</style>