const express = require('express');
const bodyParser = require('body-parser');
const { createCanvas } = require('canvas');
const Chart = require('chart.js/auto');
const path = require('path');
const csvParser = require('csv-parser');
const fs = require('fs');
const util = require('util');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.text({ type: 'text/*', limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Helper function to parse unstructured data
function parseUnstructuredData(input) {
  const pairs = input.split(',').map(pair => pair.trim());
  const labels = [];
  const data = [];
  pairs.forEach(pair => {
    const keyValue = pair.split(/\s+/); // Split by whitespace
    if (keyValue.length === 2) {
      const label = keyValue[0];
      const value = parseFloat(keyValue[1]);
      if (!isNaN(value)) {
        labels.push(label);
        data.push(value);
      }
    }
  });
  return { labels, data };
}

// Helper function to parse JSON data
function parseJSONData(input) {
  try {
    const jsonData = JSON.parse(input);
    const labels = Object.keys(jsonData);
    const data = Object.values(jsonData).map(Number);
    return { labels, data };
  } catch (error) {
    return null;
  }
}

// Helper function to parse CSV data
async function parseCSVData(input) {
  return new Promise((resolve, reject) => {
    const labels = [];
    const data = [];
    const stream = require('stream');
    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(input));
    bufferStream
      .pipe(csvParser())
      .on('data', (row) => {
        const keys = Object.keys(row);
        if (keys.length === 2) {
          labels.push(row[keys[0]]);
          data.push(parseFloat(row[keys[1]]));
        }
      })
      .on('end', () => resolve({ labels, data }))
      .on('error', (err) => reject(err));
  });
}

// POST endpoint to generate a graph
app.post('/generate-graph', async (req, res) => {
  const { data: rawData, type = 'line' } = req.body;

  if (!rawData) {
    return res.status(400).json({ error: 'Data is required.' });
  }

  let parsedData = null;

  // Try parsing as JSON
  parsedData = parseJSONData(rawData);
  if (parsedData) {
    console.log('Parsed as JSON');
  } else {
    // Try parsing as CSV
    try {
      parsedData = await parseCSVData(rawData);
      console.log('Parsed as CSV');
    } catch (csvError) {
      // Try parsing as unstructured data
      parsedData = parseUnstructuredData(rawData);
      if (!parsedData.labels || !parsedData.data) {
        return res.status(400).json({ error: 'Invalid data format. Supported formats: JSON, CSV, or Key-Value Pairs.' });
      }
      console.log('Parsed as Unstructured Data');
    }
  }

  const { labels, data } = parsedData;

  // Create a canvas for the chart
  const canvas = createCanvas(800, 400);
  const ctx = canvas.getContext('2d');

  try {
    // Generate the chart using Chart.js
    new Chart(ctx, {
      type,
      data: {
        labels,
        datasets: [{
          label: 'Data',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 50, // Adjust step size for better readability
            },
          },
        },
        plugins: {
          legend: {
            display: false, // Hide legend for simplicity
          },
        },
      },
    });

    // Convert the chart to a PNG image
    const imageBuffer = canvas.toBuffer('image/png');
    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (error) {
    console.error('Error generating graph:', error);
    res.status(500).json({ error: 'Failed to generate graph.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});