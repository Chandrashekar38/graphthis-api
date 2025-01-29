// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { createCanvas } = require('canvas');
const Chart = require('chart.js/auto');

// Create an Express app
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// POST endpoint to generate a graph
app.post('/generate-graph', (req, res) => {
  const { labels, data, type = 'line' } = req.body;

  // Validate input
  if (!labels || !data) {
    return res.status(400).json({ error: 'Labels and data are required.' });
  }

  // Create a canvas for the chart
  const canvas = createCanvas(800, 400);
  const ctx = canvas.getContext('2d');

  // Generate the chart using Chart.js
  new Chart(ctx, {
    type: type, // Chart type (line, bar, pie, etc.)
    data: {
      labels: labels, // X-axis labels
      datasets: [{
        label: 'Data', // Dataset label
        data: data, // Y-axis data
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Chart color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        borderWidth: 2, // Border width
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true, // Start Y-axis from zero
        },
      },
    },
  });

  // Convert the chart to a PNG image
  const imageBuffer = canvas.toBuffer('image/png');

  // Send the image as a response
  res.set('Content-Type', 'image/png');
  res.send(imageBuffer);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});