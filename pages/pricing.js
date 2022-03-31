import initStripe from "stripe";

const Pricing = ({ plans }) => {
    return (
        <div>
            {plans.map(plan => (
                <div key={plan.id}>
                    <h2 className='font-semibold text-slate-500 text-2xl'>{plan.name}</h2>
                    <p className='text-md'>
                        {plan.description}
                    </p>
                    <button>€ {plan.price / 100}</button>
                </div>
            ))}
        </div>
    );
};

export const getStaticProps = async () => {
    const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

    const { data: prices } = await stripe.prices.list();

    const plans = await Promise.all(prices.map(async (price) => {
        const product = await stripe.products.retrieve(price.product);
        return {
            id: price.id,
            name: product.name,
            description: product.description,
            price: price.unit_amount,
            currency: price.currency
        };
    }));

    return {
        props: {
            plans,
        },
    };
};

export default Pricing;