
# Compilers

Depending on the target platform, compilers will be available from some or all of GNU, Intel, Cray and/or PGI. You can find more details on each compiler below:

## Cray compiler

The Cray Compiling Environment (CCE) is a release of the Cray Fortran and Cray C compilers for use on x86-based Cray systems. The compiler provides partial support of the OpenMP 3.1 standard specification. PGAS languages (UPC and CAF) are integrated into the compiler (no preprocessor is necessary). The compiler fully supports the [OpenACC Application Programing Interface version 1.0](http://www.openacc.org/sites/default/files/OpenACC.1.0_0.pdf).

The Cray Fortran compiler conforms to the Fortran 2008 standard. 

The C/C++ compiler supports ANSI C99 and ANSI C++2003 (with some exceptions) and the UPC Language Specification 1.2. 

The compiler provides support for the Intel Sandy Bridge, Broadwell and Haswell architectures (AVX and AVX2 instruction sets).

The Cray Compiling Environment is accessed through the `PrgEnv-cray` module file. 

### Versions

The current default version of the compiler is loaded automatically when you load the programming environment. Older and/or newer versions of the compiler may be available: to see which versions are available issue `module avail cce`. To use a different version of the compiler issue `module switch cce cce/<new_version>`.

The man pages (`man crayftn`; `man craycc`) provide information on all the compiler options available. Note that if two compiler options conflict, the last option on the command line takes precedence!

### Recommended flags

The Cray compiler is a highly optimizing compiler, and the default optimization level is equivalent to `-O3` or `-fast` in other compiler suites. The default optimization level is the most thoroughly tested level and is recommended by Cray.

Moreover, optimizations targeting the specific compute node architecture chosen by loading the `daint-gpu` or `daint-mc` module as discussed in [Compiling Your Code](http://eth-cscs.github.io/compiling_and_optimizing/compiling_your_code/#) section (Specific note for the hybrid Piz Daint XC50/XC40) are turned on by default.

Inlining is enabled by default but can be tuned using the `-Oipan` (Fortran) or `-hipan`(C/C++) flags, where `n` is `0`, `1`, `2`, `3` (the default), or `4`. See the man pages (`man crayftn`; `man craycc`) for more information on inlining.

More aggressive optimization can be obtained with `-O3,fp3` or `-O3 -hfp3`, which are also well tested by Cray. The flag `-hfp3` adds a lot of floating point optimization, especially with 32-bit operands, and is recommended if the application runs cleanly at this level. If bit reproducibility is important (your application is intolerant to floating point re-association) then you might need to reduce to `-hfp1` (use `-hfp0` only if absolutely necessary). 

Note that the highest levels of optimization (such as `-Oipa5` or `-Oaggress`) should be used with caution as they will not always result in improved performance. 

### Compiler feedback

Cray provides compiler feedback called "Loopmark". If you compile the the `-rm` (Fortran) or `-hlist=m` (C/C++) flag then the compler will produce a listing file (`filenmae.lst`) which consists of an annotated lisiting of the source code with letters indicating optimizations performed ("I" for inlined, "r" for unrolled, "b" for blocked, and so on).  

The `-O negmsgs` option (or equivalently, the `-h negmesg` option) will tell the compiler to generate messages to standard error explaining why optimizations did not occur in a given instance. The `-eo` option will display all optimizations used by the compiler.

Please refer to the man pages (`man crayftn`; `man craycc`) for a full list of compiler options available. 

### OpenMP and threading

OpenMP support is turned on by default, so to disable the recognition of OpenMP directives you need to supply the `-h noomp` flag (or equivalently `-xomp` or `-Othread0`). The `-O threadn` option controls the optimization of OpenMP directives, where `n=0-3` with `0` meaning no optimization and `3` the most aggressive optimization.

Auto-threading is not turned on by default, however. You can enable it with `-hautothread`.   

### Debugging

The following compiler flags may be useful for helping debug your code. Note that the `-G` options can be specified on a per-file basis so that only part of an application pays the price for improved debugging

* `-g`, generate debugging information (equivalent to `-G0`)
* `-G0`, generate full debugging information with optimizations disabled (`-O0`, `-O ipa0`, `-O scale0`, `-O vector0`)
* `-G01`, generate debugging information with partial optimization
* `-G02`, generate debugging information with full optimization

### Further Information

The Cray compiler can produce many messages during the compiling and linking phases. To obtain further information about these messages, use the `explain` command: for example, `explain ftn-500` to get information on message 500. 

For information on the explain command, see `man explain`.

See the man pages for detailed information on the compilers and compiler flags (`man crayftn`; `man craycc`).

Refer to the Cray Fortran Reference Manual and Cray C and C++ Reference Manual from [CrayDoc](http://docs.cray.com/).

## Intel compiler 

The Intel Composer suite is accessed by loading the `PrgEnv-intel` module file: `module load PrgEnv-intel`. 

### Versions

The current default version of the compiler is loaded automatically when you load the programming environment. Older and/or newer versions of the compiler may be available: to see which versions are available issue `module avail intel`. To use a different version of the compiler issue `module switch intel intel/<new_version>`.

The man pages (`man ifort`; `man icc`) provide information on all the compiler options available. 

### Recommended flags

The default optimization level with the Intel compiler (`-O2`) is quite high, so we suggest starting with the default optimization.

It is worth testing the performance with `-O3`, which turns on more aggressive loop optimizations (loop unrolling, scalar replacement, branch elimination etc). Inter-procedural optimization can be switched on with `-ipo`, but as ever, you should benchmark your application to see if it benefits from IPO or not.

We suggest trying `-O3 -unroll-aggressive -opt-prefetch` or fine tuning these parameters individually - the number of times to unroll loops (`-unroll[n]`), and the level of software prefetching (`-opt-prefect=n`).

There is a useful flag `-opt-report[n]` (`n=0-3`, where `3` refers to most verbose) which will generate an optimization report, which is written to standard error.

On the Cray systems, optimizations targeting the specific compute node architecture chosen by loading the `daint-gpu` or `daint-mc` module as discussed in [Compiling Your Code](http://eth-cscs.github.io/compiling_and_optimizing/compiling_your_code/#) section (Specific note for the hybrid Piz Daint XC50/XC40) are turned on by default.

### OpenMP 

With the Intel compilers, OpenMP support is turned on by including the `-qopenmp` flag. 

### Programming considerations on the Cray

On the Cray system you can use Intel's Math Kernel Library (MKL) as an alternative to Cray's LibSci by unloading the `cray-libsci` module and adding the compiler option `-mkl`.

### Debugging

Debugging is turned on with `-debug [all]`. Note that optimization is turned off when debugging is turned on.

### Further Information

See the man pages for detailed information on the compilers and compiler flags (`man icc`; `man ifort`).  

More documentation is available from Intel for the [C compiler](https://software.intel.com/en-us/c-compilers) and [Fortran compiler](https://software.intel.com/en-us/fortran-compilers).

## GNU compiler

The GNU Compiler Collection (GCC) includes the GNU Fortran compiler (`gfortran`), C (`gcc`) and C++ (`g++`) compilers. The compiler suite is accessed by loading (or switching to) the `PrgEnv-gnu` module file.

### Versions

The current default version of the compiler module (`gcc`) is loaded automatically when you load the programming environment. Older and/or newer versions of the compiler may be available: to see which versions are available issue `module avail gcc`. To use a different version of the GNU compiler issue `module switch gcc gcc/<new_version>`.

The man pages (`man gfortran`; `man gcc`) provide information on all the compiler options available. Note that if two compiler options conflict, the last option on the command line takes precedence!

### Options

Please refer to the man pages (`man gcc`; `man gfortran`) for a full list of compiler options available. By invoking `gcc` with the `--help` option a description of the command line options understood by the compiler will be printed to standard output. Target-specific command line options are described if the `--target-help` option is included. To get help on a specific class of compiler options use:

* `--help=class[,qualifier]`

where class can be one of `optimizers`, `warnings`, `target`, `params`, `language`, or `common`. 

### Optimization

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

On the Cray systems, optimizations targeting the specific compute node architecture chosen by loading the `daint-gpu` or `daint-mc` module as discussed in [Compiling Your Code](http://eth-cscs.github.io/compiling_and_optimizing/compiling_your_code/#) section (Specific note for the hybrid Piz Daint XC50/XC40) are turned on by default. On non-Cray systems we recommend adding the `-march=native` flag.

### Floating point accuracy

The `-ffast-math` option (which sets `-fno-math-errno`, `-funsafe-math-optimizations`, `-ffinite-math-only`, `-fno-rounding-math`, `-fno-signaling-nans` and `-fcx-limited-range`) can yield faster code by relaxing the IEEE specfications for math functions. This option can produce incorrect results for codes that depend on the exact implementation of IEEE, so should be used with care. It is not turned on by default at any general optimization (`-On`) level.

### OpenMP

For the GNU compilers use the `-fopenmp` option to enable OpenMP support.

### Compiler Feedback

Compiler feedback on vectorization can be obtained using the `-ftree-vectorizer-verbose=n` switch. Output is written to standard error, or can be printed to a file if you use `-fdump-tree-vect`. Inspect the output to see which loops have been vectorized, and which have not. There are 10 levels of verbosity - see the man pages for details.

### Debugging

Debugging information is generated with the `-g` flag.

### Further Information

See the man pages for detailed information on the compilers and compiler flags (`man gcc`, `man g++` and `man gfortran`).

Refer to the [online documentation](http://gcc.gnu.org/onlinedocs/) from the GNU Project.

## PGI compiler

The PGI compiler suite includes Fortran 77, Fortran 90/95, C and C++ compilers. It is accessed by loading (or switching to) the `PrgEnv-pgi` module.

### Versions

The default version of the compiler is loaded automatically when you load the programming enviornment. Older and/or newer versions of the compiler may be available: to see which versions are available issue `module avail pgi`. To use a different version of the PGI compiler issue `module switch pgi pgi/<new_version>`.

The man pages (`man pgf95`; `man pgcc`) provide information on all the compiler options available. Note that if two compiler options conflict, the last option on the command line takes precedence!

### Optimization

We recommend in the first instance to use the following optimization flag:

* `-fast`

The `-fast` (`-fastsse`) flag turns on optimizations relevant for the target platform and optimization level to a minimum of `-O2`.

More aggressive optimization can be obtained by adding `-O3`, ie:

* `-O3 -fast`

At the `-O3` level, all level `2` optimizations are performed, and in addition, more aggressive code hoisting and scalar replacement optimizations are performed. These optimizations may speed up your code but might also slow it down, so it is always recommended to benchmark the performance of your code with a variety of options enabled/disabled. It may be worth experimenting with the `-Munroll`, `-Minline`, `-Mmovnt` and `-Mconcur` options in particular. Use `-help` to list the compiler options available or to see details on how to use a given option, e.g. `pgf95 -Munroll -help`.

On the Cray systems, optimizations targeting the specific compute node architecture chosen by loading the `daint-gpu` or `daint-mc` module as discussed in [Compiling Your Code](http://eth-cscs.github.io/compiling_and_optimizing/compiling_your_code/#) section (Specific note for the hybrid Piz Daint XC50/XC40) are turned on by default.

### Interprocedural analysis

In addition to `-fast`, the `-Mipa` option for interprocedural analysis and optimization (IPA) can in some cases improve performance by 5-10%. We suggest using the following IPA options:

* `-Mipa=fast,inline`

Note that the interprocedural analysis flag must be used at both compile and link time.

### OpenMP

For the PGI compiler use the `-mp=nonuma` option to enable OpenMP support.

### Debugging

The following compiler flags may be useful for helping debug your code:

* `-g`, generate symbolic debugging information (useful at `-O0`)
* `-gopt`, generate symbolic debugging informatioon in the presence of optimization
* `-Mbounds`, adds array bounds checking
* `-v`, give verbose output
* `-Mlist`, generate a listing file
* `-Minfo=all`, provide information on the optimizations performed by the compiler

### Further Information

See the man pages for detailed information on the compilers and compiler flags (`man pgcc`, `man pgf95`).

Refer to the [online documentation](http://www.pgroup.com/resources/docs.php) from the Portland Group.
