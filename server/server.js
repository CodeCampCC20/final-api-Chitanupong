import express from "express";
import cors from "cors";
import morgan from "morgan";
//  Routing
import authRoute from '../server/routes/auth.route.js'

const app = express();

// Basic middlewares
app.use(cors()); // Allow cross domains
app.use(morgan("dev")); // Show logs
app.use(express.json()); // For read JSON

// Routing
app.use('/auth', authRoute);


// Error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.code || 500).json({ message: err.message || 'something wrong' });
});


const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));