document.addEventListener('DOMContentLoaded', function() {

    /* ===========================================================
       1. İLETİŞİM FORMU (Sadece iletişim sayfasında çalışır)
    =========================================================== */
    const contactForm = document.getElementById('contactForm');

    // ÖNEMLİ: Eğer sayfada contactForm yoksa bu bloğa hiç girmez,
    // böylece diğer sayfalar hata vermez.
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert("Sayın " + document.getElementById('name').value + ", mesajınız iletilmiştir.");
            this.reset();
        });
    }

    /* ===========================================================
       2. FİLM TAKİP SİSTEMİ (Kaydetme Özellikli)
    =========================================================== */
    const filmKategorileri = document.querySelectorAll('.seri-kategorisi');

    if (filmKategorileri.length > 0) {

        // Her kategori için (DCEU, Dark Knight vs.)
        filmKategorileri.forEach((kategori, kategoriIndex) => {

            const checkboxlar = kategori.querySelectorAll('input[type="checkbox"]');
            const sayacAlani = kategori.querySelector('.sayac');

            // --- Hafızadan Yükleme ve ID Verme İşlemi ---
            checkboxlar.forEach((kutu, kutuIndex) => {
                // Her filme benzersiz bir kimlik (ID) veriyoruz.
                // Örn: "cat-0-movie-1" (1. kategorinin 2. filmi gibi)
                const benzersizID = `cat-${kategoriIndex}-movie-${kutuIndex}`;
                
                // Daha önce kaydedilmiş mi bak?
                const kayitliDurum = localStorage.getItem(benzersizID);
                
                // Eğer "true" kaydedildiyse kutuyu işaretle
                if (kayitliDurum === 'true') {
                    kutu.checked = true;
                }

                // Tıklandığında Kaydetme İşlemi
                kutu.addEventListener('change', function() {
                    if (this.checked) {
                        localStorage.setItem(benzersizID, 'true'); // Kaydet
                    } else {
                        localStorage.removeItem(benzersizID); // Sil
                    }
                    sayaciGuncelle(); // Sayacı yenile
                });
            });

            // --- Sayacı Güncelleyen Fonksiyon ---
            function sayaciGuncelle() {
                const isaretliSayisi = kategori.querySelectorAll('input[type="checkbox"]:checked').length;
                const toplamSayi = checkboxlar.length;

                sayacAlani.textContent = `${isaretliSayisi} / ${toplamSayi} İzlenen`;

                // Renk ayarı
                if (isaretliSayisi === toplamSayi && toplamSayi > 0) {
                    sayacAlani.style.backgroundColor = '#27ae60'; // Yeşil
                } else {
                    sayacAlani.style.backgroundColor = ''; // Orijinal
                }
            }

            // Sayfa açılışında sayacı ilk kez çalıştır
            sayaciGuncelle();
        });
    }

});