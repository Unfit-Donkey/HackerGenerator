var globalTimeout=[];
class Line {
    /**
     * Returns a randomly generated line
     * @constructor
     * @return {Line} New line
     */
    constructor() {
        this.output="";
        //Generate input and output
        let a=RandomInt(0,55);
        if(a==0) {//HIDE
            this.input="HIDE";
            this.output="<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>Microsoft Windows [Version 10.0.17763.379]<br>(c) 2018 Microsoft Corporation. All rights reserved.<br><br>C:\\Users\\NormalPerson> color A<br>";
        }
        if(a>0&&a<4) {//get address ipv6
            this.input="GetAddress ipv6";
            this.output="";
            //Add two to four IPv6 addresses
            let ipQuantity=RandomInt(2,5);
            for(let x=0;x<ipQuantity;x++) this.output+="    "+GenerateIPv6()+"<br>";
        }
        if(a>3&&a<7) {//get address ipv4
            this.input="GetAddress ipv4";
            this.output="";
            //Add two to four IPv4 addresses
            let ipQuantity=RandomInt(2,5)
            for(let x=0;x<ipQuantity;x++) this.output+="    "+GenerateIPv4()+"<br>";
        }
        if(a>6&&a<10) {//sendData
            this.input="sendData "+GenerateHexa(RandomInt(10,60));
        }
        if(a>9&&a<16) {//intercept (ip)
            this.input="intercept "+GenerateIPv4();
            if(Math.random()>0.7) this.output="Intercepted Data: "+GenerateHexa(RandomInt(90,115));
            else this.output="<span style=\"color:#ff0000\">Firewall Blocked</span>                        <br>";
        }
        if(a>15&&a<31) {//run program
            this.input=GenerateFilePath();
            if(Math.random()>0.8) {
                //Generate an error
                if(Math.random()>0.3) this.output="<span style=\"color:#ff0000\">Error on line "+Math.floor((1/Math.random())*100-100)+": "+RandomMember(["unknown error","I/O error","variable '"+RandomMember(["hello","object","item","network1","qwerty","time","var"])+"' does not exist","function '"+RandomMember(["crackSHA","networkList","PHP","PM","TypeFind","Generate3"])+"' does not exist","memory overflow","stack overflow","network disconnected","header file missing","cannot divide by zero","missing semicolon",""])+"</span><br>";
                else this.output="<span style=\"color:#ff0000\">Error: file does not exist</span><br>";
            }
            else this.output="Program run successfully<br>";
        }
        if(a>30&&a<38) {//crack password
            let SHA=RandomMember(SHALengths);
            this.input="crackPasword SHA"+SHA.toString()+" ";
            this.input+=GenerateHexa(SHA/4);
            this.output="Password is: "+GeneratePassword()+"<br>";
        }
        if(a>37&&a<45) {//hostFile
            this.input="hostFile "+GenerateLocalIPv4()+" "+GenerateFilePath();
        }
        if(a>44&&a<47) {//convertToBinary
            let hex=GenerateHexa(RandomInt(10,15));
            this.input="convertToBinary "+hex;
            this.output="Binary: "+HexToBinary(hex)+"<br>";
        }
        if(a>46&&a<55) {//access (ip)
            this.input="access "+GenerateIPv6();
            if(Math.random()<0.6666) this.output="<span style=\"color:#ff0000\">ACCESS DENIED<br></span>                                 ";
            else this.output="ACCESS GRANTED<br>";
        }
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
            globalTimeout[i]=setTimeout(print,currentDelay+this.timeout[i],this.input[i]);
            currentDelay+=this.timeout[i];
        }
        //Output
        globalTimeout.push(setTimeout(print,currentDelay+100,"<br>"+this.output+address));
        if(this.input=="HIDE") currentDelay+=2000;
        //Generate and display next line
        let line=new Line();
        globalTimeout.push(setTimeout(line.Display.bind(line),currentDelay+300));
    }
}
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
];
const passnumbers = [
    "1234",
    "109",
    "12345",
    "54321",
    "13579",
    "24680",
    "02468",
    "111",
    "000",
    "999",
    "420",
    "69",
    "1",
    "2",
    "0",
];
//#endregion
//#region Constants
const SHALengths = [160,160,224,256];
const hexCharacters = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
const binarys = ["0000","0001","0010","0011","0100","0101","0110","0111","1000","1001","1010","1011","1100","1101","1110","1111"];
//#endregion
//#region Generation Functions
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
/**
 * Generates hexadecimal string with input length
 * @param {number} length Number of hexadecimal characters
 * @return {string} length number of randomly generated characters
 */
function GenerateHexa(length) {
    let out="";
    for(let i=0;i<length;i++) {
        out+=RandomMember(hexCharacters);
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
/**
 * Returns a string that represents an IPv4 address
 * @return {string} IP address
 */
function GenerateIPv4() {
    //The IPv4 format is xxx.xxx.xxx.xxx where xxx is a number from 0 to 256
    let out="";
    for(let i=0;i<4;i++) {
        if(i!=0) out+=".";
        let num="000"+RandomInt(0,256).toString();
        out+=num.substr(-3);
    }
    return out;
}
/**
 * Returns a string that represents an IPv6 address
 * @return {string} IPv6 address
 */
function GenerateIPv6() {
    //The IPv6 format is xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx where x is a random hexadecimal character
    let out="";
    for(let i=0;i<32;i++) {
        if(i%4==0&&i!=0) out+=":";
        out+=RandomMember(hexCharacters);
    }
    return out;
}
/**
 * Returns a string that represents a local IPv4 in the format 10.0.0.x
 * @return {string} IP address
 */
function GenerateLocalIPv4() {
    return "10.0.0."+RandomInt(2,255).toString();
}
/**
  * Returns a randomly generated password
  * @return {string} Password
  */
function GeneratePassword() {
    let out=RandomMember(passwords)
    out+=RandomMember(passnumbers);
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
        if(charCode>96&&charCode<123&&RandomInt(0,10)==0) {
            out=out.substr(0,i)+String.fromCharCode(charCode-32)+out.substr(i+1);
        }
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
//#endregion
const address="C:\\Users\\Hacker102> ";
onload=function() {
    print(address);
    new Line().Display();
}
/**
 * This function can be used instead of reloading the page (just calls onload again)
 */
function Reset() {
    for(let id of globalTimeout) clearTimeout(id);
    document.getElementById("console").innerHTML="";
    onload();
}
/**
  * Prints a string to the console
  * @param {string} str String to print
  * @return null
  */
function print(str) {
    document.getElementById("console").innerHTML+=str;
}
