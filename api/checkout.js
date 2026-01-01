const { MercadoPagoConfig, Preference } = require('mercadopago');

// Configurando com o seu Access Token da imagem
const client = new MercadoPagoConfig({ 
    accessToken: 'APP_USR-8243465362432495-123112-aa2d2768ae5afae70e300467688143ce-2263012831' 
});

const preference = new Preference(client);

async function criarPreferencia() {
    try {
        const response = await preference.create({
            body: {
                items: [
                    {
                        title: 'Livro Os Segredários',
                        quantity: 1,
                        unit_price: 7.00,
                        currency_id: 'BRL'
                    }
                ],
                // URLs para onde o cliente vai após pagar
                back_urls: {
                    success: "https://www.google.com", // Mude para o link do seu site depois
                    failure: "https://www.google.com"
                },
                auto_return: "approved",
            }
        });

        console.log("\n===============================================");
        console.log("SEU PREFERENCE ID É:");
        console.log(response.id);
        console.log("===============================================\n");
    } catch (error) {
        console.error("Erro ao gerar ID:", error);
    }
}

criarPreferencia();
