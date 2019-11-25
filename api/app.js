import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 8500;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', () => console.log('hello world!'));
app.listen(PORT, () => {
	console.log(`Listening on Port: ${PORT}`);
});
