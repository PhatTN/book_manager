import { Server } from "Apps/server";
import { AppContainer } from "Injection/appContainer";
import "reflect-metadata";

const appContainer = new AppContainer();
appContainer.inject();
const server = new Server(appContainer);

server.start();
