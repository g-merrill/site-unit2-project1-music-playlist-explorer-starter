// JavaScript for Opening and Closing the Modal
var modal = document.getElementById('playlistModal')
var span = document.getElementsByClassName('close')[0]

function openModal(playlist) {
  document.getElementById('playlistImage').src = playlist.imageUrl
  document.getElementById('playlistTitle').innerText = playlist.title
  document.getElementById(
    'playlistAuthor',
  ).innerText = `Author: ${playlist.author}`
  const songsHtml = playlist.songs.reduce((acc, song, idx) => {
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
  },
  '')
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
