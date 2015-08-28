function init() {
    body_el = document.getElementsByTagName("body")[0];
    playlist1_el = document.getElementById("playList1");
    playlist1SingleCat_el = document.getElementById("playList2SingleCat");
    menuHolder_el = document.getElementById("menuHolder");
    thumbsHolder_el = document.getElementById("thumbsHolder");
    presetsHolder_el = document.getElementById("presetsHolder");
    presets_el = document.getElementById("presets");
    myDiv_el = document.getElementById("myDiv");
    whyBuyImage_el = document.getElementById("whyBuy");
    logoImage_img = document.getElementById("logoImage");
    td_els = document.getElementsByTagName("td");
    specialNotes_el = document.getElementById("specialNotes");
    whatIsMainText_el = document.getElementById("whatIsMainText");
    mainFeatureTableHolder_el = document.getElementById("mainFeatureTableHolder");
    col1_el = document.getElementById("col1");
    col2_el = document.getElementById("col2");
    mainHeader_el = document.getElementById("mainHeader");
//    byFWD_img = document.getElementById("byFWD");
//    byFWD_img.style.cursor = "pointer";
//    byFWD_img.onclick = function() {
//        window.location.href = "http://www.webdesign-flash.ro"
//    };
    //setupMenu();
    setupThumbsHolder();
    if (window.addEventListener) {
        window.addEventListener("resize", onResizeHandler);
        if (FWDS3DCovUtils.isFirefox) {
            document.addEventListener("mozfullscreenchange", onFullScreenChange);
            document.removeEventListener("fullscreenchange", onFullScreenChange)
        }
    } else if (window.attachEvent) {
        window.attachEvent("onresize", onResizeHandler)
    }
    setupCoverflow();
    if (FWDS3DCovUtils.isIEAndLessThen10) {
        presets_el.style.display = "none"
    } else {
        setupPresets();
        coverflow.addListener(FWDSimple3DCoverflow.INTRO_START, onIntroStart);
        coverflow.addListener(FWDSimple3DCoverflow.INTRO_FINISH, onIntroFinish);
        coverflow.addListener(FWDSimple3DCoverflow.IS_API_READY, onApiReady)
    }
    //positionStuff();
    setTimeout(function() {
        positionStuff();
        removePlayLists()
    }, 100)
}

function removePlayLists() {
    try {
        body_el.removeChild(playlist1_el)
    } catch (e) {}
    try {
        body_el.removeChild(playlist1SingleCat_el)
    } catch (e) {}
}

function onFullScreenChange(e) {
    var t = document.fullScreen || !document.mozFullScreen;
    if (t) {
        clearTimeout(resizeHandlerId_to);
        resizeHandlerId_to = setTimeout(positionStuff, 90)
    }
}

function onResizeHandler() {
    if (FWDS3DCovUtils.isMobile) {
        clearTimeout(resizeHandlerId_to);
        resizeHandlerId_to = setTimeout(positionStuff, 90)
    } else {
        positionStuff();
        if (FWDS3DCovUtils.isIE) {
            clearTimeout(resizeHandlerId_to);
            resizeHandlerId_to = setTimeout(positionStuff, 90)
        }
    }
}

function positionStuff() {
    var e = FWDS3DCovUtils.getViewportSize();
    //windowW = menuHolder_el.offsetWidth;
    windowH = e.h;
    positionLogoImage();
    //pageMenu_do.positionAndResize(windowW);
    if (presetsMenu_do) {
        presetsMenu_do.positionAndResize(windowW)
    }
    pageThumbs_do.positionAndResize(windowW);
    positionText();
    positionBuyButton()
}

function setupMenu() {
    FWDS3DCovPageMenu.setPrototype();
    pageMenu_do = new FWDS3DCovPageMenu({
        disabledButton: 1,
        parent: menuHolder_el,
        menuLabels: ['Classic <span class="black">Black</span>', '<span class="blue">Classic <span class="bold">Black</span></span>', 'Classic <span class="white">White</span>', '<span class="blue">Classic <span class="bold">White</span></span>', 'All Sizes <span class="black">Black</span>', '<span class="blue">All Sizes <span class="bold">Black</span></span>', 'All Sizes <span class="white">White</span>', '<span class="blue">All Sizes <span class="bold">White</span></span>', '<span class="black">Transparent</span> Images', '<span class="blue"><span class="bold">Transparent</span> Images</span>', '<span class="black">Infinite</span> Loop', '<span class="blue"><span class="bold">Infinite</span> Loop</span>'],
        maxWidth: mainWidth,
        buttonNormalColor: "#999999",
        buttonSelectedColor: "#009aff",
        buttonsHolderBackgroundColor: "#EEEEEE"
    });
    pageMenu_do.addListener(FWDS3DCovPageMenuButton.CLICK, buttonClickHandler)
}

function buttonClickHandler(e) {
    if (e.id == 0) {
        window.location.href = "index.html"
    } else if (e.id == 1) {
        window.location.href = "index-classic-white.html"
    } else if (e.id == 2) {
        window.location.href = "index-allsizes-black.html"
    } else if (e.id == 3) {
        window.location.href = "index-allsizes-white.html"
    } else if (e.id == 4) {
        window.location.href = "index-transparent-images.html"
    } else if (e.id == 5) {
        window.location.href = "index-infinite-loop.html"
    }
}

function setupPresets() {
    FWDS3DCovPresetsMenu.setPrototype();
    presetsMenu_do = new FWDS3DCovPresetsMenu(presetsHolder_el, false);
    presetsMenu_do.addListener(FWDS3DCovPresetsMenu.CHANGE, onPresetsChange);
    presetsMenu_do.disable()
}

function onPresetsChange(e) {
    setPreset(e.id + 1)
}

function onIntroStart() {
    if (presetsMenu_do) {
        presetsMenu_do.disable()
    }
}

function onIntroFinish() {
    if (presetsMenu_do) {
        presetsMenu_do.enable()
    }
}

function onApiReady() {
    setupBuyButton()
}

