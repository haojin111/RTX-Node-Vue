'use strict'

import models from "../../models/index.js";

const hotelCtrl = {
  list: async function (params) {
    return models.Hotel.findAll();
  },
  get: async function (id) {
    return models.Hotel.findByPk(id);
  },
  create: async function (params) {
    const hotel = await this.get(req.body.id);
    if (hotel) throw new Error("A Hotel is already existed with id: " + hotel.id);
    return models.Hotel.create(params);
  },
  update: async function (id, params) {
    const hotel = await this.get(id);
    if (!hotel) {
      throw new Error("Hotel not found by id: " + id);
    }
    return models.Hotel.update(params, {
      where: {
        id: id
      }
    });
  },
  delete: async function (id) {
    const hotel = await this.get(id);
    if (!hotel) {
      throw new Error("Hotel not found by id: " + id);
    }
    return hotel.destroy({ force: true });
  },
}

export default hotelCtrl;

