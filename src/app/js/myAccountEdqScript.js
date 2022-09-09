/*
    http://www.JSON.org/json2.js
    2011-02-23

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false, regexp: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
window.sioAreDetailsFromQasSuggestedAddresses = false;
window.sioAreDetailsFromQasConfirmNumber = false;
window.isControlOnFormForEditUsingSelectedSavedAddress = false;
if (!JSON) {
  JSON = {};
}

(function() {
  "use strict";

  function f(n) {
    // Format integers to have at least two digits.
    return n < 10 ? "0" + n : n;
  }

  if (typeof Date.prototype.toJSON !== "function") {
    Date.prototype.toJSON = function(key) {
      return isFinite(this.valueOf())
        ? this.getUTCFullYear() +
            "-" +
            f(this.getUTCMonth() + 1) +
            "-" +
            f(this.getUTCDate()) +
            "T" +
            f(this.getUTCHours()) +
            ":" +
            f(this.getUTCMinutes()) +
            ":" +
            f(this.getUTCSeconds()) +
            "Z"
        : null;
    };

    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(
      key
    ) {
      return this.valueOf();
    };
  }

  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap,
    indent,
    meta = {
      // table of character substitutions
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\"
    },
    rep;

  function quote(string) {
    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.

    escapable.lastIndex = 0;
    return escapable.test(string)
      ? '"' +
          string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === "string"
              ? c
              : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
          }) +
          '"'
      : '"' + string + '"';
  }

  function str(key, holder) {
    // Produce a string from holder[key].

    var i, // The loop counter.
      k, // The member key.
      v, // The member value.
      length,
      mind = gap,
      partial,
      value = holder[key];

    // If the value has a toJSON method, call it to obtain a replacement value.

    if (
      value &&
      typeof value === "object" &&
      typeof value.toJSON === "function"
    ) {
      value = value.toJSON(key);
    }

    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.

    if (typeof rep === "function") {
      value = rep.call(holder, key, value);
    }

    // What happens next depends on the value's type.

    switch (typeof value) {
      case "string":
        return quote(value);

      case "number":
        // JSON numbers must be finite. Encode non-finite numbers as null.

        return isFinite(value) ? String(value) : "null";

      case "boolean":
      case "null":
        // If the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce 'null'. The case is included here in
        // the remote chance that this gets fixed someday.

        return String(value);

      // If the type is 'object', we might be dealing with an object or an array or
      // null.

      case "object":
        // Due to a specification blunder in ECMAScript, typeof null is 'object',
        // so watch out for that case.

        if (!value) {
          return "null";
        }

        // Make an array to hold the partial results of stringifying this object value.

        gap += indent;
        partial = [];

        // Is the value an array?

        if (Object.prototype.toString.apply(value) === "[object Array]") {
          // The value is an array. Stringify every element. Use null as a placeholder
          // for non-JSON values.

          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || "null";
          }

          // Join all of the elements together, separated with commas, and wrap them in
          // brackets.

          v =
            partial.length === 0
              ? "[]"
              : gap
              ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
              : "[" + partial.join(",") + "]";
          gap = mind;
          return v;
        }

        // If the replacer is an array, use it to select the members to be stringified.

        if (rep && typeof rep === "object") {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            if (typeof rep[i] === "string") {
              k = rep[i];
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        } else {
          // Otherwise, iterate through all of the keys in the object.

          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        }

        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.

        v =
          partial.length === 0
            ? "{}"
            : gap
            ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
            : "{" + partial.join(",") + "}";
        gap = mind;
        return v;
    }
  }

  // If the JSON object does not yet have a stringify method, give it one.

  if (typeof JSON.stringify !== "function") {
    JSON.stringify = function(value, replacer, space) {
      // The stringify method takes a value and an optional replacer, and an optional
      // space parameter, and returns a JSON text. The replacer can be a function
      // that can replace values, or an array of strings that will select the keys.
      // A default replacer method can be provided. Use of the space parameter can
      // produce text that is more easily readable.

      var i;
      gap = "";
      indent = "";

      // If the space parameter is a number, make an indent string containing that
      // many spaces.

      if (typeof space === "number") {
        for (i = 0; i < space; i += 1) {
          indent += " ";
        }

        // If the space parameter is a string, it will be used as the indent string.
      } else if (typeof space === "string") {
        indent = space;
      }

      // If there is a replacer, it must be a function or an array.
      // Otherwise, throw an error.

      rep = replacer;
      if (
        replacer &&
        typeof replacer !== "function" &&
        (typeof replacer !== "object" || typeof replacer.length !== "number")
      ) {
        throw new Error("JSON.stringify");
      }

      // Make a fake root object containing our value under the key of ''.
      // Return the result of stringifying the value.

      return str("", { "": value });
    };
  }

  // If the JSON object does not yet have a parse method, give it one.

  if (typeof JSON.parse !== "function") {
    JSON.parse = function(text, reviver) {
      // The parse method takes a text and an optional reviver function, and returns
      // a JavaScript value if the text is a valid JSON text.

      var j;

      function walk(holder, key) {
        // The walk method is used to recursively walk the resulting structure so
        // that modifications can be made.

        var k,
          v,
          value = holder[key];
        if (value && typeof value === "object") {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              if (v !== undefined) {
                value[k] = v;
              } else {
                delete value[k];
              }
            }
          }
        }
        return reviver.call(holder, key, value);
      }

      // Parsing happens in four stages. In the first stage, we replace certain
      // Unicode characters with escape sequences. JavaScript handles many characters
      // incorrectly, either silently deleting them, or treating them as line endings.

      text = String(text);
      cx.lastIndex = 0;
      if (cx.test(text)) {
        text = text.replace(cx, function(a) {
          return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        });
      }

      // In the second stage, we run the text against regular expressions that look
      // for non-JSON patterns. We are especially concerned with '()' and 'new'
      // because they can cause invocation, and '=' because it can cause mutation.
      // But just to be safe, we want to reject all unexpected forms.

      // We split the second stage into 4 regexp operations in order to work around
      // crippling inefficiencies in IE's and Safari's regexp engines. First we
      // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
      // replace all simple value tokens with ']' characters. Third, we delete all
      // open brackets that follow a colon or comma or that begin the text. Finally,
      // we look to see that the remaining characters are only whitespace or ']' or
      // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

      if (
        /^[\],:{}\s]*$/.test(
          text
            .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
            .replace(
              /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
              "]"
            )
            .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
        )
      ) {
        // In the third stage we use the eval function to compile the text into a
        // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
        // in JavaScript: it can begin a block or an object literal. We wrap the text
        // in parens to eliminate the ambiguity.

        j = eval("(" + text + ")");

        // In the optional fourth stage, we recursively walk the new structure, passing
        // each name/value pair to a reviver function for possible transformation.

        return typeof reviver === "function" ? walk({ "": j }, "") : j;
      }

      // If the text is not JSON parseable, then a SyntaxError is thrown.

      throw new SyntaxError("JSON.parse");
    };
  }
})();
var EDQ = EDQ || {};
EDQ.system = EDQ.system || {};

EDQ.system.isString = function isString(value) {
  return typeof value === "string";
};
EDQ.system.isNaN = function isNaN(value) {
  return value === "NaN";
};
EDQ.system.isUndefined = function isUndefined(value) {
  return typeof value == "undefined";
};
EDQ.system.isNull = function isNull(value) {
  return EDQ.system.isUndefined(value) || value == null;
};
EDQ.system.isNullOrEmpty = function isNullOrEmpty(str) {
  return EDQ.system.isNull(str) || str == "";
};
EDQ.system.isFunction = function isFunction(obj) {
  return (
    !EDQ.system.isNull(obj) &&
    Object.prototype.toString.call(obj) === "[object Function]"
  );
};
EDQ.system.isArray = function isArray(obj) {
  return (
    !EDQ.system.isNull(obj) &&
    Object.prototype.toString.call(obj) === "[object Array]"
  );
};
EDQ.system.logError = function logError(obj) {
  /* if (window.console) {
        window.console.log(obj);
    } else { //IE does not have a logger.
        //alert(obj);
    };*/
};

EDQ.system.containsInArray = function containsInArray(needle, haystack) {
  if (haystack.indexOf(needle) !== -1) {
    return true;
  }
  return false;
};

EDQ.system.contains = function contains(needle, haystack) {
  if (typeof haystack[needle] === "undefined") {
    return false;
  }
  return true;
};
EDQ.system.getElementValue = function getElementValue(htmlElementId) {
  var htmlElement = this.getElementById(htmlElementId);
  if (this.isNull(htmlElement)) {
    return undefined;
  }

  return htmlElement.value;
};
EDQ.system.setElementValue = function setElementValue(htmlElementId, value) {
  var htmlElement = this.getElementById(htmlElementId);
  if (this.isNull(htmlElement)) {
    return;
  }

  if (htmlElement.tagName === "LABEL") {
    htmlElement.innerHTML = value;
  } else if (htmlElement.tagName === "SPAN") {
    htmlElement.innerHTML = value;
  } else if (htmlElement.tagName === "SELECT") {
    var index = EDQ.system.getDropDownIndexFromValue(htmlElement, value);

    if (htmlElement[index].value.trim() === "") {
      this.logError("Could not find a option with value: " + value);
      return;
    }

    htmlElement.selectedIndex = index;
    if (htmlElement.onchange) {
      htmlElement.onchange();
    }
  } else {
    htmlElement.value = value;
  }
};
EDQ.system.getDropDownIndexFromValue = function getDropDownIndexFromValue(
  element,
  value
) {
  var index = 0;
  for (var i = 0; i < element.options.length; i++) {
    if (element.options[i].value == value || element.options[i].text == value) {
      index = i;
      break;
    } else if (
      element.options[i].value.toLowerCase() == value.toLowerCase() ||
      element.options[i].text.toLowerCase() == value.toLowerCase()
    ) {
      index = i;
    }
  }

  return index;
};
EDQ.system.getElementById = function getElementById(selector) {
  var element = document.getElementById(selector);
  if (this.isNull(element)) {
    var elementsByName = document.getElementsByName(selector);
    element = elementsByName.length == 0 ? null : elementsByName[0];
  }

  if (this.isNull(element))
    this.logError("Can not find element with id " + selector);

  return element;
};
EDQ.system.getElementLabelById = function getElementLabelById(htmlElementId) {
  var labels = document.getElementsByTagName("Label");

  for (var i = 0, max = labels.length; i < max; i++) {
    if (!this.isNull(labels[i].attributes["for"])) {
      if (labels[i].attributes["for"].value === htmlElementId) {
        return labels[i];
      }
    }
  }

  return undefined;
};

EDQ.system.toBoolean = function toBoolean(value) {
  if (value.toString().toUpperCase() === "TRUE" || value.toString() === "1") {
    return true;
  }
  return false;
};

EDQ.system.beginsWith = function beginsWith(needle, haystack) {
  return haystack.substr(0, needle.length) === needle;
};

EDQ.system.removeSpecialCharacters = function removeSpecialCharacters(value) {
  return value.replace(/[^\d.]/g, "");
};

EDQ.system.endsWith = function endsWith(needle, haystack) {
  return haystack.indexOf(needle, haystack.length - needle.length) !== -1;
};

EDQ.system.inherit = (function() {
  var F = function() {};
  return function(C, P) {
    F.prototype = P.prototype;
    C.prototype = new F();
    C.uber = P.prototype;
    C.prototype.constructor = C;
  };
})();

if (Array && !Array.indexOf) {
  Array.prototype.indexOf = function(elt /*, from*/) {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = from < 0 ? Math.ceil(from) : Math.floor(from);
    if (from < 0) {
      from += len;
    }
    for (; from < len; from++) {
      if (from in this && this[from] === elt) {
        return from;
      }
    }
    return -1;
  };
}

if (typeof String.prototype.trim !== "function") {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
  };
}
EDQ.system.createElement = function(
  type,
  id,
  content,
  className,
  inlineStyles
) {
  var element = document.createElement(type);
  if (!this.isNullOrEmpty(id)) element.id = id;
  if (!this.isNullOrEmpty(content)) element.innerHTML = content;
  if (!this.isNullOrEmpty(className)) element.className = className;

  if (!this.isNullOrEmpty(inlineStyles)) {
    for (var key in inlineStyles) element.style[key] = inlineStyles[key];
  }

  return element;
};
EDQ.system.stringFormat = function() {
  var stringForFormat = arguments[0];
  if (typeof stringForFormat != "string")
    throw "First parameter have to be the string for formatting";
  for (var i = 1; i < arguments.length; i++) {
    stringForFormat = stringForFormat.replace(
      "{" + parseInt(i - 1) + "}",
      arguments[i]
    );
  }

  return stringForFormat;
};
var EDQ = EDQ || {};
EDQ.DataQuality = EDQ.DataQuality || {};

EDQ.DataQuality.HtmlTags = EDQ.DataQuality.HtmlTags || {};

//Configuration_Start
EDQ.DataQuality.Configuration = function Configuration(
  inputMappings,
  dataSetSettings,
  type,
  validationCertainty
) {
  this._inputMappings = inputMappings || {}; //Either the original mapping the user submitted or the promptset field mappings for address verification
  this._dataSetSettings = dataSetSettings || {};
  this._type = type;

  this.ValidationMessageTimeout = 5000; //Timeout in milliseconds
  this.ValidStatuses = ["VERIFIED", "UNKNOWN"]; //Email/Phone specific. It allows the user to specify which statuses are considered verified and which not verified.
  this.DefaultAreaCode = "+1";
  this.ServiceValidationTimeoutInMilliseconds = 5 * 1000;
};
EDQ.DataQuality.Configuration.prototype.addInputMapping = function addInputMapping(
  edqFieldName,
  elementIdOrIds
) {
  this._addMapping(this._inputMappings, edqFieldName, elementIdOrIds);
};

EDQ.DataQuality.Configuration.prototype._getElementLabelFromInputMappingByEdqFieldName = function _getElementLabelFromInputMappingByEdqFieldName(
  edqFieldName
) {
  var sys = EDQ.system;

  var element = this._getElementFromInputMappingByEdqFieldName(edqFieldName);
  if (sys.isNull(element)) {
    return undefined;
  }

  return sys.getElementLabelById(element.id);
};
EDQ.DataQuality.Configuration.prototype._getElementFromInputMappingByEdqFieldName = function _getElementFromInputMappingByEdqFieldName(
  edqFieldName
) {
  var sys = EDQ.system;

  var elementIds = this._inputMappings[edqFieldName];
  if (sys.isNull(elementIds) || elementIds.length === 0) {
    return undefined;
  }

  return sys.getElementById(elementIds[0]);
};

EDQ.DataQuality.Configuration.prototype.addDataSetSetting = function addDataSetSetting(
  elementId,
  edqFieldNameOrNames,
  dataSet,
  layout,
  useModal
) {
  var sys = EDQ.system;

  if (sys.isNullOrEmpty(dataSet)) {
    dataSet = "Default";
  }
  var dataSetSettings = this._dataSetSettings[dataSet];
  if (sys.isNull(dataSetSettings)) {
    dataSetSettings = {
      mappings: {},
      layout: layout,
      useModal: useModal
    };
    this._dataSetSettings[dataSet] = dataSetSettings;
  }
  this._addMapping(dataSetSettings.mappings, elementId, edqFieldNameOrNames);
};
EDQ.DataQuality.Configuration.prototype.getDataSetSettings = function getDataSetSettings(
  dataset
) {
  var sys = EDQ.system;

  if (sys.isNullOrEmpty(dataset)) {
    dataset = "Default";
  }

  var dataSetSettings = this._dataSetSettings[dataset];
  if (sys.isNull(dataSetSettings)) {
    dataSetSettings = this._dataSetSettings["Default"];
  }

  return dataSetSettings;
};

EDQ.DataQuality.Configuration.prototype._addMapping = function _addMapping(
  mappings,
  key,
  valueOrValues
) {
  var sys = EDQ.system;
  //var dq = EDQ.DataQuality;

  var values = mappings[key];
  if (sys.isNull(values)) {
    values = [];
    mappings[key] = values;
  }
  if (sys.isArray(valueOrValues)) {
    for (var i = 0, max = valueOrValues.length; i < max; i++) {
      values.push(valueOrValues[i]);
    }
  } else {
    values.push(valueOrValues);
  }
};
//Configuration_End

//Client_Start (constructor)
EDQ.DataQuality.Client = function Client(configurations) {
  this._configurations = configurations || [];

  this.onBeforeValidationStart = undefined;
  this.onAfterValidationEnd = undefined;
};
EDQ.DataQuality.Client.prototype._callOnValidationStart = function _callOnValidationStart(
  configuration,
  findAddressElement
) {
  var sys = EDQ.system;

  if (sys.isFunction(this.onBeforeValidationStart)) {
    return (
      this.onBeforeValidationStart(configuration, findAddressElement) !== false
    ); //If it returns something different than false we count it for true and allow the validation to proceed.
  }

  return true;
};
EDQ.DataQuality.Client.prototype._callOnAfterValidationEnd = function _callOnAfterValidationEnd(
  configuration,
  result
) {
  var sys = EDQ.system;

  if (sys.isFunction(this.onAfterValidationEnd)) {
    this.onAfterValidationEnd(configuration, result);
  }
};

EDQ.DataQuality.Client.prototype.addConfiguration = function addConfiguration(
  configuration
) {
  var sys = EDQ.system;

  if (sys.isNull(configuration)) {
    return;
  }

  if (!sys.containsInArray(configuration, this._configurations)) {
    this._configurations.push(configuration);
  }
};

EDQ.DataQuality.Client.prototype.initialize = function initialize() {
  for (var i = 0, max = this._configurations.length; i < max; i++) {
    this._initializeForConfiguration(this._configurations[i]);
  }
};

EDQ.DataQuality.Client.prototype.createConfigurationsFor = function createConfigurationsFor(
  mappings
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;

  for (var i = 0; i < mappings.length; i++) {
    var mappingJSON = mappings[i];

    if (!mappingJSON || !mappingJSON.InputMapping) {
      continue; // Do not add if invalid
    }

    if (!dq.Client.isTargetPage(mappingJSON.Page)) continue;

    var configuration = new dq.Configuration();

    configuration.ValidationMessageTimeout = sys.isNullOrEmpty(
      mappingJSON.ValidationMessageTimeoutInSeconds
    )
      ? 5000
      : parseInt(mappingJSON.ValidationMessageTimeoutInSeconds) * 1000;
    configuration.ValidStatuses = mappingJSON.ValidationCertainty; //["VERIFIED", "UNKNOWN"]; //Email/Phone specific. It allows the user to specify which statuses are considered verified and which not verified.
    configuration.DefaultAreaCode = mappingJSON.DefaultCountryCode;
    configuration.ServiceValidationTimeoutInMilliseconds = mappingJSON.ServiceValidationTimeoutInSeconds
      ? parseInt(mappingJSON.ServiceValidationTimeoutInSeconds) * 1000
      : 10000;

    var inputMappingJSON = mappingJSON.InputMapping;
    for (var key in inputMappingJSON) {
      if (!inputMappingJSON.hasOwnProperty(key)) {
        continue;
      }

      var edqFieldName = key;
      var elementIds = inputMappingJSON[edqFieldName];

      for (var j = 0; j < elementIds.length; j++) {
        var elementId = elementIds[j];

        configuration.addInputMapping(edqFieldName, elementId);

        if (edqFieldName != EDQ.DataQuality.AreaCode) {
          configuration.addDataSetSetting(elementId, edqFieldName, "Default");
        }
      }

      this.addConfiguration(configuration);
    }
  }
};

EDQ.DataQuality.Client.prototype._initializeForConfiguration = function _initializeForConfiguration(
  configuration
) {};

EDQ.DataQuality.Client.prototype._executeXMLHttpRequest = function _executeXMLHttpRequest(
  url,
  parameters,
  timeoutInMilliseconds,
  callback
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;

  var xhr;

  if (typeof XMLHttpRequest !== "undefined") {
    xhr = new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
  } else {
    var versions = [
      "MSXML2.XmlHttp.5.0",
      "MSXML2.XmlHttp.4.0",
      "MSXML2.XmlHttp.3.0",
      "MSXML2.XmlHttp.2.0",
      "Microsoft.XmlHttp"
    ]; // code for IE6, IE5

    for (var i = 0, max = versions.length; i < max; i++) {
      try {
        xhr = new ActiveXObject(versions[i]);
        break;
      } catch (e) {
        continue;
      }
    }
  }

  xhr.onreadystatechange = function ensureReadiness() {
    if (xhr.readyState < 4) return;

    if (xhr.readyState === 4) {
      var response;
      var errorMessage;

      try {
        response = JSON.parse(xhr.responseText);
        errorMessage = response.ValidationMessage;
      } catch (error) {
        sys.logError(error);
        errorMessage = EDQ.DataQuality.Client.getMessage("Invalid response");
      }

      callback(response, errorMessage, xhr);
    }
  };

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.timeout = timeoutInMilliseconds;
  xhr.ontimeout = function() {
    callback("", dq.Client.getMessage(dq.OperationTimedOutMessage), xhr);
  };

  xhr.send(JSON.stringify(parameters));
};

EDQ.DataQuality.Client.prototype._hideAllInputMappingElementsExcept = function _hideAllInputMappingElementsExcept(
  inputMappings,
  edqFieldNames
) {
  var sys = EDQ.system;

  for (var key in inputMappings) {
    if (!inputMappings.hasOwnProperty(key)) {
      continue;
    }

    var edqFieldName = key;

    if (sys.containsInArray(edqFieldName, edqFieldNames)) {
      this._showElementAndLabel(inputMappings[edqFieldName]);
    } else {
      this._hideElementAndLabel(inputMappings[edqFieldName]);
    }
  }
};

