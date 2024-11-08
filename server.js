/* const express = require('express');
const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Ruta estática para servir archivos HTML en public
app.use(express.static('public'));

// Ruta para manejar la descarga
app.get('/download', async (req, res) => {
  const { url, format } = req.query; // Obtener la URL y el formato de los parámetros de consulta
  const outputDir = path.resolve(__dirname, 'downloads');
  const outputFile = path.join(outputDir, `download.${format === 'audio' ? 'mp3' : 'mp4'}`);

  try {
    // Configuración de descarga según el formato seleccionado
    await youtubedl(url, {
      format: format === 'audio' ? 'bestaudio' : 'bestvideo',
      output: outputFile,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    });

    // Enviar el archivo descargado al usuario
    res.download(outputFile, (err) => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
      }
      // Eliminar el archivo después de la descarga para liberar espacio
      fs.unlinkSync(outputFile);
    });
  } catch (error) {
    console.error('Error en el proceso de descarga:', error);
    res.status(500).send('Error en el proceso de descarga.');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
 */




/* const express = require('express');
const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Ruta estática para servir archivos HTML en public
app.use(express.static('public'));

// Función para limpiar el nombre de archivo y evitar caracteres especiales
function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9-_\.]/g, '_'); // Reemplaza caracteres especiales por '_'
}

// Función para validar si una URL es un enlace de YouTube
function isValidYouTubeUrl(url) {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return regex.test(url);
}

// Ruta para obtener información del video, como el título y las calidades
app.get('/video-info', async (req, res) => {
  const { url } = req.query;
  if (!isValidYouTubeUrl(url)) {
    return res.status(400).send('URL inválida. Por favor ingresa una URL válida de YouTube.');
  }

  try {
    const info = await youtubedl(url, {
      dumpSingleJson: true,
      format: 'best'
    });

    const title = sanitizeFilename(info.title || 'video');
    const formats = info.formats.filter(format => {
      // Filtrar solo las opciones de audio y video deseadas
      const isAudio = format.acodec !== 'none';
      const isVideo = format.vcodec !== 'none';

      if (isAudio && format.abr) {
        // Opciones de audio: 256 kbps y 320 kbps
        return [256, 320].includes(format.abr);
      }

      if (isVideo && format.height) {
        // Opciones de video: 360p, 480p, 720p y 1080p
        return [360, 480, 720, 1080].includes(format.height);
      }

      return false;
    }).map(format => ({
      format_id: format.format_id,
      format_note: format.format_note,
      resolution: format.resolution || `${format.abr} kbps`,
      ext: format.ext,
    }));

    res.json({ title, formats });
  } catch (error) {
    console.error('Error al obtener información del video:', error);
    res.status(500).send('Error al obtener información del video.');
  }
});

// Ruta para manejar la descarga del video o audio con la calidad seleccionada
app.get('/download', async (req, res) => {
  const { url, format_id, title } = req.query;
  if (!isValidYouTubeUrl(url)) {
    return res.status(400).send('URL inválida. Por favor ingresa una URL válida de YouTube.');
  }

  const sanitizedTitle = sanitizeFilename(title);
  const outputDir = path.resolve(__dirname, 'downloads');
  const outputFile = path.join(outputDir, `${sanitizedTitle}.${format_id.includes('audio') ? 'mp3' : 'mp4'}`);

  try {
    await youtubedl(url, {
      format: format_id,
      output: outputFile,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
    });

    if (fs.existsSync(outputFile)) {
      res.download(outputFile, (err) => {
        if (err) {
          console.error('Error al enviar el archivo:', err);
        }
        fs.unlinkSync(outputFile);
      });
    } else {
      res.status(404).send('Archivo no encontrado después de la descarga.');
    }
  } catch (error) {
    console.error('Error en el proceso de descarga:', error);
    res.status(500).send('Error en el proceso de descarga.');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
 */



const express = require('express');
const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Ruta estática para servir archivos HTML en public
app.use(express.static('public'));

// Función para limpiar el nombre de archivo y evitar caracteres especiales
function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9-_\.]/g, '_'); // Reemplaza caracteres especiales por '_'
}

// Función para validar si una URL es un enlace de YouTube
function isValidYouTubeUrl(url) {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return regex.test(url);
}

// Ruta para obtener información del video y las calidades de acuerdo al tipo seleccionado (audio o video)
app.get('/video-info', async (req, res) => {
  const { url, type } = req.query;

  if (!isValidYouTubeUrl(url)) {
    return res.status(400).send('URL inválida. Por favor ingresa una URL válida de YouTube.');
  }

  try {
    const info = await youtubedl(url, {
      dumpSingleJson: true,
      format: 'best'
    });

    const title = sanitizeFilename(info.title || 'video');
    const formats = info.formats.filter(format => {
      // Filtrar opciones de audio o video dependiendo del tipo solicitado
      if (type === 'audio') {
        // Opciones de audio: 256 kbps y 320 kbps
        return format.acodec/*  !== 'none' && [256, 320].includes(format.abr) */;
      } else if (type === 'video') {
        // Opciones de video con audio: 360p, 480p, 720p, 1080p
        return format.vcodec /* !== 'none' && format.acodec !== 'none' && [360, 480, 720, 1080].includes(format.height) */;
      }
      return false;
    }).map(format => ({
      format_id: format.format_id,
      format_note: format.format_note || `${format.abr || format.height}p`,
      resolution: format.resolution || `${format.abr} kbps`,
      ext: format.ext,
    }));

    res.json({ title, formats });
  } catch (error) {
    console.error('Error al obtener información del video:', error);
    res.status(500).send('Error al obtener información del video.');
  }
});

// Ruta para manejar la descarga del video o audio con la calidad seleccionada
app.get('/download', async (req, res) => {
  const { url, format_id, title } = req.query;
  
  if (!isValidYouTubeUrl(url)) {
    return res.status(400).send('URL inválida. Por favor ingresa una URL válida de YouTube.');
  }

  const sanitizedTitle = sanitizeFilename(title);
  const outputDir = path.resolve(__dirname, 'downloads');
  const outputFile = path.join(outputDir, `${sanitizedTitle}.${format_id.includes('audio') ? 'mp3' : 'mp4'}`);

  try {
    await youtubedl(url, {
      format: format_id,
      output: outputFile,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
    });

    if (fs.existsSync(outputFile)) {
      res.download(outputFile, (err) => {
        if (err) {
          console.error('Error al enviar el archivo:', err);
        }
        fs.unlinkSync(outputFile);
      });
    } else {
      res.status(404).send('Archivo no encontrado después de la descarga.');
    }
  } catch (error) {
    console.error('Error en el proceso de descarga:', error);
    res.status(500).send('Error en el proceso de descarga.');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
