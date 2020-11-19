const axios = require('axios').default;
const fs = require('fs');
const githubCreds = require('./credentials.js');

let numOfPages = 4;
let users = ["VikVelev", "wangyida", "lyuben-todorov", "nikifaets", "zvezdin"]
let userToId = { "VikVelev" : 1, "wangyida" : 2, "lyuben-todorov": 3, "nikifaets": 4, "zvezdin": 5 }

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
    
    for (const key in adjList) {
        if (adjList.hasOwnProperty(key)) {
            trainingFile += userToId[key] + " " + adjList[key].join(" ");
        }
        trainingFile += "\n"
    }

    fs.writeFileSync('user_adj_list.json', JSON.stringify(adjList))
    fs.writeFileSync('data_with_urls.json', JSON.stringify(dataWithUrls))
    fs.writeFileSync('training.txt', trainingFile)
}


extractData();