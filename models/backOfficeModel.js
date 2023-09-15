const mongoose =  require("mongoose");

/* questo è lo schema per inserire veicoli nuovi nella pagina ImageGalley*/

const BackOfficeSchema = new mongoose.Schema(
    {
        carBrand: {
            type: String,
            required: true,
        },
        carName: {
            type: String,
            required: true,
        },
        carPicture: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        contact: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }, 
    },
    {
        timestamps: true,
        strict: true,
    },

);


module.exports = mongoose.model("Backoffice", BackOfficeSchema, "backoffice");