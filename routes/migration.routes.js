const express = require('express');
const upload = require('../middleware/multer.middleware');
const migrationController = require('../controllers/migration.controller');
const router = express.Router();

router.post('/employees',upload.single('file'),migrationController.uploadEmployees);

module.exports = router;