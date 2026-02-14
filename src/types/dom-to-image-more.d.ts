// Type declarations for packages without types

declare module 'dom-to-image-more' {
    interface Options {
        filter?: (node: Node) => boolean;
        bgcolor?: string;
        width?: number;
        height?: number;
        style?: Partial<CSSStyleDeclaration>;
        quality?: number;
        cacheBust?: boolean;
        imagePlaceholder?: string;
    }

    export function toPng(node: Node, options?: Options): Promise<string>;
    export function toJpeg(node: Node, options?: Options): Promise<string>;
    export function toBlob(node: Node, options?: Options): Promise<Blob>;
    export function toSvg(node: Node, options?: Options): Promise<string>;
    export function toCanvas(node: Node, options?: Options): Promise<HTMLCanvasElement>;
    export function toPixelData(node: Node, options?: Options): Promise<Uint8ClampedArray>;

    const domtoimage: {
        toPng: typeof toPng;
        toJpeg: typeof toJpeg;
        toBlob: typeof toBlob;
        toSvg: typeof toSvg;
        toCanvas: typeof toCanvas;
        toPixelData: typeof toPixelData;
    };

    export default domtoimage;
}
