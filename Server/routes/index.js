'use strict'

import { Router } from 'express';
import validate from 'express-validation';

// 4. Import routes
import externalApi from './externalAPI.js';
import tourAPI from './tourAPI.js';

const router = Router({
  caseSensitive: true
})

// 5. Use imported routes in router
router.use('/', externalApi);

// tours CRUD apis definition
router.use('/tours', tourAPI);

// error handling
router.use((err, req, res, next) => {
  const httpStatusCode = err.status || 500;
  const content = {
    message: err.message
  };
  if (err instanceof validate.ValidationError) {
    content.fields = err.errors.map(e => e.message);
  }

  res.status(httpStatusCode).send({
    result: {
      success: false,
      status: httpStatusCode,
      content
    }
  });

  // can add other error log points here such as sentry.io
});

export default router;