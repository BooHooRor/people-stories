// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
$(document).ready(function(){
  /* 1. Visualizing things on Hover - See next part for action on click */
  $('#stars li').on('mouseover', function(){
    var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
   
    // Now highlight all the stars that's not after the current hovered star
    $(this).parent().children('li.star').each(function(e){
      if (e < onStar) {
        $(this).addClass('hover');
      }
      else {
        $(this).removeClass('hover');
      }
    });
    
  }).on('mouseout', function(){
    $(this).parent().children('li.star').each(function(e){
      $(this).removeClass('hover');
    });
  });
  
  
  /* 2. Action to perform on click */
  $('#stars li').on('click', function(){
    var onStar = parseInt($(this).data('value'), 10); // The star currently selected
    var stars = $(this).parent().children('li.star');
    
    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }
    
    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }
    //Rating story 
    $.ajax({
      url: '/ratings/update',
      type: 'GET',
      data: {article: $(this).parent().attr('class'), score: $(this).attr('data-value')},
      success: function(r){
      }
    });
  });

//Sorting stories(articles) ajax request
  $(".sort").on('click', function(){
    $.ajax({
      url: '/articles/sort',
      type: 'GET',
      data: {sort_type: $(this).attr('id')},
      success: function(r){
      }
    });
  });

//Adding story to favourites table
  $("#favourite").on('click', function(){
    $.ajax({
      url: '/articles/favourite',
      type: 'GET',
      data: {article_id: $(this).attr('data-value')},
      success: function(r){
      }
    });
  })
});
