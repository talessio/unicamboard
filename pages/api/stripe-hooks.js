const handler = async (req, res) => {
    console.log("event received");

    res.send({ received: true });
};

export default handler;