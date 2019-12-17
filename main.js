function richiestaFilm() {
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);
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
      if (data_risultati.total_results > 0) {
        var film = data_risultati.results;
        for (var i = 0; i < film.length; i++) {
          var rating = Math.floor(film[i].vote_average / 2);

          var context = {
            titolo : film[i].title,
            titolo_originale : film[i].original_title,
            lingua : film[i].original_language,
            voto : '<i class="fas fa-star"></i>'.repeat(rating)
          }
          var html = template(context);
          $('.container-film').append(html);
        }
      }
      else {
        $('.container-film').html('<p class="risultato_vuoto">Nessun risultato trovato per il film: "'+ $('input').val() +'" </p>')
      }

    },
    'error' : function () {
      alert('errore');
    }
  });
}

function richiestaSerieTv() {
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);
  $.ajax({
    'url' : 'https://api.themoviedb.org/3/search/tv',
    'data' : {
      'api_key' : '019a2902fdf24d4c02b2b7ba7c7acbd9',
      'query' : $('input').val(),
      'language' : 'it'
    },
    'method' : 'GET',
    'success' : function (data_risultati) {
      // console.log(data_risultati);
      if (data_risultati.total_results > 0) {
        var film = data_risultati.results;
        for (var i = 0; i < film.length; i++) {
          var rating = Math.floor(film[i].vote_average / 2)
          var context = {
            titolo : film[i].name,
            titolo_originale : film[i].original_name,
            lingua : film[i].original_language,
            voto : '<i class="fas fa-star"></i>'.repeat(rating)
          }
          var html = template(context);
          $('.container-tv').append(html);
        }
      }
      else {
        $('.container-tv').html('<p class="risultato_vuoto">Nessun risultato trovato per la serie tv: "'+ $('input').val() +'" </p>')
      }

    },
    'error' : function () {
      alert('errore');
    }
  });
}

$('#ricerca').click(function () {
  // console.log($('input').val());
  $('.container-film').empty();
  $('.container-tv').empty();
  richiestaFilm();
  richiestaSerieTv();
})

$('input').keypress(function (event) {
  if (event.which == 13) {
    $('.container-film').empty();
    $('.container-tv').empty();
    richiestaFilm();
    richiestaSerieTv();
  }
})