EDQ.DataQuality.Client.prototype._showElementAndLabel = function _showElementAndLabel(
  elementIds
) {
  this._executeActionOnElementAndLabel(
    elementIds,
    EDQ.DataQuality.Client.showElement
  );
};
EDQ.DataQuality.Client.prototype._hideElementAndLabel = function _hideElementAndLabel(
  elementIds
) {
  this._executeActionOnElementAndLabel(
    elementIds,
    EDQ.DataQuality.Client.hideElement
  );
};
EDQ.DataQuality.Client.prototype._executeActionOnElementAndLabel = function _executeActionOnElementAndLabel(
  elementIds,
  action
) {
  var sys = EDQ.system;

  for (var i = 0, max = elementIds.length; i < max; i++) {
    var elementId = elementIds[i];

    var field = sys.getElementById(elementId);
    if (!sys.isNull(field)) {
      action(field);
    }

    var label = sys.getElementLabelById(elementId);
    if (!sys.isNull(label)) {
      action(label);
    }
  }
};
EDQ.DataQuality.Client.prototype._handleErrorMessage = function _handleErrorMessage(
  configuration,
  edqFieldForMessage,
  message
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;

  var errorMessageLabelMapping =
    configuration._inputMappings[edqFieldForMessage];
  if (!sys.isNull(errorMessageLabelMapping)) {
    dq.Client._setValidationMessage(errorMessageLabelMapping[0], message);
  }
};

EDQ.DataQuality.Client._setValidationMessage = function _setValidationMessage(
  textId,
  text
) {
  var sys = EDQ.system;

  var validationMessageElement = sys.getElementById(textId);

  if (!sys.isNull(validationMessageElement)) {
    validationMessageElement.innerHTML = text;
    validationMessageElement.style.display = sys.isNullOrEmpty(text)
      ? "none"
      : "inline";
  }
};

EDQ.DataQuality.Client.prototype.setValues = function setValues(
  dataset,
  result,
  configuration
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;
  var client = dq.Client;

  var dataSetSettings = configuration.getDataSetSettings(dataset);
  if (sys.isNull(dataSetSettings)) {
    return;
  }
  var outputMappings = dataSetSettings.mappings;

  for (var key in outputMappings) {
    if (!outputMappings.hasOwnProperty(key)) {
      continue;
    }

    var htmlElementId = key;
    var edqFieldNames = outputMappings[key];
    var value = "";
    var canEdqFieldNameSetValueAllowedForResult = false;

    for (var i = 0; i < edqFieldNames.length; i++) {
      var edqFieldName = edqFieldNames[i];
      if (
        !sys.isNull(result[edqFieldName]) &&
        this.isEdqFieldNameSetValueAllowedForValidationStatus(
          edqFieldName,
          result.ValidationStatus
        )
      ) {
        canEdqFieldNameSetValueAllowedForResult = true;

        if (value.length > 0) {
          value += client.delimiter;
        }

        value += EDQ.DataQuality.Client.getMessage(result[edqFieldName]);
      }
    }

    if (canEdqFieldNameSetValueAllowedForResult === true)
      client.setElementValue(htmlElementId, value);
  }
};
EDQ.DataQuality.Client.prototype.isEdqFieldNameSetValueAllowedForValidationStatus = function isEdqFieldNameSetValueAllowedForValidationStatus(
  edqFieldName,
  validationStatus
) {
  return true;
};

EDQ.DataQuality.Client._setValue = function _setValue(
  elementId,
  edqFieldNames,
  result
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;
  var client = dq.Client;

  var val = "";
  var edqFieldName = "";
  for (var j = 0; j < edqFieldNames.length; j++) {
    edqFieldName = edqFieldNames[j];
    var edqFieldValue = EDQ.DataQuality.Client.getMessage(result[edqFieldName]);

    if (sys.isNullOrEmpty(edqFieldValue)) {
      continue;
    }

    if (val.length > 0) {
      val += client.delimiter;
    }

    val += edqFieldValue;
  }

  if (edqFieldName === dq.Corrections) {
    var returnMessage = sys.isNullOrEmpty(val)
      ? ""
      : "(" +
        EDQ.DataQuality.Client.getMessage("Suggested") +
        ": " +
        val +
        " )";
    client._setValidationMessage(elementId, returnMessage);
  } else {
    client.setElementValue(elementId, val);
  }
};
EDQ.DataQuality.Client.delimiter = " ";

EDQ.DataQuality.Client.setElementValue = function setElementValue(
  elementId,
  value
) {
  var sys = EDQ.system;

  sys.setElementValue(elementId, value);
};
EDQ.DataQuality.Client.showElement = function showElement(element) {
  var client = EDQ.DataQuality.Client;

  client._executeShowOrHideElementContainerOrElement(element, true);
};
EDQ.DataQuality.Client.hideElement = function hideElement(element) {
  var client = EDQ.DataQuality.Client;

  client._executeShowOrHideElementContainerOrElement(element, false);
};
EDQ.DataQuality.Client._executeShowOrHideElementContainerOrElement = function _executeShowOrHideElementContainerOrElement(
  element,
  show
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;
  var client = dq.Client;

  if (sys.isNull(element)) {
    return;
  }

  if (element.tagName === dq.HtmlTags.Div) {
    element.style.display = show ? "" : "none";
  }

  var container = client._tryGetElementContainer(element);
  if (!sys.isNull(container)) {
    element.style.display = "";
    element = container;
  }

  element.style.display = show ? "" : "none";
};
EDQ.DataQuality.Client._isElementContainerOrElementVisible = function _isElementContainerOrElementVisible(
  element
) {
  var sys = EDQ.system;
  var client = EDQ.DataQuality.Client;

  if (sys.isNull(element)) {
    return;
  }

  var container = client._tryGetElementContainer(element);
  if (!sys.isNull(container)) {
    element = container;
  }

  return element.style.display !== "none";
};
EDQ.DataQuality.Client.getConcatenatedElementValues = function getConcatenatedElementValues(
  elementIds,
  snapshot
) {
  var sys = EDQ.system;

  var value = "";
  for (var i = 0, max = elementIds.length; i < max; i++) {
    var element = sys.getElementById(elementIds[i]);

    if (!sys.isNull(element)) {
      var elementValue = this.getValue(element);

      if (!sys.isNull(snapshot)) {
        snapshot[elementIds[i]] = elementValue;
      }
      if (!sys.isNullOrEmpty(elementValue)) {
        value += elementValue + " ";
      }
    }
  }

  return value.trim();
};

EDQ.DataQuality.Client.getValue = function getValue(htmlElement) {
  var sys = EDQ.system;

  if (sys.isNull(htmlElement)) {
    return;
  }

  if (htmlElement.tagName === "LABEL") {
    return htmlElement.innerHTML;
  } else if (htmlElement.tagName === "SPAN") {
    return htmlElement.innerHTML;
  } else if (htmlElement.tagName === "SELECT") {
    return htmlElement.value;
  } else {
    return htmlElement.value;
  }
};

EDQ.DataQuality.Client.prototype.getConfigurationSnapshot = function getConfigurationSnapshot(
  configuration
) {
  var client = EDQ.DataQuality.Client;

  var configurationId = this.getConfigurationId(configuration);
  var snapshot = client.Snapshots[configurationId];

  return snapshot;
};
EDQ.DataQuality.Client.prototype.resetSnapshot = function resetSnapshot(
  configuration
) {
  var client = EDQ.DataQuality.Client;

  var configurationId = this.getConfigurationId(configuration);
  client.Snapshots[configurationId] = client.Snapshots[configurationId] || {};
};
EDQ.DataQuality.Client.prototype.getConfigurationId = function getConfigurationId(
  configuration
) {
  return this._configurations.indexOf(configuration);
};
EDQ.DataQuality.Client.prototype.restoreValuesFromSnapshot = function restoreValuesFromSnapshot(
  snapshot,
  mapping
) {
  /*var sys = EDQ.system;
     	
	for(var map in mapping) {
		if(!mapping.hasOwnProperty( map ) && mapping[map].length === 0) { continue; } 
 
		var mappingId = mapping[map][0];
		if(sys.isNull(snapshot[mappingId])) { continue; }
		
		var field = sys.getElementById(mappingId);
		if (sys.isNull(field)) {
            continue;
        }
		
        field.value = snapshot[mappingId];        
	} */
};

EDQ.DataQuality.Client.Snapshots = EDQ.DataQuality.Client.Snapshots || {};

EDQ.DataQuality.Client._tryGetElementContainer = function _tryGetElementContainer(
  element
) {
  var config = EDQ.DataQuality.Configuration;
  var client = EDQ.DataQuality.Client;

  var depth = config.ElementContainerDepth;

  var parentNodeOfElement;
  if (depth) {
    parentNodeOfElement = EDQ.JQuery(element);

    for (var i = 0; i < depth; i++) {
      parentNodeOfElement = parentNodeOfElement.parent();
    }
    parentNodeOfElement =
      parentNodeOfElement.size() > 0 ? parentNodeOfElement.get(0) : undefined;
  } else {
    parentNodeOfElement = element.parentNode;
  }

  if (client._isContainerElement(parentNodeOfElement)) {
    return parentNodeOfElement;
  }

  return undefined;
};

EDQ.DataQuality.Client._isContainerElement = function _isContainerElement(
  element
) {
  var dq = EDQ.DataQuality;

  if (
    element.tagName === dq.HtmlTags.Div ||
    element.tagName === dq.HtmlTags.ListItem ||
    element.tagName === dq.HtmlTags.Span ||
    element.tagName === dq.HtmlTags.TableRow ||
    element.tagName === dq.HtmlTags.TableData ||
    element.tagName === dq.HtmlTags.DescriptionTerm
  ) {
    return true;
  }

  return false;
};
EDQ.DataQuality.Client.setProgress = function setProgress(
  actionElement,
  messageElement,
  progressMessage
) {
  var sys = EDQ.system;

  if (sys.isNull(messageElement)) {
    messageElement = actionElement;
  }

  var actionElementJQuery = EDQ.JQuery(actionElement);
  var messageElementJQuery = EDQ.JQuery(messageElement);
  if (sys.isNullOrEmpty(progressMessage)) {
    //progressMessage = EDQ.DataQuality.Client.getMessage("Working...");
  }

  if (messageElementJQuery.is("input")) {
    //messageElementJQuery.attr("data-oldvalue", messageElementJQuery.attr("value"));
    messageElementJQuery.attr("value", progressMessage);
  } else {
    //messageElementJQuery.attr("data-oldvalue", messageElementJQuery.text());
    messageElementJQuery.text(progressMessage);
  }
  $(".loaderback").addClass("showLoader");
  //actionElementJQuery.attr("disabled", true);
};
EDQ.DataQuality.Client.removeProgress = function removeProgress(
  actionElement,
  messageElement
) {
  var sys = EDQ.system;

  if (sys.isNull(messageElement)) {
    messageElement = actionElement;
  }

  var actionElementJQuery = EDQ.JQuery(actionElement);
  var messageElementJQuery = EDQ.JQuery(messageElement);

  if (messageElementJQuery.is("input")) {
    messageElementJQuery.attr(
      "value",
      messageElementJQuery.attr("data-oldvalue")
    );
  } else {
    messageElementJQuery.text(messageElementJQuery.attr("data-oldvalue"));
  }

  actionElementJQuery.attr("disabled", false);
  $(".loaderback").removeClass("showLoader");
};
EDQ.DataQuality.Client.setProgressToInput = function setProgressToInput(
  element
) {
  EDQ.DataQuality.Client.clearInput(element);
  var iconElement = EDQ.DataQuality.Client.createOrGetIcon(
    element,
    "edq-progress-image"
  );
  EDQ.DataQuality.Client.setIconToInput(EDQ.JQuery(element), iconElement);
};
EDQ.DataQuality.Client.setValidatedToInput = function setSuccessToInput(
  element,
  message,
  imageMessage,
  validationMessageTimeOut
) {
  var sys = EDQ.system;
  EDQ.DataQuality.Client.clearInput(element);

  var elementJQuery = EDQ.JQuery(element);
  elementJQuery.attr("title", imageMessage);

  var messageElement = EDQ.DataQuality.Client._createInlineMessageElement(
    element,
    message
  );
  element.parentElement.insertBefore(messageElement, element.nextSibling);

  setTimeout(function() {
    messageElement.remove();
    elementJQuery.tooltip("disable");
  }, validationMessageTimeOut);

  var iconElement = EDQ.DataQuality.Client.createOrGetIcon(
    element,
    "edq-validated-image"
  );
  EDQ.DataQuality.Client.setIconToInput(
    EDQ.JQuery(element),
    iconElement,
    imageMessage,
    "green"
  );
};
EDQ.DataQuality.Client.setNotValidatedToInput = function setNotValidatedToInput(
  element,
  message,
  imageMessage,
  validationMessageTimeOut
) {
  var sys = EDQ.system;
  EDQ.DataQuality.Client.clearInput(element);

  var elementJQuery = EDQ.JQuery(element);
  elementJQuery.attr("title", imageMessage);

  var messageElement = EDQ.DataQuality.Client._createInlineMessageElement(
    element,
    message
  );
  element.parentElement.insertBefore(messageElement, element.nextSibling);

  setTimeout(function() {
    if (!sys.isNullOrEmpty(messageElement)) messageElement.remove();

    elementJQuery.tooltip("disable");
  }, validationMessageTimeOut);

  var iconElement = EDQ.DataQuality.Client.createOrGetIcon(
    element,
    "edq-not-validated-image"
  );
  EDQ.DataQuality.Client.setIconToInput(
    elementJQuery,
    iconElement,
    imageMessage,
    "red"
  );
};
EDQ.DataQuality.Client._createInlineMessageElement = function _createInlineMessageElement(
  element,
  message
) {
  var sys = EDQ.system;
  var messageElement = sys.createElement(
    "div",
    "inline-message" + element.id,
    message,
    "left error-message"
  );
  var oldMessage = document.getElementById("inline-message" + element.id);

  if (typeof messageElement.remove === "undefined") {
    messageElement.remove = function remove() {
      element.parentElement.removeChild(this);
    };
  }

  if (!sys.isNullOrEmpty(oldMessage)) {
    element.parentElement.removeChild(oldMessage);
  }

  return messageElement;
};
EDQ.DataQuality.Client.clearInput = function clearInput(element) {
  EDQ.DataQuality.Client.createOrGetIcon(element, "edq-progress-image").hide();
  EDQ.DataQuality.Client.createOrGetIcon(element, "edq-validated-image").hide();
  EDQ.DataQuality.Client.createOrGetIcon(
    element,
    "edq-not-validated-image"
  ).hide();
};
EDQ.DataQuality.Client.setIconToInput = function setIconToInput(
  element,
  iconElement,
  message,
  color,
  onMessageOpen
) {
  var position = element.offset();
  var top = position.top + (element.height() - iconElement.height()) / 2;
  var left = position.left + element.width() + 8;
  iconElement.attr(
    "style",
    "position: absolute; left: " + left + "px; top: " + top + "px;"
  );

  if (message) {
    iconElement.attr("title", message);
    iconElement.tooltip({
      open: function(event, ui) {
        if (onMessageOpen) onMessageOpen();
      },
      items: "[title]",
      content: function() {
        var element = EDQ.JQuery(this);
        return (
          "<span style='color: " +
          (color ? color : "#000") +
          ";'>" +
          element.attr("title") +
          "</span>"
        );
      }
    });
  }
};
EDQ.DataQuality.Client.createOrGetIcon = function createAndGetIcon(
  element,
  icon
) {
  var iconElementId = EDQ.JQuery(element).attr("id") + "-" + icon;
  var iconElement = EDQ.JQuery("#" + iconElementId);
  if (iconElement.size() == 0) {
    var originalIconElement = EDQ.JQuery("#" + icon);
    iconElement = originalIconElement.clone();
    iconElement.attr("id", iconElementId);
    EDQ.JQuery("body").append(iconElement);
    iconElement.hide();
  }
  return iconElement;
};
EDQ.DataQuality.Client.isTargetPage = function isTargetPage(targetPage) {
  var urlPath = this._getUrlPath(
    window.location.href,
    targetPage.indexOf("#") != -1
  );
  if (urlPath.toLowerCase().indexOf(targetPage.toLowerCase()) != -1) {
    return true;
  } else {
    return (
      this._excludeStoreLocalization(targetPage.toLowerCase()) ==
      this._excludeStoreLocalization(urlPath.toLowerCase())
    );
  }
};
EDQ.DataQuality.Client._getUrlPath = function _getUrlPath(url, retainHashTag) {
  var urlPath = url;

  if (url.indexOf("?") != -1) {
    urlPath = url.substring(0, url.indexOf("?"));
  } else if (urlPath.indexOf("#") != -1) {
    urlPath = urlPath.substring(0, url.indexOf("#"));
  }

  var pageHashTag = "";
  if (url.indexOf("#") != -1) pageHashTag = url.substring(url.indexOf("#"));

  urlPath = urlPath.replace("http://", "");
  urlPath = urlPath.replace("https://", "");
  urlPath = urlPath.substring(urlPath.indexOf("/"));

  return urlPath + (retainHashTag === true ? pageHashTag : "");
};
EDQ.DataQuality.Client._excludeStoreLocalization = function _excludeStoreLocalization(
  url
) {
  var sys = EDQ.system;

  var store = "store";
  var indexOfStore = url.indexOf(store);

  if (indexOfStore < 0) {
    sys.logError("the parameter doesn't contain '" + store + "'");
    return url;
  }

  var indexOfFirestSlashAfterStore = url.indexOf("/", indexOfStore);
  if (indexOfFirestSlashAfterStore < 0) {
    sys.logError("the parameter doesn't contain '/' after '" + store + "'");
    return url;
  }

  var localization = url.substr(
    indexOfStore + store.length,
    indexOfFirestSlashAfterStore - (indexOfStore + store.length)
  );

  return url.replace(localization, "");
};

EDQ.DataQuality.Client.getMessage = function getMessage(message) {
  var sys = EDQ.system;
  return !sys.isNullOrEmpty(EDQ.DataQuality.Client.Messages[message])
    ? EDQ.DataQuality.Client.Messages[message]
    : message;
};

EDQ.DataQuality.Client._attachEvent = function _attachEvent(
  element,
  eventName,
  callback
) {
  var sys = EDQ.system;

  if (sys.isNull(element)) {
    sys.logError("Invalid argument 'element' is null in _attachEvent.");
    return;
  }
  if (sys.isNull(eventName)) {
    sys.logError(
      "Invalid argument 'eventName' is null or empty in _attachEvent."
    );
    return;
  }
  if (sys.isNull(callback) || !sys.isFunction(callback)) {
    sys.logError(
      "Invalid argument 'callback' is null or empty in _attachEvent."
    );
    return;
  }
  if (element.isEDQEventAttached !== true) {
    element[eventName] = callback;
    element.isEDQEventAttached = true;
  }
};
//Client_End

EDQ.DataQuality.ConfigurationType = { Email: 1, Phone: 2, Address: 3 };
EDQ.DataQuality.WorkFlowStages = {
  Input: 0,
  Suggestions: 1,
  Refining: 2,
  Verified: 3
};

EDQ.DataQuality.Number = "Number";
EDQ.DataQuality.AreaCode = "DefaultCountryCode";
EDQ.DataQuality.EmailAddress = "EmailAddress";
EDQ.DataQuality.Message = "ValidationMessage";
EDQ.DataQuality.Certainty = "Certainty";
EDQ.DataQuality.Loader = "Loader";
EDQ.DataQuality.ErrorMessage = "ValidationMessage";
EDQ.DataQuality.ValidationStatusVerified = "Verified";
EDQ.DataQuality.ValidationStatusNotVerified = "Not Verified";
EDQ.DataQuality.Unknown = "";
EDQ.DataQuality.ValidationStatus = "ValidationStatus";
EDQ.DataQuality.Country = "Country";
EDQ.DataQuality.PhoneCountry = "PhoneCountry";
EDQ.DataQuality.Suggested = "Suggested";
EDQ.DataQuality.Corrections = "Corrections";

EDQ.DataQuality.DataSet = "DataSet";
EDQ.DataQuality.Engine = "Engine";
EDQ.DataQuality.FlattenPickList = "FlattenPickList";
EDQ.DataQuality.Street = "Street1";
EDQ.DataQuality.City = "City";
EDQ.DataQuality.Postcode = "Postcode";
EDQ.DataQuality.State = "State";
EDQ.DataQuality.BuildingNumber = "BuildingNumber";
EDQ.DataQuality.Floor = "Floor";
EDQ.DataQuality.Apartment = "Apartment";
EDQ.DataQuality.RuralDelivery = "RuralDelivery";

/* System Fields */
EDQ.DataQuality.FindAddressButton = "FindAddressButton";
EDQ.DataQuality.SubmitButton = "SubmitButton";
EDQ.DataQuality.ChangeAddressButton = "ChangeAddressButton";
EDQ.DataQuality.BackButton = "BackButton";
EDQ.DataQuality.SelectButton = "SelectButton";
EDQ.DataQuality.NextButton = "NextButton";
EDQ.DataQuality.Suggestions = "Suggestions";
EDQ.DataQuality.UnknownPostCode = "UnknownPostCode";
EDQ.DataQuality.KnownPostCode = "KnownPostCode";
EDQ.DataQuality.RefineInput = "Refinement";
EDQ.DataQuality.ManualEntry = "ManualEntry";
EDQ.DataQuality.TryAgain = "TryAgain";
EDQ.DataQuality.Moniker = "Moniker";
EDQ.DataQuality.Layout = "Layout";
EDQ.DataQuality.VerificationLevel = "VerificationLevel";

