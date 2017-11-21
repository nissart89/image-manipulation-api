# image-manipulation-api
POST /api/transform

Return the processed image with a unique ID

List of the queries:
url
resizeWidth
resizeHeight
cropWidth
cropHeight
cropX
cropY
rotate
rotateColor (for the background)

Example: http://localhost:8888/api/transform?url=https://bower.io/img/bower-logo.png&resizeWidth=500&resizeHeight=500&cropWidth=400&cropHeight=400&rotate=45&rotateColor=transparent
