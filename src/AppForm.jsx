import {useRef, useEffect, useState} from 'react';

export default function AppForm({onCancel, existingData}) {
    const idRef = useRef(null);
    const dateRef = useRef(null);
    const companyRef = useRef(null);
    const titleRef = useRef(null);
    const postingRef = useRef(null);
    const contactRef = useRef(null);
    const statusRef = useRef(null);
    const [companySuggestions, setCompanySuggestions] = useState([]);
    const [companyQuery, setCompanyQuery] = useState(existingData?.company || '');

    const editMode = existingData != null;

    useEffect(() => {
        dateRef.current?.focus();
    }, []);



    useEffect(() => {
        if (companyQuery.trim() === '') {
            setCompanySuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const response = await fetch(`https://example-api.jhp.app/company.php?search=${encodeURIComponent(companyQuery)}`);
                const data = await response.json();
                console.log('Fetched company suggestions:', data.data);
                setCompanySuggestions(Array.isArray(data.data) ? data.data : []);
            } catch (error) {
                console.error('Error fetching company suggestions:', error);
                setCompanySuggestions([]);
            }
        };

        const timer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timer);
    }, [companyQuery]);

    useEffect(() => {
        if (existingData) {
            idRef.current.value = existingData.id || 0;
            dateRef.current.value = existingData.date || '';
            companyRef.current.value = existingData.company || '';
            titleRef.current.value = existingData.job_title || '';
            statusRef.current.value = existingData.status || 'applied';
            postingRef.current.value = existingData.job_posting || '';
            contactRef.current.value = existingData.contact_info || '';
        }
    }, [existingData]);

    const clearFields = () => {
        if (idRef.current) idRef.current.value = 0;
        if (dateRef.current) dateRef.current.value = '';
        if (companyRef.current) companyRef.current.value = '';
        if (titleRef.current) titleRef.current.value = '';
        if (statusRef.current) statusRef.current.value = 'applied';
        if (postingRef.current) postingRef.current.value = '';
        if (contactRef.current) contactRef.current.value = '';
    };

    const deleteData = () => {
        const existing = window.localStorage.getItem('applicationData');
        const existingDataArray = existing ? JSON.parse(existing) : [];
        const updatedData = existingDataArray.filter(item => !(item.company === companyRef.current.value && item.job_title === titleRef.current.value && item.date === dateRef.current.value));
        window.localStorage.setItem('applicationData', JSON.stringify(updatedData));
        clearFields();
        onCancel();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const company = companyRef.current.value;
        const job_title = titleRef.current.value;
        const date = dateRef.current.value;
        const status = statusRef.current.value;
        const job_posting = postingRef.current.value;
        const contact_info = contactRef.current.value;

        const existing = window.localStorage.getItem('applicationData');
        const existingDataArray = existing ? JSON.parse(existing) : [];

        const nextId = existingDataArray.reduce((maxId, item) => {
            const id = Number(item.id);
            return Number.isInteger(id) ? Math.max(maxId, id) : maxId;
        }, 0) + 1;

        const id = editMode ? (existingData?.id ?? nextId) : nextId;
        const newData = { id, company, job_title, date, status, job_posting, contact_info };

        if (editMode) {
            const index = existingDataArray.findIndex(item => item.company === existingData.company && item.job_title === existingData.job_title && item.date === existingData.date);
            if (index !== -1) {
                existingDataArray[index] = newData;
            } else {
                existingDataArray.push(newData);
            }
        } else {
            existingDataArray.push(newData);
        }

        window.localStorage.setItem('applicationData', JSON.stringify(existingDataArray));
        clearFields();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" ref={idRef} />
            <div>
                <label htmlFor="application_date">Date:</label>
                <input type="date" ref={dateRef} id="application_date" defaultValue={existingData?.date || ''} required />
            </div>

            <div>
                <label htmlFor="company">Company Name:</label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    ref={companyRef}
                    defaultValue={existingData?.company || ''}
                    required
                    onChange={(e) => setCompanyQuery(e.target.value)}
                />
                {companySuggestions.length > 0 && (
                    <ul className="company-suggestions" id="company-suggestions">
                        {companySuggestions.map((suggestion) => (
                            console.log('Rendering suggestion:', suggestion) || (

                            <li
                                key={suggestion.id}
                                onClick={() => {
                                    if (companyRef.current) {
                                        companyRef.current.value = suggestion.name;
                                    }
                                    setCompanyQuery(suggestion.name);
                                    setCompanySuggestions([]);
                                }}
                            
                            >
                                {suggestion.name}
                            </li>
                            )
                        ))}
                    </ul>   
                )}
            </div>

            <div>
                <label htmlFor="job_title">Job Title:</label>
                <input type="text" id="job_title" name="job_title" ref={titleRef} defaultValue={existingData?.job_title || ''} required />
            </div>

            <div>
                <label htmlFor="job_posting">Job Posting:</label>
                <input type="text" id="job_posting" name="job_posting" ref={postingRef} defaultValue={existingData?.job_posting || ''} />
            </div>

            <div>
                <label htmlFor="contact_info">Contact Information:</label>
                <input type="tel" id="contact_info" name="contact_info" ref={contactRef} defaultValue={existingData?.contact_info || ''} />
            </div>

            <div>
                <label htmlFor="status">Status:</label>
                <select id="status" name="status" ref={statusRef} defaultValue={existingData?.status || 'applied'}>
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <div>
                <button type="submit">Add</button> &nbsp;
                <button type="button" id="cancel_button" onClick={onCancel}>
                    Cancel
                </button>
                {editMode && (
                    <button type="button" onClick={deleteData}>
                        Delete
                    </button>
                )}
            </div>
        </form>
    );
};