## Description
#### Summary
Displays the mage graph (the graph of skills) as tree. 

###### Each node of the graph provides the following information:
* Name of the skill
* Is current skill unlocked
* Can current skill be unlocked

Node style depends on skill's locking state. <br />
Each node could be clicked on to view the detail information. <br />
###### Detail information contains:
* Name of the skill
* Is current skill unlocked
* Can current skill be unlocked
* All node's parents
* All node's children

#### About Skill Trees
A skill tree is often used in role playing games or strategy games to allow the player more powerful actions after playing a while. At a certain point in the game the player can select a skill of his or her choice to unlock that skill if possible. Skills are connected like branches of a tree and a skill can only be unlocked if the previous skill on that tree is unlocked already.
Some Skill Trees are not trees but graphs. This means that some skills depend on more than one previous skill. They can only be unlocked if all of the previous skills are unlocked already.

## Tech summary

* Angular + RxJS + CSS Grid + Material design
* Jasmine for testing
* Docker for deployment

## Docker deployment

1) Build image using `docker build -t skilltreeviewer:1.0.0 -f nginx.dockerfile .` <br/>
2) Run image using `docker run -d -p 8080:80 skilltreeviewer:1.0.0` <br/>
3) Navigate to `http://localhost:8080`

## Development server

1) Run `npm install` to install npm packages. <br/>
2) Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

1) Run `npm install` to install npm packages. <br/>
2) Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

1) Run `npm install` to install npm packages. <br/>
2) Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

1) Run `npm install` to install npm packages. <br/>
2) Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Documentation

1) Run `npm install` to install npm packages. <br/>
2) Run `npm run compodoc` to generate documentation.

## Operation

Please use scroll to zoom in/out skill's tree
