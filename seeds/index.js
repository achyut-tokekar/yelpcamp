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

const imgUrl = [
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180080/YelpCamp/640px-ENTRANCEBANASURA_20190213093247_bhq0js.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180080/YelpCamp/Sangla_valley_03_20190214130336jpg_mq3mqz.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180080/YelpCamp/photo-1526491109672-74740652b963_jy9jge.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180080/YelpCamp/3_20190213130656_zesrry.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180080/YelpCamp/640px-Bhandak_Thaatch-_Camping_I_IMG_7385_20190213095502_bv1bjr.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180080/YelpCamp/tent-1208201_1920_20190212172038_hzcqkl.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180079/YelpCamp/photo-1470246973918-29a93221c455_p5uwru.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180079/YelpCamp/istockphoto-941906052-170667a_uewm4n.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180079/YelpCamp/39166148464_b1064bc57c_z_20190213104620_tqyhms.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180079/YelpCamp/adventure-camp-camping-699558_20190212181323_vkmkog.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180079/YelpCamp/istockphoto-1222972663-170667a_xmhp0u.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180078/YelpCamp/25439743351_5e7c669338_z_20190212183635_blv9ew.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180079/YelpCamp/40058688553_db7ca0c3f2_z_20190212185858_lc5wrj.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180077/YelpCamp/1207778_orig_20190213131841_ykxwsd.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180078/YelpCamp/33194533431_c342c7cbd4_z_20190213104322_hbaawc.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180077/YelpCamp/6677326239_f4074c97b8_z_20190212181551_rea2uc.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180077/YelpCamp/2817289154_46f7563db9_o_20190212181855_jlmlnq.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180077/YelpCamp/7727384446_40dc613114_z_20190213102605_oi2hkl.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180077/YelpCamp/4950209129_9346307437_z_20190212182353_uszjrv.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1638180077/YelpCamp/640px-Tsomoriri_Lake_DSC4010_20190212171119_y7p2ol.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1637406812/YelpCamp/uqkryfoclalts2vxge4u.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1637404615/YelpCamp/mmlt7qislynkfvgt6gl5.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1637084385/YelpCamp/me6cccprwnhwtgerru6u.jpg',
    'https://res.cloudinary.com/dl4yx3vmj/image/upload/v1637082457/YelpCamp/wrhz0wx7ciapn10jybhx.jpg'
];
const userId = ['61a4cbeb19e913a99a93a838', '61a4cbbc19e913a99a93a715', '61a4cb6919e913a99a93a5f2', '61a4cadc19e913a99a93a16c', '61a4c9f019e913a99a93a049', '61a4c9d519e913a99a939f26', '61a4c94919e913a99a939e03', '61a4c92919e913a99a939ce0', '61a4c8b219e913a99a939bb8'];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < cities.length; i++) {
        const randomUrl1 = Math.floor(Math.random() * imgUrl.length);
        const randomUrl2 = Math.floor(Math.random() * imgUrl.length);
        const randomUser = Math.floor(Math.random() * userId.length);
        const price = Math.floor(Math.random() * 800) + 100;
        const camp = new Campground({
            author: userId[randomUser],
            location: `${cities[i].city}, ${cities[i].state}`,
            title: `${cities[i].title}`,
            description: `${cities[i].description}`,
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[i].longitude,
                    cities[i].latitude,
                ]
            },
            images: [
                {
                    url: imgUrl[randomUrl1],
                    filename: "YelpCamp/mmlt7qislynkfvgt6gl5"
                },
                {
                    url: imgUrl[randomUrl2],
                    filename: "YelpCamp/wrhz0wx7ciapn10jybhx"
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})


