'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_WIDTH = 70 + 'px';
  var IMAGE_HEIGHT = 70 + 'px';
  var IMAGE_BORDER_RADIUS = 5 + 'px';
  var AVATAR = 'img/muffin-grey.svg';
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

  var removeAvatar = function () {
    avatarPreview.src = AVATAR;
  };

  imagesChooser.addEventListener('change', function () {
    var images = imagesChooser.files[0];
    var imagesName = images.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return imagesName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        createImage(reader.result);
      });

      reader.readAsDataURL(images);
    }
  });
  avatarChooser.addEventListener('change', function () {
    var avatar = avatarChooser.files[0];
    var avatarName = avatar.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return avatarName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(avatar);
    }
  });
  window.images = {
    remove: removeImages,
    removeAvatar: removeAvatar,
  };
})();
