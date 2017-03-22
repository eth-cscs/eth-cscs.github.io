# Compiling your code

Depending on the target platform that you have chosen you might have the GNU, Intel, Cray or PGI Programming Environments  available with the corresponding compilers: please find more details on each compiler in the corresponding sections.

## Cray Systems

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

## Non-Cray systems

On non Cray systems after loading an appropriate Programming Environment you should use the compilers directly for non-MPI code and the MPI wrappers provided by MVAPICH for MPI codes (`mpicc` for C code, `mpicxx` for C++ code, `mpif77` for Fortran 77 code, and `mpif90` for Fortran 90 code).

Regardless of which programming environment (compiler suite) you are using, you should always compile code with the Cray wrapper commands (`cc` for C code, `CC` for C++ code and `ftn` for Fortran code). The compiler wrappers produce statically-linked executables by default; for dynamic libraries use the `-dynamic` flag or `export CRAYPE_LINK_TYPE=dynamic` before building.
Note that dynamical linking is the default when the cudatoolkit module is loaded. You should include the compiler flags appropriate to the underlying compiler suite (Intel, GNU, PGI, Cray). There are also specific options for the wrappers themselves: see the man pages of `ftn`, `cc`, and `CC` for details.

For example, to compile a Fortran code on the system: `ftn [options] code.f90 -o code.x`. For C code: `cc [options] code.c -o code.x`, and for C++ code: `CC [options] code.cpp -o code.x`. Note that MPI, BLAS and LAPACK are all found automatically, if needed.
