# CS184 Final Project Report
# 3D Position-Based Fluid Simulation and Surfacing

## What we had achieved
* we had successfully compiled and ran the simulation.
* Problems observed: currently we are using 2600 particles falling from the sky (each of which has a distance of .05), when we increase the number of particles to 8000, the simulation seems unrealistic in that the particle will draft in the sky for a long time.
* Tunning the parameters to simulate water flow better.

## Plan
### April 28 - May 2nd:
* Fixing the bugs
* Manipulate the parameters to compare different effects caused by the parameters

### May 2 - 5th:
* Update the runder effect so that the particles look more like water.

### May 5 - 6th:
* Add more complex geometry to the scene (maybe a bunny).

## Slides
https://docs.google.com/presentation/d/1o1HvaQaR5tvvbEHRLu0RFl3dKFdMhICsYM7Aa9ejfRo/edit#slide=id.p

## Video
https://github.com/TianjiaoLuo/CS184-Milestone/raw/master/118.mov

## Original Proposal
https://lxjhk.github.io/cs184-group-project/

### Parameters
* kernelRadius - The radius of influence of a particle (0.1 to 0.2 works good)
* numSubSteps - How many times the position-correction step should be done each frame (1-4 works good)
* restDensity - The density of the fluid (6000-8000 works good)
* deltaTime - The size if the timestep for each frame, in seconds (0.0083s works well, yielding 120 frames per second of simulation)
* epsilon - Constraint Force Mixing (CFM) relaxation parameter
* k - Artificial pressure strength
* delta_q  Artificial pressure radius
* n - Artificial pressure power
* c - Artificial viscosity (should be <0.05)
* k_vc - Vorticity confinement strength
* kBoundsDensity - Contribution of boundaries to a particle's density
