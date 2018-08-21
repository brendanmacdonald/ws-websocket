const WebSocket = require('ws');
const url = require('../utils/util').url;

describe('Websocket example', () => {

let count;
let ws;

    beforeEach( () => {
        count = 0;
        ws = new WebSocket(url, {
            origin: 'https://websocket.org'
        });
    });

    it('basic search', () => {

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