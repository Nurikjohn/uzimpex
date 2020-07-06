$(".product-more").on("click", (e) => {
  console.log($(e.target).parent().children("p").toggleClass("text-truncate"));
});

$(".delete-prod").click((e) => {
  const url = $(e.target).attr("data-url");

  console.log(url);

  $.ajax({
    url,
    type: "DELETE",
    success: function (result) {
      location.reload();
    },
  });
});

$('#interest_tabs').on('click', 'a[data-toggle="tab"]', function(e) {
  e.preventDefault();

  var $link = $(this);

  if (!$link.parent().hasClass('active')) {

    //remove active class from other tab-panes
    $('.tab-content:not(.' + $link.attr('href').replace('#','') + ') .tab-pane').removeClass('active');

    // click first submenu tab for active section
    $('a[href="' + $link.attr('href') + '_all"][data-toggle="tab"]').click();

    // activate tab-pane for active section
    $('.tab-content.' + $link.attr('href').replace('#','') + ' .tab-pane:first').addClass('active');
  }

});

$('.owl-carousel').owlCarousel({
  loop:true,
  margin:10,
  responsiveClass:true,
  responsive:{
    0:{
      items:1,
      nav:true
    },
    600:{
      items:3,
      nav:false
    },
    1000:{
      items:5,
      nav:true,
      loop:false
    }
  }
});

$('.lang-select').on("change", e => {
  const lang = $(e.target).val();

  window.location.href = `${window.location.origin}/${lang}`
});

$('#button-submit').click(() => {
  window.location.href = "/admin"
});