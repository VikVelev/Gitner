const axios = require('axios').default;
const fs = require('fs');
const githubCreds = require('./credentials.js');

let numOfPages = 4;
let users = ["VikVelev", "wangyida", "lyuben-todorov", "nikifaets", "zvezdin", "harshitsinghai77"]
let userToId = { "VikVelev" : 0, "wangyida" : 1, "lyuben-todorov": 2, "nikifaets": 3, "zvezdin": 4, "harshitsinghai77": 5 }
let items = {
    "313907014" :0,
    "309142471" :1,
    "105590837" :2,
    "292541788" :3,
    "302926814" :4,
    "123235" :5,
    "302050767" :6,
    "239201565" :7,
    "314321436" :8,
    "210187897" :9,
    "287064874" :10,
    "287086670" :11,
    "305531165" :12,
    "295803355" :13,
    "230105785" :14,
    "105822413":15,
    "306693544" :16,
    "247161307" :17,
    "279966275" :18,
    "220065188" :19,
    "11512043" :20,
    "27609918" :21,
    "240920902" :22,
    "296741564" :23,
    "52729242" :24,
    "110178895" :25,
    "36040894" :26,
    "305204141" :27,
    "287597740" :28,
    "172562475" :29,
    "313085547" :30,
    "312798229" :31,
    "311338155" :32,
    "312337313" :33,
    "179663462" :34,
    "309636647" :35,
    "226452642" :36,
    "62852742" : 37,
    "6701057" : 38,
    "278406578" : 39
}

let extractData = async () => {
    let adjList = {}
    let dataWithUrls = []

    for (let k = 0; k < users.length; k++) {
        let currentUser = users[k];
        let data = []
        
        for (let i = 0; i < numOfPages; i++) {
            let res = await axios({
                method: "get",
                url: `https://api.github.com/users/${currentUser}/events\?page\=${i}`,
                headers: {
                    "Authorization": `token ${githubCreds}`
                }
            })
            data.push(...res.data)
        }

        data = data.filter(x => x.type === "PushEvent" || 
                                x.type === "CreateEvent" || 
                                x.type === "IssueCommentEvent" || 
                                x.type === "IssuesEvent" || 
                                x.type === "PullRequestEvent" ||
                                x.type === "ForkEvent" ||
                                x.type === "PullRequestReviewEvent" ||
                                x.type === "PullRequestReviewCommentEvent").map(x => x.repo)
        
        
        dataWithUrls.push(...data);
        data = new Set([...data.map(x => items[x.id + ""])])
        adjList[currentUser] = [...data];
    }
    
    let trainingFile = ""
    let trainingMap = []
    
    for (const key in adjList) {
        if (adjList.hasOwnProperty(key)) {
            trainingFile += userToId[key] + " " + adjList[key].join(" ");
        }
        trainingFile += "\n"
    }

    let itemMapping = "";

    let dataSet = new Set();

    dataWithUrls.forEach((x) => dataSet.add(x.id))

    dataSet = [...dataSet]

    for (let i = 0; i < dataSet.length; i++) {
        itemMapping += dataSet[i] + " " + i +"\n";
    }

    let userMapping = "";

    for (let i = 0; i < users.length; i++) {
        userMapping += users[i] + " " + i + "\n";
    }

    fs.writeFileSync('user_adj_list.json', JSON.stringify(adjList))
    fs.writeFileSync('data_with_urls.json', JSON.stringify(dataWithUrls))
    fs.writeFileSync('training.txt', trainingFile)
    fs.writeFileSync('item_mapping.txt', itemMapping)
    fs.writeFileSync('user_mapping.txt', userMapping)
}


extractData();
