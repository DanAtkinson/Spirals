// forked from tholman's "????"
// forked from tyfkda's "????" http://jsdo.it/tyfkda/rukS

var requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback, element) {
        window.setTimeout(callback, 1000 / 60);
    },
    canvas = document.getElementById('canvas'),
    context = canvas.getContext("2d"),
    cx, cy, maxR,
    angStep = 0,
    speed = 0.00005,
    back = '000',
    cssNames = [
        ["AliceBlue", { Hex: "F0F8FF", Red: 240, Green: 248, Blue: 255}],
        ["AntiqueWhite", { Hex: "FAEBD7", Red: 250, Green: 235, Blue: 215}],
        ["Aqua", { Hex: "00FFFF", Red: 0, Green: 255, Blue: 255}],
        ["Aquamarine", { Hex: "7FFFD4", Red: 127, Green: 255, Blue: 212}],
        ["Azure", { Hex: "F0FFFF", Red: 240, Green: 255, Blue: 255}],
        ["Beige", { Hex: "F5F5DC", Red: 245, Green: 245, Blue: 220}],
        ["Bisque", { Hex: "FFE4C4", Red: 255, Green: 228, Blue: 196}],
        ["Black", { Hex: "000000", Red: 0, Green: 0, Blue: 0}],
        ["BlanchedAlmond", { Hex: "FFEBCD", Red: 255, Green: 235, Blue: 205}],
        ["Blue", { Hex: "0000FF", Red: 0, Green: 0, Blue: 255}],
        ["BlueViolet", { Hex: "8A2BE2", Red: 138, Green: 43, Blue: 226}],
        ["Brown", { Hex: "A52A2A", Red: 165, Green: 42, Blue: 42}],
        ["BurlyWood", { Hex: "DEB887", Red: 222, Green: 184, Blue: 135}],
        ["CadetBlue", { Hex: "5F9EA0", Red: 95, Green: 158, Blue: 160}],
        ["Chartreuse", { Hex: "7FFF00", Red: 127, Green: 255, Blue: 0}],
        ["Chocolate", { Hex: "D2691E", Red: 210, Green: 105, Blue: 30}],
        ["Coral", { Hex: "FF7F50", Red: 255, Green: 127, Blue: 80}],
        ["CornflowerBlue", { Hex: "6495ED", Red: 100, Green: 149, Blue: 237}],
        ["Cornsilk", { Hex: "FFF8DC", Red: 255, Green: 248, Blue: 220}],
        ["Crimson", { Hex: "DC143C", Red: 220, Green: 20, Blue: 60}],
        ["Cyan", { Hex: "00FFFF", Red: 0, Green: 255, Blue: 255}],
        ["DarkBlue", { Hex: "00008B", Red: 0, Green: 0, Blue: 139}],
        ["DarkCyan", { Hex: "008B8B", Red: 0, Green: 139, Blue: 139}],
        ["DarkGoldenRod", { Hex: "B8860B", Red: 184, Green: 134, Blue: 11}],
        ["DarkGray", { Hex: "A9A9A9", Red: 169, Green: 169, Blue: 169}],
        ["DarkGreen", { Hex: "006400", Red: 0, Green: 100, Blue: 0}],
        ["DarkKhaki", { Hex: "BDB76B", Red: 189, Green: 183, Blue: 107}],
        ["DarkMagenta", { Hex: "8B008B", Red: 139, Green: 0, Blue: 139}],
        ["DarkOliveGreen", { Hex: "556B2F", Red: 85, Green: 107, Blue: 47}],
        ["DarkOrange", { Hex: "FF8C00", Red: 255, Green: 140, Blue: 0}],
        ["DarkOrchid", { Hex: "9932CC", Red: 153, Green: 50, Blue: 204}],
        ["DarkRed", { Hex: "8B0000", Red: 139, Green: 0, Blue: 0}],
        ["DarkSalmon", { Hex: "E9967A", Red: 233, Green: 150, Blue: 122}],
        ["DarkSeaGreen", { Hex: "8FBC8F", Red: 143, Green: 188, Blue: 143}],
        ["DarkSlateBlue", { Hex: "483D8B", Red: 72, Green: 61, Blue: 139}],
        ["DarkSlateGray", { Hex: "2F4F4F", Red: 47, Green: 79, Blue: 79}],
        ["DarkTurquoise", { Hex: "00CED1", Red: 0, Green: 206, Blue: 209}],
        ["DarkViolet", { Hex: "9400D3", Red: 148, Green: 0, Blue: 211}],
        ["DeepPink", { Hex: "FF1493", Red: 255, Green: 20, Blue: 147}],
        ["DeepSkyBlue", { Hex: "00BFFF", Red: 0, Green: 191, Blue: 255}],
        ["DimGray", { Hex: "696969", Red: 105, Green: 105, Blue: 105}],
        ["DodgerBlue", { Hex: "1E90FF", Red: 30, Green: 144, Blue: 255}],
        ["FireBrick", { Hex: "B22222", Red: 178, Green: 34, Blue: 34}],
        ["FloralWhite", { Hex: "FFFAF0", Red: 255, Green: 250, Blue: 240}],
        ["ForestGreen", { Hex: "228B22", Red: 34, Green: 139, Blue: 34}],
        ["Fuchsia", { Hex: "FF00FF", Red: 255, Green: 0, Blue: 255}],
        ["Gainsboro", { Hex: "DCDCDC", Red: 220, Green: 220, Blue: 220}],
        ["GhostWhite", { Hex: "F8F8FF", Red: 248, Green: 248, Blue: 255}],
        ["Gold", { Hex: "FFD700", Red: 255, Green: 215, Blue: 0}],
        ["GoldenRod", { Hex: "DAA520", Red: 218, Green: 165, Blue: 32}],
        ["Gray", { Hex: "808080", Red: 128, Green: 128, Blue: 128}],
        ["Green", { Hex: "008000", Red: 0, Green: 128, Blue: 0}],
        ["GreenYellow", { Hex: "ADFF2F", Red: 173, Green: 255, Blue: 47}],
        ["HoneyDew", { Hex: "F0FFF0", Red: 240, Green: 255, Blue: 240}],
        ["HotPink", { Hex: "FF69B4", Red: 255, Green: 105, Blue: 180}],
        ["IndianRed", { Hex: "CD5C5C", Red: 205, Green: 92, Blue: 92}],
        ["Indigo", { Hex: "4B0082", Red: 75, Green: 0, Blue: 130}],
        ["Ivory", { Hex: "FFFFF0", Red: 255, Green: 255, Blue: 240}],
        ["Khaki", { Hex: "F0E68C", Red: 240, Green: 230, Blue: 140}],
        ["Lavender", { Hex: "E6E6FA", Red: 230, Green: 230, Blue: 250}],
        ["LavenderBlush", { Hex: "FFF0F5", Red: 255, Green: 240, Blue: 245}],
        ["LawnGreen", { Hex: "7CFC00", Red: 124, Green: 252, Blue: 0}],
        ["LemonChiffon", { Hex: "FFFACD", Red: 255, Green: 250, Blue: 205}],
        ["LightBlue", { Hex: "ADD8E6", Red: 173, Green: 216, Blue: 230}],
        ["LightCoral", { Hex: "F08080", Red: 240, Green: 128, Blue: 128}],
        ["LightCyan", { Hex: "E0FFFF", Red: 224, Green: 255, Blue: 255}],
        ["LightGoldenRodYellow", { Hex: "FAFAD2", Red: 250, Green: 250, Blue: 210}],
        ["LightGray", { Hex: "D3D3D3", Red: 211, Green: 211, Blue: 211}],
        ["LightGreen", { Hex: "90EE90", Red: 144, Green: 238, Blue: 144}],
        ["LightPink", { Hex: "FFB6C1", Red: 255, Green: 182, Blue: 193}],
        ["LightSalmon", { Hex: "FFA07A", Red: 255, Green: 160, Blue: 122}],
        ["LightSeaGreen", { Hex: "20B2AA", Red: 32, Green: 178, Blue: 170}],
        ["LightSkyBlue", { Hex: "87CEFA", Red: 135, Green: 206, Blue: 250}],
        ["LightSlateGray", { Hex: "778899", Red: 119, Green: 136, Blue: 153}],
        ["LightSteelBlue", { Hex: "B0C4DE", Red: 176, Green: 196, Blue: 222}],
        ["LightYellow", { Hex: "FFFFE0", Red: 255, Green: 255, Blue: 224}],
        ["Lime", { Hex: "00FF00", Red: 0, Green: 255, Blue: 0}],
        ["LimeGreen", { Hex: "32CD32", Red: 50, Green: 205, Blue: 50}],
        ["Linen", { Hex: "FAF0E6", Red: 250, Green: 240, Blue: 230}],
        ["Magenta", { Hex: "FF00FF", Red: 255, Green: 0, Blue: 255}],
        ["Maroon", { Hex: "800000", Red: 128, Green: 0, Blue: 0}],
        ["MediumAquaMarine", { Hex: "66CDAA", Red: 102, Green: 205, Blue: 170}],
        ["MediumBlue", { Hex: "0000CD", Red: 0, Green: 0, Blue: 205}],
        ["MediumOrchid", { Hex: "BA55D3", Red: 186, Green: 85, Blue: 211}],
        ["MediumPurple", { Hex: "9370DB", Red: 147, Green: 112, Blue: 219}],
        ["MediumSeaGreen", { Hex: "3CB371", Red: 60, Green: 179, Blue: 113}],
        ["MediumSlateBlue", { Hex: "7B68EE", Red: 123, Green: 104, Blue: 238}],
        ["MediumSpringGreen", { Hex: "00FA9A", Red: 0, Green: 250, Blue: 154}],
        ["MediumTurquoise", { Hex: "48D1CC", Red: 72, Green: 209, Blue: 204}],
        ["MediumVioletRed", { Hex: "C71585", Red: 199, Green: 21, Blue: 133}],
        ["MidnightBlue", { Hex: "191970", Red: 25, Green: 25, Blue: 112}],
        ["MintCream", { Hex: "F5FFFA", Red: 245, Green: 255, Blue: 250}],
        ["MistyRose", { Hex: "FFE4E1", Red: 255, Green: 228, Blue: 225}],
        ["Moccasin", { Hex: "FFE4B5", Red: 255, Green: 228, Blue: 181}],
        ["NavajoWhite", { Hex: "FFDEAD", Red: 255, Green: 222, Blue: 173}],
        ["Navy", { Hex: "000080", Red: 0, Green: 0, Blue: 128}],
        ["OldLace", { Hex: "FDF5E6", Red: 253, Green: 245, Blue: 230}],
        ["Olive", { Hex: "808000", Red: 128, Green: 128, Blue: 0}],
        ["OliveDrab", { Hex: "6B8E23", Red: 107, Green: 142, Blue: 35}],
        ["Orange", { Hex: "FFA500", Red: 255, Green: 165, Blue: 0}],
        ["OrangeRed", { Hex: "FF4500", Red: 255, Green: 69, Blue: 0}],
        ["Orchid", { Hex: "DA70D6", Red: 218, Green: 112, Blue: 214}],
        ["PaleGoldenRod", { Hex: "EEE8AA", Red: 238, Green: 232, Blue: 170}],
        ["PaleGreen", { Hex: "98FB98", Red: 152, Green: 251, Blue: 152}],
        ["PaleTurquoise", { Hex: "AFEEEE", Red: 175, Green: 238, Blue: 238}],
        ["PaleVioletRed", { Hex: "DB7093", Red: 219, Green: 112, Blue: 147}],
        ["PapayaWhip", { Hex: "FFEFD5", Red: 255, Green: 239, Blue: 213}],
        ["PeachPuff", { Hex: "FFDAB9", Red: 255, Green: 218, Blue: 185}],
        ["Peru", { Hex: "CD853F", Red: 205, Green: 133, Blue: 63}],
        ["Pink", { Hex: "FFC0CB", Red: 255, Green: 192, Blue: 203}],
        ["Plum", { Hex: "DDA0DD", Red: 221, Green: 160, Blue: 221}],
        ["PowderBlue", { Hex: "B0E0E6", Red: 176, Green: 224, Blue: 230}],
        ["Purple", { Hex: "800080", Red: 128, Green: 0, Blue: 128}],
        ["RebeccaPurple", { Hex: "663399", Red: 102, Green: 51, Blue: 153}],
        ["Red", { Hex: "FF0000", Red: 255, Green: 0, Blue: 0}],
        ["RosyBrown", { Hex: "BC8F8F", Red: 188, Green: 143, Blue: 143}],
        ["RoyalBlue", { Hex: "4169E1", Red: 65, Green: 105, Blue: 225}],
        ["SaddleBrown", { Hex: "8B4513", Red: 139, Green: 69, Blue: 19}],
        ["Salmon", { Hex: "FA8072", Red: 250, Green: 128, Blue: 114}],
        ["SandyBrown", { Hex: "F4A460", Red: 244, Green: 164, Blue: 96}],
        ["SeaGreen", { Hex: "2E8B57", Red: 46, Green: 139, Blue: 87}],
        ["SeaShell", { Hex: "FFF5EE", Red: 255, Green: 245, Blue: 238}],
        ["Sienna", { Hex: "A0522D", Red: 160, Green: 82, Blue: 45}],
        ["Silver", { Hex: "C0C0C0", Red: 192, Green: 192, Blue: 192}],
        ["SkyBlue", { Hex: "87CEEB", Red: 135, Green: 206, Blue: 235}],
        ["SlateBlue", { Hex: "6A5ACD", Red: 106, Green: 90, Blue: 205}],
        ["SlateGray", { Hex: "708090", Red: 112, Green: 128, Blue: 144}],
        ["Snow", { Hex: "FFFAFA", Red: 255, Green: 250, Blue: 250}],
        ["SpringGreen", { Hex: "00FF7F", Red: 0, Green: 255, Blue: 127}],
        ["SteelBlue", { Hex: "4682B4", Red: 70, Green: 130, Blue: 180}],
        ["Tan", { Hex: "D2B48C", Red: 210, Green: 180, Blue: 140}],
        ["Teal", { Hex: "008080", Red: 0, Green: 128, Blue: 128}],
        ["Thistle", { Hex: "D8BFD8", Red: 216, Green: 191, Blue: 216}],
        ["Tomato", { Hex: "FF6347", Red: 255, Green: 99, Blue: 71}],
        ["Turquoise", { Hex: "40E0D0", Red: 64, Green: 224, Blue: 208}],
        ["Violet", { Hex: "EE82EE", Red: 238, Green: 130, Blue: 238}],
        ["Wheat", { Hex: "F5DEB3", Red: 245, Green: 222, Blue: 179}],
        ["White", { Hex: "FFFFFF", Red: 255, Green: 255, Blue: 255}],
        ["WhiteSmoke", { Hex: "F5F5F5", Red: 245, Green: 245, Blue: 245}],
        ["Yellow", { Hex: "FFFF00", Red: 255, Green: 255, Blue: 0}],
        ["YellowGreen", { Hex: "9ACD32", Red: 154, Green: 205, Blue: 50}]
    ];

