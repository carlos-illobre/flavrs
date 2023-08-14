import { Game } from "./domain/Game";
import { BlackjackCommandLineListener } from "./view/BlackjackCommandLineListener";

new Game().start(new BlackjackCommandLineListener());