EDQ.DataQuality.HtmlTags.Span = "SPAN";
EDQ.DataQuality.HtmlTags.Div = "DIV";
EDQ.DataQuality.HtmlTags.ListItem = "LI";
EDQ.DataQuality.HtmlTags.DescriptionTerm = "DT";
EDQ.DataQuality.HtmlTags.TableRow = "TR";
EDQ.DataQuality.HtmlTags.TableData = "TD";
EDQ.DataQuality.HtmlTags.Select = "SELECT";
EDQ.DataQuality.HtmlTags.Label = "LABEL";
EDQ.DataQuality.HtmlTags.Button = "BUTTON";
EDQ.DataQuality.HtmlTags.Link = "A";
EDQ.DataQuality.HtmlTags.Option = "OPTION";
EDQ.DataQuality.HtmlTags.Input = "INPUT";

EDQ.DataQuality.PhoneResultCodesAndDescriptions = {
  VERIFIED: {
    InternalNote: "Number format validated and number verified",
    ClientMessage: "Verified"
  },
  UNVERIFIED: {
    InternalNote: "Invalid number format supplied",
    ClientMessage: "Could not be Verified"
  },
  UNKNOWN: {
    InternalNote: "Valid number format but not verified with network lookup",
    ClientMessage: "Verified"
  },
  ABSENT: {
    InternalNote:
      "Number format validated and number verified via network lookup but not currently available (i.e. phone off, out of range)",
    ClientMessage: "Verified"
  },
  "TELESERVICE NOT PROVISIONED": {
    InternalNote: "Valid number but not active on a network",
    ClientMessage: "Verified"
  },
  "CALL BARRED": {
    InternalNote: "Number has been blocked from lookups",
    ClientMessage: "Verified"
  }
};
EDQ.DataQuality.EmailResultCodesAndDescriptions = {
  VERIFIED: {
    InternalNote:
      "Mailbox exists, is reachable, and not known to be illegitimate or disposable.",
    ClientMessage: "Email address validated!"
  },
  UNDELIVERABLE: {
    InternalNote: "Domain is administered by a disposable email provider.",
    ClientMessage:
      "Username does not exist, or mailbox is suspended or disabled. To proceed, please provide a valid e-mail address."
  },
  UNREACHABLE: {
    InternalNote: "Domain has no reachable mail exchangers.",
    ClientMessage:
      "Email domain could not be reached or verified. To proceed, please provide a valid e-mail address."
  },
  ILLEGITIMATE: {
    InternalNote:
      "Seed, spamtrap, black hole, technical role account or inactive domain.",
    ClientMessage:
      "Email could not be verified. To proceed, please provide a valid e-mail address."
  },
  DISPOSABLE: {
    InternalNote:
      "Mailbox or domain does not exist, or mailbox is full, suspended or disabled.",
    ClientMessage:
      "Email is suspected as disposable. To proceed, please provide a valid e-mail address."
  },
  UNKNOWN: {
    InternalNote:
      "We were unable to conclusively verify or invalidate this address.",
    ClientMessage: "Email address validated!"
  }
};

EDQ.DataQuality.AddressVerifyLevels = {
  VERIFIED: "Verified",
  INTERACTIONREQUIRED: "InteractionRequired",
  STREETPARTIAL: "StreetPartial",
  PREMISESPARTIAL: "PremisesPartial",
  MULTIPLE: "Multiple",
  NONE: "None"
};

EDQ.DataQuality.AddressVerifyLevelsPrompt = {
  InteractionRequired: {
    header:
      "<b>We think that your address may be incorrect or incomplete.</b><br />To proceed, please choose one of the options below.",
    prompt: "We recommend:",
    button: "Use suggested address"
  },
  PremisesPartial: {
    header:
      "<b>Sorry, we think your apartment/suite/unit is missing or wrong</b><br />To proceed, please enter your apartment/suite/unit or use your address as entered",
    prompt: "Confirm your apartment/suite/unit number:",
    button: "Confirm Number",
    showPicklist: "Show all potential matches",
    invalidRange: "Secondary information not within valid range"
  },
  StreetPartial: {
    header:
      "<b>Sorry, we do not recognize your house or building number.</b><br />To proceed, please check and choose from one of the options below.",
    prompt: "Confirm your house/building number:",
    button: "Confirm Number",
    showPicklist: "Show all potential matches",
    invalidRange: "Primary information not within valid range"
  },
  DPVPartial: {
    header:
      "<b>Sorry, we do not recognize your house or building number.</b><br />To proceed, please check and choose from one of the options below.",
    prompt: "Confirm your house/building number:",
    button: "Confirm Number"
  },
  AptAppend: {
    header:
      "<b>Sorry, we think your apartment/suite/unit may be missing.</b><br />To proceed, please check and choose from one of the options below.",
    prompt: "Confirm Apt/Ste:",
    button: "Continue",
    noApt: "I do not have an apt or suite"
  },
  Multiple: {
    header:
      "<b>We found more than one match for your address.</b><br />To proceed, please choose one of the options below.",
    prompt: "Our suggested matches:"
  },
  None: {
    header:
      "<b>Sorry, we could not find a match for your address.</b><br />To proceed, please choose one of the options below."
  },
  RightSide: {
    prompt: "You entered:",
    edit: "Edit",
    button: "Use Address As Entered*",
    warning: "<b>*Your address may be undeliverable</b>"
  },
  ConfirmEmailPhone: {
    header:
      "<b>Sorry we could not confirm your e-mail address and phone number</b><br />To proceed, please confirm your e-mail address and phone number below.",
    headerPhone:
      "<b>Sorry we could not confirm your phone number</b><br />To proceed, please confirm your phone number below.",
    headerEmail:
      "<b>Sorry we could not confirm your e-mail address</b><br />To proceed, please confirm your e-mail address below.",
    promptEmail: "Confirm or edit your e-mail address",
    promptPhone: "Confirm or edit your phone number"
  },
  waitMessage: "Please wait, your details are being verified",
  title: "Verify Your Address Details",
  emailphoneTitle: "Verify your contact details"
};

EDQ.DataQuality.Snapshot = {};

//Message
EDQ.DataQuality.OperationTimedOutMessage = "Operation timed out";
EDQ.DataQuality.InvalidResponse = "Invalid response";
//Don't remove "{0}" anywhere.
EDQ.DataQuality.Client.Messages = {
  "Invalid response": "Invalid response",
  "Operation timed out": "Operation timed out",
  "Please enter address information": "Please enter address information",
  "Please select an option": "Please select an option",
  "You entered {0}, but this address is outside of the range. Please try again or click Back and select the correct range.":
    "You entered {0}, but this address is outside of the range. Please try again or click Back and select the correct range.",
  "Please enter exact details": "Please enter exact details",
  "There is no dataset settings for dataset: {0}":
    "There is no dataset settings for dataset: {0}",
  "Please enter your exact building details":
    "Please enter your exact building details",
  "There was a problem with your search. Please try again.":
    "There was a problem with your search. Please try again.",
  Suggested: "Suggested",
  "No value entered": "No value entered",
  "Working...": "Working...",
  "No matches": "No matches",
  "Search cancelled (too many matches)": "Search cancelled (too many matches)",
  Verified: "Verified",
  "User Preferred": "User Preferred",
  "Not Verified": "Not Verified",

  //Buttons
  "Use suggested address": "Use suggested address"
};
EDQ.DataQuality.Address = EDQ.DataQuality.Address || {};
//Configuration_Start
EDQ.DataQuality.Address.Configuration = function Configuration(
  inputMappings,
  originalInputMappings,
  dataSetSettings
) {
  var dq = EDQ.DataQuality;

  this._isUnknownPostCode = false;
  this._injectInputMappingForInline = false;
  this._stage = dq.WorkFlowStages.Input;
  this._originalInputMappings = originalInputMappings || {}; //The input mapping the user submitted

  dq.Configuration.apply(this, [
    inputMappings,
    dataSetSettings,
    dq.ConfigurationType.Address
  ]);
};
EDQ.system.inherit(
  EDQ.DataQuality.Address.Configuration,
  EDQ.DataQuality.Configuration
);

EDQ.DataQuality.Address.Configuration.prototype.addOriginalInputMapping = function addOriginalInputMapping(
  edqFieldName,
  elementIdOrIds
) {
  this._addMapping(this._originalInputMappings, edqFieldName, elementIdOrIds);
};

EDQ.DataQuality.Address.Configuration.prototype._createInputMappingsAndDataSetSettingsFor = function _createInputMappingsAndDataSetSettingsFor(
  mappingJSON,
  configurationId
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;

  this.UsePromptSets = mappingJSON.UsePromptSets;
  this.CanChangeLabels = mappingJSON.CanChangeLabels;
  this.CanChangeOrder = mappingJSON.CanChangeOrder;
  this.EnforceUsage = mappingJSON.EnforceUsage;

  //Generate Input Mappings
  this._createInputMappingFor(
    mappingJSON.InputMapping,
    configurationId,
    dq.Address.InputMappingType.Input
  );
  this._createInputMappingFor(
    mappingJSON.PromptSetInputMapping,
    configurationId,
    dq.Address.InputMappingType.PromptSet
  );
  this._createInputMappingFor(
    mappingJSON.SystemMapping,
    configurationId,
    dq.Address.InputMappingType.System
  );
  this._createDataSetSettingsFor(mappingJSON.DataSetSettings);

  for (var key in mappingJSON.DataSetSettings) {
    if (
      !sys.isNullOrEmpty(mappingJSON.DataSetSettings[key]) &&
      !mappingJSON.DataSetSettings[key].UseModal
    ) {
      this._injectInputMappingForInline = true;
      break;
    }
  }

  if (this._injectInputMappingForInline) {
    var injectSystemFields = sys.isNullOrEmpty(mappingJSON.SystemMapping);
    var injectPromptSetFields =
      this.UsePromptSets &&
      sys.isNullOrEmpty(mappingJSON.PromptSetInputMapping);
    this.injectInputMappingFields(injectSystemFields, injectPromptSetFields);
  }
};

EDQ.DataQuality.Address.Configuration.prototype._createInputMappingFor = function _createInputMappingFor(
  inputMappingJSON,
  configurationId,
  inputMappingType
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;
  var promptset = dq.Address.PromptSet;

  for (var key in inputMappingJSON) {
    if (!inputMappingJSON.hasOwnProperty(key)) {
      continue;
    }

    var edqFieldName = key;
    var elementIds = inputMappingJSON[edqFieldName];

    for (var i = 0; i < elementIds.length; i++) {
      var elementId = elementIds[i];
      var element = sys.getElementById(elementId);

      if (edqFieldName == dq.SubmitButton) {
        if (sys.isNull(element)) {
          element = EDQ.JQuery("[name='" + elementId + "']");
          if (element.size() != 0) {
            elementId = "edq-" + configurationId + "-" + edqFieldName;
            element.attr("id", elementId);
          }
        }

        this.addInputMapping(edqFieldName, elementId);
      }

      if (inputMappingType === dq.Address.InputMappingType.Input) {
        this.addOriginalInputMapping(edqFieldName, elementId);
      }

      if (this.UsePromptSets) {
        if (inputMappingType !== dq.Address.InputMappingType.Input) {
          this.addInputMapping(edqFieldName, elementId);
        }
      } else {
        if (inputMappingType !== dq.Address.InputMappingType.PromptSet) {
          this.addInputMapping(edqFieldName, elementId);
        }
      }
    }
  }

  if (inputMappingType === dq.Address.InputMappingType.Input) {
    return;
  }

  for (var key in promptset.EDQFieldsMetadata) {
    var edqFieldMetadata = promptset.EDQFieldsMetadata[key];

    if (sys.isUndefined(edqFieldMetadata.Items)) continue;

    for (var i = 0; i < edqFieldMetadata.Items.length; i++) {
      var edqFieldMetadataItem = edqFieldMetadata.Items[i];

      if (inputMappingType === dq.Address.InputMappingType.System) {
        if (
          edqFieldMetadataItem.Type === "System" &&
          (sys.isNullOrEmpty(inputMappingJSON) ||
            sys.isUndefined(inputMappingJSON))
        ) {
          this.addInputMapping(
            edqFieldMetadataItem.Name,
            "edq-" + configurationId + "-sys-" + edqFieldMetadataItem.Name
          ); //Fields to be injected.
        }
      } else if (
        this.UsePromptSets &&
        (sys.isNullOrEmpty(inputMappingJSON) ||
          sys.isUndefined(inputMappingJSON)) &&
        edqFieldMetadataItem.Type === "PromptSet"
      ) {
        if (edqFieldMetadataItem.Name === dq.DataSet) {
          this.addInputMapping(
            edqFieldMetadataItem.Name,
            this._originalInputMappings[edqFieldMetadataItem.Name][0]
          ); //Keep the dataset original field.
        } else {
          var elementId =
            "edq-" + configurationId + "-" + edqFieldMetadataItem.Name;
          this.addInputMapping(edqFieldMetadataItem.Name, elementId); //Fields to be injected.
        }
      }
    }
  }
};

EDQ.DataQuality.Address.Configuration.prototype._createDataSetSettingsFor = function _createDataSetSettingsFor(
  dataSetSettingsJSON
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;

  for (var key in dataSetSettingsJSON) {
    var dataSet = dataSetSettingsJSON[key][dq.DataSet];
    var layout = dataSetSettingsJSON[key][dq.Layout];
    var useModal = dataSetSettingsJSON[key].UseModal;
    for (var key2 in dataSetSettingsJSON[key].OutputMapping) {
      if (!dataSetSettingsJSON[key].OutputMapping.hasOwnProperty(key2)) {
        continue;
      }

      var elementId = key2;

      this.addDataSetSetting(
        elementId,
        dataSetSettingsJSON[key].OutputMapping[elementId],
        dataSet,
        layout,
        useModal
      );
    }
  }
};
EDQ.DataQuality.Address.Configuration.prototype.injectInputMappingFields = function injectInputMappingFields(
  injectSystemFields,
  injectPromptSetFields
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;
  var addressClient = EDQ.DataQuality.Address.Client;
  var promptset = EDQ.DataQuality.Address.PromptSet;

  if (!injectSystemFields && !injectPromptSetFields) {
    return;
  }

  var insertAfterElementId = this._getElementIdOfLastElementInOriginalInputMapping();
  var streetElementId = this._originalInputMappings[dq.Street][0];

  dq.Configuration.ElementContainerDepth = addressClient._getElementContainerDepth(
    insertAfterElementId,
    streetElementId
  );

  var exampleElement = sys.getElementById(streetElementId);
  var insertAfterElement = sys.getElementById(insertAfterElementId);

  if (!sys.isNull(exampleElement) && !sys.isNull(insertAfterElement)) {
    var exampleElementContainer = EDQ.DataQuality.Client._tryGetElementContainer(
      exampleElement
    );
    var insertAfterElementContainer = EDQ.DataQuality.Client._tryGetElementContainer(
      insertAfterElement
    );

    if (
      !sys.isNull(exampleElementContainer) &&
      !sys.isNull(insertAfterElementContainer)
    ) {
      var exampleElementContainerJQuery = EDQ.JQuery(exampleElementContainer);
      var insertAfterElementContainerJQuery = EDQ.JQuery(
        insertAfterElementContainer
      );

      for (var key in promptset.EDQFieldsMetadata) {
        var edqFieldMetadata = promptset.EDQFieldsMetadata[key];

        var htmlCopy = exampleElementContainerJQuery.clone();

        htmlCopy.find("span.example").remove();
        htmlCopy.find("input[type='hidden']").remove();

        var htmlCopyForGroupElement = htmlCopy.clone();

        if (sys.isUndefined(edqFieldMetadata.Items)) continue;

        var isGroup = edqFieldMetadata.Items.length > 1;
        var continueWithNext = false;

        var cleanContainer = false;
        if (isGroup) {
          htmlCopy.css("display", "block");
          cleanContainer = true;
        }

        for (var i = 0; i < edqFieldMetadata.Items.length; i++) {
          var edqFieldMetadataItem = edqFieldMetadata.Items[i];

          if (edqFieldMetadataItem.Name === dq.DataSet) {
            continueWithNext = true;
            continue;
          }

          if (
            (edqFieldMetadataItem.Type === "System" && injectSystemFields) ||
            (edqFieldMetadataItem.Type === "PromptSet" && injectPromptSetFields)
          ) {
            var elementId = this._inputMappings[edqFieldMetadataItem.Name][0];

            var elementHtml = EDQ.JQuery(edqFieldMetadataItem.Html);
            elementHtml.attr("id", elementId);

            if (!isGroup) {
              if (edqFieldMetadataItem.HasLabel) {
                htmlCopy.find("label").attr("for", elementId);
                htmlCopy
                  .find("label")
                  .attr("OriginalLabel", edqFieldMetadataItem.Label);
                htmlCopy.find("label").text(edqFieldMetadataItem.Label);
              } else {
                htmlCopy.find("label").remove();
              }

              htmlCopy.find("#" + streetElementId).replaceWith(elementHtml);
            } else {
              if (
                edqFieldMetadata.WrapperHtmlTag &&
                edqFieldMetadata.WrapperHtmlTag !== ""
              ) {
                elementHtml = elementHtml
                  .wrap(edqFieldMetadata.WrapperHtmlTag)
                  .parent();
              }

              if (cleanContainer) {
                htmlCopy.find("label").remove();
                htmlCopy.find("#" + streetElementId).replaceWith(elementHtml);
                cleanContainer = false;
              } else {
                var htmlCopy1 = htmlCopyForGroupElement.clone();
                htmlCopy1.find("label").remove();
                htmlCopy1.find("#" + streetElementId).replaceWith(elementHtml);
                htmlCopy.append(htmlCopy1.children(":first"));
              }
            }
          } else {
            continueWithNext = true;
          }
        }

        if (continueWithNext) {
          continue;
        }

        htmlCopy.insertAfter(insertAfterElementContainerJQuery);
        insertAfterElementContainerJQuery = htmlCopy;
      }
    }
  }
};
EDQ.DataQuality.Address.Configuration.prototype._getElementIdOfLastElementInOriginalInputMapping = function _getElementIdOfLastElementInOriginalInputMapping() {
  var last = undefined;

  for (var key in this._originalInputMappings) {
    var elementIds = this._originalInputMappings[key];

    for (var i = 0; i < elementIds.length; i++) {
      var elementId = elementIds[i];

      var element;
      try {
        element = EDQ.JQuery("#" + elementId);
      } catch (e) {
        element = EDQ.JQuery("[name='" + elementId + "']");
      }

      if (element.size() > 0) {
        if (!last) {
          last = element;
        } else {
          var containerOfElement = EDQ.DataQuality.Client._tryGetElementContainer(
            element.get(0)
          );
          var containerOfLast = EDQ.DataQuality.Client._tryGetElementContainer(
            last.get(0)
          );

          var containerOfElementJQueryElement = EDQ.JQuery(containerOfElement);
          var containerOfLastJQueryElement = EDQ.JQuery(containerOfLast);
          if (
            containerOfElementJQueryElement
              .prevAll()
              .filter(containerOfLastJQueryElement).length !== 0
          ) {
            last = element;
          }
        }
      }
    }
  }

  return last ? last.get(0).id : null;
};
//Configuration_End

//Client Start
EDQ.DataQuality.Address.Client = function Client(configurations) {
  var dq = EDQ.DataQuality;

  dq.Client.apply(this, [configurations]);

  var promptset = EDQ.DataQuality.Address.PromptSet;
  for (var key in promptset.Configurations) {
    for (var index in promptset.Configurations[key].fields) {
      var field = promptset.Configurations[key].fields[index];
      field.label = promptset._loadLabelMessages(field.label);
    }
  }

  for (var key in promptset.EDQFieldsMetadata) {
    var items = promptset.EDQFieldsMetadata[key].Items;
    for (var internalKeys in items) {
      var item = items[internalKeys];

      promptset.EDQFieldsMetadata[key].Items[
        internalKeys
      ].Html = promptset._loadHtmlElementMessages(item.Html);
      promptset.EDQFieldsMetadata[key].Items[
        internalKeys
      ].Label = promptset._loadLabelMessages(item.Label);
    }
  }
};
EDQ.system.inherit(EDQ.DataQuality.Address.Client, EDQ.DataQuality.Client);

EDQ.DataQuality.Address.Client.prototype.createConfigurationsFor = function createConfigurationsFor(
  addressMappings
) {
  var dq = EDQ.DataQuality;

  for (var i = 0; i < addressMappings.length; i++) {
    var mappingJSON = addressMappings[i];

    if (
      !mappingJSON ||
      !mappingJSON.InputMapping ||
      !mappingJSON.DataSetSettings
    ) {
      continue; // Do not add if invalid
    }

    if (!dq.Client.isTargetPage(mappingJSON.Page)) continue;

    var addressConfiguration = new dq.Address.Configuration();
    addressConfiguration.ShowManualEntry = mappingJSON.AlwaysShowManualEntry;
    addressConfiguration._createInputMappingsAndDataSetSettingsFor(
      mappingJSON,
      i
    );
    addressConfiguration.ServiceValidationTimeoutInMilliseconds = mappingJSON.ServiceValidationTimeoutInSeconds
      ? parseInt(mappingJSON.ServiceValidationTimeoutInSeconds) * 1000
      : 10000;

    this.addConfiguration(addressConfiguration);
  }
};

// Recursively take both element's parent. Return the parent as a container if both parents are the same and are container elements.
EDQ.DataQuality.Address.Client._getElementContainerDepth = function _getElementContainerDepth(
  element1Id,
  element2Id
) {
  var client = EDQ.DataQuality.Client;

  var depth = 0;

  var parent1 = EDQ.JQuery("#" + element1Id).parent();
  var parent2 = EDQ.JQuery("#" + element2Id).parent();

  var elementAtDepth = undefined;
  while (
    parent1 &&
    parent1.size() > 0 &&
    parent2 &&
    parent2.size() > 0 &&
    !parent1.is(parent2)
  ) {
    depth++;

    elementAtDepth = parent1.get(0);

    parent1 = parent1.parent();
    parent2 = parent2.parent();
  }

  if (client._isContainerElement(elementAtDepth)) {
    return depth;
  }

  return null;
};

