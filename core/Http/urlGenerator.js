const urlGenerator = function(req) {
  
    this.baseUrl = function(){
        return req.protocol + '://' + req.get('host');
    },

    this.fullUrl = function(){
        return this.baseUrl() + req.originalUrl;
    },

    this.current = function(){
        return this.fullUrl();
    },

    /**
     * Generate a full URL for the given asset file.
     */
    this.asset = function(path) {
        return this.baseUrl().replace(/\/+$/, '') + '/' + path.replace(/^\/+/, '');
    };

    /**
     * Generate a full URL for specific action.
     */
    this.action = function(...params) {

        routeParams = params.join('/');

        return this.baseUrl().replace(/\/+$/, '') + '/' + routeParams;
    },

    this.back = function(data = null){
        
        if(data){
            req.session.viewData = {...req.session.viewData, ...data};
        }

        return req.session.previuosUrl ?? this.fullUrl();
    }
}

module.exports = urlGenerator;
