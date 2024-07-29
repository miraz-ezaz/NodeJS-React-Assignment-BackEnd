const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
const hotelRoutes = require("./routes/hotel");

app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/hotel", hotelRoutes);

// Handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
