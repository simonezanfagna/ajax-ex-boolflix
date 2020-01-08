var linguaggio = $('#scegliLingua').val();

var lista_generi_film = [];
var lista_generi_serieTv = [];
$.ajax({
  'url' : 'https://api.themoviedb.org/3/genre/movie/list?api_key=019a2902fdf24d4c02b2b7ba7c7acbd9&language='+ linguaggio,
  'method' : 'GET',
  'success' : function (data) {
    var genere = data.genres;
    for (var i = 0; i < genere.length; i++) {
      lista_generi_film.push(genere[i]);
    }
  },
  'error' : function () {
    alert('errore');
  }
})
console.log(lista_generi_film);
$.ajax({
  'url' : 'https://api.themoviedb.org/3/genre/tv/list?api_key=019a2902fdf24d4c02b2b7ba7c7acbd9&language='+ linguaggio,
  'method' : 'GET',
  'success' : function (data) {
    var genere = data.genres;
    for (var i = 0; i < genere.length; i++) {
      lista_generi_serieTv.push(genere[i]);
    }
  },
  'error' : function () {
    alert('errore');
  }
})
console.log(lista_generi_serieTv);

// ---------HOME PAGE-------------------------------------
$.ajax({
  'url' : 'https://api.themoviedb.org/3/movie/popular',
  'data' : {
    'api_key' : '019a2902fdf24d4c02b2b7ba7c7acbd9',
    'language' : $('#scegliLingua').val(),
    'page' : '1'
  },
  'method' : 'GET',
  'success' : function (data_risultati) {
    // console.log(data_risultati);
    if (data_risultati.total_results > 0) {
      var film = data_risultati.results;
      for (var i = 0; i < film.length; i++) {
        var movie = film[i];
        strutturaFilm(movie);
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

$.ajax({
  'url' : 'https://api.themoviedb.org/3/tv/popular',
  'data' : {
    'api_key' : '019a2902fdf24d4c02b2b7ba7c7acbd9',
    'language' : $('#scegliLingua').val(),
    'page' : '1'
  },
  'method' : 'GET',
  'success' : function (data_risultati) {
    // console.log(data_risultati);
    if (data_risultati.total_results > 0) {
      var film = data_risultati.results;
      for (var i = 0; i < film.length; i++) {
        var serie = film[i];
        strutturaSerieTv(serie);
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
// ------------------------------------------------------

function richiestaFilm() {

  $.ajax({
    'url' : 'https://api.themoviedb.org/3/search/movie',
    'data' : {
      'api_key' : '019a2902fdf24d4c02b2b7ba7c7acbd9',
      'query' : $('input').val(),
      'language' : $('#scegliLingua').val()
    },
    'method' : 'GET',
    'success' : function (data_risultati) {
      // console.log(data_risultati);
      if (data_risultati.total_results > 0) {
        var film = data_risultati.results;
        for (var i = 0; i < film.length; i++) {
          var movie = film[i];
          strutturaFilm(movie);
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

function strutturaFilm(f) {
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);
  var rating = Math.round(f.vote_average / 2);
  var lingua_bandiera = f.original_language;
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
    bandiera = f.original_language
  }

  var lista_generi = f.genre_ids;
  var genere_film ='';
  for (var c = 0; c < lista_generi.length; c++) {
    var genere_numero = lista_generi[c];
    for (var n = 0; n < lista_generi_film.length; n++) {
      if (genere_numero == lista_generi_film[n].id) {
        genere_film += ' ' + lista_generi_film[n].name;
      }
    }
  };

  var film_id = f.id;
  var lista_cast = [];
  $.ajax({
    'url' : 'https://api.themoviedb.org/3/movie/'+film_id+'/credits?api_key=019a2902fdf24d4c02b2b7ba7c7acbd9',
    'method' : 'GET',
    'success' : function(data) {
      var tutto_il_cast = data.cast;
      for (var i = 0; i < tutto_il_cast.length; i++) {
        lista_cast.push(tutto_il_cast[i].name);
      };
      var lista_5_attori = lista_cast.slice(0, 5);
      var attori = lista_5_attori.join();

      console.log(lista_cast);
      var context = {
        poster : 'https://image.tmdb.org/t/p/w342' + f.poster_path,
        titolo : f.title,
        titolo_originale : f.original_title,
        lingua : bandiera,
        voto : '<i class="fas fa-star"></i>'.repeat(rating),
        trama : '<p class="trama">' + f.overview + '</p>',
        cast : attori,
        genere : genere_film
      }
      var html = template(context);
      $('.container-film').append(html);
    },
    'error' : function () {
      alert('errore');
    }
  })
}

function richiestaSerieTv() {
  $.ajax({
    'url' : 'https://api.themoviedb.org/3/search/tv',
    'data' : {
      'api_key' : '019a2902fdf24d4c02b2b7ba7c7acbd9',
      'query' : $('input').val(),
      'language' : $('#scegliLingua').val()
    },
    'method' : 'GET',
    'success' : function (data_risultati) {
      // console.log(data_risultati);
      if (data_risultati.total_results > 0) {
        var film = data_risultati.results;
        for (var i = 0; i < film.length; i++) {
          var serie = film[i];
          strutturaSerieTv(serie);
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

function strutturaSerieTv(s) {
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);
  var rating = Math.round(s.vote_average / 2);
  var lingua_bandiera = s.original_language;
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
    bandiera = s.original_language
  }

  var lista_generi = s.genre_ids;
  var genere_tv ='';
  for (var c = 0; c < lista_generi.length; c++) {
    var genere_numero = lista_generi[c];
    for (var n = 0; n < lista_generi_serieTv.length; n++) {
      if (genere_numero == lista_generi_serieTv[n].id) {
        genere_tv += ' ' + lista_generi_serieTv[n].name;
      }
    }
  }

  var serie_id = s.id;
  var lista_cast = [];
  $.ajax({
    'url' : 'https://api.themoviedb.org/3/tv/'+serie_id+'/credits?api_key=019a2902fdf24d4c02b2b7ba7c7acbd9',
    'method' : 'GET',
    'success' : function(data) {
      var tutto_il_cast = data.cast;
      for (var i = 0; i < tutto_il_cast.length; i++) {
        lista_cast.push(tutto_il_cast[i].name);
      };
      var lista_5_attori = lista_cast.slice(0, 5);
      var attori = lista_5_attori.join();

      console.log(lista_cast);
      var context = {
        poster : 'https://image.tmdb.org/t/p/w342' + s.poster_path,
        titolo : s.name,
        titolo_originale : s.original_name,
        lingua : bandiera,
        voto : '<i class="fas fa-star"></i>'.repeat(rating),
        trama : '<p class="trama">' + s.overview + '</p>',
        cast : attori,
        genere : genere_tv
      }
      var html = template(context);
      $('.container-tv').append(html);
    },
    'error' : function () {
      alert('errore');
    }
  })
}

$('#ricerca').click(function () {
  // console.log($('input').val());
  $('#genere-film').val("");
  $("#genere-tv").val("");
  $('.container-film').empty();
  $('.container-tv').empty();
  $('.container h1').show()
  richiestaFilm();
  richiestaSerieTv();
})

$('input').keypress(function (event) {
  if (event.which == 13) {
    $('#genere-film').val("");
    $("#genere-tv").val("");
    $('.container-film').empty();
    $('.container-tv').empty();
    $('.container h1').show();
    richiestaFilm();
    richiestaSerieTv();
  }
})

$('.header-left h1').click(function () {
  $('#genere-film').val("");
  $("#genere-tv").val("");
  $('input').val('');
  $('.container-film').empty();
  $('.container-tv').empty();
  $.ajax({
    'url' : 'https://api.themoviedb.org/3/movie/popular',
    'data' : {
      'api_key' : '019a2902fdf24d4c02b2b7ba7c7acbd9',
      'language' : $('#scegliLingua').val(),
      'page' : '1'
    },
    'method' : 'GET',
    'success' : function (data_risultati) {
      // console.log(data_risultati);
      if (data_risultati.total_results > 0) {
        var film = data_risultati.results;
        for (var i = 0; i < film.length; i++) {
          var movie = film[i];
          strutturaFilm(movie);
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

  $.ajax({
    'url' : 'https://api.themoviedb.org/3/tv/popular',
    'data' : {
      'api_key' : '019a2902fdf24d4c02b2b7ba7c7acbd9',
      'language' : $('#scegliLingua').val(),
      'page' : '1'
    },
    'method' : 'GET',
    'success' : function (data_risultati) {
      // console.log(data_risultati);
      if (data_risultati.total_results > 0) {
        var film = data_risultati.results;
        for (var i = 0; i < film.length; i++) {
          var serie = film[i];
          strutturaSerieTv(serie);
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
})

$("#genere-film").change(function () {
  var genereScelto = $(this).val();
  if (genereScelto == "") {
    $('.container-film .info-film').show();
  }
  else {
    $('.container-film .info-film').each(function () {
      if ($(this).attr('data-genere').includes(genereScelto)) {
        $(this).show();
      }
      else {
        $(this).hide();
      }
    })
  }
})

$("#genere-tv").change(function () {
  var genereScelto = $(this).val();
  if (genereScelto == "") {
    $('.container-tv .info-film').show();
  }
  else {
    $('.container-tv .info-film').each(function () {
      if ($(this).attr('data-genere').includes(genereScelto)) {
        $(this).show();
      }
      else {
        $(this).hide();
      }
    })
  }
})
