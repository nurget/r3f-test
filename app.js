import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

// CORS 옵션 추가
const io = new Server(server, {
    cors: {
        origin: "*",  // 모든 출처 허용
        methods: ["GET", "POST"]  // 허용할 HTTP 메소드
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('move', (data) => {
        console.log('Position received:', data);
        socket.broadcast.emit('move', data);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('WebSocket server running on port 3000');
});