(function () {
    window.addEventListener('resize', resize, false);
    window.addEventListener('keydown', keydown, false);
    canvas.addEventListener('click', click, false);
    window.location.hash = window.location.hash || "speed=" + speed + "&back=" + back;

    parseHashParams();
}());

function parseHashParams() {
    var hashParams = getHashParams();
    speed = parseFloat(hashParams.speed) || 0.00025;
    back = parseColour(hashParams.back);

    if (typeof back !== "undefined") {
        resize();
        animate();
    }
}

function click() {
    //angStep = 0;
    speed = Number((speed + 0.00005).toFixed(6));
    window.location.hash = "speed=" + speed + "&back=" + rgbToHex(back);
}

function rgbToHex(rgbVal) {
    return componentToHex(rgbVal[0]) + componentToHex(rgbVal[1]) + componentToHex(rgbVal[2]);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function convertToRGBA(rgbVal, a) {
    return "rgba(" + rgbVal[0] + ", " + rgbVal[1] + ", " + rgbVal[2] + ", " + (a || 1) + ")";
}

function keydown(e) {
    switch (e.which) {
        case 109://-
        case 189://-
            //console.log("-");
            //angStep = 0;
            speed = Number((speed - 0.00005).toFixed(6));
            window.location.hash = "speed=" + speed + "&back=" + rgbToHex(back);
            break;
        case 107://+
        case 187://+
            //console.log("+");
            //angStep = 0;
            speed = Number((speed + 0.00005).toFixed(6));
            window.location.hash = "speed=" + speed + "&back=" + rgbToHex(back);
            break;
        case 32://space
            break;
        case 83://s
            break;
        case 66://b
            break;
        case 16://shift
        case 17://lctrl
        case 18://alt
            break;
        default:
            console.log(e.which);
            break;
    }
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //angStep = 0;
    
    cx = canvas.width / 2;
    cy = canvas.height / 2;
    maxR = Math.sqrt(cx*cx + cy*cy);
}

function animate() {
    requestAnimFrame(animate);

    //Background colour
    context.fillStyle = convertToRGBA(back, 1);
    context.fillRect(0, 0, canvas.width, canvas.height);

    angStep += speed;
    if (angStep >= 2 * Math.PI) {
        angStep -= 2 * Math.PI;
    }

    var ang = 0, r = 0;

    do {
        var x = (r * Math.cos(ang) + cx);
        var y = (r * Math.sin(ang) + cy);
        var R = Math.sqrt(r / 2);

        //Fill the circle.
        context.beginPath();
        context.arc(x, y, R, 0, 2 * Math.PI, true);
        context.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
        context.fill();

        //Change the angle step.
        ang += angStep;
        //r = r * 1.1;
        r += 0.9;
    } while (r <= maxR + R);
}

function incrementArray(arr) {
    if (arr[2] >= 255) {
        arr[2] = 0;
        arr[1]++;
    } else {
        arr[2]++;
        return arr;
    }

    if (arr[1] >= 255) {
        arr[1] = 0;
        arr[0]++;
    }

    if (arr[0] >= 255) {
        arr[0] = 0;
    }

    return arr;
}

function getHashParams() {

    var hashParams = {},
        e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&;=]+)=?([^&;]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.hash.substring(1);

    while (e = r.exec(q))
       hashParams[d(e[1])] = d(e[2]);

    return hashParams;
}

