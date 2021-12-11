import io from 'socket.io-client'
const socket = io.connect("http://localhost:3030");

export { socket }