const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox'],
        headless: true,
    },
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('🔑 Escaneie o QR Code acima para autenticar o bot.');
});

client.on('ready', () => {
    console.log('✅ Bot está pronto!');
});

client.on('message', async (message) => {
    console.log(`📩 Mensagem recebida de ${message.from}: ${message.body}`);

    if (message.body.toLowerCase() === 'oi') {
        await message.reply('Olá! 👋 Sou um bot no Railway.');
    }

    if (message.body.toLowerCase().includes('hora')) {
        const hora = new Date().toLocaleTimeString();
        await message.reply(`🕒 Agora são ${hora}`);
    }
});

client.initialize();
