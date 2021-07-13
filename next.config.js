module.exports = {
  images: {
    domains: ["links.papareact.com", "fakestoreapi.com"],
  },
  // only for publioc key
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};
