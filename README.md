# image-manipulation-api
Return the processed image with a unique ID

## Example of API call: 
```
POST /api/transform?url=https://bower.io/img/bower-logo.png&resizeWidth=500&resizeHeight=500&cropWidth=400&cropHeight=400&rotate=45&rotateColor=transparent
```

## Accepted queries:
* url
* resizeWidth & resizeHeight
* cropWidth & cropHeight
* cropX & cropY
* rotate & rotateColor (for the background)
