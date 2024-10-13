// server.js
import express from 'express';
import cors from 'cors';
import path from 'path'; // Import the path module to work with file paths
import fs from 'fs';     // Import the fs module to read files
import {fileURLToPath} from 'url';
import {PARAMS, PORT} from "./src/constants.js";

const app = express();
const port = PORT;

// import.meta.url and path module: You can create a workaround to define __dirname in ES modules using import.meta.url and the path module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS
app.use(cors());

// Endpoint for '/entry' route
app.get('/entry', (request, response) => {

    let fileName;
    const queryKey = Object.keys(request.query)[0];
    if (PARAMS.includes(queryKey)) {
        const queryValue = Object.values(request.query)[0];
        // Read the query parameter (e.g., ?hello or ?hi)
        fileName = (request.query && queryKey) ? `${queryValue}.json` : null;
    }

    // If no valid query parameter is provided, return an error
    if (!fileName) {
        return response.status(400).json({error: 'Invalid query parameter. Use proper param key'});
    }

    // Build the full path to the JSON file
    const filePath = path.join(__dirname, `src/resources/${queryKey}`, fileName);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return response.status(404).json({error: `File ${fileName} not found.`});
        }

        // Read the JSON file and send it as a response
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return response.status(500).json({error: 'Error reading the file.'});
            }

            // Parse the JSON and send it as the response
            response.json(JSON.parse(data));
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at /entry`);
});
