"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const user_route_1 = __importDefault(require("./routes/user.route"));
const business_route_1 = __importDefault(require("./routes/business.route"));
const subscription_route_1 = __importDefault(require("./routes/subscription.route"));
const review_route_1 = __importDefault(require("./routes/review.route"));
const database_1 = require("./config/database");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});
exports.io = io;
io.on("connection", (socket) => {
    socket.on("subscribe", (businessId) => {
        socket.join(businessId);
    });
    socket.on("unsubscribeAll", () => {
        const rooms = Object.keys(socket.rooms);
        rooms.forEach((room) => {
            if (room !== socket.id) {
                socket.leave(room);
            }
        });
    });
    socket.on("disconnect", () => { });
});
// Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
// Routes
app.use("/api/user", user_route_1.default);
app.use("/api/businesses", business_route_1.default);
app.use("/api/businesses", subscription_route_1.default);
app.use("/api/reviews", review_route_1.default);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/dist/index.html"));
});
// Connect to the database and start the server
(0, database_1.connectToDatabase)()
    .then(() => {
    server.listen(port);
})
    .catch((error) => {
    console.error("Failed to start server:", error);
});
//# sourceMappingURL=index.js.map