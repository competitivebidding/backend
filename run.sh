docker build -t node-web-app .
docker run -d -t -p 3000:3000 node-web-app