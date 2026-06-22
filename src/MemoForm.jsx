import {useRef, useEffect, useState} from 'react';

export default function MemoForm({ onCancel, editMode, existingData }) {

    const applicationRef = useRef(null);
    const companyRef = useRef(null);
    const [applications, setApplications] = useState([]);
    const [selectedApplicationId, setSelectedApplicationId] = useState('');
    const [memoText, setMemoText] = useState('');


    useEffect(() => {
        const stored = localStorage.getItem('applicationData');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setApplications(parsed);
                    //console.log('Loaded applications:', parsed);
                    if (parsed.length > 0) {
                        setSelectedApplicationId(parsed[0].id ?? parsed[0].name ?? 0);
                    }
                }
            } catch (error) {
                console.error('Failed to parse stored job applications', error);
            }
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectedApplicationId);
        if (!selectedApplicationId || !memoText.trim()) {
            return;
        }
        
        const storedMemos = localStorage.getItem('memoData');
        let memoList = [];

        try {
            const parsed = JSON.parse(storedMemos);
            if (Array.isArray(parsed)) {
                memoList = parsed;
            }
        } catch (error) {
            console.error('Failed to parse stored memos', error);
        }

        const newMemo = {
            id: Date.now().toString(),
            applicationId: selectedApplicationId,
            content: memoText.trim(),
            createdAt: new Date().toISOString(),
        };

        memoList.push(newMemo);
        localStorage.setItem('memoData', JSON.stringify(memoList));

        setMemoText('');
    };

    return (
        <form  onSubmit={handleSubmit}>
            <div>
                <label htmlFor="job_application">Job Application:</label>
                <select
                    id="job_application"
                    name="job_application"
                    value={selectedApplicationId}
                    onChange={(event) => setSelectedApplicationId(event.target.value)}
                >
                    {applications.map((application, index) => (
                        <option key={index} value={application.id ?? application.name ?? index}>
                            {application.name ?? application.company ?? `Application ${index + 1}`}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="memo_content">Memo:</label>
                <textarea
                    id="memo_content"
                    name="memo_content"
                    value={memoText}
                    onChange={(event) => setMemoText(event.target.value)}
                    required
                ></textarea>
            </div>
            <div>
                <button type="submit">Add Memo</button>&nbsp;
                <button type="button" id="cancel_memo_button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}