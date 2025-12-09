document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert("Sayın " + document.getElementById('name').value + ", mesajınız iletilmiştir.");
            this.reset();
        });
    }
    const filmKategorileri = document.querySelectorAll('.seri-kategorisi');

    if (filmKategorileri.length > 0) {

        filmKategorileri.forEach((kategori, kategoriIndex) => {

            const checkboxlar = kategori.querySelectorAll('input[type="checkbox"]');
            const sayacAlani = kategori.querySelector('.sayac');

            checkboxlar.forEach((kutu, kutuIndex) => {

                const benzersizID = `cat-${kategoriIndex}-movie-${kutuIndex}`;

                const kayitliDurum = localStorage.getItem(benzersizID);

                if (kayitliDurum === 'true') {
                    kutu.checked = true;
                }

                kutu.addEventListener('change', function() {
                    if (this.checked) {
                        localStorage.setItem(benzersizID, 'true'); 
                    } else {
                        localStorage.removeItem(benzersizID); 
                    }
                    sayaciGuncelle(); 
                });
            });

            function sayaciGuncelle() {
                const isaretliSayisi = kategori.querySelectorAll('input[type="checkbox"]:checked').length;
                const toplamSayi = checkboxlar.length;

                sayacAlani.textContent = `${isaretliSayisi} / ${toplamSayi} İzlenen`;

                if (isaretliSayisi === toplamSayi && toplamSayi > 0) {
                    sayacAlani.style.backgroundColor = '#27ae60';
                } else {
                    sayacAlani.style.backgroundColor = ''; 
                }
            }

            sayaciGuncelle();
        });
    }


});
