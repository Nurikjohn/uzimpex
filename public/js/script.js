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

$(".save-btn").click((e) => {
  const url = $(e.target).attr("data-url");

  var data = new FormData();

  const image = $("#validatedCustomFile").prop("files")[0];
  const title = $("#exampleFormControlInput1").val();
  const keywords = $("#exampleFormControlInput2").val();
  const price = $("#exampleFormControlInput4").val();
  const amount = $("#exampleFormControlInput5").val();
  const category = $("#exampleFormControlSelect1").val();
  const description = $("#exampleFormControlTextarea1").val();
  const details = $("#exampleFormControlTextarea2").val();

  if (image) {
    data.append("image", image);
  }

  data.append("title", title);
  data.append("keywords", keywords);
  data.append("price", price);
  data.append("amount", amount);
  data.append("categoryId", category);
  data.append("description", description);
  data.append("details", details);

  console.log(data);

  $.ajax({
    url,
    dataType: "text",
    data: data,
    processData: false,
    contentType: false,
    type: "PATCH",
  });

  window.location.href = "/admin";
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

$('#lang-select').on("change", e => {
  const lang = $(e.target).val();

  window.location.href = `${window.location.origin}/${lang}`
});
