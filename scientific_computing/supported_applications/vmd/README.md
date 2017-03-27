# VMD

VMD is designed for modeling, visualization, and analysis of biological systems such as proteins, nucleic acids, lipid bilayer assemblies, etc. It may be used to view more general molecules, as VMD can read standard Protein Data Bank (PDB) files and display the contained structure. VMD provides a wide variety of methods for rendering and coloring a molecule: simple points and lines, CPK spheres and cylinders, licorice bonds, backbone tubes and ribbons, cartoon drawings, and others. VMD can be used to animate and analyze the trajectory of a molecular dynamics (MD) simulation. In particular, VMD can act as a graphical front end for an external MD program by displaying and animating a molecule undergoing simulation on a remote computer. ( taken from VMD's web site ).

Users with molecular science codes such as CP2K, Quantum Espresso, LAMMPS, GROMACS, VASP, NAMD, NWChem, Amber, can take advantage of an optimized installation of VMD on daint.

# Setup

You can see a list of the available versions of the program installed on the machine after loading the gpu module, by typing:

```bash
module load daint-gpu
module avail VMD
```

VMD can be run on compute nodes with GPU acceleration, in batch mode, or inside a remote VNC desktop. As of version 1.9.3, a new NVIDIA library called Optix is available for ray-traced image production. VMD includes the built-in GPU-accelerated version of the Tachyon ray tracing engine, using NVIDIA CUDA and OptiX to achieve performance levels up to six times faster than the previous CPU versions of Tachyon. The new renderer is labelled "TachyonL-OptiX" in the VMD renderer window, and it supports the vast majority of Tachyon rendering features, with emphasis on ambient occlusion lighting, shadows, depth-of-field, high quality transparent surface rendering, and parallel rendering. (see [VMD 1.9.3 Interactive GPU Ray Tracing Notes](http://www.ks.uiuc.edu/Research/vmd/vmd-1.9.3/optix.html) for details).

The NVIDIA CUDA and OptiX versions of VMD are installed on Daint. The new syntax in your Tcl script for Optix-based rendering would be:

```bash
render TachyonLOptiXInternal my_image.ppm
```

# How to Run on Piz Daint

## Batch-mode with Tcl scripts

The EGL version of VMD can run OpenGL code on a compute node, without an X-server. You should use the VMD-egl module to run in batch. The following job script asks for 1 node, using 1 task per node. VMD will automatically use all threads available on the node and execute the contents of your TCL script in file `script.tcl`.

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
module load VMD-egl/1.9.3

srun -n $SLURM_NTASKS -N $SLURM_NNODEs vmd -size 1024 800 -dispdev none -eofexit < script.tcl
```

## Interactive-mode with a remote VNC desktop

To run VMD in exploratory mode, you will need a full OpenGL environment with an X-server. The following SLURM script will prepare a compute node for that purpose.

```bash
#!/bin/bash
#
# a VNC desktop on a compute node of Piz Daint
#
# 1 nodes, 1 task per node, all threads are detected by VMD
#
#SBATCH --job-name="vncdesktop"
#SBATCH --output=vncdesktop.out
#SBATCH --nodes=1
#SBATCH -t 1:00:00
#SBATCH --gres=gpu:1
#SBATCH -C startx

if [ \! -e $HOME/.vnc/passwd ] ; then
	echo "For your protection, please run 'vncpasswd' before using vnc"
	exit 1
fi
HOSTNAME=$(hostname)
i=`scontrol show hostname $SLURM_JOB_NODELIST`
PORT=1$(echo $i|awk -Fnid0 '{print $2}')
XTHOST=$(cat /etc/xthostname)

echo "VNC Server accepting connections on $PORT"
echo "On client machine:"
echo "ssh -f -L $PORT:${i}.${XTHOST}:5901 $USER@ela.cscs.ch sleep 3600"
echo "vncviewer localhost:$PORT"
sync

#ssh $i /apps/dom/system/bin/startvncdesktop 1280x720
ssh $i /apps/daint/system/bin/startvncdesktop 1920x1080
```
Once the job is scheduled, the SLURM output in file `vncdesktop.out` will give you instructions on how to set up the corresponding tunnel from your desktop to the compute node. For example, the commands requested will be

```
ssh -f -L 12223:nid02223.daint:5901 username@ela.cscs.ch sleep 3600
vncviewer localhost:12223
```
Once inside the VNC desktop, use the VMD-ogl module and run VMD as you would on your local desktop, but with full access to Piz Daint's filesystem.

# Further Documentation

[VMD Homepage](http://www.ks.uiuc.edu/Research/vmd/)

[VMD User's Guide](http://www.ks.uiuc.edu/Research/vmd/current/docs.html)

