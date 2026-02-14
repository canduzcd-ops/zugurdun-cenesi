import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TabBar } from '@/app/components';
import {
    HomeScreen,
    ResultsScreen,
    PricesScreen,
    SettingsScreen,
    AboutScreen,
} from '@/app/screens';

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/results" element={<ResultsScreen />} />
                <Route path="/prices" element={<PricesScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />
                <Route path="/about" element={<AboutScreen />} />
            </Routes>
            <TabBar />
        </BrowserRouter>
    );
}
