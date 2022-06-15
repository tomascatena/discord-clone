import express from 'express';

const router = express.Router();

/**
 * @route POST api/v1/auth
 * @desc Register a new user
 * @access Private
 */
router.post('/register', (req, res) => {
  res.send('Register route');
});

router.post('/login', (req, res) => {
  res.send('Login route');
});

export default router;
