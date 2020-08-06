!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e=e||self).webx1=n()}(this,function(){function e(){return(e=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var n={isArray:function(e){return Array.isArray(e)},isString:function(e){return null!==e&&"string"==typeof e},isEmptyObject:function(e){var n;for(n in e)if(e.hasOwnProperty(n))return!1;return!0},isFunc:function(e){return"function"==typeof e},isAsyncFunc:function(e){return n.isFunc(e)&&"AsyncFunction"===e.constructor.name},isNode:function(e){return"object"==typeof Node?e instanceof Node:e&&"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName},isElement:function(e){return"object"==typeof HTMLElement?e instanceof HTMLElement:e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName}};function t(e,n){try{var t=e()}catch(e){return n(e)}return t&&t.then?t.then(void 0,n):t}var r={global:"$",appName:"App",metaTitlePrepend:"",routes:{},notFoundRouteName:"notfound",notFoundUrl:"/notfound"};return function(i){try{var o=Object.assign({},r,i),u={routes:{"/":function(){return{view:"<div>Webx Rocks!</div>"}},notfound:function(){return{view:"<div>404 Not Found!</div>"}},error:function(){return{view:"<div>An error has occurred!</div>"}}}};if(!n.isEmptyObject(o.routes)){var s={};for(var c in o.routes)o.routes.hasOwnProperty(c)&&(o.routes[c].view||(s[c]=['A view property is required for route "'+c+'"']));if(Object.keys(s).length)throw new Error("Invalid route configuration",s);u.routes=o.routes}var a=function(e){var n={setState:e.setState,getState:e.getState,dispatch:e.dispatch,listen:e.listen,refresh:e.refresh};return Object.keys(e._plugins).reduce(function(n,t){var r=e._plugins[t];if(r.api){var i=r.namespace?r.namespace:r.name;n[i]=n[i]?Object.assign(n[i],r.api):r.api}return n},n)},l={el:document.body,_currentPath:null,_currentRoute:null,_state:{},_listeners:[],_plugins:{},routes:e({},u.routes),ok:!0,plugin:function(e,t){if(void 0===t&&(t={}),!e.name)throw new Error("A plugin must have a name property.");if(!e.install||!n.isFunc(e.install))throw new Error("A plugin must define an install method.");if(l._plugins[e.name])throw new Error('A plugin with the name: "'+e.name+' is already registered."');l._plugins[e.name]=e;try{var r=e.install(l,t);r&&(l._plugins[e.name].api=r,e.global&&(window[e.global]?window[e.global]=Object.assign(window[e.global],r):window[e.global]=r),l.ctx=a(l)),t.installed&&n.isFunc(t.installed)&&t.installed()}catch(r){console.error('Plugin "'+e.name+'" failed to install.',r),t.onError&&n.isFunc(t.onError)&&t.onError(r),delete l._plugins[e.name]}},getState:function(){var n=[].slice.call(arguments);return n.length?l._state[n[0]]:e({},l._state)},setState:function(e,n){var t=Object.freeze(JSON.parse(JSON.stringify(l._state)));l._state[e]=n;var r=Object.freeze(JSON.parse(JSON.stringify(l._state)));l._listeners.forEach(function(i){i("stateChange",r,t,e,n)})},replaceState:function(e){var n=Object.freeze(JSON.parse(JSON.stringify(l._state)));l._state=e,l._listeners.forEach(function(t){t("stateChange",e,n,"*",e)})},dispatch:function(e){var n=arguments;l._listeners.forEach(function(t){t.apply(null,[e].concat([].slice.call(n,1)))})},listen:function(e){if(n.isFunc(e))return l._listeners.push(e),function(){var n=l._listeners.indexOf(e);-1!==n&&l._listeners.splice(n,1)};console.error("Listen handler must be a function",e)},refresh:function(){l.navigate(l._currentPath,!0,!0).then(function(){return l.dispatch("refreshed",l._currentPath)})},renderView:function(e,r,i){try{var u,s=function(s){if(u)return s;function c(){i&&(document.title=""+o.metaTitlePrepend+i.title),l.dispatch("view-rendered",{detail:e})}var a=function(){if(n.isAsyncFunc(e)){var i=t(function(){return Promise.resolve(e(r)).then(function(e){l.el.innerHTML=e})},function(e){console.error("Render view errror",e)});if(i&&i.then)return i.then(function(){})}else l.el.innerHTML=e(r)}();return a&&a.then?a.then(c):c()};if(!n.isFunc(e))throw new Error("renderView requires a function.");var c=function(){if(l.el.renderView&&n.isFunc(l.el.renderView)){var o=function(){u=1},s=function(){if(n.isAsyncFunc(l.el.renderView)){var o=t(function(){return Promise.resolve(l.el.renderView(e,r,i)).then(function(){})},function(e){console.error("render async view error",e)});if(o&&o.then)return o.then(function(){})}else l.el.renderView(e,r,i)}();return s&&s.then?s.then(o):o()}}();return Promise.resolve(c&&c.then?c.then(s):s(c))}catch(e){return Promise.reject(e)}},initRoute:function(e,t){try{var r=a(l),i=function(){if(n.isFunc(e.init)){var i=function(){if(n.isAsyncFunc(e.init))return Promise.resolve(e.init(t,r,l.el)).then(function(){});e.init(t,r,l.el)}();if(i&&i.then)return i.then(function(){})}}();return Promise.resolve(i&&i.then?i.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},unmountRoute:function(e){e&&n.isFunc(e.unmount)&&e.unmount(a(l))},routeInit:function(e,t){try{var r=function(){if(o.routeInit&&n.isFunc(o.routeInit)){var r=function(){if(n.isAsyncFunc(o.routeInit))return Promise.resolve(o.routeInit(e,t)).then(function(){});o.routeInit(e,t)}();if(r&&r.then)return r.then(function(){})}}();return Promise.resolve(r&&r.then?r.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},navigate:function(n,r,i){try{if(!r&&l._currentPath&&l._currentPath===n)return Promise.resolve(!1);var u=l._currentPath;l._currentPath=n;var s={},c={},a=function(n,r){void 0===r&&(r={});try{var o=function(){function e(){function e(){var e=r.params,n=void 0===e?{}:e;i||l._listeners.forEach(function(e){e("pageChange",{from:u,to:l._currentRoute,params:n,query:s})})}var o=t(function(){return Promise.resolve(l.initRoute(c,a)).then(function(){})},function(e){console.error('Init route for "'+(c.name?c.name:n)+'" failed',e)});return o&&o.then?o.then(e):e()}var o=t(function(){return Promise.resolve(l.renderView(c.view,a,c.meta)).then(function(){})},function(e){console.error("Render view failed",e)});return o&&o.then?o.then(e):e()},c=f[n];c||(c=f["/notfound"]||{view:function(){return'<div class="page">404 Not Found</div>'}}),l._currentRoute=n,s=location.search.slice(1).split("&").reduce(function(e,n){var t=n.split("=");return e[t[0]]=decodeURIComponent(t[1]||""),e},{});var a=e({},l.getState(),r,{query:s,path:n}),d=function(){if(!i){var e=t(function(){return Promise.resolve(l.routeInit(c,a)).then(function(){})},function(e){console.error("Pre-render failed:",e)});if(e&&e.then)return e.then(function(){})}}();return Promise.resolve(d&&d.then?d.then(o):o())}catch(e){return Promise.reject(e)}},f=l.routes;if(i||l._currentRoute&&l.unmountRoute(l.routes[l._currentRoute]),f[n])return l._currentRoute=n,a(n),Promise.resolve({path:n,route:n,query:s,params:c});var d=n.split("/").slice(1),h=Object.keys(f).filter(function(e){return-1!==e.indexOf("/"+d[0])&&e.split("/").slice(1).length===d.length})[0];return h?(h.split("/").slice(2).forEach(function(e,n){c[e.slice(1)]=d[n+1]}),a(h,{params:c}),Promise.resolve({path:n,route:h,query:s,params:c})):(l._currentRoute=o.notFoundRouteName,a(o.notFoundUrl),Promise.resolve({path:n,route:void 0,query:s,params:c}))}catch(e){return Promise.reject(e)}},boot:function(){return Promise.resolve()}},f=function(e){try{return Promise.resolve(t(function(){function t(){return o.debug&&console.log("Initial app state",l._state),window.onpopstate=function(){try{return Promise.resolve(l.navigate(window.location.pathname)).then(function(){})}catch(e){return Promise.reject(e)}},l.global=o.global,window[o.global]=window[o.global]||{},window[o.global].navigate=function(e){try{return window.history.pushState({},e,window.location.origin+e),Promise.resolve(l.navigate(e)).then(function(){})}catch(e){return Promise.reject(e)}},window[o.global].dispatch=l.dispatch.bind(l),Promise.resolve(l.boot()).then(function(){return Promise.resolve(l.navigate(window.location.pathname)).then(function(){return l})})}if(n.isString(e)){if(l.el=document.querySelector(e),!l.el)throw new Error("Invalid mount target: "+e+". Missing from the DOM.")}else{if(!n.isNode(e)||!n.isElement(e))throw new Error("Invalid DOM object for mount.");l.el=e}var r=function(){if(n.isFunc(o.init)){var e=function(e){l._state=e};return n.isAsyncFunc(o.init)?Promise.resolve(o.init()).then(e):e(o.init())}l._state=o.init||{}}();return r&&r.then?r.then(t):t()},function(e){return{ok:!1,error:e}}))}catch(e){return Promise.reject(e)}};return l.el=o.node||document.body,o.plugins&&n.isArray(o.plugins)&&o.plugins.forEach(function(e){l.plugin(e[0],e.length>1?e[1]:{})}),l.ctx=a(l),o.node&&(n.isElement(o.node)||n.isNode(o.node))?f(o.node):f(document.body)}catch(e){return Promise.reject(e)}}});
//# sourceMappingURL=webx1.umd.js.map
