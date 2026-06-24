import { useNavigation } from 'react-router-dom';

export default function NavigationLoadingBar() {
  const navigation = useNavigation();
  const isActive = navigation.state !== 'idle';

  if (!isActive) return null;

  return <div className="navigation-loading-bar" aria-label="Loading" />;
}