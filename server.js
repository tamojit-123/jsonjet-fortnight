// server.js
import express from "express";
import cors from "cors";
import path from "path"; // Import the path module to work with file paths
import fs from "fs"; // Import the fs module to read files
import { fileURLToPath } from "url";
import { PARAMS, PORT, SERVER_STATUS } from "./src/constants.js";
import { createFileWithExtensions } from "function-ninja";
import chalk from "chalk";
import * as https from "https";
import axios from "axios";

const app = express();
const port = PORT;

// import.meta.url and path module: You can create a workaround to define __dirname in ES modules using import.meta.url and the path module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS
app.use(cors());
app.use(express.json());

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const currentDate = new Date();
const time = currentDate.toLocaleTimeString(undefined, {
  hour: "2-digit",
  minute: "2-digit",
});
const date = currentDate.toLocaleDateString(undefined, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

// Endpoint for '/entry' route
app.get("/mocks", (request, response) => {
  let fileName;
  const queryKey = Object.keys(request.query)[0];
  if (PARAMS.includes(queryKey)) {
    const queryValue = Object.values(request.query)[0];
    // Read the query parameter (e.g., ?hello or ?hi)
    fileName = request.query && queryKey ? `${queryValue}.json` : null;
  }

  // If no valid query parameter is provided, return an error
  if (!fileName) {
    return response
      .status(SERVER_STATUS.INVALID_PARAM)
      .json({ error: "Invalid query parameter. Use proper param key" });
  }

  // Build the full path to the JSON file
  const filePath = path.join(__dirname, `src/resources/${queryKey}`, fileName);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return response
        .status(SERVER_STATUS.NOT_FOUND)
        .json({ error: `File ${fileName} not found.` });
    }

    // Read the JSON file and send it as a response
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return response
          .status(SERVER_STATUS.INTERNAL_SERVER_ERROR)
          .json({ error: "Error reading the file." });
      }

      // Parse the JSON and send it as the response
      response.json(JSON.parse(data));
    });
  });
});

app.get("/users", (request, response) => {
  const fileName = createFileWithExtensions(request.url, "json"); // Output: "file name"

  // If no valid query parameter is provided, return an error
  if (!fileName) {
    return response
      .status(SERVER_STATUS.INVALID_PARAM)
      .json({ error: "Invalid query parameter. Use proper param key" });
  }

  const queryKey = fileName.split(".json")[0];

  // Build the full path to the JSON file
  const filePath = path.join(__dirname, `src/resources/${queryKey}`, fileName);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return response
        .status(SERVER_STATUS.NOT_FOUND)
        .json({ error: `File ${fileName} not found.` });
    }

    // Read the JSON file and send it as a response
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return response
          .status(SERVER_STATUS.INTERNAL_SERVER_ERROR)
          .json({ error: "Error reading the file." });
      }

      // Parse the JSON and send it as the response
      response.json(JSON.parse(data));
    });
  });
});

app.get("/airports", (request, response) => {
  const fileName = createFileWithExtensions(request.url, "json"); // Output: "file name"

  // If no valid query parameter is provided, return an error
  if (!fileName) {
    return response
      .status(SERVER_STATUS.INVALID_PARAM)
      .json({ error: "Invalid query parameter. Use proper param key" });
  }

  const queryKey = fileName.split(".json")[0];

  // Build the full path to the JSON file
  const filePath = path.join(__dirname, `src/resources/${queryKey}`, fileName);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return response
        .status(SERVER_STATUS.NOT_FOUND)
        .json({ error: `File ${fileName} not found.` });
    }

    // Read the JSON file and send it as a response
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return response
          .status(SERVER_STATUS.INTERNAL_SERVER_ERROR)
          .json({ error: "Error reading the file." });
      }

      // Parse the JSON and send it as the response
      response.json(JSON.parse(data));
    });
  });
});

app.post("/api", async (req, res) => {
  const { url, method, headers, data, redirect, body } = req.body;
  console.log(
    chalk.blue(
      `${chalk.greenBright(`${date}, ${time} : `)} Starting API call to ${chalk.bold(url)} with method ${chalk.bold(method || "POST")}`,
    ),
  );
  try {
    const response = await axios({
      method: method || "POST",
      url,
      data: { ...data },
      headers: { ...headers, host: undefined },
      httpsAgent,
      body,
      redirect: redirect || "follow",
    });
    console.log(
      chalk.green(
        `${chalk.greenBright(`${date}, ${time} : `)} API call to ${chalk.bold(url)} was successful!`,
      ),
    );
    res.send(response.data);
  } catch (error) {
    console.log(
      chalk.red(
        `${chalk.greenBright(`${date}, ${time} : `)} API call to ${chalk.bold(url)} failed with error: ${chalk.bold(error.message)}`,
      ),
    );
    res.status(error.response?.status || 500).send(error.message);
  }
});

app.post("/api/genai", async (req, res) => {
  const { url, headers, promptData } = req.body;
  console.log(
    chalk.yellow(
      `${chalk.greenBright(`${date}, ${time} : `)} Starting Gen AI call to ${chalk.bold(url)} with method ${chalk.bold("POST")}`,
    ),
  );
  try {
    const response = await axios.post(url, promptData, { headers, httpsAgent });
    console.log(
      chalk.yellowBright(
        `${chalk.greenBright(`${date}, ${time} : `)} API call to ${chalk.bold(url)} was successful!`,
      ),
    );
    res.send(response.data);
  } catch (error) {
    console.error(
      chalk.red(
        `${chalk.greenBright(`${date}, ${time} : `)} Error calling Omni Gen AI API:`,
        error,
      ),
    );
    res.status(error.response?.status || 500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`${chalk.greenBright(`${date}, ${time} : `)}
${chalk.magenta("╭─-------------------------------------------------------─╮")}
${chalk.magenta("│                                                         │")}
${chalk.magenta("│           proxy server started on below port            │")}
${chalk.magenta("│                                                         │")}
${chalk.magenta("│                                                         │")}
${chalk.magenta("│    Local:            ")}${chalk.cyan("https://jsonjet.vercel.app/")}${chalk.magenta("        │")}
${chalk.magenta("│    On your network:  ")}${chalk.cyan("https://jsonjet.vercel.app/")}${chalk.magenta("        │")}
${chalk.magenta("│                                                         │")}
${chalk.magenta("╰─-------------------------------------------------------─╯")}
    `);
});