///////////////////////////////////////////////////
EDQ.DataQuality.Address.Client.prototype._initializeForConfiguration = function _initializeForConfiguration(
  configuration
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;
  var dqClient = EDQ.DataQuality.Client;

  var client = this;

  var dataSetElement = configuration._getElementFromInputMappingByEdqFieldName(
    dq.DataSet
  );
  if (sys.isNull(dataSetElement)) {
    return;
  }

  var previousOnChange = dataSetElement.onchange;
  dqClient._attachEvent(dataSetElement, "onchange", function(event, value) {
    if (sys.isFunction(previousOnChange)) {
      previousOnChange.apply(this, [event]);
    }

    try {
      var dataSet = client._getDataSetFromConfiguration(configuration);
      var dataSetSettings = configuration.getDataSetSettings(dataSet);

      if (sys.isNull(dataSetSettings)) {
        client._showManualEntryFor(configuration);
        sys.logError(
          sys.stringFormat(
            EDQ.DataQuality.Client.getMessage(
              "There is no dataset settings for dataset: {0}"
            ),
            dataSet
          )
        );
        return;
      }

      //client._clearInputs(configuration);

      if (dataSetSettings.useModal) {
        client._showManualEntryFor(configuration);
      } else {
        client._showPromptSetFor(
          configuration,
          dataSet,
          configuration.isUnknownPostCode
        );
      }
    } catch (error) {
      sys.logError(error);
    }
  });

  var findAddressElement = configuration._getElementFromInputMappingByEdqFieldName(
    dq.FindAddressButton
  );
  if (configuration._injectInputMappingForInline) {
    dqClient._attachEvent(findAddressElement, "onclick", function() {
      try {
        if (
          client._callOnValidationStart(configuration, findAddressElement) ===
          false
        ) {
          return;
        }

        client._findAddress(
          configuration,
          function() {
            EDQ.DataQuality.Client.setProgress(findAddressElement);
          },
          function() {
            EDQ.DataQuality.Client.removeProgress(findAddressElement);
          }
        );
      } catch (error) {
        sys.logError(error);
      }
    });
  }
  var submitElement = configuration._getElementFromInputMappingByEdqFieldName(
    dq.SubmitButton
  );
  if (configuration.EnforceUsage && !sys.isNull(submitElement)) {
    var previousOnclick = submitElement.onclick;
    var skipValidation = false;
    //dqClient._attachEvent(submitElement, "onclick", function() {
    if (submitElement.getAttribute("id") === "edq-validation-button-billing") {
      $(document).off("click", "#edq-validation-button-billing");
      $(document).on(
        "click",
        "#edq-validation-button-billing",
        edqButtonClicked
      );
    } else {
      $(document).off("click", "#edq-validation-button");
      $(document).on("click", "#edq-validation-button", edqButtonClicked);
    }
    function edqButtonClicked() {
      var edqBtn = $(this);
      var input = $("input");
      //input.trigger('input');
      $(".form-modal").hide();
      var executeOriginalButtonAction = function() {
        if (previousOnclick) {
          //If the action was a JavaScript action.
          return previousOnclick();
        } else {
          var input = $("input");
          input.trigger("change");
          if (edqBtn.hasClass("billing-addr-edq-submit")) {
            $(".billing-addr-submit").click();
          } else {
            $(".addEditSaveBtn.shippingAddr").click();
          }
          return false;
        }
      };

      try {
        var dataSet = client._getDataSetFromConfiguration(configuration);
        var dataSetSettings = configuration.getDataSetSettings(dataSet);

        if (sys.isNullOrEmpty(dataSetSettings)) {
          var message =
            "There is no dataset settings for {0} dataset. please check your touchpoints and aliases!!!";
          sys.logError(
            sys.stringFormat(
              EDQ.DataQuality.Client.getMessage(message),
              dataSet
            )
          );

          return executeOriginalButtonAction();
        }

        if (dataSetSettings.useModal) {
          if (
            client._callOnValidationStart(configuration, submitElement) ===
            false
          ) {
            return executeOriginalButtonAction();
          }

          client._findAddress(
            configuration,
            function() {
              EDQ.DataQuality.Client.setProgress(submitElement);
            },
            function(removeProgressOnly) {
              EDQ.DataQuality.Client.removeProgress(submitElement);
              if (!removeProgressOnly) {
                executeOriginalButtonAction();
              }
            }
          );

          return false; //Will do address verification. Do not submit the form.
        } else {
          return executeOriginalButtonAction(); //No address verification to do. Call the original button action.
        }
      } catch (error) {
        sys.logError(error);
      }

      return executeOriginalButtonAction(); //There has been an error. Call the original button action.
    }
  }
  if (configuration._injectInputMappingForInline) {
    var manualEntryElement = configuration._getElementFromInputMappingByEdqFieldName(
      dq.ManualEntry
    );
    manualEntryElement.style.display = configuration.ShowManualEntry
      ? "block"
      : "none";

    dqClient._attachEvent(manualEntryElement, "onclick", function() {
      client._showManualEntryFor(configuration);
    });

    var knownPostCodeElement = configuration._getElementFromInputMappingByEdqFieldName(
      dq.KnownPostCode
    );
    dqClient._attachEvent(knownPostCodeElement, "onclick", function() {
      client._showPromptSetFor(
        configuration,
        client._getDataSetFromConfiguration(configuration),
        false
      );
    });

    var unknownPostCodeElement = configuration._getElementFromInputMappingByEdqFieldName(
      dq.UnknownPostCode
    );
    dqClient._attachEvent(unknownPostCodeElement, "onclick", function() {
      client._showPromptSetFor(
        configuration,
        client._getDataSetFromConfiguration(configuration),
        true
      );
    });

    var selectSuggestionButtonElement = configuration._getElementFromInputMappingByEdqFieldName(
      dq.SelectButton
    );
    dqClient._attachEvent(selectSuggestionButtonElement, "onclick", function() {
      try {
        client._selectAddress(
          client._getDataSetFromConfiguration(configuration),
          configuration,
          function() {
            EDQ.DataQuality.Client.setProgress(selectSuggestionButtonElement);
          },
          function() {
            EDQ.DataQuality.Client.removeProgress(
              selectSuggestionButtonElement
            );
          }
        );
      } catch (error) {
        EDQ.system.logError(error);
        client_showManualEntryFor(configuration, true);
      }
    });

    var suggestionsElement = configuration._getElementFromInputMappingByEdqFieldName(
      dq.Suggestions
    );
    dqClient._attachEvent(suggestionsElement, "ondblclick", function(event) {
      try {
        client._selectAddress(
          client._getDataSetFromConfiguration(configuration),
          configuration,
          function() {
            EDQ.DataQuality.Client.setProgress(selectSuggestionButtonElement);
          },
          function() {
            EDQ.DataQuality.Client.removeProgress(
              selectSuggestionButtonElement
            );
          }
        );
      } catch (error) {
        EDQ.system.logError(error);
        _showManualEntryFor(configuration, true);
      }
    });

    var refineElement = configuration._getElementFromInputMappingByEdqFieldName(
      dq.RefineInput
    );
    var tryAgainElement = configuration._getElementFromInputMappingByEdqFieldName(
      dq.TryAgain
    );
    dqClient._attachEvent(tryAgainElement, "onclick", function() {
      var beforeExecuteCallback = function() {
        EDQ.DataQuality.Client.setProgress(tryAgainElement);
      };
      var onFinishCallback = function() {
        EDQ.DataQuality.Client.removeProgress(tryAgainElement);
      };

      try {
        switch (configuration.stage) {
          case dq.WorkFlowStages.Input:
            client._findAddress(
              configuration,
              beforeExecuteCallback,
              onFinishCallback
            );
            break;
          case dq.WorkFlowStages.Suggestions:
            client._selectAddress(
              client._getDataSetFromConfiguration(configuration),
              configuration,
              beforeExecuteCallback,
              onFinishCallback
            );
            break;
          case dq.WorkFlowStages.Refining:
            client._refineAddress(
              client._getDataSetFromConfiguration(configuration),
              refineElement.value,
              configuration,
              beforeExecuteCallback,
              onFinishCallback
            );
            break;
        }
      } catch (error) {
        EDQ.system.logError(error);
        client._showManualEntryFor(configuration, true);
      }
    });

    var backButtonElement = configuration._getElementFromInputMappingByEdqFieldName(
      dq.BackButton
    );
    dqClient._attachEvent(backButtonElement, "onclick", function() {
      switch (configuration.stage) {
        case dq.WorkFlowStages.Verified:
          if (suggestionsElement.options.length <= 1) {
            client._showPromptSetFor(
              configuration,
              client._getDataSetFromConfiguration(configuration),
              configuration.isUnknownPostCode
            );
            //client.restoreValuesFromSnapshot(client.getConfigurationSnapshot(configuration), configuration._inputMappings);
            break;
          }
          client._showSuggestionsProptset(configuration);
          break;
        case dq.WorkFlowStages.Refining:
          refineElement.value = "";
          if (suggestionsElement.children.length <= 1) {
            client._showPromptSetFor(
              configuration,
              client._getDataSetFromConfiguration(configuration),
              configuration.isUnknownPostCode
            );
            //client.restoreValuesFromSnapshot(client.getConfigurationSnapshot(configuration), configuration._inputMappings);
          } else {
            client._showSuggestionsProptset(configuration);
          }
          break;
        case dq.WorkFlowStages.Suggestions:
          client._showPromptSetFor(
            configuration,
            client._getDataSetFromConfiguration(configuration),
            configuration.isUnknownPostCode
          );
          //client.restoreValuesFromSnapshot(client.getConfigurationSnapshot(configuration), configuration._inputMappings);
          break;
        case dq.WorkFlowStages.Input:
          client._showPromptSetFor(
            configuration,
            client._getDataSetFromConfiguration(configuration),
            configuration.isUnknownPostCode
          );
          break;
      }
      client._handleErrorMessage(configuration, dq.ErrorMessage);
    });

    var nextButtonElement = configuration._getElementFromInputMappingByEdqFieldName(
      dq.NextButton
    );
    dqClient._attachEvent(nextButtonElement, "onclick", function() {
      try {
        client._refineAddress(
          client._getDataSetFromConfiguration(configuration),
          refineElement.value,
          configuration
        );
      } catch (error) {
        EDQ.system.logError(error);
        client._showManualEntryFor(configuration, true);
      }
    });

    client._showPromptSetFor(
      configuration,
      client._getDataSetFromConfiguration(configuration),
      configuration.isUnknownPostCode
    );
  }
};
EDQ.DataQuality.Address.Client.prototype._showPromptSetFor = function _showPromptSetFor(
  configuration,
  dataSet,
  unknownPostcode
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;
  var promptset = dq.Address.PromptSet;

  configuration.isUnknownPostCode = unknownPostcode;
  configuration.stage = dq.WorkFlowStages.Input;

  if (!sys.containsInArray(dataSet, dq.Address.licensedDataSets)) {
    this._showManualEntryFor(configuration);
    return;
  }
  try {
    var dataSetSettings = configuration.getDataSetSettings(dataSet);

    if (sys.isNullOrEmpty(dataSetSettings)) {
      sys.logError(
        sys.stringFormat(
          EDQ.DataQuality.Client.getMessage(
            "There is no dataset settings for dataset: {0}"
          ),
          dataSet
        )
      );
      this._showManualEntryFor(configuration);
      return;
    }

    if (dataSetSettings.useModal) {
      this._showManualEntryFor(configuration);
      return;
    }

    var visibleElements = [];

    var promptsetConfig = promptset._getConfiguration(dataSet);
    var edqFieldsMetadata =
      unknownPostcode === true
        ? promptsetConfig.fieldsNoPostcode
        : promptsetConfig.fields;

    if (sys.isNull(edqFieldsMetadata) || !configuration.UsePromptSets) {
      this._showManualEntryFor(configuration, true);
    } else {
      this._configurePromptSetElements(edqFieldsMetadata, configuration);

      for (var key in edqFieldsMetadata) {
        visibleElements.push(edqFieldsMetadata[key].name);
      }
      visibleElements.push(dq.DataSet);
      visibleElements.push(dq.FindAddressButton);

      if (configuration.ShowManualEntry) {
        visibleElements.push(dq.ManualEntry);
      }

      if (unknownPostcode) {
        visibleElements.push(dq.KnownPostCode);
      } else if (!sys.isNull(promptsetConfig.fieldsNoPostcode)) {
        visibleElements.push(dq.UnknownPostCode);
      }

      this._hideAllInputMappingElementsExcept(
        configuration._originalInputMappings,
        []
      );
      this._hideAllInputMappingElementsExcept(
        configuration._inputMappings,
        visibleElements
      );
    }
  } catch (error) {
    sys.logError(error);
    this._showManualEntryFor(configuration, true);
  }
};
EDQ.DataQuality.Address.Client.prototype._showManualEntryFor = function _showManualEntryFor(
  configuration,
  showFindAddressButton
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;
  var visibleElements = [];

  if (showFindAddressButton) {
    visibleElements.push(dq.FindAddressButton);
  }

  for (var key in configuration._originalInputMappings) {
    if (!configuration._originalInputMappings.hasOwnProperty(key)) {
      continue;
    }
    var originalElementIds = configuration._originalInputMappings[key];
    for (var key2 in originalElementIds) {
      visibleElements.push(originalElementIds[key2]);
    }
  }

  this._hideAllInputMappingElementsExcept(
    configuration._inputMappings,
    visibleElements
  );

  for (var key in configuration._originalInputMappings) {
    if (!configuration._originalInputMappings.hasOwnProperty(key)) {
      continue;
    }

    var originalElementIds = configuration._originalInputMappings[key];
    for (var key2 in originalElementIds) {
      var originalElementId = originalElementIds[key2];
      var originalElement = sys.getElementById(originalElementId);

      if (sys.isNull(originalElement)) {
        sys.logError(
          "Can not show element with id " +
            originalElementId +
            " because it is not presented on the page."
        );
      } else {
        dq.Client.showElement(originalElement);
      }
    }
  }
};
EDQ.DataQuality.Address.Client.prototype._configurePromptSetElements = function _configurePromptSetElements(
  edqFieldsMetadata,
  configuration
) {
  var sys = EDQ.system;
  var client = EDQ.DataQuality.Address.Client;

  var previousElementId = null;

  for (var key in edqFieldsMetadata) {
    var edqFieldMetadata = edqFieldsMetadata[key];

    if (!edqFieldMetadata) {
      continue;
    }

    if (configuration.CanChangeLabels) {
      var elementIds = configuration._inputMappings[edqFieldMetadata.name];
      if (sys.isNull(elementIds) || elementIds.length === 0) {
        continue;
      }

      var elementId = elementIds[0];

      var elementLabel = sys.getElementLabelById(elementId);
      if (elementLabel) {
        elementLabel.innerHTML = edqFieldMetadata.label;
      }

      if (configuration.CanChangeOrder) {
        if (previousElementId) {
          client._moveElementAfter(elementId, previousElementId);
        }

        previousElementId = elementId;
      }
    }
  }
};
EDQ.DataQuality.Address.Client._moveElementAfter = function _moveElementAfter(
  elementId,
  afterElementId
) {
  var sys = EDQ.system;

  var elementContainer = EDQ.DataQuality.Client._tryGetElementContainer(
    sys.getElementById(elementId)
  );
  var afterElementContainer = EDQ.DataQuality.Client._tryGetElementContainer(
    sys.getElementById(afterElementId)
  );

  var elementContainerJQuery = EDQ.JQuery(elementContainer);
  var afterElementContainerJQuery = EDQ.JQuery(afterElementContainer);

  elementContainerJQuery.remove();
  elementContainerJQuery.insertAfter(afterElementContainerJQuery);
};

EDQ.DataQuality.Address.Client.prototype._showSuggestionsProptset = function _showSuggestionsProptset(
  configuration
) {
  var dq = EDQ.DataQuality;

  this._hideAllInputMappingElementsExcept(
    configuration._originalInputMappings,
    []
  );

  var visibleElements = [dq.BackButton, dq.SelectButton, dq.Suggestions];
  if (configuration.ShowManualEntry) {
    visibleElements.push(dq.ManualEntry);
  }

  this._hideAllInputMappingElementsExcept(
    configuration._inputMappings,
    visibleElements
  );

  configuration.stage = dq.WorkFlowStages.Suggestions;
};

EDQ.DataQuality.Address.Client.prototype._showRefineInputPromptSet = function _showRefineInputPromptSet(
  configuration
) {
  var dq = EDQ.DataQuality;

  this._hideAllInputMappingElementsExcept(configuration._inputMappings, [
    dq.RefineInput,
    dq.BackButton,
    dq.NextButton
  ]);
  configuration.stage = dq.WorkFlowStages.Refining;
};

