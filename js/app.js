'use strict';
let keywords = [];
function Gallery(gallery){
  this.image = gallery.image_url;
  this.title = gallery.title;
  this.description = gallery.description;
  this.keyword = gallery.keyword;
  this.horns = gallery.horns;
  if (!keywords.includes(this.keyword)){
    keywords.push(this.keyword);
  }

}
$.ajax('data/pag1.json').then(galleryData =>{
  galleryData.forEach(val =>{
    let newGallery = new Gallery(val);
    newGallery.render();

  });

});

Gallery.prototype.render = function (){
  let showList = $('option').first().clone().text(keywords);
  $('select').append(showList);
  let renderList = $('#photo-template').clone();
  $('main').append(renderList);
  renderList.find('h2').text(this.title);
  renderList.find('img').attr('src', this.image);
  renderList.find('p').text(this.description);



};








