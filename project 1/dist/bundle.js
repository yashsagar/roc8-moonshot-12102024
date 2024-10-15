/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils/index.js\");\n/* harmony import */ var _generateEmailList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generateEmailList */ \"./src/generateEmailList.js\");\n/* harmony import */ var _generateEmailReadArea__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generateEmailReadArea */ \"./src/generateEmailReadArea.js\");\n\n\n\nconst app = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({\n  tag: \"main\",\n  attribute: {\n    style: \"padding:2rem; background: var(--bgDefault); min-height:100vh;  color:var(--text)\"\n  }\n});\n\n// variable block (like state in react)\nconst {\n  store,\n  activeMail,\n  isFiltered,\n  paginationPage\n} = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.manageSessionStore)();\nlet emailLists;\nlet filteredEmailList;\nactiveMail(0); // setting active mail to 0\n\npaginationPage(1); // setting the default page for data fetch at the time first load\nconst totalpage = 2; // since there is only two page i aam setting hard code value if there is more data we have to update based on logic\n\nlet fetching = false; // To prevent multiple fetches at once\n\nfunction handelFilter(block) {\n  isFiltered() === block ? isFiltered(\"undefined\") : isFiltered(block);\n  render();\n}\n\n// data fetching block\n\nfunction fetchData(url = `https://flipkart-email-mock.now.sh/?page=1`) {\n  fetching = true; // Set fetching state to true to avoid multiple fetch call\n  fetch(url).then(res => res.json()).then(data => {\n    !emailLists ? emailLists = data : emailLists.list = [...emailLists.list, ...data.list];\n    fetching = false; // Reset fetching state after data is added\n    render();\n  }).catch(error => {\n    console.error(\"Error fetching email data:\", error);\n    fetching = false; // Reset fetching state on error\n  });\n}\nemailLists || fetchData(); // initial fetch call\n\n// scroll pagination implimantation\n\nwindow.addEventListener(\"scroll\", () => {\n  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {\n    const currentPage = parseInt(paginationPage());\n    if (!fetching && currentPage < totalpage) {\n      paginationPage(currentPage + 1);\n      const url = `https://flipkart-email-mock.now.sh/?page=${currentPage + 1}`;\n      fetchData(url);\n      console.log(\"fetch data triggred\");\n    }\n  }\n});\n\n// end of data fetching block\n\nfunction render() {\n  const filteredBY = isFiltered();\n\n  // filtering the data if isfilter is not undefind\n  if (filteredBY != \"undefined\" && filteredBY && emailLists) {\n    // reading the session store and making filterList\n    const storeData = store();\n    const list = Object.keys(storeData);\n    const filterList = [];\n    switch (filteredBY) {\n      case \"unread\":\n        {\n          list.forEach(mailId => {\n            !storeData[mailId].isRead && filterList.push(mailId);\n          });\n          break;\n        }\n      case \"read\":\n        {\n          list.forEach(mailId => {\n            storeData[mailId].isRead && filterList.push(mailId);\n          });\n          break;\n        }\n      case \"favorite\":\n        {\n          list.forEach(mailId => {\n            storeData[mailId].isFavorite && filterList.push(mailId);\n          });\n          break;\n        }\n    }\n\n    // filtering the data and updatining the filteredEmailList\n\n    filteredEmailList = {\n      list: []\n    };\n    emailLists.list.forEach(mail => {\n      filterList.includes(mail.id) && filteredEmailList.list.push(mail);\n    });\n  } else {\n    filteredEmailList = emailLists;\n  }\n  // end of filtering logic\n\n  // creating HTML element\n  const wrapper = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({\n    tag: \"div\",\n    attribute: {\n      style: \"max-width:1600px; width:94%; margin-inline:auto;\"\n    }\n  });\n  //filter element block\n  const filter = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({\n    tag: \"div\",\n    attribute: {\n      style: \"display: flex; gap:1rem; padding-bottom:1rem; align-items: center; \"\n    },\n    children: [{\n      tag: \"span\",\n      children: \"Filter By:\"\n    }]\n  });\n  const unread = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({\n    tag: \"div\",\n    attribute: {\n      style: `${filteredBY === \"unread\" && \"background:var(--bgFilterBtn)\"}; padding-inline:0.9rem; padding-block:0.3rem; border-radius:20px; cursor:pointer;`\n    },\n    children: \"Unread\"\n  });\n  unread.onclick = () => {\n    handelFilter(\"unread\");\n  };\n  const read = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({\n    tag: \"div\",\n    attribute: {\n      style: `${filteredBY === \"read\" && \"background:var(--bgFilterBtn)\"}; padding-inline:0.9rem; padding-block:0.3rem; border-radius:20px;cursor:pointer;`\n    },\n    children: \"Read\"\n  });\n  read.onclick = () => {\n    handelFilter(\"read\");\n  };\n  const favorites = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({\n    tag: \"div\",\n    attribute: {\n      style: `${filteredBY === \"favorite\" && \"background:var(--bgFilterBtn)\"}; padding-inline:0.9rem; padding-block:0.3rem; border-radius:20px;cursor:pointer;`\n    },\n    children: \"Favorites\"\n  });\n  favorites.onclick = () => {\n    handelFilter(\"favorite\");\n  };\n  filter.append(unread, read, favorites);\n  wrapper.append(filter);\n  const section = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({\n    tag: \"section\",\n    attribute: {\n      class: \"wrapper\",\n      id: \"wrapper\"\n    }\n  });\n  section.append((0,_generateEmailList__WEBPACK_IMPORTED_MODULE_1__.generateEmailList)(filteredEmailList, render));\n  section.append((0,_generateEmailReadArea__WEBPACK_IMPORTED_MODULE_2__.generateEmailReadArea)());\n  wrapper.append(section);\n  app.replaceChildren(wrapper);\n}\nrender();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\n\n//# sourceURL=webpack://project-1/./src/app.js?");

