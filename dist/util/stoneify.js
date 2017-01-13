'use strict';

var through = require('through');
module.exports = function stoneify(file, options) {
    if (!/.stone$/.test(file)) {
        return through();
    }
    var data = '';
    var stream = through(write, end);
    stream.stoneify = true;

    function write(buf) {
        data += buf;
    }

    function end() {
        var script = data.match(/<script>(.|\n)*?<\/script>/gm);
        var template = data.match(/<template>(.|\n)*?<\/template>/gm);
        script = dealScript(script[0], template);
        stream.queue(script);
        stream.queue(null);
    }

    function dealScript(script, templates) {
        script = script.replace(/<script>/ig, "").replace(/<\/script>/ig, "");
        var template = "";
        if (templates instanceof Array) {
            for (var i = 0, ii = templates.length; i < ii; i++) {
                template += templateReplace(templates[i]);
            }
        } else {
            template = templateReplace(templates);
        }
        script += "\n" + "module.exports.template='" + template + "'";
        return script;
    }

    function templateReplace(tmplate) {
        return tmplate.replace(/<template>/ig, "").replace(/<\/template>/ig, "").replace(/[\r\n]/ig, "").replace(/\'/ig, "\\'");
    }
    return stream;
};