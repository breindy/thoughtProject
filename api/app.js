import express from 'express';
import bodyParser from 'body-parser';
import authRoute from '../api/routes/authRoute';
import shareRoute from '../api/routes/shareRoute';

const app = express();
const PORT = process.env.PORT || 8001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.get('/', function (req, res) {
	res.send('Welcome to the API');
});


app.use('/api/auth', authRoute);
app.use('/api/', shareRoute);

app.listen(PORT, () => {
	console.log(`Listening on Port: ${PORT}`);
});
