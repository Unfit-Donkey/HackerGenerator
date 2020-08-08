var displaySpeed = 1;
var globalTimeout = [];
class Function {
    constructor(probability, delay, func) {
        this.probability = probability;
        this.delay = delay;
        this.func = func;
    }
}
var functions = [
    //Hide
    new Function(1, 1000, _ => {
        return ["HIDE", "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>Microsoft Windows [Version 10.0.17763.379]<br>(c) 2018 Microsoft Corporation. All rights reserved.<br><br>C:\\Users\\NormalPerson> color A"];
    }),
    //getAddress IPv6
    new Function(3, 120, _ => {
        let out = "";
        let ipQuantity = RandomInt(2, 8);
        for(let x = 0; x < ipQuantity; x++) out += (x == 0 ? "" : "<br>") + "|    " + GenerateIPv6();
        return ["GetAddress ipv6", out];
    }),
    //getAddress IPv4
    new Function(3, 120, _ => {
        let out = "";
        //Add two to four IPv4 addresses
        let ipQuantity = RandomInt(2, 8);
        for(let x = 0; x < ipQuantity; x++) out += (x == 0 ? "" : "<br>") + "|    " + GenerateIPv4();
        return ["GetAddress ipv4", out];
    }),
    //send Data
    new Function(3, 10, _ => ["sendData " + GenerateHexa(RandomInt(10, 60)), ""]),
    //Intercept (ip)
    new Function(6, 300, _ => {
        let out;
        if(Math.random() > 0.7) out = "Intercepted Data: " + GenerateHexa(RandomInt(90, 115));
        else out = "||||<span style=\"color:#ff0000\">Firewall Blocked</span>";
        return ["intercept " + GenerateIPv4(), out];
    }),
    //Run program
    new Function(15, 10, _ => {
        return [GenerateFilePath(), Math.random() > 0.8 ? GenerateError() : "Program run successfully"];
    }),
    //Crack password
    new Function(7, 60, _ => {
        let SHA = RandomMember(SHALengths);
        return ["crackPasword SHA" + SHA.toString() + " " + GenerateHexa(SHA / 4), "Password is: ||||||||||" + GeneratePassword()];
    }),
    //Host file
    new Function(7, 40, _ => ["hostFile " + GenerateLocalIPv4() + " " + GenerateFilePath(), ""]),
    //Convert to binary
    new Function(2, 300, _ => {
        let hex = GenerateHexa(RandomInt(10, 15));
        return ["convertToBinary " + hex, "Binary: |" + HexToBinary(hex)];
    }),
    //access (ip)
    new Function(10, 40, _ => {
        let out;
        if(Math.random() < 0.6666) out = "||||<span style=\"color:#ff0000\">ACCESS DENIED</span>";
        else out = "|||ACCESS GRANTED";
        return ["access " + GenerateIPv6(), out];

    }),
    //login
    new Function(15, 20, _ => {
        return ["login " + RandomMember(webpages) + " " + GenerateEmailAddress() + " " + GeneratePassword(),
        randomInaccurate() > 0.6 ? "|||<span style=\"color:#ff0000\">ACCESS DENIED</span>" : "Access Granted"];
    }),
    //Ping
    new Function(10, 10, _ => {
        let input;
        let ip = GenerateIPv6();
        if(randomInaccurate() > 0.5) input = ip;
        else input = RandomMember(webpages);
        let out = "Pinging " + input;
        let packets = RandomInt(3, 7);
        if(input != ip) out += "[" + ip + "]";
        out += " with "+packets+" packets|||<br>";
        let ms = [];
        let average = 0,min=100,max=0;
        for(let i = 0; i < packets; i++) {
            ms[i] = RandomInt(10, 80);
            if(ms[i] > max) max = ms[i];
            if(ms[i] < min) min = ms[i];
            average += ms[i] / packets;

            out += "|||||Reply " + i + " took " + ms[i] + " ms<br>";
        }

        out += "||||Minimum: " + min + ", Maximum: " + max + ", Average: " + Math.floor(average*10)/10;

        return ["ping "+input,out]
    })
];
//Generated onload
var functionProbabilitySum=0;
class Line {
    /**
     * Returns a randomly generated line
     * @constructor
     * @return {Line} New line
     */
    constructor() {
        this.output="";
        this.input="";
        //Generate input and output
        let functionType = RandomInt(0, functionProbabilitySum);
        let runningTotal = 0;
        this.functionIndex = -1;
        for(let i = 0; i < functions.length; i++) {
            let prob = functions[i].probability;
            if(functionType >= runningTotal && functionType < runningTotal + prob) {
                this.functionIndex = i;
                let result = functions[i].func();
                this.input = result[0];
                this.output = result[1] + ((result[1] != "") ? "<br>" : "");
                break;
            }
            runningTotal += prob;
        }
        if(this.functionIndex == -1) throw "Error: " + functionType + " is out of the function range.";
        //Generate Timeout
        this.timeout=[];
        for(let x=0;x<this.input.length;x++) {
            let delay=100;
            let char=this.input.charCodeAt(x);
            let charPrev=this.input.charCodeAt(x-1);
            //If space
            if(char==32) delay=10;
            //If uppercase or lowercase
            else if((char<123&&char>96)||(char>65&&char<91)) delay=40;
            //If lowercase and previous character is uppercase
            else if(char>65&&char<91&&((charPrev<123&&charPrev>96)||(charPrev==92))) delay=75;
            //If numeral
            else if(char>47&&char<57) delay=40;
            this.timeout[x]=delay;
        }
    }
    Display() {
        globalTimeout=[];
        let currentDelay=0;
        //setTimeout characters
        for(let i=0;i<this.input.length;i++) {
            globalTimeout[i]=setTimeout(print,(currentDelay+this.timeout[i])/displaySpeed,this.input[i]);
            currentDelay+=this.timeout[i];
        }
        let outputs = this.output.split("|");
        outputs[0] = "<br>" + outputs[0];
        for(let i = 0; i < outputs.length; i++) {
            globalTimeout.push(setTimeout(print, (currentDelay + 50)/displaySpeed, outputs[i]));
            currentDelay += 100;
        }
        globalTimeout.push(setTimeout(print, currentDelay/displaySpeed, address));
        //Output

        currentDelay+=functions[this.functionIndex].delay;
        //Generate and display next line
        let line=new Line();
        globalTimeout.push(setTimeout(line.Display.bind(line),(currentDelay+500)/displaySpeed));
    }
}
//#region Random Numbers
//This uses the RC4 method (https://en.wikipedia.org/wiki/RC4), which is good enough for this use case.
var globalSeed;
var randomState=[];
var randomIndex=0;
var randomIndex2=0;
function stringToSeed(seed) {
    let out=[];
    for(let i = 0; i < seed.length / 2; i++) {
        out[i]=parseInt(seed.substring(i*2,i*2+2),16);
    }
    return out;
}
function seedToString(seed) {
    let out = "";
    for(let i = 0; i < seed.length; i++) out += ("00" + seed[i].toString(16)).slice(-2);
    return out;
}
/**
 * Seeds the random number generator and sets it to default
 * @param {array} seed A mod 256 number array or string
 */
