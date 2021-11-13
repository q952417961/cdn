/*Superfish*/
(function($){var methods=function(){var c={bcClass:"sf-breadcrumb",menuClass:"sf-js-enabled",anchorClass:"sf-with-ul",menuArrowClass:"sf-arrows"},ios=function(){var ios=/iPhone|iPad|iPod/i.test(navigator.userAgent);if(ios)$(window).load(function(){$("body").children().on("click",$.noop)});return ios}(),wp7=function(){var style=document.documentElement.style;return"behavior"in style&&("fill"in style&&/iemobile/i.test(navigator.userAgent))}(),toggleMenuClasses=function($menu,o){var classes=c.menuClass;
if(o.cssArrows)classes+=" "+c.menuArrowClass;$menu.toggleClass(classes)},setPathToCurrent=function($menu,o){return $menu.find("li."+o.pathClass).slice(0,o.pathLevels).addClass(o.hoverClass+" "+c.bcClass).filter(function(){return $(this).children(o.popUpSelector).hide().show().length}).removeClass(o.pathClass)},toggleAnchorClass=function($li){$li.children("a").toggleClass(c.anchorClass)},toggleTouchAction=function($menu){var touchAction=$menu.css("ms-touch-action");touchAction=touchAction==="pan-y"?
"auto":"pan-y";$menu.css("ms-touch-action",touchAction)},applyHandlers=function($menu,o){var targets="li:has("+o.popUpSelector+")";if($.fn.hoverIntent&&!o.disableHI)$menu.hoverIntent(over,out,targets);else $menu.on("mouseenter.superfish",targets,over).on("mouseleave.superfish",targets,out);var touchevent="MSPointerDown.superfish";if(!ios)touchevent+=" touchend.superfish";if(wp7)touchevent+=" mousedown.superfish";$menu.on("focusin.superfish","li",over).on("focusout.superfish","li",out).on(touchevent,
"a",o,touchHandler)},touchHandler=function(e){var $this=$(this),$ul=$this.siblings(e.data.popUpSelector);if($ul.length>0&&$ul.is(":hidden")){$this.one("click.superfish",false);if(e.type==="MSPointerDown")$this.trigger("focus");else $.proxy(over,$this.parent("li"))()}},over=function(){var $this=$(this),o=getOptions($this);clearTimeout(o.sfTimer);$this.siblings().superfish("hide").end().superfish("show")},out=function(){var $this=$(this),o=getOptions($this);if(ios)$.proxy(close,$this,o)();else{clearTimeout(o.sfTimer);
o.sfTimer=setTimeout($.proxy(close,$this,o),o.delay)}},close=function(o){o.retainPath=$.inArray(this[0],o.$path)>-1;this.superfish("hide");if(!this.parents("."+o.hoverClass).length){o.onIdle.call(getMenu(this));if(o.$path.length)$.proxy(over,o.$path)()}},getMenu=function($el){return $el.closest("."+c.menuClass)},getOptions=function($el){return getMenu($el).data("sf-options")};return{hide:function(instant){if(this.length){var $this=this,o=getOptions($this);if(!o)return this;var not=o.retainPath===
true?o.$path:"",$ul=$this.find("li."+o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children(o.popUpSelector),speed=o.speedOut;if(instant){$ul.show();speed=0}o.retainPath=false;o.onBeforeHide.call($ul);$ul.stop(true,true).animate(o.animationOut,speed,function(){var $this=$(this);o.onHide.call($this)})}return this},show:function(){var o=getOptions(this);if(!o)return this;var $this=this.addClass(o.hoverClass),$ul=$this.children(o.popUpSelector);o.onBeforeShow.call($ul);$ul.stop(true,true).animate(o.animation,
o.speed,function(){o.onShow.call($ul)});return this},destroy:function(){return this.each(function(){var $this=$(this),o=$this.data("sf-options"),$hasPopUp;if(!o)return false;$hasPopUp=$this.find(o.popUpSelector).parent("li");clearTimeout(o.sfTimer);toggleMenuClasses($this,o);toggleAnchorClass($hasPopUp);toggleTouchAction($this);$this.off(".superfish").off(".hoverIntent");$hasPopUp.children(o.popUpSelector).attr("style",function(i,style){return style.replace(/display[^;]+;?/g,"")});o.$path.removeClass(o.hoverClass+
" "+c.bcClass).addClass(o.pathClass);$this.find("."+o.hoverClass).removeClass(o.hoverClass);o.onDestroy.call($this);$this.removeData("sf-options")})},init:function(op){return this.each(function(){var $this=$(this);if($this.data("sf-options"))return false;var o=$.extend({},$.fn.superfish.defaults,op),$hasPopUp=$this.find(o.popUpSelector).parent("li");o.$path=setPathToCurrent($this,o);$this.data("sf-options",o);toggleMenuClasses($this,o);toggleAnchorClass($hasPopUp);toggleTouchAction($this);applyHandlers($this,
o);$hasPopUp.not("."+c.bcClass).superfish("hide",true);o.onInit.call(this)})}}}();$.fn.superfish=function(method,args){if(methods[method])return methods[method].apply(this,Array.prototype.slice.call(arguments,1));else if(typeof method==="object"||!method)return methods.init.apply(this,arguments);else return $.error("Method "+method+" does not exist on jQuery.fn.superfish")};$.fn.superfish.defaults={popUpSelector:"ul,.sf-mega",hoverClass:"sfHover",pathClass:"overrideThisToUse",pathLevels:1,delay:800,
animation:{opacity:"show"},animationOut:{opacity:"hide"},speed:"normal",speedOut:"fast",cssArrows:true,disableHI:false,onInit:$.noop,onBeforeShow:$.noop,onShow:$.noop,onBeforeHide:$.noop,onHide:$.noop,onIdle:$.noop,onDestroy:$.noop};$.fn.extend({hideSuperfishUl:methods.hide,showSuperfishUl:methods.show})})(jQuery);

/* Sidr */
(function(e){var t=false,n=false;var r={isUrl:function(e){var t=new RegExp("^(https?:\\/\\/)?"+"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|"+"((\\d{1,3}\\.){3}\\d{1,3}))"+"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*"+"(\\?[;&a-z\\d%_.~+=-]*)?"+"(\\#[-a-z\\d_]*)?$","i");if(!t.test(e)){return false}else{return true}},loadContent:function(e,t){e.html(t)},addPrefix:function(e){var t=e.attr("id"),n=e.attr("class");if(typeof t==="string"&&""!==t){e.attr("id",t.replace(/([A-Za-z0-9_.\-]+)/g,"sidr-id-$1"))}if(typeof n==="string"&&""!==n&&"sidr-inner"!==n){e.attr("class",n.replace(/([A-Za-z0-9_.\-]+)/g,"sidr-class-$1"))}e.removeAttr("style")},execute:function(r,s,o){if(typeof s==="function"){o=s;s="sidr"}else if(!s){s="sidr"}var u=e("#"+s),a=e(u.data("body")),f=e("html"),l=u.outerWidth(true),c=u.data("speed"),h=u.data("side"),p=u.data("displace"),d=u.data("onOpen"),v=u.data("onClose"),m,g,y,b=s==="sidr"?"sidr-open":"sidr-open "+s+"-open";if("open"===r||"toggle"===r&&!u.is(":visible")){if(u.is(":visible")||t){return}if(n!==false){i.close(n,function(){i.open(s)});return}t=true;if(h==="left"){m={left:l+"px"};g={left:"0px"}}else{m={right:l+"px"};g={right:"0px"}}if(a.is("body")){y=f.scrollTop();f.css("overflow-x","hidden").scrollTop(y)}if(p){a.addClass("sidr-animating").css({width:a.width(),position:"absolute"}).animate(m,c,function(){e(this).addClass(b)})}else{setTimeout(function(){e(this).addClass(b)},c)}u.css("display","block").animate(g,c,function(){t=false;n=s;if(typeof o==="function"){o(s)}a.removeClass("sidr-animating")});d()}else{if(!u.is(":visible")||t){return}t=true;if(h==="left"){m={left:0};g={left:"-"+l+"px"}}else{m={right:0};g={right:"-"+l+"px"}}if(a.is("body")){y=f.scrollTop();f.removeAttr("style").scrollTop(y)}a.addClass("sidr-animating").animate(m,c).removeClass(b);u.animate(g,c,function(){u.removeAttr("style").hide();a.removeAttr("style");e("html").removeAttr("style");t=false;n=false;if(typeof o==="function"){o(s)}a.removeClass("sidr-animating")});v()}}};var i={open:function(e,t){r.execute("open",e,t)},close:function(e,t){r.execute("close",e,t)},toggle:function(e,t){r.execute("toggle",e,t)},toogle:function(e,t){r.execute("toggle",e,t)}};e.sidr=function(t){if(i[t]){return i[t].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof t==="function"||typeof t==="string"||!t){return i.toggle.apply(this,arguments)}else{e.error("Method "+t+" does not exist on jQuery.sidr")}};e.fn.sidr=function(t){var n=e.extend({name:"sidr",speed:200,side:"left",source:null,renaming:true,body:"body",displace:true,onOpen:function(){},onClose:function(){}},t);var s=n.name,o=e("#"+s);if(o.length===0){o=e("<div />").attr("id",s).appendTo(e("body"))}o.addClass("sidr").addClass(n.side).data({speed:n.speed,side:n.side,body:n.body,displace:n.displace,onOpen:n.onOpen,onClose:n.onClose});if(typeof n.source==="function"){var u=n.source(s);r.loadContent(o,u)}else if(typeof n.source==="string"&&r.isUrl(n.source)){e.get(n.source,function(e){r.loadContent(o,e)})}else if(typeof n.source==="string"){var a="",f=n.source.split(",");e.each(f,function(t,n){a+='<div class="sidr-inner">'+e(n).html()+"</div>"});if(n.renaming){var l=e("<div />").html(a);l.find("*").each(function(t,n){var i=e(n);r.addPrefix(i)});a=l.html()}r.loadContent(o,a)}else if(n.source!==null){e.error("Invalid Sidr Source")}return this.each(function(){var t=e(this),n=t.data("sidr");if(!n){t.data("sidr",s);if("ontouchstart"in document.documentElement){t.bind("touchstart",function(e){var t=e.originalEvent.touches[0];this.touched=e.timeStamp});t.bind("touchend",function(e){var t=Math.abs(e.timeStamp-this.touched);if(t<200){e.preventDefault();i.toggle(s)}})}else{t.click(function(e){e.preventDefault();i.toggle(s)})}}})}})(jQuery);

$(document).ready(function(){
	// Main menu superfish
	$('ul.nav-menu').superfish({
		delay: 200,
		animation: {opacity:'show', height:'show'},
		speed: 'fast'
	});

	// Mobile Menu
	$('#navigation-toggle').sidr({
		name: 'sidr-main',
		source: '#sidr-menu, #sidr-close, #site-nav',
		side: 'left',
		displace: false
	});

	$(".sidr-class-toggle-sidr-close").click( function() {
		$.sidr('close', 'sidr-main');
		return false;
	});
});