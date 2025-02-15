const fs = require('fs').promises;
const open = require('fs').open;
const close = require('fs').close;
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use('/feedback', express.static('feedback'));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'feedback.html');
  res.sendFile(filePath);
});

app.get('/exists', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'exists.html');
  res.sendFile(filePath);
});

app.post('/create', async (req, res) => {
  const title = req.body.title;
  const content = req.body.text;

  const adjTitle = title.toLowerCase();

  const tempFilePath = path.join(__dirname, 'temp', adjTitle + '.txt');
  const finalFilePath = path.join(__dirname, 'feedback', adjTitle + '.txt');

  console.log('File creation called!');

  await fs.writeFile(tempFilePath, content);

  open(finalFilePath, 'r', async (error, fd) => {
	if (error) {
		if (error.code === 'ENOENT') {
			await fs.copyFile(tempFilePath, finalFilePath);
			await fs.unlink(tempFilePath);
			res.redirect('/');

			return;
		}

		throw error;
	} else {
		close(fd, (error) => {
		    if (error) {
				throw error;
			} 
		});
		res.redirect('/exists');
	}
  })
});

app.listen(process.env.PORT);
