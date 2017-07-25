/*
 * jQuery v1.9.1 included
 */

$(document).ready(function() {
  document.addEventListener("touchstart", function(){}, true);
  var menu = $('.menu');
  var menuLink = $('#menu-link');
	var wrapper = $('.wrapper');
  var isKnowledgeBase = $('.knowledge-base');
  var isIdeaForum = $('.idea-forum');
  var isContactUs = $('.contact-us');
  var newIdea = $('.post-to-community a');
  var myActivities = $('.my-activities');
  var postActions = $('.post-actions .dropdown-toggle');
  var notification = $('.notification-text');
  var requestDesc = $('.request_description p');
  var toggleMenu = function() {
		wrapper.toggleClass('go-left').toggleClass('disable-scroll');
    menu.toggleClass('show-menu').toggleClass('disable-scroll');
	}
  var isElement = function(A, B) {
    if (!A.is(B)  && A.has(B).length === 0) {
      return false
    }
    return true
  }

  wrapper.click(function (e) {
    if (menu.width() === 260) {
			toggleMenu();
    } else if (isElement(menuLink, e.target)) {
     	toggleMenu();
    }
	});

  var commentActions = $('.comment-actions');
  commentActions.click(function(e) {
  	if ($('.user-comment-actions .dropdown-toggle').is(e.target)) {
      e.preventDefault();
      $('.user-comment-actions .dropdown-menu [data-action=edit]')[0].click();
    }
  });

  if (isKnowledgeBase.length !== 0) {
    $('.nav-knowledge-base').addClass('chosen');
  } else if (isIdeaForum.length !== 0) {
    $('.nav-idea-forum').addClass('chosen');
  } else if (isContactUs.length !== 0) {
    $('.nav-contact-us').addClass('chosen');
  }
  
  if (window.location.href.indexOf('/articles/') !== -1) {
    var breadcrumbsContainer = $('.breadcrumbs-container')
  	$(breadcrumbsContainer.children().children().children()[0]).text('知识库');
    breadcrumbsContainer.css('visibility', 'visible');
  }

  if (HelpCenter.user.role === "agent" || HelpCenter.user.role === "manager") {
  	$('.topic-follow').removeClass('hidden');
    $('.section-follow').removeClass('hidden');
  }

  if (HelpCenter.user.role === "end_user") {
    $('.comment-actions').addClass('user-comment-actions');
  }
  
	if (HelpCenter.user.role === "anonymous") {
		newIdea.click(function(e) {
      e.preventDefault();
      var date = new Date();
      var timestamp = Math.floor(date.getTime()/1000);
      window.location.href = "https://www.sxl.cn/s/login?locale_id=10&return_to=http%3A%2F%2Fhelp.sxl.cn%2Fhc%2Fzh-cn%2Fcommunity%2Fposts%2Fnew%3Fcommunity_post%255Btopic_id%255D%3D200511878&timestamp=" + timestamp;
    });
   }

  myActivities.hide();
  // social share popups
  $(".share a").click(function(e) {
    e.preventDefault();
    window.open(this.href, "", "height = 500, width = 500");
  });

  // toggle the share dropdown in communities
  $(".share-label").on("click", function(e) {
    e.stopPropagation();
    var isSelected = this.getAttribute("aria-selected") == "true";
    this.setAttribute("aria-selected", !isSelected);
    $(".share-label").not(this).attr("aria-selected", "false");
  });

  $(document).on("click", function() {
    $(".share-label").attr("aria-selected", "false");
  });
  
  postActions.text('帖子管理');
  postActions.show();
  if (notification.text() === '帖子待批准。') {
    notification.text('提交成功，等待管理员批准');
    notification.css('visibility', 'visible');
  } else if (notification.text() === '您的请求已成功提交。') {
  	notification.text('成功发送！我们的客服会尽快回复');
		notification.css('visibility', 'visible');
  }
  requestDesc.text('请尽量写得详细一些，我们会尽快答复');
  requestDesc.show();
  
  // show form controls when the textarea receives focus or backbutton is used and value exists
  var $answerbodyTextarea = $(".answer-body textarea"),
  $answerFormControls = $(".answer-form-controls"),
  $commentContainerTextarea = $(".comment-container textarea"),
  $commentContainerFormControls = $(".comment-form-controls");

  $answerbodyTextarea.one("focus", function() {
    $answerFormControls.show();
  });

  $commentContainerTextarea.one("focus", function() {
    $commentContainerFormControls.show();
  });

  if ($commentContainerTextarea.val() !== "") {
    $commentContainerFormControls.show();
  }

  if ($answerbodyTextarea.val() !== "") {
    $answerFormControls.show();
  }

  // Submit requests filter form in the request list page
  $("#request-status-select, #request-organization-select")
    .on("change", function() {
      search();
    });

  // Submit requests filter form in the request list page
  $("#quick-search").on("keypress", function(e) {
    if (e.which === 13) {
      search();
    }
  });

  function search() {
    window.location.search = $.param({
      query: $("#quick-search").val(),
      status: $("#request-status-select").val(),
      organization_id: $("#request-organization-select").val()
    });
  }

  // Submit organization form in the request page
  $("#request-organization select").on("change", function() {
    this.form.submit();
  });

});
