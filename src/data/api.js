// API endpoint for company suggestions

const apiEndPointURL = 'https://example-api.jhp.app/company.php';

export async function fetchCompanySuggestions(query) {

    if (!query || query.trim().length === 0) return [];

    const url = `${apiEndPointURL}?search=${encodeURIComponent(query.trim())}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Company API responded with status ${response.status}`);
    }

    const json = await response.json();

    return Array.isArray(json.data) ? json.data : [];
}