
const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const btnPrev = document.querySelector('#prev');
const btnNext = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progres = document.querySelector('.progress');
const progresContainer = document.querySelector('.progress-container');
const songTitle = document.querySelector('#title');
const cover = document.querySelector('#cover');

//song title

const songs = ['a7x','lp','united'];

let songIndex = 1;//jumlah song

//initial load song

loadSong(songs[songIndex])

//
function loadSong(song){
  songTitle.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function pauseSong(){
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')
  audio.pause()
}

function playSong(){
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()

}

function NextSong(){
  songIndex++
  if (songIndex > songs.length-1) {
    songIndex = 0
  }

  loadSong(songs[songIndex])
  playSong()
}

function PrevSong(){
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }

  loadSong(songs[songIndex])
  playSong()
}

function updateProgres(e){

  const {duration, currentTime} = e.srcElement
  const progresPercent = (currentTime / duration) * 100
  progres.style.width = `${progresPercent}%`
}

function setProgres(e){
  const width = this.clientWidth
  const clikcX = e.offsetX
  console.log(clikcX);
  const duration = audio.duration
  audio.currentTime = (clikcX / width ) * duration

}

playBtn.addEventListener('click', function(e) {
  const isPlay = musicContainer.classList.contains('play')

  if (isPlay)
  {
    pauseSong()
  }else {
    playSong()
  }
});

//change song

btnPrev.addEventListener('click',PrevSong);
btnNext.addEventListener('click',NextSong);

audio.addEventListener('timeupdate', updateProgres);

progresContainer.addEventListener('click', setProgres);
audio.addEventListener('ended', NextSong);
