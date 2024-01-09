import { Route, Routes, Navigate } from 'react-router-dom';

import { SideMenus } from './pages/components/SideMenus';
import { FileUploads } from './pages/components/FileUploads';
import { Headers } from './pages/components/Headers';
import { Steppers } from './pages/components/Stepper';
import { Tags } from './pages/components/Tags';
import { Toggles } from './pages/components/Toggles';
import { QuickStart } from './pages/guides/QuickStart';
import { Breadcrumbs } from './pages/components/Breadcrumb';
import { Radios } from './pages/components/Radios';
import { Checkboxes } from './pages/components/Checkboxes';
import { Inputs } from './pages/components/Inputs';
import { TabsAndTab } from './pages/components/TabsAndTab';
import { Notices } from './pages/components/Notices';
import { Modals } from './pages/components/Modal';
import { Alerts } from './pages/components/Alerts';
import { Accordions } from './pages/components/Accordions';
import { Buttons } from './pages/components/Buttons';
import { Badges } from './pages/components/Badges';
import { Side } from './layout/SideMenu';
import { Layout } from './layout/Layout';

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/utilisation/demarrage-rapide" replace />} />
        <Route path="/utilisation" element={<Side />}>
          <Route path="demarrage-rapide" element={<QuickStart />} />
        </Route>
        <Route path="/composants" element={<Side />}>
          <Route path="ajout-de-fichier" element={<FileUploads />} />
          <Route path="badge" element={<Badges />} />
          <Route path="button" element={<Buttons />} />
          <Route path="en-tete" element={<Headers />} />
          <Route path="fil-d-ariane" element={<Breadcrumbs />} />
          <Route path="indicateur-d-etape" element={<Steppers />} />
          <Route path="accordion" element={<Accordions />} />
          <Route path="alert" element={<Alerts />} />
          <Route path="menu-lateral" element={<SideMenus />} />
          <Route path="modal" element={<Modals />} />
          <Route path="notice" element={<Notices />} />
          <Route path="tab" element={<TabsAndTab />} />
          <Route path="input" element={<Inputs />} />
          <Route path="checkbox" element={<Checkboxes />} />
          <Route path="radio" element={<Radios />} />
          <Route path="tag" element={<Tags />} />
          <Route path="interrupteur" element={<Toggles />} />
        </Route>
      </Route>
    </Routes>
  );
}