'use strict'

import { Router } from 'express';
import { validateMiddleware, tourValidate as reqValidation } from "./validates/index.js";

import tourController from './handlers/tourAPIHandler.js';

const router = Router();

// list api of tours
router.get(
  '/',
  async (req, res, next) => {
    try {
      const result = await tourController.list(req.query);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
);

// get a tour by id
router.get(
  '/:id',
  validateMiddleware(reqValidation.get),
  async (req, res, next) => {
    try {
      const result = await tourController.get(req.params.id);
      if (!result) throw new Error("Hotel not found by id: " + req.params.id);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
);

// add a tour
router.post(
  '/',
  validateMiddleware(reqValidation.create),
  async (req, res, next) => {
    try {
      const result = await tourController.create(req.body);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
);

// update a tour
router.patch(
  '/:id',
  validateMiddleware(reqValidation.update),
  async (req, res, next) => {
    try {
      const result = await tourController.update(req.params.id, req.body);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
);

// delete a tour
router.delete(
  '/:id',
  validateMiddleware(reqValidation.delete),
  async (req, res, next) => {
    try {
      const result = await tourController.delete(req.params.id);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
);


export default router;