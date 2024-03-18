const songData = [
  {
    name: "Insiders",
    artist: "Joe Crotty",
    src: "joe-crotty-insiders.mp3",
    credits: "Song Credits:  Insiders by Joe Crotty | https://soundcloud.com/joecrotty Music promoted by https://www.free-stock-music.com Creative Commons / Attribution 3.0 Unported License (CC BY 3.0) https://creativecommons.org/licenses/by/3.0/deed.en_US"
  },
  {
    name:"Apocolyps Blues",
    artist: "Alexander Nakarada",
    src: "alexander-nakarada-apocalypse-blues.mp3",
    credits: "Song Credits:  Apocalypse Blues by Alexander Nakarada (CreatorChords) | https://creatorchords.com Music promoted by https://www.free-stock-music.com Creative Commons / Attribution 4.0 International (CC BY 4.0) https://creativecommons.org/licenses/by/4.0/"
  },
  {
    name: "Warm Duck Shuffle",
    artist: "Arnebhus",
    src: "arnebhus-warm-duck-shuffle.mp3",
    credits: "Song Credits:  Warm Duck Shuffle by arnebhus | https://soundcloud.com/arnebhus Music promoted by https://www.free-stock-music.com Creative Commons / Attribution 3.0 Unported License (CC BY 3.0) https://creativecommons.org/licenses/by/3.0/deed.en_US"
  },
  {
    name: "Autumn Waltz",
    artist: "Gudji",
    src: "gudji-autumn-waltz.mp3",
    credits: "Song Credits:  Autumn Waltz by Gudji | https://www.free-stock-music.com/artist.gudji.html Music promoted by https://www.free-stock-music.com Creative Commons / Attribution 4.0 International (CC BY 4.0) https://creativecommons.org/licenses/by/4.0/"
  },
  {
    name: "El Tarantino",
    artist: "Justin Allan Arnold",
    src: "justin-allan-arnold-el-tarantino.mp3",
    credits: "Song Credits:  El Tarantino by Justin Allan Arnold | https://www.ifnessfreemusic.com Music promoted by https://www.free-stock-music.com Creative Commons / Attribution 4.0 International (CC BY 4.0) https://creativecommons.org/licenses/by/4.0/"
  },
  {
    name: "Forest Walk",
    artist: "Alexander Nakarada",
    src: "alexander-nakarada-forest-walk.mp3",
    credits: "Song Credits:  Forest Walk by Alexander Nakarada (CreatorChords) | https://creatorchords.com Music promoted by https://www.free-stock-music.com Creative Commons / Attribution 4.0 International (CC BY 4.0) https://creativecommons.org/licenses/by/4.0/"
  },
]

const container = document.querySelector(".container")
const songName = document.querySelector(".song-name")
const songArtist = document.querySelector(".song-artist")
const cover = document.querySelector(".cover")
const playPauseBtn = document.querySelector(".play-pause-btn")
const previousBtn = document.querySelector(".previous-btn")
const nextBtn = document.querySelector(".next-btn")
const audio = document.querySelector(".audio")
const songTime = document.querySelector(".song-time")
const songProgress = document.querySelector(".song-progress")
const coverArtist = document.querySelector(".cover span:nth-child(1)")
const coverName = document.querySelector(".cover span:nth-child(2)")
const songCredits = document.querySelector(".song-credits")

let songIndex = 0

window.addEventListener("load", () => {
  loadSong(songIndex)
})

const loadSong = (index) => {
  coverName.textContent = songData[index].name
  coverArtist.textContent = songData[index].artist
  songName.textContent = songData[index].name
  songArtist.textContent = songData[index].artist
  audio.src = `music/${songData[index].src}`
  songCredits.textContent = songData[index].credits
}

const playSong = () => {
  container.classList.add("pause")
  playPauseBtn.firstElementChild.className = "fa-solid fa-pause" 
  audio.play()
  cover.classList.add("rotate")
}

const pauseSong = () => {
  container.classList.remove("pause")
  playPauseBtn.firstElementChild.className = "fa-solid fa-play" 
  audio.pause()
  cover.classList.remove("rotate")
}

playPauseBtn.addEventListener("click", () => {
  if(container.classList.contains("pause")) {
    pauseSong()
  } else {
    playSong()
  }
})

const previousSongPlay = () => {
  songIndex--
  if (songIndex < 0) {
    songIndex = songData.length -1
  }
  loadSong(songIndex)
  playSong()
}

const nextSongPlay = () => {
  songIndex++
  if (songIndex > songData.length -1) {
    songIndex = 0
  }
  loadSong(songIndex)
  playSong()
}

previousBtn.addEventListener("click", previousSongPlay)
nextBtn.addEventListener("click", nextSongPlay)

audio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime
  const duration = e.target.duration
  let currentTimeWidth = (currentTime / duration) * 100
  songProgress.style.width = `${currentTimeWidth}%`

  let songCurrentTime = document.querySelector(".time span:nth-child(1)")
  let songDuration = document.querySelector(".time span:nth-child(2)")

  audio.addEventListener("loadeddata", () => {
    let audioDuration = audio.duration
    let totalMinutes = Math.floor(audioDuration / 60)
    let totalSeconds = Math.floor(audioDuration % 60)

    if (totalSeconds < 10) {
      totalSeconds = `0${totalSeconds}`
    }

    songDuration.textContent = `${totalMinutes}:${totalSeconds}`
  })
  
  let currentMinutes = Math.floor(currentTime / 60)
  let currentSeconds = Math.floor(currentTime % 60)

  if (currentSeconds < 10) {
    currentSeconds= `0${currentSeconds}`
  }

  songCurrentTime.textContent = `${currentMinutes}:${currentSeconds}`
})

songTime.addEventListener("click", (e) => {
  let progressWidth = songTime.clientWidth
  let clickedOffsetX = e.offsetX
  let songDuration = audio.duration
  audio.currentTime =  (clickedOffsetX / progressWidth) * songDuration

  playSong()
})

audio.addEventListener("ended", nextSongPlay)


