let _functions = {},
  winW,
  winH,
  winScr,
  isTouchScreen,
  isAndroid,
  isIPhone,
  is_Mac,
  is_IE,
  is_Chrome;
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
jQuery(function ($) {
  ("use strict");

  /* function on page ready */
  (isTouchScreen =
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i)),
    (isAndroid = navigator.userAgent.match(/Android/i)),
    (isIPhone = navigator.userAgent.match(/iPhone/i)),
    (is_Mac = navigator.platform.toUpperCase().indexOf("MAC") >= 0),
    (is_IE =
      /MSIE 9/i.test(navigator.userAgent) ||
      /rv:11.0/i.test(navigator.userAgent) ||
      /MSIE 10/i.test(navigator.userAgent) ||
      /Edge\/\d+/.test(navigator.userAgent)),
    (is_Chrome =
      navigator.userAgent.indexOf("Chrome") >= 0 &&
      navigator.userAgent.indexOf("Edge") < 0);

  const $body = $("body");

  $body.addClass("loaded");

  setTimeout(function () {
    $("body").addClass("site-ready");
  }, 1000);

  if (isTouchScreen) {
    $("html").addClass("touch-screen");
  }
  if (isAndroid) {
    $("html").addClass("android");
  }
  if (isIPhone) {
    $("html").addClass("ios");
  }
  if (is_Mac) {
    $("html").addClass("mac");
  }
  if (is_IE) {
    $("html").addClass("ie");
  }
  if (is_Chrome) {
    $("html").addClass("chrome");
  }

  /*    _functions.productSwiperWrapperHeight = function() {
        if (!$('.products_swiper').length) return;

        setTimeout(function () {
            $('.products_swiper').each(function () {
                const h = $(this).find('.swiper-container').height();
                $(this).find('.swiper-wrapper').css({'height': h});
            });
        }, 1000);

    }*/

  _functions.pageCalculations = function () {
    winW = $(window).width();
    winH = $(window).height();

    //_functions.productSwiperWrapperHeight();
  };

  _functions.pageCalculations();

  //images preload
  _functions.imagesLazyLoad = function () {
    /* images load */
    $("img[data-i-src]:not(.imgLoaded)").each(function (i, el) {
      let loadImage = new Image();
      loadImage.src = $(el).data("i-src");

      loadImage.onload = function () {
        $(el)
          .attr({ src: $(el).data("i-src") })
          .addClass("imgLoaded");
      };
      loadImage = null;
    });

    $("iframe[data-i-src]:not(.imgLoaded)").each(function (i, el) {
      $(el)
        .attr({ src: $(el).data("i-src") })
        .addClass("imgLoaded");
    });

    $("[data-bg]:not(.bgLoaded)").each(function (i, el) {
      let loadImage = new Image();
      loadImage.src = $(el).data("bg");

      loadImage.onload = function () {
        $(el)
          .css({ "background-image": "url(" + $(el).data("bg") + ")" })
          .addClass("bgLoaded");
      };
      loadImage = null;
    });
  };

  //images preload
  setTimeout(function () {
    _functions.imagesLazyLoad();
  }, 100);

  _functions.pageScroll = function (current, header_height) {
    $("html, body").animate(
      { scrollTop: current.offset().top - header_height },
      700
    );
  };
  // anchor scroll
  $(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        let target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          let space = 110;
          if (!target.closest(".section-fade.animate").hasClass("animated")) {
            space = 310;
          }
          $("html, body").animate(
            {
              scrollTop: target.offset().top - space,
            },
            1000
          );
          $(".mobile-button").removeClass("active");
          $("html").removeClass("overflow-menu");
          $("header").removeClass("open-menu");
          return false;
        }
      }
    });
  });
  // =============================
  // ON SCROLL ANIMATE
  // =============================
  function animateOnScroll() {
    if ($(".animate").length && !is_IE) {
      $(".animate")
        .not(".animated")
        .each(function () {
          let th = $(this);
          if (window.innerWidth > 1199) {
            if (
              $(window).scrollTop() >=
              th.offset().top - $(window).height() * 0.75
            ) {
              th.addClass("animated");
            }
          } else {
            if (
              $(window).scrollTop() >=
              th.offset().top - $(window).height() * 1
            ) {
              th.addClass("animated");
            }
          }
        });
    }
  }
  $(document).ready(function () {
    setTimeout(() => {
      animateOnScroll();
    }, 500);
  });
  $(window).on("scroll", function () {
    animateOnScroll();
  });

  //sumoselect
  if ($(".SelectBox").length) {
    $(".SelectBox").each(function () {
      $(this).SumoSelect({
        floatWidth: 0,
        nativeOnDevice: [],
        placeholder: "Виберіть часовий інтервал*",
      });
    });

    /*        $('.SelectBox').on('sumo:opened', function(sumo) {
            if ( winW < 768 ) _functions.pageScroll($(this), $('.header').outerHeight() + 30);
        });*/
  }

  //menu
  $(".mobile-button").on("click", function () {
    $(this).toggleClass("active");
    $("html").toggleClass("overflow-menu");
    $(this).parents("header").toggleClass("open-menu");
  });

  /* function on page scroll */
  $(window).scroll(function () {
    _functions.scrollCall();
  });
  _functions.scrollCall = function () {
    winScr = $(window).scrollTop();
    if (winScr > 40) {
      $("header").addClass("scrolled");
    } else {
      $("header").removeClass("scrolled");
    }
  };

  /* function on page resize */
  _functions.resizeCall = function () {
    setTimeout(function () {
      _functions.pageCalculations();
    }, 100);
  };

  if (!isTouchScreen) {
    $(window).resize(function () {
      _functions.resizeCall();
    });
  } else {
    window.addEventListener(
      "orientationchange",
      function () {
        _functions.resizeCall();
      },
      false
    );
  }

  /* swiper sliders */
  _functions.getSwOptions = function (swiper) {
    let options = swiper.data("options");
    options = !options || typeof options !== "object" ? {} : options;
    const $p = swiper.closest(".swiper-entry"),
      slidesLength = swiper.find(">.swiper-wrapper>.swiper-slide").length;
    if (!options.pagination)
      options.pagination = {
        el: $p.find(".swiper-pagination")[0],
        clickable: true,
      };
    if (!options.navigation)
      options.navigation = {
        nextEl: $p.find(".swiper-button-next")[0],
        prevEl: $p.find(".swiper-button-prev")[0],
      };
    options.preloadImages = false;
    options.lazy = { loadPrevNext: true };
    options.observer = true;
    options.observeParents = true;
    options.watchOverflow = true;
    options.centerInsufficientSlides = true;
    if (!options.speed) options.speed = 500;
    options.roundLengths = true;
    if (isTouchScreen) options.direction = "horizontal";
    if (slidesLength <= 1) {
      options.loop = false;
    }
    return options;
  };
  _functions.initSwiper = function (el) {
    const swiper = new Swiper(el[0], _functions.getSwOptions(el));
  };

  $(".swiper-entry .swiper-container").each(function () {
    _functions.initSwiper($(this));
  });
  $(".swiper-thumbs").each(function () {
    let top = $(this).find(".swiper-container.swiper-thumbs-top")[0].swiper,
      bottom = $(this).find(".swiper-container.swiper-thumbs-bottom")[0].swiper;
    if ($(this).find(".swiper-container.swiper-thumbs-bottom .swiper-slide").length < 2) {
      $(this).find(".swiper-container.swiper-thumbs-bottom").remove();
    } else {
      top.thumbs.swiper = bottom;
      top.thumbs.init();
      top.thumbs.update();
    }
    
  });
  $(".swiper-control").each(function () {
    let top = $(this).find(".swiper-container")[0].swiper,
      bottom = $(this).find(".swiper-container")[1].swiper;
    top.controller.control = bottom;
    bottom.controller.control = top;
  });

  // =============================
  // POPUP
  // =============================
  let popupTop = 0;
  _functions.removeScroll = function () {
    popupTop = $(window).scrollTop();
    $("html").css({
      position: "fixed",
      top: -$(window).scrollTop(),
      width: "100%",
      "overflow-y": "scroll",
    });
  };
  _functions.addScroll = function () {
    $("html").css({
      position: "static",
      "overflow-y": "auto",
    });
    window.scroll(0, popupTop);
  };
  _functions.openPopup = function (popup) {
    if (!$(popup).length) {
      $(".popup-wrapper").load(`inc/_popups.php`, async () => {
        await sleep(300);
        $(".popup-content").removeClass("active");
        $(popup + ", .popup-wrapper").addClass("active");
        _functions.removeScroll();
      });
    } else {
      $(".popup-content").removeClass("active");
      $(popup + ", .popup-wrapper").addClass("active");
      _functions.removeScroll();
    }
  };

  _functions.videoPopup = function (src) {
    $("#video-popup .embed-responsive").html(
      '<iframe src="' + src + '"></iframe>'
    );
    _functions.openPopup("#video-popup");
  };

  _functions.closePopup = function () {
    $(".popup-wrapper, .popup-content").removeClass("active");

    // $('.popup-iframe').html('');
    $("#video-popup iframe").remove();

    _functions.addScroll();
  };

  $(document).on("click", ".video-popup", function (e) {
    e.preventDefault();
    _functions.videoPopup($(this).data("src"));
  });

  $(document).on("click", ".open-popup", function (e) {
    e.preventDefault();
    _functions.openPopup(
      '.popup-content[data-rel="' + $(this).data("rel") + '"]'
    );
  });

  $(document).on(
    "click",
    ".popup-wrapper .close-popup, .popup-wrapper .layer-close",
    function (e) {
      e.preventDefault();
      _functions.closePopup();
    }
  );

  // detect if user is using keyboard tab-button to navigate
  // with 'keyboard-focus' class we add default css outlines
  function keyboardFocus(e) {
    if (e.keyCode !== 9) {
      return;
    }

    switch (e.target.nodeName.toLowerCase()) {
      case "input":
      case "select":
      case "textarea":
        break;
      default:
        document.documentElement.classList.add("keyboard-focus");
        document.removeEventListener("keydown", keyboardFocus, false);
    }
  }

  document.addEventListener("keydown", keyboardFocus, false);

  // filter style click
  $(".filters-list li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  // categories mobile
  $(".category-title").on("click", function () {
    $(this)
      .toggleClass("active")
      .closest(".categories-menu")
      .toggleClass("active");
  });

  $(".categories-list-item").on("click", function () {
    $(this)
      .closest(".categories-menu")
      .removeClass("active")
      .find(".category-title")
      .removeClass("active");
  });

  /*---- product -----*/
  //plus-minus
  $(document).on("click", ".decrement:not(.in-cart)", function () {
    let $this = $(this),
      $input = $this.parent().find("input"),
      hasMin = $input[0].hasAttribute("data-min"),
      value = parseInt($input.val(), 10),
      min = hasMin ? +$input.attr("data-min") : 1;

    if (value != min) {
      value = value - 1;
    } else {
      value = min;
    }

    $input.val(value);
  });

  $(document).on("click", ".increment:not(.in-cart)", function () {
    let $this = $(this),
      $input = $this.parent().find("input"),
      value = parseInt($input.val(), 10);
    $input.val(value + 1);
  });

  // order btn animation example
  // $(".js-product .order-btn, #ing-add-to-cart").on("click", function () {
  //   const $this = $(this);

  //   if (!$this.hasClass("loading")) {
  //     $this.addClass("loading");

  //     $(".js-product")
  //       .not($(this).closest(".js-product"))
  //       .each(function () {
  //         $(this).find(".order-btn").addClass("disabled");
  //       });

  //     let loader =
  //         '<span class="btn-loader"><span class="btn-loader-inner"><span></span><span></span><span></span></span></span>',
  //       success = '<span class="btn-loader-complete"></span>';

  //     $this
  //       .append(loader)
  //       .find(".btn-loader")
  //       .fadeIn(500, function () {
  //         // FOR WP DEV !!!! instead of setTimeout here MUST be succes ajax callback
  //         setTimeout(function () {
  //           $this.append(success).fadeIn(500, function () {
  //             $this.find(".btn-loader").remove();
  //             setTimeout(function () {
  //               $this.find(".btn-loader-complete").fadeOut(500, function () {
  //                 $(this).remove();
  //                 $this.removeClass("loading");
  //                 $(".js-product").each(function () {
  //                   $(this).find(".order-btn").removeClass("disabled");
  //                 });
  //               });
  //             }, 1000);
  //           });
  //         }, 1000);
  //       });

  //     //informer
  //     let nameProduct = $(this)
  //       .parents(".product")
  //       .find(".product_title a")
  //       .html();
  //     setTimeout(function () {
  //       $(".cart-informer").addClass("active");
  //       $(".cart-informer").find(".text span").html(nameProduct);
  //     }, 300);
  //     setTimeout(function () {
  //       $(".cart-informer").removeClass("active");
  //     }, 2000);
  //   }
  // });

  /*---- end of product -----*/

  //inputmask
  if ($(".inputmask").length) {
    $(".inputmask").inputmask({
      // clearMaskOnLostFocus: false
      showMaskOnHover: false,
      definitions: {
        x: {
          validator: "[1-9]",
        },
        9: {
          validator: "[0-9]",
        },
      },
    });
  }

  // calc total sum in cart
  _functions.calculateCartTotalPrice = function () {
    let total = 0;
    $(".cart .js-product").each(function () {
      total +=
        +$(this).data("price") *
        +$(this).find(".thumb-input-number input").val();
    });
    $("#card-total-price").html(total);

    if (total === 0) {
      $("#cart-submit").addClass("disabled");
    }
  };

  $(document).on(
    "click",
    ".cart .js-product .thumb-input-number button",
    function () {
      _functions.calculateCartTotalPrice();
    }
  );

  //remove product from card
  // $(document).on("click", ".cart .js-product .btn-close", function () {
  //   $(this)
  //     .closest(".js-product")
  //     .slideUp(0, function () {
  //       $(this).remove();
  //       _functions.calculateCartTotalPrice();
  //     });
  // });

  // //remove product from card
  // $(document).on("click", ".cart-top .js-product .btn-close", function () {
  //   $(this)
  //     .closest(".js-product")
  //     .slideUp(0, function () {
  //       $(this).remove();
  //       _functions.calculateCartTotalPrice();
  //     });
  // });

  // open - close cart top
  $(".open-top-cart").on("click", function () {
    $(".cart-top").toggleClass("active closed");
    if ($("html").css("position") === "fixed") {
      _functions.addScroll();
    } else {
      _functions.removeScroll();
    }
  });
  $(".cart_bg-layer").on("click", function () {
    $(".cart-top").toggleClass("active closed");
    _functions.addScroll();
  });

  // checkout tabs
  $(".toggle-block-control").on("change", function () {
    let blockNum = $(this).data("block"),
      rel = $(this).data("rel"),
      $showBlock = $(
        '.toggle-block[data-block="' + blockNum + '"][data-rel="' + rel + '"]'
      ),
      $hideBlock = $('.toggle-block[data-block="' + blockNum + '"]:visible');

    if ($(this).is('input[type="checkbox"]')) {
      $showBlock.slideToggle();
      return;
    }

    if ($hideBlock.length) {
      $hideBlock.slideUp(500, function () {
        $showBlock.slideDown();
      });
    } else {
      $showBlock.slideDown();
    }
  });

  // checkout calculate

  // _functions.calculateTotalCheckoutPrice = function () {
  //   let allSummProduct = 0;
  //   $(".checkout-products .js-checkout-product").each(function () {
  //     allSummProduct +=
  //       +$(this).data("price") *
  //       +$(this).find(".thumb-input-number input").val();
  //   });
  //   $(".all-product-price-el").text(allSummProduct);

  //   //show empty cart message
  //   // if (allSummProduct === 0) {
  //   //   $(".cart-empty-section").show();
  //   //   $(".checkout-section").hide();
  //   // }

  //   //dynamic cost lines
  //   let minDelivery = +$(".min-delivery b").html(),
  //     currentLineWidth = (100 / minDelivery) * allSummProduct;
  //   if (allSummProduct >= minDelivery) {
  //     $(".remains-cost-wrap").slideUp();
  //     $(".current-line").addClass("green");
  //   } else {
  //     $(".remains-cost-wrap").slideDown();
  //     $(".remains-cost").html(minDelivery - allSummProduct);
  //     $(".current-line").removeClass("green");
  //   }

  //   $(".current-line").css("width", currentLineWidth + "%");
  //   $(".current-line").find(".current-cost").html(allSummProduct);
  //   $(".total-line").find(".total-cost").html(minDelivery);
  // };

  // _functions.calculateTotalCheckoutPrice();

  // $(document).on(
  //   "click",
  //   ".js-checkout-product .thumb-input-number button",
  //   function () {
  //     // _functions.calculateTotalCheckoutPrice();

  //     let prod = $(this).closest(".js-checkout-product"),
  //       productSum = +prod.data("price") * +prod.find("input").val();
  //     prod.find(".price").text(productSum);
  //   }
  // );

  //remove product from card
  // $(document).on("click", ".js-checkout-product .btn-close", function () {
  //   $(this)
  //     .closest(".js-checkout-product")
  //     .slideUp(0, function () {
  //       $(this).remove();
  //       _functions.calculateTotalCheckoutPrice();
  //     });
  // });

  //calculate plastic or not
  $(document).on("change", "#noPlastic", function () {
    let $this = $(this),
      getPlasticSumm = +$(".all-plastic-price").text(),
      getAllSumm = +$(".all-order-price .all-product-price-el").text(),
      getDeliverySumm = 0;

    if ($(".price-delivery").hasClass("add-delivery")) {
      getDeliverySumm = +$(".price-delivery #all-products-delivery").text();
    } else {
      getDeliverySumm = 0;
    }

    if ($this.is(":checked")) {
      $this.prop("checked", true);
      $(".all-product-price .all-product-price-el").html(
        getAllSumm - getPlasticSumm + getDeliverySumm
      );
      $(".all-order-price .all-product-price-el").html(
        getAllSumm - getPlasticSumm
      );
    } else {
      $this.prop("checked", false);
      $(".all-product-price .all-product-price-el").html(
        getAllSumm + getPlasticSumm + getDeliverySumm
      );
      $(".all-order-price .all-product-price-el").html(
        getAllSumm + getPlasticSumm
      );
    }
  });

  //single product price
  _functions.calculateSinglePrice = function ($parentEl) {
    let prod = $parentEl,
      productSum = +prod.attr("data-price") * +prod.find(".thumb-input-number input").val(),
      checkedModify = $(".js-product .modify-product input"),
      modifySum =
        +prod.find(".modify-product .checkbox-entry").attr("data-price") *
        +prod.find("input").val();
        
    prod.find(".price").text(productSum);

    if (checkedModify.is(":checked")) {
      checkedModify.prop("checked", true);
      prod.find(".price").text(productSum + modifySum);
    } else {
      checkedModify.prop("checked", false);
      prod.find(".price").text(productSum);
    }
  };

  $(document).on(
    "click",
    ".js-product .product-item__controlls .thumb-input-number button",
    function () {
      _functions.calculateSinglePrice($(this).closest(".js-product"));
    }
  );

  $(document).on("change", ".js-product .modify-product input", function () {
    let $this = $(this),
      getPriceModify = +$this.closest(".checkbox-entry").data("price"),
      getAmountProduct = +$this.closest(".js-product").find("input").val(),
      getAllSumm = +$this
        .closest(".js-product")
        .find(".product_price .price")
        .text();

    if ($this.is(":checked")) {
      $this.prop("checked", true);
      $this
        .closest(".js-product")
        .find(".product_price .price")
        .text(getAllSumm + getPriceModify * getAmountProduct);
    } else {
      $this.prop("checked", false);
      $this
        .closest(".js-product")
        .find(".product_price .price")
        .text(getAllSumm - getPriceModify * getAmountProduct);
    }
  });

  // product_variations
  $(document).on("click", ".js-product .product_variations li", function (e) {
    let $this = $(this),
      $product = $this.closest(".js-product"),
      price = $this.attr("data-price"),
      oldPrice = $this.attr("data-old-price"),
      size = $this.attr("data-size"),
      imgSrc = $this.attr("data-img-scr"),
      imgHoverSrc = $this.attr("data-img-hover-src");

    $this.addClass("active").siblings().removeClass("active");

    if (price) $product.attr("data-price", price);
    if (oldPrice) $product.find(".price-old").text(oldPrice);
    if (size) $product.find(".size").text(size);
    if (imgSrc) {
      if ($product.is(".js-product-detail")) {
        $(".product_detail-img").eq(0).find(".img").attr("src", imgSrc);
      } else {
        $product.find(".img-default").attr("src", imgSrc);
      }
    }
    if (imgHoverSrc) $product.find(".img-hover").attr("src", imgHoverSrc);
    $product.find("input").val(1);

    $(".js-product").find(".modify-product input").prop("checked", false);

    _functions.calculateSinglePrice($product);
  });

  // Invalid Input
  $(".input[required]").on("blur", function () {
    if ($(this).val().trim()) {
      $(this).removeClass("invalid");
    } else {
      $(this).addClass("invalid");
    }
  });

  // custom_dropdown
  // $(".custom_dropdown-title").on("click", function (e) {
  //   $(this).toggleClass("active");
  //   $(this)
  //     .closest(".custom_dropdown")
  //     .find(".custom_dropdown-toggle")
  //     .slideToggle(300);
  // });

  // ingredients
  _functions.calculateIngredientsPrice = function () {
    let totalPrice = +$("#ing_body").attr("data-product-price");

    $("#ing_output")
      .find(".ing_control")
      .each(function () {
        totalPrice +=
          +$(this).attr("data-price") * +$(this).find("input").val();
      });

    totalPrice = totalPrice * +$(".ing_footer-controls input").val();

    $("#ing-total-price").text(totalPrice);
  };

  $(document).on(
    "click",
    ".ing_footer-controls .thumb-input-number button",
    function () {
      _functions.calculateIngredientsPrice();
    }
  );

  $(document).on(
    "click",
    "#ing_body .ing_control .thumb-input-number button",
    function () {
      let $this = $(this),
        price = $this.attr("data-price"),
        ing = $this.attr("data-ing");

      _functions.calculateSinglePrice($this.closest(".ing_control"));
      _functions.calculateIngredientsPrice();
    }
  );

  $(document).on("click", "#ing_body .ing_control .btn-close", function () {
    let $this = $(this),
      parent = $this.closest(".ing_control"),
      ing = parent.attr("data-ing");

    parent.remove();
    $('.ing-popup .ingredient[data-ing="' + ing + '"]').removeClass("active");
    _functions.calculateIngredientsPrice();
  });

  _functions.createIngControl = function (
    $elementFromWhichCreate,
    $elementWhereCreate
  ) {
    const $el = $elementFromWhichCreate,
      price = $el.attr("data-price"),
      ing = $el.attr("data-ing"),
      id = $el.attr("data-id"),
      title = $el.find(".ingredient_title").text();

    const control = `<div class="ing_control" data-id="${id}" data-ing="${ing}" data-price="${price}"><div class="ing_control-title">${title}</div>\n<div class="thumb-input-number"><button type="button" class="decrement"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7085 4.54623C11.819 4.53105 11.944 4.50589 12.0768 4.47918C12.5468 4.38463 13.1133 4.27067 13.4702 4.51087C13.8579 4.77237 13.8096 5.31508 13.7706 5.75233C13.7634 5.83311 13.7565 5.91029 13.7527 5.98143C13.7029 6.92008 13.6562 7.85943 13.6148 8.79843C13.6042 9.04176 13.4252 9.21435 13.1855 9.22779C12.6352 9.2587 12.0839 9.26743 11.5327 9.27615C11.3774 9.27861 11.2222 9.28107 11.067 9.28402C10.9357 9.28645 10.8041 9.29134 10.6726 9.29624C10.3356 9.30878 10.0231 9.28508 9.68754 9.25963C9.54284 9.24866 9.39384 9.23736 9.23671 9.2285C8.68655 9.28402 5.74443 9.33999 4.1114 9.25791C3.64759 9.2346 3.30016 9.21714 3.1631 9.21683C2.40518 9.2147 1.65681 9.17934 0.903488 9.09658C0.744335 9.15352 0.539558 9.10931 0.492166 8.91585C0.223729 7.82017 0.140263 6.70788 0.196143 5.58214C0.208522 5.3328 0.395615 5.13191 0.650258 5.12767C1.22305 5.11802 1.79089 5.03781 2.35743 4.95779C3.11914 4.85021 3.87848 4.74296 4.64428 4.80795C5.54426 4.88433 6.25338 4.88315 7.00393 4.8819C7.23114 4.88153 7.46182 4.87463 7.70262 4.86743C8.23308 4.85157 8.81267 4.83424 9.51242 4.8819C9.99489 4.84147 10.3616 4.77208 10.7185 4.70453C10.9513 4.66046 11.18 4.61718 11.434 4.58323C11.5258 4.57097 11.6174 4.55873 11.7085 4.54623ZM11.0666 8.34679C11.6392 8.34821 12.2122 8.35139 12.7847 8.36412C12.8143 7.93585 12.8429 7.50735 12.8715 7.0788L12.8926 6.7634C12.8991 6.66568 12.9058 6.56796 12.9125 6.47024C12.9272 6.25496 12.942 6.03968 12.9549 5.8244C12.9597 5.74493 12.9672 5.68057 12.9734 5.62761C12.9969 5.42554 13.0012 5.38928 12.7649 5.31193C12.5849 5.25353 12.2677 5.31568 11.996 5.36891C11.8712 5.39336 11.756 5.41592 11.6682 5.42405C11.4997 5.43966 11.3312 5.45383 11.1626 5.468C11.018 5.48017 10.8734 5.49233 10.7289 5.50539C10.1768 5.55526 9.65475 5.59699 9.10514 5.52272L9.10267 5.52131C9.10909 5.60393 7.60375 5.58458 6.45276 5.5698C5.76594 5.56097 5.20529 5.55377 5.16736 5.57082C5.13199 5.61294 4.34863 5.61656 3.78891 5.61915C3.49797 5.6205 3.26746 5.62156 3.23383 5.62761C2.72494 5.71859 2.48277 5.73689 2.29398 5.75115C2.01016 5.77259 1.84699 5.78492 1.07962 6.0214C1.07535 6.07437 1.06876 6.12749 1.06217 6.18062C1.05316 6.25326 1.04415 6.32592 1.04106 6.39828C1.04037 6.42984 1.04219 6.72592 1.04396 7.01455C1.04563 7.28738 1.04726 7.55356 1.0467 7.58338C1.05184 7.81363 1.0651 8.35304 1.07643 8.50559C1.72012 8.52575 2.36663 8.53212 3.0089 8.48649C3.21013 8.47228 3.41555 8.43557 3.62169 8.39874C3.87777 8.35298 5.14968 8.37958 6.48558 8.40752C7.47254 8.42816 8.49443 8.44953 9.16739 8.44299C9.84396 8.43642 10.0667 8.39859 10.2327 8.37041C10.3523 8.3501 10.4424 8.3348 10.6515 8.33982C10.7905 8.34316 10.9291 8.34649 11.0666 8.34679Z" fill="#F8F8F8"/></svg></button><input class="product-qty" value="1" readonly="" tabindex="-1"><button type="button" class="increment"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0768 4.47909C12.5468 4.38454 13.1133 4.27057 13.4702 4.51077C13.8579 4.77228 13.8096 5.31498 13.7706 5.75223C13.7634 5.83302 13.7565 5.9102 13.7527 5.98134C13.7029 6.91999 13.6562 7.85934 13.6148 8.79834C13.6042 9.04167 13.4252 9.21426 13.1855 9.2277C12.6352 9.2586 12.0839 9.26733 11.5327 9.27606C11.3774 9.27852 11.2222 9.28098 11.067 9.28393C10.9357 9.28636 10.8041 9.29125 10.6726 9.29615C10.1903 9.31409 9.7077 9.33205 9.23671 9.2284C9.30426 9.98208 9.36615 10.7361 9.42698 11.4905C9.43795 11.6254 9.45986 11.7779 9.48291 11.9382C9.54679 12.3828 9.61941 12.8881 9.49206 13.2497C9.23226 13.9872 8.04988 13.8768 7.22497 13.7998C7.01898 13.7806 6.83528 13.7635 6.69381 13.7621C6.56544 13.7609 6.42778 13.7646 6.28578 13.7684C5.40742 13.7919 4.36273 13.8198 4.32102 12.7174C4.30644 12.329 4.4004 11.9109 4.49138 11.5062C4.5328 11.3219 4.5736 11.1404 4.60325 10.9656C4.71572 10.3011 4.84057 9.6422 4.99441 8.9872C4.56308 9.26278 4.03924 9.24405 3.52758 9.22575C3.40491 9.22137 3.28293 9.21701 3.1631 9.21673C2.40518 9.21461 1.65681 9.17924 0.903488 9.09648C0.744335 9.15343 0.539558 9.10922 0.492166 8.91576C0.223729 7.82008 0.140263 6.70778 0.196143 5.58205C0.208522 5.33271 0.395615 5.13182 0.650258 5.12758C1.99315 5.10494 3.31341 4.9656 4.64428 4.80786C4.40625 3.42818 4.23331 2.04108 4.13888 0.642663C4.12226 0.392263 4.3624 0.185365 4.5983 0.183243C6.0724 0.170157 7.54403 0.191378 9.01743 0.239123C9.25192 0.24655 9.43194 0.427277 9.43936 0.661054C9.44528 0.848825 9.45142 1.03675 9.45757 1.22481C9.49809 2.46453 9.53878 3.70951 9.51575 4.94862C10.1351 4.75672 10.7907 4.66911 11.434 4.58314C11.5258 4.57087 11.6174 4.55864 11.7085 4.54614C11.819 4.53095 11.944 4.5058 12.0768 4.47909ZM11.0666 8.3467C11.6392 8.34812 12.2122 8.3513 12.7847 8.36403C12.8143 7.93576 12.8429 7.50726 12.8715 7.07872L12.8926 6.76331C12.8991 6.66559 12.9058 6.56787 12.9125 6.47015C12.9272 6.25487 12.942 6.03959 12.9549 5.82431C12.9597 5.74484 12.9672 5.68048 12.9734 5.62752C12.9969 5.42545 13.0012 5.38918 12.7649 5.31184C12.5849 5.25344 12.2677 5.31559 11.996 5.36881C11.8712 5.39326 11.756 5.41583 11.6682 5.42396C11.4997 5.43956 11.3312 5.45374 11.1626 5.46791C11.018 5.48007 10.8734 5.49223 10.7288 5.5053C10.1768 5.55517 9.65475 5.5969 9.10514 5.52263L9.10266 5.52121C8.85792 5.54491 8.59373 5.40097 8.58171 5.07877C8.53592 3.83291 8.55954 2.57989 8.58308 1.33139L8.58772 1.0844C7.41989 1.10845 6.25278 1.1134 5.0846 1.09925C5.09341 1.28879 5.10612 1.47811 5.11884 1.66745C5.12909 1.82011 5.13934 1.97279 5.14755 2.12561L5.16294 2.40264C5.21401 3.32323 5.27607 4.44181 5.34278 5.31609C5.35304 5.44801 5.26886 5.5251 5.16736 5.57073C5.1136 5.63474 5.04499 5.68709 4.94667 5.70477C3.67274 5.93254 2.3737 6.00716 1.07962 6.02131C1.0538 6.34173 1.04708 6.66181 1.04107 6.98153L1.04111 6.98859C1.0436 7.3657 1.04867 8.13189 1.07643 8.5055C1.72012 8.52566 2.36663 8.53202 3.0089 8.4864C3.21013 8.47219 3.41555 8.43548 3.62169 8.39865C4.06695 8.31908 4.51561 8.23892 4.93287 8.38348C5.00962 8.41001 5.06302 8.45952 5.10228 8.51717C5.18469 8.22857 5.63385 8.29047 5.62925 8.5925C5.62041 9.16227 5.57656 9.72956 5.52174 10.2958C5.48425 10.6587 5.4121 11.3402 5.37213 11.7027C5.31696 12.0065 5.20944 12.6237 5.44357 12.7612C5.63302 12.8723 6.10914 12.8289 6.48479 12.7946C6.64003 12.7804 6.77811 12.7678 6.8717 12.7683C7.0408 12.7691 7.2176 12.7781 7.39685 12.7871C7.76199 12.8056 8.13732 12.8246 8.47843 12.7764C8.50146 12.7732 8.51169 12.776 8.52218 12.7788C8.52748 12.7803 8.53285 12.7817 8.53998 12.7825C8.53782 12.7772 8.53548 12.7725 8.53315 12.7678C8.52552 12.7525 8.51805 12.7376 8.51805 12.7029C8.51781 12.5499 8.50019 12.3937 8.48273 12.2388C8.47406 12.1619 8.46543 12.0853 8.45898 12.0097L8.4232 11.5916C8.35102 10.7492 8.27883 9.90659 8.21601 9.06324C8.18347 8.62292 8.62662 8.49383 8.93609 8.65015C8.98136 8.55572 9.05032 8.47402 9.16739 8.4429C9.64767 8.31563 10.1522 8.32775 10.6515 8.33973C10.7905 8.34307 10.9291 8.34639 11.0666 8.3467Z" fill="white"/></svg></button></div><div class="ing_control-price"><b class="price">${price}</b> грн</div><button class="btn-close"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(.clip0_388_41001)"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.40639 17.7293C7.02713 18.2996 6.56999 18.987 5.96687 19.1048C5.31099 19.2323 4.81165 18.6353 4.40933 18.1542C4.33501 18.0653 4.26399 17.9804 4.19591 17.9047C3.29811 16.9062 2.39638 15.9101 1.48965 14.9198C1.25457 14.6633 1.261 14.3082 1.48965 14.0524C2.01426 13.4653 2.56236 12.8996 3.11036 12.334C3.26471 12.1747 3.41905 12.0153 3.57285 11.8556C3.70302 11.7205 3.83096 11.5827 3.95891 11.4448C4.42798 10.9395 4.8973 10.4339 5.47778 10.0628C4.64821 9.36974 3.82401 8.67057 3.00052 7.96998C2.85313 7.84477 2.677 7.71289 2.49172 7.57417C1.97815 7.18966 1.39431 6.75254 1.15775 6.25869C0.675195 5.25126 1.98104 4.16834 2.8921 3.41282C3.11959 3.22416 3.32247 3.05592 3.46674 2.91436C3.59766 2.78593 3.73299 2.64316 3.8726 2.49588C4.73615 1.58488 5.76323 0.501362 6.91897 1.57284C7.326 1.95041 7.65341 2.46765 7.97039 2.96843C8.11471 3.19643 8.25687 3.42102 8.4034 3.62745C8.96109 4.41236 9.50055 5.20406 10.0068 6.02112C10.1641 5.30703 10.7122 4.79679 11.2475 4.29842C11.3759 4.17893 11.5035 4.06012 11.6248 3.93935C12.3926 3.17587 13.1843 2.45563 14.0289 1.77826C14.1321 1.55998 14.3836 1.39778 14.6269 1.54533C16.0049 2.38097 17.2128 3.42024 18.2935 4.61386C18.5329 4.87823 18.5468 5.27015 18.2939 5.53167C16.9602 6.91106 15.7673 8.38548 14.5823 9.8892C16.2164 11.0424 17.7923 12.2689 19.3003 13.5862C19.57 13.8223 19.5364 14.2739 19.3003 14.5143C17.8244 16.0166 16.3164 17.4817 14.7798 18.9219C14.5355 19.1512 14.171 19.1505 13.9274 18.9219C13.7317 18.7382 13.5357 18.5545 13.3395 18.3708C12.0463 17.1594 10.7476 15.9429 9.51913 14.6679C9.08736 15.4874 8.51358 16.2382 7.95056 16.9749C7.87023 17.08 7.79011 17.1848 7.71066 17.2895C7.61443 17.4165 7.51352 17.5682 7.40639 17.7293ZM4.51995 12.802C3.94012 13.3789 3.35814 13.9545 2.76687 14.52C3.16965 14.9825 3.57358 15.4443 3.97756 15.9061L4.27487 16.246C4.367 16.3513 4.45896 16.4567 4.55092 16.5622C4.7535 16.7945 4.95608 17.0269 5.16053 17.2574C5.23591 17.3426 5.29334 17.4151 5.34061 17.4749C5.52093 17.7028 5.5533 17.7437 5.87005 17.5832C6.11093 17.4603 6.36859 17.0771 6.58923 16.7489C6.69059 16.5982 6.78414 16.459 6.86467 16.3621C7.01907 16.1762 7.17501 15.9916 7.33095 15.807C7.46477 15.6486 7.59857 15.4902 7.73139 15.331C8.2387 14.723 8.72386 14.1535 9.35407 13.6733L9.35801 13.6723C9.5813 13.4011 9.99358 13.2796 10.3312 13.5929C11.6359 14.8052 12.8778 16.0948 14.1152 17.3798L14.36 17.6339C15.5154 16.43 16.6894 15.246 17.8837 14.0802C17.6834 13.8977 17.4793 13.7193 17.2752 13.5409C17.1106 13.397 16.946 13.2531 16.7834 13.1071L16.488 12.8428C15.5064 11.9644 14.3138 10.8972 13.3633 10.0814C13.2197 9.95851 13.2268 9.7956 13.2833 9.64698C13.2729 9.52801 13.2893 9.40582 13.3708 9.28864C14.4276 7.7717 15.6644 6.38409 16.9573 5.06258C16.6597 4.71282 16.3432 4.38271 16.0263 4.05367L16.0191 4.04659C15.6357 3.66816 14.8566 2.8993 14.4511 2.54995C13.7806 3.1798 13.1211 3.82645 12.5184 4.52133C12.3294 4.73896 12.159 4.98354 11.988 5.22899C11.6186 5.75914 11.2463 6.29334 10.6788 6.5688C10.5745 6.61953 10.4705 6.62346 10.3726 6.60488C10.5809 6.97965 10.0647 7.37085 9.76421 7.06111C9.19759 6.47662 8.66885 5.85928 8.15224 5.23192C7.82356 4.8275 7.208 4.06618 6.88217 3.65961C6.63102 3.29699 6.11621 2.56496 5.74072 2.66249C5.43712 2.74161 5.00007 3.26649 4.65526 3.6806C4.51276 3.85173 4.38602 4.00395 4.29095 4.09797C4.11931 4.26796 3.93168 4.43752 3.74145 4.60943C3.35394 4.95962 2.95563 5.31957 2.65969 5.7128C2.63975 5.73938 2.62659 5.74688 2.61309 5.75458C2.60627 5.75847 2.59936 5.76241 2.59145 5.76889C2.59897 5.77206 2.60608 5.77444 2.61315 5.7768C2.63629 5.78452 2.65896 5.79209 2.69399 5.82712C2.84872 5.98138 3.02435 6.12142 3.19849 6.26028C3.2849 6.32918 3.37094 6.39779 3.45388 6.46769L3.91234 6.85387C4.83627 7.63196 5.76031 8.41016 6.67568 9.19861C7.15334 9.61054 6.83609 10.1886 6.36557 10.3433C6.41523 10.4844 6.4281 10.6366 6.34128 10.7863C5.98468 11.4 5.4628 11.8974 4.94632 12.3897C4.80255 12.5267 4.6592 12.6633 4.51995 12.802Z" fill="white"/></g><defs><clipPath id="clip0_388_41001"><rect width="20" height="20" fill="white"/></clipPath></defs></svg></button></div>`;

    $elementWhereCreate.append(control);
  };

  $(document).on("click", "#ing_body .ingredient", function () {
    let $this = $(this),
      ing = $this.attr("data-ing");

    $this.toggleClass("active");

    if ($this.hasClass("active")) {
      _functions.createIngControl($this, $("#ing_output"));
    } else {
      $('.ing_control[data-ing="' + ing + '"]').remove();
    }
    _functions.calculateIngredientsPrice();
  });

  // ingredients in product detail
  function productDetailCalculate() {
    let productPrice = +$(".product-detail__wrap .js-product").data("price");
    let productCount = +$(".product-detail__item-controlls input").val();
    let totalPrice = 0,
      ingsPrice = 0;
    $(".product-detail__ing-output .ing_control").each(function () {
      ingsPrice += $(this).find("input").val() * $(this).data("price");
    });
    totalPrice = (productPrice + ingsPrice) * productCount;
    $(".product-detail__summ span").text(totalPrice);
  }
  $(document).on(
    "click",
    ".product-detail__ingredients .ingredient",
    function () {
      let $this = $(this),
        ing = $this.attr("data-ing");
      $this.toggleClass("active");
      if ($this.hasClass("active")) {
        _functions.createIngControl($this, $(".product-detail__ing-output"));
      } else {
        $(
          '.product-detail__ing-output .ing_control[data-ing="' + ing + '"]'
        ).remove();
      }
      productDetailCalculate();
    }
  );
  $(document).on(
    "click",
    ".product-detail__ing-output .btn-close",
    function () {
      $(this).closest(".ing_control").remove();
      productDetailCalculate();
    }
  );
  $(document).on(
    "click",
    ".product-detail__ing-output .thumb-input-number button",
    function () {
      let ingTotal =
        $(this).siblings("input").val() *
        $(this).closest(".ing_control").data("price");
      $(this).closest(".ing_control").find(".price").text(ingTotal);
      productDetailCalculate();
    }
  );
  $(document).on(
    "click",
    ".product-detail__item-controlls button",
    productDetailCalculate
  );

  //set attribute for street field
  $("#streetAutocomplete").on("focus", function () {
    $(this).attr("autocomplete", "new-password");
  });

  // tabs
  $(".tab-title").on("click", function () {
    $(this).parent().toggleClass("active");
  });
  $(".tab-toggle div").on("click", function () {
    var tab = $(this).closest(".tabs").find(".tab");
    var i = $(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    tab
      .eq(i)
      .siblings(".tab:visible")
      .fadeOut(function () {
        tab.eq(i).fadeIn();
      });
    $(this)
      .closest(".tab-nav")
      .removeClass("active")
      .find(".tab-title")
      .text($(this).text());
  });

  // accordion
  $(document).on(
    "click",
    ".accordion:not(.employment-accord) .accordion-item .accordion-title",
    function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active").next().slideUp();
      } else {
        $(this)
          .closest(".accordion")
          .find(".accordion-title")
          .not(this)
          .removeClass("active")
          .next()
          .slideUp();
        $(this).addClass("active").next().slideDown();
      }
    }
  );

  // visible order inner
  $(document).on(
    "click",
    ".order-iiko-item .order-iiko-item-info",
    function () {
      $(this).toggleClass("open");
      $(this)
        .closest(".order-iiko-item")
        .find(".order-iiko-item-detail")
        .slideToggle();
    }
  );

  //visible more text seo block
  $(document).on("click", ".more-text .read-more", function () {
    $(this).parents(".more-text").toggleClass("open");
    $(this).parent().find(".text").slideToggle(555);
    if ($(".more-text").hasClass("open")) {
      $(".more-text .read-more").text($(this).data("read-less"));
    } else {
      $(".more-text .read-more").text($(this).data("read-more"));
    }
  });


  //cookies-informer
  var dataTime = +$(".cookies-informer").data("time");
  setTimeout(function () {
    $(".site-ready .cookies-informer").addClass("active");
  }, dataTime);
  $(document).on(
    "click",
    ".cookies-informer .close-cookies, .close_cookies_button",
    function () {
      $(this).parents(".cookies-informer").removeClass("active");
      $(this).parents(".cookies-informer").addClass("closed");
    }
  );

  // call-back form
  setTimeout(() => {
    $(".callback-btn").addClass("active");
  }, 4000);
  $(document).on("click", ".callback-btn", function () {
    $(this).removeClass("active");
    $(".callback-form").addClass("active");
  });
  $(document).on("click", ".callback-form-close", function () {
    $(".callback-form").removeClass("active");
    setTimeout(() => {
      $(".callback-btn").addClass("active");
    }, 1000);
  });
  // $(document).on("click", ".callback-form button", function () {
  //   // send callback form
  //   $(".callback-form").removeClass("active");
  //   setTimeout(() => {
  //     $(".callback-btn").addClass("active");
  //   }, 1000);
  // });

  // contact-form submit
  // $(".contact-form").on("submit", function (e) {
  //   e.preventDefault();
  //   // send form
  //   _functions.openPopup('.popup-content[data-rel="6"]');
  // });
  // checkout header scroll
  $(document).on("click", ".checkout__header", function () {
    if (window.innerWidth < 992) {
      $("html, body").animate(
        {
          scrollTop:
            $(".form.delivery-form").eq(1).offset().top -
            $("header").outerHeight() -
            25,
        },
        700
      );
    }
  });
});