/***/ }),

/***/ "./src/generateEmailList.js":
/*!**********************************!*\
  !*** ./src/generateEmailList.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateEmailList: () => (/* binding */ generateEmailList)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils/index.js\");\n\nconst generateEmailList = (emailData, render) => {\n  const emailLists = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({\n    tag: \"aside\"\n  });\n  const {\n    store,\n    activeMail\n  } = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.manageSessionStore)();\n  console.log(emailData);\n  emailData && emailData.list?.map(mail => {\n    const mailCurrentState = store({\n      mailId: mail.id\n    });\n\n    // putting initial value to session\n    mailCurrentState || store({\n      mailId: mail.id,\n      value: \"default\"\n    });\n    const emailElement = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({\n      tag: \"div\",\n      attribute: {\n        style: ` margin-bottom:1rem; padding-inline:1rem; padding-block:0.3rem; display:flex; border-radius:5px; padding-block:0.5rem; ${mailCurrentState === undefined ? \"background-color:#fff\" : mailCurrentState.isRead ? \"background-color:var(--bgRead)\" : \"background-color:#fff\"}; border:1px solid var(--border);`,\n        class: activeMail() === mail.id ? \"active\" : \"\"\n      },\n      children: [{\n        tag: \"div\",\n        attribute: {\n          style: \"flex-grow: 0;flex-shrink: 0; width:60px; padding-right:1rem;\"\n        },\n        children: [{\n          tag: \"div\",\n          attribute: {\n            style: \"display:flex; justify-content: center; align-items: center; margin-inline:auto;  width:85%; aspect-ratio: 1/1;background-color:var(--accent); border-radius:100%; text-size:2rem; font-weight:semi-bold; color:#fff \"\n          },\n          children: mail.from?.name[0].toUpperCase()\n        }]\n      }, {\n        tag: \"div\",\n        attribute: {\n          style: \"width: 100%; \"\n        },\n        children: [{\n          tag: \"p\",\n          attribute: {\n            style: \" width: calc(100% - 60px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; word-break: break-word;\"\n          },\n          children: [{\n            tag: \"span\",\n            children: \"From: \"\n          }, {\n            tag: \"span\",\n            children: mail.from.name,\n            attribute: {\n              style: \"color:var(--textBlack); font-weight:600; text-transform: capitalize;\"\n            }\n          }, {\n            tag: \"span\",\n            attribute: {\n              style: \"color:var(--textBlack); font-weight:600; \"\n            },\n            children: ` <${mail.from.email}>`\n          }]\n        }, {\n          tag: \"p\",\n          attribute: {\n            style: \" width: calc(100% - 60px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; word-break: break-word; margin-top:0.3rem;\"\n          },\n          children: [{\n            tag: \"span\",\n            children: `Subject: `\n          }, {\n            tag: \"span\",\n            attribute: {\n              style: \"color:var(--textBlack); font-weight:600; text-transform: capitalize;\"\n            },\n            children: `${mail.subject}`\n          }]\n        }, {\n          tag: \"p\",\n          attribute: {\n            style: \" width: calc(100% - 60px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; word-break: break-word;margin-top:0.5rem;\"\n          },\n          children: `${mail.short_description}`\n        }, {\n          tag: \"p\",\n          attribute: {\n            style: \" width: calc(100% - 60px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; word-break: break-word;margin-top:0.3rem; font-size:0.9rem;\"\n          },\n          children: [{\n            tag: \"span\",\n            children: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.formatDateTime)(mail.date)\n          }, {\n            tag: \"span\",\n            attribute: {\n              id: `favorite-${mail.id}`,\n              style: `padding-left:1.5rem; color:var(--accent); font-weight:500; ${mailCurrentState === undefined ? \"display:none; \" : mailCurrentState.isFavorite ? \"display:initial; \" : \"display:none; \"}`\n            },\n            children: \"Favorite\"\n          }]\n        }]\n      }]\n    });\n    const handelClick = () => {\n      store({\n        mailId: mail.id,\n        value: {\n          isRead: true\n        }\n      });\n      activeMail(mail.id);\n      render();\n      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.handelEmailReadArea)(mail);\n    };\n    emailElement.onclick = handelClick;\n    emailLists.append(emailElement);\n  });\n  return emailLists;\n};\n\n//# sourceURL=webpack://project-1/./src/generateEmailList.js?");

