// JavaScript for Opening and Closing the Modal
var modal = document.getElementById('playlistModal')
var span = document.getElementsByClassName('close')[0]

function openModal(playlist) {
  document.getElementById('playlistImage').src = playlist.imageUrl
  document.getElementById('playlistTitle').innerText = playlist.title
  document.getElementById(
    'playlistAuthor',
  ).innerText = `Author: ${playlist.author}`
  document.getElementById(
    'playlistSongs',
  ).innerHTML = `<strong>Songs:</strong> ${playlist.songs.join(', ')}`
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
