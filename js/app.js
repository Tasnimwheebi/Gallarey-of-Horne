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
$.ajax('./data/pag1.json').then(galleryData =>{
  galleryData.forEach(val =>{
    let newGallery = new Gallery(val);
    newGallery.render();
  });

  renderList();
  filer();
});

$('#page-one').click( function(){
  console.log('before',keywords);
  keywords = [];
  console.log('after',keywords);
  $('main').html('');
  $.ajax('./data/pag1.json').then(galleryData =>{
    galleryData.forEach(val =>{
      let newGallery = new Gallery(val);
      newGallery.render();
    });

  });

});

Gallery.prototype.render = function (){

  let renderList = $('.photo-template').first().clone();
  $('main').append(renderList);
  renderList.addClass(this.keyword);

  renderList.find('h2').text(this.title);
  renderList.find('img').attr('src', this.image);
  renderList.find('p').text(this.description);

};

function renderList(){
  console.log('keywords',keywords);
  for (let i = 0 ; i < keywords.length; i ++){
    console.log(i);
    let showList = $('option').first().clone().text(keywords[i]);
    console.log('option',showList );
    $('select').append(showList);
  }
}

function filer (){
  $('select').on('change', function() {
    let selected = $(this).val();
    console.log(selected);
    $('section').hide();

    $(`.${selected}`).show();

  });

}

$('#page-two').click( function(){
  console.log('before',keywords);
  keywords = [];
  console.log('after',keywords);
  $('main').html('');
  $.ajax('./data/page2.json').then(dataPage =>{
    console.log(dataPage);
    dataPage.forEach(val =>{
      let newGallery = new Gallery(val);
      newGallery.renderTemplate();
      console.count('value');

    });console.log('finished');

  });

  filer();
});

Gallery.prototype.renderTemplate = function(){
  let template = $('#galleryTemplate').html();
  console.log(this);
  let dataFill = Mustache.render(template , this);
  $('main').append(dataFill);


};










