import { Routes, Route } from 'react-router-dom';
import { CreateGroup } from '@/pages/CreateGroup';
import { GroupScreen } from '@/pages/GroupScreen';
import { NotFound } from '@/pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CreateGroup />} />
      <Route path="/grupos/:groupId" element={<GroupScreen />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}