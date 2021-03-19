import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coins: 0,
    totalCoins: 0,
    coinsFromLevel: 0,
    cps: 0,
    cpc: 1,
    cpcInflation: 1.4,
    clicks: 0,
    clicksTotal: 0,
    player: {
      name: "",
      level: 0,
      nextLevel: 10,
      inflation: 2
    },
    upgrades: [
      {
        name: "Click Upgrade",
        quantity: 0,
        cost: 5,
        inflation: 1.7,
      }
    ],
    workers: [
      {
        name: "Lemonade Stand",
        cost: 50,
        inflation: 1.2,
        cps: 2,
        quantity: 0,
        unlocksAt: 0,
        earned: 0,
      },
      {
        name: "Burger Van",
        cost: 200,
        inflation: 1.5,
        cps: 20,
        quantity: 0,
        unlocksAt: 2,
        earned: 0,
      },
      {
        name: "Ramen Stall",
        cost: 600,
        inflation: 1.5,
        cps: 100,
        quantity: 0,
        unlocksAt: 5,
        earned: 0,
      },
      {
        name: "Kebab Shop",
        cost: 2900,
        inflation: 1.5,
        cps: 500,
        quantity: 0,
        unlocksAt: 10,
        earned: 0,
      },
      {
        name: "Curry House",
        cost: 15000,
        inflation: 1.5,
        cps: 3300,
        quantity: 0,
        unlocksAt: 14,
        earned: 0,
      },
      {
        name: "Sushi Bar",
        cost: 52000,
        inflation: 1.5,
        cps: 11500,
        quantity: 0,
        unlocksAt: 20,
        earned: 0,
      }
    ],
  },
  mutations: {
    coinsPerSecond: state => {
      state.cps = 0;
      state.workers.forEach(worker => {
        state.cps += (worker.cps * worker.quantity);
        state.coins += (worker.cps * worker.quantity) / 60;
        state.totalCoins += (worker.cps * worker.quantity) / 60;
        state.coinsFromLevel += (worker.cps * worker.quantity) / 60;
        worker.earned += (worker.cps * worker.quantity) / 60;
      });
    },
    incrementCoins: (state, increment) => {
      state.coins += increment;
      state.totalCoins += increment;
      state.coinsFromLevel += increment;
    },
    incrementClicks: (state, amount) => {
      state.clicks += amount;
    },
    incrementClicksTotal: (state, increment) => {
      state.clicksTotal += increment;
    },
    levelUp: state => {
      state.player.level++;
      state.player.nextLevel *= state.player.inflation;
      state.coinsFromLevel = 0;
    },
    cpcUp: state => {
      state.cpc *= state.cpcInflation;
    },
    buyWorker: (state, {index, amount}) => {
      if (state.coins >= state.workers[index].cost) {
        state.coins -= state.workers[index].cost;
        state.workers[index].quantity += amount;
        state.workers[index].cost = Math.round(state.workers[index].cost * state.workers[index].inflation);
      } else {
        alert('You need more coins');
      }
    },
    buyUpgrade: (state, {index, amount}) => {
      if(state.coins >= state.upgrades[index].cost) {
        state.coins -= state.upgrades[index].cost;
        state.upgrades[index].quantity += amount;
        state.upgrades[index].cost = Math.round(state.upgrades[index].cost * state.upgrades[index].inflation);
      } else {
        alert('You need more coins');
      }
    }
  },
  getters: {
    nextLevel: state => {
      return Math.round(state.player.nextLevel - state.coinsFromLevel);
    },
    availableWorkers: state => {
      return state.workers.filter(worker => {
        if (worker.unlocksAt <= state.player.level) {
          worker.disabled = false;
        } else {
          worker.disabled = true;
        }
        return worker;
      });
    },
    purchasedWorkers: state => {
      return state.workers.filter(worker => {
        if (worker.quantity > 0) {
          return worker;
        }
      });
    }

  }
})
