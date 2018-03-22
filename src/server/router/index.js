import express from 'express'
import config from '../config'
import apiRouter from './api'

const router = express.Router();

router.use('/api', apiRouter);

router.use('*', (req, res) => {
	return res.sendFile(config.paths.public)
});

module.exports = router