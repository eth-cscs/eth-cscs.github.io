# PGI compiler

The PGI compiler suite includes Fortran 77, Fortran 90/95, C and C++ compilers. It is accessed by loading (or switching to) the `PrgEnv-pgi` module.

## Versions

The default version of the compiler is loaded automatically when you load the programming enviornment. Older and/or newer versions of the compiler may be available: to see which versions are available issue `module avail pgi`. To use a different version of the PGI compiler issue `module switch pgi pgi/<new_version>`.

The man pages (`man pgf95`; `man pgcc`) provide information on all the compiler options available. Note that if two compiler options conflict, the last option on the command line takes precedence!

## Optimization

We recommend in the first instance to use the following optimization flag:

* `-fast`

The `-fast` (`-fastsse`) flag turns on optimizations relevant for the target platform and optimization level to a minimum of `-O2`.

More aggressive optimization can be obtained by adding `-O3`, ie:

* `-O3 -fast`

At the `-O3` level, all level `2` optimizations are performed, and in addition, more aggressive code hoisting and scalar replacement optimizations are performed. These optimizations may speed up your code but might also slow it down, so it is always recommended to benchmark the performance of your code with a variety of options enabled/disabled. It may be worth experimenting with the `-Munroll`, `-Minline`, `-Mmovnt` and `-Mconcur` options in particular. Use `-help` to list the compiler options available or to see details on how to use a given option, e.g. `pgf95 -Munroll -help`.

On the Cray systems, optimizations targeting the specific compute node architecture chosen by loading the `daint-gpu` or `daint-mc` module - as discussed in the [Specific note for the hybrid Piz Daint XC50/XC40](../../compiling_your_code/#specific-note-for-the-hybrid-piz-daint-xc50-xc40) - are turned on by default.

## Interprocedural analysis

In addition to `-fast`, the `-Mipa` option for interprocedural analysis and optimization (IPA) can in some cases improve performance by 5-10%. We suggest using the following IPA options:

* `-Mipa=fast,inline`

Note that the interprocedural analysis flag must be used at both compile and link time.

## OpenMP

For the PGI compiler use the `-mp=nonuma` option to enable OpenMP support.

## Debugging

The following compiler flags may be useful for helping debug your code:

* `-g`, generate symbolic debugging information (useful at `-O0`)
* `-gopt`, generate symbolic debugging informatioon in the presence of optimization
* `-Mbounds`, adds array bounds checking
* `-v`, give verbose output
* `-Mlist`, generate a listing file
* `-Minfo=all`, provide information on the optimizations performed by the compiler

## Further Information

See the man pages for detailed information on the compilers and compiler flags (`man pgcc`, `man pgf95`).

Refer to the [online documentation](http://www.pgroup.com/resources/docs.php) from the Portland Group.
