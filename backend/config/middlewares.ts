export default ({ env }) => {
  const extraOrigins = (env("CORS_ORIGINS", "") as string)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return [
    "strapi::logger",
    "strapi::errors",
    "strapi::security",
    {
      name: "strapi::cors",
      config: {
        headers: "*",
        origin: [
          "http://localhost:3000",
          "http://127.0.0.1:3000",
          "http://localhost:3001",
          "http://localhost:3002",
          "http://localhost:3003",
          ...extraOrigins,
        ],
      },
    },
    "strapi::poweredBy",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
  ];
};
