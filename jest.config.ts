// NextJS
import nextJest from "next/jest.js";

// ReactJS
import "@testing-library/jest-dom";

// Jest
import type { Config } from "jest";

const createJestConfig = nextJest({
    dir: "./",
});

const config: Config = {
    coverageProvider: "v8",
    preset: "ts-jest",
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    testEnvironment: "jsdom",
};

export default createJestConfig(config);
