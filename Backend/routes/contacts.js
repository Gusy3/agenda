'use strict'

import express from "express";
import ContactController from "../controllers/contacts.js";

var router= express.Router();

router.post('/save', ContactController.save);
router.get('/contacts', ContactController.getContacts);
router.get('/birthdays', ContactController.getBirthdays);
router.get('/contact/:id', ContactController.getContact);
router.put('/contact/:id', ContactController.update);
router.delete('/contact/:id', ContactController.delete);
router.get('/search', ContactController.search);

 export default router;