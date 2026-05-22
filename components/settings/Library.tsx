import { CategoryContent } from './category-content';
export default function LibrarySettings({ settings }: { settings: any }) {
  return <CategoryContent category='Library' settings={settings} />;
}
