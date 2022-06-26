var a = 'active';

// no skroll

var block = $('<div>').css({ height: '50px', width: '50px' }),
    indicator = $('<div>').css({ height: '200px' });

$('body').append(block.append(indicator));
var w1 = $('div', block).innerWidth();
block.css('overflow-y', 'scroll');
var w2 = $('div', block).innerWidth();
$(block).remove();

var scrollbar = w1 - w2;

$(':root').css('--scroll', scrollbar + 'px');

// Images scroll

var index_active = 0;

function imagesAnimation(e, position) {
    var e = $(e),
        wrapper = e.parents('.images__scroll-wrapper'),
        top = wrapper.offset().top,
        childrens = e.children(),
        new_position = position == 1 ? 0 : 1,
        wrapper_height = wrapper.height() - $(window).height() * new_position,
        step_height = wrapper_height / childrens.length,
        scroll = $(window).scrollTop() + $(window).height() * position;

    //console.log(e);

    if (scroll >= top) {
        if (wrapper.hasClass('main')) {
            var index = scroll / step_height;
        } else {
            var index = (scroll - top) / step_height;
        }

        var index = index.toFixed(0) - 1;

        if (index >= 0 && index_active != index) {
            index = index >= childrens.length ? childrens.length - 1 : index;

            if ((!wrapper.hasClass('main') || index >= 60) && !$(childrens).eq(index).hasClass(a)) {
                childrens.removeClass(a);
                $(childrens).eq(index).addClass(a);
            }

            index_active = index;

            if (index_active >= 100) {
                wrapper.addClass('hide');
            } else {
                wrapper.removeClass('hide');
            }
        }
    }
}

var images = $('.images__scroll').each(function () {
    var e = $(this);
});

$(window).scroll(function () {
    for (var i = images.length - 1; i >= 0; i--) {
        var e = $(images[i]),
            position = e.attr('data-position');

        if (!position) {
            position = 1;
        }

        if (
            $(window).scrollTop() + $(window).height() * position >= e.offset().top &&
            $(window).scrollTop() + $('header').height() <= e.offset().top + e.height()
        ) {
            imagesAnimation(e, position);
        }
    }
});

// Media

$(document).ready(media);
$(window).resize(media);

function media() {
    var w = $(window).width();

    if (w <= 1030 - scrollbar) {
        $('#nav-desktop > *').detach().prependTo('#nav-table');
    } else {
        $('#nav-table > *').detach().prependTo('#nav-desktop');
    }

    if (w <= 900 - scrollbar) {
        $('#crocs-desktop > *').detach().prependTo('#crocs-mobile');
    } else {
        $('#crocs-mobile > *').detach().prependTo('#crocs-desktop');
    }

    $(':root').css('--header', $('header').height() + 'px');
}
