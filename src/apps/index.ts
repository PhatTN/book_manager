/* tslint:disable:ordered-imports */
import "reflect-metadata";
import { Server } from "Apps/server";
import { AppContainer } from "Injection/appContainer";

const appContainer = new AppContainer();
appContainer.inject();
const server = new Server(appContainer);

server.start();
