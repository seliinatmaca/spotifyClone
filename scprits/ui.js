//arayüz DOM işlemleri

export default class UI {
  constructor() {
    this.list = document.querySelector("#list");
    this.form = document.querySelector("#search-form");
    this.title = document.querySelector("#title");
    this.playArea = document.querySelector(".play-area");
    this.checkbox = document.querySelector("#mode-checkbox");
  }

  //liste alanına yükleniyor basar
  renderLoader() {
    this.list.innerHTML = `<div class="loader">
    <div></div> 
    <div></div>
    <div></div>
    <div></div>
  </div>
  `;
  }

  //ekrana kartları bas
  renderCards(songs) {
    //gifi ekrandan kaldır
    this.list.innerHTML = "";

    //dizideki her bir eleman için fonksiyon çalıştıracağız
    songs.forEach((song) => {
      //   console.log("şarkı", song);
      //1-elementi oluştur
      const div = document.createElement("div");

      //2-class ekleme
      div.className = "card";

      //3-innerhtml belirle
      div.innerHTML = ` <figure>
      <img
        src="${song.images.coverarthq}"
      />
      <div id="play">
        <i id="play-btn" class="bi bi-play-fill"></i>
      </div>
    </figure>

    <h4>${song.title}</h4>
    <p>${song.subtitle}</p>`;

      //4-data verileri ekle
      console.log(song);
      div.dataset.title = song.title;
      div.dataset.photo = song.images.coverarthq;
      div.dataset.url = song.hub?.actions[1].uri;

      //5-kartı html gönder
      this.list.appendChild(div);
    });
  }

  //başlığı günceller
  changeTitle(text) {
    this.title.innerText = text;
  }

  //müzik oynatma kısmını ekrana bas
  renderPlayingInfo(song) {
    this.playArea.innerHTML = ` <div>
    <img
      class="animate"
      src="${song.photo}"
      alt=""
    />
    <div>
      <p>Şu an Oynatılıyor...</p>
      <h3>${song.title}</h3>
    </div>
  </div>

  <audio controls autoplay src="${song.url}"></audio>`;
  }
}
