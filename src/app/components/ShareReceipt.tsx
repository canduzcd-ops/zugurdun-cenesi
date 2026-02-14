import type { ForwardedRef } from 'react';
import { forwardRef, useMemo } from 'react';
import type { CalcResult, HumorLevel } from '@/core/types';
import { formatCurrency, formatCurrencyShort } from '@/core/format';

interface ShareReceiptProps {
    result: CalcResult;
    humorLevel?: HumorLevel;
}

export const ShareReceipt = forwardRef(function ShareReceipt(
    { result }: ShareReceiptProps,
    ref: ForwardedRef<HTMLDivElement>
) {
    const dateText = useMemo(() => {
        return new Intl.DateTimeFormat('tr-TR', {
            dateStyle: 'short',
            timeStyle: 'short',
        }).format(new Date());
    }, []);

    // Show first 10 items, summarize the rest
    const maxItems = 10;
    const lineItems = result.items.slice(0, maxItems);
    const remainingCount = Math.max(0, result.items.length - maxItems);

    const taxAmount = Math.max(0, result.amountTL - result.amountAfter);
    const punchline = result.punchlines[0]?.text ?? 'Bugun de boyle.';

    // Generate barcode number from timestamp
    const barcodeNumber = useMemo(() => {
        const now = new Date();
        return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
    }, []);

    // Dynamic stamp text based on amount
    const stampText = useMemo(() => {
        if (result.amountTL >= 100_000_000) return 'HAYALLER PARIS';
        if (result.amountTL >= 1_000_000) return 'EKONOMIK KRIZ';
        return 'GARIBAN ONAYLI';
    }, [result.amountTL]);

    return (
        <div ref={ref} className="share-receipt-canvas">
            <div className="receipt-zigzag receipt-zigzag-top" />
            <div className="share-receipt">
                {/* Stamp overlay */}
                <div className="receipt-stamp">
                    {stampText}
                </div>

                {/* Header */}
                <div className="text-center border-b border-neutral-300 pb-3 mb-3">
                    <div className="text-sm tracking-[0.3em] font-bold">ZUGURDUN CENESI A.S.</div>
                    <div className="text-[9px] text-neutral-500 mt-1">Parayi yaz, ceneyi calistir.</div>
                    <div className="text-[8px] text-neutral-400 mt-1">Mersis No: 0000-1453-1923-2026</div>
                    <div className="text-[8px] text-neutral-400">VKN: 7070707070</div>
                </div>

                {/* Date and time */}
                <div className="flex items-center justify-between text-[9px] text-neutral-600 mb-2">
                    <span>Tarih/Saat</span>
                    <span className="font-mono">{dateText}</span>
                </div>

                <div className="border-t border-dashed border-neutral-300 my-2" />

                {/* Items */}
                <div className="space-y-2 text-[10px] font-mono">
                    {lineItems.map((item) => {
                        const lineTotal = item.qty * item.item.priceTL;
                        return (
                            <div key={item.item.id} className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                    <div className="font-semibold">{item.qtyDisplay} x {item.item.name}</div>
                                    <div className="text-[9px] text-neutral-500">@ {formatCurrencyShort(item.item.priceTL)}</div>
                                </div>
                                <div className="text-right font-bold">{formatCurrencyShort(lineTotal)}</div>
                            </div>
                        );
                    })}

                    {/* Remaining items summary */}
                    {remainingCount > 0 && (
                        <div className="flex items-center justify-between text-neutral-500 italic">
                            <span>...ve {remainingCount} kalem daha</span>
                            <span>---</span>
                        </div>
                    )}
                </div>

                <div className="border-t border-dashed border-neutral-300 my-3" />

                {/* Tax and fees */}
                <div className="space-y-1 text-[10px] font-mono">
                    <div className="flex items-center justify-between text-neutral-600">
                        <span>Ara Toplam</span>
                        <span>{formatCurrency(result.amountTL)}</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600">
                        <span>KDV (%0 Hayaller)</span>
                        <span>0.00 TL</span>
                    </div>
                    {taxAmount > 0 && (
                        <div className="flex items-center justify-between text-red-600">
                            <span>Akraba Vergisi</span>
                            <span>-{formatCurrencyShort(taxAmount)}</span>
                        </div>
                    )}
                </div>

                <div className="border-t-2 border-double border-neutral-900 my-3" />

                {/* Grand total */}
                <div className="bg-neutral-900 text-white px-3 py-3 text-center font-mono">
                    <div className="text-[9px] tracking-wider mb-1">GENEL TOPLAM</div>
                    <div className="text-[16px] font-bold tracking-tight">{formatCurrency(result.amountAfter)}</div>
                </div>

                <div className="border-t border-dashed border-neutral-300 my-3" />

                {/* Punchline */}
                <div className="bg-neutral-50 border border-neutral-200 rounded px-3 py-2 text-[10px] text-center">
                    <div className="font-bold text-neutral-700 mb-1">*** GUNUN ESPRISI ***</div>
                    <div className="text-neutral-600 italic">&quot;{punchline}&quot;</div>
                </div>

                {/* Footer */}
                <div className="mt-4 text-center text-[8px] text-neutral-500">
                    <div>Tesekkur ederiz, yine bekleriz!</div>
                    <div className="mt-1">App Store / Play Store: "Zugurdun Cenesi"</div>
                </div>

                {/* Barcode */}
                <div className="mt-4 flex flex-col items-center">
                    <div className="receipt-barcode" />
                    <div className="text-[8px] font-mono text-neutral-700 mt-1 tracking-widest">{barcodeNumber}</div>
                </div>
            </div>
            <div className="receipt-zigzag receipt-zigzag-bottom" />
        </div>
    );
});
