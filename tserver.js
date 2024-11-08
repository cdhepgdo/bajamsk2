/* const fs = require("fs");
const ytdl = require("ytdl-core");

async function downloadVideo(url) {
    const videoPath = "video.mp4";

    try {
        // Obtener información del video
        const info = await ytdl.getInfo(url);
        
        // Verificar si el video está restringido por edad
        if (info.videoDetails.age_restricted) {
            throw new Error("El video está restringido por edad.");
        }

        // Elegir el formato adecuado
        const format = ytdl.chooseFormat(info.formats, { quality: "highestvideo" });

        if (!format) {
            throw new Error("No se encontró un formato adecuado.");
        }

        // Iniciar la descarga
        const videoStream = ytdl(url, { format });

        videoStream.pipe(fs.createWriteStream(videoPath))
            .on('finish', () => {
                console.log('Video descargado exitosamente.');
            })
            .on('error', (err) => {
                console.error('Error durante la escritura del archivo:', err);
            });

        videoStream.on('error', (err) => {
            handleDownloadError(err);
        });

    } catch (error) {
        handleDownloadError(error);
    }
}

function handleDownloadError(error) {
    if (error.message.includes("410")) {
        console.error("Error 410: El recurso solicitado ha sido eliminado o no está disponible.");
    } else if (error.message.includes("403")) {
        console.error("Error 403: Acceso denegado. El video puede estar restringido por derechos de autor o geobloqueado.");
    } else if (error.message.includes("ETIMEDOUT")) {
        console.error("Error: Tiempo de espera agotado. Verifica tu conexión a Internet o intenta nuevamente más tarde.");
    } else if (error.message.includes("ENOTFOUND")) {
        console.error("Error: No se pudo encontrar el servidor. Verifica la URL o tu conexión a Internet.");
    } else if (error.message.includes("ECONNRESET")) {
        console.error("Error: Conexión restablecida. Puede ser un problema temporal de la red.");
    } else if (error.message.includes("IP Blocked")) {
        console.error("Error: Tu IP ha sido bloqueada temporalmente por YouTube. Intenta usar una VPN o espera un tiempo.");
    } else {
        console.error("Error desconocido:", error);
    }
} */

// Llama a la función con la URL del video
//downloadVideo("https://www.youtube.com/watch?v=example");

// Llama a la función con la URL del video







const fs = require('fs');
const ytdl = require('ytdl-core');

