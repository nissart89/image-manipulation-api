const express = require('express');
const bodyParser = require('body-parser')
const request = require('request');
const fs = require('fs'),
      gm = require('gm');

const fileUpload = require('express-fileupload');

const port = 8888;

const app = express();

// API
app.post('/api/transform', function (req, res, next) {
  var transform = {
    url: '',
    resizeW: req.query.resizeWidth,
    resizeH: req.query.resizeHeight,
    cropW: req.query.cropWidth,
    cropH: req.query.cropHeight,
    cropX: req.query.cropX,
    cropY: req.query.cropY,
    rotateAngle: req.query.rotate,
    rotateColor: req.query.rotateColor,
    id: Math.round(Date.now() / 100)
  };
  if (req.query.url) {
    transform.url = req.query.url;
  }
  else {
    console.log('URL MISSING!');
    res.status(400).send('Missing URL');
  }

  url = transform.url;

  console.log(transform);

  var image = gm(request(url));

  if (transform.resizeW && transform.resizeH) {
    image.resize(transform.resizeW, transform.resizeH);
    console.log('RESIZED!')
  }
  if (transform.cropW && transform.cropH) {
    image.crop(transform.cropW, transform.cropH, transform.cropX, transform.cropY);
    console.log('CROPED!')
  }
  if (transform.rotateAngle) {
    var bgColor = transform.rotateColor || 'white';
    image.rotate(bgColor, transform.rotateAngle);
    console.log('ROTATED!')
  }
  image.write(`./public/processed/resized-${transform.id}.png`, function (err) {
    if (!err) {
      console.log('ALL DONE!');
      res.download(`./public/processed/resized-${transform.id}.png`);

    }
    else console.log(err);
  });
})


app.use('/', express.static('public'));

app.use(fileUpload());

// FORM - Front-end
app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let uploadedImage = req.files.uploadedImage;
  console.log(`File uploaded: ${uploadedImage.name}`);

  // Before moving the file, make sure the folder exist otherwise it'll fail.
  let uploadDir = './public/uploads/';
  if (!fs.existsSync(uploadDir)) {
    console.log('Created upload folder');
    fs.mkdirSync(uploadDir);
  }
  // Use the mv() method to place the file somewhere on your server
  uploadedImage.mv(uploadDir + uploadedImage.name, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});


app.use(function(err, req, res, next) {
    if (!res.headersSent) {
        res.status(err.status || 500);
    }

    console.error(err);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
