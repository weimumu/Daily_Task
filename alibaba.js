const axios = require('axios');
const cheerio = require('cheerio')
const nodemailer = require('nodemailer');

let testObj = {
    service: '163',
    username: 'mychat_org@163.com',
    password: 'mychat123',
    to: 'zhengweimumu@163.com',
    title: '你凉了',
    text: '你凉了',
}

async function MyChatSendMail(myObj) {
    let transporter = nodemailer.createTransport({
        service: myObj.service, //163orqq
        auth: {
            user: myObj.username, // generated ethereal user
            pass: myObj.password  // generated ethereal password
        }
    });
    let mailOptions = {
        from: myObj.username, // 发送者
        to: myObj.to, // 接受者,可以同时发送多个,以逗号隔开
        subject: myObj.title, // 标题
        text: myObj.text, //内容
    };
    try {
        await transporter.sendMail(mailOptions);
    } catch (e) {
        throw e;
    }
}

async function test() {
    let result = await axios({
        url: 'https://campus.alibaba.com/myJobApply.htm',
        method: 'get',
        withCredentials: true,
        headers: {
            cookie: 'CNZZDATA1000004808=1296164571-1519868559-%7C1524041543; JSESSIONID=FF6YVL1UQ2-JVEUPHNIR2M9ZWEUEM7R1-HL81V4GJ-3BF4; UM_distinctid=162d7f5b15f67-0760bde4eec027-33657106-13c680-162d7f5b1606eb; cna=VdrwEtaJO0gCAXjsrpcDKAm3; t=123ec08e36e2d2264c2b1ebd5fc8770b; cookie2=12d5058158399dfc70bad25c8a61ff8b; v=0; _tb_token_=f3e001b3661e3; _hvn_login=0; csg=1dd9b0bd; tmp0=owrl4ob19vUBkLFmiZ8EVDOKrAGptCqVha6fvVA0WGB%2BIiyvOzx1Ymj8Wx9jFReOFcYdPEFRc1K7ANyQxsDyadH8oFmXqUfy1GznzC2nODEa6h6VF6uPKT36mSZOeppP94lsCLFtg%2B8AK9H32%2FEDmV73k0znKKwVDA%2BFV97RgqtmWt4RrOsqVDYevXOOAVyQsolEb%2BslGg2faFcPVsKNcwoSK4PvnoTH4YCjKdZalPK6ZQSVd66Uwsg8TkoORT7w; isg=BCgohwEG5hwWoMrY-5G8Umkl-RCWSBmccIp4VOJZdKOWPcinimFc675fMd3NFkQz'
        }
    })
    //console.log(result.data)
    let $ = cheerio.load(result.data)
    $('span.strong-new').each(async function (index, item) {
        if (index === 1) {
            console.log($(item).text())
            if ($(item).text().indexOf('面试中') !== -1) {
                console.log(0)
            } else {
                console.log(1)
                await MyChatSendMail(testObj)
            }
        }
    })
}
test()
setInterval(test, 1000 * 60 * 60)