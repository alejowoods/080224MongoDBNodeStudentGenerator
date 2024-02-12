import express from 'express';
import Country from '../schema/CountrySchema.js'; 

const wishlistRouter = express.Router();  // express.Router() es un middleware de direccionamiento que se utiliza para realizar funciones de direccionamiento en una aplicación.

wishlistRouter.get("/countries", async (req, res) => {
    try {
        const countries = await Country.find();
        console.log("GET request received. Sending countries:", countries);
        res.json(countries);
    } catch (error) {
        console.error("Error in GET request:", error.message);
        res.status(500).json({message: error.message});
    }
});

wishlistRouter.post("/countries", async (req, res) => {
    const newCountry = req.body; 
    console.log(newCountry);

    try {
        const countryExists = await Country.exists({ 
            $or: [ 
                { alpha2Code: newCountry.alpha2Code }, 
                { alpha3Code: newCountry.alpha3Code },
            ],
        });
        if (countryExists) {
            console.log("Country already exists. Returning 400 response.");
            return res.status(400).json({message: "Country already exists in the database."});
        } else {
            const savedCountry = await Country.create(newCountry);
            return res.status(201).json(savedCountry);
        }
    } catch (error) {
        console.error("Error in POST request:", error.message);
        res.status(500).json({message: error.message});
    }

});

wishlistRouter.get("/countries/:code", async (req, res) => {
    const code = req.params.code;
    try {
        const country = await Country.findOne({
            $or: [
                {alpha2Code: code},
                {alpha3Code: code}
            ]
        });
        console.log(country); 
        if (country) {
            res.json(country);
        } else {
            res.status(404).json({message: "Country not found"});
        }

    } catch (error) {
        console.error("Error in GET request", error.message);
        res.status(500).json({message: error.message});
    }
});

wishlistRouter.put("/countries/:code", async (req, res) => {
    const code = req.params.code;
    try {
        const updatedCountry = await Country.findOneAndUpdate({
            $or: [
                {apha2code: code},
                {alpha3Code: code}
            ]
        }, req.body, {new: true}); // new true es una opción que devuelve el documento modificado en lugar del original. new es un valor booleano que devuelve el documento modificado en lugar del original. Por defecto es falso. true devuelve el documento modificado. solicitamos que se devuelva el documento modificado por eso se pone true.

        if(updatedCountry){
            res.json(updatedCountry);
            console.log("Country updated:", updatedCountry);
        } else {
            res.status(404).json({message: "Country not found"});
            console.log("Country not found");
        };
    } catch (error) {
        console.error("Error in PUT request", error.message);
    }
});

wishlistRouter.delete("/countries/:code", async (req, res) => {
    const code = req.params.code;
    try {
        const deleteCountry = await Country.findOneAndDelete({
            $or: [
                {apha2code: code},
                {alpha3Code: code}
            ]
        });
        if (deleteCountry) {
            res.json(deleteCountry);
            console.log("Country Deleted:", deleteCountry);    
        }
        else {
            res.status(404).json({message: "Country not found"});
            console.log("Country not found");
        };
    } catch (error) {
        console.error("Error in PUT request", error.message);
    }
});

export default wishlistRouter;