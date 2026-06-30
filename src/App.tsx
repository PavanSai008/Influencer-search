import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchPage } from "@/pages/SearchPage";
import { ProfileDetailPage } from "@/pages/ProfileDetailPage";
import { TrendingPage } from "@/pages/TrendingPage";
import { AISuggestionsPage } from "@/pages/AISuggestionsPage";
import { ActiveCampaignsPage } from "@/pages/ActiveCampaignsPage";
import { AnalyticsPage } from "@/pages/AnalyticsPage";
import { SavedListPage } from "@/pages/SavedListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/ai-suggestions" element={<AISuggestionsPage />} />
        <Route path="/active-campaigns" element={<ActiveCampaignsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/saved-list" element={<SavedListPage />} />
        <Route path="/profile/:username" element={<ProfileDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
