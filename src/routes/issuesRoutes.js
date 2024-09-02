import express from 'express';
import {
    getIssues,
    getIssue,
    createIssue,
    updateIssue,
    deleteIssue
} from '../controllers/issuesController.js';

const router = express.Router();


router.get('/', getIssues);
router.get('/:id', getIssue);
router.post('/', createIssue);
router.put('/:id', updateIssue);
router.delete('/:id', deleteIssue);

export default router;
