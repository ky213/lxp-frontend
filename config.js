var path = require('path');

var root = path.join(__dirname);

var config = {
    rootDir:                root,
    // Targets ========================================================
    serveDir:               path.join(root, '.serve'),
    distDir:                path.join(root, 'dist'),
    clientManifestFile:     'manifest.webpack.json',
    clientStatsFile:        'stats.webpack.json',

    // Source Directory ===============================================
    srcDir:                 path.join(root, 'app'),
    srcServerDir:           path.join(root, 'server'),

    // HTML Layout ====================================================
    srcHtmlLayout:          path.join(root, 'app', 'index.html'),

    // Site Config ====================================================
    siteTitle:              process.env.APP_TITLE || 'Pulse',
    siteDescription:        process.env.APP_DESCRIPTION || 'Resident Management System',
    siteCannonicalUrl:      process.env.APP_CANONICAL_URL || 'http://localhost:4101',
    siteKeywords:           process.env.APP_KEYWORDS || 'residents engagement timetable management',
    scssIncludes:           [],
    apiUrl:                 process.env.API_URL || 'http://localhost:4001/api' 
}

module.exports = config;