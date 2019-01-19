'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_WIDTH = 70 + 'px';
  var IMAGE_HEIGHT = 70 + 'px';
  var IMAGE_BORDER_RADIUS = 5 + 'px';
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarChooser = document.querySelector('#avatar');
  var photo = document.querySelector('.ad-form__photo');
  var imagesChooser = document.querySelector('#images');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  photoContainer.removeChild(photo);

  var createImage = function (src) {
    var div = document.createElement('div');
    div.classList.add('ad-form__photo');
    photoContainer.appendChild(div);
    var image = document.createElement('img');
    image.style.width = IMAGE_WIDTH;
    image.style.height = IMAGE_HEIGHT;
    image.style.borderRadius = IMAGE_BORDER_RADIUS;
    window.helpers.setAttribute(image, 'src');
    image.src = src;
    div.appendChild(image);
  };

  var removeImages = function () {
    var images = document.querySelectorAll('.ad-form__photo');
    images.forEach(function (it) {
      it.remove();
    });
  };

  var changeAvatar = function (src) {
    avatarPreview.src = src;
  };

  var loadImages = function (chooser, fnc) {
    chooser.addEventListener('change', function () {
      var file = chooser.files[0];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          fnc(reader.result);
        });

        reader.readAsDataURL(file);
      }
    });
  };
  var loadUserImages = function () {
    loadImages(imagesChooser, createImage);
    loadImages(avatarChooser, changeAvatar);
  };

  window.images = {
    remove: removeImages,
    load: loadUserImages,
    change: changeAvatar,
  };
})();
