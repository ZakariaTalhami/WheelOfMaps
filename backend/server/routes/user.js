import {Router} from 'express';
const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({"location": "users"});
});

export default router;