function seedRandom(seed) {
    if(typeof seed === "string") seed = stringToSeed(seed);
    globalSeed = seed;
    randomIndex = 0;
    randomIndex2 = 0;
    let seedLength=seed.length;
    randomState=[];
    for(let i=0;i<256;i++) randomState[i]=i;
    let j=0;
    for(let i=0;i<256;i++) {
        j=(j+randomState[i]+seed[i%seedLength])%256;
        let temp=randomState[i];
        randomState[i]=randomState[j];
        randomState[j]=temp;
    }
}
/**
 * Returns the next random number in the pattern and changes the
 * @return {number} Pseudorandom number from 0 to 255 inclusive
 */
function getRandomByte() {
    randomIndex=(randomIndex+1)%256;
    randomIndex2=(randomIndex2+randomState[randomIndex])%256;
    let temp=randomState[randomIndex];
    randomState[randomIndex]=randomState[randomIndex2];
    randomState[randomIndex2]=temp;
    return randomState[(randomState[randomIndex]+randomState[randomIndex2])%256];
}
var oldRandom=Math.random;
Math.random=function() {
    let out=getRandomByte()/256;
    out+=getRandomByte()/65536;
    out+=getRandomByte()/16777216;
    out+=getRandomByte()/4294967296;
    out+=getRandomByte()/1099511627776;
    out+=getRandomByte()/281474976710656;
    //Edge case
    if(out==1) return 0.99999999999;
    return out;
}
function randomInaccurate() {
    return getRandomByte() / 255;
}
/**
 * Generate a random integer from min to max
 * @param {number} min Inclusive minimum
 * @param {number} max Exclusive maximum
 * @return {number} Random int from min to max
 */
