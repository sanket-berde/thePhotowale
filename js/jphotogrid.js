/*
* Copyright (C) 2010 Joel Sutherland
* Licenced under the MIT license
*/
(function($) {
	$.fn.jphotogrid = function(settings, callback) {
		settings = $.extend(true, {
			activeClass: 'active',
			selectedClass: 'selected',
			baseCSS: {},
			selectedCSS: {}
		}, settings);

		var url = settings.flickrbase + settings.feedapi + '?';
		var first = true,
            setTop, left = 0, top = 0;
		
		$('#pg li img')
		
		//Convert floats to absolute
		function toAbsolute(el){
			$(el).children().each(function(i){
				var pos = $(this).position();
                if(setTop !== Math.floor(Number(pos.top))){
                    $(this).data('ptop',Math.floor(Number(pos.top)) + ((top+1) * parseInt(settings.baseCSS.gap)) + 'px');
                    $(this).data('pleft',Math.floor(Number(pos.left)) + 'px');
                    top = top + 1;
                    left = 0;
                    setTop = Math.floor(Number(pos.top));
                }
                else{
                    $(this).data('ptop',Math.floor(Number(pos.top)) + ((top) * parseInt(settings.baseCSS.gap)) + 'px');
                    $(this).data('pleft',Math.floor(Number(pos.left)) + ((left+1) * parseInt(settings.baseCSS.gap)) + 'px');
                    left = left + 1;
                }
                
            }).each(function(){
				placeOriginal(this);
			});

            var noOfImagesInRow = Math.floor($('ul').width() / parseInt(settings.baseCSS.width));
			
            $('ul').css({
                
                'height': parseInt($('ul li:eq(-1)').css('top')) + parseInt(settings.baseCSS.height) + parseInt(settings.baseCSS.gap) + 'px', 
                'width':  noOfImagesInRow * parseInt(settings.baseCSS.width) + (parseInt(settings.baseCSS.gap) * noOfImagesInRow) + 'px'
            });
		}
		
        var containerWidth = Math.floor($('ul').width() / parseInt(settings.baseCSS.width)) * parseInt(settings.baseCSS.width) + parseInt(settings.baseCSS.gap)*2 + 'px';
        
        $('ul').css({
                'width': containerWidth 
        });
        
        
        
		function placeOriginal(el, animate, callback){
			var dtop = $(el).data('ptop');
			var dleft = $(el).data('pleft');
			var props = $.extend({
				top: dtop,
				left: dleft
			}, settings.baseCSS);
			if(animate){
				$(el).animate(props, 'slow', function(){
					if($.isFunction(callback)) callback();
				});
			}
			else{
				$(el).css($.extend(props, {position: 'absolute'}));
			}
		}
		
		function hideSelected(callback){
                        //console.log("hideselected function");
			$container.find('.' + settings.selectedClass).each(function(){
				$(this).removeClass(settings.selectedClass);
				placeOriginal(this, true);
			});
			if($.isFunction(callback)) callback();
		}
		
		function select(el, event){
			hideSelected(function(){
                            //console.log("callback of hideselected function");
				$(el).addClass('selected').removeClass('active');
				
				if(el){
					var img = el.querySelector('img'),
						imgOgWidth = img.naturalWidth,
						imgOgHeight = img.naturalHeight,
						imgWidthCalc =  imgOgWidth / imgOgHeight * parseInt(settings.selectedCSS.height);
						
						settings.selectedCSS.width = imgWidthCalc + 'px';						
				}
				
                // if(windowSize().height > windowSize().width){
                // settings.selectedCSS.top = (- $('ul').offset().top + $('body').scrollTop() + (windowSize().height / 4 - parseInt(settings.selectedCSS.height) /  2)) + 'px';
                // }
                // else{
                    settings.selectedCSS.top = (- $('ul').offset().top + $('body').scrollTop() + (windowSize().height / 2 - parseInt(settings.selectedCSS.height) /  2)) + 'px';
                // }
                
				settings.selectedCSS.left = ($('body').width() / 2 - parseInt(settings.selectedCSS.width) /  2 - $('ul').offset().left) + 'px';
                var customEvent = event;
                loaded=$(el).find("img").attr("loaded");
                if(loaded=='0') {
                    var path=$(el).find("img").attr("src").split("/");
                    $(el).find("img").attr("src","img/loading-x.gif");
                    $.post("load_img.php",{img_name:"img/big_images/"+path[path.length-1]},function(data){
                       console.log(data);
                       $(el).find("img")
                               .attr("src",data)
                               .attr("loaded","1");
                    });
                }
                $(el).animate(settings.selectedCSS, 'slow', function(){
					onMouseMove(customEvent, el);
				});
			});
		}

        
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
        
        
        
        function onMouseMove(event, thisObj){
					var $this = $(thisObj),
						$leftBtn = $this.find('.left-button'),
						$rightBtn = $this.find('.right-button'),
						thisRect = thisObj.getBoundingClientRect(),
						newRectWidth = thisRect.width / 3,
						thisRectLeftSide = {left: thisRect.left, top: thisRect.top, right: thisRect.left + newRectWidth, bottom: thisRect.bottom, height: thisRect.height, width:  newRectWidth},
						thisRectRightSide = {left: thisRect.right - newRectWidth, top: thisRect.top, right: thisRect.right, bottom: thisRect.bottom, height: thisRect.height, width: newRectWidth },
						ptMouse = { left: event.clientX, top: event.clientY };
						
						if(thisRectLeftSide.left < ptMouse.left && thisRectLeftSide.top < ptMouse.top && thisRectLeftSide.right > ptMouse.left && thisRectLeftSide.bottom > ptMouse.top){
							//left button
							$leftBtn = $this.find('.left-button').show();
							$rightBtn = $this.find('.right-button').hide();
						}
						else if(thisRectRightSide.left < ptMouse.left && thisRectRightSide.top < ptMouse.top && thisRectRightSide.right > ptMouse.left && thisRectRightSide.bottom > ptMouse.top){
							//right button
							$leftBtn = $this.find('.left-button').hide();
							$rightBtn = $this.find('.right-button').show();
						}
						else{
							$leftBtn = $this.find('.left-button').hide();
							$rightBtn = $this.find('.right-button').hide();
						}
			}
			
        
        
        
		for(var key in settings.qstrings){
			if(!first)
				url += '&';
			url += key + '=' + settings.qstrings[key];
			first = false;
		}

		return $(this).each(function(){
			$container = $(this);
			$(this).css('position','relative');
			toAbsolute(this);
			
			$(this).children()
				.css('cursor', 'pointer')
				.hover(function(){
					if(!$(this).hasClass(settings.selectedClass))
						$(this).addClass(settings.activeClass);
				},function(){
					$(this).removeClass(settings.activeClass);
				});
				
				
				
			$('ul').on('click', '.' + settings.activeClass, function(event){
				event.stopPropagation();
				event.preventDefault();
				select(this, event);
			});
			
            $('ul').on('mousemove', '.' + settings.selectedClass, function(event){
                onMouseMove(event, this);
            });
            
			$(document).on('click', function(){
				hideSelected();
			});
			
            $('ul').on('mouseleave', '.' + settings.selectedClass, function(event){
			console.log('mouse leave');            
				var $this = $(this),
                    $leftBtn = $this.find('.left-button').hide(),
                    $right = $this.find('.right-button').hide();
            
            });
            
			$('.left-button, .right-button').on('mousemove', function(event){
                var $this = $(this).show();
            });
			
            $('ul').on('click', '.' + settings.selectedClass, function(event){
				event.stopPropagation();
				event.preventDefault();
				var $this = $(this),
                    $leftBtn = $this.find('.left-button'),
                    $rightBtn = $this.find('.right-button'), prev, next;
				
					if($leftBtn.css('display') !== 'none'){
						//previous 
						hideSelected();
						prev = $this.prev().addClass('active');
                        
                        select(prev[0], event);
					}
					else if($rightBtn.css('display') !== 'none'){
						//next 
						hideSelected();
						next = $this.next().addClass('active');
                        select(next[0], event);
					}
					else{
						hideSelected();
					}
				$leftBtn = $this.find('.left-button').hide();
				$rightBtn = $this.find('.right-button').hide();
//                var $this = $(this),
//                    $leftBtn = $this.find('.left-button').hide(),
//                    $right = $this.find('.right-button').hide();
			});
			
			// $(this).find('div')
				// .hover(function(){
					// $(this).css('opacity', 0);
				// },function(){
					// $(this).css('opacity', .5);
				// })
				// .click(function(){
					// $(this).css('opacity', 0);
					// $li = $(this).parent();
					// $li.css("z-index", 99);
					// $li.animate({
						// top: 0,
						// left: 0,
						// width: '100%',
						// height: '400px'
					// }, 'slow');
				// });
		});
	}
})(jQuery);