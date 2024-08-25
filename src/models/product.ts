import mongoose, { Document, Schema, Model } from "mongoose";

export interface IProduct extends Document {
  polje_id: String;
  sifra_proizvoda: Array<{ [key: string]: string }>;
  naziv_artikla: String;
  naziv_proizvoda_model: Array<{ [key: string]: string }>;
  varijacije: String;
  meta_description: String;
  prosireni_opis: String;
  jedinica_mere: String;
  kategorija_artikla: String;
  potkategorija: String;
  potkategorija_lista: String;
  minimalno_pakovanje: String;
  transportno_pakovanje: String;
  zapremina: String;
  kvadratura: String;
  sirina: String;
  visina: String;
  precnik: String;
  debljina: String;
  tezina: String;
  sastav: String;
  boja: String;
  stiker: String;
  qr_kod: String;
  slike: String;
  model_vise_slika: String;
  url: String;
  tehnicki_crtez: String;
  tip_otpornosti: String;
  garancija: String;
  rok_trajanja: String;
  sertifikat: String;
  mesto_i_nacin_skladistenja: String;
  dimenzije_pakovanja: String;
  prateca_oprema_dodaci: String;
  dodatne_napomene: String;
  mesta_primene: String;
  nacin_ugradnje: String;
  count: Number;

  name: string;
  category: string;
  sub_category?: string;
  unit_of_measure: string;
  article_code_and_model: Array<{ [key: string]: string }>;
  min_pack: number;
  trans_pack: number;
  stock: number;
  vp_price: number;
  net_price: number;
  rebate: number;
  price: number;
}

export interface IProductModel extends Model<IProduct> {}

const productSchema: Schema = new Schema(
  {
    polje_id: {
      type: String,
      //required: true
    },
    sifra_proizvoda: {
      type: Array<{ [key: string]: string }>,
      //required: true
    },
    naziv_proizvoda_model: {
      type: Array<{ [key: string]: string }>,
      //required: true
    },
    naziv_artikla: {
      type: String,
      //required: true
    },
    varijacije: {
      type: String,
      //required: true
    },
    meta_description: {
      type: String,
      //required: true
    },
    prosireni_opis: {
      type: String,
      //required: true
    },
    jedinica_mere: {
      type: String,
      //required: true
    },
    kategorija_artikla: {
      type: String,
      //required: true
    },
    potkategorija: {
      type: String,
      //required: true
    },
    potkategorija_lista: {
      type: String,
      //required: true
    },
    minimalno_pakovanje: {
      type: String,
      //required: true
    },
    transportno_pakovanje: {
      type: String,
      //required: true
    },
    zapremina: {
      type: String,
      //required: true
    },
    kvadratura: {
      type: String,
      //required: true
    },
    sirina: {
      type: String,
      //required: true
    },
    visina: {
      type: String,
      //required: true
    },
    precnik: {
      type: String,
      //required: true
    },
    debljina: {
      type: String,
      //required: true
    },
    tezina: {
      type: String,
      //required: true
    },
    sastav: {
      type: String,
      //required: true
    },
    boja: {
      type: String,
      //required: true
    },
    stiker: {
      type: String,
      //required: true
    },
    qr_kod: {
      type: String,
      //required: true
    },
    slike: {
      type: String,
      //required: true
    },
    model_vise_slika: {
      type: String,
      //required: true
    },
    url: {
      type: String,
      //required: true
    },
    tehnicki_crtez: {
      type: String,
      //required: true
    },
    tip_otpornosti: {
      type: String,
      //required: true
    },
    garancija: {
      type: String,
      //required: true
    },
    rok_trajanja: {
      type: String,
      //required: true
    },
    sertifikat: {
      type: String,
      //required: true
    },
    mesto_i_nacin_skladistenja: {
      type: String,
      //required: true
    },
    dimenzije_pakovanja: {
      type: String,
      //required: true
    },
    prateca_oprema_dodaci: {
      type: String,
      //required: true
    },
    dodatne_napomene: {
      type: String,
      //required: true
    },
    mesta_primene: {
      type: String,
      //required: true
    },
    nacin_ugradnje: {
      type: String,
      //required: true
    },
    count: {
      type: Number,
      //required: true
    },

    name: {
      type: String,
      //required: true
    },
    category: {
      type: String,
      //required: true
    },
    sub_category: {
      type: String,
      //default: null
    },
    unit_of_measure: {
      type: String,
      //required: true
    },
    article_code_and_model: {
      type: Array<{ [key: string]: string }>,
      //required: true
    },
    min_pack: {
      type: Number,
      //required: true,
    },
    trans_pack: {
      type: Number,
      //required: true
    },
    stock: {
      type: Number,
      //required: true
    },
    vp_price: {
      type: Number,
      //required: true
    },
    net_price: {
      type: Number,
      //required: true
    },
    rebate: {
      type: Number,
      //required: true
    },
    price: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct, IProductModel>(
  "Product",
  productSchema
);

export default Product;
