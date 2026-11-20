const PROJELER = [
  { id: "finans-merkezi", ad: "Finans Merkezi Otoyol Bağlantıları", yer: "İstanbul, Ataşehir", yil: "Devam ediyor", sure: "24 ay", sektor: "Köprü ve viyadük", beton: 40000, donati: 7000, durum: "Devam ediyor",
    metin: "Otoyol bağlantı viyadüklerinin ayak, başlık ve tabliye imalatı. Yoğun kent trafiğinin ortasında, dar şantiye alanında kalıp, donatı ve döküm aynı ekipten yürüyor.",
    foto: Array.from({ length: 13 }, (_, i) => `img/finans-${String(i + 1).padStart(2, "0")}.webp`), kapak: "img/finans-13.webp" },
  { id: "egiste", ad: "Eğiste Viyadüğü", yer: "Konya", yil: "2016–2020", sektor: "Köprü ve viyadük", beton: 180000, donati: 30000,
    metin: "Derin vadiyi geçen viyadükte ayak gövdeleri ve kalıp arabasıyla ilerleyen tabliye imalatı. Kurucu kadronun en büyük metrajlı işi.",
    foto: ["img/folio-egiste.webp"], kapak: "img/folio-egiste.webp" },
  { id: "kuru-mama", ad: "Kuru Mama Üretim Tesisi", yer: "Balıkesir", yil: "2023–2025", sektor: "Endüstriyel", kalip: 200000, beton: 100000, donati: 10000,
    metin: "Ağır makine temelleri, perde ve döşemeleriyle bir gıda üretim tesisinin bütün betonarme taşıyıcı sistemi." },
  { id: "asya-aritma", ad: "Asya Bölgesi Arıtma Tesisi", yer: "", yil: "24 ay", sektor: "Su ve altyapı", kalip: 120000, beton: 46000, donati: 5500,
    metin: "Sızdırmazlık şartı taşıyan havuz perdeleri ve radye imalatı; derz ve su tutucu detaylarında sıfır tolerans." },
  { id: "helikopter", ad: "Helikopter Üretim Tesisi", yer: "Ankara", yil: "2023–2024", sektor: "Endüstriyel",
    metin: "Geniş açıklıklı üretim holleri ve destek binalarının betonarme imalatı." },
  { id: "yusufeli", ad: "Baraj Köprüleri", yer: "Artvin, Yusufeli", yil: "2022–2023", sektor: "Köprü ve viyadük",
    metin: "Baraj gölünün yükselmesiyle yeniden kurulan ulaşım hattında köprü ayakları ve tabliyeler. Sarp arazide sınırlı erişimle imalat.",
    foto: ["img/yusufeli.webp"], kapak: "img/yusufeli.webp" },
  { id: "tekstilkent", ad: "Tekstilkent Köprüsü", yer: "İstanbul", yil: "2019–2020", sektor: "Köprü ve viyadük", beton: 50000, donati: 5000,
    metin: "Yoğun kentsel alanda trafik akışı sürerken köprü taşıyıcı sisteminin imalatı." },
  { id: "baku", ad: "Viyadük ve Köprü İşleri", yer: "Bakü, Azerbaycan", yil: "2010–2017", sektor: "Köprü ve viyadük",
    metin: "Yedi yıla yayılan yurt dışı programında birden fazla viyadük ve köprünün betonarme imalatı." },
  { id: "rafineri", ad: "Rafineri İdari Binası", yer: "Kırıkkale", yil: "2013–2015", sektor: "Ticari ve idari",
    metin: "İşletme içinde, çalışan bir tesisin güvenlik kurallarına uyarak idari binanın kaba yapısı." },
];

const SEKTORLER = ["Tümü", ...new Set(PROJELER.map(p => p.sektor))];
const sayi = n => n == null ? "" : n.toLocaleString("tr-TR");
const $ = s => document.querySelector(s);

