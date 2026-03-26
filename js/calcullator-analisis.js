document.addEventListener("DOMContentLoaded", function () {

    const loadingBox = document.getElementById("loadingBox");
    const resultCard = document.querySelector(".result-card");

    resultCard.style.display = "none";

    setTimeout(() => {
        loadAnalisis();
    }, 1500);

    function loadAnalisis(){

        const user = JSON.parse(localStorage.getItem("smartmom_user"));

        if (!user || !user.anak) {
            alert("Data anak belum diisi");
            window.location.href = "calcullator-input.html";
            return;
        }

        const data = user.anak;

        if (!data.pengukuran || data.pengukuran.length === 0) {
            alert("Belum ada data pengukuran");
            window.location.href = "calcullator-input.html";
            return;
        }

        const pengukuran = data.pengukuran[data.pengukuran.length - 1];

        const berat = pengukuran.berat;
        const tinggi = pengukuran.tinggi;
        const kepala = pengukuran.kepala;

        const lahir = new Date(data.tglLahir);
        const sekarang = new Date();

        let bulan =
            (sekarang.getFullYear() - lahir.getFullYear()) * 12 +
            (sekarang.getMonth() - lahir.getMonth());

        document.getElementById("namaAnak").innerText =
            data.nama + " - " + bulan + " Bulan";

        let statusBerat = (bulan < 12)
            ? (berat < 7 ? "Kurang" : "Normal")
            : (berat < 8.5 ? "Kurang" : "Normal");

        let statusTinggi = (bulan < 12)
            ? (tinggi < 65 ? "Kurang" : "Normal")
            : (tinggi < 72 ? "Kurang" : "Normal");

        let statusKepala = kepala < 40 ? "Kurang" : "Normal";

        document.getElementById("statusBerat").innerText = statusBerat;
        document.getElementById("statusTinggi").innerText = statusTinggi;
        document.getElementById("statusKepala").innerText = statusKepala;

        let score = 100;
        if(statusBerat === "Kurang") score -= 30;
        if(statusTinggi === "Kurang") score -= 30;
        if(statusKepala === "Kurang") score -= 40;

        let current = 0;
        let target = Math.max(score, 0);
        const scoreText = document.getElementById("score");

        const interval = setInterval(() => {
            if (current >= target) {
                clearInterval(interval);
                return;
            }
            current++;
            scoreText.innerText = current;
        }, 20);

        let jumlahKurang = [statusBerat, statusTinggi, statusKepala]
            .filter(s => s === "Kurang").length;

        let statusUtama = "";

        if (jumlahKurang === 0) {
            statusUtama = "Pertumbuhan Optimal";
        } else if (jumlahKurang === 1) {
            statusUtama = "Perlu Perhatian";
        } else {
            statusUtama = "Perlu Evaluasi";
        }

        document.getElementById("statusUtama").innerText = statusUtama;

        let insight = "";

        if (statusUtama === "Pertumbuhan Optimal") {
            insight = "Perkembangan anak sangat baik 👍 Pertahankan pola makan dan stimulasi yang konsisten.";
        }
        else if (statusUtama === "Perlu Perhatian") {
            insight = "Ada indikator yang perlu diperhatikan. Tingkatkan asupan nutrisi dan stimulasi anak.";
        }
        else {
            insight = "Beberapa indikator kurang optimal. Disarankan konsultasi dengan tenaga kesehatan.";
        }

        document.getElementById("insightText").innerText = insight;

        loadingBox.style.display = "none";
        resultCard.style.display = "flex";
    }

});