const express = require('express');
const router = express.Router();

router.get('/', (request, responce) => {
    responce.send('<h1>Library<h1>');
});

module.exports = router;