function RandomInt(min,max) {
    return Math.floor(Math.random()*(max-min)+min);
}
/**
 * Returns a random element of an array
 * @param array An array to pick the element from
 * @return random element from the array
 */
function RandomMember(array) {
    return array[Math.floor(Math.random()*array.length)];
}
//#endregion
//#region Names
const fileNames = [
    "/scam",
    "/botnet",
    "/sendemail",
    "/emailRetrieval",
    "/a7d12",
    "/afhh1928",
    "/intercept",
    "/RewireNetwork",
    "/Email-Attachment-File",
    "/file",
    "/keylog",
    "/cookieretrieval",
    "/privatenetwork",
    "/hud",
    "/newVPN",
    "/fileshare",
    "/hotspot",
    "/networkadapter",
    "/wifibreach",
    "/proxy",
];
const filePaths = [
    "C:/Users/Hacker102/Documents",
    "C:/Users/Hacker102/Downloads",
    "C:/Users/Hacker102/Music",
    "C:/Program Files/HackSoft",
    "C:/Users/Hacker102/Music/NotHacking",
    "C:/Users/Hacker102/Pictures/Nothing/In/This/Folder",
    "C:/Users/NormalPerson/Downloads",
    "C:/Program Files/Java",
    "C:/Program Files/Internet Explorer",
    "C:/Windows/Shell",
    "C:/Windows/Temp",
    "C:/Windows/System",
];
const fileExtensions = [".exe",".exe",".exe",".exe",".exe",".dll",".jar",".app",".js",".rar",".xml",".bat",".bat",".bin",".bin",".py",".cpp",".php",".sh",".sh",".sys",".sys",".txt"];
const webpages = ["google.com","facebook.com","youtube.com","yahoo.com","apple.com","amazon.com","amazon.com","twitter.com","live.com","instagram.com","reddit.com","netflix.com","linkedin.com","twitch.tv","microsoft.com","ebay.com","google.co.uk","quora.com","bing.com"];
const passwords = [
    "password",
    "password1",
    "qwertyuiop",
    "asdfghjkl",
    "zxcvbnm",
    "hello",
    "admin",
    "!@#$%^&*",
    "google",
    "1q2w3e4r5t",
    "mnbvcxz",
    "facebook",
    "bing",
    "yahoo",
    "mypassword",

];
const passnumbers = [
    "1234",
    "12345",
    "54321",
    "13579",
    "24680",
    "02468",
    "000",
    "999",
    "420",
    "69",
];
const emailWebsites = ["gmail.com", "gmail.com", "gmail.com", "aol.com", "outlook.com", "icloud.com", "yahoo.com", "yahoo.com", "comcast.net"];
const websiteExtensions = [".com", ".com", ".com", ".net", ".net", ".org", ".org", ".gov", ".edu", ".ca", ".us", ".co.uk"];
//#endregion
//#region Word Generation
//Combinations of two vowels
const wordDipthongs = ["ai", "au", "aw", "ea", "ee", "ei", "ew", "ia", "ie", "oa", "oi", "oo", "ow", "ua", "ui", "uo"];
//Combinations of two consonants
const wordDigraphs = ["br", "ch", "ck", "cr", "ct", "dg", "dr", "ff", "gh", "gr", "kn", "kr", "mn", "ng", "ph", "pn", "pr", "pt", "qu", "sh", "sh", "tr","th", "wh", "wr", "xi"];
const wordVowels = ["a", "a", "e", "e", "e", "i", "i", "o", "o", "u"];
//J, Q, and Z are excluded because they are rare.
const wordConsonants = ["b", "c", "d", "d", "f", "g", "h", "h", "h", "k", "l", "l", "m", "n", "n", "n", "p", "r", "r", "r", "r", "s", "s", "s", "t", "t", "t", "t", "t", "v", "w"];
function GenerateRandomWord(length) {
    //30% chance to start with a vowel
    let useVowel = randomInaccurate() < 0.3;
    let out = "";
    for(var i = 0; i < length; i++) {
        let allow = true;
        //30% chance to use two characters
        if(randomInaccurate() < 0.3 && i < length - 1) {
            let letters = RandomMember(useVowel ? wordDipthongs : wordDigraphs);
            //Prevent certain options when it is the last or first character
            if(i == length - 2) {
                if(letters.charAt(1) == "r") allow = false;
                if(letters == "kn" || letters == "qu" || letters == "wh") allow = false;
            }
            if(i == 0) {
                if(letters == "pn" || letters == "ng" || letters == "mn" || letters == "dg" || letters == "ff" || letters == "ck" || letters == "gh") allow = false;
                if(useVowel) allow = false;
            }
            if(!allow) { i--; continue; }
            out += letters;
            i++;
        }
        else {
            let char = RandomMember(useVowel ? wordVowels : wordConsonants);
            let prevchar = out.charAt(out.length - 1);
            if(i == length - 1 && char == "i") allow = false;
            if(char == "h" && wordVowels.includes(prevchar)) allow = false;
            if(!allow) { i--; continue; }
            out += char;
        }
        useVowel = !useVowel;
    }
    return out;

}
//#endregion
//#region Constants
const SHALengths = [160,160,224,256];
const hexCharacters = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
const binarys = ["0000","0001","0010","0011","0100","0101","0110","0111","1000","1001","1010","1011","1100","1101","1110","1111"];
//#endregion
//#region Generation Functions
/**
 * Generates hexadecimal string with input length
 * @param {number} length Number of hexadecimal characters
 * @return {string} length number of randomly generated characters
 */
