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

  // Schritt 1: Audiospur prüfen
  const checkCmd = `ffmpeg -i "${inputPath}" -hide_banner`;
  exec(checkCmd, (checkErr, stdout, stderr) => {
    console.log(stderr); // Für Debugging

    if (!stderr.includes('Audio:')) {
      fs.unlinkSync(inputPath);
      return res.status(400).json({ success: false, message: 'Keine Audiospur erkannt' });
    }

    // Schritt 2: Konvertieren mit stabilem Befehl
    const convertCmd = `ffmpeg -i "${inputPath}" -vn -acodec libmp3lame -q:a 0 "${outputPath}"`;
    exec(convertCmd, (convertErr) => {
      if (convertErr) {
        console.error('Fehler bei ffmpeg:', convertErr);
        fs.unlinkSync(inputPath);
        return res.status(500).json({ success: false, message: 'Konvertierung fehlgeschlagen' });
      }

      // Schritt 3: Datei ausliefern und aufräumen
      res.download(outputPath, 'converted.mp3', (downloadErr) => {
        try {
          fs.unlinkSync(inputPath);
          fs.unlinkSync(outputPath);
        } catch (cleanupErr) {
          console.error('Fehler beim Aufräumen:', cleanupErr);
        }

        if (downloadErr) {
          console.error('Fehler beim Download:', downloadErr);
        }
      });
    });
  });
});

app.listen(8080, () => {
  console.log('🎧 FFmpeg API running on port 8080');
});
