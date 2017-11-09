# 3D print cost estimator (WIP)

It estimates the cost of your 3d printings by uploading a STL file or a zip containing STL files.
You can choose between different slicers and materials.
It also takes into consideration your expenses in energy.

It receives either a stl file or a compressed zip file with some stl files inside.

## Running

```
./gradlew bootRun
```

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


