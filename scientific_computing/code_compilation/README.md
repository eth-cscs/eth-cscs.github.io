# Code Compilation

All systems at CSCS use the [Modules](http://modules.sourceforge.net) framework to simplify access to various compiler suites and libraries: please check the list of the [most useful module commands](/getting_started/faq/#where-can-i-find-a-list-of-the-module-commands-).
To access a particular compiler suite you should load (or switch to) the appropriate programming environment module, `PrgEnv-X` (where `X` is one of `gnu`, `intel`, `pgi` or `cray`). Each system at CSCS will have one or more of these programming environments available.

For a given programming environment there may be several different versions of the base compiler available, one of which will be tagged as "(default)".
This default version will be loaded automatically when the `PrgEnv-x` module is loaded.

If you wish to use a different version of the base compiler you need to issue a `module switch` (or `swap`).
For example, to switch from the default gcc compiler of `PrgEnv-gnu` to `gcc/5.3.0`, issue the command: `module switch gcc gcc/5.3.0`.

Depending on the target platform that you have chosen you might have the GNU, Intel, Cray or PGI Programming Environments available with the corresponding compilers: please find more details on each compiler in the corresponding sections.

## Enabling GPU support in the programming environment

The GPU programming environment is not readily available when you log in: if you want to compile CUDA code, you should load the `cudatoolkit` module.
This will make available the `nvcc` compiler, the CUDA runtime environment and all the CUDA programming tools (profilers, debuggers etc.).

If you want to compile OpenACC code, you should make sure to load the module `craype-accel-nvidia60`. Apart from loading `cudatoolkit`, this module will also set the target accelerator architecture to the Tesla P100 GPU (`CRAY_ACCEL_TARGET` environment variable) and allow you to compile OpenACC code with the Cray compiler. If not loaded, Cray compiler will ignore the OpenACC directives, because a target accelerator could not be found.

For compiling OpenACC code with the PGI compiler, the `CRAY_ACCEL_TARGET` variable is not necessary, but the `cudatoolkit` module must be loaded.

# Cray Systems

On Cray systems, `PrgEnv-cray` is loaded by default: to switch to another programming environment, e.g. Intel, please issue the command: `module switch PrgEnv-cray PrgEnv-intel`.
Regardless of which programming environment (compiler suite) you are using, you should always compile code with the Cray wrapper commands (`cc` for C code, `CC` for C++ code and `ftn` for Fortran code). 
The compiler wrappers produce statically-linked executables by default; for dynamic libraries use the `-dynamic` flag or `export CRAYPE_LINK_TYPE=dynamic` before building.
Note that dynamical linking is the default when the cudatoolkit module is loaded. You should include the compiler flags appropriate to the underlying compiler suite (Intel, GNU, PGI, Cray). There are also specific options for the wrappers themselves: see the man pages of `ftn`, `cc`, and `CC` for details.

For example, to compile a Fortran code on the system: `ftn [options] code.f90 -o code.x`. For C code: `cc [options] code.c -o code.x`, and for C++ code: `CC [options] code.cpp -o code.x`. Note that MPI, BLAS and LAPACK are all found automatically, if needed.

## Specific note for the hybrid Piz Daint XC50 / XC40

Piz Daint is a hybrid system featuring two types of nodes:
* one Intel Haswell processor and one NVIDIA Tesla P100 GPU
* two Intel Broadwell processors

Depending on the architecture that you are addressing, you should compile for a different target and possibly link against different libraries. To make this process easy, we provide two modules that set up the environment correctly for cross-compiling:

* `module load daint-gpu`: load this module to address the gpu architecture. This module will set the target processor to Intel Haswell (`craype-haswell`) and will also make available the software stack compiled for the gpu nodes of Piz Daint.
* `module load daint-mc`: load this module to address the multicore architecture. This module will set the target processor to Intel Broadwell (`craype-broadwell`) and will also make available the software stack compiled for the multicore nodes of Piz Daint.

Please note that when building your CUDA code you should address the NVIDIA Tesla P100 architecture, adjusting the corresponding nvcc flag: `nvcc --gpu-architecture=sm_60`.

# Non-Cray systems

On non Cray systems you will need to load a programming environment as there is no default: for instance, in order to load the GNU programming environment you should type the command `module load PrgEnv-gnu`.

After loading the appropriate Programming Environment, you should use the compilers directly for non-MPI code and the MPI wrappers provided by MVAPICH for MPI codes (`mpicc` for C code, `mpicxx` for C++ code, `mpif77` for Fortran 77 code, and `mpif90` for Fortran 90 code).

You might also wanto to inspect the basic [examples](examples) of code compilation for both Cray and non-Cray systems.
