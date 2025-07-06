import AuthRoutes from "./AuthRoutes.js";
import UserRoutes from "./UserRoutes.js";

export const initRoutes = (app) => {
  app.use("/api/auth", AuthRoutes);
  app.use("/api/user", UserRoutes);
};
