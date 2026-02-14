import { NavLink } from 'react-router-dom';

interface TabItem {
    path: string;
    label: string;
    icon: string;
}

const TABS: TabItem[] = [
    { path: '/', label: 'Ana Sayfa', icon: '🏠' },
    { path: '/prices', label: 'Fiyatlar', icon: '📊' },
    { path: '/settings', label: 'Ayarlar', icon: '⚙️' },
    { path: '/about', label: 'Hakkında', icon: 'ℹ️' },
];

export function TabBar() {
    return (
        <nav className="tab-bar">
            <div className="flex justify-around items-center h-16">
                {TABS.map((tab) => (
                    <NavLink
                        key={tab.path}
                        to={tab.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${isActive
                                ? 'text-primary'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`
                        }
                    >
                        <span className="text-xl">{tab.icon}</span>
                        <span className="text-xs font-medium">{tab.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