/***/ }),

/***/ "./src/generateEmailReadArea.js":
/*!**************************************!*\
  !*** ./src/generateEmailReadArea.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateEmailReadArea: () => (/* binding */ generateEmailReadArea)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils/index.js\");\n\nconst generateEmailReadArea = () => {\n  return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({\n    tag: \"section\",\n    attribute: {\n      class: \"hidden\",\n      id: \"read-area\",\n      style: \"border:1px solid var(--border); height: fit-content; padding:1rem; border-radius:5px; display:flex; gap:1rem;\"\n    }\n  });\n};\n\n//# sourceURL=webpack://project-1/./src/generateEmailReadArea.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.js */ \"./src/app.js\");\n\n\ndocument.getElementById(\"root\").replaceChildren(_app_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n//# sourceURL=webpack://project-1/./src/index.js?");

/***/ }),

/***/ "./src/utils/createElement.js":
/*!************************************!*\
  !*** ./src/utils/createElement.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createElement: () => (/* binding */ createElement)\n/* harmony export */ });\nfunction createElement({\n  tag = \"div\",\n  attribute = {},\n  children = \"\"\n}) {\n  const element = document.createElement(tag);\n  const attributeKey = Object.keys(attribute);\n  if (attributeKey.length) {\n    attributeKey.map(key => {\n      element.setAttribute(key, attribute[key]);\n    });\n  }\n  if (typeof children === \"object\") {\n    children.map(child => {\n      element.append(createElement(child));\n    });\n  } else {\n    element.innerText = children;\n  }\n  return element;\n}\n\n//# sourceURL=webpack://project-1/./src/utils/createElement.js?");

/***/ }),

