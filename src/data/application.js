// Data management for job applications.

/*
Data structure for an application:
{
    id: number,              // auto-increment
    company: string,
    job_title: string,
    date: string,            // "YYYY-MM-DD"
    status: string,          // "applied" | "interviewing" | "offer" | "rejected"
    job_posting: string,     // URL, can be empty string
    contact_info: string,    // can be empty string
}


*/

const storageKey = 'applicationData';




function readAll() {
    const raw = localStorage.getItem(storageKey);

    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw);

        return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
        return [];
    }
}

function writeAll(applications) {
    localStorage.setItem(storageKey, JSON.stringify(applications));
}

export function getApplications() {
    return readAll();
}

export function getApplication(id) {
    const numericId = Number(id);
    const found = readAll().find((app) => app.id === numericId);

    if (!found) throw new Response('Application not found', { status: 404 });

    return found;
}

export function createApplication(fields) {
    const all = readAll();


    const nextId = all.length > 0 ? Math.max(...all.map((a) => a.id)) + 1 : 1;
    const newApp = { id: nextId, ...fields };

    writeAll([...all, newApp]);
    return newApp;
}

export function updateApplication(id, fields) {
    const numericId = Number(id);
    const all = readAll();
    const index = all.findIndex((app) => app.id === numericId);

    if (index === -1) throw new Response('Application not found', { status: 404 });


    const updated = { ...all[index], ...fields };// Ensure the ID is not changed.
    const next = [...all]; 


    next[index] = updated;
    writeAll(next);
    return updated;
}

export function deleteApplication(id) {
    const numericId = Number(id);
    const all = readAll();

    const next = all.filter((app) => app.id !== numericId);


    writeAll(next);
}