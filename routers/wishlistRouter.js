import express from 'express';
import { getCountries, postCountry, getCountry, putCountry, deleteCountry, updateAllCountries } from '../controllers/CountriesController.js';

const wishlistRouter = express.Router();

wishlistRouter.get("/countries", getCountries);
wishlistRouter.post("/countries", postCountry);
wishlistRouter.get("/countries/:code", getCountry);
wishlistRouter.put("/countries", updateAllCountries);
wishlistRouter.put("/countries/:code", putCountry);
wishlistRouter.delete("/countries/:code", deleteCountry);


export default wishlistRouter;
