export default {
  mongodb: {
    ip: "192.168.0.100",
    port: "27017",
    app: "nodejs",
  },
  redis: {
    host: "192.168.0.100",
    port: 6379,
  },
  crypto: {
    privateKey: "37LvDSasdfasfsaf3a3IEIA;3r3oi3joijpjfa3a3m4XvjYOh9Yaa.p3id#IEYDNeaken",
    tokenExpiry: 1 * 30 * 1000 * 60, //1 hour
  },
  email: {
    test: true,
    username: "xingwenju@gmail.com",
    password: "password",
    accountName: "xingwenju",
  },
  validation: {
    username: /^[a-zA-Z0-9]{6,12}$/,
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/,
  },
};
