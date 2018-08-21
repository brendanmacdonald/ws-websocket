const WebSocket = require('ws');
const url = require('../utils/util').url;

let count = 0;
let ws;

describe('Websocket example', () => {
    beforeEach( () => {
        ws = new WebSocket(url, {
            origin: 'https://websocket.org',
        });
    });

    it('send and receive messages', () => {
        ws.on('open', () => {
            console.log('Connected...');
            ws.send("This is the message I am sending!");
        });

        ws.on('error', () => done(new Error("Unexpected 'error' event")));

        ws.on('close', () => {
            console.log('Disconnected!');
        });

        ws.on('message', (data) => {
            console.log(`The message I received was - '${data}'`);

            count++;
            if (count < 5) { // Loop 5 times.
                setTimeout(() => {
                    ws.send("Sending a different message!");
                }, 500);
            } else {
                ws.close(); 
            }
        });
    });
});