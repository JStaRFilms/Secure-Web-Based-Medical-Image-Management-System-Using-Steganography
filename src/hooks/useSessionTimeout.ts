import { useEffect, useCallback, useRef } from 'react';

const EVENTS = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

export function useSessionTimeout() {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const lastActivityRef = useRef<number>(0);

    const logout = useCallback(() => {
        // Clear local data effectively logging out in this client-side only context
        localStorage.clear(); // Or specific keys if we want to be less destructive
        sessionStorage.clear();

        // We might want to keep some settings like theme? 
        // For now, let's keep it simple as per "Clear Data"

        // Redirect to home/login
        // Since we don't have a dedicated login page yet (it's protected by middleware or similar), 
        // asking for reload might be best or moving to a lock screen. 
        // Given the instructions, let's just alert and reload/redirect.

        if (confirm("Session timed out due to inactivity. Click OK to reload.")) {
            window.location.reload();
        } else {
            window.location.reload();
        }
    }, []);

    const checkTimeout = useCallback(() => {
        const storedTimeout = localStorage.getItem('settings_autoLogout');
        if (!storedTimeout || storedTimeout === '0') return; // Disabled

        const timeoutMinutes = parseInt(storedTimeout, 10);
        if (isNaN(timeoutMinutes) || timeoutMinutes <= 0) return;

        const now = Date.now();
        const msPassed = now - lastActivityRef.current;
        const msTimeout = timeoutMinutes * 60 * 1000;

        if (msPassed > msTimeout) {
            logout();
        }
    }, [logout]);

    const updateActivity = useCallback(() => {
        lastActivityRef.current = Date.now();
    }, []);

    useEffect(() => {
        lastActivityRef.current = Date.now();

        // Initial check
        const intervalId = setInterval(checkTimeout, 10000); // Check every 10 seconds
        timerRef.current = intervalId;

        // Event listeners
        EVENTS.forEach(event => {
            window.addEventListener(event, updateActivity);
        });

        // Cleanup
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            EVENTS.forEach(event => {
                window.removeEventListener(event, updateActivity);
            });
        };
    }, [checkTimeout, updateActivity]);
}
