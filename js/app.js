'use strict';
let allKeywords = [];
let keywords = [];
function Gallery(gallery) {
  this.image = gallery.image_url;
  this.title = gallery.title;
  this.description = gallery.description;
  this.keyword = gallery.keyword;
  this.horns = gallery.horns;
  if (!keywords.includes(this.keyword)) {
    keywords.push(this.keyword);
    allKeywords.push(this);
  }

}
console.log(keywords);
$.ajax('./data/pag1.json').then(galleryData => {
  galleryData.forEach(val => {
    let newGallery = new Gallery(val);
    newGallery.render();
  });

  renderList();
  filer();
});

$('#page-one').click(function () {
  console.log('before', keywords);
  keywords = [];
  $('main').html('');
  $('option').not(':eq(0)').remove();
  console.log('after', keywords);
  $('section').hide();

  $.ajax('./data/pag1.json').then(galleryData => {
    galleryData.forEach(val => {
      let newGallery = new Gallery(val);
      newGallery.render();
    });
    $('section').show();
    renderList();
    filer();
  });

});

Gallery.prototype.render = function () {
  let renderList = $('.photo-template').first().clone();
  $('main').append(renderList);
  renderList.addClass(this.keyword);

  renderList.find('h2').text(this.title);
  renderList.find('img').attr('src', this.image);
  renderList.find('p').text(this.description);

};

function renderList() {
  console.log('keywords', keywords);
  for (let i = 0; i < keywords.length; i++) {
    console.log(i);
    let showList = $('option').first().clone().text(keywords[i]);
    console.log('option', showList);
    $('select').append(showList);
  }
}

function filer() {
  $('select').on('change', function () {
    let selected = $(this).val();
    console.log(selected);
    $('section').hide();

    $(`.${selected}`).show();

  });

}

$('#page-two').click(function () {
  keywords = [];
  $('option').not(':eq(0)').remove();

  $('main').html('');
  $.ajax('./data/page2.json').then(dataPage => {
    console.log(dataPage);
    dataPage.forEach(val => {
      let newGallery = new Gallery(val);
      newGallery.renderTemplate();


    });
    renderList();
    filer();
  });



});

Gallery.prototype.renderTemplate = function () {
  let template = $('#galleryTemplate').html();
  console.log(this);
  let dataFill = Mustache.render(template, this);
  $('main').append(dataFill);


};

$('#title-button').click(handleSubmit);
function handleSubmit(){
  allKeywords.sort((a,b)=>{
    if (a.title.toLowerCase() < b.title.toLowerCase()){
      return -1;
    }else if (a.title.toLowerCase() > b.title.toUpperCase()){
      return 1;
    }else return 0;
  });
  for (let i = 0 ; i<allKeywords.length ;i++ ){
    let renderList = $('.photo-template').first().clone();
    $('main').append(renderList);
    renderList.find('h2').text(allKeywords[i].title);
    renderList.find('img').attr('src',allKeywords[i].image);
    renderList.find('p').text(allKeywords[i].description);
  
  }
}

$('#horn-button').click(handleSubmitHorn);
function handleSubmitHorn(){
  allKeywords.sort((a,b)=>{
    if (a.horns < b.horns){
      return -1;
    }else if (a.horns > b.title.horns){
      return 1;
    }else
      return 0;
  });
  for (let i = 0 ; i<allKeywords.length ;i++ ){
    let renderList = $('.photo-template').first().clone();
    $('main').append(renderList);
    renderList.find('h2').text(allKeywords[i].title);
    renderList.find('img').attr('src',allKeywords[i].image);
    renderList.find('p').text(allKeywords[i].description);
    $('<p> </p>').text(allKeywords[i].horns);

  }
  
}








