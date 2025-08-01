FROM node:18

RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

COPY ../../Downloads/ffmpeg-api .

RUN npm install

EXPOSE 8080

CMD ["node", "index.js"]
