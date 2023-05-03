import http from 'http';

import connectDB from './Config/dbConnect.js';
import app from './App/EcommerceAPI_V1.js';


//Creating the server
const PORT = process.env.PORT || 5080;
const server = http.createServer(app);

const start = async () => {
    try {
        const connected = await connectDB(process.env.MONGO_URI); //db connect
        server.listen(PORT, () => {
            console.log(`Server is up and running on port ${PORT}\n Mongodb connected host: ${connected.connection.host}`);
        });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

start();