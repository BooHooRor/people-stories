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

  $("#sort_types").on('mouseover', function(){
    $("#sort_box_before").css({"display" : "none"});
    $("#sort_box_after").css({"display" : "flex"});
  })

  $("#sort_types").on('mouseout', function(){
    $("#sort_box_after").css({"display" : "none"});
    $("#sort_box_before").css({"display" : "flex"});
  })

  $(".submit_button").on('mouseover', function(){
    $(".search_input").animate({"padding" : "12px 20px","width" : "200px"});
  })

  $("#main_container, #sort_types, #nav_buttons").on('click', function(){
    $(".search_input").animate({"padding" : "0px 0px","width" : "0px"});
  })

  $('.sort').on('click', function(){
    $(this).children("i").toggleClass('fa fa-toggle-off fa-reverse');
    $(this).children("i").toggleClass('fa fa-toggle-on');
  })

  $("#nav_buttons").on('mouseenter', function(){
    $(".log_in_label").css({"color": "#373737"}).stop().animate({"margin-right" : "20px"}, "fast");
    $(".log_in_img").attr('src', '/user-circle-hover.png');
  })

  $("#nav_buttons").on('mouseleave', function(){
    $(".log_in_label").stop().animate({"margin-right" : "-100px"},"fast", function(){
      $(".log_in_label").css({"color": "#F4F4F4"});
      $(".log_in_img").attr('src', '/user-circle-o.png');
    });
  })

  $(".category_triangle").on('mouseenter', function(){
    $(this).stop().animate({"opacity":"1","height":"55px","border-left-width":"35px","border-top-width" : "35px", "width":"55px"},"fast", function(){
      
    });
  })

  $(".category_triangle").on('mouseleave', function(){
    $(this).stop().animate({"opacity":"0.8","height":"20px","border-left-width":"10px","border-top-width" : "10px", "width":"20px"},"fast", function(){
      
    });
  })

  $('.display_settings').click(function(){
        $("#chat_bar").toggleClass("show_chat_bar");
        $("#chat_bar").toggleClass("hide_chat_bar");
    });
  $("#chat_box").click(function(){
        $(this).children("chat_box_messages").toggleClass("show_chat_box");
        $(this).children("chat_box_messages").toggleClass("hide_chat_box");
  });
})
//   $('.display_settings').on('click', function(){
    
//     $("#chat_bar").stop().animate({"height":"30px"},"fast");
//   })
// });