/* ---------- proje listesi ---------- */
let secili = "Tümü";
function filtreCiz() {
  $("#filtre").innerHTML = SEKTORLER.map(s =>
    `<button type="button" aria-pressed="${s === secili}" data-s="${s}">${s}</button>`).join("");
}
function listeCiz() {
  const liste = PROJELER.filter(p => secili === "Tümü" || p.sektor === secili);
  $("#projeListe").innerHTML = liste.map(p => `
    <li><a href="#proje-${p.id}"${p.kapak ? ` data-foto="${p.kapak}"` : ""}>
      <span class="p-ad">${p.ad}${p.durum ? `<small>${p.durum}</small>` : ""}</span>
      <span class="p-yer">${p.yer || "—"}</span>
      <span class="p-yil">${p.yil}</span>
      <span class="p-sek">${p.sektor}</span>
      <span class="ok">→</span>
    </a></li>`).join("");
}
$("#filtre").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  secili = b.dataset.s; filtreCiz(); listeCiz();
});
function tabloCiz() {
  const m = PROJELER.filter(p => p.beton || p.kalip || p.donati);
  const top = k => m.reduce((t, p) => t + (p[k] || 0), 0);
  $("#tablo tbody").innerHTML = m.map(p =>
    `<tr><td>${p.ad}</td><td class="mono">${p.yil}</td><td class="sag">${sayi(p.kalip)}</td><td class="sag">${sayi(p.beton)}</td><td class="sag">${sayi(p.donati)}</td></tr>`).join("");
  $("#tablo tfoot").innerHTML = `<tr><td>Toplam</td><td></td><td class="sag">${sayi(top("kalip"))}</td><td class="sag">${sayi(top("beton"))}</td><td class="sag">${sayi(top("donati"))}</td></tr>`;
}

const onizle = document.createElement("img");
onizle.className = "onizle"; onizle.alt = ""; document.body.appendChild(onizle);
$("#projeListe").addEventListener("mousemove", e => {
  const a = e.target.closest("a[data-foto]");
  if (!a || !matchMedia("(hover: hover) and (min-width: 1101px)").matches) { onizle.classList.remove("gor"); return; }
  if (onizle.getAttribute("src") !== a.dataset.foto) onizle.src = a.dataset.foto;
  onizle.style.transform = `translate(${e.clientX + 28}px, ${e.clientY - 120}px)`;
  onizle.classList.add("gor");
});
$("#projeListe").addEventListener("mouseleave", () => onizle.classList.remove("gor"));
window.addEventListener("hashchange", () => onizle.classList.remove("gor"));

/* ---------- proje detay ---------- */
function detayCiz(id) {
  const i = PROJELER.findIndex(p => p.id === id);
  const p = PROJELER[i] || PROJELER[0];
  const sonraki = PROJELER[(i + 1) % PROJELER.length];
  const metraj = [["kalip", "m²", "kalıp"], ["beton", "m³", "beton"], ["donati", "t", "donatı"]]
    .filter(([k]) => p[k]).map(([k, b, a]) => `<div><span class="sayi">${sayi(p[k])}</span><span class="birim">${b}</span><span class="aciklama">${a}</span></div>`).join("");
  let gorsel = "";
  if (p.foto && p.foto.length > 2) {
    gorsel = `<div class="galeri">${p.foto.map((f, n) => `<button type="button" data-n="${n}"><img src="${f}" alt="${p.ad}, fotoğraf ${n + 1}" loading="lazy"></button>`).join("")}</div>`;
  } else if (p.foto) {
    gorsel = `<img class="pd-tek" src="${p.kapak}" alt="${p.ad}">`;
  } else {
    gorsel = `<div class="pd-tipo"><div class="ic"><p>${p.metin}</p></div></div>`;
  }
  $("#projeDetay").innerHTML = `
    <div class="pd-kafa"><div class="ic">
      <a class="pd-geri" href="#projeler">← Projeler</a>
      <h1 class="sayfa-baslik">${p.ad}</h1>
      <dl class="pd-bilgi">
        <div><dt>Konum</dt><dd>${p.yer || "—"}</dd></div>
        <div><dt>Dönem</dt><dd>${p.yil}${p.sure && p.sure !== p.yil ? ", " + p.sure : ""}</dd></div>
        <div><dt>Sektör</dt><dd>${p.sektor}</dd></div>
        <div><dt>Rolümüz</dt><dd>Kaba yapı alt yüklenicisi</dd></div>
      </dl>
      ${metraj ? `<div class="pd-metraj">${metraj}</div>` : ""}
      ${p.foto ? `<p class="giris-metin" style="margin-top:56px;max-width:30ch">${p.metin}</p>` : ""}
    </div></div>
    ${gorsel}
    <div class="ic pd-sonraki"><a href="#proje-${sonraki.id}"><span>Sonraki proje</span><strong>${sonraki.ad} <span class="ok">→</span></strong></a></div>`;
  const g = $("#projeDetay .galeri");
  if (g) g.addEventListener("click", e => { const b = e.target.closest("button"); if (b) isikAc(p.foto, +b.dataset.n); });
}

