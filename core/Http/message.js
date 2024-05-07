const message = function(type, title, subtitle, content){
    
    this.message = {
        type : type,
        title : title,
        subtitle : subtitle,
        content : content
    };

    return this.message;
}

const successMessage = function(title, subtitle, content){
    return message.call(this, 'success', title, subtitle, content);
}

const errorMessage = function(title, subtitle, content){
    return message.call(this, 'danger', title, subtitle, content);
}

const infoMessage = function(title, subtitle, content){
    return message.call(this, 'info', title, subtitle, content);
}

module.exports = {
    message,
    successMessage,
    errorMessage,
    infoMessage
};