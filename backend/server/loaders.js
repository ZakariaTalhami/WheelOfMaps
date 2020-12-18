import expressLoader from "./loaders/express";
import mongooseLoader from "./loaders/mongoose";

export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  await mongooseLoader();
};
