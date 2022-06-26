(function(f){var e=f._AP?_AP:(f.RA=f.AP={});
var d={};
e.define=function(i,k,h){var j=c(i),g;
if(!h){h=k;
k=[]
}if(h){g=typeof h!=="function"?function(){return h
}:h;
b(k,function(){var m=g.apply(f,arguments);
if(m){if(typeof m==="function"){j.exports.__target__=m
}for(var l in m){if(m.hasOwnProperty(l)){j.exports[l]=m[l]
}}}})
}};
e.require=function(g,h){b(typeof g==="string"?[g]:g,h)
};
function b(l,m){var j=[],h=0,g=l.length;
function k(p){j.push(p);
if(j.length===g){var n=[],o=0;
for(;
o<g;
o+=1){n[o]=j[o].exports
}if(m){m.apply(f,n)
}}}if(l&&l.length>0){for(;
h<g;
h+=1){a(l[h],k)
}}else{if(m){m()
}}}function a(g,h){h(c(g))
}function c(g){return d[g]=d[g]||{name:g,exports:function(){function h(){var i=h.__target__;
if(i){return i.apply(f,arguments)
}}return h
}()}
}}(this));
AP.define("_util",function(){function c(g,f){var d,e;
if(g){d=g.length;
if(d!=null&&typeof g!=="function"){e=0;
while(e<d){if(f.call(g[e],e,g[e])===false){break
}e+=1
}}else{for(e in g){if(g.hasOwnProperty(e)){if(f.call(g[e],e,g[e])===false){break
}}}}}}function a(d,e){d+="EventListener";
e+="Event";
return function(g,h,f){if(g[d]){g[d](h,f,false)
}else{if(g[e]){g[e]("on"+h,f)
}}}
}function b(){var e=this.console;
if(e&&e.log){var f=[].slice.call(arguments);
if(e.log.apply){e.log.apply(e,f)
}else{for(var g=0,d=f.length;
g<d;
g+=1){f[g]=JSON.stringify(f[g])
}e.log(f.join(" "))
}return true
}}return{each:c,extend:function(e){var d=arguments,f=[].slice.call(d,1,d.length);
c(f,function(g,h){c(h,function(j,i){e[j]=i
})
});
return e
},bind:a("add","attach"),unbind:a("remove","detach"),trim:function(d){return d&&d.replace(/^\s+|\s+$/g,"")
},debounce:function(d,f){var e;
return function(){var g=this,i=[].slice.call(arguments);
function h(){e=null;
d.apply(g,i)
}if(e){clearTimeout(e)
}e=setTimeout(h,f||50)
}
},inArray:function(g,h,f){var e=f>>>0,d=h.length>>>0;
for(;
e<d;
e+=1){if(h[e]===g){return e
}}return -1
},isFunction:function(d){return typeof d==="function"
},log:b,handleError:function(d){if(!b.apply(this,d&&d.message?[d,d.message]:[d])){throw d
}}}
});
AP.define("_dollar",["_util"],function(b){var e=b.each,f=b.extend,c=this,a=c.document;
function d(j,i){i=i||a;
var h=[];
if(j){if(typeof j==="string"){var g=i.querySelectorAll(j);
e(g,function(l,k){h.push(k)
})
}else{if(j.nodeType===1){h.push(j)
}else{if(j===c){h.push(j)
}}}}f(h,{each:function(k){e(this,k);
return this
},bind:function(k,l){this.each(function(m,n){b.bind(n,k,l)
})
},attr:function(m){var l;
this.each(function(k,n){l=n[m]||(n.getAttribute&&n.getAttribute(m));
return !l
});
return l
},removeClass:function(k){return this.each(function(l,m){if(m.className){m.className=m.className.replace(new RegExp("(^|\\s)"+k+"(\\s|$)")," ")
}})
},html:function(k){return this.each(function(l,m){m.innerHTML=k
})
},append:function(k){return this.each(function(l,n){var m=i.createElement(k.tag);
e(k,function(p,o){if(p==="$text"){if(m.styleSheet){m.styleSheet.cssText=o
}else{m.appendChild(i.createTextNode(o))
}}else{if(p!=="tag"){m[p]=o
}}});
n.appendChild(m)
})
}});
return h
}return f(d,b)
});
(window.AP||window._AP).define("_events",["_dollar"],function(f){var b=window,d=f.log||(b.AJS&&b.AJS.log);
function a(h,g){this._key=h;
this._origin=g;
this._events={};
this._any=[]
}var e=a.prototype;
e.listeners=function(g){return[].slice.call(this._events[g]||[])
};
e.on=function(g,h){if(g&&h){this._listeners(g).push(h)
}return this
};
e.once=function(h,i){var g=this;
var j=function(){g.off(h,j);
i.apply(null,arguments)
};
this.on(h,j);
return this
};
e.onAny=function(g){this._any.push(g);
return this
};
e.off=function(g,k){var j=this._events[g];
if(j){var h=j.indexOf(k);
if(h>=0){j.splice(h,1)
}if(j.length===0){delete this._events[g]
}}return this
};
e.offAll=function(g){if(g){delete this._events[g]
}else{this._events={}
}return this
};
e.offAny=function(j){var h=this._any;
var g=h.indexOf(j);
if(g>=0){h.splice(g,1)
}return this
};
e.active=function(){var g=[];
f.each(this._events,function(i,h){if(h&&h.length>0){g.push(i)
}});
return g
};
e.emit=function(g){return this._emitEvent(this._event.apply(this,arguments))
};
e._event=function(g){return{name:g,args:[].slice.call(arguments,1),attrs:{},source:{key:this._key,origin:this._origin}}
};
e._emitEvent=function(h){var g=h.args.concat(h);
c(this._listeners(h.name),g);
c(this._any,[h.name].concat(g));
return this
};
e._listeners=function(g){return this._events[g]=this._events[g]||[]
};
function c(h,g){f.each(h,function(){try{this.apply(null,g)
}catch(i){d(i.stack||i.message||i)
}})
}return{Events:a}
});
(this.AP||this._AP).define("_xdm",["_dollar","_events"],function(g,p){var o=window,d=g(o),l=o.location.toString(),e=k(l),m=0,i=g.isFunction;
function h(J,L){var x,z,M,G,O,B,y,F,H,v=L.local||{},t=L.remote||[];
var C=function(){var P={};
return{add:function(S,R,Q){P[S]={done:R||null,fail:Q||null,async:!!R}
},invoke:function(S,R,Q){var T;
if(P[R]){if(P[R][S]){P[R][S](Q);
T=true
}else{T=!P[R].async&&S!=="fail"
}delete P[R]
}return T
}}
}();
if(!/xdm_e/.test(l)){var u=n(J);
M=u.contentWindow;
y=c(J.remote,"oauth_consumer_key");
F=J.remoteKey;
H=F;
G=k(J.remote);
O=J.channel;
B={isHost:true,iframe:u,destroy:function(){r();
if(x.iframe){g(x.iframe).remove();
delete x.iframe
}},isActive:function(){return g.contains(document.documentElement,x.iframe)
}}
}else{M=o.parent;
y="local";
F=c(l,"oauth_consumer_key");
H=y;
G=c(l,"xdm_e");
O=c(l,"xdm_c");
B={isActive:function(){return true
}}
}z=H+"|"+(m+=1);
x=g.extend({id:z,remoteOrigin:G,channel:O},B);
function s(P,R,S){try{M.postMessage(JSON.stringify({c:O,i:P,t:R,m:S}),G)
}catch(Q){f(j(Q))
}}function K(S,T,R,Q){var P=Math.floor(Math.random()*1000000000).toString(16);
C.add(P,R,Q);
s(P,"request",{n:S,a:T})
}function I(P,Q){s(P,"done",Q)
}function A(P,Q){s(P,"fail",Q)
}function D(V){try{var Z=JSON.parse(V.data),T=Z.i,U=Z.c,ab=Z.t,aa=Z.m;
if(V.source!==M||V.origin!==G||U!==O){return
}if(ab==="request"){var P=aa.n,X=aa.a,Y=v[P],S,Q,R;
if(Y){S=function(ac){I(T,ac)
};
Q=function(ac){A(T,ac)
};
R=(X?X.length:0)<Y.length;
try{if(R){Y.apply(v,X.concat([S,Q]))
}else{S(Y.apply(v,X))
}}catch(W){Q(j(W))
}}else{a("Unhandled request:",Z)
}}else{if(ab==="done"||ab==="fail"){if(!C.invoke(ab,T,aa)){a("Unhandled response:",ab,T,aa)
}}}}catch(W){f(j(W))
}}function q(P){return function(){var S=[].slice.call(arguments),R,Q;
function T(){if(i(S[S.length-1])){return S.pop()
}}Q=T();
R=T();
if(!R){R=Q;
Q=undefined
}K(P,S,R,Q)
}
}g.each(t,function(Q,P){if(typeof Q==="number"){Q=P
}x[Q]=q(Q)
});
var w=x.events=new p.Events(y,e);
w.onAny(function(){var Q=arguments[arguments.length-1];
var R=Q.trace=Q.trace||{};
var P=z+"|xdm";
if((x.isHost&&!R[P]&&Q.source.channel!==z)||(!x.isHost&&Q.source.key===y)){R[P]=true;
Q=g.extend({},Q);
delete Q.trace;
a("Forwarding "+(x.isHost?"host":"addon")+" event:",Q);
K("_event",[Q])
}});
v._event=function(P){delete P.trace;
if(x.isHost){P.source={channel:z,key:F,origin:G}
}a("Receiving "+(x.isHost?"addon":"host")+" event:",P);
w._emitEvent(P)
};
function E(P){if(x.isActive()){D(P.originalEvent?P.originalEvent:P)
}else{r()
}}function N(){d.bind("message",E)
}function r(){d.unbind("message",E)
}N();
return x
}function c(r,q){return decodeURIComponent(RegExp(q+"=([^&]+)").exec(r)[1])
}function k(s){var q=s.toLowerCase().match(/^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/),t=q[2],u=q[3],r=q[4]||"";
if((t==="http:"&&r===":80")||(t==="https:"&&r===":443")){r=""
}return t+"//"+u+r
}function b(s,t){var r=s,q=/\?/.test(s)?"&":"?";
g.each(t,function(w,u){r+=q+encodeURIComponent(w)+"="+encodeURIComponent(u);
q="&"
});
return r
}function n(q){var r=document.createElement("iframe"),t="easyXDM_"+q.container+"_provider";
var s=b(q.remote,{xdm_e:e,xdm_c:q.channel,xdm_p:1});
g.extend(r,{id:t,name:t,frameBorder:"0"},q.props);
g("#"+q.container).append(r);
r.src=s;
return r
}function j(q){return q.message||q.toString()
}function a(){if(h.debug){f.apply(o,["DEBUG:"].concat([].slice.call(arguments)))
}}function f(){var q=g.log||(o.AJS&&o.AJS.log);
if(q){q.apply(o,arguments)
}}return h
});
AP.define("_rpc",["_dollar","_xdm"],function(b,c){var l=b.each,j=b.extend,d=b.isFunction,k={},e,f={},a=["init"],g={},i=[],h;
return{extend:function(m){if(d(m)){m=m(k)
}j(f,m.apis);
j(g,m.internals);
a=a.concat(m.stubs||[]);
var n=m.init;
if(d(n)){i.push(n)
}return m.apis
},init:function(m){m=m||{};
if(!h){l(f,function(n){a.push(n)
});
e=this.rpc=new c({},{remote:a,local:g});
e.init();
j(k,e);
l(i,function(n,p){try{p(j({},m))
}catch(o){b.handleError(o)
}});
h=true
}}}
});
AP.define("events",["_dollar","_rpc"],function(a,b){return b.extend(function(d){var c={};
a.each(["listeners","on","once","onAny","off","offAll","offAny","active","emit"],function(f,e){c[e]=function(){var g=d.events;
g[e].apply(g,arguments);
return c
}
});
return{apis:c}
})
});
AP.define("env",["_dollar","_rpc"],function(b,c){var a=c.extend(function(d){return{apis:{getLocation:function(e){d.getLocation(e)
},getUser:function(e){d.getUser(e)
},getTimeZone:function(e){d.getTimeZone(e)
},fireEvent:function(f,e){console.log("AP.fireEvent deprecated; will be removed in future version")
},showMessage:function(g,f,e){d.showMessage(g,f,e)
},clearMessage:function(e){d.clearMessage(e)
},resize:b.debounce(function(f,e){var g=a.size(f,e,a.container());
d.resize(g.w,g.h)
},50)}}
});
return b.extend(a,{meta:function(d){return b("meta[name='ap-"+d+"']").attr("content")
},container:function(){var d=b(".ac-content, #content");
return d.length>0?d[0]:document.body
},localUrl:function(d){return this.meta("local-base-url")+(d==null?"":d)
},size:function(j,d,f){var e=j==null?"100%":j,i,g;
if(d){i=d
}else{g=Math.max(f.scrollHeight,document.documentElement.scrollHeight,f.offsetHeight,document.documentElement.offsetHeight,f.clientHeight,document.documentElement.clientHeight);
if(f===document.body){i=g
}else{i=Math.max(f.offsetHeight,f.clientHeight);
if(i===0){i=g
}}}return{w:e,h:i}
}})
});
AP.define("request",["_dollar","_rpc"],function(d,e){var c=d.each,f=d.extend;
function b(g){var i=f({},g);
var h=g.headers||{};
delete i.headers;
return f(i,{getResponseHeader:function(j){var k=null;
if(j){j=j.toLowerCase();
c(h,function(m,l){if(m.toLowerCase()===j){k=l;
return false
}})
}return k
},getAllResponseHeaders:function(){var j="";
c(h,function(m,l){j+=(j?"\r\n":"")+m+": "+l
});
return j
}})
}var a=e.extend(function(g){return{apis:{request:function(l,k){var m,j;
function i(o){return m(o[0],o[1],b(o[2]))
}function h(o){return j(b(o[0]),o[1],o[2])
}if(typeof l==="object"){k=l
}else{if(!k){k={url:l}
}else{k.url=l
}}function n(){}m=k.success||n;
delete k.success;
j=k.error||n;
delete k.error;
g.request(k,i,h)
}}}
});
return a.request
});
AP.define("dialog",["_dollar","_rpc"],function(c,d){var a=window.location.toString().indexOf("dialog=1")>0,b;
d.extend(function(f){var e={};
b={create:function(g){f.createDialog(g);
return{on:function(h,i){f.events.once("dialog."+h,i)
}}
},close:function(g){f.events.emit("dialog.close",g);
f.closeDialog()
},isDialog:a,onDialogMessage:function(g,h){this.getButton(g).bind(h)
},getButton:function(g){return{name:g,enable:function(){f.setDialogButtonEnabled(g,true)
},disable:function(){f.setDialogButtonEnabled(g,false)
},toggle:function(){var h=this;
h.isEnabled(function(i){h[i?"disable":"enable"](g)
})
},isEnabled:function(h){f.isDialogButtonEnabled(g,h)
},bind:function(i){var h=e[g];
if(!h){h=e[g]=[]
}h.push(i)
},trigger:function(){var j=this,i=true,h=true,k=e[g];
c.each(k,function(l,m){h=m.call(j,{button:j,stopPropagation:function(){i=false
}});
return i
});
return !!h
}}
}};
return{internals:{dialogMessage:function(h){var g=true;
try{if(a){g=b.getButton(h).trigger()
}else{c.handleError("Received unexpected dialog button event from host:",h)
}}catch(i){c.handleError(i)
}return g
}},stubs:["setDialogButtonEnabled","isDialogButtonEnabled","createDialog","closeDialog"]}
});
return b
});
(window.AP||window._AP).define("_resize_listener",["_dollar"],function(b){function c(e,g,f){var d=g=="over";
e.addEventListener("OverflowEvent" in window?"overflowchanged":g+"flow",function(h){if(h.type==(g+"flow")||((h.orient==0&&h.horizontalOverflow==d)||(h.orient==1&&h.verticalOverflow==d)||(h.orient==2&&h.horizontalOverflow==d&&h.verticalOverflow==d))){h.flow=g;
return f.call(this,h)
}},false)
}function a(f,j){var d="onresize" in f;
if(!d&&!f._resizeSensor){b("head").append({tag:"style",type:"text/css",$text:".ac-resize-sensor,.ac-resize-sensor>div {position: absolute;top: 0;left: 0;width: 100%;height: 100%;overflow: hidden;z-index: -1;}"});
var e=f._resizeSensor=document.createElement("div");
e.className="ac-resize-sensor";
e.innerHTML='<div class="ac-resize-overflow"><div></div></div><div class="ac-resize-underflow"><div></div></div>';
var k=0,i=0,h=e.firstElementChild.firstChild,l=e.lastElementChild.firstChild,g=function(p){var q=false,o=f.offsetWidth;
if(k!=o){h.style.width=o-1+"px";
l.style.width=o+1+"px";
q=true;
k=o
}var n=f.offsetHeight;
if(i!=n){h.style.height=n-1+"px";
l.style.height=n+1+"px";
q=true;
i=n
}if(q&&p.currentTarget!=f){var p=document.createEvent("Event");
p.initEvent("resize",true,true);
f.dispatchEvent(p)
}};
if(getComputedStyle(f).position==="static"){f.style.position="relative";
f._resizeSensor._resetPosition=true
}c(e,"over",g);
c(e,"under",g);
c(e.firstElementChild,"over",g);
c(e.lastElementChild,"under",g);
f.appendChild(e);
g({})
}var m=f._flowEvents||(f._flowEvents=[]);
if(b.inArray(j,m)==-1){m.push(j)
}if(!d){f.addEventListener("resize",j,false)
}f.onresize=function(n){b.each(m,function(o,p){p.call(f,n)
})
}
}return{addListener:a}
});
AP.define("jira",["_dollar","_rpc"],function(b,g){function f(){return decodeURI(RegExp("remoteWorkflowPostFunctionUUID=([0-9a-z-]+)").exec(document.location)[1])
}var e,d;
var c={onSaveValidation:function(h){d=h
},onSave:function(h){e=h
},trigger:function(){var i=d.call(),h;
return{valid:i,uuid:i?f():h,value:i?""+e.call():h}
}};
var a=g.extend(function(h){return{apis:{getWorkflowConfiguration:function(i){h.getWorkflowConfiguration(f(),i)
}},internals:{setWorkflowConfigurationMessage:function(){return c.trigger()
}}}
});
return b.extend(a,{WorkflowConfiguration:c})
});
AP.define("confluence",["_dollar","_rpc"],function(a,b){return b.extend(function(c){return{apis:{saveMacro:function(d){c.saveMacro(d)
},closeMacroEditor:function(){c.closeMacroEditor()
}}}
})
});
AP.require(["_dollar","_rpc","_resize_listener","env","request","dialog","jira"],function(e,f,k,g,d,h,c){function a(){g.getLocation(function(m){e("head").append({tag:"base",href:m,target:"_parent"})
})
}function j(){var m=h.isDialog?"10px 10px 0 10px":"0";
e("head").append({tag:"style",type:"text/css",$text:"body {margin: "+m+" !important;}"})
}f.extend({init:function(m){if(m.margin!==false){j(m)
}if(m.base===true){a(m)
}if(m.resize!==false){var n=m.resize;
n=n==="auto"?125:+n;
if(n>=0&&n<60){n=60
}if(!h.isDialog&&n>0){e.bind(window,"load",function(){var o;
setInterval(function(){var p=g.size();
if(!o||o.w!==p.w||o.h!==p.h){g.resize(p.w,p.h);
o=p
}},n)
})
}else{e.bind(window,"load",function(){g.resize();
var o=g.container();
if(o){k.addListener(o,function(){g.resize()
})
}else{e.log("Your page should have a root block element with an ID called #content or class called .ac-content if you want your page to dynamically resize after the initial load.")
}})
}}}});
e.extend(AP,g,c,{Meta:{get:g.meta},request:d,Dialog:h});
var l={},b=e("script[src*='/atlassian-connect/all']");
if(b&&/\/atlassian-connect\/all(-debug)?\.js($|\?)/.test(b.attr("src"))){var i=b.attr("data-options");
if(i){e.each(i.split(";"),function(r,q){var m=e.trim;
q=m(q);
if(q){var p=q.split(":"),o=m(p[0]),n=m(p[1]);
if(o&&n!=null){l[o]=n==="true"||n==="false"?n==="true":n
}}})
}}f.init(l)
});
