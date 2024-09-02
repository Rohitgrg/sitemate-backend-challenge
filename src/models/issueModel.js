import { JSONFilePreset } from 'lowdb/node';

const defaultData = { issues: [{
    id: "387963ce-5dbe-487c-93d5-c5b2e3455209",
    title: "first default issue",
    description:"default description"
    }] };

const db = await JSONFilePreset('db.json', defaultData)

const getAllIssues = () => db.data.issues;
const getIssueById = (id) => db.data.issues.find(issue => issue.id == id);
const addIssue = (issue) => db.data.issues.push(issue);
const updateIssue = (id, updates) => {
    db.data.issues = db.data.issues.map(issue =>
        issue.id === id
            ? { ...issue, title: updates.title, description: updates.description }
            : issue
    );

    return db.data.issues.find(issue => issue.id == id);
};
const deleteIssue = (id) => {
    db.data.issues = db.data.issues.filter(issue => issue.id !== id);
};

export {
    getAllIssues,
    getIssueById,
    addIssue,
    updateIssue,
    deleteIssue
};
