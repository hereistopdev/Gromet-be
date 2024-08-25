import mongoose, {Document, Schema, Model} from 'mongoose';

export interface IVat extends Document {
    itemNum: string;
    prodCode: string;
    prodName: string;
    prodCate: string;
    unit: string;
    salePrice: string;
}

export interface IVatModel extends Model < IVat > {}

const vatSchema: Schema = new Schema({
    vatBase: {
        type: String,
        required: true
    },
    vatRate: {
        type: String,
        required: true
    },
    prodName: {
        type: String,
        required: true
    },
    prodCate: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    salePrice: {
        type: String
    },
    
}, {timestamps: true})

const Vat = mongoose.model<IVat, IVatModel>('Vat', vatSchema);

export default Vat;
