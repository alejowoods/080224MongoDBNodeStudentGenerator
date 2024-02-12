import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({  
    name: String,
    alpha2Code: String,
    alpha3Code: String
});

const Country = mongoose.model('Country', countrySchema);

export default Country;