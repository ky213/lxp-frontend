import TinCan from 'tincanjs';
import config from '@/config';

export const TinCanLaunch = {
    launchContent,
    getActor
}

const lrsConfig = {
    endpoint: process.env.XAPI_URL,
    username: "test",
    password: "test",
}

let parseXml;
if (typeof window.DOMParser != "undefined") {
    parseXml = function(xmlStr) {
        return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
    };
} else if (typeof window.ActiveXObject != "undefined" &&
      new window.ActiveXObject("Microsoft.XMLDOM")) {
    parseXml = function(xmlStr) {
        var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlStr);
        return xmlDoc;
    };
} else {
    throw new Error("No XML parser found");
}

const sendStatement = (activity, actor) => {
    let lrs;

    try {
        lrs = new TinCan.LRS(
            {
                endpoint: lrsConfig.endpoint,
                username: lrsConfig.username,
                password: lrsConfig.password,
                allowFail: false
            }
        );
    }
    catch (ex) {
        console.log('Failed to setup LRS object: ' + ex);
    }

    let statement = new TinCan.Statement(
        {
            id: TinCan.Utils.getUUID(),
            actor: actor,
            verb: {
                id: 'http://adlnet.gov/expapi/verbs/launched',
                display: {
                    en: 'launched'
                }
            },
            object: activity
        }
    );

    console.log(statement);
    lrs.saveStatement(
        statement,
        {
            callback: function (err, xhr) {
                if (err !== null) {
                    if (xhr !== null) {
                        console.log('Failed to save statement: ' + xhr.responseText + ' (' + xhr.status + ')');
                    }
                    console.log('Failed to save statement: ' + err);
                    alert('There was a problem communicating with the Learning Record Store. Your results may not be saved. Please check your internet connection and try again.');
                    return;
                }
                console.log("Statement saved");
            }
        }
    );
  }

  /*
const readXML = (filename, user, callback) => {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/xml');
    xobj.open('GET', filename, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText, user);
        }
    }
    xobj.send(null);
} */

function launchContent(user, registration, course, launcher) {
    const launchUrlBase = `${process.env.UPLOADS_URL}/${course.contentPath}${!course.contentPath.endsWith('/') && '/' || ''}`;

    console.log("xml url:", launchUrlBase + 'tincan.xml')
    const requestOptions = { method: 'GET', headers: { "Content-Type": "application/xml" } };

    return fetch(launchUrlBase + 'tincan.xml', requestOptions).then(res => {
        return res.text().then(text => { 
            console.log("Got xml:", text, user)
            var xmlActivity = parseXml(text).getElementsByTagName('activity')[0];
            var activityCfg = {
                id: xmlActivity.id,
                definition: {
                    name: {},
                    description: {}
                }
            }
            for (var i = xmlActivity.getElementsByTagName('name').length - 1; i >= 0; i--) {
                var name = xmlActivity.getElementsByTagName('name')[i];
                var nameLang = name.attributes.hasOwnProperty('lang') ? name.attributes.lang.nodeValue : 'en';
                if (name.childNodes.length > 0){
                    activityCfg.definition.name[nameLang] = name.childNodes[0].nodeValue;
                }
            }
            for (var i = xmlActivity.getElementsByTagName('description').length - 1; i >= 0; i--) {
                var description = xmlActivity.getElementsByTagName('description')[i];
                var descLang = description.attributes.hasOwnProperty('lang') ? description.attributes.lang.nodeValue : 'en';
                if (description.childNodes.length > 0){
                    activityCfg.definition.description[descLang] = description.childNodes[0].nodeValue;
                }
            }

            const activity = new TinCan.Activity(activityCfg);
            let launchUrl = launchUrlBase + xmlActivity.getElementsByTagName('launch')[0].childNodes[0].nodeValue;

            let launchLink = launchUrl;
            launchLink += '?endpoint=' + encodeURIComponent(lrsConfig.endpoint);
            launchLink += '&auth=' + encodeURIComponent('Basic ' + TinCan.Utils.getBase64String(lrsConfig.username + ':' + lrsConfig.password));

            const actor = getActor(user);
            launchLink += '&actor=' + encodeURIComponent(JSON.stringify(actor.asVersion('1.0.0')));
            launchLink += '&registration=' + encodeURIComponent(`${registration}|${course.courseId}` || TinCan.Utils.getUUID());

            launchLink += '&activity_id=' + encodeURIComponent(activity.id);

            sendStatement(activity, actor);
            launcher(launchLink);
            //window.open(launchLink);

            console.log("launch url:", launchUrl)
        })
    });
}

function getActor(user) {
    //console.log("Got user for actor:", user)
    return new TinCan.Agent ({'name': user.fullName, 'mbox': 'mailto:'+ user.email});
}


