const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/convert', upload.single('file'), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = `${inputPath}.mp3`;

  const cmd = `ffmpeg -i "${inputPath}" -q:a 0 -map a "${outputPath}"`;

  exec(cmd, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Conversion failed');
    }

    res.download(outputPath, 'converted.mp3', (err) => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  });
});

app.listen(8080, () => {
  console.log('FFmpeg API running on port 8080');
});
