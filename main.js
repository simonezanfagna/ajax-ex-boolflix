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
          var rating = Math.round(film[i].vote_average / 2);
          var lingua_bandiera = film[i].original_language;
          var bandiera = '';
          if (lingua_bandiera == 'it') {
            bandiera = '<img class="bandiera" src="https://image.flaticon.com/icons/png/512/206/206839.png" alt="">'
          }
          else if (lingua_bandiera == 'en') {
            bandiera = '<img class="bandiera" src="https://image.flaticon.com/icons/png/512/206/206592.png" alt="">'
          }
          else if (lingua_bandiera == 'fr') {
            bandiera = '<img class="bandiera" src="https://image.flaticon.com/icons/png/512/206/206657.png" alt="">'
          }
          else if (lingua_bandiera == 'es') {
            bandiera = '<img class="bandiera" src="https://image.flaticon.com/icons/png/512/206/206724.png" alt="">'
          }
          else if (lingua_bandiera == 'de') {
            bandiera = '<img class="bandiera" src="https://image.flaticon.com/icons/png/512/206/206690.png" alt="">'
          }
          else {
            bandiera = film[i].original_language
          }
          var context = {
            poster : 'https://image.tmdb.org/t/p/w342' + film[i].poster_path,
            titolo : film[i].title,
            titolo_originale : film[i].original_title,
            lingua : bandiera,
            voto : '<i class="fas fa-star"></i>'.repeat(rating),
            trama : '<p class="trama">' + film[i].overview + '</p>'
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
          var rating = Math.round(film[i].vote_average / 2);
          var lingua_bandiera = film[i].original_language;
          var bandiera = '';
          if (lingua_bandiera == 'it') {
            bandiera = '<img class="bandiera" src="https://image.flaticon.com/icons/png/512/206/206839.png" alt="">'
          }
          else if (lingua_bandiera == 'en') {
            bandiera = '<img class="bandiera" src="https://image.flaticon.com/icons/png/512/206/206592.png" alt="">'
          }
          else if (lingua_bandiera == 'fr') {
            bandiera = '<img class="bandiera" src="https://image.flaticon.com/icons/png/512/206/206657.png" alt="">'
          }
          else if (lingua_bandiera == 'es') {
            bandiera = '<img class="bandiera" src="https://image.flaticon.com/icons/png/512/206/206724.png" alt="">'
          }
          else if (lingua_bandiera == 'de') {
            bandiera = '<img class="bandiera" src="https://image.flaticon.com/icons/png/512/206/206690.png" alt="">'
          }
          else {
            bandiera = film[i].original_language
          }
          var context = {
            poster : 'https://image.tmdb.org/t/p/w342' + film[i].poster_path,
            titolo : film[i].name,
            titolo_originale : film[i].original_name,
            lingua : bandiera,
            voto : '<i class="fas fa-star"></i>'.repeat(rating),
            trama : '<p class="trama">' + film[i].overview + '</p>'
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
  $('.container h1').show()
  richiestaFilm();
  richiestaSerieTv();
})

$('input').keypress(function (event) {
  if (event.which == 13) {
    $('.container-film').empty();
    $('.container-tv').empty();
    $('.container h1').show();
    richiestaFilm();
    richiestaSerieTv();
  }
})
