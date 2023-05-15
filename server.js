const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const colors = require('colors')
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;
// middle wares
app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
    res.send("Renix server is running now ");
});
app.listen(port, () => {
    console.log("Renix port running on".yellow.italic.bold, port.yellow.italic.bold);
});

const uri = process.env.DATABASE

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

// function verifyEmail(req, res, next) {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         return res.status(401).send({ message: "unauthorized access" });
//     }
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
//         if (err) {
//             return res.status(403).send({ message: "unauthorized access" });
//         }
//         req.decoded = decoded;
//         next();
//     });
// }

async function run() {
    try {
        const usersCollections = client.db('Renix-medicine-care').collection('users')


        // user post 
        app.post('/users', async (req, res) => {
            const user = req.body
            const query = { email: user.email }
            const alreadyUser = await usersCollections.findOne(query)

            if (alreadyUser) {
                return res.send({ acknowledged: true })
            }
            const result = await usersCollections.insertOne(user)
            res.send(result)

        })










    }
    catch {
        console.log('something is wrong');
    }

}
run().catch(err => {
    console.log(err);
});