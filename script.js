document.getElementById("scan-btn").addEventListener("click", function () {
    const qrReader = document.getElementById("qr-reader");
    const qrResult = document.getElementById("qr-result");
    const qrValue = document.getElementById("qr-value");

    // Zeige den QR-Code-Scanner an
    qrReader.style.display = "block";
    qrResult.style.display = "none"; // Ergebnisse ausblenden

    // Initialisiere den QR-Code-Scanner
    const html5QrCode = new Html5Qrcode("qr-reader");

    // Starte den Scanner
    html5QrCode.start(
        { facingMode: "environment" }, // Rückkamera
        {
            fps: 10, // Frames pro Sekunde
            qrbox: { width: 250, height: 250 } // Größe des Scannerbereichs
        },
        (decodedText) => {
            // QR-Code erfolgreich gescannt
            html5QrCode.stop().then(() => {
                qrReader.style.display = "none";
                qrResult.style.display = "block";
                qrValue.textContent = decodedText;

                // Weiterleitung basierend auf QR-Code-Wert
                if (decodedText === "Onni") {
                    window.location.href = "onni.html"; // Weiterleitung zu Onni-Karten
                } else if (decodedText === "Uhka") {
                    window.location.href = "uhka.html"; // Weiterleitung zu Uhka-Karten
                } else {
                    alert("Unbekannter QR-Code: " + decodedText);
                }
            }).catch(err => {
                console.error("Fehler beim Stoppen des Scanners:", err);
            });
        },
        (errorMessage) => {
            console.log("QR-Code-Scan-Fehler: ", errorMessage);
        }
    ).catch((err) => {
        console.error("Kamera konnte nicht geöffnet werden: ", err);
    });
});
