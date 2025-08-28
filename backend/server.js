const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require("./routes/orderRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api/orders", orderRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
