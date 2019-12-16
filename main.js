function richiestaFilm() {
  $.ajax({
    'url' : 'https://api.themoviedb.org/3/search/movie',
    'data' : {
      'api_key' : '019a2902fdf24d4c02b2b7ba7c7acbd9',
      'query' : $('input').val(),
      'language' : 'it'
    },
    'method' : 'GET',
    'success' : function (data_risultati) {
      // console.log(data_risultati);
      var film = data_risultati.results;
      for (var i = 0; i < film.length; i++) {
        var context = {
          titolo : film[i].title,
          titolo_originale : film[i].original_title,
          lingua : film[i].original_language,
          voto : film[i].vote_average
        }
        var html = template(context);
        $('.container').append(html);
      }

    },
    'error' : function () {
      alert('errore');
    }
  });
}

var source = $('#entry-template').html();
var template = Handlebars.compile(source);

$('#ricerca').click(function () {
  // console.log($('input').val());
  $('.info-film').remove();
  richiestaFilm();
})

$('input').keypress(function (event) {
  if (event.which == 13) {
    $('.info-film').remove();
    richiestaFilm();
  }
})
