// server.js
import express from 'express';
import cors from 'cors';
import path from 'path'; // Import the path module to work with file paths
import fs from 'fs';     // Import the fs module to read files
import {fileURLToPath} from 'url';
import {PARAMS, PORT, SERVER_STATUS} from "./src/constants.js";

const app = express();
const port = PORT;

// import.meta.url and path module: You can create a workaround to define __dirname in ES modules using import.meta.url and the path module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createFileWithExtensions = (file, extension) => {
    const newName = file.replace(/\//g, "");  // Removes all "/"
    const fileName = (file && newName) ? `${newName}.${extension}` : "";
    return fileName;
}

// Enable CORS
app.use(cors());

// Endpoint for '/entry' route
app.get('/mocks', (request, response) => {

    let fileName;
    const queryKey = Object.keys(request.query)[0];
    if (PARAMS.includes(queryKey)) {
        const queryValue = Object.values(request.query)[0];
        // Read the query parameter (e.g., ?hello or ?hi)
        fileName = (request.query && queryKey) ? `${queryValue}.json` : null;
    }

    // If no valid query parameter is provided, return an error
    if (!fileName) {
        return response.status(SERVER_STATUS.INVALID_PARAM).json({error: 'Invalid query parameter. Use proper param key'});
    }

    // Build the full path to the JSON file
    const filePath = path.join(__dirname, `src/resources/${queryKey}`, fileName);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return response.status(SERVER_STATUS.NOT_FOUND).json({error: `File ${fileName} not found.`});
        }

        // Read the JSON file and send it as a response
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return response.status(SERVER_STATUS.INTERNAL_SERVER_ERROR).json({error: 'Error reading the file.'});
            }

            // Parse the JSON and send it as the response
            response.json(JSON.parse(data));
        });
    });
});

app.get('/users', (request, response) => {


    const fileName = createFileWithExtensions(request.url, "json");  // Output: "file name"

    // If no valid query parameter is provided, return an error
    if (!fileName) {
        return response.status(SERVER_STATUS.INVALID_PARAM).json({error: 'Invalid query parameter. Use proper param key'});
    }

    const queryKey = fileName.split(".json")[0];

    // Build the full path to the JSON file
    const filePath = path.join(__dirname, `src/resources/${queryKey}`, fileName);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return response.status(SERVER_STATUS.NOT_FOUND).json({error: `File ${fileName} not found.`});
        }

        // Read the JSON file and send it as a response
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return response.status(SERVER_STATUS.INTERNAL_SERVER_ERROR).json({error: 'Error reading the file.'});
            }

            // Parse the JSON and send it as the response
            response.json(JSON.parse(data));
        });
    });
});

app.get('/airports', (request, response) => {


    const fileName = createFileWithExtensions(request.url, "json");  // Output: "file name"

    // If no valid query parameter is provided, return an error
    if (!fileName) {
        return response.status(SERVER_STATUS.INVALID_PARAM).json({error: 'Invalid query parameter. Use proper param key'});
    }

    const queryKey = fileName.split(".json")[0];

    // Build the full path to the JSON file
    const filePath = path.join(__dirname, `src/resources/${queryKey}`, fileName);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return response.status(SERVER_STATUS.NOT_FOUND).json({error: `File ${fileName} not found.`});
        }

        // Read the JSON file and send it as a response
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return response.status(SERVER_STATUS.INTERNAL_SERVER_ERROR).json({error: 'Error reading the file.'});
            }

            // Parse the JSON and send it as the response
            response.json(JSON.parse(data));
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at https://jsonjet.vercel.app`);
});
