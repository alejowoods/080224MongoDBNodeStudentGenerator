import Country from '../schema/CountrySchema.js'

export const getCountries = async (req, res) => {
    try {
        const { visited } = req.query; 
        let query = {};

        if (visited !== undefined) {
            query = { visited: visited === 'true' };
        }

        const countries = await Country.find(query);

        console.log("GET request received. Sending countries:", countries);
        res.json(countries);
    } catch (error) {
        console.error("Error in GET request:", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const postCountry = async (req, res) => {
    const newCountry = req.body; 
    console.log(newCountry);
    if (newCountry.visited && typeof newCountry.visited !== 'boolean') { 
        return res.status(400).json({message: "Invalid visited field"})
    }
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

};

export const getCountry = async (req, res) => {
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
};

export const putCountry = async (req, res) => {
    const code = req.params.code;
    const updatedCountryData = req.body;

    if (req.body.hasOwnProperty('visited') && typeof req.body.visited !== 'boolean') {
        return res.status(400).json({message: "Invalid visited field."});
    }
    

    try {
        const updatedCountry = await Country.findOneAndUpdate({
            $or: [
                {alpha2Code: code},
                {alpha3Code: code}
            ]
        }, updatedCountryData, {new: true});

        if(updatedCountry){
            res.json(updatedCountry);
            console.log("Country updated:", updatedCountry);
        } else {
            res.status(404).json({message: "Country not found"});
            console.log("Country not found");
        }
    } catch (error) {
        console.error("Error in PUT request", error.message);
        res.status(500).json({message: error.message});
    }
};

export const updateAllCountries = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const result = await Country.updateMany({}, { $set: req.body });
        console.log("Update result:", result);
        const updatedCountries = await Country.find({});
        console.log("Updated countries:", updatedCountries);
        res.json(updatedCountries);
    } catch (error) {
        console.error("Error in PUT request:", error.message);
        res.status(500).json({message: error.message});
    }
};

export const deleteCountry = async (req, res) => {
    const code = req.params.code;
    try {
        const deleteCountry = await Country.findOneAndDelete({
            $or: [
                {alpha2Code: code},
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
        res.status(500).json({ message: error.message });
    }
};