/**
 * CtrlSpace JavaScript Library v0.0.0
 *
 * Copyright takakik and other contributors
 * Released under the MIT license
 *
 * Date: 2017-11-28
 */
(function ($) {
  function _twoByte2OneByteNumber(number) {
    return String.fromCharCode(number.charCodeAt(0) - 0xFEE0);
  }

  function _converterFactory() {
    return function (target) {
      var
        charCode  = target.charCodeAt(0),
        converted = target;

      if(65296 <= charCode && charCode <= 65305) {
        converted = _twoByte2OneByteNumber(target);
      }
      else if([8208, 8213, 65293, 12540].includes(charCode)) { // => ['‐', '―', '－', 'ー']
        converted = '-';
      }

      return converted;
    }
  }

  $.fn.CtrlSpace = function () {
    this.each(function () {
      $input = $(this);

      $input.blur(function (event) {
        var
          $this = $(this),
          value = $this.val(),
          value_list = value.split(''), 
          result;

        result = value_list
          .map(function (e) {
            return _converterFactory()(e);
          })
          .join('');

        $this.val(result);
      });
    });
  }
}(jQuery));
