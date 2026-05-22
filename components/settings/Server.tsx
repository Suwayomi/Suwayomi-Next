import { CategoryContent } from './category-content';
export default function ServerSettings({ settings }: { settings: any }) {
  return <CategoryContent category='Server' settings={settings} />;
}