EDQ.DataQuality.Address.Client.prototype._showVerifiedAddressPromptSet = function _showVerifiedAddressPromptSet(
  configuration,
  dataSetSettings
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;

  if (configuration.UsePromptSets) {
    var buttonsToSkipHiding = [dq.DataSet];
    if (sys.isNullOrEmpty(dataSetSettings) || !dataSetSettings.useModal)
      buttonsToSkipHiding.push(dq.BackButton);

    this._hideAllInputMappingElementsExcept(
      configuration._inputMappings,
      buttonsToSkipHiding
    );

    for (var key in configuration._originalInputMappings) {
      if (!configuration._originalInputMappings.hasOwnProperty(key)) {
        continue;
      }

      var originalElementIds = configuration._originalInputMappings[key];
      for (var key2 in originalElementIds) {
        var originalElementId = originalElementIds[key2];
        var originalElement = sys.getElementById(originalElementId);
        if (sys.isNull(originalElement)) {
          sys.logError(
            "Can not show element with id " +
              originalElementId +
              " because it is not present on the page."
          );
        } else {
          dq.Client.showElement(originalElement);
        }
      }
    }
  } else {
    this._hideAllInputMappingElementsExcept(configuration._inputMappings, [
      dq.DataSet,
      dq.Postcode,
      dq.Street,
      dq.City,
      dq.Country,
      dq.State,
      dq.BackButton
    ]);
  }

  configuration.stage = dq.WorkFlowStages.Verified;
};
EDQ.DataQuality.Address.Client.prototype._isUnknownPostcodePromptSet = function _isUnknownPostcodePromptSet(
  configuration
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;
  var client = EDQ.DataQuality.Client;

  if (!configuration.UsePromptSets) {
    return;
  }

  var knownPostCodeElementIds = configuration._inputMappings[dq.KnownPostCode];
  if (
    sys.isNull(knownPostCodeElementIds) ||
    knownPostCodeElementIds.length === 0
  ) {
    return;
  }

  return client._isElementContainerOrElementVisible(
    sys.getElementById(knownPostCodeElementIds[0])
  );
};
EDQ.DataQuality.Address.Client.prototype._findAddress = function _findAddress(
  configuration,
  beforeExecuteCallback,
  onFinishCallback
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;
  var promptset = EDQ.DataQuality.Address.PromptSet;

  this.resetSnapshot(configuration);

  var parameters = {};
  parameters[dq.DataSet] = "";
  parameters[dq.Engine] = "";
  parameters[dq.Layout] = "";
  parameters[dq.City] = "";
  parameters[dq.State] = "";
  parameters[dq.Postcode] = "";
  parameters[dq.Street] = "";
  parameters[dq.FlattenPickList] = "";

  try {
    var dataSet = this._getDataSetFromConfiguration(configuration);
    if (!sys.isNull(dataSet)) {
      parameters[dq.DataSet] = dataSet;
    }

    var additionalDataSetSettings = this._getDataSetSettings(dataSet);
    parameters[dq.FlattenPickList] = additionalDataSetSettings.FlattenPickList;

    var snapshot = this.getConfigurationSnapshot(configuration);

    var dataSetSettings = configuration.getDataSetSettings(dataSet);

    parameters[dq.Layout] = dataSetSettings.layout;
    parameters[dq.Engine] = additionalDataSetSettings.DefaultEngine;

    if (configuration.UsePromptSets && !dataSetSettings.useModal) {
      var promptsetConfig = promptset._getConfiguration(parameters[dq.DataSet]);

      if (!sys.isNull(promptsetConfig)) {
        var edqFieldsMetadata = this._isUnknownPostcodePromptSet(configuration)
          ? promptsetConfig.fieldsNoPostcode
          : promptsetConfig.fields;
        for (var key in edqFieldsMetadata) {
          if (!edqFieldsMetadata.hasOwnProperty(key)) {
            continue;
          }

          var edqFieldName = edqFieldsMetadata[key].name;

          if (!configuration._inputMappings.hasOwnProperty(edqFieldName)) {
            continue;
          }

          var elementIds = configuration._inputMappings[edqFieldName];

          var value = dq.Client.getConcatenatedElementValues(
            elementIds,
            snapshot
          );
          switch (edqFieldName) {
            case dq.City:
              parameters[dq.City] = value.trim();
              break;
            case dq.State:
              parameters[dq.State] = value.trim();
              break;
            case dq.Postcode:
              parameters[dq.Postcode] = value.trim();
              break;
            default:
              //Building number etc. are all considered street.
              parameters[dq.Street] = (
                parameters[dq.Street] +
                " " +
                value
              ).trim();
              break;
          }
        }
      }
    } else {
      for (var key in parameters) {
        if (!parameters.hasOwnProperty(key)) {
          continue;
        }

        var edqFieldName = key;
        if (edqFieldName == dq.DataSet) continue;
        if (edqFieldName == dq.Layout) continue;
        if (edqFieldName == dq.Engine) continue;
        if (edqFieldName == dq.FlattenPickList) continue;

        var elementIds = dataSetSettings.useModal
          ? configuration._originalInputMappings[edqFieldName]
          : configuration._inputMappings[edqFieldName];

        var value = dq.Client.getConcatenatedElementValues(
          elementIds,
          snapshot
        );

        parameters[edqFieldName] = value;
      }
    }
  } catch (e) {
    sys.logError(e);
  }

  if (
    sys.isNullOrEmpty(parameters[dq.Street]) &&
    sys.isNullOrEmpty(parameters[dq.Postcode]) &&
    sys.isNullOrEmpty(parameters[dq.City])
  ) {
    this._showErrorMessage("Please enter address information", configuration);
    return;
  }

  if (configuration._injectInputMappingForInline) {
    var suggestionsElement = configuration._getElementFromInputMappingByEdqFieldName(
      dq.Suggestions
    );
    if (!sys.isNull(suggestionsElement)) suggestionsElement.innerHTML = "";
  }

  this._executeFindAddressRequest(
    configuration,
    dataSet,
    parameters,
    dq.Address.Configuration.SearchServiceUrl,
    true,
    beforeExecuteCallback,
    onFinishCallback
  );
};
EDQ.DataQuality.Address.Client.prototype._refineAddress = function _refineAddress(
  dataSet,
  refineInput,
  configuration,
  beforeExecuteCallback,
  onFinishCallback
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;

  if (sys.isNullOrEmpty(refineInput)) {
    this._showErrorMessage("Please enter exact details", configuration);
    return;
  }

  var suggestionsElement = configuration._getElementFromInputMappingByEdqFieldName(
    dq.Suggestions
  );
  if (
    sys.isNull(suggestionsElement) ||
    sys.isNull(suggestionsElement.options[suggestionsElement.selectedIndex])
  ) {
    this._showErrorMessage("Please select an option", configuration);
    return;
  }

  var partialText =
    suggestionsElement.options[suggestionsElement.selectedIndex].innerHTML;
  var unresolvableRange =
    suggestionsElement.options[suggestionsElement.selectedIndex].attributes[
      "range"
    ].value;
  var verificationLevel =
    suggestionsElement.options[suggestionsElement.selectedIndex].attributes[
      "VerificationLevel"
    ].value;

  if (
    !this._validateRefinementInput(refineInput, partialText, unresolvableRange)
  ) {
    var message = EDQ.DataQuality.Client.getMessage(
      "You entered {0}, but this address is outside of the range. Please try again or click Back and select the correct range."
    );
    this._showErrorMessage(
      sys.stringFormat(message, refineInput),
      configuration
    );

    return;
  }

  this._executeRefineAddress(
    dataSet,
    suggestionsElement.options[suggestionsElement.selectedIndex].value,
    refineInput,
    configuration,
    verificationLevel,
    beforeExecuteCallback,
    onFinishCallback
  );
};
EDQ.DataQuality.Address.Client.prototype._executeRefineAddress = function _executeRefineAddress(
  dataSet,
  moniker,
  refineInput,
  configuration,
  verificationLevel,
  beforeExecuteCallback,
  onFinishCallback
) {
  var dq = EDQ.DataQuality;
  var dataSetSettings = configuration.getDataSetSettings(dataSet);
  var parameters = {};

  parameters[dq.Moniker] = moniker;
  parameters[dq.Layout] = dataSetSettings.layout;
  parameters[dq.VerificationLevel] = verificationLevel;
  parameters[dq.RefineInput] = refineInput;

  this._executeFindAddressRequest(
    configuration,
    dataSet,
    parameters,
    dq.Address.Configuration.RefineServiceUrl,
    false,
    beforeExecuteCallback,
    onFinishCallback
  );
};
EDQ.DataQuality.Address.Client.prototype._validateRefinementInput = function _validateRefinementInput(
  refineInput,
  partialAddress,
  unresolvableRange
) {
  var sys = EDQ.system;

  if (refineInput.length > 40) {
    return false;
  }

  if (!sys.toBoolean(unresolvableRange)) {
    return true;
  }

  var range = partialAddress
    .match(/[0-9a-zA-Z]+\s[...]+\s[0-9a-zA-Z]+/gim)[0]
    .split("...");
  if (range.length > 2) {
    return true;
  }

  var startRange = isNaN(parseInt(range[0].trim()))
    ? range[0].trim()
    : parseInt(range[0].trim());
  var endRange = isNaN(parseInt(range[1].trim()))
    ? range[1].trim()
    : parseInt(range[1].trim());
  var castedInput = isNaN(parseInt(refineInput.trim()))
    ? refineInput.trim()
    : parseInt(refineInput.trim());

  var isValid = true;
  if (castedInput < startRange || castedInput > endRange) {
    isValid = false;
  } else {
    var criteria = partialAddress.substr(
      partialAddress.indexOf("["),
      partialAddress.indexOf("]")
    );

    if (sys.isNullOrEmpty(criteria) && isNaN(castedInput)) {
      isValid = false;
    } else {
      if (
        sys.beginsWith("[even]", criteria) ||
        sys.endsWith("[even]", criteria)
      ) {
        isValid = !isNaN(castedInput % 2) && castedInput % 2 === 0;
      }
      if (
        sys.beginsWith("[odd]", criteria) ||
        sys.endsWith("[odd]", criteria)
      ) {
        isValid = !isNaN(castedInput % 2) && castedInput % 2 !== 0;
      }
    }
  }

  return isValid;
};

EDQ.DataQuality.Address.Client.prototype._executeFindAddressRequest = function _executeFindAddressRequest(
  configuration,
  dataSet,
  parameters,
  url,
  isSearchOperation,
  beforeExecuteCallback,
  onFinishCallback
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;
  var addressClient = dq.Address.Client;

  var dataSetSettings = configuration.getDataSetSettings(dataSet);
  var useModal = dataSetSettings.useModal;
  var timeoutInMilliseconds =
    configuration.ServiceValidationTimeoutInMilliseconds;

  var client = this;

  if (beforeExecuteCallback) beforeExecuteCallback();

  this._executeXMLHttpRequest(url, parameters, timeoutInMilliseconds, function(
    response,
    errorMessage,
    xhr
  ) {
    if (
      EDQ.DataQuality.Client.getMessage(dq.OperationTimedOutMessage) ===
      errorMessage
    ) {
      client._promptSetForErrorMessage(
        dq.OperationTimedOutMessage,
        configuration,
        response,
        dataSet
      );
      if (onFinishCallback) onFinishCallback();
      return;
    } else if (!sys.isNullOrEmpty(errorMessage)) {
      client._promptSetForErrorMessage(
        errorMessage,
        configuration,
        response,
        dataSet
      );
      if (onFinishCallback) onFinishCallback();
      return;
    }

    if (useModal) {
      var edit = function() {
        var result = {};
        result[dq.ValidationStatus] = "";
        client.setValues(dataSet, result, configuration);

        if (onFinishCallback) onFinishCallback(true);
      };

      var modal = new dq.Address.Modal(edit);
      var verifyLevel = client.getVerifyLevel(response);
      var message = EDQ.DataQuality.AddressVerifyLevelsPrompt[verifyLevel];
      var getAddressCallback = function(moniker) {
        client._getAddress(
          dataSet,
          moniker,
          configuration,
          function() {
            modal.waitOpen();
          },
          function() {
            modal.waitClose();
            if (onFinishCallback) onFinishCallback();
          }
        );
      };
      var refineCallback = function(refineValue, ranges, fullPicklistMoniker) {
        var moniker = "";
        for (var key in ranges) {
          var range = ranges[key];
          if (
            client._validateRefinementInput(
              refineValue,
              range.address,
              range.range == "true"
            )
          ) {
            moniker = range.moniker;
            break;
          }
        }

        if (moniker == "") moniker = fullPicklistMoniker;

        client._executeRefineAddress(
          dataSet,
          moniker,
          refineValue,
          configuration,
          verifyLevel,
          function() {
            modal.waitOpen();
          },
          function() {
            modal.waitClose();
            if (onFinishCallback) onFinishCallback();
          }
        );
        return true;
      };

      var useOriginalAddressCallback = function() {
        var result = {};
        result[dq.ValidationStatus] = "User Preferred";
        client.setValues(dataSet, result, configuration);

        if (onFinishCallback) onFinishCallback();
      };

      var originalAddressForDisplay = [];
      if (!sys.isNullOrEmpty(parameters[dq.Street]))
        originalAddressForDisplay.push(parameters[dq.Street]);
      else
        originalAddressForDisplay.push(
          document.getElementById("atg_store_streetAddressInput").value
        );
      if (!sys.isNullOrEmpty(parameters[dq.City]))
        originalAddressForDisplay.push(parameters[dq.City]);
      else
        originalAddressForDisplay.push(
          document.getElementById("atg_store_localityInput").value
        );
      if (!sys.isNullOrEmpty(parameters[dq.State]))
        originalAddressForDisplay.push(parameters[dq.State]);
      else
        originalAddressForDisplay.push(
          document.getElementById("atg_store_stateSelect").value
        );
      if (!sys.isNullOrEmpty(parameters[dq.Postcode]))
        originalAddressForDisplay.push(parameters[dq.Postcode]);
      else
        originalAddressForDisplay.push(
          document.getElementById("atg_store_postalCodeInput").value
        );

      switch (verifyLevel) {
        case EDQ.DataQuality.AddressVerifyLevels.VERIFIED:
          {
            if (sys.isNullOrEmpty(response.AddressLineDictionary)) {
              getAddressCallback(
                sys.isNullOrEmpty(response.PickListEntries[0].moniker)
                  ? response.PickListEntries[0].Moniker
                  : response.PickListEntries[0].moniker
              );
            } else {
              var result = dq.Address.Client._expandValidationResult(response);
              client.setValues(dataSet, result, configuration);
              if (onFinishCallback) onFinishCallback();

              client._callOnAfterValidationEnd(configuration, result);
            }
          }
          break;
        case EDQ.DataQuality.AddressVerifyLevels.INTERACTIONREQUIRED:
          {
            var processInteractionRequiredResult = function(response) {
              var result = dq.Address.Client._expandValidationResult(response);
              client.setValues(dataSet, result, configuration);
              if (onFinishCallback) onFinishCallback();
              client._callOnAfterValidationEnd(configuration, result);
            };
            modal.setInteractionRequired(
              response,
              dataSet,
              configuration,
              originalAddressForDisplay,
              message,
              processInteractionRequiredResult,
              processInteractionRequiredResult,
              function() {
                useOriginalAddressCallback();
              }
            );
            modal.display();
          }
          break;
        case EDQ.DataQuality.AddressVerifyLevels.STREETPARTIAL:
        case EDQ.DataQuality.AddressVerifyLevels.PREMISESPARTIAL:
          {
            if (
              response.Total < 2 &&
              !sys.isNullOrEmpty(response.PickListEntries[0]) &&
              response.PickListEntries[0].FullAddress
            ) {
              client._getAddress(
                dataSet,
                response.PickListEntries[0].Moniker,
                configuration,
                undefined,
                useOriginalAddressCallback
              );
              return;
            }

            modal.setPartial(
              response,
              originalAddressForDisplay,
              message,
              function(refineValue, ranges, fullPicklistMoniker) {
                refineCallback(refineValue, ranges, fullPicklistMoniker);
              },
              function(moniker) {
                getAddressCallback(moniker);
              },
              function() {
                useOriginalAddressCallback();
              }
            );
            modal.display();
          }
          break;
        case EDQ.DataQuality.AddressVerifyLevels.MULTIPLE:
          {
            modal.setMultiple(
              response.PickListEntries,
              originalAddressForDisplay,
              message,
              function(moniker) {
                getAddressCallback(moniker);
              },
              function(moniker) {
                getAddressCallback(moniker);
              },
              function() {
                useOriginalAddressCallback();
              }
            );
            modal.display();
          }
          break;
        default:
          {
            modal.setNone(originalAddressForDisplay, message, function() {
              useOriginalAddressCallback();
            });
            modal.display();
          }
          break;
      }
    } else {
      if (onFinishCallback) onFinishCallback();

      var suggestionsElement = configuration._getElementFromInputMappingByEdqFieldName(
        dq.Suggestions
      );
      if (sys.isNull(suggestionsElement)) {
        sys.logError(
          "The suggestions element cannot be found in _executeFindAddressRequest."
        );
        return;
      }

      if (isSearchOperation) {
        if (response.verificationLevel === dq.AddressVerifyLevels.NONE) {
          var details = response.PickListEntries[0];
          client._showErrorMessage(details.PickList, configuration);
        } else if (response.Total <= 1) {
          var details = response.PickListEntries[0];
          if (
            details.PickList === "No matches" ||
            details.PickList === "Search cancelled (too many matches)"
          ) {
            client._showErrorMessage(
              EDQ.DataQuality.Client.getMessage(details.PickList),
              configuration
            );
          } else {
            if (details.FullAddress) {
              client._getAddress(dataSet, details.Moniker, configuration);
              return;
            }

            addressClient.populateSuggestionList(
              suggestionsElement,
              response,
              response.Prompt
            );
            suggestionsElement.options[0].selected = true;
            client._selectAddress(dataSet, configuration);
          }
        } else {
          var suggestionsElementLabel = configuration._getElementLabelFromInputMappingByEdqFieldName(
            dq.Suggestions
          );
          suggestionsElementLabel.innerHTML = response.Prompt;

          addressClient.populateSuggestionList(suggestionsElement, response);
          client._showSuggestionsProptset(configuration);
        }
      } else {
        var item = response.PickListEntries[0];
        if (item.unresolvableRange) {
          // Redisplay with explanation
          addressClient.populateSuggestionList(
            suggestionsElement,
            response,
            response.Prompt
          );
          suggestionsElement.options[0].selected = true;
          client._selectAddress(dataSet, configuration);
        } else {
          client._getAddress(dataSet, item.Moniker, configuration);
          return;
        }
      }
    }
  });
};
EDQ.DataQuality.Address.Client.prototype.getVerifyLevel = function getVerifyLevel(
  response
) {
  if (
    response.verificationLevel === EDQ.DataQuality.AddressVerifyLevels.VERIFIED
  ) {
    return EDQ.DataQuality.AddressVerifyLevels.VERIFIED;
  }

  var partialEntries = [];
  for (var key in response.PickListEntries) {
    var entry = response.PickListEntries[key];
    //if (!entry.FullAddress && entry.UnresolvableRange)
    partialEntries.push(entry);
  }

  return response.verificationLevel;
};
EDQ.DataQuality.Address.Client.populateSuggestionList = function populateSuggestionList(
  suggestionsElement,
  response
) {
  var options = response.PickListEntries;
  var dq = EDQ.DataQuality;

  suggestionsElement.innerHTML = "";
  for (var i = 0; i < options.length; i++) {
    var element = document.createElement(dq.HtmlTags.Option);
    element.textContent = options[i].PickList + " " + options[i].Postcode;
    element.innerHTML = options[i].PickList + " " + options[i].Postcode;
    element.value = options[i].Moniker;
    element.setAttribute("range", options[i].UnresolvableRange);
    element.setAttribute("full", options[i].FullAddress);
    element.setAttribute("VerificationLevel", response.verificationLevel);
    suggestionsElement.appendChild(element);
  }
};

EDQ.DataQuality.Address.Client.prototype._selectAddress = function _selectAddress(
  dataSet,
  configuration,
  beforeExecuteCallback,
  onFinishCallback
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;

  var suggestionsElement = configuration._getElementFromInputMappingByEdqFieldName(
    dq.Suggestions
  );

  if (
    sys.isNull(suggestionsElement) ||
    suggestionsElement.selectedIndex === -1
  ) {
    this._showErrorMessage("Please select an option", configuration);
    return;
  }

  var isFullAddress = sys.toBoolean(
    suggestionsElement.options[suggestionsElement.selectedIndex].attributes[
      "full"
    ].value
  );
  if (isFullAddress) {
    var moniker =
      suggestionsElement.options[suggestionsElement.selectedIndex].value;
    this._getAddress(
      dataSet,
      moniker,
      configuration,
      beforeExecuteCallback,
      onFinishCallback
    );
  } else {
    var refineInputElementLabel = configuration._getElementLabelFromInputMappingByEdqFieldName(
      dq.RefineInput
    );
    refineInputElementLabel.innerHTML = sys.stringFormat(
      "{0} for {1} {2}",
      refineInputElementLabel.getAttribute("OriginalLabel"),
      suggestionsElement.options[suggestionsElement.selectedIndex].innerHTML,
      EDQ.DataQuality.Client.getMessage(
        "Please enter your exact building details"
      )
    );

    this._showRefineInputPromptSet(configuration);
  }
};

EDQ.DataQuality.Address.Client.prototype._getAddress = function _getAddress(
  dataSet,
  moniker,
  configuration,
  beforeExecuteCallback,
  onFinishCallback
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;

  var dataSetSettings = configuration.getDataSetSettings(dataSet);

  var parameters = {};
  parameters[dq.Moniker] = moniker;
  parameters[dq.Layout] = dataSetSettings.layout;

  var client = this;
  var timeoutInMilliseconds =
    configuration.ServiceValidationTimeoutInMilliseconds;

  if (beforeExecuteCallback) beforeExecuteCallback();
  this._executeXMLHttpRequest(
    dq.Address.Configuration.GetAddressServiceUrl,
    parameters,
    timeoutInMilliseconds,
    function(response, errorMessage, xhr) {
      if (!sys.isNullOrEmpty(errorMessage)) {
        client._promptSetForErrorMessage(
          errorMessage,
          configuration,
          response,
          dataSet
        );
        if (onFinishCallback) onFinishCallback();
        return;
      } else if (
        sys.isNull(response) ||
        sys.isNull(response.AddressLineDictionary)
      ) {
        client._promptSetForErrorMessage(
          "There was a problem with your search. Please try again.",
          configuration,
          response,
          dataSet
        );
        if (onFinishCallback) onFinishCallback();
        return;
      } else if (!sys.isNull(response.AddressLineDictionary[dq.ErrorMessage])) {
        client._promptSetForErrorMessage(
          response.AddressLineDictionary[dq.ErrorMessage],
          configuration,
          response,
          dataSet
        );
        if (onFinishCallback) onFinishCallback();
        return;
      }

      var result = dq.Address.Client._expandValidationResult(response);
      client.setValues(dataSet, result, configuration);

      client._showVerifiedAddressPromptSet(configuration, dataSetSettings);
      if (onFinishCallback) onFinishCallback();

      client._callOnAfterValidationEnd(configuration, result);
    }
  );
};

EDQ.DataQuality.Address.Client._expandValidationResult = function _expandValidationResult(
  validationResultJson
) {
  var sys = EDQ.system;

  var result = validationResultJson.AddressLineDictionary;

  for (var key in validationResultJson) {
    if (
      validationResultJson.AddressLineDictionary === validationResultJson[key]
    ) {
      continue;
    }
    if (
      validationResultJson.addressLineDictionary === validationResultJson[key]
    ) {
      continue;
    } //Case of addressLineDictionary is different.

    result[key] = validationResultJson[key];
  }
  return result;
};

EDQ.DataQuality.Address.Client.prototype._promptSetForErrorMessage = function _promptSetForErrorMessage(
  errorMessage,
  configuration,
  response,
  dataset
) {
  var dq = EDQ.DataQuality;
  var sys = EDQ.system;

  if (!sys.isNullOrEmpty(response) && !sys.isNullOrEmpty(dataset))
    this.setValues(dataset, response, configuration);

  this._showErrorMessage(errorMessage, configuration);
  this._hideAllInputMappingElementsExcept(configuration._inputMappings, [
    dq.ManualEntry,
    dq.BackButton,
    dq.TryAgain
  ]);
};

EDQ.DataQuality.Address.Client.prototype._showErrorMessage = function _showErrorMessage(
  message,
  configuration
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;

  var elementIds = configuration._inputMappings[dq.ErrorMessage];
  if (sys.isNull(elementIds) || elementIds.length === 0) {
    return;
  }
  var errorMessageElement = sys.getElementById(elementIds[0]);
  if (sys.isNull(errorMessageElement)) {
    return;
  }

  message = EDQ.DataQuality.Client.getMessage(message);

  if (errorMessageElement.tagName === dq.HtmlTags.Label) {
    errorMessageElement.innerHTML = message;
  } else {
    errorMessageElement.value = message;
  }
  dq.Client.showElement(errorMessageElement);
};

EDQ.DataQuality.Address.Client.prototype._clearInputs = function _clearInputs(
  configuration
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;
  var client = dq.Client;

  var inputMappings = configuration._originalInputMappings;
  for (var key in inputMappings) {
    if (!inputMappings.hasOwnProperty(key)) {
      continue;
    }
    if (key === dq.DataSet) {
      continue;
    }
    if (key === dq.SubmitButton) {
      continue;
    }

    client.setElementValue(inputMappings[key], "");
  }
};

EDQ.DataQuality.Address.licensedDataSets = ["USA", "CAN"];

//DataSet aliases

EDQ.DataQuality.Address.Client.prototype._getDataSetFromConfiguration = function _getDataSetFromConfiguration(
  configuration
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;

  var dataSetElement = configuration._getElementFromInputMappingByEdqFieldName(
    dq.DataSet
  );
  if (sys.isNull(dataSetElement)) {
    return;
  }

  return dq.Address.Client._getDataSetByCountry(dataSetElement.value);
};

