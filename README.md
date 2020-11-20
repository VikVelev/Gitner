# Gitner
Tinder but for issues.

MLH Fellowship is a brand new experience for most of the people in here. At first everyone is out of their comfort zone and the impostor syndrome strikes when you expect it the least, wondering if you can handle a certain issue or should you just become a janitor? If that sounds familiar to you, then you might be this project's target audience. gitner (git + Tinder) matches you with the issue from a certain project that is most appropriate to you and your relevant experience!

# Discord Bot

As the best means of integration in the MLH Fellowship!

# Github Crawler

Making heavy use of the GitHub API in order to build the graph of users and their interactions with different repositories and issues.

# Matching/Recommendation Backend
For license and commercial issues please contact [Yida](https://wangyida.github.io/)
We aim at building a more concise and appropriate recommendation backend using *graph convolution network*. Specifically, [LightGCN](https://github.com/kuandeng/LightGCN) is adopted as the matching algorithm, which learns user and item embeddings and potential relationships. Furthermore, we refer to a [parallelized version](https://github.com/Wuyxin/LightGCN-parallelized-version) upon LightGCN to imrpove the inference speed. We are appreciate for original authors of such paper.

## Numerical Performance
We report the performance which are claimed in paper of [LightGCN](https://arxiv.org/pdf/2002.02126.pdf), where benchmarks are reported in 4 publically available datasets. Such quantitative results satisfy our need for building the recommending system which matches Github issues/repos to MLH students.
![quantitatives](imgs/LightGCN_numericals.png)

## Crucial Components
User and Items should be provided as training data, in our scenario, user is github users, while items would be opensource projects/repos with which each user has interacted before.

## Organize your training data 
As there are 2 crucial components in Github issues matching process: *user* and *issues*. Basically we need training data which includes the history of repos/issues/PRs with which each user has interacted. 
Assume that we present 6 users with index of 0, 1, 2, 3, 4, 5; and 20 repos of 0, 1, 2, 3,..., 19: 
* `train.txt`
  * Train file.
  * Each line is a user with her/his positive interactions with items: userID\t a list of itemID\n.

* `test.txt`
  * Test file (positive instances).
  * Each line is a user with her/his positive interactions with items: userID\t a list of itemID\n.
  * Note that here we treat all unobserved interactions as the negative instances when reporting performance.

* `user_list.txt`
  * User file.
  * Each line is a triplet (org_id, remap_id) for one user, where org_id and remap_id represent the ID of the user in the original and our datasets, respectively.

* `item_list.txt`
  * Item file.
  * Each line is a triplet (org_id, remap_id) for one item, where org_id and remap_id represent the ID of the item in the original and our datasets, respectively.


# Materials on Github:
## Github repo
```
org_id remap_id
BentoML 0
OpenCV 1
Open3D 2
Scipy 3
matplotlib 4
tensorflow 5
pytorch 6
0060090375 7
014029628X 8
0385497946 9
0099416158 10
0060194995 11
0060086246 12
0439136350 13
0007172826 14
0671004549 15
0099911701 16
0060175400 17
0385494505 18
0385335830 19
0446520950 20
```
## Github users
```
org_id remap_id
Yida 0
Vik 1
Harshit 2
Wang 3
Google 4
Github 5
```

## User history
```
User0 0 1 2 10 11
User1 1 2 10
User2 0 2 11
User3 3 4 5 6 7 9
User4 4 5 12 13 14 15 16
User5 4 6 14 17 18 19
```

# Our recommendations:
```
User0 [0, 2, 11, 10, 1, 8, 18, 19, 17, 9, 14, 16, 4, 15, 13, 12, 3, 7, 6, 5]
User1 [1, 10, 2, 0, 11, 19, 8, 16, 18, 14, 13, 12, 17, 15, 4, 7, 9, 5, 3, 6]
User2 [0, 11, 2, 10, 8, 1, 18, 17, 19, 9, 4, 15, 3, 14, 16, 6, 12, 13, 7, 5]
User3 [5, 7, 13, 12, 6, 16, 3, 14, 15, 4, 9, 19, 17, 18, 8, 1, 10, 2, 11, 0]
User4 [5, 13, 16, 12, 7, 14, 15, 4, 6, 3, 9, 19, 1, 10, 17, 18, 8, 2, 11, 0]
User5 [5, 13, 12, 7, 16, 14, 6, 15, 4, 3, 9, 19, 17, 1, 10, 18, 8, 2, 11, 0]
```
