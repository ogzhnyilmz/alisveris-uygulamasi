
let urunler = [
    {
        ad: "Eti Burçak Sütlü Çikolatalı",
        fiyat: 32,
        stok: 10
    },
    {
        ad: "Eti Popkek Muzlu",
        fiyat: 15,
        stok: 20
    },
    {
        ad: "Didi Şeftali 500Ml",
        fiyat: 30,
        stok: 15
    }
];

let sepet = [];
let bakiye = 0;

function urunListele() {
    let liste = "\nÜrünler:\n";
    urunler.forEach((urun, i) => {
        liste += `${i + 1}. ${urun.ad} - Fiyat: ${urun.fiyat} TL, Stok: ${urun.stok}\n`;
    });
    alert(liste);
    return menu();
}

function sepetiGoster() {
    if (sepet.length === 0) {
        alert("Sepet boş.");
    } else {
        let sepetListesi = "\nSepet:\n";
        for (let i = 0; i < sepet.length; i++) {
            sepetListesi += sepet[i].ad + " - Fiyat: " + sepet[i].fiyat + " TL, Miktar: " + sepet[i].miktar + "\n";
        }
        alert(sepetListesi);
    }
    return menu();
}

function urunAl() {
    let liste = "\nÜrünler:\n";
    urunler.forEach(urun => { liste += urun.ad + " - Fiyat: " + urun.fiyat + " TL, Stok: " + urun.stok + "\n"; });
    alert(liste);

    let urunAdi = prompt("Almak istediğiniz ürünün adını girin:");

    let urun = urunler.find(urun => urun.ad.toLocaleLowerCase("tr") === urunAdi.toLocaleLowerCase("tr"));
    if (!urun) {
        alert("Geçersiz ürün adı.");
        return menu();
    }

    let miktar = Number(prompt("Kaç adet " + urun.ad + " almak istiyorsunuz?"));

    if (miktar <= 0 || Number(miktar) !== miktar) {
        alert("Geçersiz miktar.");
        return menu();
    }

    if (miktar > urun.stok) {
        alert("Yeterli stok yok.");
        return menu();
    }

    let toplamFiyat = urun.fiyat * miktar;
    if (toplamFiyat > bakiye) {
        alert("Yeterli bakiyeniz yok.");
        return menu();
    }

    urun.stok -= miktar;
    bakiye -= toplamFiyat;

    let sepetUrunu = sepet.find(eleman => eleman.ad === urun.ad);
    if (sepetUrunu) {
        sepetUrunu.miktar += miktar;
    } else {
        sepet.push({ ad: urun.ad, fiyat: urun.fiyat, miktar: miktar });
    }

    alert(miktar + " adet " + urun.ad + " sepete eklendi. Kalan bakiye: " + bakiye + " TL.");
    return menu();
}

function bakiyeEkle() {
    let miktar = Number(prompt("Eklemek istediğiniz bakiye miktarını girin:"));
    if (miktar > 0) {
        bakiye += miktar;
        alert("Bakiyenize " + miktar + " TL eklendi. Bakiyeniz: " + bakiye + " TL.");
    } else {
        alert("Geçersiz bakiye miktarı.");
    }
    return menu();
}

function bakiyeGoster() {
    alert("Mevcut bakiyeniz: " + bakiye + " TL");
    return menu();
}

function onay() {
    if (sepet.length === 0) {
        alert("Sepetiniz boş.");
        return menu();
    }
    alert("Siparişiniz alındı. Kuryemiz en kısa sürede siparişinizi kapınıza getirecektir...");
    return menu();
}

function menu() {
    const secim = prompt("Yapmak istediğiniz işlemi seçiniz.\n1-Ürünleri Listele\n2-Sepeti Göster\n3-Ürün Satın Al\n4-Bakiye Ekle\n5-Bakiyeyi Göster\n6-Sipariş Onayla\n7-Çıkış Yap");

    if (secim == 1) {
        return urunListele();
    } else if (secim == 2) {
        return sepetiGoster();
    } else if (secim == 3) {
        return urunAl();
    } else if (secim == 4) {
        return bakiyeEkle();
    } else if (secim == 5) {
        return bakiyeGoster();
    } else if (secim == 6) {
        return onay();
    } else if (secim == 7) {
        alert("Çıkış yapıldı.");
    } else {
        alert("Geçersiz seçim yaptınız.");
        return menu();
    }
}

menu();
