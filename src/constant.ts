export interface Constants {
  APPNAME: string;
  PORT: number;
  MONGODB_URI: string;
  SMTP_PORT: number;
  SMTP_HOST: string;
  EMAIL_USER: string;
  EMAIL_PASS: string;
  BASE_CLIENT_URL: string;
  BASE_CLIENT_USER_EMAIL_VERIFICATION_URL: string;
}

const constants: Constants = {
  APPNAME: "Gromet",
  PORT: 8001,
  MONGODB_URI:
    "mongodb+srv://dtnyj1712:6ItojSyP96s8KdJb@cluster0.mib89fn.mongodb.net/gromet",
  SMTP_PORT: 587,
  SMTP_HOST: "mailcluster.loopia.se",
  EMAIL_USER: "podrska@gromet.rs",
  EMAIL_PASS: "podrsk@22022024",
  BASE_CLIENT_URL: "https://gromet-fe.vercel.app/",
  // BASE_CLIENT_URL: "http://localhost:3000",
  BASE_CLIENT_USER_EMAIL_VERIFICATION_URL: "/account/verifyuserbyid",
};

export default constants;
//# MONGODB_URI = mongodb+srv://borysdev:kRw72GNJb8ZsuPxC@borys.kmckamh.mongodb.net/gormet
//# MONGODB_URI = mongodb://localhost:27017/gromet
