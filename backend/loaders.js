import expressLoader from "./loaders/express";

export default async ({ expressApp }) => {
    await expressLoader({app: expressApp})
}
