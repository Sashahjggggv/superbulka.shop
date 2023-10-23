jQuery(function($) {
    "use strict";
    var ajaxurl = 'https://www.mega-bulka.com/wp-admin/admin-ajax.php';


    document.addEventListener( 'wpcf7mailsent', function( event ) {
        _functions.closePopup();
        _functions.removeScroll();
        if ('638' == event.detail.contactFormId){
            $('.callback-form').removeClass('active');
            $('.popup-content[data-rel="thank2"], .popup-wrapper').addClass('active');
        } else{
            $('.popup-content[data-rel="thank"], .popup-wrapper').addClass('active');
        }
    }, false );

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return decodeURIComponent(c.substring(name.length, c.length));
            }
        }
        return "";
    }

    function removeCookie(cname){
        setCookie(cname, '', { expires: -1, path: '/'});
    }


    function getGet(){
        var queryDict = {};
        location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});
        return queryDict;
    }

    var getReq = getGet();

    function parseJson(str) {
        var j;
        try {
            j=JSON.parse(str);
        } catch (e) {
            return false;
        }
        return j;
    }

    function showMessage(message){
        $('#text-popup').find('.text').html(message);
        _functions.openPopup('#text-popup');

    }

    $(document).bind("ajaxSend", function(){
        //$('.ajax-loader').fadeIn();
        $('body').addClass('is-ajax-load');
    }).bind("ajaxComplete", function(){
        //$('.ajax-loader').fadeOut();
        $('body').removeClass('is-ajax-load');
    });

    if($('#not-working-popup').length ){
        if(!getCookie('not_working_popup')) {
            _functions.openPopup('#not-working-popup');
            setCookie('not_working_popup', 1);
        }
    }else removeCookie('not_working_popup');


    if($('#disabled-orders').length ){
        if(!getCookie('disabled-orders')) {
            _functions.openPopup('#disabled-orders');
            setCookie('disabled-orders', 1);
        }
    }else removeCookie('disabled-orders');

    //-----ACCOUNT----------

    //registration form
    $('#registration-form').on('submit', function (e) {
        var form = $(this);
        var data = form.serializeArray(), formData={};
        data.push({name:'action', value:'register_user'});
        //data.push({name:'nonce', value:psshop_vars.ajax_nonce});
        data.map(function(x){formData[x.name] = x.value;});
        form.find('[type=submit]').addClass('btn-disabled');
        form.find('.error-message').text('');
        $.post(myshop_vars.ajaxurl, formData)
            .done(function (response) {
                var res = parseJson(response);
                if (res.success) {
                    if (res.redirect) setTimeout(function(){location.href = res.redirect;},100);
                } else {
                    form.find('.error-message').text(response);
                }
                setTimeout(function(){form.find('[type=submit]').removeClass('btn-disabled');},1500);
            })
            .fail(function (jqXHR, textStatus, error) {
                showMessage(textStatus);
            });
        return false;
    });

    //login form
    $('#login-form').on('submit', function (e) {
        var form = $(this);
        var data = form.serializeArray(), formData={};
        data.push({name:'action', value:'login_user'});
        //data.push({name:'nonce', value:psshop_vars.ajax_nonce});
        data.map(function(x){formData[x.name] = x.value;});
        form.find('[type=submit]').addClass('btn-disabled');
        form.find('.error-message').text('');
        $.post(myshop_vars.ajaxurl, formData)
            .done(function (response) {
                var res = parseJson(response);
                if (res.success) {
                    if (res.redirect) setTimeout(function(){location.href = res.redirect;},100);
                } else {
                    form.find('.error-message').text(response);
                }
                setTimeout(function(){form.find('[type=submit]').removeClass('btn-disabled');},1500);
            })
            .fail(function (jqXHR, textStatus, error) {
                showMessage(textStatus);
            });
        return false;
    });

    //reset password form
    $('#forgot-password-form').on('submit', function (e) {
        var form = $(this);
        var data = form.serializeArray(), formData={};
        data.push({name:'action', value:'lost_password'});
        //data.push({name:'nonce', value:psshop_vars.ajax_nonce});
        data.map(function(x){formData[x.name] = x.value;});
        form.find('[type=submit]').addClass('btn-disabled');
        form.find('.error-message').text('');
        $.post(myshop_vars.ajaxurl, formData)
            .done(function (response) {
                var res = parseJson(response);
                if (res.success) {
                    showMessage(res.message);
                } else {
                    form.find('.error-message').text(response);
                }
                setTimeout(function(){form.find('[type=submit]').removeClass('btn-disabled');},1500);
            })
            .fail(function (jqXHR, textStatus, error) {
                showMessage(textStatus);
            });
        return false;
    });

    $('#restore-password-form').on('submit', function (e) {
        var form = $(this);
        var data = form.serializeArray(), formData={};
        data.push({name:'action', value:'change_password'});
        //data.push({name:'nonce', value:psshop_vars.ajax_nonce});
        data.map(function(x){formData[x.name] = x.value;});
        form.find('[type=submit]').addClass('btn-disabled');
        form.find('.error-message').text('');
        $.post(myshop_vars.ajaxurl, formData)
            .done(function (response) {
                var res = parseJson(response);
                if (res.success) {
                    showMessage(res.message);
                } else {
                    form.find('.error-message').text(response);
                }
                setTimeout(function(){form.find('[type=submit]').removeClass('btn-disabled');},1500);
            })
            .fail(function (jqXHR, textStatus, error) {
                showMessage(textStatus);
            });
        return false;
    });


    if(getReq && getReq.act && getReq.act=='rp'){
        _functions.openPopup('#restore-password-popup');
        $('#restore-password-popup').find('[name=key]').val(getReq.key);
        $('#restore-password-popup').find('[name=login]').val(decodeURIComponent(getReq.login));
    }



    $(document).on('click','.js-edit-address', function() {
        $('#edit-address-form').attr('data-i',$(this).closest('.js-address-item').attr('data-i'));
    });

    $('.js-clear-address-fields').on('click', function() {
        $('#edit-address-form').attr('data-i','');
    });

    $('#edit-address-form').on('submit',function() {
        let form = $(this),
        count = $('.cabinet_address tbody tr').length,
        i = form.attr('data-i'),
        text = form.attr('data-btn-text'),
        name = form.find('input[name="type_address"]').val(),
        street =form.find('input[name="street"]').val(),
        house = form.find('input[name="number-building"]').val(),
        flat = form.find('input[name="number-apartment"]').val();
        if(i){
            let item = $('.js-address-item[data-i='+i+']');
            item.find('.js-address-name').text(name);
            item.find('.js-street').text(street);
            item.find('.js-house').text(house);
            item.find('.js-apartment').text(flat);
        }else {
            $('.cabinet_address tbody').append(
                '<tr class="js-address-item" data-i="' + count + '">' +
                '    <td>' +
                '        <label class="checkbox-entry">' +
                '            <input type="radio" name="cabinet-address">' +
                '            <span class="js-address-name">' + name + '</span>' +
                '        </label>' +
                '    </td>' +
                '    <td>' +
                '        <div class="cabinet_address-detail">' +
                '            <span class="js-street">' + street + '</span>,' +
                '            <span class="js-house">' + house + '</span> кв.' +
                '            <span class="js-apartment">' + flat + '</span>' +
                '        </div>' +
                '    </td>' +
                '    <td>' +
                '        <button class="link-icon js-edit-address open-popup" data-rel="address" type="button">' + text + '</button>' +
                '    </td>' +
                '    <td>' +
                '        <div class="btn-close"></div>' +
                '    </td>' +
                '</tr>'
            );
        }
    form.closest('.popup-content.active').find('.btn-close.close-popup').click();
    return false;
    });

    $('#user-edit-form').on('submit',function() {
        //    count = $('.cabinet_address tbody tr').length,
        var form = $(this);
        var data = form.serializeArray(),
            addresses = '',
            formData={};

        $('.cabinet_address tbody tr').each(function () {
            let item = $(this);
            addresses += item.find('[type="radio"]').prop('checked')+'|';
            addresses += item.find('.js-address-name').text()+'|';
            addresses += item.find('.js-street').text()+'|';
            addresses += item.find('.js-house').text()+'|';
            addresses += item.find('.js-apartment').text();
            addresses += '$'
        })
        addresses = addresses.slice(0,-1);
        data.push({name:'action', value:'update_user'});
        data.push({name:'addresses', value:addresses});
        //data.push({name:'nonce', value:psshop_vars.ajax_nonce});
        data.map(function(x){formData[x.name] = x.value;});
        form.find('.btn').addClass('btn-disabled');
        $.post(myshop_vars.ajaxurl, formData)
            .done(function (response) {
                var res = parseJson(response);
                if (res.success) {
                    showMessage(res.message);
                } else {
                    showMessage(response);
                }
                form.find('.btn').removeClass('btn-disabled');
            })
            .fail(function (jqXHR, textStatus, error) {
                showMessage(textStatus, true);
            });
        return false;

       });

    $('#user-edit-password').on('submit',function() {
        var form = $(this);
        var data = form.serializeArray(),
            formData={};

        data.push({name:'action', value:'update_user_password'});
        //data.push({name:'nonce', value:psshop_vars.ajax_nonce});
        data.map(function(x){formData[x.name] = x.value;});
        form.find('.btn').addClass('btn-disabled');
        $.post(myshop_vars.ajaxurl, formData)
            .done(function (response) {
                var res = parseJson(response);
                if (res.success) {
                    form.find('input').val('');
                    showMessage(res.message);
                } else {
                    showMessage(response);
                }
                form.find('.btn').removeClass('btn-disabled');
            })
            .fail(function (jqXHR, textStatus, error) {
                showMessage(textStatus, true);
            });
        return false;

    });

    $('.repeat-order').on('click', function() {
        var btn = $(this),
            id = btn.data('id');
        $.post(myshop_vars.ajaxurl, {
            action:'duplicate_order',
            id:id,
            //nonce:psshop_vars.ajax_nonce

        })
            .done(function (response) {
                var res = parseJson(response);
                if (res.success ) {
                    $('header .order').removeClass('empty').addClass('open-cart').find('.order-item span').text(res.count);
                    $('header .order .price span').text(res.total);
                    if(res.message) {
                        showMessage(res.message);
                    }
                    else
                    if(res.redirect) location.href = res.redirect;
                } else {
                    showMessage(response);
                }
            })
            .fail(function (jqXHR, textStatus, error) {
                showMessage(textStatus, true);
            });
        return false;
    });


    //------SHOP------------

    $('.category_ajax').on('click', function() {
        var btn = $(this),
            id = btn.data('id');

        $('.categories-list').addClass('is-active');

        $.post(myshop_vars.ajaxurl, {
            action:'shop_category',
            id:id,
            //nonce:psshop_vars.ajax_nonce
        })
            .done(function (response) {
                var res = parseJson(response);
                if (res.success) {
                    console.log(res);
                    $('#shop-ajax-wrapper').html(res.out);
                    btn.closest('li').addClass('active').siblings('li').removeClass('active');
                    _functions.imagesLazyLoad();
                    $('.categories-list').removeClass('is-active');
                    $('.products__grid').removeClass('type1');
                    $('.products__grid').removeClass('type2');
                    $('.products__grid').addClass(res.type_html);
                    if(res.count_product){
                        $('.product_wrapper_home').css('display', 'block');
                        $('.all_product_cat_button').css('display', 'flex');
                    } else{
                        $('.product_wrapper_home').css('display', 'none');
                        $('.all_product_cat_button').css('display', 'none');
                    }
                    $('.all_product_cat_button').attr('href', res.term_link);
                    $('.all_product_cat_button span').text(res.term_name);
                    $('.category-title').text(res.term_title);
                    $('.categories-menu').removeClass('active');
                }
            })
            .fail(function (jqXHR, textStatus, error) {
                showMessage(textStatus, true);
            });
        return false;
    });

    //fav-btn
    $(document).on('click','.fav-btn' ,function() {
        var btn = $(this),
            id = btn.attr('data-id'),
            liked = getCookie('rsshop_liked_products');

        if(liked)
            liked = parseJson(liked);
        else
            liked = [];

        if(!liked) liked = [];

        var position = liked.indexOf(id);
        if(position>-1){
            liked.splice(position, 1);
            btn.removeClass('active');
        }else{
            liked.push(id);
            btn.addClass('active');
        }
        if ( ! liked || ! liked.length ) {
            removeCookie('rsshop_liked_products');
            $('.favourites a').text( 0 );
        } else {
            setCookie('rsshop_liked_products', JSON.stringify( liked ), 365 );
            $('.favourites a').text( liked.length );
        }
        if(btn.hasClass('btn-close')) btn.closest('.product').parent().remove();
    });



    $(document).on('click','.add-to-cart-btn, .fast-order', function() {
        const $this = $(this);
        if (!$this.hasClass("loading")) {
            $this.addClass("loading");

            $(".js-product").not($(this).closest(".js-product")).each(function () {
                  $(this).find(".order-btn").addClass("disabled");
            });

            let loader = '<span class="btn-loader"><span class="btn-loader-inner"><span></span><span></span><span></span></span></span>',
            success = '<span class="btn-loader-complete"></span>';

            $this.append(loader).find(".btn-loader").fadeIn(500);

            var btn = $(this),
                id = btn.data('id'),
                wrap = btn.closest('.js-product'),
                qty = parseInt(wrap.find('.product-qty').val()),
                max = parseInt(wrap.find('.product-qty').attr('max')),
                variation_id = '';

            var modifiers = '';
            var double_mificator = '';
            if ($(this).closest('.js-product').find('.js-additions-checkbox').is(':checked')) {
                double_mificator = $('.checkbox-entry.checkbox span').text();
                var modifiers_id = $('.js-additions-checkbox').attr('data-modifier-id');
                modifiers = modifiers_id+'|'+1;
            }

            console.log(modifiers);

            if(wrap.find('.product_variations li.active').length) variation_id = wrap.find('.product_variations li.active').data('id')
            $.post(myshop_vars.ajaxurl, {
                action:'update_cart_product',
                id:id,
                variation_id: variation_id,
                qty:qty,
                modifiers:modifiers,
                key:'',
                fast_order: btn.hasClass('fast-order') ? true : '',
                //nonce:psshop_vars.ajax_nonce

            })
                .done(function (response) {
                    var res = parseJson(response);
                    if (res.success) {
                        if(res.cart_items){
                            $('.cart_items').html(res.cart_items);
                        }
                        $('#cart-submit').css('display', 'block');

                        $this.append(success).fadeIn(500, function () {
                          $this.find(".btn-loader").remove();
                          setTimeout(function () {
                            $this.find(".btn-loader-complete").fadeOut(500, function () {
                              $(this).remove();
                              $this.removeClass("loading");
                              $(".js-product").each(function () {
                                $(this).find(".order-btn").removeClass("disabled");
                              });
                            });
                          }, 1000);
                        });

                        $('.cart-top .cart-items-number').text(res.count);
                        $('.open-top-cart .cart-items-number').text(res.count);
                        $('.cart-top .card-total-price').text(res.total);
                        wrap.find('.product-qty').val(1);

                        // informer
                        let nameProduct = $(this).parents(".product").find(".product_title a").html();
                        setTimeout(function () {
                            $(".cart-informer").addClass("active");
                            $(".cart-informer").find(".text span").html(nameProduct);
                        }, 300);
                        setTimeout(function () {
                            $(".cart-informer").removeClass("active");
                        }, 2000);

                    } else {
                        showMessage(response);
                    }
                })
                .fail(function (jqXHR, textStatus, error) {
                    showMessage(textStatus, true);
                });
            return false;
        }
    });


    $(document).on('click','.add-to-cart-btn-ing, .fast-order-ing', function() {
        const $this = $(this);
        if (!$this.hasClass("loading")) {
            $this.addClass("loading");

            $(".js-product").not($(this).closest(".js-product")).each(function () {
                  $(this).find(".order-btn").addClass("disabled");
            });

            let loader = '<span class="btn-loader"><span class="btn-loader-inner"><span></span><span></span><span></span></span></span>',
            success = '<span class="btn-loader-complete"></span>';

            $this.append(loader).find(".btn-loader").fadeIn(500);


            var btn = $(this),
                id = btn.data('id'),
                variation_id = btn.data('variation-id'),
                wrap = btn.closest('.ing_footer'),
                qty = parseInt($(this).closest('.product-item-controll-custom').find('.product-qty').val()),
                modifiers = '';
            $('#ing_output .ing_control').each(function(){
                modifiers += ($(this).attr('data-id')+'|'+$(this).find('.product-qty').val()+',');
            });



            // modifiers = modifiers.slice(0,-1);


            var double_mificator = '';
            if ($(this).closest('.js-product').find('.js-additions-checkbox').is(':checked')) {
                double_mificator = $('.checkbox-entry.checkbox span').text();
                var modifiers_id = $('.js-additions-checkbox').attr('data-modifier-id');
                modifiers += modifiers_id+'|'+1;
            }


            console.log(id);
            console.log(qty);
            console.log(modifiers);
           
            $.post(myshop_vars.ajaxurl, {
                action:'update_cart_product',
                id:id,
                variation_id: variation_id,
                modifiers: modifiers,
                qty:qty,
                key:'',
                fast_order: btn.hasClass('fast-order-ing') ? true : '',
                //nonce:psshop_vars.ajax_nonce
            })
                .done(function (response) {
                    var res = parseJson(response);
                    console.log(res);
                    if (res.success) {

                        if(res.cart_items){
                            $('.cart_items').html(res.cart_items);
                        }
                        $('#cart-submit').css('display', 'block');

                        $this.append(success).fadeIn(500, function () {
                            $this.find(".btn-loader").remove();
                            setTimeout(function () {
                                $this.find(".btn-loader-complete").fadeOut(500, function () {
                                    $(this).remove();
                                    $this.removeClass("loading");
                                    $(".js-product").each(function () {
                                        $(this).find(".order-btn").removeClass("disabled");
                                    });
                                });
                            }, 1000);
                        });


                        $('.cart-top .cart-items-number').text(res.count);
                        $('.open-top-cart .cart-items-number').text(res.count);
                        $('.cart-top .card-total-price').text(res.total);
                        wrap.find('.product-qty').val(1);


                        // informer
                        let nameProduct = $(this).parents(".product").find(".product_title a").html();
                        setTimeout(function () {
                            $(".cart-informer").addClass("active");
                            $(".cart-informer").find(".text span").html(nameProduct);
                        }, 300);
                        setTimeout(function () {
                            $(".cart-informer").removeClass("active");
                        }, 2000);


                        if(res.redirect) location.href = res.redirect;
                    } else {
                        showMessage(response);
                    }
                })
                .fail(function (jqXHR, textStatus, error) {
                    showMessage(textStatus, true);
                });
        }
        return false;
    });


    $(document).on('click','.open-cart', function() {
        if($('body').hasClass('shop-not-working')){
            return false;
        }
        var btn = $(this);
        btn.addClass('btn-disabled');
        $('#cart-popup-out').html('');
        $.post(myshop_vars.ajaxurl, {
            action:'get_cart',
            //nonce:psshop_vars.ajax_nonce
        })
            .done(function (response) {
                var res = parseJson(response);
                if (res.success) {
                    $('#cart-popup-out').html(res.out);
                    $('.cart').addClass('active');
                    _functions.removeScroll();
                } else {
                    showMessage(response);
                }
                btn.removeClass('btn-disabled');
            })
            .fail(function (jqXHR, textStatus, error) {
                showMessage(textStatus, true);
            });
    });

    $(document).on('click','.cart-product .decrement, .cart-product .increment', function() {
        var delivery_method = $('input[name="delivery_method"]:checked').val(); 
        var btn = $(this),
            key = btn.data('key'),
            wrap = btn.closest('.js-product'),
            qtyInput = wrap.find('.product-qty'),
            qty = parseInt(qtyInput.val()),
            is_inc = btn.hasClass('increment');

        btn.closest('.cart-product-wrapper').addClass('is-loader');
        if(qty===1 && !is_inc ){
            btn.closest('.cart-product-wrapper').removeClass('is-loader');
            return; 
        } 
        if(qty>=parseInt(qtyInput.attr('max')) && is_inc ) return;
        qty = is_inc ?  qty+1 : qty-1;

        console.log(key);
        $.post(myshop_vars.ajaxurl, {
            action:'update_cart_product',
            qty:qty,
            key:key,
            delivery_method:delivery_method,
            //nonce:psshop_vars.ajax_nonce
        })
            .done(function (response) {
                var res = parseJson(response);
                console.log(res);
                if (res.success) {
                    $('.cart-top .cart-items-number').text(res.count);
                    $('.open-top-cart .cart-items-number').text(res.count);
                    $('.cart-top .card-total-price').text(res.total);
                    $('.prod_horiz[data-key='+key+']').find('.price_default span').text(res.line_total);
                    $('.prod_horiz[data-key='+key+']').find('.product-qty').val(qty);
                    $('.card-total-price, .all-product-price-el').text(res.total).attr('data-total',res.total);
                    $('.all-product-price-subtotal').text(res.subtotal).attr('data-total',res.subtotal);
                    if(res.discount){
                        $('.price-discount').slideDown();
                        $('#all-products-discount').text(res.discount);
                    } else{
                        $('.price-discount').slideUp();
                        $('#all-products-discount').text(0);
                    }
                    calculateTotalCheckout();

                } else {
                    showMessage(response);
                }
                btn.closest('.cart-product-wrapper').removeClass('is-loader');
            })
            .fail(function (jqXHR, textStatus, error) {
                btn.closest('.cart-product-wrapper').removeClass('is-loader');
                showMessage(textStatus);
            });
    });



    $(document).on('click','.remove-product', function() {
        var btn = $(this),
            key = btn.closest('.cart-product').data('key'),
            wrap = btn.closest('.js-product');

        if(!key) return false;

        btn.closest('.cart-product-wrapper').addClass('is-loader');

        $.post(myshop_vars.ajaxurl, {
            action:'remove_cart_product',
            key:key,
            //nonce:psshop_vars.ajax_nonce
        })
            .done(function (response) {
                var res = parseJson(response);
                console.log(res);
                if (res.success) {
                    $('.cart-top .cart-items-number').text(res.count);
                    $('.open-top-cart .cart-items-number').text(res.count);
                    $('.cart-top .card-total-price').text(res.total);
                    $('.prod_horiz[data-key='+key+']').closest('.cart-product-wrapper').remove();
                    $('.card-total-price,.all-product-price-el').text(res.total).attr('data-total',res.total);
                    $('.all-product-price-subtotal').text(res.subtotal).attr('data-total',res.subtotal);
                    if(res.discount){
                        $('.price-discount').slideDown();
                        $('#all-products-discount').text(res.discount);
                    } else{
                        $('.price-discount').slideUp();
                        $('#all-products-discount').text(0);
                    }


                    calculateTotalCheckout();

                    if(res.count == 0){
                        location.reload();
                    }
                    // var popupOut = $('#cart-popup-out, .checkout-products');
                    // if(popupOut.hasClass('checkout-products') && popupOut.find('.prod_horiz').length===1) location.reload();
                    // if(popupOut.length && !popupOut.find('.prod_horiz').length){
                    //     $('header .order').addClass('empty').removeClass('open-cart');
                    //     $('.cart_bottom').remove();
                    //     $('.cart-empty-message').show();
                    // }
                } else {
                    showMessage(response);
                }
            })
            .fail(function (jqXHR, textStatus, error) {
                showMessage(textStatus);
            });
    });



    // custom_dropdown
    $(document).on('click', '.custom_dropdown-title', function (e) {
        $(this).toggleClass('active');
        $(this).closest('.custom_dropdown').find('.custom_dropdown-toggle').slideToggle(300);
    });

    
    // $(document).on('click','.thumb-input-number .decrement:not(.in-cart), .thumb-input-number .increment:not(.in-cart)', function() {
    //     var btn = $(this),
    //         wrap = btn.closest('.js-product,.ing_control,.ing_footer-controls, .js-checkout-product'),
    //         qtyInput = wrap.find('.product-qty'),
    //         qty = parseInt(qtyInput.val()),
    //         max = parseInt(qtyInput.attr('max')),
    //         min = parseInt(qtyInput.attr('data-min')),
    //         is_inc = btn.hasClass('increment');
    //     if(min!==0 && !min) min = 1;
    //     if (qty === min && !is_inc) return;
    //     if (max && qty >= max && is_inc) return;
    //     qty = is_inc ? qty + 1 : qty - 1;
    //     qtyInput.val(qty);

    //     if(btn.closest('.js-checkout-product').length){
    //         return false;
    //     }

    //     if(!wrap.hasClass('ing_footer-controls'))
    //     _functions.calculateSinglePrice(wrap);

    //     if(wrap.hasClass('ing_control') || wrap.hasClass('ing_footer-controls'))
    //         _functions.calculateIngredientsPrice();

    //     calculateTotalCheckout();
    // });

    $(document).on('click','.product_plus', function() {
        var btn = $(this),
            id = btn.data('id'),
            wrap = btn.closest('.js-product'),
            qty = parseInt(wrap.find('.product-qty').val()),
            variation_id = '';
        if(wrap.find('.product_variations li.active').length) variation_id = wrap.find('.product_variations li.active').data('id')
        btn.addClass('btn-disabled');
        $.post(myshop_vars.ajaxurl, {
            action:'get_modifiers',
            id:id,
            variation_id: variation_id,
            //nonce:psshop_vars.ajax_nonce

        })
            .done(function (response) {
                var res = parseJson(response);
                if (res.success) {
                    $('.ing-out').html(res.out);
                    $('.ing-popup').find('.product-qty').val(qty);
                    _functions.calculateIngredientsPrice();
                    _functions.openPopup('.ing-popup');
                } else {
                    showMessage(response);
                }
                btn.removeClass('btn-disabled');
            })
            .fail(function (jqXHR, textStatus, error) {
                showMessage(textStatus, true);
            });
        return false;
    });

    $('#apply-coupon').on('click', function() {
        var btn = $(this),
            code = btn.siblings('input').val(),
            deliveryPriceInput = $('#all-products-delivery:visible'),
            deliveryPrice = 0;
        if(!code) return false;
        if(deliveryPriceInput.length){
            deliveryPrice = parseFloat(deliveryPriceInput.text());
        }
        $.post(myshop_vars.ajaxurl, {
            action:'apply_coupon',
            code: code,
            //nonce:psshop_vars.ajax_nonce
        })
            .done(function (response) {
                var res = parseJson(response);
                if (res.success) {
                    $('header .order .price span').text(res.total);
                    $('.cart-total span').text(+res.total+deliveryPrice).data('total',+res.total+deliveryPrice);
                    $('#all-products-discount').text(res.discount).attr('data-discount',res.discount);
                    $('.card-total-price,.all-product-price-el').text(res.total).attr('data-total',res.total);
                    $('.price-discount').slideDown(100);
                    calculateTotalCheckout();
                    btn.siblings('input').val('');
                } else {
                    showMessage(response);
                }
            })
            .fail(function (jqXHR, textStatus, error) {
                showMessage(textStatus, true);
            });
        return false;
    });

    $('#checkout-form').on('submit' ,function (e) {
        console.log('form');
        var form = $(this);

        var is_false = false;

        $('.main-order-button').addClass('is-loader');

        var first_name = $('input[name="first_name"]').val();
        if(first_name == ''){
            is_false = true;
            $('input[name="first_name"]').addClass('invalid');
        } else{
            $('input[name="first_name"]').removeClass('invalid');
        }

        var first_name = $('input[name="last_name"]').val();
        if(first_name == ''){
            is_false = true;
            $('input[name="last_name"]').addClass('invalid');
        } else{
            $('input[name="last_name"]').removeClass('invalid');
        }

        if(Inputmask.isValid($('input[name="phone"]').val(), { alias: "+38 (999) 999 99 99"}) == false) {
            is_false = true;
            $('input[name="phone"]').addClass('invalid');
        } else{
            $('input[name="phone"]').removeClass('invalid');
        }


        var as_hour = '';
        if ($('input[name="delivery-time"][value=as_hour]').is(':checked')) { 
            as_hour = $("select[name='at_time_time'] option:selected").val();
            console.log(as_hour);
            if(as_hour == ''){
                $("select[name='at_time_time']").parent().addClass('invalid');
            } else{
                $("select[name='at_time_time']").removeClass('invalid');
            }
        }

        var self_delivery_address = '';
        if ($('input[name=delivery_method][value=local_pickup]').is(':checked')) { 
        } else{
            var order_street = $('input[name="street"]').val();
            if(order_street == ''){
                is_false = true;
                $('input[name="street"]').addClass('invalid');
            } else{
                $('input[name="street"]').removeClass('invalid');
            }

            var order_house = $('input[name="house"]').val();
            if(order_house == ''){
                is_false = true;
                $('input[name="house"]').addClass('invalid');
            } else{
                $('input[name="house"]').removeClass('invalid');
            }
        }


        if($(window).width() < 767) {
            if($('.input').hasClass('invalid') || $('.SumoSelect').hasClass('invalid')){
                $('html, body').animate({
                    scrollTop: ($('.invalid').first().offset().top)
                },500); 
            }
        } else{
            if($('.input').hasClass('invalid') || $('.SumoSelect').hasClass('invalid')){
                $('html, body').animate({
                    scrollTop: ($('.invalid').first().offset().top - 120)
                },500); 
            }
        }


        if(is_false){
            $('.main-order-button').removeClass('is-loader');
            return false;
        }

        var data = form.serializeArray(), formData={};
        data.push({name:'action', value:'create_order'});
        data.push({name:'delivery_price', value: $('#all-products-delivery').text()});
        data.push({name:'things_count', value:$('#things-count').length ? $('#things-count').val() : ''});
        data.push({name:'zone', value:$('[data-current-zone-type]').length ? $('[data-current-zone-type]').attr('data-current-zone-type') : ''});
        //data.push({name:'nonce', value:psshop_vars.ajax_nonce});
        data.map(function(x){formData[x.name] = x.value;});
        $.post(myshop_vars.ajaxurl, formData)
            .done(function (response) {
                var res = parseJson( response );
                if ( res.success ) {
                    if ( res.payment_url ) {
                        location.href = res.payment_url;
                    } else {
                        if ( res.key ) {
                            location.href = location.href + '?key=' + res.key;
                        }
                    }
                } else {
                    if ( res.input ) {
                        $(res.input).addClass('invalid');
                        showMessage( res.message );
                    } else {
                        showMessage( response );
                    }
                }

                $('.main-order-button').removeClass('is-loader');
            })
            .fail(function (jqXHR, textStatus, error) {
                showMessage(textStatus);
                $('.main-order-button').removeClass('is-loader');
            });
            
        return false;
    });

    $('input[name=delivery_method]').on('change',function () {
        var delivery = $('input[name="delivery_method"]:checked').val(); 
        console.log(delivery);
        $.post(myshop_vars.ajaxurl, {
            action:'delivery_method_change',
            'delivery_method': delivery
            //nonce:psshop_vars.ajax_nonce
        })
            .done(function (response) {
                var res = parseJson(response);
                console.log(res);
                if (res.success) {
                    if(delivery == 'local_pickup'){
                        $('.lowOrderDelivery').css('display', 'none');
                        $('.price-delivery').css('display', 'none');
                        $('.all-products-delivery').text('0');
                    }

                    if(res.discount){
                        $('.price-discount').slideDown();
                        $('#all-products-discount').text(res.discount);
                        $('#all-products-discount').attr('data-discount', res.discount);
                    } else{
                        $('.price-discount').slideUp();
                        $('#all-products-discount').text(0);
                        $('#all-products-discount').attr('data-discount', 0);
                    }
                    calculateTotalCheckout();

                } else {
                    showMessage(response);
                }
            })
            .fail(function (jqXHR, textStatus, error) {
                showMessage(textStatus);
            });
    })

    $('#checkout-form input, #checkout-form textarea').on('keypress', function(e) {
        let code = e.keyCode || e.which;
        if( code === 13 ) {
            e.preventDefault();
        }
    });


    function  calculateTotalCheckout(delay){
        console.log('calculateTotalCheckout');
        let form = $('#checkout-form');
        if (!form.length) return;
        if ($('input[name=delivery_method][value=courier]').is(':checked')) {
            _functions.startSteps();
        }
            setTimeout(function () {
                let thingsPrice = 0;
                let thingsCount = 0;
                if($('.js-checkout-product.things').length){ 
                        thingsPrice = parseFloat($('.things').attr('data-price'));
                        thingsCount = parseInt($('#things-count').val());
                }
                // var delivery_method = $('input[name="delivery_method"]:checked').val(); 
                // if(delivery_method == 'courier'){
                //     var delivery = parseFloat($('#all-products-delivery:visible').text());
                // } else{
                //     var delivery = 0;
                // }
                let totalSpan = $('.all-product-price-el'),
                    total = parseFloat($('.all-product-price-subtotal').text()),    
                    delivery = parseFloat($('#all-products-delivery:visible').text()),
                    deliveryDiscountPercent = parseFloat($('input[name=delivery_method]:checked').attr('data-discount-percent')),
                    discount = parseFloat($('#all-products-discount').text()),
                    newTotal = total + (delivery ? delivery : 0) - (discount ? discount:0);

                    console.log(total);
                    console.log(delivery);
                    console.log(discount);
                    console.log(newTotal);

                    form.find('[required]:not(:visible)').each(function () {
                        $(this).prop('disabled',true);
                    })
                    form.find('[required]:visible').each(function () {
                        $(this).prop('disabled',false);
                    })

                    totalSpan.text(newTotal);
                    // if(deliveryDiscountPercent){
                    //     $('#all-products-discount').text(discount + deliveryDiscountPercent/100*total);
                    //     $('.price-discount').slideDown(100);
                    // }else{
                    //     if(discount){
                    //         $('#all-products-discount').text(discount);
                    //         $('.price-discount').slideDown(100);
                    //     }else{
                    //         $('.price-discount').slideUp(100);
                    //     }
                    // }

                $('input[name=delivery_method]').each(function () {
                    let minAmount = $(this).attr('data-min-amount');
                    if(minAmount && parseFloat(minAmount)>newTotal)
                        $(this).prop('disabled', true);
                    else
                        $(this).prop('disabled', false);
                });

                $('.ajax-loader').fadeOut(100);

            }, delay ? delay : 350)
    }
    calculateTotalCheckout(3000);

    $(document).on( 'click', '.close-maintenance', function(e) {
        e.preventDefault();
        setCookie( 'enabled_maintenance', 1, 0.5 );
        _functions.closePopup();
    } );



    $(document).on('click','.product_plus_modificator', function() {
        var btn = $(this),
            id = btn.data('productid'),
            wrap = btn.closest('.js-product'),
            qty = parseInt(wrap.find('.product-qty').val()),
            variation_id = '';
        if(wrap.find('.product_variations li.active').length) variation_id = wrap.find('.product_variations li.active').data('id')
        btn.addClass('btn-disabled');

        console.log(id);
        console.log(variation_id);
        $.post(ajaxurl, {
            action:'get_modifiers',
            id:id,
            variation_id: variation_id,
            //nonce:psshop_vars.ajax_nonce

        })
            .done(function (response) {
                var res = parseJson(response);
                if (res.success) {
                    $('.ing-out').html(res.out);
                    $('.ing-popup').find('.product-qty').val(qty);
                    _functions.calculateIngredientsPrice();
                    _functions.openPopup('.ing-popup');
                } else {
                    showMessage(response);
                }
                btn.removeClass('btn-disabled');
            })
            .fail(function (jqXHR, textStatus, error) {
                showMessage(textStatus, true);
            });
        return false;
    });

} );