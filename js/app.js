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
console.log(keywords);
$.ajax('data/pag1.json').then(galleryData =>{
  galleryData.forEach(val =>{
    let newGallery = new Gallery(val);
    renderList();
    newGallery.render();


  });
  $('#photo-template').first().remove();
});

Gallery.prototype.render = function (){

  let renderList = $('#photo-template').clone();
  $('main').append(renderList);
  renderList.find('h2').text(this.title);
  renderList.find('img').attr('src', this.image);
  renderList.find('p').text(this.description);


};

function renderList(){
  for (let i = 0 ; i < keywords.length; i ++){
    let showList = $('option').first().clone().text(keywords[i]);
    $('select').append(showList);
  }

  $('select').on('change', function() {
    $('.photo-template').hide();
    let selected = `${$(this).val()}`;
    $(`.${selected}`).show();
    console.log(selected);
  });

}