/* function handleDownloadError(error) {
    if (error.message.includes("410")) {
        console.error("Error 410: El recurso solicitado ha sido eliminado o no está disponible.");
    } else if (error.message.includes("403")) {
        console.error("Error 403: Acceso denegado. El video puede estar restringido por derechos de autor o geobloqueado.");
    } else if (error.message.includes("ETIMEDOUT")) {
        console.error("Error: Tiempo de espera agotado. Verifica tu conexión a Internet o intenta nuevamente más tarde.");
    } else if (error.message.includes("ENOTFOUND")) {
        console.error("Error: No se pudo encontrar el servidor. Verifica la URL o tu conexión a Internet.");
    } else if (error.message.includes("ECONNRESET")) {
        console.error("Error: Conexión restablecida. Puede ser un problema temporal de la red.");
    } else if (error.message.includes("IP Blocked")) {
        console.error("Error: Tu IP ha sido bloqueada temporalmente por YouTube. Intenta usar una VPN o espera un tiempo.");
    } else {
        console.error("Error desconocido:", error);
    }
} 

async function downloadVideo(url) {
    const videoPath = "video.mp4";

    try {
        const info = await ytdl.getInfo(url);
        
        if (info.videoDetails.age_restricted) {
            throw new Error("El video está restringido por edad.");
        }

        const format = 'tiny';
console.log(format)
        if (!format) {
            throw new Error("No se encontró un formato adecuado.");
        }

        const videoStream = ytdl(url, {
            format,
            requestOptions: {
                headers: {
                    cookie: [
                        {
                          "domain": ".youtube.com",
                          "expirationDate": 1764788291.983194,
                          "hostOnly": false,
                          "httpOnly": false,
                          "name": "PREF",
                          "path": "/",
                          "sameSite": "unspecified",
                          "secure": true,
                          "session": false,
                          "storeId": "0",
                          "value": "tz=America.Chicago"
                        },
                        {
                          "domain": ".youtube.com",
                          "expirationDate": 1730230070.504114,
                          "hostOnly": false,
                          "httpOnly": true,
                          "name": "GPS",
                          "path": "/",
                          "sameSite": "unspecified",
                          "secure": true,
                          "session": false,
                          "storeId": "0",
                          "value": "1"
                        },
                        {
                          "domain": ".youtube.com",
                          "expirationDate": 1764788286.67383,
                          "hostOnly": false,
                          "httpOnly": false,
                          "name": "SID",
                          "path": "/",
                          "sameSite": "unspecified",
                          "secure": false,
                          "session": false,
                          "storeId": "0",
                          "value": "g.a000pgiO1UQ3aKu_TMF4yJ-gjhqaen2U7GGSbc8z-QOsyHRVH-DEI4DgSHtg5WGVF3fJ3aYdOgACgYKAaMSARISFQHGX2MiRy_4iMwpHF8FVPqS4Vc1FxoVAUF8yKoiDLP-894xQxxaixP5tmQA0076"
                        },
                        {
                          "domain": ".youtube.com",
                          "expirationDate": 1761764286.674075,
                          "hostOnly": false,
                          "httpOnly": true,
                          "name": "__Secure-1PSIDTS",
                          "path": "/",
                          "sameSite": "unspecified",
                          "secure": true,
                          "session": false,
                          "storeId": "0",
                          "value": "sidts-CjIBQT4rX_la32y0fhSHGgFpe_UQGnx1_hxn4gwzpC2dwrxQq0Bw8KGHofOM7LjQV125rhAA"
                        },
                        {
                          "domain": ".youtube.com",
                          "expirationDate": 1761764286.674135,
                          "hostOnly": false,
                          "httpOnly": true,
                          "name": "__Secure-3PSIDTS",
                          "path": "/",
                          "sameSite": "no_restriction",
                          "secure": true,
                          "session": false,
                          "storeId": "0",
                          "value": "sidts-CjIBQT4rX_la32y0fhSHGgFpe_UQGnx1_hxn4gwzpC2dwrxQq0Bw8KGHofOM7LjQV125rhAA"
                        },
                        {
                          "domain": ".youtube.com",
                          "expirationDate": 1764788286.674186,
                          "hostOnly": false,
                          "httpOnly": true,
                          "name": "__Secure-1PSID",
                          "path": "/",
                          "sameSite": "unspecified",
                          "secure": true,
                          "session": false,
                          "storeId": "0",
                          "value": "g.a000pgiO1UQ3aKu_TMF4yJ-gjhqaen2U7GGSbc8z-QOsyHRVH-DEVp_4gFduIvGVCwGnvme5vQACgYKAfESARISFQHGX2MigONfPiJ-T0f_lj52Iwb1DxoVAUF8yKoMmEvrmSb-N9bFHpD3EDan0076"
                        },
                        {
                          "domain": ".youtube.com",
                          "expirationDate": 1764788286.674237,
                          "hostOnly": false,
                          "httpOnly": true,
                          "name": "__Secure-3PSID",
                          "path": "/",
                          "sameSite": "no_restriction",
                          "secure": true,
                          "session": false,
                          "storeId": "0",
                          "value": "g.a000pgiO1UQ3aKu_TMF4yJ-gjhqaen2U7GGSbc8z-QOsyHRVH-DEKzAhFL_b2yIzqM6S-oMrjwACgYKAUISARISFQHGX2MiZ9dVHSHZorvxu3c2co4uMhoVAUF8yKqHwSjqptGFpCGTaSiK7NQk0076"
                        },
                        {
                          "domain": ".youtube.com",
                          "expirationDate": 1764788286.674313,
                          "hostOnly": false,
                          "httpOnly": true,
                          "name": "HSID",
                          "path": "/",
                          "sameSite": "unspecified",
                          "secure": false,
                          "session": false,
                          "storeId": "0",
                          "value": "AahM6ArRNCRXABgqN"
                        },
                        {
                          "domain": ".youtube.com",
                          "expirationDate": 1764788286.674351,
                          "hostOnly": false,
                          "httpOnly": true,
                          "name": "SSID",
                          "path": "/",
                          "sameSite": "unspecified",
                          "secure": true,
                          "session": false,
                          "storeId": "0",
                          "value": "ApoqMbAzkYdPr-rRe"
                        },
                        {
                          "domain": ".youtube.com",
                          "expirationDate": 1764788286.674389,
                          "hostOnly": false,
                          "httpOnly": false,
                          "name": "APISID",
                          "path": "/",
                          "sameSite": "unspecified",
                          "secure": false,
                          "session": false,
                          "storeId": "0",
                          "value": "k1MMl0KS1QVLetK5/AFn4dbbDv8jWRlgYH"
                        },
                        {
                          "domain": ".youtube.com",
                          "expirationDate": 1764788286.674429,
                          "hostOnly": false,
                          "httpOnly": false,
                          "name": "SAPISID",
                          "path": "/",
                          "sameSite": "unspecified",
                          "secure": true,
                          "session": false,
                          "storeId": "0",
                          "value": "ekGn737cJ3UuE_Rc/ABzNmv9-9AJ6cuWLb"
                        },
                        {
                          "domain": ".youtube.com",
                          "expirationDate": 1764788286.674497,
                          "hostOnly": false,
                          "httpOnly": false,
                          "name": "__Secure-1PAPISID",
                          "path": "/",
                          "sameSite": "unspecified",
                          "secure": true,
                          "session": false,
                          "storeId": "0",
                          "value": "ekGn737cJ3UuE_Rc/ABzNmv9-9AJ6cuWLb"
                        },
                        {
                          "domain": ".youtube.com",
                          "expirationDate": 1764788286.674556,
                          "hostOnly": false,
                          "httpOnly": false,
                          "name": "__Secure-3PAPISID",
                          "path": "/",
                          "sameSite": "no_restriction",
                          "secure": true,
                          "session": false,
                          "storeId": "0",
                          "value": "ekGn737cJ3UuE_Rc/ABzNmv9-9AJ6cuWLb"
                        },
                        {
                          "domain": ".youtube.com",
                          "expirationDate": 1764788286.796212,
                          "hostOnly": false,
                          "httpOnly": true,
                          "name": "LOGIN_INFO",
                          "path": "/",
                          "sameSite": "no_restriction",
                          "secure": true,
                          "session": false,
                          "storeId": "0",
                          "value": "AFmmF2swRgIhAI34b6VRRHBs0HNnVjszUZWvY-zerzevTW8OZu32Omn9AiEAwD5vLD0BfhnOKII4U7ni8M0OWNJ82YmAMS7ucyHkdhs:QUQ3MjNmeWlkamJ1NElQemJPN2g2SmFkaVV2a0ROX0JZUWJSXzhxR3ZfQW1WV3R0QlcwYUZvaklET1c1NTVNN2llLU8tY2VhVlotb3A5cGJGQW1yZTQwV0JTWDk4bk1UTXkxZ2I4ZHlEemtab1ZRNzV3dzVZLUYyWks1d2lpSTJmMnlMSnFVZmV6bUxzNVRTcFIxUFI2bG0yUG9VMXJwRmpB"
                        },
                        {
                          "domain": ".youtube.com",
                          "expirationDate": 1761764295.940648,
                          "hostOnly": false,
                          "httpOnly": false,
                          "name": "SIDCC",
                          "path": "/",
                          "sameSite": "unspecified",
                          "secure": false,
                          "session": false,
                          "storeId": "0",
                          "value": "AKEyXzXq-k2HFUoT5PN8cXk-SpnxZLi60aJ36juQHlOVyBbTwIUEvdcpGusy3wq2igncjG8_xA"
                        },
                        {
                          "domain": ".youtube.com",
                          "expirationDate": 1761764295.940783,
                          "hostOnly": false,
                          "httpOnly": true,
                          "name": "__Secure-1PSIDCC",
                          "path": "/",
                          "sameSite": "unspecified",
                          "secure": true,
                          "session": false,
                          "storeId": "0",
                          "value": "AKEyXzU7p4keYskwZcMtxIEfAvst8xQWyWumNjNMBEd6APsKh5yv7c4Qtl7y2D0kUIUvH8SwlA"
                        },
                        {
                          "domain": ".youtube.com",
                          "expirationDate": 1761764295.940856,
                          "hostOnly": false,
                          "httpOnly": true,
                          "name": "__Secure-3PSIDCC",
                          "path": "/",
                          "sameSite": "no_restriction",
                          "secure": true,
                          "session": false,
                          "storeId": "0",
                          "value": "AKEyXzVNMSTeeecHF0luDgZAQwHGX4RmqXWMDdMfTtwuYPlLHVO9-FT96J_uet4wBvxj6ygx"
                        }
                      ] // Reemplaza con tus cookies
                }
            }
        });

        videoStream.pipe(fs.createWriteStream(videoPath))
            .on('finish', () => console.log('Video descargado exitosamente.'))
            .on('error', (err) => console.error('Error durante la escritura del archivo:', err));

    } catch (error) {
        handleDownloadError(error);
    }
}



downloadVideo("https://www.youtube.com/watch?v=es34Nr2JovU"); */