EDQ.DataQuality.Address.Client._getDataSetByCountry = function _getDataSetByCountry(
  country
) {
  var addressClient = EDQ.DataQuality.Address.Client;
  var sys = EDQ.system;

  country = country.toUpperCase();

  if (!sys.isNullOrEmpty(addressClient.CountryToDataSetMap[country]))
    return addressClient.CountryToDataSetMap[country];

  return country;
};
EDQ.DataQuality.Address.Client.CountryToDataSetMap = {
  "UNITED STATES": "USA",
  US: "USA",

  CA: "CAN",
  Canada: "CAN",

  DE: "DEU",
  Germany: "DEU",

  UK: "GBR",
  "United Kingdom": "GBR",

  AU: "AUS",
  Australia: "AUS",

  DK: "DNK",
  Denmark: "DNK",

  FR: "FRA",
  France: "FRA",

  BE: "BEL",
  Belgium: "BEL",

  FI: "FIN",
  Finland: "FIN",

  IE: "IRL",
  Ireland: "IRL",

  LU: "LUX",
  Luxembourg: "LUX",

  NL: "NLD",
  Netherlands: "NLD",

  NO: "NOR",
  Norway: "NOR",

  NZ: "NZL",
  "New Zealand": "NZL",

  SE: "SWE",
  Sweden: "SWE",

  PT: "PRT",
  Portugal: "PRT",

  ES: "ESP",
  Spain: "ESP"
};
// end Alias

// Dataset settings

EDQ.DataQuality.Address.Client.prototype._getDataSetSettings = function _getDataSetSettings(
  dataSet
) {
  var addressClient = EDQ.DataQuality.Address.Client;
  var sys = EDQ.system;

  dataSet = dataSet.toUpperCase();

  if (!sys.isNullOrEmpty(addressClient.DataSetSettings[dataSet]))
    return addressClient.DataSetSettings[dataSet];

  return { FlattenPickList: true, DefaultEngine: "Singleline" };
};
// End dataset settings

//Client End

EDQ.DataQuality.Address.InputMappingType = {
  Input: 0,
  PromptSet: 1,
  System: 2
};

//Promptsets
EDQ.DataQuality.Address.PromptSet = EDQ.DataQuality.Address.PromptSet || {};

EDQ.DataQuality.Address.PromptSet._getConfiguration = function _getConfiguration(
  dataset
) {
  var promptset = EDQ.DataQuality.Address.PromptSet;

  for (var key in promptset.Configurations) {
    if (!promptset.Configurations.hasOwnProperty(key)) {
      continue;
    }

    var config = promptset.Configurations[key];
    if (
      config &&
      (config.dataset === dataset ||
        dataset ===
          EDQ.DataQuality.Address.Client._getDataSetByCountry(config.dataset))
    ) {
      return config;
    }
  }

  return null;
};
EDQ.DataQuality.Address.PromptSet._loadLabelMessages = function _loadLabelMessages(
  message
) {
  var sys = EDQ.system;

  if (
    !sys.isNullOrEmpty(
      EDQ.DataQuality.Address.PromptSet.EDQFieldsMetadataMessages[message]
    )
  ) {
    return EDQ.DataQuality.Address.PromptSet.EDQFieldsMetadataMessages[message];
  } else {
    return message;
  }
};
EDQ.DataQuality.Address.PromptSet._loadHtmlElementMessages = function _loadHtmlElementMessages(
  html
) {
  var sys = EDQ.system;
  try {
    var temporaryDiv = document.createElement("div");
    temporaryDiv.innerHTML = html;
    var currentItem = temporaryDiv.childNodes[0];
    if (sys.isNullOrEmpty(currentItem)) return html;

    if (currentItem.innerText == "") return html;

    currentItem.innerText = EDQ.DataQuality.Address.PromptSet._loadLabelMessages(
      currentItem.innerText
    );

    return currentItem.outerHTML;
  } catch (ex) {
    sys.LogError(ex);
    return html;
  }
};

EDQ.DataQuality.Address.PromptSet.EDQFieldsMetadataMessages = {
  "Find Address": "Find Address",
  Next: "Next",
  Select: "Select",
  "Try Again": "Try Again",
  Back: "Back",
  "Manual Entry": "Manual Entry",
  "If you know the postcode click here": "If you know the postcode click here",
  "If you don't know the postcode click here":
    "If you don't know the postcode click here",

  Suggestions: "Suggestions",
  "Your selection covers a range of addresses":
    "Your selection covers a range of addresses",
  Floor: "Floor",
  Apartment: "Apartment",
  "Rural Delivery": "Rural Delivery",
  City: "City",
  "Building Number": "Building Number",
  Postcode: "Postcode",
  State: "State",
  Country: "Country",
  Street: "Street",
  "Zip Code": "Zip Code",
  "Street Address": "Street Address",
  "Building Number or Name": "Building Number or Name",
  Town: "Town",
  "Postal Code": "Postal Code",
  "Building Number or PO Box": "Building Number or PO Box",
  Locality: "Locality",
  "City or Suburb": "City or Suburb",
  "Postal District": "Postal District",
  District: "District"
};

EDQ.DataQuality.Address.PromptSet.Configurations = [
  {
    dataset: "GBR",
    fields: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Postcode"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.City,
        label: "Town"
      }
    ]
  },
  {
    dataset: "AUS",
    fields: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or PO Box"
      },
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Postal Code"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or PO Box"
      },
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.City,
        label: "Town"
      }
    ]
  },
  {
    dataset: "BEL",
    fields: [
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Postcode"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number"
      },
      {
        name: EDQ.DataQuality.City,
        label: "District"
      }
    ]
  },
  {
    dataset: "CAN",
    fields: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Postal Code"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.City,
        label: "City"
      }
    ]
  },
  {
    dataset: "DNK",
    fields: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Floor,
        label: "Floor",
        belongsTo: EDQ.DataQuality.Street
      },
      {
        name: EDQ.DataQuality.Apartment,
        label: "Apartment",
        belongsTo: EDQ.DataQuality.Street
      },
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Postal Code"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Floor,
        label: "Floor"
      },
      {
        name: EDQ.DataQuality.Apartment,
        label: "Apartment"
      },
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.City,
        label: "Postal District"
      }
    ]
  },
  {
    dataset: "FIN",
    fields: [
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or PO Box"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Postal Code"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or PO Box"
      },
      {
        name: EDQ.DataQuality.City,
        label: "Locality"
      }
    ]
  },
  {
    dataset: "FRA",
    fields: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Postal Code"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.City,
        label: "Town"
      }
    ]
  },
  {
    dataset: "DEU",
    fields: [
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Postal Code"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.City,
        label: "Town"
      }
    ]
  },
  {
    dataset: "IRL",
    fields: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Postal Code"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.City,
        label: "Town"
      }
    ]
  },
  {
    dataset: "LUX",
    fields: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Postal Code"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.City,
        label: "Locality"
      }
    ]
  },
  {
    dataset: "NLD",
    fields: [
      {
        name: EDQ.DataQuality.Postcode,
        label: EDQ.DataQuality.Postcode
      },
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number"
      },
      {
        name: EDQ.DataQuality.City,
        label: "Town"
      }
    ]
  },
  {
    dataset: "NZL",
    fields: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or PO Box"
      },
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Postal Code"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or PO Box"
      },
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.RuralDelivery,
        label: "Rural Delivery"
      },
      {
        name: EDQ.DataQuality.City,
        label: "City or Suburb"
      }
    ]
  },
  {
    dataset: "NOR",
    fields: [
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or PO Box"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Postal Code"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or PO Box"
      },
      {
        name: EDQ.DataQuality.City,
        label: "Locality"
      }
    ]
  },
  {
    dataset: "SGP",
    fields: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Postal Code"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      }
    ]
  },
  {
    dataset: "ESP",
    fields: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Postal Code"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.City,
        label: "Town"
      }
    ]
  },
  {
    dataset: "SWE",
    fields: [
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or PO Box"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Postal Code"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or PO Box"
      },
      {
        name: EDQ.DataQuality.City,
        label: "Postal Area"
      }
    ]
  },
  {
    dataset: "CHE",
    fields: [
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Postal Code"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.City,
        label: "Town"
      }
    ]
  },
  {
    dataset: "SGF",
    fields: [
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Postal Code"
      }
    ],
    fieldsNoPostcode: [
      {
        name: EDQ.DataQuality.Street,
        label: "Street"
      },
      {
        name: EDQ.DataQuality.BuildingNumber,
        label: "Building Number or Name"
      },
      {
        name: EDQ.DataQuality.City,
        label: "Town"
      }
    ]
  },
  {
    dataset: "USA",
    fields: [
      {
        name: EDQ.DataQuality.Street,
        label: "Street Address"
      },
      {
        name: EDQ.DataQuality.City,
        label: "City"
      },
      {
        name: EDQ.DataQuality.State,
        label: "State"
      },
      {
        name: EDQ.DataQuality.Postcode,
        label: "Zip Code"
      }
    ]
  }
];

EDQ.DataQuality.Address.PromptSet.EDQFieldsMetadata = [
  {
    Items: [
      {
        Type: "PromptSet",
        Required: true,
        Name: EDQ.DataQuality.DataSet,
        Label: "Country",
        HasLabel: true,
        Html: ""
      }
    ]
  },
  {
    Items: [
      {
        Type: "PromptSet",
        Required: true,
        Name: EDQ.DataQuality.Street,
        Label: "Street",
        HasLabel: true,
        Html: '<input id="" type="text" class="edq-input-text"/>'
      }
    ]
  },
  {
    Items: [
      {
        Type: "PromptSet",
        Name: EDQ.DataQuality.City,
        Label: "City",
        HasLabel: true,
        Html: '<input id="" type="text" class="edq-input-text"/>'
      }
    ]
  },
  {
    Items: [
      {
        Type: "PromptSet",
        Name: EDQ.DataQuality.State,
        Label: "State",
        HasLabel: true,
        Html: '<input id="" type="text" class="edq-input-text"/>'
      }
    ]
  },
  {
    Items: [
      {
        Type: "PromptSet",
        Name: EDQ.DataQuality.Postcode,
        Label: "Postcode",
        HasLabel: true,
        Html: '<input id="" type="text" class="edq-input-text"/>'
      }
    ]
  },
  {
    Items: [
      {
        Type: "PromptSet",
        Name: EDQ.DataQuality.BuildingNumber,
        Label: "Building Number",
        HasLabel: true,
        Html: '<input id="" type="text" class="edq-input-text"/>'
      }
    ]
  },
  {
    Items: [
      {
        Type: "PromptSet",
        Name: EDQ.DataQuality.Floor,
        Label: "Floor",
        HasLabel: true,
        Html: '<input id="" type="text" class="edq-input-text"/>'
      }
    ]
  },
  {
    Items: [
      {
        Type: "PromptSet",
        Name: EDQ.DataQuality.Apartment,
        Label: "Apartment",
        HasLabel: true,
        Html: '<input id="" type="text" class="edq-input-text"/>'
      }
    ]
  },
  {
    Items: [
      {
        Type: "PromptSet",
        Name: EDQ.DataQuality.RuralDelivery,
        Label: "Rural Delivery",
        HasLabel: true,
        Html: '<input id="" type="text" class="edq-input-text"/>'
      }
    ]
  },
  {
    Items: [
      {
        Type: "System",
        Name: EDQ.DataQuality.ErrorMessage,
        Label: "",
        HasLabel: false,
        Html: '<label id="" class="edq-error-message">Error Message</label>'
      }
    ]
  },
  {
    Items: [
      {
        Type: "System",
        Name: EDQ.DataQuality.RefineInput,
        Label: "Your selection covers a range of addresses",
        HasLabel: true,
        Html: '<input id="" type="text" class="edq-input-text"/>'
      }
    ]
  },
  {
    Items: [
      {
        Type: "System",
        Name: EDQ.DataQuality.Suggestions,
        Label: "Suggestions",
        HasLabel: true,
        Html: '<select id="" size="5"></select>'
      }
    ]
  },
  {
    WrapperHtmlTag: '<span style="padding: 5px;"></span>',
    Items: [
      {
        Type: "System",
        Name: EDQ.DataQuality.UnknownPostCode,
        Label: "",
        HasLabel: false,
        Html:
          '<a href="javascript:;" id="" class="edq-link">' +
          "If you don&#39;t know the postcode click here" +
          "</a>"
      },
      {
        Type: "System",
        Name: EDQ.DataQuality.KnownPostCode,
        Label: "",
        HasLabel: false,
        Html:
          '<a href="javascript:;" id="" class="edq-link">' +
          "If you know the postcode click here" +
          "</a>"
      },
      {
        Type: "System",
        Name: EDQ.DataQuality.ManualEntry,
        Label: "",
        HasLabel: false,
        Html:
          '<a href="javascript:;" id="" class="edq-link">' +
          "Manual Entry" +
          "</a>"
      },
      {
        Type: "System",
        Name: EDQ.DataQuality.BackButton,
        Label: "",
        HasLabel: false,
        Html:
          '<button id="" title="Back" type="button" class="edq-button">' +
          "Back" +
          "</button>"
      },
      {
        Type: "System",
        Name: EDQ.DataQuality.TryAgain,
        Label: "",
        HasLabel: false,
        Html:
          '<button id="" title="Try Again" type="button" class="edq-button">' +
          "Try Again" +
          "</button>"
      },
      {
        Type: "System",
        Name: EDQ.DataQuality.SelectButton,
        Label: "",
        HasLabel: false,
        Html:
          '<button id="" title="Select" type="button" class="edq-button">' +
          "Select" +
          "</button>"
      },
      {
        Type: "System",
        Name: EDQ.DataQuality.NextButton,
        Label: "",
        HasLabel: false,
        Html:
          '<button id="" title="Next" type="button" class="edq-button">' +
          "Next" +
          "</button>"
      }
    ]
  },
  {
    Items: [
      {
        Type: "System",
        Name: EDQ.DataQuality.FindAddressButton,
        Label: "",
        HasLabel: false,
        Html:
          '<button id="" title="Find Address" type="button" class="edq-button edq-button-shifted">' +
          "Find Address" +
          "</button>"
      }
    ]
  },
  {
    Items: [
      {
        Type: "System",
        Name: EDQ.DataQuality.FindAddressButton,
        Label: "",
        HasLabel: false,
        Html: '<div style="clear:both;"></div>'
      }
    ]
  }
];
EDQ.DataQuality.EmailPhone = EDQ.DataQuality.EmailPhone || {};

EDQ.DataQuality.EmailPhone.processValidationResult = function processValidationResult(
  validationResultJson,
  resultCodeToDescription,
  configuration,
  element,
  client,
  afterValuesSetCallback
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;
  var dqClient = EDQ.DataQuality.Client;
  var dqEmailPhone = EDQ.DataQuality.EmailPhone;

  try {
    dqEmailPhone._expandValidationResult(
      validationResultJson,
      resultCodeToDescription,
      configuration
    );

    if (
      validationResultJson.ValidationStatus === dq.ValidationStatusNotVerified
    ) {
      dqClient.setNotValidatedToInput(
        element,
        validationResultJson[dq.Message],
        validationResultJson[dq.Message],
        configuration.ValidationMessageTimeout
      );
    } else if (
      validationResultJson.ValidationStatus === dq.ValidationStatusVerified
    ) {
      dqClient.setValidatedToInput(element, "");
    } else {
      dqClient.clearInput(element, "");
    }
    client.setValues("Default", validationResultJson, configuration);
  } catch (error) {
    sys.logError(error);

    dqClient.clearInput(element);
  }

  if (!sys.isNull(afterValuesSetCallback)) {
    afterValuesSetCallback();
  }
};

EDQ.DataQuality.EmailPhone._expandValidationResult = function _expandValidationResult(
  validationResultJson,
  resultCodeToDescription,
  configuration
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;

  if (sys.isNullOrEmpty(validationResultJson.Certainty)) {
    validationResultJson.ValidationStatus = dq.Unknown;
  } else if (
    sys.containsInArray(
      validationResultJson.Certainty.toUpperCase(),
      configuration.ValidStatuses
    )
  ) {
    validationResultJson.ValidationStatus = dq.ValidationStatusVerified;
  } else {
    validationResultJson.ValidationStatus = dq.ValidationStatusNotVerified;
  }

  if (
    sys.isNull(
      validationResultJson[EDQ.DataQuality.Message]
    ) /*KM: Do not check for empty*/ &&
    resultCodeToDescription[validationResultJson.Certainty.toUpperCase()] !==
      undefined
  ) {
    validationResultJson[dq.Message] =
      resultCodeToDescription[
        validationResultJson.Certainty.toUpperCase()
      ].ClientMessage;
  }

  var corrections = validationResultJson[dq.Corrections];
  if (!sys.isNull(corrections)) {
    var correctionsString = "";
    for (var i = 0; i < corrections.length; i++) {
      if (correctionsString.length > 0) {
        correctionsString += ", ";
      }
      correctionsString += corrections[i];
    }

    if (!sys.isNullOrEmpty(correctionsString)) {
      "(Suggested: " + correctionsString + ")";
      validationResultJson[EDQ.DataQuality.Message] += sys.stringFormat(
        "({0}: {1})",
        EDQ.DataQuality.Client.getMessage("Suggested"),
        correctionsString
      );
    }
  }
};
EDQ.DataQuality.Phone = EDQ.DataQuality.Phone || {};

EDQ.DataQuality.Phone.LicensedAreaCodes = ["+1"];

EDQ.DataQuality.Phone.Configuration = function Configuration(
  inputMappings,
  outputMappings
) {
  var dq = EDQ.DataQuality;
  dq.Configuration.apply(this, [
    inputMappings,
    outputMappings,
    dq.ConfigurationType.Phone
  ]);
};
EDQ.system.inherit(
  EDQ.DataQuality.Phone.Configuration,
  EDQ.DataQuality.Configuration
);

EDQ.DataQuality.Phone.Client = function Client(configurations) {
  var dq = EDQ.DataQuality;

  dq.Client.apply(this, [configurations]);
};
EDQ.system.inherit(EDQ.DataQuality.Phone.Client, EDQ.DataQuality.Client);

EDQ.DataQuality.Phone.Client.prototype._initializeForConfiguration = function _initializeForConfiguration(
  configuration
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;
  var dqClient = EDQ.DataQuality.Client;

  var client = this;

  var phoneNumberElement = configuration._getElementFromInputMappingByEdqFieldName(
    dq.Number
  );
  if (sys.isNull(phoneNumberElement)) {
    sys.logError(
      "Can not trigger phone validation. The phone number element is not present on the page."
    );
    return;
  }

  phoneNumberElement.oldValue = phoneNumberElement.value;
  var previousOnBlur = phoneNumberElement.onblur;

  dqClient._attachEvent(phoneNumberElement, "onblur", function(event) {
    if (sys.isFunction(previousOnBlur)) {
      previousOnBlur.apply(this, [event]);
    }

    if (this.oldValue === this.value) {
      return;
    }

    if (
      client._callOnValidationStart(configuration, phoneAreaCodeElement) ===
      false
    ) {
      return;
    }

    client._validatePhone(configuration, function() {
      phoneNumberElement.oldValue = phoneNumberElement.value;
    });
  });

  var phoneAreaCodeElement = configuration._getElementFromInputMappingByEdqFieldName(
    dq.AreaCode
  );
  if (!sys.isNull(phoneAreaCodeElement)) {
    var previousOnChange = phoneAreaCodeElement.onchange;

    dqClient._attachEvent(phoneAreaCodeElement, "onchange", function(event) {
      if (sys.isFunction(previousOnChange)) {
        previousOnChange.apply(this, [event]);
      }

      if (
        client._callOnValidationStart(configuration, phoneAreaCodeElement) ===
        false
      ) {
        return;
      }

      client._validatePhone(configuration, function() {
        phoneNumberElement.oldValue = phoneNumberElement.value;
      });
    });
  }
};

