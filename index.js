const express = require('express');
const bodyParser = require('body-parser')

var request = require('request');

var fs = require('fs')
  , gm = require('gm');
// const multer  = require('multer');
// const upload = multer();

const port = 8888;

const app = express();

const settings = {
  url: '',
  width: '',
  height: ''
};

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/api/', (req, res, next) => {

    console.log('start')
    // resize and remove EXIF profile data
    // gm('public/img.png')
    // .resize(50, 50)
    // .noProfile()
    // .write('public/resize.png', function (err) {
    //   if (!err) console.log('done');
    // });

})

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
    rotateColor: req.query.rotateColor
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

  if (transform.resizeW && req.query.resizeHeight) {
    image.resize(transform.resizeW, transform.resizeH);
  }
  if (transform.resizeW && req.query.resizeHeight) {
    image.crop(transform.cropW, transform.cropH, transform.cropX, transform.cropY);
  }
  if (transform.rotateAngle) {
    var bgColor = transform.rotateColor || 'white';
    image.rotate(bgColor, transform.rotateAngle);
  }
  image.write('img/image.png', function (err) {
    if (!err) console.log('Resizing done!');
    res.status(200).send('Image Resized!');

  });
})

app.use(function(err, req, res, next) {
    if (!res.headersSent) {
        res.status(err.status || 500);
    }

    console.error(err);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
