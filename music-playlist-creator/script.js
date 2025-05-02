// JavaScript for Opening and Closing the Modal
var modal = document.getElementById('playlistModal')
var span = document.getElementsByClassName('close')[0]
const playlistHeartMap = {}

function openModal(playlist) {
  document.getElementById('playlistImage').src = playlist.imageUrl
  document.getElementById('playlistTitle').innerText = playlist.title
  document.getElementById(
    'playlistAuthor',
  ).innerText = `Author: ${playlist.author}`
  const songsHtml = playlist.songs.reduce((acc, song) => {
    return (
      acc +
      `
        <div class="modal-song-row">
          <img src="${song.image}" alt="song image" width="75px">
          <div class="modal-song-text-ctnr">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
            <p>${song.album}</p>
          </div>
          <p class="modal-song-duration">3:00</p>
        </div>
    `
    )
  }, '')
  document.getElementById('playlistSongs').innerHTML = songsHtml
  modal.style.display = 'block'
}

span.onclick = function () {
  modal.style.display = 'none'
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}

const fetchPlaylistData = async () => {
  const res = await fetch('./data/data.json')
  const data = await res.json()
  return data
}

const generatePlaylistHeartMap = playlists => {
  playlists.forEach(playlist => {
    playlistHeartMap[playlist.playlistID] = false
  })
  console.log(playlistHeartMap)
}

const toggleHeartClick = playlistID => {
  if (playlistHeartMap[playlistID] === false) {
    // toggle heart on:
    // grab black heart
    // remove selected class
    document
      .querySelector(`#${playlistID} .heart-black`)
      .classList.remove('selected')
    // grab red heart
    // add selected class
    document
      .querySelector(`#${playlistID} .heart-red`)
      .classList.add('selected')
    // add 1 to likes value
    const oldVal = parseInt(document.querySelector(`#${playlistID} .playlist-like-value`).textContent)
    document.querySelector(`#${playlistID} .playlist-like-value`).textContent =
      oldVal + 1
  } else {
    // toggle heart off:
    // grab red heart
    // remove selected class
    document
      .querySelector(`#${playlistID} .heart-red`)
      .classList.remove('selected')
    // grab black heart
    // add selected class
    document
      .querySelector(`#${playlistID} .heart-black`)
      .classList.add('selected')
    // remove 1 from likes value
    const oldVal = parseInt(
      document.querySelector(`#${playlistID} .playlist-like-value`).textContent,
    )
    document.querySelector(`#${playlistID} .playlist-like-value`).textContent =
      oldVal - 1
  }
  playlistHeartMap[playlistID] = !playlistHeartMap[playlistID]
}

const createPlaylistCards = async () => {
  let playlistsHtml = ''

  const playlists = await fetchPlaylistData()
  if (playlists.length) {
    playlistsHtml = playlists.reduce((acc, playlist) => {
      const songData = playlist.songs.reduce((song_acc, song, song_idx) => {
        return (
          song_acc +
          `{ image: '${song.image}', title: '${song.title}', artist: '${song.artist}', album: '${song.artist}', duration: '${song.duration}' },`
        )
      }, '')
      return (
        acc +
        `<div class="playlist-card" id="${playlist.playlistID}">
          <img
            src="${playlist.playlist_art}"
            alt="playlist image"
            class="playlist-img"
            width="180px"
            onclick="openModal({ title: '${playlist.playlist_name}', imageUrl: '${playlist.playlist_art}', author: '${playlist.playlist_author}', songs: [${songData}] })"
          />
          <div class="playlist-text-ctnr">
            <h3 class="playlist-title" onclick="openModal({ title: '${playlist.playlist_name}', imageUrl: '${playlist.playlist_art}', author: '${playlist.playlist_author}', songs: [${songData}] })">${playlist.playlist_name}</h3>
            <p class="playlist-author">${playlist.playlist_author}</p>
            <div class="playlist-like-ctnr">
              <div class="hearts-ctnr" onclick="toggleHeartClick('${playlist.playlistID}')">
                <img
                  src="./assets/img/heart-black.png"
                  alt="black heart icon"
                  class="playlist-like-heart heart-black selected"
                  width="16px"
                />
                <img
                  src="./assets/img/heart-red.png"
                  alt="red heart icon"
                  class="playlist-like-heart heart-red"
                  width="16px"
                />
              </div>
              <p class="playlist-like-value">${playlist.playlist_likes}</p>
            </div>
          </div>
        </div>`
      )
    }, '')
  } else {
    playlistsHtml = `<p class="no-playlists">No playlists added.</p>`
  }
  document.getElementById('playlistsContainer').innerHTML = playlistsHtml
  generatePlaylistHeartMap(playlists)
}

createPlaylistCards()