function GenerateHexa(length) {
    let out="";
    for(let i=0;i<length;i++) {
        out+=hexCharacters[getRandomByte()%16];
    }
    return out;
}
/**
 * Returns binary representation of hexadecimal
 * @param {string} hex Hexadecimal
 * @return {string} Binary
 */
function HexToBinary(hex) {
    let out="";
    for(let i=0;i<hex.length;i++) {
        let charCode=hex.charCodeAt(i);
        //If number
        if(charCode>47&&charCode<58) out+=binarys[charCode-48];
        //If uppercase letter
        else out+=binarys[charCode-55];
    }
    return out;
}
//Caches save the most recently used IP addresses and passwords to make the lines seem related
var passwordCache=[];
var IPv6Cache = [];
var IPv4Cache = [];
var emailCache = [];
/**
 * Returns a string that represents an IPv4 address
 * @return {string} IP address
 */
function GenerateIPv4() {
    //The IPv4 format is xxx.xxx.xxx.xxx where xxx is a number from 0 to 256
    let out = "";
    if(getRandomByte() > 128) return RandomMember(IPv4Cache);
    for(let i=0;i<4;i++) {
        if(i!=0) out+=".";
        let num="000"+getRandomByte().toString();
        out+=num.substr(-3);
    }
    IPv4Cache.push(out);
    if(IPv4Cache.length>10) IPv4Cache.shift();
    return out;
}
/**
 * Returns a string that represents an IPv6 address
 * @return {string} IPv6 address
 */
function GenerateIPv6() {
    //The IPv6 format is xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx where x is a random hexadecimal character
    let out = "";
    if(getRandomByte() > 128) return RandomMember(IPv6Cache);
    for(let i=0;i<32;i++) {
        if(i%4==0&&i!=0) out+=":";
        out+=hexCharacters[getRandomByte()%16];
    }
    IPv6Cache.push(out);
    if(IPv6Cache.length>10) IPv6Cache.shift();
    return out;
}
/**
 * Returns a string that represents a local IPv4 in the format 10.0.0.x
 * @return {string} IP address
 */
function GenerateLocalIPv4() {
    return "10.0.0."+getRandomByte().toString();
}
/**
  * Returns a randomly generated password
  * @return {string} Password
  */
function GeneratePassword() {
    let out="";
    //Use the cache
    if(getRandomByte() > 128) return RandomMember(passwordCache);
    //Else generate a new password
    else {
        if(randomInaccurate() > 0.3) out += RandomMember(passwords);
        else out += GenerateRandomWord(RandomInt(5,7));
        if(randomInaccurate() > 0.4) out += RandomMember(passnumbers);
        else out += Math.floor(0.5 / (Math.random() + 0.05)).toString();
        //Switch characters with similar looking characters randomly
        for(let i=0;i<out.length;i++) {
            //Swap with similar characters
            if(RandomInt(0,4)==0) {
                let char=out.charAt(i);
                //Switch "O" and "0"
                if(char=="o") out.substr(0,i)+"0"+out.substr(i+1);
                else if(char=="0") out.substr(0,i)+"O"+out.substr(i+1);

                //Switch "e" and "3"
                if(char=="e") out.substr(0,i)+"3"+out.substr(i+1);
                else if(char=="3") out.substr(0,i)+"e"+out.substr(i+1);

                //Switch "i" and "1"
                if(char=="1") out.substr(0,i)+"i"+out.substr(i+1);
                else if(char=="i") out.substr(0,i)+"1"+out.substr(i+1);

                //Switch "a" and "@"
                if(char=="a") out.substr(0,i)+"@"+out.substr(i+1);
                else if(char=="@") out.substr(0,i)+"a"+out.substr(i+1);

                //Switch "l" and "1"
                if(char=="l") out.substr(0,i)+"1"+out.substr(i+1);
                else if(char=="1") out.substr(0,i)+"l"+out.substr(i+1);
            }
            //Switch lowercase with uppercase randomly
            let charCode=out.charCodeAt(i);
            if(charCode>96&&charCode<123&&randomInaccurate()>0.9) {
                out=out.substr(0,i)+String.fromCharCode(charCode-32)+out.substr(i+1);
            }
        }
        passwordCache.push(out);
        if(passwordCache.length > 10) passwordCache.shift();
    }
    return out;
}
/**
  * Generates a file path in the form of filePath + fileName + fileExtension
  * @return {string} File path
  */
