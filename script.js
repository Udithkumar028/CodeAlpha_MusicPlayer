const songs = [
  {
    title: "Night Drive",
    artist: "Alex Parker",
    src: "songs/song1.mp3",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "Dream Waves",
    artist: "Sophia Lee",
    src: "songs/song2.mp3",
    cover:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "City Lights",
    artist: "Ryan Scott",
    src: "songs/song3.mp3",
    cover:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "Lost Memories",
    artist: "Emma Stone",
    src: "songs/song4.mp3",
    cover:
      "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "Blue Sky",
    artist: "Noah James",
    src: "songs/song5.mp3",
    cover:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop",
  },
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const volumeSlider = document.getElementById("volume");

const playlist = document.getElementById("playlist");

let songIndex = 0;
let isPlaying = false;

// Load selected song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;

  updateActiveSong();
}

// Play song
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸";
}

// Pause song
function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶";
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;

  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;

  // Update duration
  let durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);

  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }

  if (durationSeconds) {
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
  }

  // Update current time
  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);

  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }

  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
}

// Seek song position
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;

  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Create playlist
function createPlaylist() {
  songs.forEach((song, index) => {

    const item = document.createElement("div");
    item.classList.add("playlist-item");

    item.innerHTML = `
      <img src="${song.cover}" alt="${song.title}">

      <div class="playlist-info">
        <h4>${song.title}</h4>
        <p>${song.artist}</p>
      </div>
    `;

    item.addEventListener("click", () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });

    playlist.appendChild(item);
  });
}

// Highlight active song
function updateActiveSong() {

  const items = document.querySelectorAll(".playlist-item");

  items.forEach((item, index) => {

    item.classList.remove("active");

    if (index === songIndex) {
      item.classList.add("active");
    }
  });
}

// Button events
playBtn.addEventListener("click", () => {

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Audio progress
audio.addEventListener("timeupdate", updateProgress);

// Click progress bar
progressContainer.addEventListener("click", setProgress);

// Autoplay next song
audio.addEventListener("ended", nextSong);

// Volume control
volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {

  if (e.code === "Space") {
    e.preventDefault();

    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  }

  if (e.code === "ArrowRight") {
    nextSong();
  }

  if (e.code === "ArrowLeft") {
    prevSong();
  }
});

// Initial load
loadSong(songs[songIndex]);
createPlaylist();

// Default volume
audio.volume = 0.7;