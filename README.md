# GraphThis API

GraphThis is a simple API that generates graphs (line, bar, and pie charts) from user input. It accepts structured or unstructured data and returns the graph as a PNG image. The API is built with **Node.js**, **Express**, and **Chart.js**, and the frontend is a simple HTML form for testing.

---

## Features

- **Graph Types**: Supports Line, Bar, and Pie charts.
- **Data Input**: Accepts structured (JSON) and unstructured data (e.g., `January 10, February 20`).
- **Export Options**: Generates graphs as PNG images.
- **Frontend**: A simple HTML form for testing the API.

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/graphthis-api.git
   cd graphthis-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node index.js
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## Usage

### Frontend
- Visit the homepage (`http://localhost:3000`) to access the frontend.
- Enter data in the input field (e.g., `January 10, February 20, March 30`).
- Select a chart type (Line, Bar, or Pie).
- Click **Generate Graph** to see the graph and download it as a PNG.

### API Endpoint
- **POST `/generate-graph`**:
  - **Request Body**:
    ```json
    {
      "labels": ["January", "February", "March"],
      "data": [10, 20, 30],
      "type": "bar"
    }
    ```
  - **Response**: A PNG image of the graph.

---

## Deployment

### Deploy to Vercel
1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. Visit the provided URL (e.g., `https://graphthis-api.vercel.app`) to access the deployed application.

---

## Example

### Input
```
January 10, February 20, March 30
```

### Output
- A Bar chart with:
  - Labels: `["January", "February", "March"]`
  - Data: `[10, 20, 30]`

---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Built with [Express](https://expressjs.com/), [Chart.js](https://www.chartjs.org/), and [Canvas](https://www.npmjs.com/package/canvas).
- Deployed with [Vercel](https://vercel.com/).

---

## Contact

For questions or feedback, please contact Chandrashekar Goud Kalali (mailto:chandrashekargoudkalali@gmail.com).
