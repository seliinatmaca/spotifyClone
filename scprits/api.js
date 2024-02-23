//! API isteği atan fonksiyonlar bu dosyada olacak

const options = {
  headers: {
    "X-RapidAPI-Key": "0b0caf0281mshb38311d44ea7344p14c303jsn4396613a5ebc",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};

//api işlemlerini yönetecek class
export default class API {
  //kurucu method
  constructor() {
    this.songs = [];
  }
  //türkiyedeki populer müzikleri alır
  async getPopular() {
    //api isteği at
    const res = await fetch(
      "https://shazam.p.rapidapi.com/charts/track?listId=ip-country-chart-TR&locale=tr",
      options
    );

    // gelen veriyi işle
    const data = await res.json();

    //classta tanımlanan songs değişkenine aktar
    this.songs = data.tracks;
  }

  //aratılan kelimeye uygun şarkıları al
  async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr`,
      options
    );

    //gelen cevabı işle
    const data = await res.json();

    //gelen cevabın formatını değiştir
    const formatted = data.tracks.hits.map((song) => {
      return song.track;
    });

    //gelen veriyi değişkene aktar
    this.songs = formatted;
  }
}
