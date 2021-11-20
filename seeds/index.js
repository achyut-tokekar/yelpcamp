const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6190ff12bdeb348f9044ca06',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam maxime minus, id iusto, aspernatur, quo modi neque fugiat mollitia praesentium quae officiis dignissimos? Repellat similique magnam repellendus sunt sint vel.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: "https://res.cloudinary.com/dl4yx3vmj/image/upload/v1637087324/YelpCamp/vtk7bcolpsd3jdrlgvtu.jpg",
                    filename: "YelpCamp/vtk7bcolpsd3jdrlgvtu"
                },
                {
                    url: "https://res.cloudinary.com/dl4yx3vmj/image/upload/v1637087325/YelpCamp/jng97zhcnrqbldktcoox.jpg",
                    filename: "YelpCamp/jng97zhcnrqbldktcoox"
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})