
var loadPreviewImage = function(item, callback) {
    if (!window.FileReader || item.type.indexOf('image/') != 0) {
        return callback(null, null);
    }

    var reader = new FileReader();
    reader.onload = function(e) {
        callback(null, { item: item, previewImage: e.target });
    };
    reader.onerror = function(err) {
        callback(err);
    };

    reader.readAsDataURL(item);
};

module.exports = loadPreviewImage;
