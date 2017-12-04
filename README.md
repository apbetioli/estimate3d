# Estimate 3D

It estimates the cost of your 3d printings by uploading a STL, a reprap GCODE file or a compressed zip file containing these files.
You can choose between different slicers and materials.
It also takes into consideration your expenses in energy.

Demo: http://estimate3d.herokuapp.com/

## Running

You can run the Application main class from an IDE. Or from command line:

### Linux
```
./gradlew bootRun
```

### Windows
```
gradlew.bat bootRun
```

## Parameters

TODO

## Sending a request

```
POST http://localhost:9000/api/estimate
Headers:
  Content-Type: multipart/form-data
Body:
  file: cat-toy.stl
```

### cURL

```
curl -F "file=@cat-toy.stl" http://localhost:9000/api/estimate
```


