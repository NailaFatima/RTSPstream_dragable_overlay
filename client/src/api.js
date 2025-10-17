const API_URL = 'https://rtspstream-dragable-overlay-backend.vercel.app';

export async function getOverlays() {
    const response = await fetch(`${API_URL}/api/overlays`);
    return response.json();
}