function setPreset(e) {
    switch (e) {
    case 1:
        coverflow.setPreset([86, 78, 200, 93, 70, 100, 0, true, 0, true, 0, 0, "dualsided", "left", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]);
        break;
    case 2:
        coverflow.setPreset([80, 165, 400, 130, -40, 100, 0, true, 0, false, 0, 0, "dualsided", "left", "rgba(255, 255, 255, .4)", "rgba(255, 255, 255, 1)"]);
        break;
    case 3:
        coverflow.setPreset([86, 78, 200, 93, 2, 100, 0, true, 0, false, 0, 0, "dualsided", "left", "rgba(255, 255, 255, .4)", "rgba(255, 255, 255, 1)"]);
        break;
    case 4:
        coverflow.setPreset([100, 20, 150, 30, 60, 50, 0, true, 0, true, -15, 0, "dualsided", "left", "rgba(255, 255, 255, .4)", "rgba(255, 255, 255, 1)"]);
        break;
    case 5:
        coverflow.setPreset([240, 0, 0, 20, 0, 0, 0, true, 0, true, -15, 0, "onesided", "left", "rgba(255, 255, 255, .2)", "rgba(255, 255, 255, 1)"]);
        break;
    case 6:
        coverflow.setPreset([240, 0, 0, 20, 0, 0, 0, true, 0, true, -15, 0, "crosssided", "left", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, .2)"]);
        break;
    case 7:
        coverflow.setPreset([100, 30, 150, 60, 60, 50, 0, true, 0, true, -3, 0, "frontonesided", "left", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, .2)"]);
        break;
    case 8:
        coverflow.setPreset([86, 78, 200, 93, 70, 0, 0, true, 0, true, -10, 0, "accordion", "left", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)"]);
        break;
    case 9:
        coverflow.setPreset([86, 78, 200, 93, 70, 0, 0, true, 0, true, 0, -30, "flipping", "left", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)"]);
        break
    }
}

function setupBuyButton() {
    //if (location.href.indexOf("webdesign-flash.ro") == -1) return;
    FWDBuyButton.setPrototype();
    buyButton = new FWDBuyButton("graphics/buy.png", "graphics/hello.png", 70, 70, 30, 60);
    buyButton.setX(0);
    body_el.appendChild(buyButton.screen);
    self.positionBuyButton()
}

function positionBuyButton() {
    if (buyButton) {
        if (windowW < 6) {
            self.buyButton.setY(255)
        } else {
            self.buyButton.setY(27)
        }
    }
}

function setupThumbsHolder() {
    FWDS3DCovPageThumbs.setPrototype();
    pageThumbs_do = new FWDS3DCovPageThumbs({
        parent: thumbsHolder_el,
        imagesPath: ["graphics/imageFluid", "graphics/imageFixed"],
        labels: ["Fixed width", "Fluid width"],
        thumbShadowPath: "cutout_round_silver_graphics/thumbShadow.jpg",
        maxWidth: mainWidth,
        thumbnailBorderColor: "#FFFFFF",
        textNormalColor: "#55595c",
        textSelectedColor: "#009aff",
        wiewSampleTextColor: "#FFFFFF",
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowOffsetW: -4,
        shadowOffsetH: -4
    });
    pageThumbs_do.addListener(FWDS3DCovPageThumb.CLICK, onThumbPressedHandler)
}

function onThumbPressedHandler(e) {
    var t;
    if (e.id == 0 || e.id == 1) {
        if (coverflow) {
            coverflow.destroy();
            coverflow = null
        }
    }
    if (e.id == 0) {
        body_el.appendChild(playlist1_el);
        setupCoverflow()
    } else if (e.id == 1) {
        body_el.appendChild(playlist1SingleCat_el);
        setupCoverflow1()
    }
    coverflow.addListener(FWDSimple3DCoverflow.INTRO_START, onIntroStart);
    coverflow.addListener(FWDSimple3DCoverflow.INTRO_FINISH, onIntroFinish);
    if (e.id == 0 || e.id == 1) {
        pageThumbs_do.enableOrDisableThumbs(e.id);
        scale = Math.min(windowW, gridWidth) / mainWidth;
        t = window.pageYOffset + myDiv_el.getBoundingClientRect().top;
        t -= parseInt((windowH - coverflowHeight * scale) / 2);
        window.scrollTo(0, t);
        if (presetsMenu_do) {
            presetsMenu_do.setPreset(0)
        }
    }
}

function positionLogoImage() {
    /*var e = windowW - byFWDImageWidth - 2;
    var t = parseInt((windowW - logoImageWidth) / 2);
    if (e > mainWidth - byFWDImageWidth) {
        e = parseInt((windowW + mainWidth) / 2 - byFWDImageWidth)
    }
    if (windowW < 500) {
       // byFWD_img.style.top = "-50px"
    } else {
        byFWD_img.style.top = "64px"
    }
   // logoImage_img.style.left = t + "px";
    //byFWD_img.style.left = e + "px"
    */
}

function positionText() {
   /* var e = Math.min(mainWidth - 20, windowW - 20);
    var t = parseInt((windowW - e) / 2);
    var n = parseInt((Math.min(mainWidth, windowW) - 40) / 2);
    var r = parseInt(Math.min(mainWidth, windowW) - 20);
   // whatIsMainText_el.style.left = t + "px";
   // whatIsMainText_el.style.width = e + "px";
    mainFeatureTableHolder_el.style.width = r + "px";
    specialNotes_el.style.left = t + "px";
    specialNotes_el.style.width = e + "px";
    for (var i = 0; i < td_els.length; i++) {
        if (windowW < 500) {
            td_els[i].style.display = "block";
            if (i == 1) {
                td_els[i].style.width = "0%"
            } else {
                td_els[i].style.width = "100%"
            }
            td_els[i].style.display = "block"
        } else {
            if (i == 0) {
                td_els[i].style.width = "47%";
                td_els[i].style.display = "table-cell"
            } else if (i == 1) {
                td_els[i].style.width = "6%";
                td_els[i].style.display = "table-cell"
            } else {
                td_els[i].style.width = "47%";
                td_els[i].style.display = "table-cell"
            }
        }
    }*/
}

function setupCoverflow1() {
    coverflow = new FWDSimple3DCoverflow({
        coverflowHolderDivId: "myDiv",
        coverflowDataListDivId: "playList2SingleCat",
        displayType: "fixed",
        autoScale: "yes",
        coverflowWidth: 940,
        coverflowHeight: 538,
        skinPath: "load/skin_white",
        backgroundColor: "#FFFFFF",
        backgroundImagePath: "",
        backgroundRepeat: "repeat-x",
        showDisplay2DAlways: "no",
        coverflowStartPosition: "center",
        coverflowTopology: "dualsided",
        coverflowXRotation: 0,
        coverflowYRotation: 0,
        numberOfThumbnailsToDisplayLeftAndRight: "all",
        infiniteLoop: "no",
        rightClickContextMenu: "default",
        thumbnailWidth: 400,
        thumbnailHeight: 266,
        thumbnailXOffset3D: 86,
        thumbnailXSpace3D: 78,
        thumbnailZOffset3D: 200,
        thumbnailZSpace3D: 93,
        thumbnailYAngle3D: 70,
        thumbnailXOffset2D: 20,
        thumbnailXSpace2D: 30,
        thumbnailHoverOffset: 100,
        thumbnailBorderSize: 0,
        thumbnailBackgroundColor: "#999999",
        thumbnailBorderColor1: "#FFFFFF",
        thumbnailBorderColor2: "#FFFFFF",
        transparentImages: "no",
        thumbnailsAlignment: "center",
        maxNumberOfThumbnailsOnMobile: 13,
        showThumbnailsGradient: "yes",
        thumbnailGradientDirection: "left",
        thumbnailGradientColor1: "rgba(255, 255, 255, 0)",
        thumbnailGradientColor2: "rgba(255, 255, 255, 1)",
        showText: "yes",
        textOffset: 10,
        showThumbnailBoxShadow: "yes",
        thumbnailBoxShadowCss: "0px 2px 2px #BBBBBB",
        showTooltip: "no",
        dynamicTooltip: "yes",
        showReflection: "yes",
        reflectionHeight: 60,
        reflectionDistance: 0,
        reflectionOpacity: .2,
        slideshowDelay: 5e3,
        autoplay: "no",
        disableNextAndPrevButtonsOnMobile: "no",
        controlsMaxWidth: 700,
        slideshowTimerColor: "#FFFFFF",
        controlsPosition: "bottom",
        controlsOffset: 15,
        showPrevButton: "yes",
        showNextButton: "yes",
        showSlideshowButton: "yes",
        showScrollbar: "yes",
        disableScrollbarOnMobile: "yes",
        enableMouseWheelScroll: "yes",
        scrollbarHandlerWidth: 200,
        scrollbarTextColorNormal: "#000000",
        scrollbarTextColorSelected: "#FFFFFF",
        addKeyboardSupport: "yes",
        showCategoriesMenu: "no",
        startAtCategory: 1,
        categoriesMenuMaxWidth: 700,
        categoriesMenuOffset: 25,
        categoryColorNormal: "#999999",
        categoryColorSelected: "#000000",
        addLightBoxKeyboardSupport: "yes",
        showLightBoxNextAndPrevButtons: "yes",
        showLightBoxZoomButton: "yes",
        showLightBoxInfoButton: "yes",
        showLightBoxSlideShowButton: "yes",
        showLightBoxInfoWindowByDefault: "no",
        slideShowAutoPlay: "no",
        lightBoxVideoAutoPlay: "no",
        lightBoxBackgroundColor: "#000000",
        lightBoxInfoWindowBackgroundColor: "#FFFFFF",
        lightBoxItemBorderColor1: "#fcfdfd",
        lightBoxItemBorderColor2: "#e4FFe4",
        lightBoxItemBackgroundColor: "#333333",
        lightBoxMainBackgroundOpacity: .8,
        lightBoxInfoWindowBackgroundOpacity: .9,
        lightBoxBorderSize: 0,
        lightBoxBorderRadius: 0,
        lightBoxSlideShowDelay: 4e3
    })
}(function(e) {
    var t = function(e, n, r, i, s, o) {
            var u = this;
            var a = t.prototype;
            this.imageSource_img = new Image;
            this.imageSource_img.src = e;
            this.imageSource_img.onload = function() {
                u.dispatchEvent(t.LOAD_COMPLETE)
            };
            this.image_do = null;
            this.segmentWidth = n;
            this.segmentHeight = r;
            this.totalSegments = i;
            this.animDelay = s || 300;
            this.currentFrame = 0;
            this.countYoyo = 0;
            this.delayTimerId_int;
            this.yoyoId_to;
            this.isGowingFWD_bl = true;
            this.yoyo_bl = o;
            this.isShowed_bl = false;
            this.isMobile_bl = FWDS3DCovUtils.isMobile;
            this.hasPointerEvent_bl = FWDS3DCovUtils.hasPointerEvent;
            this.init = function() {
                u.setButtonMode(true);
                u.hasTransform3d_bl = false;
                u.hasTransform2d_bl = false;
                u.getStyle().zIndex = 99;
                u.setWidth(u.segmentWidth);
                u.setHeight(u.segmentHeight);
                u.image_do = new FWDS3DCovDisplayObject("img");
                u.image_do.setScreen(u.imageSource_img);
                u.image_do.setWidth(u.segmentWidth * u.totalSegments);
                u.image_do.setHeight(u.segmentHeight);
                u.image_do.hasTransform3d_bl = false;
                u.image_do.hasTransform2d_bl = false;
                u.addChild(this.image_do);
                if (u.isMobile_bl) {
                    if (u.hasPointerEvent_bl) {
                        u.screen.addEventListener("MSPointerUp", u.onMouseUp);
                        u.screen.addEventListener("MSPointerOver", u.onMouseOver);
                        u.screen.addEventListener("MSPointerOut", u.onMouseOut)
                    } else {
                        u.screen.addEventListener("touchend", u.onMouseUp)
                    }
                } else if (u.screen.addEventListener) {
                    u.screen.addEventListener("mouseover", u.onMouseOver);
                    u.screen.addEventListener("mouseout", u.onMouseOut);
                    u.screen.addEventListener("mouseup", u.onMouseUp)
                } else if (u.screen.attachEvent) {
                    u.screen.attachEvent("onmouseover", u.onMouseOver);
                    u.screen.attachEvent("onmouseout", u.onMouseOut);
                    u.screen.attachEvent("onmouseup", u.onMouseUp)
                }
            };
            this.onMouseOver = function() {
                u.goForward()
            };
            this.onMouseOut = function() {
                u.goBack()
            };
            this.onMouseUp = function() {
                u.dispatchEvent(t.CLICK)
            };
            this.goForward = function() {
                u.isGowingFWD_bl = true;
                u.countYoyo = 0;
                clearInterval(u.delayTimerId_int);
                u.delayTimerId_int = setInterval(u.updatePreloader, u.animDelay);
                u.dispatchEvent(t.GO_FWD)
            };
            this.goBack = function() {
                u.isGowingFWD_bl = false;
                u.countYoyo = 0;
                clearInterval(u.delayTimerId_int);
                u.delayTimerId_int = setInterval(u.updatePreloader, u.animDelay)
            };
            this.stop = function() {
                clearInterval(u.delayTimerId_int);
                u.currentFrame = 0;
                u.image_do.setX(0)
            };
            this.updatePreloader = function() {
                if (u.isGowingFWD_bl) {
                    u.currentFrame++;
                    u.countYoyo++;
                    if (u.yoyo_bl && u.countYoyo == 40) u.goBack()
                } else {
                    u.currentFrame--
                }
                if (u.currentFrame > u.totalSegments - 2) {
                    u.currentFrame = u.totalSegments - 2;
                    u.dispatchEvent(t.GO_FWD_COMPLETE)
                } else if (u.currentFrame < 0) {
                    u.currentFrame = 0;
                    clearInterval(u.delayTimerId_int);
                    u.dispatchEvent(t.GO_BACK_COMPLETE)
                }
                var e = u.currentFrame * u.segmentWidth;
                u.image_do.setX(-e)
            };
            this.show = function() {
                u.setX(-u.w - 5);
                FWDS3DCovModTweenMax.to(u, .8, {
                    x: 0,
                    ease: Expo.easeInOut
                })
            };
            this.init()
        };
    t.setPrototype = function() {
        t.prototype = new FWDS3DCovDisplayObject("div")
    };
    t.HIDE_COMPLETE = "hideComplete";
    t.GO_FWD_COMPLETE = "fwdComplete";
    t.GO_BACK_COMPLETE = "backComplete";
    t.GO_FWD = "goForward";
    t.LOAD_COMPLETE = "loadComplete";
    t.CLICK = "clickHandler";
    t.prototype = null;
    e.FWDAnimButton = t
})(window);
(function(e) {
    var t = function(n, r, i, s, o, u) {
            var a = this;
            var f = t.prototype;
            this.imageSource1_str = n;
            this.imageSource2_str = r;
            this.buy_do = null;
            this.hello_do = null;
            this.showHelloId_to;
            this.segmentWidth = i;
            this.segmentHeight = s;
            this.totalSegments = o;
            this.animDelay = u || 300;
            this.isHellowShowed_bl = false;
            this.isMobile_bl = FWDS3DCovUtils.isMobile;
            this.init = function() {
                a.setWidth(a.segmentWidth);
                a.setHeight(a.segmentHeight);
                FWDAnimButton.setPrototype();
                a.buy_do = new FWDAnimButton(a.imageSource1_str, a.segmentWidth, a.segmentHeight, a.totalSegments, 50, false);
                a.buy_do.addListener(FWDAnimButton.GO_FWD, a.buyGoFWDHandler);
                a.buy_do.addListener(FWDAnimButton.GO_BACK_COMPLETE, a.buyAnimBackCompleteHandler);
                a.buy_do.addListener(FWDAnimButton.LOAD_COMPLETE, a.buyLoadCompleteHanlder);
                a.buy_do.addListener(FWDAnimButton.CLICK, a.buyClickHandler);
                a.buy_do.setAlpha(0);
                a.addChild(a.buy_do);
                if (FWDS3DCovUtils.isIEAndLessThen9 || a.isMobile_bl) {
                    a.buy_do.setAlpha(1);
                    return
                }
                e.addEventListener("scroll", a.scrollHandler);
                FWDAnimButton.setPrototype();
                a.hello_do = new FWDAnimButton(a.imageSource2_str, a.segmentWidth, a.segmentHeight, a.totalSegments, 50, true);
                a.hello_do.addListener(FWDAnimButton.GO_BACK_COMPLETE, a.helloAnimBackCompleteHandler);
                a.hello_do.setAlpha(0);
                a.addChild(a.hello_do);
                a.addChild(a.buy_do);
                a.showHello()
            };
            this.buyClickHandler = function() {
                location.href = "http://codecanyon.net/item/simple-3d-coverflow/6562058?ref=FWDesign"
            };
            this.buyLoadCompleteHanlder = function() {
                a.buy_do.setAlpha(1);
                if (!a.isMobile_bl) a.buy_do.show()
            };
            this.scrollHandler = function() {
                var e = FWDS3DCovUtils.getScrollOffsets();
                if (e.y < 120) {
                    a.showHello()
                }
            };
            this.showHello = function() {
                if (a.isHellowShowed_bl) return;
                var e = FWDS3DCovUtils.getScrollOffsets();
                if (e.y > 120) return;
                a.isHellowShowed_bl = true;
                clearTimeout(a.showHelloId_to);
                a.showHelloId_to = setTimeout(function() {
                    a.buy_do.setAlpha(0);
                    a.hello_do.setAlpha(1);
                    a.hello_do.goForward()
                }, 4e3 + Math.random() * 6e3)
            };
            this.showBuy = function() {
                a.isHellowShowed_bl = false;
                clearTimeout(a.showHelloId_to);
                a.buy_do.setAlpha(1);
                if (a.hello_do) a.hello_do.setAlpha(0)
            };
            this.buyGoFWDHandler = function() {
                a.showBuy();
                if (a.hello_do) a.hello_do.stop()
            };
            this.helloAnimBackCompleteHandler = function() {
                a.showBuy();
                a.showHello()
            };
            this.buyAnimBackCompleteHandler = function() {
                if (FWDS3DCovUtils.isIEAndLessThen9 || a.isMobile_bl) return;
                a.showHello()
            };
            this.init()
        };
    t.setPrototype = function() {
        t.prototype = new FWDS3DCovDisplayObject("div")
    };
    t.HIDE_COMPLETE = "hideComplete";
    t.prototype = null;
    e.FWDBuyButton = t
})(window);
var pageMenu_do;
var presetsMenu_do;
var pageThumbs_do;
var body_el = null;
var playlist1_el = null;
var playlist1SingleCat_el = null;
var myDiv_el = null;
var menuHolder_el = null;
var thumbsHolder_el = null;
var presetsHolder_el = null;
var presets_el = null;
var whyBuyImage_el = null;
var logoImage_img = null;
var byFWD_img = null;
var td_els;
var mainHeader_el = null;
var menuHolder_el = null;
var whatIsMainText_el = null;
var logoImage_img = null;
var whyBuyImage_img = null;
var mainFeatureTableHolder_el = null;
var col1_el = null;
var col2_el = null;
var specialNotes_el = null;
var mainWidth = 940;
var coverflowHeight = 538;
var gridWidth = 940;
var byFWDImageWidth = 76;
var logoImageWidth = 522;
var whatIsImageWidth = 415;
var whyBuyImageWidth = 940;
var windowW = 0;
var windowH = 0;
var resizeHandlerId_to;
var scrollEndId_to;
var buyButton;
(function(e) {
    var t = function(e) {
            var n = this;
            var r = t.prototype;
            this.parent = e.parent;
            this.menuLabels_ar = e.menuLabels;
            this.menuButtons_ar = [];
            this.leftImage_sdo = null;
            this.rightImage_sdo = null;
            this.shadow_sdo = null;
            this.buttonsHolder_do = null;
            this.leftImagePath_str = e.leftImagePath;
            this.rightImagePath_str = e.rightImagePath;
            this.shadowPath_str = e.shadowPath;
            this.buttonNormalColor_str = e.buttonNormalColor;
            this.buttonSelectedColor_str = e.buttonSelectedColor;
            this.buttonsHolderBackgroundColor_str = e.buttonsHolderBackgroundColor;
            this.stageWidth = undefined;
            this.stageHeight = undefined;
            this.disabledButton = e.disabledButton;
            this.buttonsHolderWidth = 200;
            this.buttonsBarOriginalHeight = 53;
            this.totalHeight = 0;
            this.buttonsBarTotalHeight = 200;
            this.totalButtons = 6;
            this.totalHeight = 200;
            this.maxWidth = e.maxWidth;
            this.hSpace = 176;
            this.vSpace = 10;
            this.minHSpace = 28;
            this.minMarginXSpace = 12;
            this.startY = 12;
            n.init = function() {
                n.parent.style.height = "41px";
                n.setupButtons();
                setTimeout(function() {
                    n.setOverflow("visible");
                    n.positionButtons()
                }, 51);
                n.parent.appendChild(n.screen)
            };
            this.positionAndResize = function(e) {
                if (n.viewportWidth == e) return;
                n.viewportWidth = e;
                n.stageWidth = e;
                n.positionButtons()
            };
            this.setupButtons = function() {
                var e;
                var t = false;
                n.setBkColor(n.buttonsHolderBackgroundColor_str);
                n.buttonsHolder_do = new FWDS3DCovDisplayObject("div");
                n.buttonsHolder_do.setWidth(n.buttonsHolderWidth);
                n.buttonsHolder_do.setHeight(n.buttonsBarOriginalHeight);
                n.addChild(n.buttonsHolder_do);
                for (var r = 0; r < n.totalButtons; r++) {
                    if (r == n.disabledButton) {
                        t = true
                    } else {
                        t = false
                    }
                    FWDS3DCovPageMenuButton.setPrototype();
                    e = new FWDS3DCovPageMenuButton(n.menuLabels_ar[r * 2], n.menuLabels_ar[r * 2 + 1], t);
                    e.id = r;
                    e.addListener(FWDS3DCovPageMenuButton.CLICK, n.buttonClickHandler);
                    n.menuButtons_ar[r] = e;
                    n.buttonsHolder_do.addChild(e)
                }
            };
            this.buttonClickHandler = function(e) {
                n.dispatchEvent(FWDS3DCovPageMenuButton.CLICK, {
                    id: e.target.id
                })
            };
            this.positionButtons = function() {
                var e;
                var t;
                var r = [];
                var i = [];
                var s = [];
                var o;
                var u = n.startY;
                var a = 0;
                var f = 0;
                var l = 0;
                n.buttonsHolderWidth = Math.min(n.stageWidth, n.maxWidth);
                r[l] = [0];
                i[l] = n.menuButtons_ar[0].totalWidth;
                s[l] = n.menuButtons_ar[0].totalWidth;
                for (var c = 1; c < n.totalButtons; c++) {
                    e = n.menuButtons_ar[c];
                    if (i[l] + e.totalWidth + n.minHSpace > n.buttonsHolderWidth - n.minMarginXSpace) {
                        l++;
                        r[l] = [];
                        r[l].push(c);
                        i[l] = e.totalWidth;
                        s[l] = e.totalWidth
                    } else {
                        r[l].push(c);
                        i[l] += e.totalWidth + n.minHSpace;
                        s[l] += e.totalWidth
                    }
                }
                for (var c = 0; c < l + 1; c++) {
                    var h = 0;
                    if (c > 0) {
                        u += e.totalHeight + n.vSpace
                    }
                    var p;
                    if (r[c].length > 1) {
                        p = Math.min((n.buttonsHolderWidth - n.minMarginXSpace - s[c]) / (r[c].length - 1), n.hSpace);
                        var d = s[c] + p * (r[c].length - 1);
                        h = parseInt((n.buttonsHolderWidth - d) / 2)
                    } else {
                        h = parseInt((n.buttonsHolderWidth - i[c]) / 2)
                    }
                    for (var v = 0; v < r[c].length; v++) {
                        e = n.menuButtons_ar[r[c][v]];
                        if (v == 0) {
                            o = h
                        } else {
                            t = n.menuButtons_ar[r[c][v] - 1];
                            o = t.finalX + t.totalWidth + p
                        }
                        e.finalX = o;
                        e.finalY = u - 1;
                        if (a < e.finalY) a = e.finalY;
                        n.buttonsBarTotalHeight = a + e.totalHeight + n.startY - 2;
                        e.setX(parseInt(e.finalX));
                        e.setY(parseInt(e.finalY))
                    }
                }
                n.totalHeight = n.buttonsBarTotalHeight;
                n.buttonsHolder_do.setWidth(n.buttonsHolderWidth);
                n.buttonsHolder_do.setHeight(n.buttonsBarTotalHeight);
                n.buttonsHolder_do.setX(parseInt((n.viewportWidth - n.buttonsHolderWidth) / 2));
                n.setWidth(n.stageWidth);
                n.setHeight(n.totalHeight);
                n.setX(parseInt((n.viewportWidth - n.stageWidth) / 2));
                n.parent.style.height = n.totalHeight + "px"
            };
            n.init()
        };
    t.setPrototype = function() {
        t.prototype = new FWDS3DCovDisplayObject("div")
    };
    t.CLICK = "onClick";
    t.prototype = null;
    e.FWDS3DCovPageMenu = t
})(window);
(function() {
    var e = function(t, n, r) {
            var i = this;
            var s = e.prototype;
            this.label_str1 = t;
            this.label_str2 = n;
            this.id;
            this.totalWidth = 240;
            this.totalHeight = 20;
            this.text_ndo = null;
            this.text_sdo = null;
            this.dumy_sdo = null;
            this.finalX;
            this.finalY;
            this.isMobile_bl = FWDS3DCovUtils.isMobile;
            this.disableButton_bl = r;
            this.currentState = 1;
            this.isDisabled_bl = false;
            i.init = function() {
                i.setBackfaceVisibility();
                i.setButtonMode(true);
                i.setupMainContainers();
                i.setWidth(i.totalWidth);
                i.setHeight(i.totalHeight);
                if (i.disableButton_bl) i.disable()
            };
            i.setupMainContainers = function() {
                i.text_ndo = new FWDS3DCovSimpleDisplayObject("div");
                i.text_ndo.getStyle().whiteSpace = "nowrap";
                i.text_ndo.setBackfaceVisibility();
                i.text_ndo.setDisplay("inline-block");
                i.text_ndo.getStyle().fontFamily = "myFont, Arial";
                i.text_ndo.getStyle().fontSize = "17px";
                i.text_ndo.getStyle().color = "#777777";
                i.text_ndo.getStyle().fontSmoothing = "antialiased";
                i.text_ndo.getStyle().webkitFontSmoothing = "antialiased";
                i.text_ndo.getStyle().textRendering = "optimizeLegibility";
                i.text_ndo.setInnerHTML(i.label_str1);
                i.addChild(i.text_ndo);
                i.text_sdo = new FWDS3DCovSimpleDisplayObject("div");
                i.text_sdo.getStyle().whiteSpace = "nowrap";
                i.text_sdo.setBackfaceVisibility();
                i.text_sdo.setDisplay("inline-block");
                i.text_sdo.getStyle().fontFamily = "myFont, Arial";
                i.text_sdo.getStyle().fontSize = "17px";
                i.text_sdo.getStyle().fontSmoothing = "antialiased";
                i.text_sdo.getStyle().webkitFontSmoothing = "antialiased";
                i.text_sdo.getStyle().textRendering = "optimizeLegibility";
                i.text_sdo.setInnerHTML(i.label_str2);
                i.addChild(i.text_sdo);
                i.text_sdo.setAlpha(0);
                setTimeout(function() {
                    i.centerText();
                    i.setTotalWidth()
                }, 50);
                i.dumy_sdo = new FWDS3DCovSimpleDisplayObject("div");
                if (FWDS3DCovUtils.isIE) {
                    i.dumy_sdo.setBkColor("#FFFF00");
                    i.dumy_sdo.setAlpha(0)
                }
                i.addChild(i.dumy_sdo);
                if (i.isMobile_bl) {
                    i.screen.addEventListener("click", i.onClick)
                } else if (i.screen.addEventListener) {
                    i.screen.addEventListener("mouseover", i.onMouseOver);
                    i.screen.addEventListener("mouseout", i.onMouseOut);
                    i.screen.addEventListener("click", i.onClick)
                } else if (i.screen.attachEvent) {
                    i.screen.attachEvent("onmouseover", i.onMouseOver);
                    i.screen.attachEvent("onmouseout", i.onMouseOut);
                    i.screen.attachEvent("onclick", i.onClick)
                }
            };
            i.onMouseOver = function(e) {
                if (i.isDisabled_bl) return;
                FWDS3DCovModTweenMax.to(i.text_ndo.screen, .5, {
                    alpha: 0,
                    ease: Expo.easeOut
                });
                FWDS3DCovModTweenMax.to(i.text_sdo.screen, .5, {
                    alpha: 1,
                    ease: Expo.easeOut
                })
            };
            i.onMouseOut = function(e) {
                if (i.isDisabled_bl) return;
                FWDS3DCovModTweenMax.to(i.text_ndo.screen, .5, {
                    alpha: 1,
                    ease: Expo.easeOut
                });
                FWDS3DCovModTweenMax.to(i.text_sdo.screen, .5, {
                    alpha: 0,
                    ease: Expo.easeOut
                })
            };
            i.onClick = function(t) {
                if (i.isDisabled_bl) return;
                if (t.preventDefault) t.preventDefault();
                i.dispatchEvent(e.CLICK)
            };
            i.disable = function() {
                i.isDisabled_bl = true;
                i.setButtonMode(false);
                FWDS3DCovModTweenMax.to(i.text_ndo.screen, .5, {
                    alpha: 0,
                    ease: Expo.easeOut
                });
                FWDS3DCovModTweenMax.to(i.text_sdo.screen, .5, {
                    alpha: 1,
                    ease: Expo.easeOut
                })
            };
            i.centerText = function() {
                i.dumy_sdo.setWidth(i.totalWidth);
                i.dumy_sdo.setHeight(i.totalHeight);
                if (FWDS3DCovUtils.isIEAndLessThen9 || FWDS3DCovUtils.isSafari) {
                    i.text_ndo.setY(Math.round((i.totalHeight - i.text_ndo.getHeight()) / 2) - 1)
                } else {
                    i.text_ndo.setY(Math.round((i.totalHeight - i.text_ndo.getHeight()) / 2))
                }
                i.text_ndo.setHeight(i.totalHeight + 2);
                if (FWDS3DCovUtils.isIEAndLessThen9 || FWDS3DCovUtils.isSafari) {
                    i.text_sdo.setY(Math.round((i.totalHeight - i.text_sdo.getHeight()) / 2) - 1)
                } else {
                    i.text_sdo.setY(Math.round((i.totalHeight - i.text_sdo.getHeight()) / 2))
                }
                i.text_sdo.setHeight(i.totalHeight + 2)
            };
            i.setTotalWidth = function() {
                i.totalWidth = i.text_ndo.getWidth();
                i.dumy_sdo.setWidth(i.totalWidth)
            };
            i.init()
        };
    e.setPrototype = function() {
        e.prototype = new FWDS3DCovDisplayObject("div")
    };
    e.CLICK = "onClick";
    e.prototype = null;
    window.FWDS3DCovPageMenuButton = e
})(window);
(function(e) {
    var t = function(e, n, r, i, s) {
            var o = this;
            var u = t.prototype;
            this.id = e;
            this.nImgUrl = i;
            this.sImgUrl = s;
            this.n_do;
            this.s_do;
            this.totalWidth = n;
            this.totalHeight = r;
            this.isMobile_bl = FWDS3DCovUtils.isMobile;
            this.hasPointerEvent_bl = FWDS3DCovUtils.hasPointerEvent;
            this.isEnabled = false;
            this.init = function() {
                this.setupMainContainers()
            };
            this.setupMainContainers = function() {
                this.n_do = new FWDS3DCovSimpleDisplayObject("img");
                this.n_do.screen.src = this.nImgUrl;
                this.s_do = new FWDS3DCovSimpleDisplayObject("img");
                this.s_do.screen.src = this.sImgUrl;
                this.addChild(this.s_do);
                this.addChild(this.n_do);
                this.setWidth(n);
                this.setHeight(r);
                this.n_do.setWidth(n);
                this.n_do.setHeight(r);
                this.s_do.setWidth(n);
                this.s_do.setHeight(r);
                o.enable()
            };
            this.onMouseOver = function(e) {
                if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE) {
                    FWDS3DCovModTweenMax.to(o.n_do, .9, {
                        alpha: 0,
                        ease: Expo.easeOut
                    })
                }
            };
            this.onMouseOut = function(e) {
                if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE) {
                    FWDS3DCovModTweenMax.to(o.n_do, .9, {
                        alpha: 1,
                        ease: Expo.easeOut
                    })
                }
            };
            this.onClick = function(e) {
                o.dispatchEvent(t.CLICK, {
                    id: o.id
                })
            };
            this.enable = function() {
                if (o.isEnabled) return;
                o.isEnabled = true;
                this.setButtonMode(true);
                if (o.isMobile_bl) {
                    if (o.hasPointerEvent_bl) {
                        o.screen.addEventListener("MSPointerOver", o.onMouseOver);
                        o.screen.addEventListener("MSPointerOut", o.onMouseOut);
                        o.screen.addEventListener("MSPointerUp", o.onClick)
                    } else {
                        o.screen.addEventListener("touchstart", o.onClick)
                    }
                } else if (o.screen.addEventListener) {
                    o.screen.addEventListener("mouseover", o.onMouseOver);
                    o.screen.addEventListener("mouseout", o.onMouseOut);
                    o.screen.addEventListener("mouseup", o.onClick)
                } else if (o.screen.attachEvent) {
                    o.screen.attachEvent("onmouseover", o.onMouseOver);
                    o.screen.attachEvent("onmouseout", o.onMouseOut);
                    o.screen.attachEvent("onmouseup", o.onClick)
                }
                FWDS3DCovModTweenMax.to(o, .1, {
                    alpha: 1,
                    ease: Expo.easeOut
                })
            };
            this.disable = function() {
                if (!o.isEnabled) return;
                o.isEnabled = false;
                FWDS3DCovModTweenMax.to(o.n_do, .9, {
                    alpha: 1,
                    ease: Expo.easeOut
                });
                this.setButtonMode(false);
                if (o.isMobile_bl) {
                    if (o.hasPointerEvent_bl) {
                        o.screen.removeEventListener("MSPointerOver", o.onMouseOver);
                        o.screen.removeEventListener("MSPointerOut", o.onMouseOut);
                        o.screen.removeEventListener("MSPointerUp", o.onClick)
                    } else {
                        o.screen.removeEventListener("touchstart", o.onClick)
                    }
                } else if (o.screen.removeEventListener) {
                    o.screen.removeEventListener("mouseover", o.onMouseOver);
                    o.screen.removeEventListener("mouseout", o.onMouseOut);
                    o.screen.removeEventListener("mouseup", o.onClick)
                } else if (o.screen.detachEvent) {
                    o.screen.detachEvent("onmouseover", o.onMouseOver);
                    o.screen.detachEvent("onmouseout", o.onMouseOut);
                    o.screen.detachEvent("onmouseup", o.onClick)
                }
                FWDS3DCovModTweenMax.to(o, .1, {
                    alpha: .2,
                    ease: Expo.easeOut
                })
            };
            this.destroy = function() {
                if (o.isMobile_bl) {
                    if (o.hasPointerEvent_bl) {
                        o.screen.removeEventListener("MSPointerOver", o.onMouseOver);
                        o.screen.removeEventListener("MSPointerOut", o.onMouseOut);
                        o.screen.removeEventListener("MSPointerUp", o.onClick)
                    } else {
                        o.screen.removeEventListener("touchstart", o.onClick)
                    }
                } else if (o.screen.removeEventListener) {
                    o.screen.removeEventListener("mouseover", o.onMouseOver);
                    o.screen.removeEventListener("mouseout", o.onMouseOut);
                    o.screen.removeEventListener("mouseup", o.onClick)
                } else if (o.screen.detachEvent) {
                    o.screen.detachEvent("onmouseover", o.onMouseOver);
                    o.screen.detachEvent("onmouseout", o.onMouseOut);
                    o.screen.detachEvent("onmouseup", o.onClick)
                }
                FWDS3DCovModTweenMax.killTweensOf(o.n_do);
                o.n_do.destroy();
                o.s_do.destroy();
                o.nImgUrl = null;
                o.sImgUrl = null;
                o.n_do = null;
                o.s_do = null;
                o.setInnerHTML("");
                u.destroy();
                o = null;
                u = null;
                t.prototype = null
            };
            this.init()
        };
    t.setPrototype = function() {
        t.prototype = new FWDS3DCovDisplayObject("div")
    };
    t.CLICK = "onClick";
    t.prototype = null;
    e.FWDS3DCovPageThumb = t
})(window);
(function(e) {
    var t = function(e) {
            var n = this;
            var r = t.prototype;
            this.parent = e.parent;
            this.image_img;
            this.labels_ar = e.labels;
            this.imagesPath_ar = e.imagesPath;
            this.thumbs_ar = [];
            this.thumbnailBorderColor_str = e.thumbnailBorderColor;
            "#FFFFFF";
            this.textNormalColor_str = e.textNormalColor;
            "#666666";
            this.textSelectedColor_str = e.textSelectedColor;
            "#0099ff";
            this.wiewSampleTextColor_str = e.wiewSampleTextColor;
            "#FFFFFF";
            this.maxWidth = e.maxWidth;
            this.stageWidth = 0;
            this.stageHeight = 0;
            this.totalHeight = 0;
            this.thumbnailMaxWidth = 180;
            this.thumbnailMaxHeight = 120;
            this.spacerH = 50;
            this.spacerV = 15;
            this.iconOffsetHeight = 40;
            this.totalThumbs = this.labels_ar.length;
            this.thumbnailBorderSize = 4;
            this.countLoadedThumbs = 0;
            this.totalRows;
            this.remainSpace;
            this.thumbW;
            this.thumbH;
            this.stageWidth;
            this.howManyThumbsToDisplayH;
            this.howManyThumbsToDisplayV;
            this.toAddToX;
            this.curId = 0;
            this.shadowOffsetX = e.shadowOffsetX;
            this.shadowOffsetY = e.shadowOffsetY;
            this.shadowOffsetW = e.shadowOffsetW;
            this.shadowOffsetH = e.shadowOffsetH;
            this.loadWithDelayId_to;
            n.init = function() {
                n.setOverflow("visible");
                n.setupThumbs();
                n.enableOrDisableThumbs(0);
                n.parent.appendChild(n.screen);
                setTimeout(n.positionAndResize, 50)
            };
            this.positionAndResize = function(e) {
                if (!e) return;
                if (n.viewportWidth == e) return;
                n.viewportWidth = e;
                n.stageWidth = e > n.maxWidth ? n.maxWidth : e;
                n.positionAndResizeThumbs();
                n.setX(parseInt((n.viewportWidth - n.stageWidth) / 2))
            };
            this.setupThumbs = function() {
                var e;
                for (var t = 0; t < n.totalThumbs; t++) {
                    FWDS3DCovPageThumb.setPrototype();
                    e = new FWDS3DCovPageThumb(t, 180, 120, n.imagesPath_ar[t] + "N.jpg", n.imagesPath_ar[t] + "S.jpg");
                    e.addListener(FWDS3DCovPageThumb.CLICK, n.onThumbClick);
                    n.thumbs_ar[t] = e;
                    n.addChild(e)
                }
            };
            this.onThumbClick = function(e) {
                n.curId = e.id;
                n.enableOrDisableThumbs();
                n.dispatchEvent(FWDS3DCovPageThumb.CLICK, {
                    id: n.curId
                })
            };
            this.loadImages = function() {
                if (n.countLoadedThumbs > n.totalThumbs - 1) return;
                if (n.image_img) {
                    n.image_img.onload = null;
                    n.image_img.onerror = null
                }
                n.image_img = new Image;
                n.image_img.onload = n.onImageLoadComplete;
                n.image_img.src = n.imagesPath_ar[n.countLoadedThumbs]
            };
            this.onImageLoadComplete = function(e) {
                var t = n.thumbs_ar[n.countLoadedThumbs];
                t.setImage(n.image_img);
                n.countLoadedThumbs++;
                n.loadWithDelayId_to = setTimeout(n.loadImages, 40)
            };
            this.positionAndResizeThumbs = function(e) {
                var t;
                var r;
                var i;
                var s = n.spacerH;
                var o;
                if (n.thumbnailMaxWidth * 2 + n.spacerH > n.stageWidth) {
                    s = n.stageWidth - n.thumbnailMaxWidth * 2
                }
                o = n.thumbnailMaxWidth * 2 + s;
                n.thumbs_ar[0].setX((n.stageWidth - o) / 2);
                n.thumbs_ar[0].setY(n.spacerV);
                n.thumbs_ar[1].setX((n.stageWidth - o) / 2 + n.thumbnailMaxWidth + s);
                n.thumbs_ar[1].setY(n.spacerV);
                n.totalHeight = n.thumbnailMaxHeight + n.spacerV * 2;
                n.parent.style.height = n.totalHeight + "px"
            };
            this.enableOrDisableThumbs = function() {
                for (var e = 0; e < n.totalThumbs; e++) {
                    thumb = n.thumbs_ar[e];
                    if (n.curId == e) {
                        thumb.disable()
                    } else {
                        thumb.enable()
                    }
                }
            };
            n.init()
        };
    t.setPrototype = function() {
        t.prototype = new FWDS3DCovDisplayObject("div")
    };
    t.CLICK = "onClick";
    t.prototype = null;
    e.FWDS3DCovPageThumbs = t
})(window);
(function(e) {
    var t = function(e, n, r, i, s) {
            var o = this;
            var u = t.prototype;
            this.id = e;
            this.nImgUrl = i;
            this.sImgUrl = s;
            this.n_do;
            this.s_do;
            this.totalWidth = n;
            this.totalHeight = r;
            this.isMobile_bl = FWDS3DCovUtils.isMobile;
            this.hasPointerEvent_bl = FWDS3DCovUtils.hasPointerEvent;
            this.isEnabled = false;
            this.init = function() {
                this.setupMainContainers()
            };
            this.setupMainContainers = function() {
                this.n_do = new FWDS3DCovSimpleDisplayObject("img");
                this.n_do.screen.src = this.nImgUrl;
                this.s_do = new FWDS3DCovSimpleDisplayObject("img");
                this.s_do.screen.src = this.sImgUrl;
                this.addChild(this.s_do);
                this.addChild(this.n_do);
                this.setWidth(n);
                this.setHeight(r);
                this.n_do.setWidth(n);
                this.n_do.setHeight(r);
                this.s_do.setWidth(n);
                this.s_do.setHeight(r);
                o.enable()
            };
            this.onMouseOver = function(e) {
                if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE) {
                    FWDS3DCovModTweenMax.to(o.n_do, .9, {
                        alpha: 0,
                        ease: Expo.easeOut
                    })
                }
            };
            this.onMouseOut = function(e) {
                if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE) {
                    FWDS3DCovModTweenMax.to(o.n_do, .9, {
                        alpha: 1,
                        ease: Expo.easeOut
                    })
                }
            };
            this.onClick = function(e) {
                o.dispatchEvent(t.CLICK, {
                    id: o.id
                })
            };
            this.enable = function() {
                if (o.isEnabled) return;
                o.isEnabled = true;
                this.setButtonMode(true);
                if (o.isMobile_bl) {
                    if (o.hasPointerEvent_bl) {
                        o.screen.addEventListener("MSPointerOver", o.onMouseOver);
                        o.screen.addEventListener("MSPointerOut", o.onMouseOut);
                        o.screen.addEventListener("MSPointerUp", o.onClick)
                    } else {
                        o.screen.addEventListener("click", o.onClick)
                    }
                } else if (o.screen.addEventListener) {
                    o.screen.addEventListener("mouseover", o.onMouseOver);
                    o.screen.addEventListener("mouseout", o.onMouseOut);
                    o.screen.addEventListener("mouseup", o.onClick)
                } else if (o.screen.attachEvent) {
                    o.screen.attachEvent("onmouseover", o.onMouseOver);
                    o.screen.attachEvent("onmouseout", o.onMouseOut);
                    o.screen.attachEvent("onmouseup", o.onClick)
                }
                FWDS3DCovModTweenMax.to(o, .1, {
                    alpha: 1,
                    ease: Expo.easeOut
                })
            };
            this.disable = function() {
                if (!o.isEnabled) return;
                o.isEnabled = false;
                FWDS3DCovModTweenMax.to(o.n_do, .9, {
                    alpha: 1,
                    ease: Expo.easeOut
                });
                this.setButtonMode(false);
                if (o.isMobile_bl) {
                    if (o.hasPointerEvent_bl) {
                        o.screen.removeEventListener("MSPointerOver", o.onMouseOver);
                        o.screen.removeEventListener("MSPointerOut", o.onMouseOut);
                        o.screen.removeEventListener("MSPointerUp", o.onClick)
                    } else {
                        o.screen.removeEventListener("click", o.onClick)
                    }
                } else if (o.screen.removeEventListener) {
                    o.screen.removeEventListener("mouseover", o.onMouseOver);
                    o.screen.removeEventListener("mouseout", o.onMouseOut);
                    o.screen.removeEventListener("mouseup", o.onClick)
                } else if (o.screen.detachEvent) {
                    o.screen.detachEvent("onmouseover", o.onMouseOver);
                    o.screen.detachEvent("onmouseout", o.onMouseOut);
                    o.screen.detachEvent("onmouseup", o.onClick)
                }
                FWDS3DCovModTweenMax.to(o, .1, {
                    alpha: .25,
                    ease: Expo.easeOut
                })
            };
            this.destroy = function() {
                if (o.isMobile_bl) {
                    if (o.hasPointerEvent_bl) {
                        o.screen.removeEventListener("MSPointerOver", o.onMouseOver);
                        o.screen.removeEventListener("MSPointerOut", o.onMouseOut);
                        o.screen.removeEventListener("MSPointerUp", o.onClick)
                    } else {
                        o.screen.removeEventListener("click", o.onClick)
                    }
                } else if (o.screen.removeEventListener) {
                    o.screen.removeEventListener("mouseover", o.onMouseOver);
                    o.screen.removeEventListener("mouseout", o.onMouseOut);
                    o.screen.removeEventListener("mouseup", o.onClick)
                } else if (o.screen.detachEvent) {
                    o.screen.detachEvent("onmouseover", o.onMouseOver);
                    o.screen.detachEvent("onmouseout", o.onMouseOut);
                    o.screen.detachEvent("onmouseup", o.onClick)
                }
                FWDS3DCovModTweenMax.killTweensOf(o.n_do);
                o.n_do.destroy();
                o.s_do.destroy();
                o.nImgUrl = null;
                o.sImgUrl = null;
                o.n_do = null;
                o.s_do = null;
                o.setInnerHTML("");
                u.destroy();
                o = null;
                u = null;
                t.prototype = null
            };
            this.init()
        };
    t.setPrototype = function() {
        t.prototype = new FWDS3DCovDisplayObject("div")
    };
    t.CLICK = "onClick";
    t.prototype = null;
    e.FWDS3DCovPresetButton = t
})(window);
(function(e) {
    var t = function(e, n, r) {
            var i = this;
            var s = t.prototype;
            this.parent = e;
            this.isAllSizes = n;
            this.menuButtons_ar = [];
            this.buttonsHolder_do = null;
            this.stageWidth;
            this.stageHeight;
            this.maxWidth = 940;
            this.buttonsHolderWidth = 200;
            this.buttonsBarOriginalHeight = 70;
            this.totalHeight = 0;
            this.buttonsBarTotalHeight = 200;
            this.totalButtons;
            this.totalHeight = 200;
            this.spacerWidth = 2;
            this.spacerHeight = 11;
            this.hSpace = 45;
            this.vSpace = 20;
            this.minMarginXSpace = 12;
            this.startY = 8;
            this.curId = 0;
            this.init = function() {
                i.parent.style.height = "10px";
                i.parent.appendChild(i.screen);
                if (r) {
                    i.totalButtons = 4
                } else if (i.isAllSizes) {
                    i.totalButtons = 8
                } else {
                    i.totalButtons = 9
                }
                i.setupPresets();
                i.positionSlidersId = setTimeout(i.positionSliderButtons, 50)
            };
            this.positionAndResize = function(e) {
                if (i.viewportWidth == e) return;
                i.viewportWidth = e;
                i.stageWidth = e;
                i.positionSliderButtons()
            };
            this.setupPresets = function() {
                i.buttonsHolder_do = new FWDS3DCovDisplayObject("div");
                i.buttonsHolder_do.setWidth(i.buttonsHolderWidth);
                i.buttonsHolder_do.setHeight(i.buttonsBarOriginalHeight);
                i.addChild(i.buttonsHolder_do);
                var e;
                for (var t = 0; t < i.totalButtons; t++) {
                    FWDS3DCovPresetButton.setPrototype();
                    if (i.isAllSizes && t == 7) {
                        e = new FWDS3DCovPresetButton(t, 149, 72, "graphics/p9n.jpg", "graphics/p9s.jpg")
                    } else {
                        e = new FWDS3DCovPresetButton(t, 149, 72, "graphics/p" + (t + 1) + "n.jpg", "graphics/p" + (t + 1) + "s.jpg")
                    }
                    e.addListener(FWDS3DCovPresetButton.CLICK, i.onPresetClick);
                    i.menuButtons_ar[t] = e;
                    i.buttonsHolder_do.addChild(e)
                }
                i.menuButtons_ar[0].disable()
            };
            this.onPresetClick = function(e) {
                i.setPreset(e.id);
                i.dispatchEvent(t.CHANGE, {
                    id: i.curId
                })
            };
            this.setPreset = function(e) {
                i.curId = e;
                for (var t = 0; t < i.totalButtons; t++) {
                    if (t == i.curId) {
                        i.menuButtons_ar[t].disable()
                    } else {
                        i.menuButtons_ar[t].enable()
                    }
                }
            };
            this.positionSliderButtons = function() {
                if (isNaN(i.stageWidth)) return;
                var e;
                var t;
                var n = [];
                var r = [];
                var s;
                var o = i.startY;
                var u = 0;
                var a = 0;
                var f = 0;
                var l = 0;
                i.buttonsHolderWidth = i.stageWidth;
                n[f] = [0];
                r[f] = i.menuButtons_ar[0].totalWidth;
                for (var c = 1; c < i.totalButtons; c++) {
                    e = i.menuButtons_ar[c];
                    if (r[f] + e.totalWidth + i.hSpace > Math.min(i.stageWidth, i.maxWidth) - i.minMarginXSpace) {
                        f++;
                        n[f] = [];
                        n[f].push(c);
                        r[f] = e.totalWidth
                    } else {
                        r[f] += e.totalWidth + i.hSpace;
                        n[f].push(c)
                    }
                }
                for (var c = 0; c < f + 1; c++) {
                    var h = parseInt((i.buttonsHolderWidth - r[c]) / 2);
                    if (c > 0) o += e.totalHeight + i.vSpace;
                    for (var p = 0; p < n[c].length; p++) {
                        e = i.menuButtons_ar[n[c][p]];
                        if (p == 0) {
                            s = h
                        } else {
                            t = i.menuButtons_ar[n[c][p] - 1];
                            s = t.finalX + t.totalWidth + i.hSpace
                        }
                        e.finalX = s;
                        e.finalY = o + 4;
                        if (u < e.finalY) u = e.finalY;
                        i.buttonsBarTotalHeight = u + e.totalHeight + i.startY + 7;
                        e.setX(e.finalX);
                        e.setY(e.finalY)
                    }
                }
                i.totalHeight = i.buttonsBarTotalHeight;
                i.buttonsHolder_do.setWidth(i.buttonsHolderWidth);
                i.buttonsHolder_do.setHeight(i.buttonsBarTotalHeight + 15);
                i.setX(parseInt((i.viewportWidth - i.stageWidth) / 2));
                i.parent.style.height = i.totalHeight + 15 + "px"
            };
            this.disable = function() {
                for (var e = 0; e < i.totalButtons; e++) {
                    i.menuButtons_ar[e].disable()
                }
            };
            this.enable = function() {
                for (var e = 0; e < i.totalButtons; e++) {
                    if (e == i.curId) {
                        i.menuButtons_ar[e].disable()
                    } else {
                        i.menuButtons_ar[e].enable()
                    }
                }
            };
            i.init()
        };
    t.setPrototype = function() {
        t.prototype = new FWDS3DCovDisplayObject("div", "absolute", "visible")
    };
    t.CHANGE = "onChange";
    t.prototype = null;
    e.FWDS3DCovPresetsMenu = t
})(window)