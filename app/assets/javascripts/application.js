// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var zombieApp = zombieApp || {};

zombieApp.eventResult = function(e) {
  console.log("event result callback");
  if (e.result === "success") {
    console.log("yay");
    $('.event-success').attr('style', 'display: inline');
    $(".characters").load("/story/1 .characters");
  } else if (e.result === "failure") {
    $('.event-failure').attr('style', 'display: inline');
    $(".characters").load("/story/1 .characters");
    console.log("boo");
  };
};

zombieApp.setup = function() {
  var no_of_chars = 22;
  $('#ability1').click(1, function(e){
    e.preventDefault();
    ajaxGetRequest("/ability/1");
  });
  $('#ability1').click(1, function(e){
    e.preventDefault();
    ajaxGetRequest("/ability/1");
  });
  $('#ability2').click(1, function(e){
    e.preventDefault();
    ajaxGetRequest("/ability/2");
  });
  $('#ability3').click(1, function(e){
    e.preventDefault();
    ajaxGetRequest("/ability/3");
  });
  $('#ability4').click(1, function(e){
    e.preventDefault();
    ajaxGetRequest("/ability/4");
  });
  $('#ability5').click(1, function(e){
    e.preventDefault();
    ajaxGetRequest("/ability/5");
  });
  $('#ability6').click(1, function(e){
    e.preventDefault();
    ajaxGetRequest("/ability/6");
  });
  $('#ability7').click(1, function(e){
    e.preventDefault();
    ajaxGetRequest("/ability/7");
  });
  $('#ability8').click(1, function(e){
    e.preventDefault();
    ajaxGetRequest("/ability/8");
  });
  $('#ability9').click(1, function(e){
    e.preventDefault();
    ajaxGetRequest("/ability/9");
  });
  $('#ability10').click(1, function(e){
    e.preventDefault();
    ajaxGetRequest("/ability/10");
  });
  $('#submit-button').click(1, function(e){
    e.preventDefault();
    var params = [];
    var no_of_chars = 22;
    for (var i = 1; i <= no_of_chars; i++) {
      if ($('#' + String(i)).is(":checked")){
        params.push(i);
      };
    };
    params.push($('#event').val());
    sendParams("/story/event_result", params);
    $('#next-link').attr('style', 'display: inline');
    $('#event-form').attr('style', 'display: none');
  });
  zombieApp.startChatting();
  jQuery(function(){
     var max = 3;
     var checkboxes = jQuery('input[type="checkbox"]');

     checkboxes.change(function(){
        var current = checkboxes.filter(':checked').length;
         checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
     });
  });
};

$(document).ready(function() {
  zombieApp.setup();
  
});

function sendParams(url, q){
  $.ajax({
    url: url,
    type: 'get',
    data: {'q':q },
    contentType: 'json',
    success: zombieApp.eventResult,
    error: console.log('there was an error with event callback')
  });
}


function ajaxGetRequest(endPoint) {
    var xmlhttp;

    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
        console.log(xmlhttp.responseText); // comment this if you're happy with the response and don't need it in the console
        if(xmlhttp.status == 200) {
          console.log('that all worked just fine');
          $(".characters").load("/story/1 .characters");
          $("#character-options").load("/story/1 #character-options");
          // remove loading of abilities list
          $('.abilities_list').attr('style', 'display: none')
          // $(".abilities_list").load("/story/1 .abilities_list");
        } else if(xmlhttp.status == 404) {
          console.error('There was an error 404');
        } else {
          console.error('something else other than 200 or 404 was returned')
        }
      }
    }

    xmlhttp.open("GET", endPoint, true);
    xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); // header to let the server know this request came from AJAX rather than a browser refresh
    xmlhttp.send();
  }

zombieApp.randomDelay = function() {
  return (Math.random() * 5 + 2) * 1000;
}

zombieApp.startChatting = function() {
  if($('#chatlog')) {
    console.log('startChatting');
    setTimeout(zombieApp.chatOpener, zombieApp.randomDelay());
  }
};

zombieApp.chatOpener = function() {
  console.log('chatOpener');
  $.get('/story/opener').success(function(data) {
    zombieApp.drawOpener(data);

    var delay = 0;
    for (i = 0; i < (Math.floor(Math.random() * 4) + 2); i++) { 
      console.log(delay);
      delay += zombieApp.randomDelay();
      setTimeout(function(){ zombieApp.chatReply(data.character_id)}, delay);
    }
    setTimeout(zombieApp.startChatting, delay + 2000);
  });
};

zombieApp.chatReply = function(character_id) {
  console.log('chatReply');
  $.get('/story/reply', {character_id: character_id}).success(function(data) {zombieApp.drawReply(data)});
  $('.chatbox').animate({
  scrollTop: $('.chatbox').get(0).scrollHeight}, 2000);  
}


zombieApp.drawOpener = function(data) {
  $('#chatlog').append("<li class='opener'><p class='nametitle'>"+data.name+": "+data.opener+"</p></li>");
};

zombieApp.drawReply = function(data) {
  $('#chatlog').append("<li class='reply'><p class='nametitle'>"+data.name+": "+data.reply+"</p></li>");
};







// zombie app needs to request a opener
  // results of opener need to be added to the chatlog
  // then 1-3 replies
  // repeat 

