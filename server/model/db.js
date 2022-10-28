const mongoose = require('mongoose');
//Move uri to .env after finished
const uri = "mongodb+srv://khangluong2004:khangluong26052oo412@cluster0.ytc3no8.mongodb.net/?retryWrites=true&w=majority";


try {
    mongoose.connect(uri , { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose is connected"));
} catch(e){
    console.log(e)
}
