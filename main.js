import API from "./scprits/api.js";
import UI from "./scprits/ui.js";

//Classın bir örneğini oluşturma
const api = new API();
const ui = new UI();

//sayfanın yüklenme olayını izle
document.addEventListener("DOMContentLoaded", async () => {
  //1- ekrana yükleme gifi bas
  ui.renderLoader();
  //2-apiye istek at
  await api.getPopular();

  //3-gelen verileri ekrana bas
  ui.renderCards(api.songs);
});

//formun önderilme olayını izle
ui.form.addEventListener("submit", async (event) => {
  //sayfayı yenilemeyi engelle
  event.preventDefault();
  //aratılan kelimeye eriş
  const query = event.target.searchInput.value;

  //kelime boşsa uyarı gönder

  if (!query.trim()) return alert("lütfen aratılacak şarkı ismini giriniz...");

  //ekrana yükleniyor bas
  ui.renderLoader();

  //başlığı güncelle
  ui.changeTitle(query + " İçin Sonuçlar");

  //apiden şarkıları al
  await api.searchMusic(query);

  //şarkıları ekrana bas
  ui.renderCards(api.songs);
});

//cartların alanına tıklanma olayını izleme
ui.list.addEventListener("click", (e) => {
  //tıklanılan eleman playBtn ise oynat
  if (e.target.id === "play-btn") {
    //tıklanılan karttaki şarkının bilgileirni al
    const song = e.target.closest(".card").dataset;

    //şarkıyı oynatma kısmını ekrana bas
    ui.renderPlayingInfo(song);
  }
});

//lokalden  mode verisini al
const mode = localStorage.getItem("mode");
("true");
document.body.className = mode === "true" ? "dark" : "light";

ui.checkbox.checked = mode === "true";

//checkboxun değerinin değişimini izle
ui.checkbox.addEventListener("change", (e) => {
  //false >açık mod
  //true > gece mod
  console.log(e.target.checked);
  const isDarkMode = e.target.checked;

  //kullanıcınoın seçtiği değeri sayfa yenilenince kaybetmemek için localde tutulur
  localStorage.setItem("mode", isDarkMode);

  document.body.className = isDarkMode ? "dark" : "light";
});