const path = require('path');
//const fs = require('fs');


// To get your YouTube cookie
// - navigate to YouTube in a web browser
// - open up dev tools (opt+cmd+j on mac)
// - go to the network tab
// - click on a request on the left
// - scroll down to "Request Headers"
// - find the "cookie" header and copy its entire contents
const COOKIE = [
    {
      "domain": ".youtube.com",
      "expirationDate": 1764931303.290372,
      "hostOnly": false,
      "httpOnly": false,
      "name": "PREF",
      "path": "/",
      "sameSite": "unspecified",
      "secure": true,
      "session": false,
      "storeId": "0",
      "value": "tz=America.Chicago"
    },
    {
      "domain": ".youtube.com",
      "expirationDate": 1764788286.67383,
      "hostOnly": false,
      "httpOnly": false,
      "name": "SID",
      "path": "/",
      "sameSite": "unspecified",
      "secure": false,
      "session": false,
      "storeId": "0",
      "value": "g.a000pgiO1UQ3aKu_TMF4yJ-gjhqaen2U7GGSbc8z-QOsyHRVH-DEI4DgSHtg5WGVF3fJ3aYdOgACgYKAaMSARISFQHGX2MiRy_4iMwpHF8FVPqS4Vc1FxoVAUF8yKoiDLP-894xQxxaixP5tmQA0076"
    },
    {
      "domain": ".youtube.com",
      "expirationDate": 1764788286.674186,
      "hostOnly": false,
      "httpOnly": true,
      "name": "__Secure-1PSID",
      "path": "/",
      "sameSite": "unspecified",
      "secure": true,
      "session": false,
      "storeId": "0",
      "value": "g.a000pgiO1UQ3aKu_TMF4yJ-gjhqaen2U7GGSbc8z-QOsyHRVH-DEVp_4gFduIvGVCwGnvme5vQACgYKAfESARISFQHGX2MigONfPiJ-T0f_lj52Iwb1DxoVAUF8yKoMmEvrmSb-N9bFHpD3EDan0076"
    },
    {
      "domain": ".youtube.com",
      "expirationDate": 1764788286.674237,
      "hostOnly": false,
      "httpOnly": true,
      "name": "__Secure-3PSID",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "session": false,
      "storeId": "0",
      "value": "g.a000pgiO1UQ3aKu_TMF4yJ-gjhqaen2U7GGSbc8z-QOsyHRVH-DEKzAhFL_b2yIzqM6S-oMrjwACgYKAUISARISFQHGX2MiZ9dVHSHZorvxu3c2co4uMhoVAUF8yKqHwSjqptGFpCGTaSiK7NQk0076"
    },
    {
      "domain": ".youtube.com",
      "expirationDate": 1764788286.674313,
      "hostOnly": false,
      "httpOnly": true,
      "name": "HSID",
      "path": "/",
      "sameSite": "unspecified",
      "secure": false,
      "session": false,
      "storeId": "0",
      "value": "AahM6ArRNCRXABgqN"
    },
    {
      "domain": ".youtube.com",
      "expirationDate": 1764788286.674351,
      "hostOnly": false,
      "httpOnly": true,
      "name": "SSID",
      "path": "/",
      "sameSite": "unspecified",
      "secure": true,
      "session": false,
      "storeId": "0",
      "value": "ApoqMbAzkYdPr-rRe"
    },
    {
      "domain": ".youtube.com",
      "expirationDate": 1764788286.674389,
      "hostOnly": false,
      "httpOnly": false,
      "name": "APISID",
      "path": "/",
      "sameSite": "unspecified",
      "secure": false,
      "session": false,
      "storeId": "0",
      "value": "k1MMl0KS1QVLetK5/AFn4dbbDv8jWRlgYH"
    },
    {
      "domain": ".youtube.com",
      "expirationDate": 1764788286.674429,
      "hostOnly": false,
      "httpOnly": false,
      "name": "SAPISID",
      "path": "/",
      "sameSite": "unspecified",
      "secure": true,
      "session": false,
      "storeId": "0",
      "value": "ekGn737cJ3UuE_Rc/ABzNmv9-9AJ6cuWLb"
    },
    {
      "domain": ".youtube.com",
      "expirationDate": 1764788286.674497,
      "hostOnly": false,
      "httpOnly": false,
      "name": "__Secure-1PAPISID",
      "path": "/",
      "sameSite": "unspecified",
      "secure": true,
      "session": false,
      "storeId": "0",
      "value": "ekGn737cJ3UuE_Rc/ABzNmv9-9AJ6cuWLb"
    },
    {
      "domain": ".youtube.com",
      "expirationDate": 1764788286.674556,
      "hostOnly": false,
      "httpOnly": false,
      "name": "__Secure-3PAPISID",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "session": false,
      "storeId": "0",
      "value": "ekGn737cJ3UuE_Rc/ABzNmv9-9AJ6cuWLb"
    },
    {
      "domain": ".youtube.com",
      "expirationDate": 1764788286.796212,
      "hostOnly": false,
      "httpOnly": true,
      "name": "LOGIN_INFO",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "session": false,
      "storeId": "0",
      "value": "AFmmF2swRgIhAI34b6VRRHBs0HNnVjszUZWvY-zerzevTW8OZu32Omn9AiEAwD5vLD0BfhnOKII4U7ni8M0OWNJ82YmAMS7ucyHkdhs:QUQ3MjNmeWlkamJ1NElQemJPN2g2SmFkaVV2a0ROX0JZUWJSXzhxR3ZfQW1WV3R0QlcwYUZvaklET1c1NTVNN2llLU8tY2VhVlotb3A5cGJGQW1yZTQwV0JTWDk4bk1UTXkxZ2I4ZHlEemtab1ZRNzV3dzVZLUYyWks1d2lpSTJmMnlMSnFVZmV6bUxzNVRTcFIxUFI2bG0yUG9VMXJwRmpB"
    },
    {
      "domain": ".youtube.com",
      "expirationDate": 1761915722.287584,
      "hostOnly": false,
      "httpOnly": true,
      "name": "__Secure-1PSIDTS",
      "path": "/",
      "sameSite": "unspecified",
      "secure": true,
      "session": false,
      "storeId": "0",
      "value": "sidts-CjIBQT4rXxzaguzdV1wPWtLNo_V2IWC3YQtYeVP4m43ciki3H4U8khI_VPZZV6H0Oc6wfxAA"
    },
    {
      "domain": ".youtube.com",
      "expirationDate": 1761915722.287733,
      "hostOnly": false,
      "httpOnly": true,
      "name": "__Secure-3PSIDTS",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "session": false,
      "storeId": "0",
      "value": "sidts-CjIBQT4rXxzaguzdV1wPWtLNo_V2IWC3YQtYeVP4m43ciki3H4U8khI_VPZZV6H0Oc6wfxAA"
    },
    {
      "domain": ".youtube.com",
      "expirationDate": 1761915722.28782,
      "hostOnly": false,
      "httpOnly": false,
      "name": "SIDCC",
      "path": "/",
      "sameSite": "unspecified",
      "secure": false,
      "session": false,
      "storeId": "0",
      "value": "AKEyXzV6dZaLm0-aEA8MS7YYE0PkksBdRUh4yU6_vug4P2pUhffEq8gCRGQONoUXHj40Qt-sUQ"
    },
    {
      "domain": ".youtube.com",
      "expirationDate": 1761915722.287893,
      "hostOnly": false,
      "httpOnly": true,
      "name": "__Secure-1PSIDCC",
      "path": "/",
      "sameSite": "unspecified",
      "secure": true,
      "session": false,
      "storeId": "0",
      "value": "AKEyXzUK0cnfxK8n2w73OkjN0mSJ2Nis7NdlWvov9Kc_2KV4JfKBSpcIPfbZAlJGPSWGIZl6zA"
    },
    {
      "domain": ".youtube.com",
      "expirationDate": 1761915722.287961,
      "hostOnly": false,
      "httpOnly": true,
      "name": "__Secure-3PSIDCC",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "session": false,
      "storeId": "0",
      "value": "AKEyXzVnKogBWvg_i5f216ZxfpNMHQw5aNnf28Liq2muHnuDYWqhIsPK8IQtypxzID0Se8OS"
    }
  ];
