# FFmpeg API

Ein minimalistischer FFmpeg-Microservice, der `.mp4`-Dateien in `.mp3`-Dateien konvertiert.  
Konzipiert für Container-Umgebungen wie [Coolify](https://coolify.io) – ideal zur Automatisierung mit [n8n](https://n8n.io).

---

##  Features

-  Konvertiert `.mp4` → `.mp3` via `ffmpeg`
-  Unterstützt Datei-Uploads per `multipart/form-data`
-  Leichtgewichtig & Docker-ready
-  Standardmäßig nicht öffentlich erreichbar (nur intern)
