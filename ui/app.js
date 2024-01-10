$(function() {
    window.addEventListener("message", function(e) {
        if (e.data.show) {
            $("body").fadeIn("100");
        } else {
            $("body").fadeOut("100");
        };
    });    

    function loadContentForTab(tabId) {
        $("#bz-container-1 .bz-ask-menu").remove();

        var newScrollbarDiv = $('<div>', { class: 'bz-ask-menu', id: 'myScroolbar' + tabId });
        $("#bz-container-1").append(newScrollbarDiv);
    
        $.getJSON("./lists.json", function(data) {
            var selectedTabData = data.find(item => item.id === tabId);
            if (selectedTabData) {
                $("#bz-container-1 .left-title").text(selectedTabData.title);
                var accordionContent = '';
                $.each(selectedTabData.contents, function(i, item) {
                    accordionContent += `
                        <div class="accordion__item animate__animated animate__fadeIn animate__delay-${i}s">
                            <div class="accordion__item__header">${item.header}</div>
                            <div class="accordion__item__content"><p>${item.body}</p></div>
                        </div>
                    `;
                });
                newScrollbarDiv.html(accordionContent);
                
                var Scrollbar = window.Scrollbar;
                const options = {
                    'damping': .05,
                    'thumbMinSize': 18 
                };

                Scrollbar.init(newScrollbarDiv[0], options);
    
                $("#bz-container-1 .bz-ask-menu").attr("data-list", tabId);

                $(".return__back").on("click", function() {
                    
                    $("#bz-container").show();
                    $("#bz-container-1 .bz-ask-menu").removeAttr("data-list");
                
                    $(".accordion__item__content").slideUp(200).removeClass("active");
                    $(".accordion__item__header").removeClass("active");
                });

            }
        });
    };
    
    $(".bz-select-menu .select-item").on("click", function() {
        var tabId = $(this).data("id");
        $("#bz-container-1").attr("data-screen", tabId);
        $("#bz-container-1 .left-title").text($(this).text().trim());
        $("#bz-container").hide();
        $("#bz-container-1").show();
        loadContentForTab(tabId);
    });
    
    $(document).on('click', '.accordion__item__header', function() {
        $(this).toggleClass("active");
        $(this).next(".accordion__item__content").slideToggle(200).toggleClass("active");
    });
    
    $(document).on("keyup", function (e) {
        if (e.which == 27) {
            $("body").fadeOut("100");
            $("#bz-container").show();
            $("#bz-container-1 .bz-ask-menu").removeAttr("data-list");
            $(".accordion__item__content").slideUp(200).removeClass("active");
            $(".accordion__item__header").removeClass("active");
            $.post(`https://${GetParentResourceName()}/close`);
        }
    });

});
