import { addClass, removeClass } from './../../utils/dom';
/*
 * Example plugin that hightlights anchors based on extra route data.
 * See routes in index.html for configuration.
 */
export default {
    name: "webx1NavPlugin",
    global: "$",
    namespace: "nav",
    install: (app, options) => {
      let opts = Object.assign({ activeClassName: "active" }, options);
  
      let origInitRoute = app.initRoute;
      let origUnmountRoute = app.unmountRoute;
      let origBoot = app.boot;
  
      let rootEl = opts.scope ? document.querySelector(opts.scope) : app.el;
  
      app.initRoute = async (route, state) => {
        await origInitRoute(route, state);
        const routeMap = Object.keys(app.routes).reduce((prev, curr) => {
          let rt = app.routes[curr];
          if (rt.name) {
            prev[rt.name] = {
              root: rt.root,
              path: curr,
              activeClass: rt.activeClass || opts.activeClassName,
            };
          }
          return prev;
        }, {});
        let links = [].slice.call(rootEl.querySelectorAll("a[data-route]:not([data-bound])"));
  
        links.forEach((anchor) => {
          let routeName = anchor.dataset["route"];
          let current = routeMap[routeName] || {};
  
          if (current.activeClassName) {
            anchor.dataset["activeClass"] = activeClass;
          }
  
          anchor.addEventListener("click", (e) => {
            e.preventDefault();
  
            let { path, activeClass, root } =
              routeMap[e.target.dataset["route"]] || {};
            if (path) {
              let href = e.target.href;
              let currPath = href.replace(window.location.origin, "");
  
              window.history.pushState({}, currPath, href);
              app.navigate(e.target.pathname);
  
              let anchor = root
                ? rootEl.querySelector(`[data-route="${root}"]`)
                : e.target;
  
              if (anchor) {
                if (activeClass) {
                  anchor.dataset["activeClass"] = activeClass;
                }
                addClass(activeClass || opts.activeClassName, anchor);
              }
            }
          });

          anchor.dataset['bound'] = true;
        });
      };
  
      app.unmountRoute = (route, state) => {
        origUnmountRoute.call(app, route, state);
        [].slice
          .call(rootEl.querySelectorAll("a[data-route]"))
          .forEach((link) => { 
            removeClass(link.dataset["activeClass"] || opts.activeClassName, link);
          });
      };
  
      app.boot = async () => {
        await origBoot.call(app);
        let pathname = window.location.pathname;
  
        if (pathname) {
          let currentRoute = await app.getRoute(pathname);
          if (currentRoute && currentRoute.name) {
            let routeName = currentRoute.root
              ? currentRoute.root
              : currentRoute.name;
            let anchor = rootEl.querySelector(`[data-route="${routeName}"]`);
            if (anchor) {
              let cls = currentRoute.activeClass || opts.activeClassName;
              addClass(cls, anchor);
              anchor.dataset["activeClass"] = cls;
            }
          }
        }
      };
  
      // API to return
      return {
        getRouteElements: () => {
          return [].slice.call(rootEl.querySelectorAll("[data-route]"));
        },
      };
    },
  };
  