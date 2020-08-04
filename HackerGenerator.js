var fileNames = [
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
var filePath = [
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
var webpages = ["google.com","facebook.com","youtube.com","yahoo.com","apple.com","amazon.com","amazon.com","twitter.com","live.com","instagram.com","reddit.com","netflix.com","linkedin.com","twitch.tv","microsoft.com","ebay.com","google.co.uk","quora.com","bing.com",""];
var SHALengths = [160,160,224,256];
var strings = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
var binarys = ["0000","0001","0010","0011","0100","0101","0110","0111","1000","1001","1010","1011","1100","1101","1110","1111"];
var passwords = [
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
var passnumbers = [
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
/**
 * Generates hexadecimal string with input length
 */
function GenerateHexa(length) {
    var out="";
    for(var i=0;i<length;i++) out+=strings[Math.floor(Math.random()*16)];
    return out;
 }
/**
 * Returns binary representation of hexadecimal
 * @param hex {string} Hexadecimal
 * @return {string} Binary
 */
function HexToBinary(hex) {
    var out="";
    for(var i=0;i<hex.length;i++) {
        //If number
        if(hex.charCodeAt(i)>47&&hex.charCodeAt(i)<58) out+=binarys[hex.charCodeAt(i)-48];
        //If uppercase letter
        else out+=binarys[hex.charCodeAt(i)-55];
    }
    return out;
 }
function GenerateIPv4() {
    var out="";
    for(var i=0;i<4;i++) {
        var o="000"+Math.floor(Math.random()*256).toString();
        out+=(i!=0?".":"")+o.substr(o.length-3,3);
    }
    return out;
 }
function GenerateIPv6() {
    var out="";
    for(var i=0;i<32;i++) out+=(i%4==0&&i!=0?":":"")+strings[Math.floor(Math.random()*16)];
    return out;
 }
function GenerateLocalIPv4() {
    return "10.0.0."+Math.floor(Math.random()*253+2).toString();
 }
function GeneratePassword() {
    var out=passwords[Math.floor(Math.random()*passwords.length)]+passnumbers[Math.floor(Math.random()*passnumbers.length)];
    //Switch characters with similar looking characters randomly
    for(var i=0;i<out.length;i++) {
        if(Math.floor(Math.random()*4)==0) {
            //Switch "O" and "0"
            if(out.charAt(i)=="o") out.substr(0,i)+"0"+out.substr(i+1);
            else if(out.charAt(i)=="0") out.substr(0,i)+"O"+out.substr(i+1);

            //Switch "e" and "3"
            if(out.charAt(i)=="e") out.substr(0,i)+"3"+out.substr(i+1);
            else if(out.charAt(i)=="3") out.substr(0,i)+"e"+out.substr(i+1);

            //Switch "i" and "1"
            if(out.charAt(i)=="1") out.substr(0,i)+"i"+out.substr(i+1);
            else if(out.charAt(i)=="i") out.substr(0,i)+"1"+out.substr(i+1);

            //Switch "a" and "@"
            if(out.charAt(i)=="a") out.substr(0,i)+"@"+out.substr(i+1);
            else if(out.charAt(i)=="@") out.substr(0,i)+"a"+out.substr(i+1);

            //Switch "l" and "1"
            if(out.charAt(i)=="l") out.substr(0,i)+"1"+out.substr(i+1);
            else if(out.charAt(i)=="1") out.substr(0,i)+"l"+out.substr(i+1);
        }
    }
    //Switch lowercase with uppercase randomly
    for(i=0;i<out.length;i++) if(out.charCodeAt(i)>96&&out.charCodeAt(i)<123&&Math.floor(Math.random()*10)==0) {
        out=out.substr(0,i)+String.fromCharCode(out.charCodeAt(i)-32)+out.substr(i+1);
    }
    return out;
 }
function print(str) {
    document.getElementById("console").innerHTML+=str;
}
var output=[];
var input=[];
var timeouts=[];
var i1=0;
var x1=0;
var cdel=0;
onload=function() {
    GenerateOutput();
    runline(0);
}
function GenerateFilePath() {
    return filePath[Math.floor(Math.random()*filePath.length)]+fileNames[Math.floor(Math.random()*fileNames.length)]+[".exe",".exe",".exe",".exe",".exe",".dll",".jar",".app",".js",".rar",".xml",".bat",".bat",".bin",".bin",".py",".cpp",".php",".sh",".sh",".sys",".sys",".txt"][Math.floor(Math.random()*23)];
}
function GenerateOutput() {
    print("C:\\Users\\Hacker102> ");
    var i=0,a=0;
    var SHA=0;
    var address="C:\\Users\\Hacker102> ";
    for(i=0;i<100;i++) {
        a=Math.floor(Math.random()*55);
        if(a==0) {//HIDE
            input[i]="HIDE";
            output[i]="<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>Microsoft Windows [Version 10.0.17763.379]<br>(c) 2018 Microsoft Corporation. All rights reserved.<br><br>C:\\Users\\NormalPerson> color A<br>C:\\Users\\Hacker102> ";
         }
        if(a>0&&a<4) {//get address ipv6
            input[i]="GetAddress ipv6";
            output[i]="";
            //Add one to three IPv6 addresses
            for(var x=0;x<Math.floor(Math.random()*3)+1;x++) output[i]+="    "+GenerateIPv6()+"<br>";
            output[i]+=address;
         }
        if(a>3&&a<7) {//get address ipv4
            input[i]="GetAddress ipv4";
            output[i]="";
            //Add one to three IPv4 addresses
            for(var x=0;x<Math.floor(Math.random()*3)+1;x++) output[i]+="    "+GenerateIPv4()+"<br>";
            output[i]+=address;
         }
        if(a>6&&a<13) {//sendData
            input[i]="sendData "+GenerateHexa(Math.floor(Math.random()*50)+10);
            output[i]=address;
         }
        if(a>12&&a<22) {//intercept (ip)
            input[i]="intercept "+GenerateIPv4();
            if(Math.random>0.5) output[i]="Intercepted Data: "+GenerateHexa(Math.floor(Math.random()*90)+15);
            else output[i]="Firewall Blocked";
            output[i]+="<br>C:\\Users\\Hacker102> ";
         }
            input[i]=GenerateFilePath();
            if(Math.random()>0.8) {
                if(Math.random()>0.3) output[i]="<span style=\"color:#ff0000\">Error on line "+Math.floor((1/Math.random())*100-100)+": "+["unknown error","I/O error","variable '"+["hello","object","item","network1","qwerty","time","var"][Math.floor(Math.random()*7)]+"' does not exist","function '"+["crackSHA","networkList","PHP","PM","TypeFind","Generate3"][Math.floor(Math.random()*6)]+"' does not exist","memory overflow","stack overflow","network disconnected","header file missing","cannot divide by zero","missing semicolon",""][Math.floor(Math.random()*10)]+"</span><br>"+address;
                else output[i]="<span style=\"color:#ff0000\">Error: file does not exist</span><br>"+address;
         }
            else output[i]="Program run successfully<br>"+address; 
        if(a>30&&a<38) {//crack password
            SHA=Math.floor(Math.random()*SHALengths.length);
            input[i]="crack SHA"+SHALengths[SHA].toString()+" ";
            input[i]+=GenerateHexa(SHALengths[SHA]/4);
            output[i]="Password is: "+GeneratePassword()+"<br>C:\\Users\\Hacker102> ";
         }
            input[i]="hostFile "+GenerateLocalIPv4()+" "+GenerateFilePath();
            output[i]=address;
         }
        if(a>39&&a<47) {//convertToBinary
            var hex=GenerateHexa(10);
            input[i]="convertToBinary "+hex;
            output[i]="Binary: "+HexToBinary(hex)+"<br>C:\\Users\\Hacker102> ";
         }
        if(a>46&&a<55) {//access (ip)
            input[i]="access "+GenerateIPv6();
            if(Math.random()<0.6666) output[i]="ACCESS DENIED<br>";
            else output[i]="ACCESS GRANTED<br>";
            output[i]+=address;
        }
     }
    for(i=0;i<100;i++) {
        timeouts[i]=[];
        var x=0;
        //Calculate delays between characters
        for(x=0;x<input[i].length;x++) {
            var del=100;
            //If space
            if(input[i].charCodeAt(x)==32) del=10;
            //If uppercase or lowercase
            if((input[i].charCodeAt(x)<123&&input[i].charCodeAt(x)>96)||(input[i].charCodeAt(x)>65&&input[i].charCodeAt(x)<91)) del=40;
            //If lowercase and previous character is uppercase
            if(input[i].charCodeAt(x)>65&&input[i].charCodeAt(x)<91&&((input[i].charCodeAt(x-1)<123&&input[i].charCodeAt(x-1)>96)||(input[i].charCodeAt(x-1)==92))) del=75;
            //If numeral
            if(input[i].charCodeAt(x)>47&&input[i].charCodeAt(x)<57) del=40;
            timeouts[i][x]=del;
        }
     }
 }
function runline(i) {
    CurrentDelay=0;
    //setTimeout characters
    for(var j=0;j<input[i].length;j++) {
        setTimeout(printchar,CurrentDelay+timeouts[i][j],i,j);
        CurrentDelay+=timeouts[i][j];
    }
    //Output
    var OutNum=i;
    setTimeout(function() {print("<br>"+output[OutNum]);},CurrentDelay+100);
    if(input[i]=="HIDE") CurrentDelay+=2000;
    //Run next line
    setTimeout(function() {runline(i+1);},CurrentDelay+300);
}
function printchar(i,x) {
    print(input[i][x]);
}