EDQ.DataQuality.Phone.Client.prototype._validatePhone = function _validatePhone(
  configuration,
  afterValuesSetCallback,
  beforeExecuteCallback,
  onFinishCallback
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;
  var dqPhoneClient = EDQ.DataQuality.Phone.Client;
  var dqEmailPhone = EDQ.DataQuality.EmailPhone;
  var client = this;

  var parameters = {};

  if (!configuration._inputMappings.hasOwnProperty(dq.Number)) {
    return;
  }

  var numberInputMapping = configuration._inputMappings[dq.Number];
  var numberValue = dq.Client.getConcatenatedElementValues(numberInputMapping);
  var numberElement = configuration._getElementFromInputMappingByEdqFieldName(
    dq.Number
  );

  var processValidationResult = function(result) {
    dqEmailPhone.processValidationResult(
      result,
      dq.PhoneResultCodesAndDescriptions,
      configuration,
      numberElement,
      client,
      afterValuesSetCallback
    );
    client._callOnAfterValidationEnd(configuration, result);
  };

  if (sys.isNullOrEmpty(numberValue)) {
    var emptyResult = dqPhoneClient._createEmptyResult("");
    processValidationResult(emptyResult);

    dq.Client.clearInput(numberElement);

    return;
  }

  var areaCodeInputMapping = configuration._inputMappings[dq.AreaCode];
  var areaCodeValue = sys.isNull(areaCodeInputMapping)
    ? configuration.DefaultAreaCode
    : dq.Client.getConcatenatedElementValues(areaCodeInputMapping);
  var serviceTimeoutInMilliseconds =
    configuration.ServiceValidationTimeoutInMilliseconds;

  parameters[dq.Number] = numberValue;
  parameters[dq.AreaCode] = dqPhoneClient._getAreaCode(areaCodeValue);

  if (
    !sys.containsInArray(
      parameters[dq.AreaCode],
      EDQ.DataQuality.Phone.LicensedAreaCodes
    )
  ) {
    var emptyResult = dqPhoneClient._createEmptyResult("");
    processValidationResult(emptyResult);

    return;
  }

  dq.Client.setProgressToInput(numberElement);

  if (beforeExecuteCallback) beforeExecuteCallback();

  this._executeXMLHttpRequest(
    dq.Phone.Configuration.EndpointUrl,
    parameters,
    serviceTimeoutInMilliseconds,
    function(response, errorMessage, xhr) {
      if (onFinishCallback) onFinishCallback();

      if (!sys.isNullOrEmpty(errorMessage)) {
        var emptyResult = dqPhoneClient._createEmptyResult(errorMessage);
        processValidationResult(emptyResult);

        return;
      }

      processValidationResult(response);
    }
  );
};
EDQ.DataQuality.Phone.Client.prototype.isEdqFieldNameSetValueAllowedForValidationStatus = function isEdqFieldNameSetValueAllowedForValidationStatus(
  edqFieldName,
  validationStatus
) {
  var dq = EDQ.DataQuality;

  if (validationStatus !== dq.ValidationStatusVerified) {
    if (edqFieldName === dq.Number) {
      return false;
    }
  }

  return true;
};
EDQ.DataQuality.Phone.Client._createEmptyResult = function _createEmptyResult(
  errorMessage
) {
  var dq = EDQ.DataQuality;
  var dqPhone = EDQ.DataQuality.Phone;

  var resultJson = {};
  resultJson[dq.Message] = errorMessage;
  resultJson[dqPhone.PhoneType] = "";
  resultJson[dq.Certainty] = "";
  resultJson[dq.Corrections] = "";

  return resultJson;
};
//Start Country configuration
EDQ.DataQuality.Phone.Client._getAreaCode = function _getAreaCode(country) {
  if (country.indexOf("+") == 0) return country;
  var countryConfig = this._getCountryConfig(country);
  if (countryConfig) return countryConfig.AreaCode;
  return country;
};
EDQ.DataQuality.Phone.Client._getCountryConfig = function _getCountryConfig(
  country
) {
  for (var key in this.Configurations) {
    var countryConfig = this.Configurations[key];
    var countryLower = country.toLowerCase();

    if (
      countryConfig.Iso3.toLowerCase() == countryLower ||
      countryConfig.Iso2.toLowerCase() == countryLower ||
      countryConfig.Name.toLowerCase() == countryLower
    ) {
      return countryConfig;
    }
  }
  return null;
};
EDQ.DataQuality.Phone.Client.Configurations = [
  {
    Name: "United States",
    Iso2: "US",
    Iso3: "USA",
    AreaCode: "+1"
  },
  {
    Name: "Canada",
    Iso2: "CA",
    Iso3: "CAN",
    AreaCode: "+1"
  },
  {
    Name: "Germany",
    Iso2: "DE",
    Iso3: "DEU",
    AreaCode: "+49"
  },
  {
    Name: "United Kingdom",
    Iso2: "UK",
    Iso3: "GBR",
    AreaCode: "+4"
  },
  {
    Name: "Australia",
    Iso2: "AU",
    Iso3: "AUS",
    AreaCode: "+61"
  },
  {
    Name: "Denmark",
    Iso2: "DK",
    Iso3: "DNK",
    AreaCode: "+45"
  },
  {
    Name: "France",
    Iso2: "FR",
    Iso3: "FRA",
    AreaCode: "+33"
  },
  {
    Name: "Belgium",
    Iso2: "BE",
    Iso3: "BEL",
    AreaCode: "+32"
  },
  {
    Name: "Finland",
    Iso2: "FI",
    Iso3: "FIN",
    AreaCode: "+358"
  },
  {
    Name: "Ireland",
    Iso2: "IE",
    Iso3: "IRL",
    AreaCode: "+353"
  },
  {
    Name: "Luxembourg",
    Iso2: "LU",
    Iso3: "LUX",
    AreaCode: "+352"
  },
  {
    Name: "Netherlands",
    Iso2: "NL",
    Iso3: "NLD",
    AreaCode: "+31"
  },
  {
    Name: "Norway",
    Iso2: "NO",
    Iso3: "NOR",
    AreaCode: "+47"
  },
  {
    Name: "New Zealand",
    Iso2: "NZ",
    Iso3: "NZL",
    AreaCode: "+64"
  },
  {
    Name: "Sweden",
    Iso2: "SE",
    Iso3: "SWE",
    AreaCode: "+46"
  },
  {
    Name: "Portugal",
    Iso2: "PT",
    Iso3: "PRT",
    AreaCode: "+351"
  },
  {
    Name: "Spain",
    Iso2: "ES",
    Iso3: "ESP",
    AreaCode: "+34"
  }
];

EDQ.DataQuality.Phone.PhoneType = "PhoneType";
EDQ.DataQuality.Email = EDQ.DataQuality.Email || {};

EDQ.DataQuality.Email.Configuration = function Configuration(
  inputMappings,
  outputMappings
) {
  var dq = EDQ.DataQuality;

  dq.Configuration.apply(this, [
    inputMappings,
    outputMappings,
    dq.ConfigurationType.Email
  ]);
};
EDQ.system.inherit(
  EDQ.DataQuality.Email.Configuration,
  EDQ.DataQuality.Configuration
);

EDQ.DataQuality.Email.Client = function Client(configurations) {
  var dq = EDQ.DataQuality;

  dq.Client.apply(this, [configurations]);
};
EDQ.system.inherit(EDQ.DataQuality.Email.Client, EDQ.DataQuality.Client);

EDQ.DataQuality.Email.Client.prototype._initializeForConfiguration = function _initializeForConfiguration(
  configuration
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;
  var dqClient = EDQ.DataQuality.Client;

  var client = this;

  var emailElement = configuration._getElementFromInputMappingByEdqFieldName(
    dq.EmailAddress
  );
  if (sys.isNull(emailElement)) {
    sys.logError(
      "Can not trigger email validation. The email field is not present on the page."
    );
    return;
  }

  emailElement.oldValue = emailElement.value;
  var previousOnBlur = emailElement.onblur;

  dqClient._attachEvent(emailElement, "onblur", function(event) {
    if (sys.isFunction(previousOnBlur)) {
      previousOnBlur.apply(this, [event]);
    }

    if (this.oldValue === this.value) {
      return;
    }
    if (client._callOnValidationStart(configuration, emailElement) === false) {
      return;
    }

    client._validateEmail(configuration, function() {
      emailElement.oldValue = emailElement.value;
    });
  });
};

EDQ.DataQuality.Email.Client.prototype._validateEmail = function _validateEmail(
  configuration,
  afterValuesSetCallback,
  beforeExecuteCallback,
  onFinishCallback
) {
  var sys = EDQ.system;
  var dq = EDQ.DataQuality;
  var dqClient = dq.Client;
  var dqEmailClient = EDQ.DataQuality.Email.Client;
  var dqEmailPhone = EDQ.DataQuality.EmailPhone;

  var parameters = {};

  if (!configuration._inputMappings.hasOwnProperty(dq.EmailAddress)) {
    return;
  }

  var inputMapping = configuration._inputMappings[dq.EmailAddress];
  var value = dqClient.getConcatenatedElementValues(inputMapping);
  var emailElement = configuration._getElementFromInputMappingByEdqFieldName(
    dq.EmailAddress
  );
  var serviceTimeoutInMilliseconds =
    configuration.ServiceValidationTimeoutInMilliseconds;

  var client = this;
  var processValidationResult = function(result) {
    dqEmailPhone.processValidationResult(
      result,
      dq.EmailResultCodesAndDescriptions,
      configuration,
      emailElement,
      client,
      afterValuesSetCallback
    );
    client._callOnAfterValidationEnd(configuration, result);
  };

  if (sys.isNullOrEmpty(value)) {
    var emptyResult = dqEmailClient._createEmptyResult("");
    processValidationResult(emptyResult);

    return;
  }

  parameters[dq.EmailAddress] = value;

  dq.Client.setProgressToInput(emailElement);

  if (beforeExecuteCallback) beforeExecuteCallback();

  this._executeXMLHttpRequest(
    dq.Email.Configuration.EndpointUrl,
    parameters,
    serviceTimeoutInMilliseconds,
    function(response, errorMessage, xhr) {
      if (onFinishCallback) onFinishCallback();

      if (!sys.isNullOrEmpty(errorMessage)) {
        var emptyResult = dqEmailClient._createEmptyResult(errorMessage);
        processValidationResult(emptyResult);

        return;
      }

      processValidationResult(response);
    }
  );
};
EDQ.DataQuality.Email.Client.prototype.isEdqFieldNameSetValueAllowedForValidationStatus = function isEdqFieldNameSetValueAllowedForValidationStatus(
  edqFieldName,
  validationStatus
) {
  var dq = EDQ.DataQuality;

  if (validationStatus !== dq.ValidationStatusVerified) {
    if (edqFieldName === dq.EmailAddress) {
      return false;
    }
  }

  return true;
};

EDQ.DataQuality.Email.Client._createEmptyResult = function _createEmptyResult(
  errorMessage
) {
  var dq = EDQ.DataQuality;

  var resultJson = {};
  resultJson[dq.Message] = errorMessage;
  resultJson[dq.EmailAddress] = "";
  resultJson[dq.Certainty] = "";
  resultJson[dq.Corrections] = "";

  return resultJson;
};
EDQ.DataQuality.Address = EDQ.DataQuality.Address || {};

EDQ.DataQuality.Address.Modal = function Modal(editCall) {
  var m_editCall = editCall;
  var m_pickList;
  var m_orig;
  var m_message;
  var m_pickHtml = "";
  var sys = EDQ.system;
  var m_fullPicklistMoniker;
  /**************************PRIVATE**************************/

  //create a picklist
  var buildPick = function() {
    var i;
    //reinitialize
    m_pickHtml = "";
    for (i = 0; i < m_pickList.length; i++) {
      var moniker = sys.isNullOrEmpty(m_pickList[i].moniker)
        ? m_pickList[i].Moniker
        : m_pickList[i].moniker;
      if (m_pickList[i].FullAddress) {
        m_pickHtml +=
          "<tr><td NOWRAP><a href='#' class='QAS_StepIn' moniker='" +
          moniker +
          "' >" +
          decodeURIComponent(m_pickList[i].PickList) +
          "</a></td><td NOWRAP><a href='#' class='QAS_StepIn' moniker='" +
          moniker +
          "'>" +
          decodeURIComponent(m_pickList[i].Postcode) +
          "</a></td></tr>";
      } else {
        m_pickHtml +=
          "<tr><td NOWRAP class='QAS_Partial_Refine' moniker='" +
          moniker +
          "' range='" +
          m_pickList[i].UnresolvableRange +
          "'>" +
          decodeURIComponent(m_pickList[i].PickList) +
          "</td><td NOWRAP>" +
          decodeURIComponent(m_pickList[i].Postcode) +
          "</td></tr>";
      }
    }
  };

  //create a picklist for multiple address, all items must be clickable
  var buildMultPick = function() {
    var i;
    //reinitialize
    m_pickHtml = "";
    var sys = EDQ.system;

    for (i = 0; i < m_pickList.length; i++) {
      var moniker = sys.isNullOrEmpty(m_pickList[i].moniker)
        ? m_pickList[i].Moniker
        : m_pickList[i].moniker;
      if (m_pickList[i].FullAddress) {
        m_pickHtml +=
          "<tr><td NOWRAP><a href='#' class='QAS_StepIn' moniker='" +
          moniker +
          "'>" +
          decodeURIComponent(m_pickList[i].PickList) +
          "</a></td><td NOWRAP><a href='#' class='QAS_StepIn' moniker='" +
          moniker +
          "'>" +
          decodeURIComponent(m_pickList[i].Postcode) +
          "</a></td></tr>";
      } else {
        m_pickHtml +=
          "<tr><td NOWRAP><a href='#' class='QAS_Refine' moniker='" +
          moniker +
          "' >" +
          decodeURIComponent(m_pickList[i].PickList) +
          "</a></td><td NOWRAP><a href='#' class='QAS_Refine' moniker='" +
          moniker +
          "'>" +
          decodeURIComponent(m_pickList[i].Postcode) +
          "</a></td></tr>";
      }
    }
  };

  //build display of original address and button to click
  var buildRightSide = function(callback) {
    var origHtml = "";
    var i;

    for (i = 0; i < m_orig.length; i++) {
      var encodedURI = encodeURIComponent(m_orig[i]);
      origHtml += "<tr><td>" + decodeURIComponent(encodedURI) + "</td></tr>";
    }

    EDQ.JQuery(".QAS_RightDetails").html(
      "<div class='QAS_RightSidePrompt'>" +
        "<div class='QAS_RightSidePromptText'>" +
        EDQ.DataQuality.AddressVerifyLevelsPrompt.RightSide.prompt +
        "<span class='QAS_EditLink'><a href='#' id='QAS_Edit'>" +
        EDQ.DataQuality.AddressVerifyLevelsPrompt.RightSide.edit +
        "</a>   ></span>" +
        "</div>" +
        "<input type='button' id='QAS_AcceptOriginal' value='" +
        EDQ.DataQuality.AddressVerifyLevelsPrompt.RightSide.button +
        "' />" +
        "</div>" +
        "<table>" +
        origHtml +
        "</table>" +
        "<div class='QAS_DeliverableWarning'>" +
        EDQ.DataQuality.AddressVerifyLevelsPrompt.RightSide.warning +
        "</div>"
    );

    EDQ.JQuery("#QAS_AcceptOriginal").button();

    //assign onclick for accepting original address
    EDQ.JQuery("#QAS_AcceptOriginal").click(function() {
      EDQ.JQuery("#QAS_Dialog").dialog("close");
      initializeEDQ();
      callback();
    });

    //assign onclick for edit button
    EDQ.JQuery("#QAS_Edit").click(function() {
      if (window.isControlOnFormForEditUsingSelectedSavedAddress) {
        try {
          EDQ.JQuery("#id-sio-button-to-modify-flags").click();
        } catch (err) {}
      }
      EDQ.JQuery("#QAS_Dialog").dialog("close");
      $(".form-modal").show();
      if (window.location.pathname.indexOf("/ro") !== -1) {
        angular.element(".loaderback").removeClass("showLoader");
      }
      configureAndInitializeEDQ();
      //m_editCall();
      return false;
    });
  };

  //load div tags to page and set modal dialogs
  var load = function() {
    //remove the dialog if it already exists
    EDQ.JQuery("#QAS_Dialog").remove();
    EDQ.JQuery("#QAS_Wait").remove();

    //add div tag to page
    EDQ.JQuery(document.body).append(
      "<div id='QAS_Dialog' title='" +
        EDQ.DataQuality.AddressVerifyLevelsPrompt.title +
        "'>" +
        "  <div class='QAS_Header ui-state-highlight'></div>" +
        "  <div class='QAS_Prompt'>" +
        "    <div class='QAS_PromptText'></div>" +
        "    <div class='QAS_Input'></div>" +
        "    <div class='QAS_PromptData'></div>" +
        "  </div>" +
        "  <div class='QAS_RightDetails'></div>" +
        "  <div class='QAS_Picklist'>" +
        "	<div class='QAS_SelectOne'>Select One</div>" +
        "    <div class='QAS_MultPick'></div>" +
        "    <div class='QAS_ShowPick'></div>" +
        "    <div class='QAS_Pick'></div>" +
        "  </div>" +
        "</div>" +
        "<div id='QAS_Wait' title = '" +
        EDQ.DataQuality.AddressVerifyLevelsPrompt.waitMessage +
        "'></div>"
    );

    //add jqueryui modal dialog to div tag, for user interaction
    EDQ.JQuery("#QAS_Dialog").dialog({
      modal: true,
      //height: 450,  ////causes issues with IE
      width: 600,
      autoOpen: false,
      closeOnEscape: false,
      resizable: false,
      draggable: false
    });

    //add jqueryui modal dialog to div tag, for waiting dialog
    EDQ.JQuery("#QAS_Wait").dialog({
      modal: true,
      height: 100,
      width: 600,
      autoOpen: false,
      closeOnEscape: false,
      resizable: false,
      draggable: false
    });

    //add slide toggle to show pick list
    EDQ.JQuery(".QAS_ShowPick").click(function() {
      EDQ.JQuery(".QAS_Pick").slideToggle("slow");
      return false;
    });

    //re-center popup when window is resized
    EDQ.JQuery(window).resize(function() {
      EDQ.JQuery("#QAS_Dialog").dialog("option", "position", "center");
    });
  };

  //open waiting diaglog
  this.waitOpen = function() {
    EDQ.JQuery("#QAS_Dialog").dialog("close");
    EDQ.JQuery("#QAS_Wait").dialog("open");
    //remove close button from top right of dialog
    EDQ.JQuery(".ui-dialog-titlebar-close").css("display", "none");
    EDQ.JQuery(".ui-dialog-content").hide();
  };

  //close waiting dialog
  this.waitClose = function() {
    EDQ.JQuery("#QAS_Wait").dialog("close");
    EDQ.JQuery(".ui-dialog-titlebar-close").css("display", "none");
  };

  //display interaction dialog
  this.display = function() {
    window.scroll(0, 0);

    EDQ.JQuery("#QAS_Dialog").dialog("open");
    EDQ.JQuery(".ui-widget-overlay").css("z-index", "4000");
    EDQ.JQuery("[role='dialog']").css("z-index", "4001");

    //remove close button from top right of dialog
    EDQ.JQuery(".ui-dialog-titlebar-close").css("display", "none");

    //remove the default focus from interaction required button(so that it is not highlighted as if mouse is hovering on it)
    EDQ.JQuery("#QAS_RefineBtn").blur();
    EDQ.JQuery(".QAS_Header").focus();
  };

  //set dialog to handle interaction required address
  this.setInterReq = function(
    cleaned,
    orig,
    message,
    acceptCallback,
    origCallback
  ) {
    m_orig = orig;
    m_message = message;

    var cleanedHtml = "",
      i;

    //build right side of dialog
    buildRightSide(origCallback);

    //build cleansed address to show to end-user
    for (i = 0; i < QAS_Variables.DISPLAY_LINES; i++) {
      cleanedHtml += "<tr><td>" + decodeURIComponent(cleaned[i]) + "</td></tr>";
    }

    //display proper messages
    EDQ.JQuery(".QAS_Header").html(message.header);
    EDQ.JQuery(".QAS_PromptText").html(message.prompt);
    EDQ.JQuery(".QAS_PromptData").html(
      "<br /><br />" + "<table>" + cleanedHtml + "</table>"
    );
    EDQ.JQuery(".QAS_Input").html(
      "<input type='button' id='QAS_RefineBtn' value='" +
        message.button +
        "' />"
    );
    EDQ.JQuery(".QAS_MultPick").html("");
    EDQ.JQuery(".QAS_ShowPick").html("");
    EDQ.JQuery(".QAS_Pick").html("");

    EDQ.JQuery(".QAS_MultPick").hide();

    //add jqueryui button
    EDQ.JQuery("#QAS_RefineBtn").button();

    //add onclick event to the button
    EDQ.JQuery("#QAS_RefineBtn").click(function() {
      window.sioAreDetailsFromQasConfirmNumber = true;
      EDQ.JQuery("#QAS_Dialog").dialog("close");
      acceptCallback();
    });
  };

  //set dialog to handle premises and street partial addresses
  this.setPartial = function(
    pickList,
    orig,
    message,
    refineCallback,
    monikerCallback,
    origCallback
  ) {
    m_pickList = pickList.PickListEntries;
    m_fullPicklistMoniker = pickList.FullPicklistMoniker;

    m_orig = orig;
    m_message = message;

    //build picklist to display and right side of dialog
    buildPick();
    buildRightSide(origCallback);

    //display proper messages and picklist
    EDQ.JQuery(".QAS_Header").html(message.header);
    EDQ.JQuery(".QAS_PromptText").html(message.prompt);
    EDQ.JQuery(".QAS_PromptData").html("");
    EDQ.JQuery(".QAS_Input").html(
      "<input type='text' id='QAS_RefineText' aria-label='Confirm your house/building number'/>" +
        "<input type='button' id='QAS_RefineBtn' value='" +
        message.button +
        "' />"
    );
    EDQ.JQuery(".QAS_MultPick").html("");
    EDQ.JQuery(".QAS_ShowPick").html(
      "<a href='#'>" + message.showPicklist + "</a>"
    );
    EDQ.JQuery(".QAS_Pick").html("<table>" + m_pickHtml + "</table>");
    EDQ.JQuery(".QAS_SelectOne").hide();
    EDQ.JQuery(".QAS_MultPick").hide();

    //add jqueryui button
    EDQ.JQuery("#QAS_RefineBtn").button();

    //add onclick event to the button
    EDQ.JQuery("#QAS_RefineBtn").click(function() {
      window.sioAreDetailsFromQasConfirmNumber = true;
      var value = EDQ.JQuery("#QAS_RefineText").val();
      if (value === "") {
        //if no value was entered in field, display error message
        alert(EDQ.DataQuality.Client.getMessage("No value entered"));
      } else {
        var ranges = [];
        EDQ.JQuery("#QAS_Dialog .QAS_Partial_Refine").each(function(
          index,
          element
        ) {
          var range = {};
          range.moniker = EDQ.JQuery(element).attr("moniker");
          range.range = EDQ.JQuery(element).attr("range");
          range.address = EDQ.JQuery(element).text();

          ranges.push(range);
        });

        if (refineCallback(value, ranges, m_fullPicklistMoniker)) {
          EDQ.JQuery("#QAS_Dialog").dialog("close");
        }
      }
    });

    //add onclick event to any full addresses in the picklist
    EDQ.JQuery(".QAS_StepIn").click(function() {
      window.sioAreDetailsFromQasSuggestedAddresses = true;
      $(".form-modal").show();
      EDQ.JQuery("#QAS_Dialog").dialog("close");
      var mon = EDQ.JQuery(this).attr("moniker");
      monikerCallback(mon);
      return false;
    });
  };

  //set dialog to handle addresses that fail dpv
  this.setDPVPartial = function(orig, message, refineCallback, origCallback) {
    m_orig = orig;
    m_message = message;

    //build right side of dialog
    buildRightSide(origCallback);

    //display proper messages
    EDQ.JQuery(".QAS_Header").html(message.header);
    EDQ.JQuery(".QAS_PromptText").html(message.prompt);
    EDQ.JQuery(".QAS_PromptData").html("");
    EDQ.JQuery(".QAS_Input").html(
      "<input type='text' id='QAS_RefineText' />" +
        "<input type='button' id='QAS_RefineBtn' value='" +
        message.button +
        "' />"
    );
    EDQ.JQuery(".QAS_MultPick").html("");

    EDQ.JQuery(".QAS_MultPick").hide();

    //add jqueryui button
    EDQ.JQuery("#QAS_RefineBtn").button();

    //add onclick event to the button
    EDQ.JQuery("#QAS_RefineBtn").click(function() {
      window.sioAreDetailsFromQasConfirmNumber = true;
      if (EDQ.JQuery("#QAS_RefineText").val() === "") {
        //if no value was entered in field, display error message
        alert(EDQ.DataQuality.Client.getMessage("No value entered"));
      } else {
        EDQ.JQuery("#QAS_Dialog").dialog("close");
        refineCallback();
      }
    });
  };

  //set dialog to handle addresses missing apt info
  this.setAptAppend = function(
    orig,
    message,
    refineCallback,
    noAptCallback,
    origCallback
  ) {
    m_orig = orig;
    m_message = message;

    //build right side of dialog
    buildRightSide(origCallback);

    //display proper messages
    EDQ.JQuery(".QAS_Header").html(message.header);
    EDQ.JQuery(".QAS_PromptText").html(message.prompt);
    EDQ.JQuery(".QAS_PromptData").html("");
    EDQ.JQuery(".QAS_Input").html(
      "<input type='text' id='QAS_RefineText' />" +
        "<input type='button' id='QAS_RefineBtn' value='" +
        message.button +
        "' />" +
        "<br />" +
        "<input type='button' id='QAS_NoApt' value='" +
        message.noApt +
        "' />"
    );
    EDQ.JQuery(".QAS_MultPick").html("");

    EDQ.JQuery(".QAS_MultPick").hide();

    //add jqueryui button
    EDQ.JQuery("#QAS_RefineBtn").button();
    EDQ.JQuery("#QAS_NoApt").button();

    //add onclick event to the button
    EDQ.JQuery("#QAS_RefineBtn").click(function() {
      window.sioAreDetailsFromQasConfirmNumber = true;
      if (EDQ.JQuery("#QAS_RefineText").val() === "") {
        //if no value was entered in field, display error message
        alert(EDQ.DataQuality.Client.getMessage("No value entered"));
      } else {
        EDQ.JQuery("#QAS_Dialog").dialog("close");
        refineCallback();
      }
    });

    //add onclick event to button, in order to accept cleaned address as is, with no apt
    EDQ.JQuery("#QAS_NoApt").click(function() {
      EDQ.JQuery("#QAS_Dialog").dialog("close");
      noAptCallback();
    });
  };

  //set dialog to handle multiple addresses
  this.setMultiple = function(
    pickList,
    orig,
    message,
    formatCallback,
    refineCallback,
    origCallback
  ) {
    m_pickList = pickList;
    m_orig = orig;
    m_message = message;

    //build picklist to display and right side of dialog
    buildMultPick();
    buildRightSide(origCallback);

    //display proper messages and picklist
    EDQ.JQuery(".QAS_Header").html(message.header);
    EDQ.JQuery(".QAS_PromptText").html(message.prompt);
    EDQ.JQuery(".QAS_PromptData").html("");
    EDQ.JQuery(".QAS_Input").html("");
    EDQ.JQuery(".QAS_MultPick").html("<table>" + m_pickHtml + "</table>");
    EDQ.JQuery(".QAS_ShowPick").html("");
    EDQ.JQuery(".QAS_Pick").html("");

    EDQ.JQuery(".QAS_MultPick").show();

    //step into any full address
    EDQ.JQuery(".QAS_StepIn").click(function() {
      window.sioAreDetailsFromQasSuggestedAddresses = true;
      $(".form-modal").show();
      var mon = EDQ.JQuery(this).attr("moniker");
      formatCallback(mon);

      return false;
    });

    //refine on non-full address
    EDQ.JQuery(".QAS_Refine").click(function() {
      window.sioAreDetailsFromQasSuggestedAddresses = true;
      EDQ.JQuery("#QAS_Dialog").dialog("close");
      var mon = EDQ.JQuery(this).attr("moniker");
      refineCallback(mon);
    });
  };

  //Set display for Interaction_Required
  this.setInteractionRequired = function(
    result,
    dataset,
    configuration,
    originalAddress,
    message,
    formatCallback,
    doGetAddressCallback,
    origCallback
  ) {
    var i;
    var sys = EDQ.system;
    m_orig = originalAddress;
    //reinitialize

    m_pickHtml = "";
    buildInteractionRequired(result, dataset, configuration);
    buildRightSide(origCallback);

    //display proper messages and picklist
    EDQ.JQuery(".QAS_Header").html(message.header);
    EDQ.JQuery(".QAS_PromptText").html(message.prompt);
    EDQ.JQuery(".QAS_PromptData").html("");
    EDQ.JQuery(".QAS_Input").html(
      sys.stringFormat(
        "<input type='button' value='{0}' class='QAS_StepIn ui-button ui-widget ui-state-default ui-corner-all'></input>",
        EDQ.DataQuality.Client.getMessage("Use suggested address")
      )
    );
    EDQ.JQuery(".QAS_MultPick").html(
      "<table class='interaction-result'>" + m_pickHtml + "</table>"
    );
    EDQ.JQuery(".QAS_ShowPick").html("");
    EDQ.JQuery(".QAS_Pick").html("");
    EDQ.JQuery(".QAS_MultPick").show();
    EDQ.JQuery(".QAS_SelectOne").hide();
    EDQ.JQuery(".QAS_StepIn").click(function() {
      window.sioAreDetailsFromQasSuggestedAddresses = true;
      $(".form-modal").show();
      EDQ.JQuery("#QAS_Dialog").dialog("close");
      formatCallback(result);
    });
    EDQ.JQuery(".QAS_Refine").click(function() {
      window.sioAreDetailsFromQasSuggestedAddresses = true;
      EDQ.JQuery("#QAS_Dialog").dialog("close");
      doGetAddressCallback(result);
    });
  };
  var buildInteractionRequired = function(
    validationResultJson,
    dataset,
    configuration
  ) {
    var sys = EDQ.system;
    var dq = EDQ.DataQuality;
    var inputMapping = configuration._originalInputMappings;
    var outputMapping = (datasetSettings = configuration.getDataSetSettings(
      dataset
    ));

    var addressLines =
      validationResultJson.addressLineDictionary ||
      validationResultJson.AddressLineDictionary;
    var edqFieldNames = [dq.DataSet, dq.Street, dq.City, dq.State, dq.Postcode];

    for (var index = 0; index < edqFieldNames.length; index++) {
      var htmlElementIds = inputMapping[edqFieldNames[index]];
      if (sys.isNull(htmlElementIds) || htmlElementIds.lenth == 0) {
        continue;
      }
      for (var i = 0; i < htmlElementIds.length; i++) {
        var outputMappingEdqFieldNames =
          outputMapping.mappings[htmlElementIds[i]];
        if (
          !sys.isNullOrEmpty(outputMappingEdqFieldNames) &&
          outputMappingEdqFieldNames.length > 0
        ) {
          var fieldValue = "";
          for (var j = 0; j < outputMappingEdqFieldNames.length; j++) {
            if (fieldValue.length > 0) {
              fieldValue = fieldValue.trim();
              fieldValue += " ";
            }

            fieldValue += addressLines[outputMappingEdqFieldNames[j]];
          }
          AppendToFormattedAddressSection(fieldValue);
        }
      }
    }
  };
  function AppendToFormattedAddressSection(value) {
    m_pickHtml +=
      "<tr><td NOWRAP class='addressLineRow'>" +
      decodeURIComponent(value) +
      "</td></tr>";
  }

  function convertHtmlObjectToText(htmlTag) {
    var el = document.createElement("div");
    el.appendChild(htmlTag);
    return el.innerHTML;
  }

  //set display for none verifylevel
  this.setNone = function(orig, message, origCallback) {
    m_orig = orig;
    m_message = message;

    buildRightSide(origCallback);

    EDQ.JQuery(".QAS_Header").html(message.header);
    EDQ.JQuery(".QAS_Prompt").remove();
    EDQ.JQuery(".QAS_Input").remove();
    EDQ.JQuery(".QAS_MultPick").html("");
    EDQ.JQuery(".QAS_ShowPick").remove();
    EDQ.JQuery(".QAS_Pick").remove();
    EDQ.JQuery(".QAS_RightDetails").css("float", "left");
    EDQ.JQuery(".QAS_RightDetails").css("border-left", "none");
    EDQ.JQuery(".QAS_SelectOne").hide();
    EDQ.JQuery(".QAS_MultPick").hide();
  };

  //constructor
  load();
};
//If you wish to override the messages(buttons,labels, popup messages, etc.) copy here the message collections 'EDQ.DataQuality.Address.PromptSet.EDQFieldsMetadataMessages' and 'EDQ.DataQuality.Client.Messages'.

