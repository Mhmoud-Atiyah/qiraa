const path = require('path')
const fs = require('fs')
const { copyFile } = require('./files')
const { checkOnline } = require('./misc')
/* Some Defualt Values */
const MAINPATH = path.join(__dirname + '/../');
const ASSETSPATH = path.join(MAINPATH, "static/assets");//TODO: delete this also
const DATAPATH = path.join(MAINPATH, "/data");
const BOOKSPATH = path.join(DATAPATH, "/books");//TODO: Delete this
const DBPath = path.join(DATAPATH, "/iqraa.db");
const PORT = process.env.PORT || 1999;
// SOME SPEICAL DEFINE
const max = 1000000; // maximum ID of Books
const min = 1;// minimum ID of Books

/* Create Main Dirs */
function init() {
    fs.mkdir(`${DATAPATH}`, (err) => {
        if (err) throw err;
        console.log(`Directory: ${DATAPATH} created successfully`);
    });
    /* Themes Directory */
    fs.mkdir(`${DATAPATH}/themes`, (err) => {
        if (err) throw err;
        console.log(`Directory: ${DATAPATH}/themes created successfully`);
        copyFile(`${MAINPATH}static/style/darkTheme.css`, `${DATAPATH}/themes/darkTheme.css`);
        copyFile(`${MAINPATH}static/style/lightTheme.css`, `${DATAPATH}/themes/lightTheme.css`);
        // copyFile(`${MAINPATH}static/style/arabic_text.ttf`, `${DATAPATH}/themes/arabic_text.ttf`);
        // copyFile(`${MAINPATH}static/style/Old Antic Decorative.ttf`, `${DATAPATH}/themes/Old Antic Decorative.ttf`);
    });
    // Check Connection
    var isOnline = false;
    (async () => {
        const online = await checkOnline();
        if (online) {
            isOnline = true;
        } else {
            isOnline = false;
        }
    })();
    /* Create Config File */
    fs.writeFile(`${DATAPATH}/config.json`, `
        {
            "id": "0",
            "new": "true",
            "riwaqnew": "true",
            "librarynew": "true",
            "firstName": "firstName",
            "lasttName": "lasttName",
            "account": "account",
            "profile": "profile",
            "current": {
                "id": "",
                "cover": "${ASSETSPATH}/bookCover.jpg",
                "title": "title"
            },
            "lastSearch": [],
            "connection": "${isOnline}",
            "mode": "light",
            "dock": "show",
            "microphone": "off",
            "speaker": "off",
            "camera": "off"
        }
        `, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log(`Successfully Config File Created`);
        }
    });
    /* Create Users File */
    fs.writeFile(`${DATAPATH}/users.json`, `[]`, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log(`Successfully Users File Created`);
        }
    });
}

module.exports = {
    init,
    MAINPATH,
    ASSETSPATH,
    DATAPATH,
    BOOKSPATH,
    DBPath,
    PORT,
    max,
    min
}