const API_URL = process.env.REACT_APP_API_URL || 'https://rtspstream-dragable-overlay-backend.vercel.app/api';

export async function getOverlays() {
    const response = await fetch(`${API_URL}/overlays`);
    return response.json();
}