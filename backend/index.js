// import cors from "cors";
// import express from "express";
// import Stripe from 'stripe';
// import { v4 as uuidv4 } from 'uuid'; 

// const app = express();
// app.use(cors());
// app.use(express.json());

// //Stripe

// const stripe = new Stripe('sk_test_51PiUSvRsJPFvYFKyZnDvTIpsaMxUY4oqILNYGb3OJ53gL8YIJ7FYsGvxVXIpMv2RjAfFWR5VSy2JzJgQ9ij5x3Jm004HyjbIt4');



// //Route

// app.post("/payment", async (req, res)=>{

//     const {product , token} = req.body;
//     console.log("Product", product);
//     console.log("Price", product.price);
//     const idempotencykey = uuidv4();
//     console.log(idempotencykey);

//     return stripe.customers.create({
//         email: token.email,
//         source: token.id
//     }).then(
//         customer => stripe.charges.create(
//             {
//                 amount: product.price * 100,
//                 currency: "usd",
//                 customer: customer.id,
//                 receipt_email: token.email,
//                 description: `Purchase of ${product.name}`,
//                 shipping: {
//                     name: token.card.name,
//                     address: {
                       
//                         country: token.card.address_country
                       
//                     }
//                 }
//             },
//             {
//                 idempotencykey
//             }
//         )
//     ).then(result => res.status(200).json(result))
//     .catch(err => console.log(err));

// });




// app.get("/", (req, res)=>{
//     console.log("Hello World");
//     res.send("Hello World");
// })


// //Listener

// app.listen(4000, ()=>{
//     console.log("Listening on port 4000");
// })



import cors from "cors";
import express from "express";
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid'; 
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

// Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Route
app.post("/payment", async (req, res) => {
    const { product, token } = req.body;
    console.log("Product", product);
    console.log("Price", product.price);
    const idempotencyKey = uuidv4();
    console.log(idempotencyKey);

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const charge = await stripe.charges.create(
            {
                amount: product.price * 100,
                currency: "usd",
                customer: customer.id,
                receipt_email: token.email,
                description: `Purchase of ${product.name}`,
                shipping: {
                    name: token.card.name,
                    address: {
                        country: token.card.address_country
                    }
                }
            },
            {
                idempotencyKey  // Use the idempotency key
            }
        );

        res.status(200).json(charge);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

app.get("/", (req, res) => {
    console.log("Hello World");
    res.send("Hello World");
});

// Listener
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});




