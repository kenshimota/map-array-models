const MapModels = (data) => ({
  /**
   * get max id got it
   */
  maxId: Math.max(...data.map((current) => current.id)) || 0,

  /**
   * created a map from array because the key is faster than loop inside array
   */
  data: new Map(
    data.map((current) => [
      current.id,
      { createdAt: new Date(), updatedAt: new Date(), ...current },
    ])
  ),

  /**
   * get a record it cost will be O(1), on the other hand very fast
   * @param {any} id
   * @return {object | null}
   */
  getId: function (id) {
    return this.data.get(id);
  },

  /**
   * Function that get all elements
   * @param {Function<boolean>} callback
   * @return {object[]}
   */
  getAll: function (callback) {
    const result = [];

    if (!callback) {
      return this.data.values();
    }

    for (const [_, data] of this.data) {
      const bool = callback(data);
      if (!bool) {
        continue;
      }
      result.push(data);
    }

    return result;
  },

  /**
   * Function that insert a new data to map
   * @param {object} data
   * @return {object}
   */
  insert: function (data) {
    const newId = (this.maxId || 0) + 1;
    const values = {
      id: newId,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };

    if (this.data.has(values.id)) {
      throw new Error(`id(${values.id}) already exists`);
    }

    this.data.set(values.id, values);
    this.maxId = Math.max(this.maxId, values.id);

    return values;
  },

  /**
   * Function that change values from a records if exists
   * @param {Function<boolean>} callback
   * @param {any} fromId
   * @param {object} set
   * @return {number}
   */
  update: function ({ callback, fromId, set }) {
    let counted = 0;
    const record = this.data.get(fromId) || null;

    if (fromId && !record) {
      throw new Error(`id(${fromId}) not found`);
    }

    if (fromId && record) {
      counted++;
      const newRecord = { ...record, updatedAt: new Date(), ...set };
      this._checkNotRepeatId(newRecord.id, record);
      this.data.set(fromId, newRecord);
      return counted;
    }

    const records = this.getAll(callback);

    for (const data of records) {
      counted++;
      const newRecord = { ...data, ...set };

      this._checkNotRepeatId(newRecord.id, data);

      this.data.set(data.id, newRecord);
    }

    return counted;
  },

  /**
   * Function that check if don't repeat
   * @param {any} id
   * @return {boolean}
   */
  _checkNotRepeatId: function (id, beforeData) {
    const record = this.data.get(id);

    if (record && record !== beforeData) {
      throw new Error(`id(${id}) already exists`);
    }

    return true;
  },
});
