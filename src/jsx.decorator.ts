import "reflect-metadata";
import { RENDER_METADATA } from "@nestjs/common/constants";
import { JsxLayout } from "./jsx.engine";

export interface RenderOptions {
  layout?: JsxLayout;
  bootstrapScripts?: string[];
}

export function JsxRender<T>(
  template: (data: T) => React.JSX.Element,
  options: {
    layout?: JsxLayout;
    bootstrapScripts?: string[];
  } = {},
): MethodDecorator {
  return (
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    Reflect.defineMetadata(
      RENDER_METADATA,
      [template, options],
      descriptor.value,
    );
    return descriptor;
  };
}
