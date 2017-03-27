# GNU compiler

The GNU Compiler Collection (GCC) includes the GNU Fortran compiler (`gfortran`), C (`gcc`) and C++ (`g++`) compilers. The compiler suite is accessed by loading (or switching to) the `PrgEnv-gnu` module file.

## Versions

The current default version of the compiler module (`gcc`) is loaded automatically when you load the programming environment. Older and/or newer versions of the compiler may be available: to see which versions are available issue `module avail gcc`. To use a different version of the GNU compiler issue `module switch gcc gcc/<new_version>`.

The man pages (`man gfortran`; `man gcc`) provide information on all the compiler options available. Note that if two compiler options conflict, the last option on the command line takes precedence!

## Options

Please refer to the man pages (`man gcc`; `man gfortran`) for a full list of compiler options available. By invoking `gcc` with the `--help` option a description of the command line options understood by the compiler will be printed to standard output. Target-specific command line options are described if the `--target-help` option is included. To get help on a specific class of compiler options use:

* `--help=class[,qualifier]`

where class can be one of `optimizers`, `warnings`, `target`, `params`, `language`, or `common`. 

## Optimization

The GNU compilers focus first and foremost on standards adherence and correctness: the default general optimization level is `-O0`. We recommend the following optimization flags:

* `-O3 -ffast-math -funroll-loops`

A full list of optimization options supported by the compiler can be obtained with the `--help=optimizers` flag, as mentioned above. If this option is preceded by `-Q`, i.e.:

* `-Q --help=optimizers`

then rather than displaying the available options, the output describes whether the option is enabled, disabled, or set to a specific value. The output is sensitive to the effects of previous options, so to see what options are enabled you need to put this option last.

The `-O3` flag turns on all `-O2` optimizations (those that don't add too much to the size of the binary) plus `-finline-functions`, `-funswitch-loops`, `-fpredictive-commoning` and `-fgcse-after-reload`. 

Note that loop unrolling is not turned on by default at `-O3`, hence the need to include a specific flag for unrolling. Useful options to improve performance are:

* `-funroll-loops` to unroll loops where the number of iterations is known at compiler time or on entry to the loop
* `-funroll-all-loops` to unroll all loops (may make code run slower!)
* `-ffast-math` (see [Floating point accuracy](#floating-point-accuracy) below)
* `-finline-functions` to integrate simple functions into their callers (default at `-O3`)
* `-finline-limit=n` to limit the size of functions inlined

On the Cray systems, optimizations targeting the specific compute node architecture chosen by loading the `daint-gpu` or `daint-mc` module - as discussed in the [Specific note for the hybrid Piz Daint XC50/XC40](../../compiling_your_code/#specific-note-for-the-hybrid-piz-daint-xc50-xc40) - are turned on by default. On non-Cray systems we recommend adding the `-march=native` flag.

## Floating point accuracy

The `-ffast-math` option (which sets `-fno-math-errno`, `-funsafe-math-optimizations`, `-ffinite-math-only`, `-fno-rounding-math`, `-fno-signaling-nans` and `-fcx-limited-range`) can yield faster code by relaxing the IEEE specfications for math functions. This option can produce incorrect results for codes that depend on the exact implementation of IEEE, so should be used with care. It is not turned on by default at any general optimization (`-On`) level.

## OpenMP

For the GNU compilers use the `-fopenmp` option to enable OpenMP support.

## Compiler Feedback

Compiler feedback on vectorization can be obtained using the `-ftree-vectorizer-verbose=n` switch. Output is written to standard error, or can be printed to a file if you use `-fdump-tree-vect`. Inspect the output to see which loops have been vectorized, and which have not. There are 10 levels of verbosity - see the man pages for details.

## Debugging

Debugging information is generated with the `-g` flag.

## Further Information

See the man pages for detailed information on the compilers and compiler flags (`man gcc`, `man g++` and `man gfortran`).

Refer to the [online documentation](http://gcc.gnu.org/onlinedocs) from the GNU Project.
