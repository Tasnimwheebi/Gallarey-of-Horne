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
    newGallery.render();
  });
  
renderList();
filer();
});

$('#page-one').click( function(){
  $('main').html(''); 
$.ajax('data/pag1.json').then(galleryData =>{
  galleryData.forEach(val =>{
    let newGallery = new Gallery(val);
    newGallery.render();
  });
  
});
});

Gallery.prototype.render = function (){

  let renderList = $('#photo-template').clone();
  $('main').append(renderList);
 renderList.addClass(this.keyword);
  
  renderList.find('h2').text(this.title);
  renderList.find('img').attr('src', this.image);
  renderList.find('p').text(this.description);

};

function renderList(){
  for (let i = 0 ; i < keywords.length; i ++){
    let showList = $('option').first().clone().text(keywords[i]);
    $('select').append(showList);
   
  }

}
function filer (){
  $('select').on('change', function() {
    let selected = $(this).val();
    $('#photo-template').hide();
    $(`.${selected}`).show();
    console.log(selected);
  });

}

$('#page-two').click( function(){
$.ajax('data/pag2.json').then(dataPage =>{
  dataPage.forEach(val =>{
    let newGallery = new Gallery(val);
   newGallery.renderTemplate();
  });
  renderList();
});
});

Gallery.prototype.renderTemplate = function(){
  let template = $('#galleryTemplate').html();
  let dataFill = Mustache.render(template , this);
  $('main').append(dataFill);
  
  
}










