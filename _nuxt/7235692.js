(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{1261:function(t,e,n){"use strict";n.r(e);n(92);var o=n(32),r=n(31),c=n(47),l=n(43),f=n(30),d=n(14),h=(n(18),n(4),n(26),n(485));function w(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(f.a)(t);if(e){var r=Object(f.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(l.a)(this,n)}}var v=function(t,e,n,desc){var o,r=arguments.length,c=r<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(r<3?o(c):r>3?o(e,n,c):o(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c},j=n(826),m=function(t){Object(c.a)(n,t);var e=w(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"mounted",value:function(){var t=this.$route.params.id,e=[],n={};n.manifestId="".concat("https://ocr.aws.ldas.jp","/v1/manifest/").concat(t,".json"),n.thumbnailNavigationPosition="far-right",e.push(n),j.default.viewer({id:"mirador",language:this.$i18n.locale,theme:{transitions:"4488"===window.location.port?{create:function(){return"none"}}:{}},window:{highlightAllAnnotations:!0,sideBarOpen:!0,defaultSideBarPanel:"annotations",allowClose:!1,allowMaximize:!1,allowFullscreen:!0,hideWindowTitle:!1},workspaceControlPanel:{enabled:!1},windows:e})}}]),n}(h.Vue),y=m=v([Object(h.Component)({components:{},layout:"blank"})],m),O=n(81),component=Object(O.a)(y,(function(){var t=this.$createElement;return(this._self._c||t)("div",{staticStyle:{position:"absolute",top:"0",bottom:"0",left:"0",right:"0"},attrs:{id:"mirador"}})}),[],!1,null,null,null);e.default=component.exports}}]);