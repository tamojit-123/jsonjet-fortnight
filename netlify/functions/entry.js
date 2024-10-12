const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    const query = event.queryStringParameters;

    const fileName = query.hello ? 'hello.json' : query.hi ? 'hi.json' : null;

    if (!fileName) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid query parameter. Use ?hello or ?hi.' }),
        };
    }

    const filePath = path.join(__dirname, 'data', fileName);

    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return {
            statusCode: 200,
            body: data,
            headers: { 'Content-Type': 'application/json' },
        };
    } catch (err) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: `File ${fileName} not found.` }),
        };
    }
};
