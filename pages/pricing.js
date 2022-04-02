import initStripe from "stripe";
import { useUser } from "../context/user";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const Pricing = ({ plans }) => {
    const { user } = useUser();

    const processPayment = planId => async () => {
        const { data } = await axios.get(`/api/payment/${planId}`);
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
        await stripe.redirectToCheckout({ sessionId: data.id });
    }

    return (
        <div>
            <div className="w-90 max-w-3xl mx-auto py-16 flex justify-around">
                {plans.map(plan => (
                    <div key={plan.id} className="h-auto w-64 rounded text-center shadow px-6 py-4">
                        <h2 className='font-semibold text-slate-500 text-2xl'>{plan.name}</h2>
                        <div className='text-md'>
                            {plan.description}
                            <br />
                            <button className="py-4" onClick={processPayment(plan.id)}>
                                € {plan.price / 100}
                                <br />
                                <a className="text-lg">Acquista</a>
                            </button>
                        </div>
                    </div>
                ))
                }
            </div>
            <div className="text-center">
                ----- visualizza solo se utente ha pagato -----
                <div className="w-90 max-w-3xl mx-auto py-16 flex justify-around">
                    <div className="h-auto w-64 rounded text-center shadow px-6 py-4">
                        <h2 className='font-semibold text-slate-500 text-2xl'>Cambia la tua id:</h2>
                        <div className='text-md'>
                            [box per cambiamento id]
                        </div>
                    </div>
                </div >
            </div>
        </div >
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