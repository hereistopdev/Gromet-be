import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

import Article from './../models/article';

const getArticles = async (req : Request, res : Response) => {
    try {
        const articles = await Article.find();
        if (! articles) {
            res.json({errorMsg: "No Article"})
        }
        res.json({articles: articles})
    } catch (error) {
        res.json({error: error});
    }
}


const articlesController = {
    getArticles
}

export default articlesController;