window.configureAndInitializeEDQ = function() {
  configureEDQ();
  initializeEDQ();
  console.log('EDQ function called')
};

window.initializeEDQ = function() {
  EDQ.JQuery("body").append(
    '<img src="../images/edqimages/progress.gif" id="edq-progress-image" style="display: none;" alt="loading.." /><img src="../images/edqimages/validated.png" id="edq-validated-image" style="display: none;" alt="loading.." /><img src="../images/edqimages/not-validated.png" id="edq-not-validated-image" style="display: none;" alt="loading.."/>'
  );

  var dq = EDQ.DataQuality;

  edqAddressClient.initialize();
  edqEmailClient.initialize();
  edqPhoneClient.initialize();
};

window.configureEDQ = function() {
  var host = document.location.hostname;
  var port = window.location.port;
  var protocol = location.protocol;

  if (host == "localhost") {
    host = host + ":" + port;
  }

  EDQ.JQuery.ajax({
    url:
      protocol +
      "//" +
      host +
      "/rest/model/core/rest/navigation/actor/VSINavigationActor/getEnvConfiguration",
    success: function(result) {
      if (
        result.edqEnableCountryMap &&
        !EDQ.JQuery.isEmptyObject(result.edqEnableCountryMap)
      ) {
        EDQ.DataQuality.Address.Client.CountryToDataSetMap =
          result.edqEnableCountryMap;
      } else {
        EDQ.DataQuality.Address.Client.CountryToDataSetMap = {
          CAN: "CAN",
          NEWFOUNDLAND: "CAN",
          CA: "CAN",
          QUEBEC: "CAN",
          "BRITISH COLUMBIA": "CAN",
          MANITOBA: "CAN",
          ONTARIO: "CAN",
          KANADA: "CAN",
          "NORTHWEST TERRITORIES": "CAN",
          "NEW BRUNSWICK": "CAN",
          CANADA: "CAN",
          USA: "USA",
          EUA: "USA",
          US: "USA",
          "YHDYSVALLAT AMERIKKA": "USA",
          "AMERIKAS FORENTA STATER": "USA",
          "LOS E.E.U.U.": "USA",
          "U.S.": "USA",
          "U.S.A.": "USA",
          "UNITED STATES": "USA",
          "UNITED STATES OF AMERICA": "USA"
        };
      }
    }
  });

  EDQ.DataQuality.Address.Client.DataSetSettings = {
    CAN: { FlattenPickList: true, DefaultEngine: "Verification" },
    USA: { FlattenPickList: true, DefaultEngine: "Verification" }
  };

  var phoneSettings = [];
  var emailSettings = [];
  var addressSettings = [];

  var address0 = {
    UsePromptSets: true,
    CanChangeLabels: true,
    CanChangeOrder: true,
    EnforceUsage: true,
    AlwaysShowManualEntry: false,
    DataSetSettings: [
      {
        DataSet: "USA",
        Layout: "USA2 AptLine2 TitleCase Retention",
        UseModal: true,
        OutputMapping: {
          atg_store_streetAddressInput: ["0"],
          atg_store_streetAddressOptionalInput: ["1"],
          atg_store_localityInput: ["2"],
          atg_store_stateSelect: ["3"],
          atg_store_postalCodeInput: ["4"],
          edqValidationStatus: ["ValidationStatus"]
        }
      },
      {
        DataSet: "CAN",
        Layout: "CAN2 AptLine2 TitleCase NoRetention",
        UseModal: true,
        OutputMapping: {
          atg_store_streetAddressInput: ["0"],
          atg_store_streetAddressOptionalInput: ["1"],
          atg_store_localityInput: ["2"],
          atg_store_stateSelect: ["3"],
          atg_store_postalCodeInput: ["4"],
          edqValidationStatus: ["ValidationStatus"]
        }
      }
    ],
    Page: "/s/myAccount/myAccount",
    InputMapping: {
      DataSet: ["atg_store_countryNameSelect"],
      Street1: [
        "atg_store_streetAddressInput",
        "atg_store_streetAddressOptionalInput"
      ],
      City: ["atg_store_localityInput"],
      State: ["atg_store_stateSelect"],
      Postcode: ["atg_store_postalCodeInput"],
      SubmitButton: ["edq-validation-button"]
    }
  };
  addressSettings.push(address0);
  var address1 = {
    UsePromptSets: true,
    CanChangeLabels: true,
    CanChangeOrder: true,
    EnforceUsage: true,
    AlwaysShowManualEntry: false,
    DataSetSettings: [
      {
        DataSet: "USA",
        Layout: "USA2 AptLine2 TitleCase Retention",
        UseModal: true,
        OutputMapping: {
          atg_store_streetAddressInput: ["0"],
          atg_store_streetAddressOptionalInput: ["1"],
          atg_store_localityInput: ["2"],
          atg_store_stateSelect: ["3"],
          atg_store_postalCodeInput: ["4"],
          edqValidationStatus: ["ValidationStatus"]
        }
      },
      {
        DataSet: "CAN",
        Layout: "CAN2 AptLine2 TitleCase NoRetention",
        UseModal: true,
        OutputMapping: {
          atg_store_streetAddressInput: ["0"],
          atg_store_streetAddressOptionalInput: ["1"],
          atg_store_localityInput: ["2"],
          atg_store_stateSelect: ["3"],
          atg_store_postalCodeInput: ["4"],
          edqValidationStatus: ["ValidationStatus"]
        }
      }
    ],
    Page: "/p/adpEnroll/",
    InputMapping: {
      DataSet: ["atg_store_countryNameSelect"],
      Street1: [
        "atg_store_streetAddressInput",
        "atg_store_streetAddressOptionalInput"
      ],
      City: ["atg_store_localityInput"],
      State: ["atg_store_stateSelect"],
      Postcode: ["atg_store_postalCodeInput"],
      SubmitButton: ["edq-validation-button"]
    }
  };
  addressSettings.push(address1);
  var address2 = {
    UsePromptSets: true,
    CanChangeLabels: true,
    CanChangeOrder: true,
    EnforceUsage: true,
    AlwaysShowManualEntry: false,
    DataSetSettings: [
      {
        DataSet: "USA",
        Layout: "USA2 AptLine2 TitleCase Retention",
        UseModal: true,
        OutputMapping: {
          atg_store_streetAddressInput: ["0"],
          atg_store_streetAddressOptionalInput: ["1"],
          atg_store_localityInput: ["2"],
          atg_store_stateSelect: ["3"],
          atg_store_postalCodeInput: ["4"],
          edqValidationStatus: ["ValidationStatus"]
        }
      },
      {
        DataSet: "CAN",
        Layout: "CAN2 AptLine2 TitleCase NoRetention",
        UseModal: true,
        OutputMapping: {
          atg_store_streetAddressInput: ["0"],
          atg_store_streetAddressOptionalInput: ["1"],
          atg_store_localityInput: ["2"],
          atg_store_stateSelect: ["3"],
          atg_store_postalCodeInput: ["4"],
          edqValidationStatus: ["ValidationStatus"]
        }
      }
    ],
    Page: "/s/msi/subscriber.jsp",
    InputMapping: {
      DataSet: ["billing_countryNameSelect"],
      Street1: [
        "atg_store_streetAddressInput",
        "atg_store_streetAddressOptionalInput"
      ],
      City: ["atg_store_localityInput"],
      State: ["atg_store_stateSelect"],
      Postcode: ["atg_store_postalCodeInput"],
      SubmitButton: ["edq-validation-button"]
    }
  };
  addressSettings.push(address2);
  var address3 = {
    UsePromptSets: true,
    CanChangeLabels: true,
    CanChangeOrder: true,
    EnforceUsage: true,
    AlwaysShowManualEntry: false,
    DataSetSettings: [
      {
        DataSet: "USA",
        Layout: "USA2 AptLine2 TitleCase Retention",
        UseModal: true,
        OutputMapping: {
          atg_store_streetAddressInput: ["0"],
          atg_store_streetAddressOptionalInput: ["1"],
          atg_store_localityInput: ["2"],
          atg_store_stateSelect: ["3"],
          atg_store_postalCodeInput: ["4"],
          edqValidationStatus: ["ValidationStatus"]
        }
      },
      {
        DataSet: "CAN",
        Layout: "CAN2 AptLine2 TitleCase NoRetention",
        UseModal: true,
        OutputMapping: {
          atg_store_streetAddressInput: ["0"],
          atg_store_streetAddressOptionalInput: ["1"],
          atg_store_localityInput: ["2"],
          atg_store_stateSelect: ["3"],
          atg_store_postalCodeInput: ["4"],
          edqValidationStatus: ["ValidationStatus"]
        }
      }
    ],
    Page: "/ro/",
    InputMapping: {
      DataSet: ["atg_store_countryNameSelect"],
      Street1: [
        "atg_store_streetAddressInput",
        "atg_store_streetAddressOptionalInput"
      ],
      City: ["atg_store_localityInput"],
      State: ["atg_store_stateSelect"],
      Postcode: ["atg_store_postalCodeInput"],
      SubmitButton: ["edq-validation-button"]
    }
  };
  addressSettings.push(address3);
  var address4 = {
    UsePromptSets: true,
    CanChangeLabels: true,
    CanChangeOrder: true,
    EnforceUsage: true,
    AlwaysShowManualEntry: false,
    DataSetSettings: [
      {
        DataSet: "USA",
        Layout: "USA2 AptLine2 TitleCase Retention",
        UseModal: true,
        OutputMapping: {
          atg_store_streetAddressInput_billing: ["0"],
          atg_store_streetAddressOptionalInput_billing: ["1"],
          atg_store_localityInput_billing: ["2"],
          atg_store_stateSelect_billing: ["3"],
          atg_store_postalCodeInput_billing: ["4"],
          edqValidationStatus_billing: ["ValidationStatus"]
        }
      },
      {
        DataSet: "CAN",
        Layout: "CAN2 AptLine2 TitleCase NoRetention",
        UseModal: true,
        OutputMapping: {
          atg_store_streetAddressInput_billing: ["0"],
          atg_store_streetAddressOptionalInput_billing: ["1"],
          atg_store_localityInput_billing: ["2"],
          atg_store_stateSelect_billing: ["3"],
          atg_store_postalCodeInput_billing: ["4"],
          edqValidationStatus_billing: ["ValidationStatus"]
        }
      }
    ],
    Page: "/ro/",
    InputMapping: {
      DataSet: ["billing_countryNameSelect"],
      Street1: [
        "atg_store_streetAddressInput_billing",
        "atg_store_streetAddressOptionalInput_billing"
      ],
      City: ["atg_store_localityInput_billing"],
      State: ["atg_store_stateSelect_billing"],
      Postcode: ["atg_store_postalCodeInput_billing"],
      SubmitButton: ["edq-validation-button-billing"]
    }
  };
  addressSettings.push(address4);

  window.edqAddressClient = new EDQ.DataQuality.Address.Client();
  window.edqEmailClient = new EDQ.DataQuality.Email.Client();
  window.edqPhoneClient = new EDQ.DataQuality.Phone.Client();

  window.edqAddressClient.createConfigurationsFor(addressSettings);
  window.edqEmailClient.createConfigurationsFor(emailSettings);
  window.edqPhoneClient.createConfigurationsFor(phoneSettings);

  EDQ.DataQuality.Address.Configuration.SearchServiceUrl =
    protocol + "//" + host + "/EDQ.Realtime.Server/api/address/search";
  EDQ.DataQuality.Address.Configuration.RefineServiceUrl =
    protocol + "//" + host + "/EDQ.Realtime.Server/api/address/refine";
  EDQ.DataQuality.Address.Configuration.GetAddressServiceUrl =
    protocol + "//" + host + "/EDQ.Realtime.Server/api/address/getAddress";
  EDQ.DataQuality.Email.Configuration.EndpointUrl =
    protocol + "//" + host + "/EDQ.Realtime.Server/api/email/validate";
  EDQ.DataQuality.Phone.Configuration.EndpointUrl =
    protocol + "//" + host + "/EDQ.Realtime.Server/api/phone/validate";
  EDQ.DataQuality.Address.licensedDataSets = [];

  EDQ.DataQuality.Address.licensedDataSets.push("CAN");
  EDQ.DataQuality.Address.licensedDataSets.push("USA");
};

EDQ.JQuery = jQuery;

/*    (function () {
        EDQ.JQuery(window).bind("load", function () {
			configureAndInitializeEDQ();
		});
    })();*/