/* ---------- ışık kutusu ---------- */
let isikListe = [], isikNo = 0, isikOnce = null;
function isikGoster() {
  $("#isikFoto").src = isikListe[isikNo];
  $("#isikSayac").textContent = `${isikNo + 1} / ${isikListe.length}`;
}
function isikAc(liste, n) {
  isikOnce = document.activeElement;
  isikListe = liste; isikNo = n; isikGoster();
  $("#isik").hidden = false; document.body.style.overflow = "hidden"; $("#isikKapat").focus();
}
function isikKapat() {
  $("#isik").hidden = true; document.body.style.overflow = "";
  if (isikOnce) isikOnce.focus();
}
const isikKay = d => { isikNo = (isikNo + d + isikListe.length) % isikListe.length; isikGoster(); };
$("#isikKapat").onclick = isikKapat;
$("#isikGeri").onclick = () => isikKay(-1);
$("#isikIleri").onclick = () => isikKay(1);
$("#isik").addEventListener("click", e => { if (e.target.id === "isik") isikKapat(); });
document.addEventListener("keydown", e => {
  if ($("#isik").hidden) return;
  if (e.key === "Escape") isikKapat();
  if (e.key === "ArrowLeft") isikKay(-1);
  if (e.key === "ArrowRight") isikKay(1);
});

/* ---------- yönlendirme ---------- */
const ust = $("#ust");
function yonlendir() {
  const ham = location.hash.slice(1);
  let sayfa = ham || "ana", tur = null;
  if (["teklif", "kariyer", "tedarikci"].includes(sayfa)) { tur = sayfa; sayfa = "iletisim"; }
  if (sayfa.startsWith("proje-")) { detayCiz(sayfa.slice(6)); sayfa = "proje"; }
  if (!document.querySelector(`[data-sayfa="${sayfa}"]`)) sayfa = "ana";
  document.querySelectorAll(".sayfa").forEach(s => {
    const ac = s.dataset.sayfa === sayfa;
    s.hidden = !ac; s.classList.toggle("gir", ac);
  });
  document.querySelectorAll(".menu a").forEach(a =>
    a.classList.toggle("aktif", a.getAttribute("href") === "#" + (sayfa === "proje" ? "projeler" : sayfa)));
  if (tur) {
    const r = document.querySelector(`input[name="tur"][value="${tur}"]`);
    if (r) { r.checked = true; turDegisti(); }
  }
  document.body.dataset.sayfa = sayfa;
  menuKapat();
  window.scrollTo(0, 0);
  ustGuncelle();
  const t = { ana: "Betonarme kaba yapı", kurumsal: "Kurumsal", hizmetler: "Hizmetler", projeler: "Projeler", iletisim: "İletişim" }[sayfa];
  document.title = `Akağaç İnşaat — ${t || $("#projeDetay h1")?.textContent || ""}`;
}
function ustGuncelle() {
  const heroVar = document.body.dataset.sayfa === "ana";
  ust.classList.toggle("dolu", !heroVar || window.scrollY > window.innerHeight * 0.75);
}
window.addEventListener("hashchange", yonlendir);
window.addEventListener("scroll", ustGuncelle, { passive: true });

/* ---------- mobil menü ---------- */
const menuAc = $("#menuAc"), mobil = $("#mobilMenu");
function menuKapat() {
  mobil.hidden = true; menuAc.setAttribute("aria-expanded", "false"); menuAc.textContent = "Menü";
  document.body.classList.remove("mobil-acik"); document.body.style.overflow = "";
}
menuAc.addEventListener("click", () => {
  if (!mobil.hidden) return menuKapat();
  mobil.hidden = false; menuAc.setAttribute("aria-expanded", "true"); menuAc.textContent = "Kapat";
  document.body.classList.add("mobil-acik"); document.body.style.overflow = "hidden";
});

/* ---------- form ---------- */
const form = $("#form");
function turDegisti() {
  const tur = form.tur.value;
  $("#teklifAlanlari").hidden = tur !== "teklif";
}
form.addEventListener("change", e => { if (e.target.name === "tur") turDegisti(); });
form.addEventListener("submit", e => {
  e.preventDefault();
  const m = $("#formMesaj");
  if (!form.ad.value.trim() || !form.eposta.validity.valid || !form.eposta.value) {
    m.className = "form-mesaj hata"; m.textContent = "Ad soyad ve geçerli bir e-posta gerekli."; return;
  }
  if (!form.kvkk.checked) {
    m.className = "form-mesaj hata"; m.textContent = "Devam etmek için aydınlatma metnini onaylayın."; return;
  }
  m.className = "form-mesaj";
  m.textContent = "Bu bir taslak: form henüz bir yere gönderilmiyor.";
});

filtreCiz(); listeCiz(); tabloCiz(); turDegisti(); yonlendir();
