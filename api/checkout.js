const { MercadoPagoConfig, Preference } = require('mercadopago');

export default async function handler(req, res) {
    const client = new MercadoPagoConfig({ 
        accessToken: 'APP_USR-8243465362432495-123112-aa2d2768ae5afae70e300467688143ce-2263012831' 
    });

    const preference = new Preference(client);

    try {
        const response = await preference.create({
            body: {
                items: [{
                    title: 'Livro Segredários',
                    quantity: 1,
                    unit_price: 7.00,
                    currency_id: 'BRL'
                }],
                auto_return: "approved",
                back_urls: {
                    success: `https://${req.headers.host}/compras.html`,
                    failure: `https://${req.headers.host}/compras.html`
                }
            }
        });
        res.status(200).json({ id: response.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