/***/ "./src/utils/formatDateTime.js":
/*!*************************************!*\
  !*** ./src/utils/formatDateTime.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatDateTime: () => (/* binding */ formatDateTime)\n/* harmony export */ });\nconst formatDateTime = timestamp => {\n  const dateTime = new Date(timestamp);\n  const options = {\n    day: \"2-digit\",\n    month: \"2-digit\",\n    year: \"numeric\",\n    hour: \"2-digit\",\n    minute: \"2-digit\",\n    hour12: true\n  };\n  return dateTime.toLocaleString(\"en-IN\", options);\n};\n\n//# sourceURL=webpack://project-1/./src/utils/formatDateTime.js?");

/***/ }),

/***/ "./src/utils/handelEmailReadArea.js":
/*!******************************************!*\
  !*** ./src/utils/handelEmailReadArea.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handelEmailReadArea: () => (/* binding */ handelEmailReadArea)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils/index.js\");\n\nconst memo = {};\nconst handelEmailReadArea = async mail => {\n  const {\n    store\n  } = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.manageSessionStore)();\n  let mailData;\n  if (memo[mail.id]) {\n    mailData = memo[mail.id];\n  } else {\n    const res = await fetch(`https://flipkart-email-mock.vercel.app/?id=${mail.id}`);\n    const data = await res.json();\n    mailData = data;\n    // adding mail data to memo object it will reduce the fetch call if client read same mail twice\n    memo[mail.id] = data;\n  }\n  const wrapperEl = document.getElementById(\"wrapper\");\n  const readAreaEl = document.getElementById(\"read-area\");\n  const UpdatedEmailReadArea = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({\n    tag: \"section\",\n    attribute: {\n      id: \"read-area\",\n      class: \"read-area\",\n      style: \"border:1px solid var(--border); height: fit-content; padding:2rem ; border-radius:5px; display:flex; gap:1rem; background-color:#fff; min-width: 200px; position: sticky; top: 2rem; max-height: 90vh; overflow-y: scroll;\"\n    }\n  });\n  const avatar = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({\n    tag: \"div\",\n    attribute: {\n      style: \"display:flex; justify-content: center; align-items: center; align-self: flex-start; margin-inline:auto;  width:40px; aspect-ratio: 1/1;background-color:var(--accent); border-radius:100%; text-size:2rem; font-weight:semi-bold; color:#fff; flex-shrink: 0; flex-grow: 0; \"\n    },\n    children: mail.from?.name[0].toUpperCase()\n  });\n  const textWrapper = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({\n    tag: \"div\"\n  });\n  const topPartText = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({\n    tag: \"div\",\n    attribute: {\n      style: \"position: relative;\"\n    },\n    children: [{\n      tag: \"p\",\n      children: mail.subject,\n      attribute: {\n        style: \"font-size:1.6rem; font-weight:500; padding-bottom:0.8rem\"\n      }\n    }, {\n      tag: \"p\",\n      children: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.formatDateTime)(mail.date),\n      attribute: {\n        style: \"font-size:0.8rem;  padding-bottom:0.8rem\"\n      }\n    }]\n  });\n  const favorite = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createElement)({\n    tag: \"p\",\n    children: \"Mark as favorite\",\n    attribute: {\n      style: \"position: absolute; background-color: var(--accent); color:#fff; top:0.3rem; right:1rem; padding-block:0.4rem; padding-inline:1.2rem; border-radius:20px; font-size:0.8rem;  cursor: pointer;\"\n    }\n  });\n  favorite.onclick = () => {\n    const {\n      isFavorite: prevState\n    } = store({\n      mailId: mail.id\n    });\n    store({\n      mailId: mail.id,\n      value: {\n        isFavorite: !prevState\n      }\n    });\n    const favorite = document.getElementById(`favorite-${mail.id}`);\n    !prevState ? favorite.style.display = \"initial\" : favorite.style.display = \"none\";\n  };\n  topPartText.append(favorite);\n  const range = document.createRange();\n  const textFragment = range.createContextualFragment(mailData.body);\n  Object.assign(textFragment.firstChild.style, {\n    display: \"flex\",\n    \"flex-direction\": \"column\",\n    gap: \"1.5rem\",\n    \"padding-bottom\": \"2rem\"\n  });\n  textWrapper.append(topPartText, textFragment);\n  UpdatedEmailReadArea.append(avatar, textWrapper);\n  wrapperEl.replaceChild(UpdatedEmailReadArea, readAreaEl);\n};\n\n//# sourceURL=webpack://project-1/./src/utils/handelEmailReadArea.js?");

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createElement: () => (/* reexport safe */ _createElement_js__WEBPACK_IMPORTED_MODULE_0__.createElement),\n/* harmony export */   formatDateTime: () => (/* reexport safe */ _formatDateTime_js__WEBPACK_IMPORTED_MODULE_1__.formatDateTime),\n/* harmony export */   handelEmailReadArea: () => (/* reexport safe */ _handelEmailReadArea_js__WEBPACK_IMPORTED_MODULE_2__.handelEmailReadArea),\n/* harmony export */   manageSessionStore: () => (/* reexport safe */ _manageSessionStore_js__WEBPACK_IMPORTED_MODULE_3__.manageSessionStore)\n/* harmony export */ });\n/* harmony import */ var _createElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement.js */ \"./src/utils/createElement.js\");\n/* harmony import */ var _formatDateTime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formatDateTime.js */ \"./src/utils/formatDateTime.js\");\n/* harmony import */ var _handelEmailReadArea_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handelEmailReadArea.js */ \"./src/utils/handelEmailReadArea.js\");\n/* harmony import */ var _manageSessionStore_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./manageSessionStore.js */ \"./src/utils/manageSessionStore.js\");\n\n\n\n\n\n//# sourceURL=webpack://project-1/./src/utils/index.js?");

