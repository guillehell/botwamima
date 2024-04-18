const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const flowQuilpue = addKeyword(['1', 'Quilpue']).addAnswer(
    [   
        '*En Quilpué tenemos 4 opciones a la fecha*',
        '\n*1* Desayuno A Domicilio SKU IOIA-17 - https://mimandote.cl/cl/detalle-producto/36',
        '\n*2* Desayuno A Domicilio SKU IOIA-16 - https://mimandote.cl/cl/detalle-producto/35',
        '\n*3* Desayuno A Domicilio SKU IOIA-15 - https://mimandote.cl/cl/detalle-producto/34',
        '\n*4* Desayuno A Domicilio SKU IOIA-14 - https://mimandote.cl/cl/detalle-producto/33'
    ].join('')
)
const flowSerena = addKeyword(['2', 'Serena']).addAnswer(['📄 Aquí tenemos el flujo La Serena'])

const flowDesa = addKeyword(['desa', 'desayuno', 'domicilio' , 'desayunos']).addAnswer(
    [
        'Presionar el numero correspondiente',
        '\n*1* Desayunos en Quilpué, Villa Alemana, Valparaíso',
        '\n*2* Desayunos en La Serena, Coquimbo',
    ],
    null,
    null,
    [flowQuilpue],
    [flowSerena]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null
)

const flowProveedor = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola soy Mimador, el bot de *Mimándote*. Te doy una cordial bienvenida. En cualquier momento podrás hablar con un humano si asi lo requieres.')
    .addAnswer(
        [
            '¿Cual duda puedo aclararte en este momento?',
            '👉 *Desayunos* disponibles en tu región',
            '👉 *Proveedor*  para unirte como proveedor',
            '👉 *Ejecutivo* Para hablar con un ejecutivo de *Mimándote*',
        ],
        null,
        null,
        [flowDesa, flowProveedor, flowTuto, flowDiscord]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
