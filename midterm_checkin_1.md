### Project Selection
- You have passion on the project you choose
- You understand the requirements

### Project Planning
1. DO NOT start coding right away. Your initial design play crucial role in the sucess of the project
2. Read requirements together as a group, make sure everybody is on the same page
    * hint: some requirements are a bit tricky and can have more than one interpretation
3. Draft ERD diagram and have at least one mentor review it for you.
    * hint: If possible, have a group Assistance request where all of you can meet the mentor together
    * Do not over complicated your ERD. 
    * Use `draw.io` or `lucidchart`
4. Draw a list of **User Story** based on requirements. For example:

    ```
    Requirement: Users can see items that are on sale

    User Story: 
    As a user, 
    when I navigate to the home page, 
    I should see a list of items that are on sale.
    Each items should have a basic information, a thumbnail and a link to its detail page
    ```

5. UI design
    * Think about how many pages you might want to have
    * Draft out UI page briefly using a **wireframing tool**
    * Tools such as `Balsamiq` or `wireframe.cc`
    * Be simple

    ![wire_frame](./images/wire_frame.png)

6. Minimum Viable Product
    * People see your demo, and know what you are doing and can image what will/can be done in the future
    * What features are required? Without them, app won't work
    * What features are nice to have? Impressive but not necessary

### Start Working
1. As a group, you start by listing all features and required logics

|Feature|UI Page|Routing|DB Helper|DB Table|
|-|-|-|-|-|
|Create a blog|New Page Form| `POST /blogs` and `GET /blogs/new`| `createBlog()` | `blogs` |
|View all blogs|Index Page| `GET /blogs` | `getBlogs()` | `blogs`|
|Update blogs|Edit form| `GET /blogs/:id` and `PUT /blogs/:id`| `getBlogById()` and `updateBlog()` | `blogs`|
|Delete blogs|Index page| `DELETE /blogs/:id` | `deleteBlogById()` | `blogs`|

2. Then, as a group, you write the starting code together, consider writing the following code together:
    * Front end entry page `index.html` skeleton -> So you have an actual page to look at.
    * Express routing file `server.js` -> So everybody can start writing routes to it
    * Database helper file `database.js` -> So everybody have `pg` setup and ready to use
    * Initial Database migration and sample data. `create.sql` -> so everybody have actual database and fake starting data

3. Figure out Feature Dependency
    * Some features are independent to the other.
    * Some features have to wait for another feature to complete. 

4. Distribution of work by feature, not by stack

### Team Collaboration
#### What a typical developer day looks like?
1. Starting at a meeting called "Daily Standup". Every team member talked about 3 questions briefly:
    1. What did you do yesterday ?
    2. What are you going to do today ?
    3. Is there anything block your way ?
2. Developing your feature. This should take the major of your regular day
3. Testing. Local testing (Before you merge your code) and QA testing (After you erge your code).
4. Code Review and Feature demo
5. Grooming. Your team periodily discuss the upcoming tasks and priority

#### Collaboration with Git
Below is one of the git workflow you may want to follow, according to Compass [Git Collaboration](https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m06w14/activities/1281?workbook=25) exercise
* `git checkout main` and `git pull`: Your local main has everything that github main has
* `git checkout -b feature/login`: create a new branch and switch to that
* `git add .` and then `git commit -m 'message'`: Commit the work that you just done
* `git checkout main`: To switch back to your local main for merging
* `git merge feature/login`: merge the feature/login work to your current main branch
* `git pull` or `git merge origin/main` and fix potential conflict: update local main with github again
    - `git pull` and `git merge` work a bit different under the hood
    - But here if you do it right, the final result will be the same
* `git push origin main`: update github's main branch with your local work

##### This is just one type of workflow. You can use other workflow as long as you are comfortable
##### This is not a pull request workflow. If you want to use pull request, make sure you find a good tutorial
[Git workflow video](https://vimeo.com/721957400/1f350619f7)

#### Project Management with Trello
1. Trello is a web-based free project management/collaboration tool
2. You can divide your feature into different tasks
3. You can assign tasks to individual
4. You can track the progress

![trello](./images/trello.webp)

### Common Mistakes
1. Start coding too early. Lack of design
2. Unclear MVP. Spend too much time on something "nice to have"
3. Forget to commit until the end of the day. Try not to do large commit
4. No review or Demo. I don't know how to use my peer's feature
5. Did not track project progress.
6. **Git** Git and Git. 

### Final Tips
1. No need to do real user authentication. 
2. Do styling last. 
3. Frequent communication with your teammates
4. Be careful with Git. Make sure you follow the same git workflow
5. Do not panic if you mess up the codebase. It happens, and can be fixed
6. By the end of week one a good place to be will be all the main features 80 - 90 % complete.
7. If you need help, if you stuck. Bring it up and ask for help

### Resource
This is a [list of tool](https://gist.github.com/DominicTremblay/b8e0acc66c45f412abe4d92b7268b3cd) That you can check