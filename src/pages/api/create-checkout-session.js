// backend code
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: "zar",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1J4Wi3B9iVMmMDrs92HfSzBt"],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "ZA"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};

// yarn add axios
// make request to this end point in api
// yarn add axios
// make request to this end point in api
// stripe items and email
// axios and stripe corrected
// redirect user/customer to stripe checkout session
// onclick then redirect to strip payment page
