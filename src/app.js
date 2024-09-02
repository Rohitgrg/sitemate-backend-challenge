import express from 'express';
import issuesRoutes from './routes/issuesRoutes.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/issues', issuesRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Notes API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
