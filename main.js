const { app, BrowserWindow, shell } = require("electron");
const http = require("http");
const fs = require("fs");
const path = require("path");

let server;

const HOST = "127.0.0.1";
const PORT = 8765;
const SITE_ROOT = __dirname;

const mimeTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".pdf": "application/pdf"
};

function resolveFilePath(requestUrl) {
    const url = new URL(requestUrl, `http://${HOST}:${PORT}`);
    let pathname = decodeURIComponent(url.pathname);

    if (pathname.endsWith("/")) {
        pathname += "index.html";
    }

    let filePath = path.normalize(
        path.join(SITE_ROOT, pathname)
    );

    if (!filePath.startsWith(path.normalize(SITE_ROOT))) {
        return null;
    }

    if (!path.extname(filePath)) {
        filePath = path.join(filePath, "index.html");
    }

    return filePath;
}

function startServer() {
    return new Promise((resolve, reject) => {
        server = http.createServer((request, response) => {
            const filePath = resolveFilePath(request.url);

            if (!filePath) {
                response.writeHead(403, {
                    "Content-Type": "text/plain; charset=utf-8"
                });
                response.end("403 Forbidden");
                return;
            }

            fs.stat(filePath, (error, stat) => {
                if (error || !stat.isFile()) {
                    const notFoundPath = path.join(
                        SITE_ROOT,
                        "404.html"
                    );

                    fs.readFile(notFoundPath, (notFoundError, data) => {
                        if (notFoundError) {
                            response.writeHead(404, {
                                "Content-Type":
                                    "text/plain; charset=utf-8"
                            });
                            response.end("404 Not Found");
                            return;
                        }

                        response.writeHead(404, {
                            "Content-Type":
                                "text/html; charset=utf-8"
                        });
                        response.end(data);
                    });

                    return;
                }

                const extension = path.extname(filePath).toLowerCase();
                const contentType =
                    mimeTypes[extension] ??
                    "application/octet-stream";

                response.writeHead(200, {
                    "Content-Type": contentType,
                    "Cache-Control": "no-cache"
                });

                fs.createReadStream(filePath).pipe(response);
            });
        });

        server.once("error", reject);

        server.listen(PORT, HOST, () => {
            console.log(`MkDocs: http://${HOST}:${PORT}`);
            resolve();
        });
    });
}

async function createWindow() {
    await startServer();

    const window = new BrowserWindow({
        width: 1500,
        height: 950,
        minWidth: 1000,
        minHeight: 700,
        title: "VSCODE Docs Viewer",

        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true
        }
    });

    await window.loadURL(`http://${HOST}:${PORT}`);

    window.webContents.setWindowOpenHandler(({ url }) => {
        if (!url.startsWith(`http://${HOST}:${PORT}`)) {
            shell.openExternal(url);
        }

        return { action: "deny" };
    });

    window.webContents.on("will-navigate", (event, url) => {
        if (!url.startsWith(`http://${HOST}:${PORT}`)) {
            event.preventDefault();
            shell.openExternal(url);
        }
    });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (server) {
        server.close();
    }

    if (process.platform !== "darwin") {
        app.quit();
    }
});