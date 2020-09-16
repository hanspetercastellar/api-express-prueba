const config = {
  application: {
    cors: {
      server: [
        {
          origin: "http://localhost:3000",
          credentials: true,
        },
      ],
    },
  },
};

module.exports = config;
