import mongoose, {Document, Schema, Model} from 'mongoose';

export interface IArticle extends Document {
    code: string;
    title: string;
    content: string;
    image: string;
    category: string;
}

export interface IArticleModel extends Model < IArticle > {}

const articleSchema: Schema = new Schema({
    code: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    prodCategory: {
        type: String
    }
}, {timestamps: true})

const Article = mongoose.model<IArticle, IArticleModel>('Article', articleSchema);

export default Article;
