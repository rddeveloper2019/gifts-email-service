import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { NestExpressApplication } from "@nestjs/platform-express";
import { RenderOptions } from "./jsx.decorator";

export interface JsxLayoutProps {
  children: React.ReactNode;
}

export type JsxLayout = (props: JsxLayoutProps) => React.ReactElement;

export function withJsxEngine(
  app: NestExpressApplication,
  defaultLayout: JsxLayout,
) {
  // Override the render method to use the jsx engine
  // @ts-expect-error Monkey patch to make render method use jsx
  app.getHttpAdapter().render = function (
    response,
    view: [any, RenderOptions],
    options,
  ) {
    // Redirected, bad request or error, there is no need to render the view
    if (response.statusCode >= 300) {
      response.end();
      return;
    }

    const [component, controllerOpts] = view;
    const layout = controllerOpts.layout ?? defaultLayout;

    // Prepare options for the component
    const props = {
      ...response.locals,
      ...options,
    };

    let html;
    if (layout) {
      props.children = React.createElement(component, props);
      html = React.createElement(layout, props);
    } else {
      html = React.createElement(component, props);
    }

    const { pipe } = renderToPipeableStream(html, {
      bootstrapScripts: controllerOpts.bootstrapScripts ?? [
        "/js/script.js",
        "/js/toast-notifications.js",
      ],
      onShellReady() {
        response.setHeader("content-type", "text/html");
        pipe(response);
      },
      onError(error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
      },
    });
  };
}
