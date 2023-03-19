import express, { Router } from "express";
const router = Router()
import { view, find, form, create, edit, update, remove, getuser } from "../controllers/userController.js"


router.post("/", find);
router.get('/adduser', form);
router.post('/adduser', create);
router.get('/viewuser/:id', getuser);
router.get('/edituser/:id', edit);
router.post('/edituser/:id', update);
router.get("/:id", remove);
router.get("/", view);


export default router