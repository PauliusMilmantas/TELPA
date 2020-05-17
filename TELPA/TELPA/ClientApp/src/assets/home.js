$(".event").on('click', event => {

  console.log("test");


  parent_id = $("#" + event.target.id).parent().attr('id');

  //Options
  parent_status = $("#" + parent_id).attr('class').split(" ")[1];
  if (parent_status == "confirmed") {
    $(".modal").find(".content").find(".contentdd").html(
      '<button type="button" class="btn btn-dark">Cancel</button>'
    );
  } else if (parent_status == "pending") {
    $(".modal").find(".content").find(".contentdd").html(
      '<button type="button" class="btn btn-success">Accept</button><br><br>' +
      '<button type="button" class="btn btn-dark">Cancel</button>'
    );
  } else {
    $(".modal").find(".content").find(".contentdd").html('');
  }

  //Parsing title
  parent_title = $("#" + parent_id).find(".title")[0];
  strt = parent_title.outerHTML.indexOf(">");
  end = parent_title.outerHTML.indexOf("</div>");
  parent_title = parent_title.outerHTML.substring(strt + 1, end);

  $(".modal").find(".content").find(".titledd").html(
    "<h2>" +
    parent_title +
    "</h2>"
  );

  //Parsing date
  parent_time = $("#" + parent_id).find(".time")[0];
  strt = parent_time.outerHTML.indexOf(">");
  end = parent_time.outerHTML.indexOf("</div>");
  parent_time = parent_time.outerHTML.substring(strt + 1, end);

  $(".modal").find(".content").find(".timedd").html(
    "<i>" +
    parent_time +
    "</i>"
  );

  $('.modal').addClass('open');

  if ($('.modal').hasClass('open')) {
    $('.container').addClass('blur');
  }
});

$('.close').click(function () {
  $('.modal').removeClass('open');
  $('.cont').removeClass('blur');
});