function GenerateFilePath() {
    return RandomMember(filePaths)+RandomMember(fileNames)+RandomMember(fileExtensions);
}
/**
 * Generates an error
 */
function GenerateError() {
    let out = "<span style=\"color:#ff0000\">";
    if(Math.random() > 0.3) {
        let line = Math.floor((1 / Math.random()) * 100 - 100);
        out = "Error on line " + line + ": " + RandomMember(["unknown error", "I/O error", "variable '" + RandomMember(["hello", "object", "item", "network1", "qwerty", "time", "var"]) + "' does not exist", "function '" + RandomMember(["crackSHA", "networkList", "PHP", "PM", "TypeFind", "Generate3"]) + "' does not exist", "memory overflow", "stack overflow", "network disconnected", "header file missing", "cannot divide by zero", "missing semicolon", ""]);
    }
    else out = "Error: file does not exist";
    return out + "</span>";
}
function GenerateEmailAddress() {
    if(randomInaccurate() > 0.5) return RandomMember(emailCache);
    else {
        let out = "";
        //40% chance for Initials
        if(randomInaccurate() > 0.6) {
            //Add a random lowercase letter 2 or 3 times
            var times = RandomInt(2, 4);
            let capital = randomInaccurate() > 0.5 ? 97 : 65;
            for(var i = 0; i < times; i++) out += String.fromCharCode(RandomInt(capital, capital + 26));
        }
        //else random word
        else out += GenerateRandomWord(RandomInt(3, 8));
        //Add a number at the end in a way where higher numbers are rarer
        if(randomInaccurate() > 0.1) out += RandomMember(["","_","-"]) + Math.floor(1 / Math.random() + 0.001);
        //Website suffix
        out += "@";
        if(randomInaccurate() > 0.3) out += RandomMember(emailWebsites);
        else out += GenerateRandomWord(RandomInt(4, 8)) + RandomMember(websiteExtensions);
        //Return
        emailCache.push(out);
        if(emailCache.length > 10) emailCache.shift();
        return out;
    }
}
//#endregion
const address="C:\\Users\\Hacker102> ";
onload = function(event, seed) {
    functionProbabilitySum = 0;
    for(let i = 0; i < functions.length; i++) functionProbabilitySum += functions[i].probability;
    if(typeof seed != "object" && typeof seed != "string") {
        seed=[];
        for(let i = 0; i < 40; i++) seed[i] = Math.floor(oldRandom() * 256);
    }
    seedRandom(seed);
    console.log("seed: ",seedToString(globalSeed));
    for(let i = 0; i < 10; i++) {
        IPv4Cache[i]=GenerateIPv4();
        IPv6Cache[i]=GenerateIPv6();
        passwordCache[i] = GeneratePassword();
        emailCache[i] = GenerateEmailAddress();
    }
    print(address);
    new Line().Display();
}
/**
 * This function can be used instead of reloading the page (just calls onload again)
 * @param {string} seed Seed to start the random number generator with
 */
function Reset(seed) {
    if(seed == null) seed = globalSeed.slice();
    for(let id of globalTimeout) clearTimeout(id);
    document.getElementById("console").innerHTML = "";
    onload(event, seed);
}
/**
  * Prints a string to the console
  * @param {string} str String to print
  * @return null
  */
function print(str) {
    let html = document.getElementById("console").innerHTML;
    html += str;
    if(html.length > 6000) html = html.substring(html.length-5000);
    document.getElementById("console").innerHTML = html;
}
