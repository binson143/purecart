/*
    Author: Binson,
    Desc: Nothing more than an attempt to build a tiny template engine.. 
    Version: 0.0.1-beta
*/
(function(fn) {
  "use strict";
  var dtlEngine = function(strFrag, data) {
    
    var formatter = !/[^\w\-.:]/.test(strFrag)  ? (dtlEngine.cache[strFrag] = dtlEngine.cache[strFrag] || dtlEngine(dtlEngine.load(strFrag)))  : new Function(
          dtlEngine.templateData + ",dtlEngine",
          "var _e=dtlEngine.encode" +
            dtlEngine.helper +
            ",_s='" +
            strFrag.replace(dtlEngine.syntaxRegExp, dtlEngine.parser) +
            "';return _s;"
        );
    return data ? formatter(data, dtlEngine)  : function(data) {    return formatter(data, dtlEngine); }();
  };
  dtlEngine.cache = {};
  dtlEngine.load = function(id) {
    return document.getElementById(id).innerHTML;
  };
  /*
     Supported  template syntax are  {%=expression%}.
  */
  dtlEngine.syntaxRegExp = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g;
  dtlEngine.parser = function(
    strTpl,
    specChar,
    interpolator,
    unescaped,
    evaluatorStart,
    evaluatorEnd
  ) {
    if (specChar) {
      return (
        {
          "\n": "\\n",
          "\r": "\\r",
          "\t": "\\t",
          " ": " "
        }[specChar] || "\\" + specChar
      );
    }
    if (interpolator) {
      // interpolation: =  or unescaped: #
      if (interpolator === "=") {
        return "'+_e(" + unescaped + ")+'";
      }
      return "'+(" + unescaped + "==null?'':" + unescaped + ")+'";
    }
    if (evaluatorStart) {
      return "';";
    }
    if (evaluatorEnd) {
      return "_s+='";
    }
  };
  dtlEngine.encodeReg = /[<>&"'\x00]/g;
  dtlEngine.encodeSymbols = {
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    '"': "&quot;",
    "'": "&#39;"
  };
  dtlEngine.encode = function(template) {
    return (template == null ? "" : "" + template).replace(
      dtlEngine.encodeReg,
      function(c) {
        return dtlEngine.encodeSymbols[c] || "";
      }
    );
  };
  dtlEngine.templateData = "d";
  dtlEngine.helper =
    ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);}" +
    ",include=function(s,d){_s+=dtlEngine(s,d);}";
  if (typeof define === "function" && define.amd) {
    define(function() {
      return dtlEngine;
    });
  } else if (typeof module === "object" && module.exports) {
    module.exports = dtlEngine;
  } else {
    fn.dtlEngine = dtlEngine;
  }
})(this);
