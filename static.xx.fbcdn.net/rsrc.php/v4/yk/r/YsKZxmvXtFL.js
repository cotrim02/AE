; /*FB_PKG_DELIM*/

__d("FBDomainsSVConfig.experimental", ["cr:17816"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = b("cr:17816")
}), 98);
__d("FBDomainsSVConfigJSModuleWrapper", ["FBDomainsSVConfig"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a) {
        return Object.fromEntries(a)
    }
    b = {
        domains: a(c("FBDomainsSVConfig").domains)
    };
    d = b;
    g["default"] = d
}), 98);
__d("PageTransitionsConfig.experimental", ["cr:19572"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = b("cr:19572")
}), 98);
__d("PageTransitionsConfigJSModuleWrapper", ["PageTransitionsConfig"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = c("PageTransitionsConfig")
}), 98);
__d("isBugBountyDotMetaDotComURI", [], (function(a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)bugbounty\\.meta\\.com$", "i"),
        h = ["https"];

    function a(a) {
        if (a.isEmpty() && a.toString() !== "#") return !1;
        return !a.getDomain() && !a.getProtocol() ? !1 : h.indexOf(a.getProtocol()) !== -1 && g.test(a.getDomain())
    }
    f["default"] = a
}), 66);