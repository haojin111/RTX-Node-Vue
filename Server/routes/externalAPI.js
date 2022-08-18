'use strict'

import { Router } from 'express';
import handler from './handlers/externalAPIHandler.js';

const router = Router();

router.get(
  '/fromSource',
  async (req, res, next) => {
    try {
      // 6. Call handler to response with data
      const result = await handler.getListFromAPI();
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
)

export default router;