/* const videoID = 'es34Nr2JovU';

const outputName = 'video.mp4';
const outputPath = path.resolve(__dirname, outputName);
const video = ytdl(videoID, {
  requestOptions: {
    headers: {
      cookie: COOKIE,
      // Optional. If not given, ytdl-core will try to find it.
      // You can find this by going to a video's watch page, viewing the source,
      // and searching for "ID_TOKEN".
      // 'x-youtube-identity-token': 1324,
    },
  },
});

video.on('info', info => {
  console.log('title:', info.videoDetails.title);
  console.log('rating:', info.player_response.videoDetails.averageRating);
  console.log('uploaded by:', info.videoDetails.author.name);
});

video.on('progress', (chunkLength, downloaded, total) => {
  const percent = downloaded / total;
  console.log('downloading', `${(percent * 100).toFixed(1)}%`);
  setTimeout(() => {
      
      console.log('hooooooolaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  }, 10000000);
});

video.on('end', () => {
  console.log('saved to', outputName);
});

video.pipe(fs.createWriteStream(outputPath)); */


/* const fs = require('fs');
const ytdl = require('ytdl-core');
const path = require('path'); */

const videoID = 'es34Nr2JovU';
const outputName = 'video.mp4';
const outputPath = path.resolve(__dirname, outputName);

