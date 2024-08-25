import mongoose, {Document, Schema, Model} from 'mongoose';

export interface ICompany extends Document {
    vatNum: string;
    name: string;
    email: string;
    code: string;
    address: string;
    zipCode: string;
    city: string;
    account: string;
    wareHouseName: string;
    partnerName: string;
}

export interface ICompanyModel extends Model < ICompany > {}

const companySchema: Schema = new Schema({
    vatNum: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    zipCode: {
        type: String
    },
    city: {
        type: String
    },
    account: {
        type: String
    },
    wareHouseName: {
        type: String
    },
    partnerName: {
        type: String
    },
    
}, {timestamps: true})

const Company = mongoose.model<ICompany, ICompanyModel>('Company', companySchema);

export default Company;
