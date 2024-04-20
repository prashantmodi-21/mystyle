const express = require('express');
const Order = require('../models/Order');
const router = express.Router()
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY);
const URL = process.env.CLIENT_URL

let endpointSecret;
endpointSecret = process.env.WEBHOOK_ENDPOINT

router.post("/payment", async(req, res)=>{
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item)=>{
          return {
            price_data: {
              currency: 'inr',
              product_data: {
                name: item.desc,
              },
              unit_amount: (item.amount)*100,
            },
            quantity: item.qty,
          }
        }
      ),
        mode: 'payment',
        shipping_address_collection: {
          allowed_countries: ['IN'],
        },
        phone_number_collection: {
          enabled: true,
        },
        success_url: `${URL}/order?success=true`,
        cancel_url: `${URL}/order?failed=true`,
      });
      res.json(session)
})


const fulfillOrder = async(session, lineItems) => {
  // TODO: fill me in
  const order = new Order({orders: lineItems.data.map((item)=>({desc: item.description, qty: item.quantity})), amount: session.amount_total/100, name: session.customer_details.name, phone: session.customer_details.phone, email: session.customer_details.email, address: session.customer_details.address})
  await order.save()
}
router.post('/webhook', async(req, res) => {
  const payload = {
    id: req.body.id,
    object: req.body.type,
  };
  const payloadString = req.rawBody
  const sig = req.headers['stripe-signature'];
  let order;
  let eventType;
  if(endpointSecret){

    let event;
  
      try {
        event = stripe.webhooks.constructEvent(payloadString, sig, endpointSecret);
        order = event.data.object
        eventType = event.type
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`)
        return res.status(400).send(`Webhook Error: ${err.message}`);
      } 
  }
  else{
        order = req.body.data.object
        eventType = req.body.type
  }

  if (eventType === 'checkout.session.completed') {
    // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
    const session = await stripe.checkout.sessions.retrieve(
      order.id,
      {
        expand: ['line_items'],
      }
    );
    const lineItems = session.line_items;
    // Fulfill the purchase...
    fulfillOrder(session, lineItems);
  }

  res.status(200).end();
});
module.exports = router