// Función de manejo de errores
function handleDownloadError(error) {
    console.log(error)
    if (error.message.includes("410")) {
        console.error("Error 410: El recurso solicitado ha sido eliminado o no está disponible.");
    } else if (error.message.includes("403")) {
        console.error("Error 403: Acceso denegado. El video puede estar restringido por derechos de autor o geobloqueado.");
    } else if (error.message.includes("ETIMEDOUT")) {
        console.error("Error: Tiempo de espera agotado. Verifica tu conexión a Internet o intenta nuevamente más tarde.");
    } else if (error.message.includes("ENOTFOUND")) {
        console.error("Error: No se pudo encontrar el servidor. Verifica la URL o tu conexión a Internet.");
    } else if (error.message.includes("ECONNRESET")) {
        console.error("Error: Conexión restablecida. Puede ser un problema temporal de la red.");
    } else if (error.message.includes("IP Blocked")) {
        console.error("Error: Tu IP ha sido bloqueada temporalmente por YouTube. Intenta usar una VPN o espera un tiempo.");
    } else {
        console.error("Error desconocido:", error);
    }
}

(async () => {
    try {
        const video = ytdl('https://www.youtube.com/watch?v=uDb5qFQblmg');

        video.on('info', info => {
            console.log('title:', info.videoDetails.title);
            console.log('rating:', info.player_response.videoDetails.averageRating);
            console.log('uploaded by:', info.videoDetails.author.name);
        });
        video.on('error', error => {handleDownloadError(error)})

        video.on('progress', (chunkLength, downloaded, total) => {
            const percent = downloaded / total;
            console.log('downloading', `${(percent * 100).toFixed(1)}%`);
        });

        video.on('end', () => {
            console.log('saved to', outputName);
        });

        video.pipe(fs.createWriteStream(outputPath));
    } catch (error) {
        handleDownloadError(error);
    }
})();
