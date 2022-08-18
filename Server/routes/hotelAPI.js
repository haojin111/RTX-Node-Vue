'use strict'

import { Router } from 'express';
import { validateMiddleware, hotelValidate as reqValidation } from "./validates/index.js";

import hotelController from './handlers/hotelAPIHandler.js';

const router = Router();

// list api of hotels
router.get(
  '/',
  async (req, res, next) => {
    try {
      const result = await hotelController.list(req.query);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
);

// get a hotel by id
router.get(
  '/:id',
  validateMiddleware(reqValidation.get),
  async (req, res, next) => {
    try {
      const result = await hotelController.get(req.params.id);
      if (!result) throw new Error("Hotel not found by id: " + req.params.id);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
);

// add a hotel
router.post(
  '/',
  validateMiddleware(reqValidation.create),
  async (req, res, next) => {
    try {
      const result = await hotelController.create(req.body);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
);

// update a hotel
router.patch(
  '/:id',
  validateMiddleware(reqValidation.update),
  async (req, res, next) => {
    try {
      const result = await hotelController.update(req.params.id, req.body);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
);

// delete a hotel
router.delete(
  '/:id',
  validateMiddleware(reqValidation.delete),
  async (req, res, next) => {
    try {
      const result = await hotelController.delete(req.params.id);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
);


export default router;