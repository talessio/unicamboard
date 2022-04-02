import { supabase } from "../../../utils/supabase";
import cookie from 'cookie';
import initStripe from 'stripe';

const handler = async (req, res) => {
    //get user from cookie, avviene sul server (e dunque supabase non può passare il cookie per informarci su chi è l'utente che vuole pagare)
    const { user } = await supabase.auth.api.getUserByCookie(req);

    if (!user) {
        return res.status(401).send('Non autorizzato');
    };

    //abbiamo row level security sulla tabella profile, dunque usiamo cookie per far sapere a supabase chi vuole fare il pagamento
    const token = cookie.parse(req.headers.cookie)['sb:token'];

    supabase.auth.session = () => ({
        access_token: token,
    });

    const { data: { stripe_customer } } = await supabase
        .from('profile')
        .select('stripe_customer')
        .eq('id', user.id)
        .single()

    const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
    const { priceId } = req.query;

    const lineItems = [{
        price: priceId,
        quantity: 1
    }]

    const session = await stripe.checkout.sessions.create({
        customer: stripe_customer,
        mode: "payment",
        payment_method_types: ["card"],
        line_items: lineItems,
        success_url: "http://localhost:3000/payment_success",
        cancel_url: "http://localhost:3000/payment_cancel"
    });

    res.send({ id: session.id, });
};

export default handler;