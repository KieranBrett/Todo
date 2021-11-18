import { getAuth } from 'firebase/auth';
import NavSection from '../../components/NavSection';
import sidebarConfig, { loginConfig } from './SidebarConfig';

export default function GuestNavigate() {
    const auth = getAuth();

    return auth.currentUser ? null : <NavSection navConfig={loginConfig} />
}