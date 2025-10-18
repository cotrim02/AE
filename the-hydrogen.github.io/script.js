$(document).ready(function () {





const stickerGrid = $('<div class="sticker-grid"></div>');
$('body').prepend(stickerGrid);

for (let i = 1; i <= 112; i++) {
  const src = `img/sticker/${i}.webp`;
  const img = $('<img>', { src, alt: `Sticker ${i}`, class: 'gif-estatica' });
  stickerGrid.append(img);
}


    // Detectar basePath automaticamente para arquivos incluídos dinamicamente, ex: nav e footer
    function getBasePath() {
        var path = window.location.pathname;
        var parts = path.split('/').filter(function(part) { return part.length > 0; });
        if(parts.length > 1) {
            return "../"; // se estiver em subpasta, sobe um nível
        } else {
            return ""; // raiz da pasta
        }
    }

    var basePath = getBasePath();

    // Carregar nav e footer dinamicamente, usando basePath
    $("nav").load(basePath + "files/nav.html");
    $("footer").load(basePath + "files/footer.html");

    // Adicionar ícone de play antes de cada audio (exceto '#musica')
    $("audio").not("#musica").before('<i class="far fa-play-circle"></i>');
    $(".gif").append('<i class="fas fa-play"></i>');

    // Controlar troca de ícones no fim do áudio
    $("audio").on('ended', function () {
        $(this).siblings("i").toggleClass("fa-pause-circle fa-play-circle");
    });

    // Controlar ação do botão 'ativarTodos'
    $('.ativarTodos').click(function () {
        var url = location.pathname.substring(location.pathname.lastIndexOf('/') + 1).split('.')[0];
        if (url == 'gifs') {
            $('.gif > img').click();
        } else {
            $('audio').click();
        }
    });

    // Preparar links para download a partir do src do áudio
    var botoes = $(".back");
    botoes.each(function () {
        var b = $(this);
        b.children("a").attr("href", b.children(".botao").children("audio").attr('src'));
        b.children("a").attr("download", '');
    });

    // Configurar play/pause no botão do player
    $(".botao").click(function (e) {
        var play = $(this).children("audio")[0];
        var toggle = $(this).children("i")[0];
        $(toggle).toggleClass("fa-pause-circle fa-play-circle");
        if (play.paused) {
            play.play();
        } else {
            play.pause();
            play.currentTime = 0;
        }
    });

    // Download para gifs e imagens
    $('.backgif, .backimg').append('<a><button style="margin: 0 auto; margin-top: 5px;" class="baixar btn btn-block btn-default"><i class="fas fa-arrow-alt-circle-down"></i> Baixar</button></a>');
    $('.backgif a button').css('width', '300px');
    $('.backimg a button').css('width', '250px');

    $('.backgif').each(function () {
        var b = $(this);
        b.children("a").attr("href", b.children(".gif").children('img').attr('src').replace('/sprite', '').replace('.png', '.gif'));
        b.children("a").attr("download", '');
    });

    $('.backimg').each(function () {
        var b = $(this);
        b.children("a").attr("href", b.children(".img").children("img").attr('src'));
        b.children("a").attr("download", '');
    });

    // Twitch API checagem de status de stream
    setTimeout(function () {
        $.ajax({
            url: "https://api.twitch.tv/kraken/streams/thehydrogen",
            dataType: 'json',
            headers: {'Client-ID': '8as214cog5fxuqjdawgty1cn68ywjv'},
            success: function (channel) {
                if (channel["stream"] == null) {
                    $('#stream').html("<b>Stream <b style='color: red'>OFFLINE</span></b>");
                } else {
                    $('#stream').html("<b>Stream <span style='color: lightgreen'>ONLINE</span></b>");
                }
            }
        });
    }, 1500);

    // Eventos para fechar comentários e balões
    $('.exit').click(function () {
        if ($(this).parent().hasClass('comentar')) {
            $(this).parent().toggle('slide', { direction: 'right' }, 400);
            $('.naoCarregando').toggle('slide', { direction: 'right' }, 400);
            $('.toggleComentar').toggle('slide', { direction: 'right' }, 400);
        } else if ($(this).hasClass('toggleBaloes')) {
            $('.baloes').css({ width: 410, height: 510 });
            $('.baloes').toggle('slide', { direction: 'right' }, 330);
            if ($(this).css('right') == '225px') {
                $(this).css('right', 5);
            } else {
                $(this).css('right', 225);
            }
            $(this).toggleClass('fa-arrow-right fa-arrow-left');
            setTimeout(function () {
                $('.baloes').css({ width: 0, height: 0 });
            }, 401);
        } else {
            $(this).parent().toggle('fade', 400);
        }
    });

    // Toggle para comentário
    $('.toggleComentar').click(function () {
        $(this).toggle('slide', { direction: 'right' }, 400);
        $('.naoCarregando').toggle('slide', { direction: 'right' }, 400);
        $('.comentar').toggle('slide', { direction: 'right' }, 400);
    });

    // Botão collapse para nav em dispositivos menores
    setTimeout(function () {
        $('#collapse').click(function () {
            $('#MenuC').slideToggle();
            $('#MenuC').empty();
            $('#MenuC').html($('<ul></ul>').append($('nav > ul').html()));
        });
        updateNav();
    }, 500);

    // Responsividade nav
    $(window).on('resize', function () {
        updateNav();
    });

    $('img').attr('alt', 'Não foi possível carregar a imagem, recarregue a página ou baixe a imagem para ver');
    $('img').css({ 'font-size': 13, 'text-align': 'center' });

    // Protege gifs contra menu de contexto e dnd
    var url = location.pathname.substring(location.pathname.lastIndexOf('/') + 1).split('.')[0];
    if (url == 'gifs') {
        $('img').on('mousedown contextmenu', function (e) {
            e.preventDefault();
        });

        $('img').on('load', function () {
            $(this).siblings('.loader').remove();
        });

        $('.backgif').click(function (e) {
            if (!(e.target.tagName === 'IMG') && !(e.target.tagName == 'I')) return;

            var img = $(this).children('.gif').children('img')[0];
            var src = $(img).attr('src').replace('/sprite', '').replace('.png', '.gif');
            $(img).attr('src', src);

            $(img).siblings('i').removeClass();
            $(img).siblings('i').addClass('loader');
        });
    }
});

function updateNav() {
    if ($(window).width() <= 1000) {
        $('nav > ul').hide();
        $('#collapse').show();
    } else {
        $('#collapse').hide();
        $('nav > ul').show();
        $('#MenuC').hide();
    }
}
