/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PARAMS: () => (/* binding */ PARAMS),
/* harmony export */   PORT: () => (/* binding */ PORT)
/* harmony export */ });
var PORT = 3000;
var PARAMS = ["users"];

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _src_constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/constants.js */ "./src/constants.js");
// server.js


 // Import the path module to work with file paths
 // Import the fs module to read files


var app = express__WEBPACK_IMPORTED_MODULE_0___default()();
var port = _src_constants_js__WEBPACK_IMPORTED_MODULE_5__.PORT;

// import.meta.url and path module: You can create a workaround to define __dirname in ES modules using import.meta.url and the path module
var __filename = (0,url__WEBPACK_IMPORTED_MODULE_4__.fileURLToPath)("file:///C:/Users/tamod/Downloads/project/jsonjet-fortnight/server.js");
var __dirname = path__WEBPACK_IMPORTED_MODULE_2___default().dirname(__filename);

// Enable CORS
app.use(cors__WEBPACK_IMPORTED_MODULE_1___default()());

// Endpoint for '/entry' route
app.get('/entry', function (request, response) {
  var fileName;
  var queryKey = Object.keys(request.query)[0];
  if (_src_constants_js__WEBPACK_IMPORTED_MODULE_5__.PARAMS.includes(queryKey)) {
    var queryValue = Object.values(request.query)[0];
    // Read the query parameter (e.g., ?hello or ?hi)
    fileName = request.query && queryKey ? "".concat(queryValue, ".json") : null;
  }

  // If no valid query parameter is provided, return an error
  if (!fileName) {
    return response.status(400).json({
      error: 'Invalid query parameter. Use proper param key'
    });
  }

  // Build the full path to the JSON file
  var filePath = path__WEBPACK_IMPORTED_MODULE_2___default().join(__dirname, "src/resources/".concat(queryKey), fileName);

  // Check if the file exists
  fs__WEBPACK_IMPORTED_MODULE_3___default().access(filePath, (fs__WEBPACK_IMPORTED_MODULE_3___default().constants).F_OK, function (err) {
    if (err) {
      return response.status(404).json({
        error: "File ".concat(fileName, " not found.")
      });
    }

    // Read the JSON file and send it as a response
    fs__WEBPACK_IMPORTED_MODULE_3___default().readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        return response.status(500).json({
          error: 'Error reading the file.'
        });
      }

      // Parse the JSON and send it as the response
      response.json(JSON.parse(data));
    });
  });
});

// Start the server
app.listen(port, function () {
  console.log("Server running at /entry");
});
})();

/******/ })()
;
//# sourceMappingURL=server.bundle.mjs.map