function parseColour(input) {
    var m;

    //Numeric values are easier to parse than names, so we do those first.
    m = input.match(/^#?([0-9a-fA-F]{3})$/i);
    if(m && typeof m !== 'undefined') {
        // in three-character format, each value is multiplied by 0x11 to give an
        // even scale from 0x00 to 0xff
        return [
            parseInt(m[1].charAt(0),16)*0x11,
            parseInt(m[1].charAt(1),16)*0x11,
            parseInt(m[1].charAt(2),16)*0x11
        ];
    }

    //Now for the full 6-digit format.
    m = input.match(/^#?([0-9a-fA-F]{6})$/i);
    if(m && typeof m !== 'undefined') {
        return [
            parseInt(m[1].substr(0,2),16),
            parseInt(m[1].substr(2,2),16),
            parseInt(m[1].substr(4,2),16)
        ];
    }

    //Optionally, you can also add support for rgba format.
    m = input.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if(m && typeof m !== 'undefined') {
        return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
    }

    //Finally, the named colours.
    for(var i = 0; i < cssNames.length; i++) {
        if (cssNames[i][0].toUpperCase() === input.toUpperCase()) {
            return [ cssNames[i][1].Red, cssNames[i][1].Green, cssNames[i][1].Blue ];
        }
    }
}