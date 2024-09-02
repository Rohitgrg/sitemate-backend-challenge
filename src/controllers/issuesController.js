import { v4 as uuidv4 } from 'uuid';
import * as issueModel from '../models/issueModel.js';

export const getIssues = (req, res) => {
    const issues = issueModel.getAllIssues();
    res.json(issues);
};

export const getIssue = (req, res) => {
    const issue = issueModel.getIssueById(req.params.id);
    if (issue) {
        res.json(issue);
    } else {
        res.status(404).json({ message: 'Issue not found' });
    }
};

export const createIssue = (req, res) => {
    const newIssue = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description
    };
    issueModel.addIssue(newIssue);
    res.status(201).json(newIssue);
};

export const updateIssue = (req, res) => {
    const updatedIssue = issueModel.updateIssue(req.params.id, req.body);
    if (updatedIssue) {
        res.json(updatedIssue);
    } else {
        res.status(404).json({ message: 'Issue not found' });
    }
};

export const deleteIssue = (req, res) => {
    const issue = issueModel.getIssueById(req.params.id);
    if (issue) {
        issueModel.deleteIssue(req.params.id);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Issue not found' });
    }
};
