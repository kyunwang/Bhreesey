# Bhreesey - THREE.js Base

A THREE.js base with Webpack as bundler. The idea behind this repo, is to have a independant system to throw Three js in. e.g. when you use a framework like react or vue, do not contaminate the state of either.

A simple Three js setup, living in `SceneManager`. It works as a *Manager* and doesn't do a lot by itself.


*To write*
- What you can do with it (a.k.a. how to use)
- About the helpers?
- About stats.js
- About dat.gui & (maybe three-dat.gui??)


- include stats.js and dat.gui as package or leave it out?

### 
light, you need to add yourself to the scene - you can use the `GeneralLight` too, but it needs to be added to the scene too

### Todo
Things I might do or not - they are just on my mind

#### Code related
- [ ] check usability to have a helper for interaction (raycasting and shizz)
- [ ] use/try mobx instead of context?

#### Other stuff
- [ ] make a package out of it? (should it be static like that or configurable by me when needed?? - again not a lot to configure though) 
  - [ ] likely divide the repo into different directories then (package & example (which is the current thing displayed))
- [ ] recheck naming and stuff
- [x] typescript (did not like it with three js tbh)
- [ ] add an example with shaders
- [ ] rethink utils directory structure (what shoulld be in there etc.)
- [ ] Make an example with shaders

- [ ] finish the webpack someday (not build ready) or change from bundler ?...?
- [ ] write a more serious readme