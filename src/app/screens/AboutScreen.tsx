import { Card } from '@/app/components';
import { getRichListMeta } from '@/data/rich20';

export function AboutScreen() {
    const richMeta = getRichListMeta();

    return (
        <div className="main-content safe-area-top px-4 py-6">
            <div className="max-w-lg mx-auto space-y-6">
                <h1 className="text-2xl font-bold uppercase font-mono tracking-wider">Hakkında</h1>

                {/* App Info */}
                <Card>
                    <div className="text-center py-4">
                        <h2 className="text-3xl font-bold text-primary mb-2 uppercase font-mono tracking-wide">Züğürdün Çenesi</h2>
                        <p className="text-gray-500 italic">"Parayı yaz, çeneyi çalıştır."</p>
                        <p className="text-sm text-gray-400 mt-4">Versiyon 1.0.0</p>
                    </div>
                </Card>

                {/* Description */}
                <Card title="Ne İşe Yarar?" icon="🤔">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Herhangi bir para miktarıyla neler alınabileceğini hesaplar. Kaç tane ev, kaç döner,
                        kaç litre benzin... Eğlenceli karşılaştırmalar ve mizahi yorumlarla sunulur.
                    </p>
                </Card>

                {/* Disclaimer */}
                <Card title="Sorumluluk Reddi" icon="⚠️">
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        Bu uygulama <strong>yalnızca eğlence amaçlıdır</strong>. Finansal tavsiye niteliği taşımaz.
                        Fiyatlar tahminidir ve güncel olmayabilir. Kullanıcı tarafından düzenlenebilir.
                    </p>
                </Card>

                {/* Rich List Source */}
                <Card title="Zengin Listesi Kaynağı" icon="💰">
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <p>
                            <strong>Kaynak:</strong> {richMeta.sourceName}
                        </p>
                        <p>
                            <strong>Tarih:</strong> {new Date(richMeta.asOfUtc).toLocaleDateString('tr-TR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                        <p className="text-xs text-gray-500">
                            Liste sabit bir anlık görüntüdür (snapshot). Gerçek değerler değişmiş olabilir.
                        </p>
                    </div>
                </Card>

                {/* Attributions */}
                <Card title="Atıflar" icon="📜">
                    <div className="space-y-4 text-sm">
                        <div>
                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Emoji Grafikleri</h4>
                            <p className="text-gray-500">
                                Twemoji - Twitter's emoji set<br />
                                Lisans: CC BY 4.0
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Tipografi</h4>
                            <p className="text-gray-500">
                                Inter Font Family<br />
                                Lisans: SIL Open Font License
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Privacy */}
                <Card title="Gizlilik" icon="🔒">
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>✓ Veri toplanmaz</li>
                        <li>✓ Hesap gerekmez</li>
                        <li>✓ Reklam yoktur</li>
                        <li>✓ İnternet bağlantısı gerekmez</li>
                        <li>✓ Tüm veriler cihazda kalır</li>
                    </ul>
                </Card>

                {/* Developer */}
                <Card title="Geliştirici" icon="👨‍💻">
                    <div className="text-center text-gray-600 dark:text-gray-400">
                        <p className="font-medium">RacaLabs</p>
                        <p className="text-xs text-gray-500 mt-2">© 2026 Tüm hakları saklıdır.</p>
                    </div>
                </Card>

                {/* Legal Links */}
                <div className="flex justify-center gap-4 text-sm text-gray-500">
                    <a href="/privacy" className="hover:text-primary">Gizlilik Politikası</a>
                    <span>•</span>
                    <a href="/terms" className="hover:text-primary">Kullanım Koşulları</a>
                </div>
            </div>
        </div>
    );
}
