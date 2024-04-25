module.exports = {
    dependencies : {},
    register : function(name, dependency){
        this.dependencies[name] = dependency;
    },
    get : function(name){
        return this.dependencies[name];
    },
};