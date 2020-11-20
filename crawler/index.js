const axios = require('axios').default;
const fs = require('fs');
const githubCreds = require('./credentials.js');

let numOfPages = 4;
let users = ["VikVelev", "wangyida", "lyuben-todorov", "nikifaets", "zvezdin"]
let userToId = { "VikVelev" : 0, "wangyida" : 1, "lyuben-todorov": 2, "nikifaets": 3, "zvezdin": 4 }

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
        data = data.map(x => x.id)
        adjList[currentUser] = data;
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