/***/ }),

/***/ "./src/utils/manageSessionStore.js":
/*!*****************************************!*\
  !*** ./src/utils/manageSessionStore.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   manageSessionStore: () => (/* binding */ manageSessionStore)\n/* harmony export */ });\nconst manageSessionStore = () => {\n  let storeData = JSON.parse(sessionStorage.getItem(\"store\")) || {};\n  const paginationPage = page => {\n    if (page) {\n      sessionStorage.setItem(\"paginationPage\", page);\n      return sessionStorage.getItem(\"paginationPage\");\n    } else {\n      return sessionStorage.getItem(\"paginationPage\");\n    }\n  };\n  const isFiltered = filteredBY => {\n    if (filteredBY) {\n      sessionStorage.setItem(\"isFiltered\", filteredBY);\n      return sessionStorage.getItem(\"isFiltered\");\n    } else {\n      return sessionStorage.getItem(\"isFiltered\");\n    }\n  };\n  const activeMail = activeItem => {\n    if (!activeItem) {\n      return sessionStorage.getItem(\"activeMail\");\n    } else {\n      sessionStorage.setItem(\"activeMail\", activeItem);\n      return sessionStorage.getItem(\"activeMail\");\n    }\n  };\n  const store = ({\n    mailId,\n    value\n  } = {}) => {\n    const prevState = JSON.parse(sessionStorage.getItem(\"store\")) || {};\n    if (mailId && value === \"default\") {\n      const newState = {\n        ...prevState,\n        [mailId]: {\n          isRead: false,\n          isFavorite: false,\n          isActive: false\n        }\n      };\n      sessionStorage.setItem(\"store\", JSON.stringify(newState));\n      return;\n    } else if (value) {\n      prevState[mailId] = {\n        ...prevState[mailId],\n        ...value\n      };\n      sessionStorage.setItem(\"store\", JSON.stringify(prevState));\n      return;\n    } else if (mailId) {\n      return prevState[mailId];\n    } else {\n      return prevState;\n    }\n  };\n  return {\n    store,\n    isFiltered,\n    activeMail,\n    paginationPage\n  };\n};\n\n//# sourceURL=webpack://project-1/./src/utils/manageSessionStore.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://project-1/./src/style.css?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;