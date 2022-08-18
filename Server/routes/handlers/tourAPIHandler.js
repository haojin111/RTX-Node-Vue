'use strict'

import models from "../../models/index.js";

const tourCtrl = {
  list: async function (params) {
    return models.Tour.findAll();
  },
  get: async function (id) {
    return models.Tour.findByPk(id);
  },
  create: async function (params) {
    const tour = await this.get(params.id);
    if (tour) throw new Error("A tour is already existed with id: " + tour.id);
    return models.Tour.create(params);
  },
  update: async function (id, params) {
    const tour = await this.get(id);
    if (!tour) {
      throw new Error("tour not found by id: " + id);
    }
    return models.Tour.update(params, {
      where: {
        id: id
      }
    });
  },
  delete: async function (id) {
    const tour = await this.get(id);
    if (!tour) {
      throw new Error("tour not found by id: " + id);
    }
    return tour.destroy({ force: true });
  },
}

export default tourCtrl;

