# Intel compiler 

The Intel Composer suite is accessed by loading the `PrgEnv-intel` module file: `module load PrgEnv-intel`. 

## Versions

The current default version of the compiler is loaded automatically when you load the programming environment. Older and/or newer versions of the compiler may be available: to see which versions are available issue `module avail intel`. To use a different version of the compiler issue `module switch intel intel/<new_version>`.

The man pages (`man ifort`; `man icc`) provide information on all the compiler options available. 

## Recommended flags

The default optimization level with the Intel compiler (`-O2`) is quite high, so we suggest starting with the default optimization.

It is worth testing the performance with `-O3`, which turns on more aggressive loop optimizations (loop unrolling, scalar replacement, branch elimination etc). Inter-procedural optimization can be switched on with `-ipo`, but as ever, you should benchmark your application to see if it benefits from IPO or not.

We suggest trying `-O3 -unroll-aggressive -opt-prefetch` or fine tuning these parameters individually - the number of times to unroll loops (`-unroll[n]`), and the level of software prefetching (`-opt-prefect=n`).

There is a useful flag `-opt-report[n]` (`n=0-3`, where `3` refers to most verbose) which will generate an optimization report, which is written to standard error.

On the Cray systems, optimizations targeting the specific compute node architecture chosen by loading the `daint-gpu` or `daint-mc` module - as discussed in the [Specific note for the hybrid Piz Daint XC50/XC40](../../compiling_your_code/#specific-note-for-the-hybrid-piz-daint-xc50-xc40) - are turned on by default.

## OpenMP 

With the Intel compilers, OpenMP support is turned on by including the `-qopenmp` flag. 

## Programming considerations on the Cray

On the Cray system you can use Intel's Math Kernel Library (MKL) as an alternative to Cray's LibSci by unloading the `cray-libsci` module and adding the compiler option `-mkl`.

## Debugging

Debugging is turned on with `-debug [all]`. Note that optimization is turned off when debugging is turned on.

## Further Information

See the man pages for detailed information on the compilers and compiler flags (`man icc`; `man ifort`).  

More documentation is available from Intel for the [C compiler](https://software.intel.com/en-us/c-compilers) and [Fortran compiler](https://software.intel.com/en-us/fortran-compilers).
