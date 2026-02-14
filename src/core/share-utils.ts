import domtoimage from 'dom-to-image-more';
import { Share } from '@capacitor/share';

interface ShareImageOptions {
    title: string;
    text: string;
    fileName?: string;
    background?: string;
    width?: number;
    height?: number;
}

export async function shareReceiptImage(
    element: HTMLElement,
    options: ShareImageOptions
): Promise<void> {
    const rect = element.getBoundingClientRect();
    const width = options.width ?? Math.ceil(rect.width);
    const height = options.height ?? Math.ceil(rect.height);

    const dataUrl = await domtoimage.toPng(element, {
        quality: 1,
        bgcolor: options.background ?? '#ffffff',
        width,
        height,
        style: {
            transform: 'scale(1)',
            transformOrigin: 'top left',
        },
    });

    try {
        await Share.share({
            title: options.title,
            text: options.text,
            url: dataUrl,
            dialogTitle: 'Paylaş',
        });
    } catch {
        const link = document.createElement('a');
        link.download = options.fileName ?? 'zugurdun-cenesi-receipt.png';
        link.href = dataUrl;
        link.click();
    }
}
