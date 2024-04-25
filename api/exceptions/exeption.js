module.exports = {

    throwIfNull: function (value, message ='Exception: Value is null') {
        if (value == null) {
            throw new Error(message);
        }
    },
}