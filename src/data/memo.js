// Data management for memos.

/*
Data structure for a memo :
{
    id: string,              // Date.now().toString()
    applicationId: number,   // links to application.id
    content: string,         // the memo text
    createdAt: string,       // ISO 8601 timestamp
}

*/

const storageKey = 'memoData';

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

function writeAll(memos) {
    localStorage.setItem(storageKey, JSON.stringify(memos));
}

export function getMemos(applicationId) {

    const all = readAll();

    if (applicationId === undefined) { return all; }

    const numericId = Number(applicationId);
    return all.filter((memo) => Number(memo.applicationId) === numericId);

}

export function createMemo(fields) {
    const all = readAll();

    const newMemo = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        ...fields,
    };

    writeAll([...all, newMemo]);
    return newMemo;
}