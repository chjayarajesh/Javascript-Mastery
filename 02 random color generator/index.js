// Load environment variables from .env file using ES module syntax
import 'dotenv/config';

// Import necessary modules
import axios from 'axios';
import express from 'express'; // Import Express for creating the server

// Retrieve the Gemini API key from environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Define the base URL for the Gemini API
const API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000; // Use port 3000 or a port from environment variables

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (for form-data with x-www-form-urlencoded)
// 'extended: true' allows for rich objects and arrays to be encoded into the URL-encoded format.
app.use(express.urlencoded({ extended: true }));
app.get("/",(req,res)=>{
    res.sendFile("C:\Users\hp\OneDrive\Desktop\gemini\gemini-api-fetcher\index.html");
})
/**
 * Fetches content from the Gemini API based on a given prompt.
 * This function remains largely the same, but is now part of a server context.
 * @param {string} prompt The text prompt to send to the Gemini model.
 * @returns {Promise<string>} A promise that resolves with the generated text, or rejects with an error.
 */
async function getGeminiContent(prompt) {
    // Check if the API key is available
    if (!GEMINI_API_KEY) {
        console.error('Error: GEMINI_API_KEY is not set in your .env file.');
        return 'API key not configured.';
    }

    try {
        // Construct the request payload as required by the Gemini API
        const payload = {
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 200
            }
        };

        // Make the POST request to the Gemini API
        const response = await axios.post(${API_BASE_URL}?key=${GEMINI_API_KEY}, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // --- NEW: Log the full raw response data from the Gemini API ---
        console.log('--- Raw Gemini API Response Data ---');
        console.log(JSON.stringify(response.data, null, 2)); // Use null, 2 for pretty printing
        console.log('------------------------------------');

        // Extract the generated text from the response
        const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (generatedText) {
            return generatedText;
        } else {
            console.warn('No generated text found in response:', JSON.stringify(response.data, null, 2));
            return 'No content generated. Please check the prompt or API response structure.';
        }

    } catch (error) {
        // Handle any errors that occur during the API call
        if (error.response) {
            console.error('Gemini API Error Response Data:', error.response.data);
            console.error('Gemini API Error Response Status:', error.response.status);
            console.error('Gemini API Error Response Headers:', error.response.headers);
            return Error fetching from Gemini API: ${error.response.status} - ${error.response.data.error?.message || 'Unknown error'};
        } else if (error.request) {
            console.error('Gemini API Error Request:', error.request);
            return 'Error: No response received from Gemini API. Check network connection or API endpoint.';
        } else {
            console.error('Error setting up Gemini API request:', error.message);
            return Error: ${error.message};
        }
    }
}

// Define a POST endpoint for generating content
app.post('/generate', async (req, res) => {
    // Log the raw request body to help debug if it's not being parsed
    console.log('Received request body:', req.body);

    // Get the prompt from the request body.
    // For form-data (x-www-form-urlencoded), the 'prompt' field will be directly in req.body.
    const { prompt } = req.body;

    // Validate if a prompt was provided
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required in the request body.' });
    }

    console.log(Received prompt: "${prompt}");

    try {
        const content = await getGeminiContent(prompt);

        // --- NEW: Log the final extracted generated content ---
        console.log('--- Final Generated Content (Extracted) ---');
        // res.send(<pre><code>${content.generatedContent}</code></pre>)
        console.log('-------------------------------------------');
        res.json(content);
        // Send the generated content back as a JSON response
    } catch (error) {
        console.error('Error in /generate endpoint:', error);
        // Send an error response
        res.status(500).json({ error: 'Failed to generate content.', details: error.message });
    }
});


// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('To use with Postman (Form Data):');
    console.log('1. Set Method to POST');
    console.log('2. Set URL to http://localhost:3000/generate');
    console.log('3. In the Body tab, select "x-www-form-urlencoded"');
    console.log('4. Add a key "prompt" and its value (e.g., "Tell me a short story.")');
    console.log('Alternatively, for "form-data" (multipart/form-data):');
    console.log('1. In the Body tab, select "form-data"');
    console.log('2. Add a key "prompt" and its value.');
});