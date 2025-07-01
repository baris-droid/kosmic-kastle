// Mobil Navigasyon Toggle (Zaten var olması lazım)

console.log("script.js yüklendi ve çalışıyor!"); 

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });

        // Menü açıkken dışarıya tıklayınca kapatma
        document.addEventListener('click', (event) => {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // ESC tuşuna basınca menüyü kapatma
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Oyun Kategorisi Sekmeleri (Yeni Eklenecek Kısım)
    const tabButtons = document.querySelectorAll('.tab-button');
    const categoryContents = document.querySelectorAll('.category-content');

    if (tabButtons.length > 0 && categoryContents.length > 0) { // Sadece ilgili elemanlar varsa çalıştır
		console.log("Oyun sekme butonları ve içerikleri bulundu!");
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Tüm butonlardaki 'active' sınıfını kaldır
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Tıklanan butona 'active' sınıfını ekle
                button.classList.add('active');

                // Tüm içerik alanlarını gizle
                categoryContents.forEach(content => {
                    content.classList.remove('active');
                    // Ekstra: Geçiş efekti için opacity'yi de yönetebiliriz
                    // content.style.opacity = '0';
                    // content.style.display = 'none';
					content.style.display = 'none';
                });

                // Tıklanan butona ait içerik alanını göster
                const targetId = button.dataset.category + '-games';
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                    // Ekstra: Geçiş efekti için
                    // setTimeout(() => {
                    //     targetContent.style.display = 'grid'; // display: grid geri getir
                    //     targetContent.style.opacity = '1';
					targetContent.style.display = 'grid';
                    // }, 50); // Küçük bir gecikme transition'ın çalışması için
                }
            });
        });

        // Sayfa yüklendiğinde varsayılan olarak "Çıkan Oyunlar" sekmesini aktif et
        // HTML'de zaten '.tab-button.active' sınıfı tanımlı, bu yüzden ilk butona tıklama simülasyonu yapıyoruz.
        const defaultActiveButton = document.querySelector('.tab-button.active');
        if (defaultActiveButton) {
            defaultActiveButton.click();
        } else {
            // Eğer HTML'de active sınıfı yoksa, ilk butonu aktif et
            if (tabButtons[0]) {
                tabButtons[0].click();
            }
        }
    }else {
        console.log("Uyarı: Oyun sekme butonları veya içerikleri bulunamadı. tabButtons.length:", tabButtons.length, "categoryContents.length:", categoryContents.length);
    }
});