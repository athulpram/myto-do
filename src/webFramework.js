const isMatching = (req,route)=>{
  if(route.method&&req.method!=route.method)return false;
  if(route.url&& route.url!=req.url)return false;
  return true;
}

class WebFrameWork {
  constructor() {
    this.routes = [];
  }

  use(handler) {
    this.routes.push({handler});
  }

  get(url, handler) {
    this.routes.push({ url, handler, method: 'GET' });
  }

  post(url, handler) {
    this.routes.push({ url, handler, method: 'POST' });
  }

  handleRequest(req, res) {
    let matchingRoutes = this.routes.filter(r => isMatching(req, r));
    let next = () => {
      let current = matchingRoutes[0];
      if (!current) return;
      matchingRoutes = matchingRoutes.slice(1);
      current.handler(req, res, next);
    };
    next();
  }
}

module.exports = WebFrameWork;