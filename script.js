document.getElementById("scan-btn").addEventListener("click", function () {
    const qrReader = document.getElementById("qr-reader");
    const qrResult = document.getElementById("qr-result");
    const qrValue = document.getElementById("qr-value");

    qrReader.style.display = "block";

    const html5QrCode = new Html5Qrcode("qr-reader");

    // Start the QR code scanner
    html5QrCode.start(
        { facingMode: "environment" }, // Rückkamera
        {
            fps: 10, // Frame rate
            qrbox: { width: 250, height: 250 } // Scanner-Fenster
        },
        (decodedText) => {
            // Stop the scanner after detecting a QR code
            html5QrCode.stop().then(() => {
                qrReader.style.display = "none";
                qrResult.style.display = "block";
                qrValue.textContent = decodedText;

                // Logik, basierend auf QR-Code, hinzufügen (z.B. Weiterleitung)
                if (decodedText === "Onni") {
                    window.location.href = "onni.html"; // Onni Karte
                } else if (decodedText === "Uhka") {
                    window.location.href = "uhka.html"; // Uhka Karte
                } else {
                    alert("Unbekannter QR-Code: " + decodedText);
                }
            });
        },
        (errorMessage) => {
            console.log("Scan-Fehler: ", errorMessage);
        }
    ).catch((err) => {
        console.error("QR-Scanner konnte nicht gestartet werden: ", err);
    });
});
