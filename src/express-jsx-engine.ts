import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import beautify from "js-beautify";
import assign from "object-assign";
import _escaperegexp from "lodash.escaperegexp";
import * as register from "@babel/register";

const beautifyHTML = beautify.html;

export type JsxEngineOptionsType = {
  doctype?: string;
  beautify?: boolean;
  transformViews?: boolean;
  babel?: any;
};

const DEFAULT_OPTIONS = {
  doctype: "<!DOCTYPE html>",
  beautify: false,
  transformViews: true,
  babel: {
    presets: [
      "@babel/preset-react",
      [
        "@babel/preset-env",
        {
          targets: {
            node: "current",
          },
        },
      ],
    ],
    plugins: ["@babel/transform-flow-strip-types"],
  },
};

export const createEngine = (engineOptions: JsxEngineOptionsType = {}) => {
  var registered = false;
  var moduleDetectRegEx;

  engineOptions = assign({}, DEFAULT_OPTIONS, engineOptions || {});

  const renderFile = async (filename, options, cb) => {
    // Defer babel registration until the first request so we can grab the view path.
    if (!moduleDetectRegEx) {
      // Path could contain regexp characters so escape it first.
      // options.settings.views could be a single string or an array
      moduleDetectRegEx = new RegExp(
        []
          .concat(options.settings.views)
          .map((viewPath) => "^" + _escaperegexp(viewPath))
          .join("|"),
      );
    }

    if (engineOptions.transformViews && !registered) {
      // Passing a RegExp to Babel results in an issue on Windows so we'll just
      // pass the view path.
      register(
        assign(
          { only: [].concat(options.settings.views) },
          engineOptions.babel,
        ),
      );
      registered = true;
    }

    try {
      var markup = engineOptions.doctype;
      var component = await import(filename); //require();
      // Transpiled ES6 may export components as { default: Component }
      component = component.default || component;
      markup += renderToStaticMarkup(React.createElement(component, options));
    } catch (e) {
      return cb(e);
    } finally {
      if (options.settings.env === "development") {
        // Remove all files from the module cache that are in the view folder.
        Object.keys(require.cache).forEach(function (module) {
          if (moduleDetectRegEx.test(require.cache[module].filename)) {
            delete require.cache[module];
          }
        });
      }
    }

    if (engineOptions.beautify) {
      // NOTE: This will screw up some things where whitespace is important, and be
      // subtly different than prod.
      markup = beautifyHTML(markup);
    }

    cb(null, markup);
  };

  return renderFile;
};
