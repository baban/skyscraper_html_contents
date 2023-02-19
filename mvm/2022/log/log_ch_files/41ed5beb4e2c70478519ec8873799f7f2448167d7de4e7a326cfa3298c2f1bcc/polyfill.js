/* Polyfill service v4.4.0
 * Disable minification (remove `.min` from URL path) for more info */

(function(self, undefined) {function Call(t,l){var n=arguments.length>2?arguments[2]:[];if(!1===IsCallable(t))throw new TypeError(Object.prototype.toString.call(t)+"is not a function.");return t.apply(l,n)}function CreateMethodProperty(e,r,t){var a={value:t,writable:!0,enumerable:!1,configurable:!0};Object.defineProperty(e,r,a)}function Get(n,t){return n[t]}function IsCallable(n){return"function"==typeof n}function RequireObjectCoercible(e){if(null===e||void 0===e)throw TypeError(Object.prototype.toString.call(e)+" is not coercible to Object.");return e}function SameValueNonNumber(e,n){return e===n}function ToBoolean(o){return Boolean(o)}function ToObject(r){if(null===r||void 0===r)throw TypeError();return Object(r)}function GetV(t,e){return ToObject(t)[e]}function GetMethod(e,l){var t=GetV(e,l);if(null!==t&&void 0!==t){if(!1===IsCallable(t))throw new TypeError("Method not callable: "+l);return t}}function Type(e){switch(typeof e){case"undefined":return"undefined";case"boolean":return"boolean";case"number":return"number";case"string":return"string";case"symbol":return"symbol";default:return null===e?"null":"Symbol"in self&&(e instanceof self.Symbol||e.constructor===self.Symbol)?"symbol":"object"}}function IsRegExp(e){if("object"!==Type(e))return!1;var t="Symbol"in self&&"match"in self.Symbol?Get(e,self.Symbol.match):void 0;if(void 0!==t)return ToBoolean(t);try{var l=e.lastIndex;return e.lastIndex=0,RegExp.prototype.exec.call(e),!0}catch(e){}finally{e.lastIndex=l}return!1}function OrdinaryToPrimitive(r,t){if("string"===t)var e=["toString","valueOf"];else e=["valueOf","toString"];for(var i=0;i<e.length;++i){var n=e[i],a=Get(r,n);if(IsCallable(a)){var o=Call(a,r);if("object"!==Type(o))return o}}throw new TypeError("Cannot convert to primitive.")}function SameValueZero(e,a){return Type(e)===Type(a)&&("number"===Type(e)?!(!isNaN(e)||!isNaN(a))||(1/e==1/0&&1/a==-1/0||(1/e==-1/0&&1/a==1/0||e===a)):SameValueNonNumber(e,a))}function ToInteger(r){if("symbol"===Type(r))throw new TypeError("Cannot convert a Symbol value to a number");var o=Number(r);return isNaN(o)?0:1/o==1/0||1/o==-1/0||o===1/0||o===-1/0?o:(o<0?-1:1)*Math.floor(Math.abs(o))}function ToLength(n){var t=ToInteger(n);return t<=0?0:Math.min(t,Math.pow(2,53)-1)}function ToPrimitive(e){var t=arguments.length>1?arguments[1]:void 0;if("object"===Type(e)){if(arguments.length<2)var i="default";else t===String?i="string":t===Number&&(i="number");var r="function"==typeof self.Symbol&&"symbol"==typeof self.Symbol.toPrimitive?GetMethod(e,self.Symbol.toPrimitive):void 0;if(void 0!==r){var o=Call(r,e,[i]);if("object"!==Type(o))return o;throw new TypeError("Cannot convert exotic object to primitive.")}return"default"===i&&(i="number"),OrdinaryToPrimitive(e,i)}return e}function ToString(t){switch(Type(t)){case"symbol":throw new TypeError("Cannot convert a Symbol value to a string");case"object":return ToString(ToPrimitive(t,String));default:return String(t)}}function ToPropertyKey(r){var i=ToPrimitive(r,String);return"symbol"===Type(i)?i:ToString(i)}if (!("includes"in Array.prototype
)) {CreateMethodProperty(Array.prototype,"includes",function e(r){"use strict";var t=ToObject(this),o=ToLength(Get(t,"length"));if(0===o)return!1;var n=ToInteger(arguments[1]);if(n>=0)var a=n;else(a=o+n)<0&&(a=0);for(;a<o;){var i=Get(t,ToString(a));if(SameValueZero(r,i))return!0;a+=1}return!1});}if (!("freeze"in Object
)) {CreateMethodProperty(Object,"freeze",function e(r){return r});}if (!("getOwnPropertyDescriptor"in Object&&"function"==typeof Object.getOwnPropertyDescriptor&&function(){try{return"3"===Object.getOwnPropertyDescriptor("13.7",1).value}catch(t){return!1}}()
)) {!function(){var t=Object.getOwnPropertyDescriptor,r={}.toString,e="".split;CreateMethodProperty(Object,"getOwnPropertyDescriptor",function o(n,c){var i=ToObject(n);i=("string"===Type(i)||i instanceof String)&&"[object String]"==r.call(n)?e.call(n,""):Object(n);var p=ToPropertyKey(c);return t(i,p)})}();}if (!("keys"in Object&&function(){return 2===Object.keys(arguments).length}(1,2)&&function(){try{return Object.keys(""),!0}catch(t){return!1}}()
)) {CreateMethodProperty(Object,"keys",function(){"use strict";function t(){var t;try{t=Object.create({})}catch(t){return!0}return o.call(t,"__proto__")}function r(t){var r=n.call(t),e="[object Arguments]"===r;return e||(e="[object Array]"!==r&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===n.call(t.callee)),e}var e=Object.prototype.hasOwnProperty,n=Object.prototype.toString,o=Object.prototype.propertyIsEnumerable,c=!o.call({toString:null},"toString"),l=o.call(function(){},"prototype"),i=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],u=function(t){var r=t.constructor;return r&&r.prototype===t},a={$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},f=function(){if("undefined"==typeof window)return!1;for(var t in window)try{if(!a["$"+t]&&e.call(window,t)&&null!==window[t]&&"object"==typeof window[t])try{u(window[t])}catch(t){return!0}}catch(t){return!0}return!1}(),p=function(t){if("undefined"==typeof window||!f)return u(t);try{return u(t)}catch(t){return!1}};return function o(u){var a="[object Function]"===n.call(u),f=r(u),s="[object String]"===n.call(u),y=[];if(void 0===u||null===u)throw new TypeError("Cannot convert undefined or null to object");var h=l&&a;if(s&&u.length>0&&!e.call(u,0))for(var g=0;g<u.length;++g)y.push(String(g));if(f&&u.length>0)for(var w=0;w<u.length;++w)y.push(String(w));else for(var $ in u)t()&&"__proto__"===$||h&&"prototype"===$||!e.call(u,$)||y.push(String($));if(c)for(var d=p(u),b=0;b<i.length;++b)d&&"constructor"===i[b]||!e.call(u,i[b])||y.push(i[b]);return y}}());}if (!("assign"in Object
)) {CreateMethodProperty(Object,"assign",function t(e,r){var o=ToObject(e);if(1===arguments.length)return o;var c,a,l,n,i=Array.prototype.slice.call(arguments,1);for(c=0;c<i.length;c++){var p=i[c];for(void 0===p||null===p?l=[]:(n="[object String]"===Object.prototype.toString.call(p)?String(p).split(""):ToObject(p),l=Object.keys(n)),a=0;a<l.length;a++){var b,y=l[a];try{var g=Object.getOwnPropertyDescriptor(n,y);b=void 0!==g&&!0===g.enumerable}catch(t){b=Object.prototype.propertyIsEnumerable.call(n,y)}if(b){var j=Get(n,y);o[y]=j}}}return o});}if (!("getOwnPropertyNames"in Object&&function(){try{return Object.getOwnPropertyNames(1),!0}catch(t){return!1}}()
)) {!function(){var t={}.toString,e="".split,r=[].concat,o=Object.prototype.hasOwnProperty,c=Object.getOwnPropertyNames||Object.keys,n="object"==typeof self?c(self):[];CreateMethodProperty(Object,"getOwnPropertyNames",function l(a){var p=ToObject(a);if("[object Window]"===t.call(p))try{return c(p)}catch(t){return r.call([],n)}p="[object String]"==t.call(p)?e.call(p,""):Object(p);for(var i=c(p),s=["length","prototype"],O=0;O<s.length;O++){var b=s[O];o.call(p,b)&&!i.includes(b)&&i.push(b)}if(i.includes("__proto__")){var f=i.indexOf("__proto__");i.splice(f,1)}return i})}();}if (!("includes"in String.prototype
)) {CreateMethodProperty(String.prototype,"includes",function t(e){"use strict";var r=arguments.length>1?arguments[1]:void 0,n=RequireObjectCoercible(this),o=ToString(n);if(IsRegExp(e))throw new TypeError("First argument to String.prototype.includes must not be a regular expression");var i=ToString(e),g=ToInteger(r),a=o.length,p=Math.min(Math.max(g,0),a);return-1!==String.prototype.indexOf.call(o,i,p)});}if (!("Symbol"in self&&0===self.Symbol.length
)) {!function(r,t,n){"use strict";function e(r){if("symbol"===Type(r))return r;throw TypeError(r+" is not a symbol")}var o,u=0,i=""+Math.random(),a="__symbol:",l=a.length,c="__symbol@@"+i,f={},s="defineProperty",v="defineProperties",y="getOwnPropertyNames",b="getOwnPropertyDescriptor",h="propertyIsEnumerable",p=r.prototype,m=p.hasOwnProperty,g=p[h],d=p.toString,w=Array.prototype.concat,S=r.getOwnPropertyNames?r.getOwnPropertyNames(self):[],P=r[y],O=function r(t){if("[object Window]"===d.call(t))try{return P(t)}catch(r){return w.call([],S)}return P(t)},j=r[b],E=r.create,N=r.keys,T=r.freeze||r,_=r[s],k=r[v],F=j(r,y),I=function(r,t,n){if(!m.call(r,c))try{_(r,c,{enumerable:!1,configurable:!1,writable:!1,value:{}})}catch(t){r[c]={}}r[c]["@@"+t]=n},x=function(r,t){var n=E(r);return O(t).forEach(function(r){W.call(t,r)&&K(n,r,t[r])}),n},z=function(r){var t=E(r);return t.enumerable=!1,t},A=function r(){},D=function(r){return r!=c&&!m.call(G,r)},M=function(r){return r!=c&&m.call(G,r)},W=function r(t){var n=""+t;return M(n)?m.call(this,n)&&this[c]&&this[c]["@@"+n]:g.call(this,t)},q=function(t){var n={enumerable:!1,configurable:!0,get:A,set:function(r){o(this,t,{enumerable:!1,configurable:!0,writable:!0,value:r}),I(this,t,!0)}};try{_(p,t,n)}catch(r){p[t]=n.value}G[t]=_(r(t),"constructor",H);var e=j(C.prototype,"description");return e&&_(G[t],"description",e),T(G[t])},B=function(r){var t=e(r);if(X){var n=U(t);if(""!==n)return n.slice(1,-1)}if(void 0!==f[t])return f[t];var o=t.toString(),u=o.lastIndexOf("0.");return""!==(o=o.slice(10,u))?o:void 0},C=function r(){var t=arguments[0];if(this instanceof r)throw new TypeError("Symbol is not a constructor");var n=a.concat(t||"",i,++u);return void 0===t||null!==t&&!isNaN(t)&&""!==String(t)||(f[n]=String(t)),q(n)},G=E(null),H={value:C},J=function(r){return G[r]},K=function r(t,n,e){var u=""+n;return M(u)?(o(t,u,e.enumerable?z(e):e),I(t,u,!!e.enumerable)):_(t,n,e),t},L=function(r){return function(t){return m.call(r,c)&&m.call(r[c],"@@"+t)}},Q=function r(t){return O(t).filter(t===p?L(t):M).map(J)};F.value=K,_(r,s,F),F.value=Q,_(r,"getOwnPropertySymbols",F),F.value=function r(t){return O(t).filter(D)},_(r,y,F),F.value=function r(t,n){var e=Q(n);return e.length?N(n).concat(e).forEach(function(r){W.call(n,r)&&K(t,r,n[r])}):k(t,n),t},_(r,v,F),F.value=W,_(p,h,F),F.value=C,_(n,"Symbol",F),F.value=function(r){var t=a.concat(a,r,i);return t in p?G[t]:q(t)},_(C,"for",F),F.value=function(r){if(D(r))throw new TypeError(r+" is not a symbol");return m.call(G,r)?r.slice(2*l,-i.length):void 0},_(C,"keyFor",F),F.value=function r(t,n){var e=j(t,n);return e&&M(n)&&(e.enumerable=W.call(t,n)),e},_(r,b,F),F.value=function r(t,n){return 1===arguments.length||void 0===n?E(t):x(t,n)},_(r,"create",F);var R=null===function(){return this}.call(null);if(F.value=R?function(){var r=d.call(this);return"[object String]"===r&&M(this)?"[object Symbol]":r}:function(){if(this===window)return"[object Null]";var r=d.call(this);return"[object String]"===r&&M(this)?"[object Symbol]":r},_(p,"toString",F),o=function(r,t,n){var e=j(p,t);delete p[t],_(r,t,n),r!==p&&_(p,t,e)},function(){try{var t={};return r.defineProperty(t,"t",{configurable:!0,enumerable:!1,get:function(){return!0},set:void 0}),!!t.t}catch(r){return!1}}()){var U;try{U=Function("s","var v = s.valueOf(); return { [v]() {} }[v].name;")}catch(r){}var V=function(){},X=U&&"inferred"===V.name?U:null;r.defineProperty(n.Symbol.prototype,"description",{configurable:!0,enumerable:!1,get:function(){return B(this)}})}}(Object,0,self);}if (!("Symbol"in self&&"toStringTag"in self.Symbol
)) {Object.defineProperty(Symbol,"toStringTag",{value:Symbol("toStringTag")});}if (!("Promise"in self
)) {!function(){"use strict";function n(){return tn[q][B]||D}function t(n){return n&&"object"==typeof n}function e(n){return"function"==typeof n}function r(n,t){return n instanceof t}function o(n){return r(n,O)}function i(n,t,e){if(!t(n))throw a(e)}function u(){try{return T.apply(S,arguments)}catch(n){return Y.e=n,Y}}function c(n,t){return T=n,S=t,u}function f(n,t){function e(){for(var e=0;e<o;)t(r[e],r[e+1]),r[e++]=x,r[e++]=x;o=0,r.length>n&&(r.length=n)}var r=L(n),o=0;return function(n,t){r[o++]=n,r[o++]=t,2===o&&tn.nextTick(e)}}function s(n,t){var o,i,u,f,s=0;if(!n)throw a(N);var l=n[tn[q][z]];if(e(l))i=l.call(n);else{if(!e(n.next)){if(r(n,L)){for(o=n.length;s<o;)t(n[s],s++);return s}throw a(N)}i=n}for(;!(u=i.next()).done;)if((f=c(t)(u.value,s++))===Y)throw e(i[G])&&i[G](),f.e;return s}function a(n){return new TypeError(n)}function l(n){return(n?"":Q)+(new O).stack}function h(n,t){var e="on"+n.toLowerCase(),r=C[e];E&&E.listeners(n).length?n===X?E.emit(n,t._v,t):E.emit(n,t):r?r({reason:t._v,promise:t}):tn[n](t._v,t)}function v(n){return n&&n._s}function _(n){if(v(n))return new n(Z);var t,r,o;return t=new n(function(n,e){if(t)throw a();r=n,o=e}),i(r,e),i(o,e),t}function d(n,t){var e=!1;return function(r){e||(e=!0,I&&(n[M]=l(!0)),t===U?j(n,r):w(n,t,r))}}function p(n,t,r,o){return e(r)&&(t._onFulfilled=r),e(o)&&(n[J]&&h(W,n),t._onRejected=o),I&&(t._p=n),n[n._c++]=t,n._s!==$&&rn(n,t),t}function m(n){if(n._umark)return!0;n._umark=!0;for(var t,e=0,r=n._c;e<r;)if(t=n[e++],t._onRejected||m(t))return!0}function y(n,t){function e(n){return r.push(n.replace(/^\s+|\s+$/g,""))}var r=[];return I&&(t[M]&&e(t[M]),function n(t){t&&K in t&&(n(t._next),e(t[K]+""),n(t._p))}(t)),(n&&n.stack?n.stack:n)+("\n"+r.join("\n")).replace(nn,"")}function g(n,t){return n(t)}function w(n,t,e){var r=0,i=n._c;if(n._s===$)for(n._s=t,n._v=e,t===A&&(I&&o(e)&&(e.longStack=y(e,n)),on(n));r<i;)rn(n,n[r++]);return n}function j(n,r){if(r===n&&r)return w(n,A,a(V)),n;if(r!==P&&(e(r)||t(r))){var o=c(k)(r);if(o===Y)return w(n,A,o.e),n;e(o)?(I&&v(r)&&(n._next=r),v(r)?b(n,r,o):tn.nextTick(function(){b(n,r,o)})):w(n,U,r)}else w(n,U,r);return n}function k(n){return n.then}function b(n,t,e){var r=c(e,t)(function(e){t&&(t=P,j(n,e))},function(e){t&&(t=P,w(n,A,e))});r===Y&&t&&(w(n,A,r.e),t=P)}var x,T,S,P=null,R="object"==typeof self,C=self,F=C.Promise,E=C.process,H=C.console,I=!0,L=Array,O=Error,A=1,U=2,$=3,q="Symbol",z="iterator",B="species",D=q+"("+B+")",G="return",J="_uh",K="_pt",M="_st",N="Invalid argument",Q="\nFrom previous ",V="Chaining cycle detected for promise",W="rejectionHandled",X="unhandledRejection",Y={e:P},Z=function(){},nn=/^.+\/node_modules\/yaku\/.+\n?/gm,tn=function(n){var r,o=this;if(!t(o)||o._s!==x)throw a("Invalid this");if(o._s=$,I&&(o[K]=l()),n!==Z){if(!e(n))throw a(N);r=c(n)(d(o,U),d(o,A)),r===Y&&w(o,A,r.e)}};tn.default=tn,function en(n,t){for(var e in t)n[e]=t[e]}(tn.prototype,{then:function(n,t){if(void 0===this._s)throw a();return p(this,_(tn.speciesConstructor(this,tn)),n,t)},catch:function(n){return this.then(x,n)},finally:function(n){return this.then(function(t){return tn.resolve(n()).then(function(){return t})},function(t){return tn.resolve(n()).then(function(){throw t})})},_c:0,_p:P}),tn.resolve=function(n){return v(n)?n:j(_(this),n)},tn.reject=function(n){return w(_(this),A,n)},tn.race=function(n){var t=this,e=_(t),r=function(n){w(e,U,n)},o=function(n){w(e,A,n)},i=c(s)(n,function(n){t.resolve(n).then(r,o)});return i===Y?t.reject(i.e):e},tn.all=function(n){function t(n){w(o,A,n)}var e,r=this,o=_(r),i=[];return(e=c(s)(n,function(n,u){r.resolve(n).then(function(n){i[u]=n,--e||w(o,U,i)},t)}))===Y?r.reject(e.e):(e||w(o,U,[]),o)},tn.Symbol=C[q]||{},c(function(){Object.defineProperty(tn,n(),{get:function(){return this}})})(),tn.speciesConstructor=function(t,e){var r=t.constructor;return r?r[n()]||e:e},tn.unhandledRejection=function(n,t){H&&H.error("Uncaught (in promise)",I?t.longStack:y(n,t))},tn.rejectionHandled=Z,tn.enableLongStackTrace=function(){I=!0},tn.nextTick=R?function(n){F?new F(function(n){n()}).then(n):setTimeout(n)}:E.nextTick,tn._s=1;var rn=f(999,function(n,t){var e,r;return(r=n._s!==A?t._onFulfilled:t._onRejected)===x?void w(t,n._s,n._v):(e=c(g)(r,n._v))===Y?void w(t,A,e.e):void j(t,e)}),on=f(9,function(n){m(n)||(n[J]=1,h(X,n))});Object.defineProperty(tn.prototype,tn.Symbol.toStringTag,{value:"Promise",writable:!1,enumerable:!1,configurable:!0}),C.Promise=tn}();}})('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});