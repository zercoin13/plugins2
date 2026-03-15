var SubscriptionsManager = {
  payDaily(id) {
    return this._pay(id, 'daily', 1);
  },

  payWeekly(id) {
    return this._pay(id, 'weekly', 7);
  },

  payMonthly(id) {
    return this._pay(id, 'monthly', 30);
  },

  giveTip(id) {
    if (!$gameParty) return false;
    const cost = this.getCost(id, 'tip');
    if ($gameParty.gold() < cost) return false;
    $gameParty.gainGold(-cost);
    this.setSwitch(id, 'tip', true);
    this.addTipToTotal(id, cost);
    return true;
  },

  _pay(id, type, durationDays) {
    if (!$gameParty) return false;
    const cost = this.getCost(id, type);
    if ($gameParty.gold() < cost) return false;
    $gameParty.gainGold(-cost);
    this.activateSubscription(id, type, durationDays);
    return true;
  },

  getCost(id, type) {
    const baseCosts = {
      daily: 100,
      weekly: 400,
      monthly: 1000,
      tip: 50
    };
    return baseCosts[type] || 0;
  },

  setSwitch(id, type, value) {
    const baseSwitches = {
      daily: 1000,
      weekly: 1100,
      monthly: 1200,
      tip: 1300
    };
    const switchId = baseSwitches[type] + id;
    $gameSwitches.setValue(switchId, value);
  },

  activateSubscription(id, type, durationDays) {
    const now = this.getCurrentGameDay();
    const expiration = now + durationDays;
    if (!$gameSystem._subscriptionData) $gameSystem._subscriptionData = {};
    if (!$gameSystem._subscriptionData[id]) $gameSystem._subscriptionData[id] = {};
    $gameSystem._subscriptionData[id] = {
      expires: expiration,
      type: type
    };

    // Apagar los tres tipos primero
    this.setSwitch(id, 'daily', false);
    this.setSwitch(id, 'weekly', false);
    this.setSwitch(id, 'monthly', false);

    // Encender solo el tipo actual
    this.setSwitch(id, type, true);
  },

  updateSubscriptions() {
    const now = this.getCurrentGameDay();
    if (!$gameSystem._subscriptionData) return;

    for (let id in $gameSystem._subscriptionData) {
      const data = $gameSystem._subscriptionData[id];
      if (data && data.expires <= now) {
        // Apagar el interruptor del tipo activo
        this.setSwitch(Number(id), data.type, false);
        delete $gameSystem._subscriptionData[id];
      }
    }
  },

  getCurrentGameDay() {
    if ($gameTime && typeof $gameTime.dayNumber === 'function') {
      return $gameTime.dayNumber();
    } else {
      return $gameVariables.value(999) || 0;
    }
  },

  addTipToTotal(id, amount) {
    const variableId = 1000 + id;
    const current = $gameVariables.value(variableId) || 0;
    $gameVariables.setValue(variableId, current + amount);
  }
};
