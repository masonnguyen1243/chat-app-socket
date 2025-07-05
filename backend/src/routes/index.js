import AuthRoutes from "./AuthRoutes.js";

export const initRoutes = (app) => {
  app.use("/api/auth", AuthRoutes);
};
