document.addEventListener("DOMContentLoaded", function () {

    let user = JSON.parse(localStorage.getItem("smartmom_user"));

    if (!user) {
        alert("Silakan login terlebih dahulu");
        window.location.href = "signin.html";
        return;
    }

    const popup = document.getElementById("popup");
    const popupBtn = document.getElementById("popupBtn");

    function showPopup(title, message){
        document.getElementById("popupTitle").innerText = title;
        document.getElementById("popupMessage").innerText = message;
        popup.style.display = "flex";
    }

    function closePopup(){
        popup.style.display = "none";
    }

    if(popupBtn){
        popupBtn.addEventListener("click", closePopup);
    }

    if(popup){
        popup.addEventListener("click", function(e){
            if(e.target === popup){
                closePopup();
            }
        });
    }

    const namaInput = document.getElementById("namaAnak");
    const lahirInput = document.getElementById("tglLahir");
    const tglUkurInput = document.getElementById("tglUkur");

    const beratInput = document.getElementById("berat");
    const tinggiInput = document.getElementById("tinggi");
    const kepalaInput = document.getElementById("kepala");

    const genderButtons = document.querySelectorAll(".gender");
    const usiaText = document.querySelector(".text-sm");

    let selectedGender = "";

    if (user.anak) {
        namaInput.value = user.anak.nama;
        lahirInput.value = user.anak.tglLahir;

        namaInput.disabled = true;
        lahirInput.disabled = true;

        selectedGender = user.anak.gender || "";

        genderButtons.forEach(btn => {
            if(btn.innerText === selectedGender){
                btn.classList.add("active");
            }
        });

        tglUkurInput.value = new Date().toISOString().split("T")[0];
    }

    lahirInput.addEventListener("change", () => {

        const lahir = new Date(lahirInput.value);
        const sekarang = new Date();

        let bulan =
            (sekarang.getFullYear() - lahir.getFullYear()) * 12 +
            (sekarang.getMonth() - lahir.getMonth());

        if (!isNaN(bulan) && usiaText) {
            usiaText.innerText = "Usia anak : " + bulan + " bulan";
        }
    });

    genderButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            genderButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            selectedGender = btn.innerText;
        });
    });

    document.getElementById("btnSimpan").addEventListener("click", function () {

        const nama = namaInput.value.trim();
        const tglLahir = lahirInput.value;
        const tglUkur = tglUkurInput.value;

        const berat = parseFloat(beratInput.value);
        const tinggi = parseFloat(tinggiInput.value);
        const kepala = parseFloat(kepalaInput.value);

        if (!nama || !tglLahir || !tglUkur) {
            showPopup("Data Anak Belum Lengkap", "Mohon isi nama anak, tanggal lahir, dan tanggal pengukuran.");
            return;
        }

        if (!berat || !tinggi || !kepala) {
            showPopup("Data Pengukuran Belum Lengkap", "Mohon isi berat badan, tinggi badan, dan lingkar kepala.");
            return;
        }

        if (!selectedGender) {
            showPopup("Jenis Kelamin Belum Dipilih", "Silakan pilih jenis kelamin anak.");
            return;
        }

        if (berat <= 0 || tinggi <= 0 || kepala <= 0) {
            showPopup("Data Tidak Valid", "Pastikan semua nilai pengukuran lebih dari 0.");
            return;
        }

        if (!user.anak) {
            user.anak = {
                nama: nama,
                tglLahir: tglLahir,
                gender: selectedGender,
                pengukuran: []
            };
        }

        user.anak.pengukuran.push({
            tgl: tglUkur,
            berat: berat,
            tinggi: tinggi,
            kepala: kepala
        });

        localStorage.setItem("smartmom_user", JSON.stringify(user));

        window.location.href = "calcullator-analisis.html";

    });

});