$(document).ready(function () {
    
    'use strict';
    
    // var $images = $('.slider-container img'), i =0, j=0,
		// imagesLen = $images.length;
    
	// function animation(){
	 // $($images[i]).fadeOut(5000, function(){
		// if(i === imagesLen){
			// i = 0;
		// }	
		// $($images[i]).fadeIn(5000); 
		// i++;
	// });
	// }
	
	// window.setInterval(animation, 5000);
    
	
	
	// function animationFadeOut(){
        // i++;
        // if(i === imagesLen){
			// $($images[i-1]).fadeOut(500, animationFadeOutComplete);
            // i = 0;
        // }
        // $($images[i]).fadeOut(500, animationFadeOutComplete);
        // console.log('hi');
    // }
    
    // function animationFadeOutComplete(){
        // animationFadeOut();
    // }
    // animationFadeOut();
	
	
	// function animationFadeIn(){
		// j++;
		// if(j === imagesLen){
			// $($images[j-1]).fadeIn(5000, animationFadeInComplete);
			// j = 0;
		// }
		// $($images[j]).fadeIn(5000, animationFadeInComplete);
		// console.log('hi');
	// }

	// function animationFadeInComplete(){
		// animationFadeIn();
	// }
	
	// window.setTimeout(animationFadeIn, 5000);
	
    $('input, textarea').focusin(function(){
	$('.field-empty').removeClass('field-empty');
    });
    function windowSize() {
          var myWidth = 0, myHeight = 0;
          if( typeof( window.innerWidth ) == 'number' ) {
            //Non-IE
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
          } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
          } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            //IE 4 compatible
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
          }
            return {width: myWidth, height: myHeight};
		}
		
    
    
    // $('.slider-container').slick({
        // infinite: true,
        // speed: 5000,
        // fade: true,
        // autoplay: true,
        // slide: 'img',
        // cssEase: 'linear'
    // });
    
	if($('.slider-container').length > 0){
		$('.slider-container').live('click', function(){
			window.location="gallery.htm";
		}); 
	}
    
    var width, height,
        wSize = windowSize(),
        imgWidth = 899,
        imgHeight = 600,
        borderWidth = 5;
    
    if(wSize.height > wSize.width){
        width = wSize.width;
    }
    else{
        width = (imgWidth/imgHeight) * wSize.height - borderWidth;
    }
    
    height = width * (imgHeight/imgWidth) - borderWidth;
	
    $('#container').width(width).height(height);
    
    var $menu = $('.menu');
    
	$('.logo').on('click', function(){
			window.location = "index.htm";
		
	});
	
    var animationEnd = function ($this){
//        var $this = $(this);
			if($this.hasClass('clicked')){
				if($this.hasClass('home-menu')){
					window.location="index.htm";   
				}
				else if($this.hasClass('gallery-menu')){
					window.location="gallery.htm";
				}
                else if($this.hasClass('about-us-menu')){
					window.location="about-us.htm";
				}
				else if($this.hasClass('contact-us-menu')){
					window.location="contact-us.htm";
				}
				
			}
			//$this.removeClass('animated hinge swing clicked');
//            $this.removeClass('animated fadeIn fadeOut clicked');
        $this.removeClass('animated fadeIn fadeOut clicked');
        
    }
    
    $('.low-opacity').height($('.about-us-content').height() + 20);
    
    $('.hover').hide();
	
	$('<img/>').attr('src', 'menu/home1-hover.png');
	$('<img/>').attr('src', 'menu/gallery1-hover.png');
	$('<img/>').attr('src', 'menu/about1-hover.png');
	$('<img/>').attr('src', 'menu/contact1-hover.png');
	
	
	$('.menu').mouseenter(function(){
			$(this).animate({
				opacity: 0
			}, 150, function(){
				var $this = $(this);
					if($this.hasClass('home-menu')){
						$this.attr('src', 'menu/home1-hover.png');
					}
					else if($this.hasClass('gallery-menu')){
						$this.attr('src', 'menu/gallery1-hover.png');
					}
					else if($this.hasClass('about-us-menu')){
						$this.attr('src', 'menu/about1-hover.png');
					}
					else if($this.hasClass('contact-us-menu')){
						$this.attr('src', 'menu/contact1-hover.png');
					}
				});
				$(this).animate({
						opacity: 1
				}, 150);
		}).mouseout(function(){
			$(this).animate({
				opacity: 0
			}, 150, function(){
				var $this = $(this);
					if($this.hasClass('home-menu')){
						$this.attr('src', 'menu/home1.png');
					}
					else if($this.hasClass('gallery-menu')){
						$this.attr('src', 'menu/gallery1.png');
					}
					else if($this.hasClass('about-us-menu')){
						$this.attr('src', 'menu/about1.png');
					}
					else if($this.hasClass('contact-us-menu')){
						$this.attr('src', 'menu/contact1.png');
					}
				});
				$(this).animate({
						opacity: 1
				}, 150);
	});
	
	
	if($menu.live){
		$menu.live('click', function(event){
            var $this = $(this);
            $this.addClass('clicked');
			if($this.hasClass('home-menu')){
				window.location = "index.htm";
			}
			else if($this.hasClass('gallery-menu')){
				window.location = "gallery.htm";
			}
			else if($this.hasClass('about-us-menu')){
				window.location = "about-us.htm";
			}
			else if($this.hasClass('contact-us-menu')){
				window.location = "contact-us.htm";
			}
            event.stopPropagation();
		});
	}
	else{
		$menu.on('click', function(event){
			var $this = $(this);
            $this.addClass('clicked');
			if($this.hasClass('home-menu')){
				window.location = "index.htm";
			}
			else if($this.hasClass('gallery-menu')){
				window.location = "gallery.htm";
			}
			else if($this.hasClass('about-us-menu')){
				window.location = "about-us.htm";
			}
			else if($this.hasClass('contact-us-menu')){
				window.location = "contact-us.htm";
			}
            event.stopPropagation();
		});
	}
	
    
    if($('#pg').length > 0){
		$('#pg').jphotogrid({
			baseCSS: {
			width: '175px',
			height: '117px',
			gap: '10px'
			},
			selectedCSS: {
				top: '50px',
				left: '100px',
				width: '900px',
				height: '601px',
				gap: '10px'
			}
		});
        
        $('.left-button, .right-button').hide();
	}
    
});