# VMD

VMD is designed for modeling, visualization, and analysis of biological systems such as proteins, nucleic acids, lipid bilayer assemblies, etc. It may be used to view more general molecules, as VMD can read standard Protein Data Bank (PDB) files and display the contained structure. VMD provides a wide variety of methods for rendering and coloring a molecule: simple points and lines, CPK spheres and cylinders, licorice bonds, backbone tubes and ribbons, cartoon drawings, and others. VMD can be used to animate and analyze the trajectory of a molecular dynamics (MD) simulation. In particular, VMD can act as a graphical front end for an external MD program by displaying and animating a molecule undergoing simulation on a remote computer. ( taken from VMD's web site ).

Users with molecular science codes such as CP2K, Quantum Espresso, LAMMPS, GROMACS, VASP, NAMD, NWChem, Amber, can take advantage of an optimized installation of VMD on daint.

# Setup

You can see a list of the available versions of the program installed on the machine after loading the gpu module, by typing:

```bash
module load daint-gpu
module avail VMD
```

VMD is currently available with reduced functionality, to run in batch mode, with GPU renderering. Users can also take advantage of a new NVIDIA library called Optix, for ray-traced image production. It includes the built-in GPU-accelerated version of the Tachyon ray tracing engine, using NVIDIA CUDA and OptiX to achieve performance levels up to six times faster than the previous CPU versions of Tachyon. The new renderer is labelled "TachyonL-OptiX" in the VMD renderer window, and it supports the vast majority of Tachyon rendering features, with emphasis on ambient occlusion lighting, shadows, depth-of-field, high quality transparent surface rendering, and parallel rendering. (see [VMD 1.9.3 Interactive GPU Ray Tracing Notes](http://www.ks.uiuc.edu/Research/vmd/vmd-1.9.3/optix.html) for details).

# How to Run on Piz Daint

The NVIDIA CUDA and OptiX versions of VMD are installed on Daint. The new syntax in your Tcl script for Optix-based rendering would be:

```bash
render TachyonLOptiXInternal my_image.ppm
```
The following job script asks for 1 node, using 1 task per node. VMD will automatically use all threads available on the node and execute the contents of your TCL script in file `script.tcl`.

```bash
#!/bin/bash
#
# VMD on Piz Daint
#
# 1 nodes, 1 task per node, all threads are detected by VMD
#
#SBATCH --job-name="vmd"
#SBATCH --time=01:00:00
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --constraint=gpu
#========================================
# load modules and run simulation
module load daint-gpu
module load VMD

srun -n $SLURM_NTASKS -N $SLURM_NNODEs vmd -size 1024 800 -dispdev none -eofexit < script.tcl
```

# Further Documentation

[VMD Homepage](http://www.ks.uiuc.edu/Research/vmd/)

[VMD User's Guide](http://www.ks.uiuc.edu/Research/vmd/current/docs.html)

